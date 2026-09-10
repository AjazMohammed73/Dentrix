from __future__ import annotations

import uuid
from datetime import date

from sqlalchemy import Date, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, TimestampMixin, uuid_pk


class Patient(Base, TimestampMixin):
    __tablename__ = "patients"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid_pk)
    tenant_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("tenants.id", ondelete="CASCADE"), index=True
    )
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(200), default="")
    phone: Mapped[str] = mapped_column(String(40), default="")
    date_of_birth: Mapped[date | None] = mapped_column(Date, nullable=True)
    gender: Mapped[str] = mapped_column(String(20), default="Other")
    address: Mapped[str] = mapped_column(String(300), default="")
    insurance: Mapped[dict] = mapped_column(JSONB, default=dict)          # provider, policyNumber, groupNumber
    emergency_contact: Mapped[dict] = mapped_column(JSONB, default=dict)  # name, phone, relationship
    medical_alerts: Mapped[list] = mapped_column(JSONB, default=list)     # list[str]
    # ponytail: whole-INR integer; move to paise only if sub-rupee billing ever appears
    balance: Mapped[int] = mapped_column(Integer, default=0)
    last_visit: Mapped[date | None] = mapped_column(Date, nullable=True)
    next_visit: Mapped[date | None] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="Active")  # Active | Inactive
