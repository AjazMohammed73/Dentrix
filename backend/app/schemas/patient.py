import uuid
from datetime import date, datetime

from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field

from .common import CamelModel, Gender, PatientStatus

_S = 120   # short free-text
_M = 300   # medium free-text


class Insurance(BaseModel):
    provider: str = Field(default="", max_length=_S)
    policyNumber: str = Field(default="", max_length=_S)
    groupNumber: str = Field(default="", max_length=_S)


class EmergencyContact(BaseModel):
    name: str = Field(default="", max_length=_S)
    phone: str = Field(default="", max_length=40)
    relationship: str = Field(default="", max_length=_S)


class PatientBase(CamelModel):
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    email: str = Field(default="", max_length=200)
    phone: str = Field(default="", max_length=40)
    date_of_birth: date | None = None
    gender: Gender = "Other"
    address: str = Field(default="", max_length=_M)
    insurance: Insurance = Field(default_factory=Insurance)
    emergency_contact: EmergencyContact = Field(default_factory=EmergencyContact)
    medical_alerts: list[Annotated[str, Field(max_length=120)]] = Field(default_factory=list, max_length=30)
    balance: int = Field(default=0, ge=0, le=100_000_000)
    last_visit: date | None = None
    next_visit: date | None = None
    status: PatientStatus = "Active"


class PatientCreate(PatientBase):
    pass


class PatientUpdate(CamelModel):
    first_name: str | None = Field(default=None, min_length=1, max_length=100)
    last_name: str | None = Field(default=None, min_length=1, max_length=100)
    email: str | None = Field(default=None, max_length=200)
    phone: str | None = Field(default=None, max_length=40)
    date_of_birth: date | None = None
    gender: Gender | None = None
    address: str | None = Field(default=None, max_length=_M)
    insurance: Insurance | None = None
    emergency_contact: EmergencyContact | None = None
    medical_alerts: list[Annotated[str, Field(max_length=120)]] | None = Field(default=None, max_length=30)
    balance: int | None = Field(default=None, ge=0, le=100_000_000)
    last_visit: date | None = None
    next_visit: date | None = None
    status: PatientStatus | None = None


class PatientOut(PatientBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID
    created_at: datetime
