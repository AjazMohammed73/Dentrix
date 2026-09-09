from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from ..database import get_db
from ..dependencies import require_audit_access
from ..models import AuditLog, User
from ..schemas.audit import AuditLogOut

router = APIRouter(prefix="/audit-logs", tags=["audit"])

DbSession = Annotated[Session, Depends(get_db)]
AuditViewer = Annotated[User, Depends(require_audit_access)]


@router.get("", response_model=list[AuditLogOut])
def list_audit_logs(
    user: AuditViewer,
    db: DbSession,
    q: str | None = None,
    limit: int = Query(200, ge=1, le=1000),
    offset: int = Query(0, ge=0),
) -> list[AuditLog]:
    stmt = select(AuditLog)
    if user.role != "SUPER_ADMIN":
        stmt = stmt.where(AuditLog.tenant_id == user.tenant_id)
    if q:
        like = f"%{q.lower()}%"
        stmt = stmt.where(
            or_(
                func.lower(AuditLog.details).like(like),
                func.lower(AuditLog.user_name).like(like),
                func.lower(AuditLog.action).like(like),
            )
        )
    stmt = stmt.order_by(AuditLog.timestamp.desc()).limit(limit).offset(offset)
    return list(db.scalars(stmt))
