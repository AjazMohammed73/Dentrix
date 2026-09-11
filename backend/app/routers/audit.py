from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from ..database import get_db
from ..dependencies import require_super_admin
from ..models import AuditLog, User
from ..schemas.audit import AuditLogOut

router = APIRouter(prefix="/audit-logs", tags=["audit"])

DbSession = Annotated[Session, Depends(get_db)]
AuditViewer = Annotated[User, Depends(require_super_admin)]


@router.get("", response_model=list[AuditLogOut])
def list_audit_logs(
    user: AuditViewer,
    db: DbSession,
    q: str | None = Query(default=None, max_length=200),
    limit: int = Query(200, ge=1, le=1000),
    offset: int = Query(0, ge=0),
) -> list[AuditLog]:
    stmt = select(AuditLog)
    if q:
        # escape LIKE metacharacters so a query of "%" / "_" can't force a full scan
        safe = q.lower().replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")
        like = f"%{safe}%"
        stmt = stmt.where(
            or_(
                func.lower(AuditLog.details).like(like, escape="\\"),
                func.lower(AuditLog.user_name).like(like, escape="\\"),
                func.lower(AuditLog.action).like(like, escape="\\"),
            )
        )
    stmt = stmt.order_by(AuditLog.timestamp.desc()).limit(limit).offset(offset)
    return list(db.scalars(stmt))
