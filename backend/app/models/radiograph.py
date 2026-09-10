from __future__ import annotations

import uuid
from datetime import date

from sqlalchemy import Date, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, TimestampMixin, uuid_pk


class Radiograph(Base, TimestampMixin):
    __tablename__ = "radiographs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid_pk)
    tenant_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("tenants.id", ondelete="CASCADE"), index=True
    )
    patient_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("patients.id", ondelete="CASCADE"), index=True
    )
    title: Mapped[str] = mapped_column(String(200), default="")
    category: Mapped[str] = mapped_column(String(40), default="")
    date_taken: Mapped[date] = mapped_column(Date)
    tooth_numbers: Mapped[list] = mapped_column(JSONB, default=list)  # list[int]
    # ponytail: base64 data URL in a TEXT column — matches the frontend's 5 MB cap.
    # Move to S3/R2 + store only the key when images get large or numerous.
    image_url: Mapped[str] = mapped_column(Text, default="")
    findings: Mapped[str] = mapped_column(Text, default="")
    taken_by: Mapped[str] = mapped_column(String(200), default="")
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
