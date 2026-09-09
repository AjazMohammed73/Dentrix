import uuid
from datetime import date

from pydantic import ConfigDict

from .common import CamelModel, Role


class UserOut(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID | None
    name: str
    email: str
    role: Role
    title: str
    phone: str | None
    permissions: dict
    status: str
    joined_at: date
