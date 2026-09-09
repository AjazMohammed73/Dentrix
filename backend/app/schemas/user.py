import uuid
from datetime import date
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from .common import CamelModel, Role, UserStatus


class Permissions(BaseModel):
    canManageAppointments: bool = False
    canManagePatients: bool = False
    canWriteDoctorNotes: bool = False
    canViewRevenue: bool = False
    canManageServices: bool = False
    canManageStaff: bool = False


class UserCreate(CamelModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    title: str = ""
    phone: str | None = None
    role: Literal["STAFF", "DOCTOR_ADMIN"] = "STAFF"
    password: str = Field(min_length=8, max_length=200)
    permissions: Permissions | None = None
    tenant_id: uuid.UUID | None = None  # Super Admin only; clinic users are forced to their own


class UserUpdate(CamelModel):
    name: str | None = None
    title: str | None = None
    phone: str | None = None
    role: Role | None = None          # Super Admin only
    status: UserStatus | None = None
    permissions: dict | None = None   # merged into the existing permissions, not replaced


class UserOut(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID | None
    name: str
    email: str
    role: Role
    title: str
    phone: str | None
    permissions: dict
    status: str
    joined_at: date
