"""Server-side audit trail.

`record_audit()` only adds a row to the caller's session — it is committed (or rolled
back) in the same transaction as the action being logged, so a failed action never
leaves an audit entry claiming it happened.
"""

from fastapi import Request
from sqlalchemy.orm import Session

from .models import AuditLog, User

_UNSET = object()


def _client_ip(request: Request | None) -> str | None:
    if request is None:
        return None
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else None


def record_audit(
    db: Session,
    request: Request | None,
    actor: User | None,
    action: str,
    resource_type: str,
    resource_id: object = None,
    details: str = "",
    *,
    tenant_id: object = _UNSET,
) -> None:
    db.add(
        AuditLog(
            tenant_id=(actor.tenant_id if actor else None) if tenant_id is _UNSET else tenant_id,
            user_id=actor.id if actor else None,
            user_name=actor.name if actor else "",
            user_role=actor.role if actor else "",
            action=action,
            resource_type=resource_type,
            resource_id=str(resource_id) if resource_id is not None else None,
            details=details,
            ip_address=_client_ip(request),
        )
    )
