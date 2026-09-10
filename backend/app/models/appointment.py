from __future__ import annotations

import uuid
from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, TimestampMixin, uuid_pk


class Appointment(Base, TimestampMixin):
    __tablename__ = "appointments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid_pk)
    tenant_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("tenants.id", ondelete="CASCADE"), index=True
    )
    patient_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("patients.id", ondelete="CASCADE"), index=True
    )
    patient_name: Mapped[str] = mapped_column(String(200))
    patient_phone: Mapped[str] = mapped_column(String(40), default="")
    doctor_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    doctor_name: Mapped[str] = mapped_column(String(200), default="")
    service_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("services.id", ondelete="SET NULL"), nullable=True
    )
    service_name: Mapped[str] = mapped_column(String(200), default="")
    procedure_code: Mapped[str] = mapped_column(String(16), default="")
    date: Mapped[date] = mapped_column(Date, index=True)
    # ponytail: "HH:mm" strings, mirrors the frontend; switch to Time if range queries are needed
    start_time: Mapped[str] = mapped_column(String(5))
    end_time: Mapped[str] = mapped_column(String(5))
    duration_minutes: Mapped[int] = mapped_column(Integer, default=30)
    operatory_chair: Mapped[str] = mapped_column(String(40))
    status: Mapped[str] = mapped_column(String(20), default="Scheduled")
    notes: Mapped[str] = mapped_column(Text, default="")
    fee: Mapped[int] = mapped_column(Integer, default=0)  # whole INR
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
