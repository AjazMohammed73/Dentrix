import uuid
from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


# Keys match the frontend UserPermissions type exactly.
DEFAULT_STAFF_PERMISSIONS: dict[str, bool] = {
    "canManageAppointments": True,
    "canManagePatients": True,
    "canWriteDoctorNotes": False,
    "canViewRevenue": False,
    "canManageServices": False,
    "canManageStaff": False,
}
FULL_PERMISSIONS: dict[str, bool] = {k: True for k in DEFAULT_STAFF_PERMISSIONS}


def _uuid() -> uuid.UUID:
    return uuid.uuid4()


class Tenant(Base):
    __tablename__ = "tenants"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=_uuid)
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
    # TenantSubscription shape, stored as-is for the frontend. Minor units (paise) for money.
    subscription: Mapped[dict] = mapped_column(JSONB, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    users: Mapped[list["User"]] = relationship(back_populates="tenant", cascade="all, delete-orphan")


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=_uuid)
    # null tenant_id => platform-level Super Admin
    tenant_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("tenants.id", ondelete="CASCADE"), nullable=True, index=True
    )
    name: Mapped[str] = mapped_column(String(200))
    email: Mapped[str] = mapped_column(String(200), unique=True, index=True)  # always stored lowercased
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
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    tenant: Mapped["Tenant | None"] = relationship(back_populates="users")
