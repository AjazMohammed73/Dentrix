import uuid
from datetime import date, datetime

from pydantic import ConfigDict, Field, field_validator

from .common import CamelModel

_TEXT = 5_000


def _bounded_teeth(v: dict | None) -> dict | None:
    if v is not None and len(v) > 52:  # 32 permanent + 20 primary is the ceiling
        raise ValueError("too many teeth in the chart")
    return v


class PerioChartCreate(CamelModel):
    patient_id: uuid.UUID
    exam_date: date
    examined_by: str = Field(default="", max_length=200)
    teeth: dict = Field(default_factory=dict)  # {toothNumber: PerioToothRecord}
    summary_notes: str | None = Field(default=None, max_length=_TEXT)

    _check_teeth = field_validator("teeth")(_bounded_teeth)


class PerioChartUpdate(CamelModel):
    exam_date: date | None = None
    examined_by: str | None = Field(default=None, max_length=200)
    teeth: dict | None = None
    summary_notes: str | None = Field(default=None, max_length=_TEXT)

    _check_teeth = field_validator("teeth")(_bounded_teeth)


class PerioChartOut(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID
    patient_id: uuid.UUID
    exam_date: date
    examined_by: str
    teeth: dict
    summary_notes: str | None
    created_at: datetime
