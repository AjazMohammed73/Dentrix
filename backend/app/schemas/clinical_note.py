import uuid
from datetime import date, datetime
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field

from .common import CamelModel

_NARRATIVE = 20_000  # generous cap for the operative narrative; blocks multi-MB blobs


class Vitals(BaseModel):
    bloodPressure: str | None = Field(default=None, max_length=40)
    pulseRate: str | None = Field(default=None, max_length=40)


class ClinicalNoteCreate(CamelModel):
    patient_id: uuid.UUID
    date: date
    tooth_number: str | None = Field(default=None, max_length=120)
    tooth_numbers: list[Annotated[int, Field(ge=1, le=32)]] = Field(default_factory=list, max_length=32)
    tooth_surfaces: list[Annotated[str, Field(max_length=2)]] = Field(default_factory=list, max_length=8)
    procedure_name: str = Field(min_length=1, max_length=200)
    diagnosis: str = Field(default="", max_length=_NARRATIVE)
    notes: str = Field(default="", max_length=_NARRATIVE)
    treatment_plan_summary: str | None = Field(default=None, max_length=_NARRATIVE)
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
