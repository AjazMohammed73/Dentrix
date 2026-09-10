from __future__ import annotations

import uuid
from datetime import date

from sqlalchemy import Date, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, TimestampMixin, uuid_pk


class PerioChart(Base, TimestampMixin):
    __tablename__ = "perio_charts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid_pk)
    tenant_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("tenants.id", ondelete="CASCADE"), index=True
    )
    patient_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("patients.id", ondelete="CASCADE"), index=True
    )
    exam_date: Mapped[date] = mapped_column(Date)
    examined_by: Mapped[str] = mapped_column(String(200), default="")
    teeth: Mapped[dict] = mapped_column(JSONB, default=dict)  # {toothNumber: PerioToothRecord}
    summary_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
