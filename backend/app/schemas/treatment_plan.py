import uuid
from datetime import date, datetime

from pydantic import ConfigDict, Field

from .common import CamelModel

_MAX_FEE = 100_000_000


class TreatmentPlanCreate(CamelModel):
    patient_id: uuid.UUID
    title: str = Field(default="", max_length=200)
    created_date: date
    created_by: str = Field(default="", max_length=200)
    phases: list[dict] = Field(default_factory=list, max_length=12)
    total_estimated_fee: int = Field(default=0, ge=0, le=_MAX_FEE)
    accepted_fee: int = Field(default=0, ge=0, le=_MAX_FEE)
    status: str = Field(default="Draft", max_length=20)
    patient_accepted_date: date | None = None


class TreatmentPlanUpdate(CamelModel):
    title: str | None = Field(default=None, max_length=200)
    phases: list[dict] | None = Field(default=None, max_length=12)
    total_estimated_fee: int | None = Field(default=None, ge=0, le=_MAX_FEE)
    accepted_fee: int | None = Field(default=None, ge=0, le=_MAX_FEE)
    status: str | None = Field(default=None, max_length=20)
    patient_accepted_date: date | None = None


class TreatmentPlanOut(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID
    patient_id: uuid.UUID
    title: str
    created_date: date
    created_by: str
    phases: list[dict]
    total_estimated_fee: int
    accepted_fee: int
    status: str
    patient_accepted_date: date | None
    created_at: datetime
