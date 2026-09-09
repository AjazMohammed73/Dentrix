import uuid
from datetime import datetime

from sqlalchemy import DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


def uuid_pk() -> uuid.UUID:
    return uuid.uuid4()


# Keys mirror the frontend `UserPermissions` type exactly.
DEFAULT_STAFF_PERMISSIONS: dict[str, bool] = {
    "canManageAppointments": True,
    "canManagePatients": True,
    "canWriteDoctorNotes": False,
    "canViewRevenue": False,
    "canManageServices": False,
    "canManageStaff": False,
}
FULL_PERMISSIONS: dict[str, bool] = dict.fromkeys(DEFAULT_STAFF_PERMISSIONS, True)
