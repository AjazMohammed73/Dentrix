from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import DateTime, Index, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base, uuid_pk


class AuditLog(Base):
    """Append-only trail.

    No foreign keys on purpose: rows must outlive the users/tenants they reference.
    For real immutability, REVOKE UPDATE, DELETE on this table from the app's DB role
    (see backend/README.md).
    """

    __tablename__ = "audit_logs"
    __table_args__ = (Index("ix_audit_logs_tenant_time", "tenant_id", "timestamp"),)

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid_pk)
    tenant_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), nullable=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    user_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), nullable=True)
    user_name: Mapped[str] = mapped_column(String(200), default="")
    user_role: Mapped[str] = mapped_column(String(20), default="")
    action: Mapped[str] = mapped_column(String(40))
    resource_type: Mapped[str] = mapped_column(String(40))
    resource_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    details: Mapped[str] = mapped_column(Text, default="")
    ip_address: Mapped[str | None] = mapped_column(String(64), nullable=True)
