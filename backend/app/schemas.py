import uuid
from datetime import date
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field

Role = Literal["SUPER_ADMIN", "DOCTOR_ADMIN", "STAFF"]


class Permissions(BaseModel):
    canManageAppointments: bool = False
    canManagePatients: bool = False
    canWriteDoctorNotes: bool = False
    canViewRevenue: bool = False
    canManageServices: bool = False
    canManageStaff: bool = False


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=200)


class UserOut(BaseModel):
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


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
