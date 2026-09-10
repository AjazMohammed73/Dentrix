import uuid
from datetime import datetime

from pydantic import ConfigDict

from .common import CamelModel


class AuditLogOut(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID | None
    timestamp: datetime
    user_id: uuid.UUID | None
    user_name: str
    user_role: str
    action: str
    resource_type: str
    resource_id: str | None
    details: str
    ip_address: str | None
