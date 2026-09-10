import uuid
from datetime import date, datetime

from pydantic import ConfigDict, Field

from .common import CamelModel

_TEXT = 5_000


class PrescriptionCreate(CamelModel):
    patient_id: uuid.UUID
    patient_name: str = Field(default="", max_length=200)
    patient_age: int | None = Field(default=None, ge=0, le=150)
    patient_gender: str | None = Field(default=None, max_length=20)
    doctor_registration_number: str | None = Field(default=None, max_length=80)
    date: date
    diagnosis: str = Field(default="", max_length=_TEXT)
    items: list[dict] = Field(default_factory=list, max_length=50)
    notes: str | None = Field(default=None, max_length=_TEXT)


class PrescriptionOut(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID
    patient_id: uuid.UUID
    patient_name: str
    patient_age: int | None
    patient_gender: str | None
    doctor_id: uuid.UUID | None
    doctor_name: str
    doctor_registration_number: str | None
    date: date
    diagnosis: str
    items: list[dict]
    notes: str | None
    created_at: datetime
