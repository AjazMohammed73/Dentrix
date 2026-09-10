import uuid
from datetime import date, datetime
from typing import Annotated

from pydantic import ConfigDict, Field

from .common import CamelModel

_TEXT = 5_000
# ~7 MB base64 ≈ 5 MB binary — matches the frontend UploadRadiographModal cap.
_IMAGE = 7_500_000


class RadiographCreate(CamelModel):
    patient_id: uuid.UUID
    title: str = Field(default="", max_length=200)
    category: str = Field(default="", max_length=40)
    date_taken: date
    tooth_numbers: list[Annotated[int, Field(ge=1, le=32)]] = Field(default_factory=list, max_length=32)
    image_url: str = Field(default="", max_length=_IMAGE)
    findings: str = Field(default="", max_length=_TEXT)
    taken_by: str = Field(default="", max_length=200)
    notes: str | None = Field(default=None, max_length=_TEXT)


class RadiographUpdate(CamelModel):
    title: str | None = Field(default=None, max_length=200)
    category: str | None = Field(default=None, max_length=40)
    tooth_numbers: list[Annotated[int, Field(ge=1, le=32)]] | None = Field(default=None, max_length=32)
    findings: str | None = Field(default=None, max_length=_TEXT)
    notes: str | None = Field(default=None, max_length=_TEXT)


class RadiographOut(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID
    patient_id: uuid.UUID
    title: str
    category: str
    date_taken: date
    tooth_numbers: list[int]
    image_url: str
    findings: str
    taken_by: str
    notes: str | None
    created_at: datetime
