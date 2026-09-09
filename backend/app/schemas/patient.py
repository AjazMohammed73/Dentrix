import uuid
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field

from .common import CamelModel, Gender, PatientStatus


class Insurance(BaseModel):
    provider: str = ""
    policyNumber: str = ""
    groupNumber: str = ""


class EmergencyContact(BaseModel):
    name: str = ""
    phone: str = ""
    relationship: str = ""


class PatientBase(CamelModel):
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    email: str = ""
    phone: str = ""
    date_of_birth: date | None = None
    gender: Gender = "Other"
    address: str = ""
    insurance: Insurance = Field(default_factory=Insurance)
    emergency_contact: EmergencyContact = Field(default_factory=EmergencyContact)
    medical_alerts: list[str] = Field(default_factory=list)
    balance: int = Field(default=0, ge=0)
    last_visit: date | None = None
    next_visit: date | None = None
    status: PatientStatus = "Active"


class PatientCreate(PatientBase):
    pass


class PatientUpdate(CamelModel):
    first_name: str | None = Field(default=None, max_length=100)
    last_name: str | None = Field(default=None, max_length=100)
    email: str | None = None
    phone: str | None = None
    date_of_birth: date | None = None
    gender: Gender | None = None
    address: str | None = None
    insurance: Insurance | None = None
    emergency_contact: EmergencyContact | None = None
    medical_alerts: list[str] | None = None
    balance: int | None = Field(default=None, ge=0)
    last_visit: date | None = None
    next_visit: date | None = None
    status: PatientStatus | None = None


class PatientOut(PatientBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID
    created_at: datetime
