import uuid
from datetime import date
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from ..billing import apply_patient_balance, next_invoice_number, recompute_invoice
from ..database import get_db
from ..dependencies import require_permission, scoped
from ..models import Invoice, Patient, PaymentInstallment, User
from ..schemas.common import InstallmentMethod
from ..schemas.invoice import InvoiceCreate, InvoiceOut, InvoicePaymentRequest

router = APIRouter(prefix="/invoices", tags=["invoices"])

ViewRevenue = Annotated[User, Depends(require_permission("canViewRevenue"))]
DbSession = Annotated[Session, Depends(get_db)]


def _get_owned(db: Session, user: User, invoice_id: uuid.UUID) -> Invoice:
    inv = db.get(Invoice, invoice_id)
    if inv is None or (user.role != "SUPER_ADMIN" and inv.tenant_id != user.tenant_id):
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
def list_invoices(user: ViewRevenue, db: DbSession) -> list[Invoice]:
    stmt = (
        scoped(select(Invoice), Invoice.tenant_id, user)
        .options(selectinload(Invoice.installments))
        .order_by(Invoice.date.desc())
    )
    return list(db.scalars(stmt))


@router.post("", response_model=InvoiceOut, status_code=status.HTTP_201_CREATED)
def create_invoice(body: InvoiceCreate, user: ViewRevenue, db: DbSession) -> Invoice:
    if user.role == "SUPER_ADMIN":
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "Super Admin cannot create invoices directly"
        )
    patient = db.get(Patient, body.patient_id)
    if patient is None or patient.tenant_id != user.tenant_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Patient not found")

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
    db.commit()
    db.refresh(inv)
    return inv


@router.post("/{invoice_id}/payments", response_model=InvoiceOut)
def add_payment(
    invoice_id: uuid.UUID, body: InvoicePaymentRequest, user: ViewRevenue, db: DbSession
) -> Invoice:
    inv = _get_owned(db, user, invoice_id)
    _record_payment(db, user, inv, body.amount, body.method, body.notes)
    db.commit()
    db.refresh(inv)
    return inv


@router.post("/{invoice_id}/mark-paid", response_model=InvoiceOut)
def mark_paid(
    invoice_id: uuid.UUID,
    user: ViewRevenue,
    db: DbSession,
    method: InstallmentMethod = "Credit Card",
) -> Invoice:
    inv = _get_owned(db, user, invoice_id)
    if inv.balance > 0:
        _record_payment(db, user, inv, inv.balance, method, "Full payment balance cleared")
        db.commit()
        db.refresh(inv)
    return inv


@router.delete("/{invoice_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_invoice(invoice_id: uuid.UUID, user: ViewRevenue, db: DbSession) -> None:
    inv = _get_owned(db, user, invoice_id)
    if inv.balance > 0:
        apply_patient_balance(db, inv.patient_id, -inv.balance)
    db.delete(inv)
    db.commit()
