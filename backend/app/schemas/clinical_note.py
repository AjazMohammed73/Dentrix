import uuid
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field

from .common import CamelModel


class Vitals(BaseModel):
    bloodPressure: str | None = None
    pulseRate: str | None = None


class ClinicalNoteCreate(CamelModel):
    patient_id: uuid.UUID
    date: date
    tooth_number: str | None = None
    tooth_numbers: list[int] = Field(default_factory=list)
    tooth_surfaces: list[str] = Field(default_factory=list)
    procedure_name: str = Field(min_length=1, max_length=200)
    diagnosis: str = ""
    notes: str = ""
    treatment_plan_summary: str | None = None
    vitals: Vitals = Field(default_factory=Vitals)


class ClinicalNoteOut(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID
    patient_id: uuid.UUID
    doctor_id: uuid.UUID | None
    doctor_name: str
    date: date
    tooth_number: str | None
    tooth_numbers: list[int]
    tooth_surfaces: list[str]
    procedure_name: str
    diagnosis: str
    notes: str
    treatment_plan_summary: str | None
    vitals: Vitals
    doctor_signature: str
    signed_at: datetime
    created_at: datetime
