from __future__ import annotations

import uuid
from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin, uuid_pk


class Invoice(Base, TimestampMixin):
    __tablename__ = "invoices"
    __table_args__ = (
        UniqueConstraint("tenant_id", "invoice_number", name="uq_invoices_tenant_number"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid_pk)
    tenant_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("tenants.id", ondelete="CASCADE"), index=True
    )
    invoice_number: Mapped[str] = mapped_column(String(40))
    patient_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("patients.id", ondelete="CASCADE"), index=True
    )
    patient_name: Mapped[str] = mapped_column(String(200))
    appointment_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("appointments.id", ondelete="SET NULL"), nullable=True
    )
    service_name: Mapped[str] = mapped_column(String(300), default="")
    amount: Mapped[int] = mapped_column(Integer, default=0)        # whole INR
    amount_paid: Mapped[int] = mapped_column(Integer, default=0)
    # ponytail: maintained denormal; could be SUM over installments on read
    balance: Mapped[int] = mapped_column(Integer, default=0)
    date: Mapped[date] = mapped_column(Date)
    due_date: Mapped[date] = mapped_column(Date)
    status: Mapped[str] = mapped_column(String(20), default="Pending")  # Paid | Pending | Overdue
    payment_method: Mapped[str | None] = mapped_column(String(40), nullable=True)
    insurance_claim: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    installments: Mapped[list[PaymentInstallment]] = relationship(
        back_populates="invoice",
        cascade="all, delete-orphan",
        order_by="PaymentInstallment.created_at",
    )


class PaymentInstallment(Base, TimestampMixin):
    __tablename__ = "payment_installments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid_pk)
    invoice_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("invoices.id", ondelete="CASCADE"), index=True
    )
    receipt_number: Mapped[str | None] = mapped_column(String(40), nullable=True)
    date: Mapped[date] = mapped_column(Date)
    amount: Mapped[int] = mapped_column(Integer)
    method: Mapped[str] = mapped_column(String(40))
    collected_by: Mapped[str | None] = mapped_column(String(200), nullable=True)
    recorded_by: Mapped[str | None] = mapped_column(String(200), nullable=True)
    notes: Mapped[str | None] = mapped_column(String(500), nullable=True)

    invoice: Mapped[Invoice] = relationship(back_populates="installments")
