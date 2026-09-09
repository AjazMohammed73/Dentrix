from __future__ import annotations

import uuid
from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Date, ForeignKey, String
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import DEFAULT_STAFF_PERMISSIONS, Base, TimestampMixin, uuid_pk

if TYPE_CHECKING:
    from .tenant import Tenant


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid_pk)
    # null tenant_id => platform-level Super Admin
    tenant_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("tenants.id", ondelete="CASCADE"), nullable=True, index=True
    )
    name: Mapped[str] = mapped_column(String(200))
    email: Mapped[str] = mapped_column(String(200), unique=True, index=True)  # stored lowercased
    role: Mapped[str] = mapped_column(String(20))  # SUPER_ADMIN | DOCTOR_ADMIN | STAFF
    title: Mapped[str] = mapped_column(String(200), default="")
    password_hash: Mapped[str] = mapped_column(String(255))
    phone: Mapped[str | None] = mapped_column(String(40), nullable=True)
    avatar: Mapped[str | None] = mapped_column(String(500), nullable=True)
    permissions: Mapped[dict] = mapped_column(
        JSONB, default=lambda: dict(DEFAULT_STAFF_PERMISSIONS)
    )
    status: Mapped[str] = mapped_column(String(20), default="active")  # active | inactive | suspended
    joined_at: Mapped[date] = mapped_column(Date, default=date.today)

    tenant: Mapped[Tenant | None] = relationship(back_populates="users")
