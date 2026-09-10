import uuid
from datetime import datetime

from pydantic import ConfigDict, Field

from .common import CamelModel


class OperatoryChairCreate(CamelModel):
    name: str = Field(min_length=1, max_length=40)
    room_number: str | None = Field(default=None, max_length=40)
    chair_type: str = Field(default="General", max_length=30)
    is_active: bool = True
    color: str | None = Field(default=None, max_length=20)


class OperatoryChairUpdate(CamelModel):
    name: str | None = Field(default=None, min_length=1, max_length=40)
    room_number: str | None = Field(default=None, max_length=40)
    chair_type: str | None = Field(default=None, max_length=30)
    is_active: bool | None = None
    color: str | None = Field(default=None, max_length=20)


class OperatoryChairOut(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID
    name: str
    room_number: str | None
    chair_type: str
    is_active: bool
    color: str | None
    created_at: datetime
