from __future__ import annotations

import uuid
from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, TimestampMixin, uuid_pk


class ClinicalNote(Base, TimestampMixin):
    """Append-only: signed and locked on create, never edited or deleted."""

    __tablename__ = "clinical_notes"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid_pk)
    tenant_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("tenants.id", ondelete="CASCADE"), index=True
    )
    patient_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("patients.id", ondelete="CASCADE"), index=True
    )
    doctor_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    doctor_name: Mapped[str] = mapped_column(String(200), default="")
    date: Mapped[date] = mapped_column(Date)
    tooth_number: Mapped[str | None] = mapped_column(String(120), nullable=True)
    tooth_numbers: Mapped[list] = mapped_column(JSONB, default=list)   # list[int]
    tooth_surfaces: Mapped[list] = mapped_column(JSONB, default=list)  # list[str]
    procedure_name: Mapped[str] = mapped_column(String(200), default="")
    diagnosis: Mapped[str] = mapped_column(Text, default="")
    notes: Mapped[str] = mapped_column(Text, default="")
    treatment_plan_summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    vitals: Mapped[dict] = mapped_column(JSONB, default=dict)  # {bloodPressure, pulseRate}
    doctor_signature: Mapped[str] = mapped_column(String(200), default="")
    signed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
