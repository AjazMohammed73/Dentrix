"""Shared billing helpers used by the appointments and invoices routers."""

import uuid
from datetime import date

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from .models import Appointment, Invoice, Patient


def next_invoice_number(db: Session, tenant_id: uuid.UUID) -> str:
    """INV-<year>-<00001..>, per tenant.

    ponytail: count-based; the appointments router retries once on the unique-constraint
    collision. Move to a per-tenant Postgres sequence only if bookings go truly concurrent.
    """
    prefix = f"INV-{date.today().year}-"
    used = db.scalar(
        select(func.count())
        .select_from(Invoice)
        .where(Invoice.tenant_id == tenant_id, Invoice.invoice_number.like(f"{prefix}%"))
    )
    return f"{prefix}{(used or 0) + 1:05d}"


def recompute_invoice(inv: Invoice) -> None:
    """Keep balance/status consistent with amount + amount_paid. Never auto-sets 'Overdue'."""
    inv.balance = max(0, inv.amount - inv.amount_paid)
    if inv.balance == 0:
        inv.status = "Paid"
    elif inv.status == "Paid":  # an adjustment reopened a settled invoice
        inv.status = "Pending"


def apply_patient_balance(db: Session, patient_id: uuid.UUID, delta: int) -> None:
    """ponytail: maintained denormal; could be SUM(invoice.balance) computed on read."""
    patient = db.get(Patient, patient_id)
    if patient is not None:
        patient.balance = max(0, patient.balance + delta)


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
