import uuid
from datetime import datetime

from pydantic import ConfigDict, Field

from .common import CamelModel, ServiceCategory


class ServiceBase(CamelModel):
    code: str = Field(min_length=1, max_length=16)
    name: str = Field(min_length=1, max_length=200)
    category: ServiceCategory = "Preventive"
    duration_minutes: int = Field(default=30, ge=0, le=600)
    base_price: int = Field(default=0, ge=0, le=100_000_000)
    description: str = Field(default="", max_length=2000)
    is_active: bool = True


class ServiceCreate(ServiceBase):
    # Super Admin only; ignored for clinic users (forced to their own tenant).
    tenant_id: uuid.UUID | None = None


class ServiceUpdate(CamelModel):
    code: str | None = Field(default=None, max_length=16)
    name: str | None = Field(default=None, max_length=200)
    category: ServiceCategory | None = None
    duration_minutes: int | None = Field(default=None, ge=0, le=600)
    base_price: int | None = Field(default=None, ge=0, le=100_000_000)
    description: str | None = Field(default=None, max_length=2000)
    is_active: bool | None = None


class ServiceOut(ServiceBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID
    created_at: datetime
