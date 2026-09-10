import uuid
from datetime import date, datetime, timezone
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, selectinload

from ..audit import record_audit
from ..billing import apply_patient_balance, next_invoice_number, recompute_invoice
from ..database import get_db
from ..dependencies import Pagination, require_billing_access, require_permission, scoped
from ..models import Invoice, Patient, PaymentInstallment, User
from ..schemas.common import InstallmentMethod
from ..schemas.invoice import InvoiceCreate, InvoiceOut, InvoicePaymentRequest

router = APIRouter(prefix="/invoices", tags=["invoices"])

ViewRevenue = Annotated[User, Depends(require_permission("canViewRevenue"))]
Billing = Annotated[User, Depends(require_billing_access)]
DbSession = Annotated[Session, Depends(get_db)]


def _get_owned(db: Session, user: User, invoice_id: uuid.UUID) -> Invoice:
    inv = db.get(Invoice, invoice_id)
    if (
        inv is None
        or inv.deleted_at is not None
        or (user.role != "SUPER_ADMIN" and inv.tenant_id != user.tenant_id)
    ):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Invoice not found")
    return inv


def _record_payment(
    db: Session, user: User, inv: Invoice, amount: int, method: str, notes: str | None
) -> None:
    before = inv.balance
    inv.amount_paid += amount
    inv.payment_method = method
    db.add(
        PaymentInstallment(
            invoice_id=inv.id,
            date=date.today(),
            amount=amount,
            method=method,
            notes=notes,
            recorded_by=user.name,
        )
    )
    recompute_invoice(inv)
    apply_patient_balance(db, inv.patient_id, -(before - inv.balance))


@router.get("", response_model=list[InvoiceOut])
def list_invoices(user: ViewRevenue, db: DbSession, page: Pagination) -> list[Invoice]:
    stmt = (
        scoped(select(Invoice), Invoice.tenant_id, user)
        .where(Invoice.deleted_at.is_(None))
        .options(selectinload(Invoice.installments))
        .order_by(Invoice.date.desc())
        .limit(page.limit)
        .offset(page.offset)
    )
    invoices = list(db.scalars(stmt))
    # Derive "Overdue" on read — nothing persists it. (Not committed here.)
    today = date.today()
    for inv in invoices:
        if inv.status == "Pending" and inv.balance > 0 and inv.due_date < today:
            inv.status = "Overdue"
    return invoices


def _make_invoice(db: Session, request: Request, user: User, body: InvoiceCreate, patient: Patient) -> Invoice:
    amount_paid = min(body.amount_paid, body.amount)
    inv = Invoice(
        tenant_id=user.tenant_id,
        invoice_number=next_invoice_number(db, user.tenant_id),
        patient_id=patient.id,
        patient_name=f"{patient.first_name} {patient.last_name}",
        service_name=body.service_name,
        amount=body.amount,
        amount_paid=amount_paid,
        balance=body.amount - amount_paid,
        date=body.date,
        due_date=body.due_date,
        status="Paid" if amount_paid >= body.amount else body.status,
        payment_method=body.payment_method if amount_paid > 0 else None,
    )
    db.add(inv)
    apply_patient_balance(db, patient.id, inv.balance)
    db.flush()
    record_audit(
        db, request, user, "INVOICE_CREATED", "Invoice", inv.id,
        f"Invoice {inv.invoice_number} for {inv.patient_name} - INR {inv.amount}",
    )
    db.commit()
    db.refresh(inv)
    return inv


@router.post("", response_model=InvoiceOut, status_code=status.HTTP_201_CREATED)
def create_invoice(
    body: InvoiceCreate, request: Request, user: Billing, db: DbSession
) -> Invoice:
    if user.role == "SUPER_ADMIN":
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "Super Admin cannot create invoices directly"
        )
    patient = db.get(Patient, body.patient_id)
    if patient is None or patient.tenant_id != user.tenant_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Patient not found")

    for _ in range(3):  # retry on the invoice-number race (concurrent creates same tenant)
        try:
            return _make_invoice(db, request, user, body, patient)
        except IntegrityError:
            db.rollback()
    raise HTTPException(status.HTTP_409_CONFLICT, "Could not allocate an invoice number; please retry")


@router.post("/{invoice_id}/payments", response_model=InvoiceOut)
def add_payment(
    invoice_id: uuid.UUID,
    body: InvoicePaymentRequest,
    request: Request,
    user: ViewRevenue,
    db: DbSession,
) -> Invoice:
    inv = _get_owned(db, user, invoice_id)
    _record_payment(db, user, inv, body.amount, body.method, body.notes)
    record_audit(
        db, request, user, "PAYMENT_RECORDED", "Invoice", inv.id,
        f"Payment INR {body.amount} via {body.method} on {inv.invoice_number}",
    )
    db.commit()
    db.refresh(inv)
    return inv


@router.post("/{invoice_id}/mark-paid", response_model=InvoiceOut)
def mark_paid(
    invoice_id: uuid.UUID,
    request: Request,
    user: ViewRevenue,
    db: DbSession,
    method: InstallmentMethod = "Credit Card",
) -> Invoice:
    inv = _get_owned(db, user, invoice_id)
    if inv.balance > 0:
        cleared = inv.balance
        _record_payment(db, user, inv, cleared, method, "Full payment balance cleared")
        record_audit(
            db, request, user, "PAYMENT_RECORDED", "Invoice", inv.id,
            f"Cleared balance INR {cleared} on {inv.invoice_number} via {method}",
        )
        db.commit()
        db.refresh(inv)
    return inv


@router.delete("/{invoice_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_invoice(
    invoice_id: uuid.UUID, request: Request, user: ViewRevenue, db: DbSession
) -> None:
    inv = _get_owned(db, user, invoice_id)
    if inv.balance > 0:
        apply_patient_balance(db, inv.patient_id, -inv.balance)
    record_audit(
        db, request, user, "INVOICE_DELETED", "Invoice", inv.id,
        f"Deleted invoice {inv.invoice_number} ({inv.patient_name})",
    )
    inv.deleted_at = datetime.now(timezone.utc)  # soft delete — number stays reserved, trail intact
    db.commit()
