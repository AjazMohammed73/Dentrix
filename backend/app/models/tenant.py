from __future__ import annotations

import uuid
from typing import TYPE_CHECKING

from sqlalchemy import Integer, String
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin, uuid_pk

if TYPE_CHECKING:
    from .user import User


class Tenant(Base, TimestampMixin):
    __tablename__ = "tenants"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid_pk)
    name: Mapped[str] = mapped_column(String(200))
    slug: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    address: Mapped[str] = mapped_column(String(300), default="")
    phone: Mapped[str] = mapped_column(String(40), default="")
    email: Mapped[str] = mapped_column(String(200), default="")
    status: Mapped[str] = mapped_column(String(20), default="active")  # active | suspended
    doctor_admin_name: Mapped[str] = mapped_column(String(200), default="")
    doctor_admin_email: Mapped[str] = mapped_column(String(200), default="")
    storage_mb: Mapped[int] = mapped_column(Integer, default=0)
    plan: Mapped[str] = mapped_column(String(40), default="Professional")
    # TenantSubscription shape from the frontend; money fields are whole INR.
    subscription: Mapped[dict] = mapped_column(JSONB, default=dict)

    users: Mapped[list[User]] = relationship(
        back_populates="tenant", cascade="all, delete-orphan"
    )
