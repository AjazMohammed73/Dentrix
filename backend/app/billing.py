"""Shared billing helpers used by the appointments and invoices routers."""

import uuid
from datetime import date

from sqlalchemy import func, select, update
from sqlalchemy.orm import Session

from .models import Appointment, Invoice, Patient


def next_invoice_number(db: Session, tenant_id: uuid.UUID) -> str:
    """INV-<year>-<00001..>, per tenant.

    Uses MAX(number)+1, not COUNT — a deleted invoice must not make the next number
    collide with a still-present higher one. The appointments router also retries once
    on the unique-constraint race. Move to a per-tenant Postgres sequence only if
    bookings ever go truly concurrent at volume.
    """
    prefix = f"INV-{date.today().year}-"
    last = db.scalar(
        select(func.max(Invoice.invoice_number)).where(
            Invoice.tenant_id == tenant_id, Invoice.invoice_number.like(f"{prefix}%")
        )
    )
    try:
        nxt = int(last.rsplit("-", 1)[1]) + 1 if last else 1
    except (ValueError, IndexError):
        nxt = 1
    return f"{prefix}{nxt:05d}"


def recompute_invoice(inv: Invoice) -> None:
    """Keep balance/status consistent with amount + amount_paid. Never auto-sets 'Overdue'."""
    inv.balance = max(0, inv.amount - inv.amount_paid)
    if inv.balance == 0:
        inv.status = "Paid"
    elif inv.status == "Paid":  # an adjustment reopened a settled invoice
        inv.status = "Pending"


def apply_patient_balance(db: Session, patient_id: uuid.UUID, delta: int) -> None:
    """Atomic in-DB increment so two concurrent payments can't lose an update.

    ponytail: still a maintained denormal; could be SUM(invoice.balance) on read.
    """
    db.execute(
        update(Patient)
        .where(Patient.id == patient_id)
        .values(balance=func.greatest(0, Patient.balance + delta))
    )


def build_appointment_invoice(db: Session, appt: Appointment) -> Invoice:
    """The pending invoice auto-created when an appointment is booked."""
    return Invoice(
        tenant_id=appt.tenant_id,
        invoice_number=next_invoice_number(db, appt.tenant_id),
        patient_id=appt.patient_id,
        patient_name=appt.patient_name,
        appointment_id=appt.id,
        service_name=f"{appt.service_name} ({appt.procedure_code})",
        amount=appt.fee,
        amount_paid=0,
        balance=appt.fee,
        date=appt.date,
        due_date=appt.date,
        status="Pending",
    )
