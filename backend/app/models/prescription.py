from __future__ import annotations

import uuid
from datetime import date

from sqlalchemy import Date, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, TimestampMixin, uuid_pk


class Prescription(Base, TimestampMixin):
    __tablename__ = "prescriptions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid_pk)
    tenant_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("tenants.id", ondelete="CASCADE"), index=True
    )
    patient_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("patients.id", ondelete="CASCADE"), index=True
    )
    patient_name: Mapped[str] = mapped_column(String(200), default="")
    patient_age: Mapped[int | None] = mapped_column(nullable=True)
    patient_gender: Mapped[str | None] = mapped_column(String(20), nullable=True)
    doctor_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    doctor_name: Mapped[str] = mapped_column(String(200), default="")
    doctor_registration_number: Mapped[str | None] = mapped_column(String(80), nullable=True)
    date: Mapped[date] = mapped_column(Date)
    diagnosis: Mapped[str] = mapped_column(Text, default="")
    items: Mapped[list] = mapped_column(JSONB, default=list)  # list[PrescriptionItem]
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
