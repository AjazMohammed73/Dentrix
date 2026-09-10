import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..audit import record_audit
from ..database import get_db
from ..dependencies import CurrentUser, Pagination, require_permission, scoped
from ..models import OperatoryChairConfig, Tenant, User
from ..schemas.operatory_chair import (
    OperatoryChairCreate,
    OperatoryChairOut,
    OperatoryChairUpdate,
)

router = APIRouter(prefix="/operatory-chairs", tags=["operatory-chairs"])

ManageChairs = Annotated[User, Depends(require_permission("canManageServices"))]
DbSession = Annotated[Session, Depends(get_db)]


def _get_owned(db: Session, user: User, chair_id: uuid.UUID) -> OperatoryChairConfig:
    chair = db.get(OperatoryChairConfig, chair_id)
    if chair is None or (user.role != "SUPER_ADMIN" and chair.tenant_id != user.tenant_id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Operatory chair not found")
    return chair


@router.get("", response_model=list[OperatoryChairOut])
def list_operatory_chairs(
    user: CurrentUser, db: DbSession, page: Pagination
) -> list[OperatoryChairConfig]:
    stmt = (
        scoped(select(OperatoryChairConfig), OperatoryChairConfig.tenant_id, user)
        .order_by(OperatoryChairConfig.name)
        .limit(page.limit)
        .offset(page.offset)
    )
    return list(db.scalars(stmt))


@router.post("", response_model=OperatoryChairOut, status_code=status.HTTP_201_CREATED)
def create_operatory_chair(
    body: OperatoryChairCreate, request: Request, user: ManageChairs, db: DbSession
) -> OperatoryChairConfig:
    if user.role == "SUPER_ADMIN":
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Super Admin cannot configure clinic chairs")

    # Enforce the plan's chair quota server-side (the frontend check is advisory).
    tenant = db.get(Tenant, user.tenant_id)
    limit = int((tenant.subscription or {}).get("chairLimit") or 6) if tenant else 6
    active = db.scalar(
        select(func.count())
        .select_from(OperatoryChairConfig)
        .where(
            OperatoryChairConfig.tenant_id == user.tenant_id,
            OperatoryChairConfig.is_active.is_(True),
        )
    )
    if body.is_active and (active or 0) >= limit:
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            f"Plan chair quota ({limit}) reached. Upgrade the subscription to add more active chairs.",
        )

    chair = OperatoryChairConfig(
        tenant_id=user.tenant_id,
        name=body.name,
        room_number=body.room_number,
        chair_type=body.chair_type,
        is_active=body.is_active,
        color=body.color,
    )
    db.add(chair)
    db.flush()
    record_audit(
        db, request, user, "CHAIR_CREATED", "Chair", chair.id,
        f"Added operatory chair '{chair.name}'",
    )
    db.commit()
    db.refresh(chair)
    return chair


@router.patch("/{chair_id}", response_model=OperatoryChairOut)
def update_operatory_chair(
    chair_id: uuid.UUID, body: OperatoryChairUpdate, request: Request, user: ManageChairs, db: DbSession
) -> OperatoryChairConfig:
    chair = _get_owned(db, user, chair_id)
    data = body.model_dump(exclude_unset=True)
    if data.get("is_active") and not chair.is_active:  # reactivating counts against the quota
        tenant = db.get(Tenant, user.tenant_id)
        limit = int((tenant.subscription or {}).get("chairLimit") or 6) if tenant else 6
        active = db.scalar(
            select(func.count())
            .select_from(OperatoryChairConfig)
            .where(
                OperatoryChairConfig.tenant_id == user.tenant_id,
                OperatoryChairConfig.is_active.is_(True),
            )
        )
        if (active or 0) >= limit:
            raise HTTPException(
                status.HTTP_409_CONFLICT,
                f"Plan chair quota ({limit}) reached. Upgrade the subscription to activate more chairs.",
            )
    for field, value in data.items():
        if value is not None or field in ("room_number", "color"):  # those two are nullable
            setattr(chair, field, value)
    record_audit(
        db, request, user, "CHAIR_UPDATED", "Chair", chair.id,
        f"Updated operatory chair '{chair.name}'",
    )
    db.commit()
    db.refresh(chair)
    return chair


@router.delete("/{chair_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_operatory_chair(
    chair_id: uuid.UUID, request: Request, user: ManageChairs, db: DbSession
) -> None:
    # Existing appointments snapshot the chair name as a string, so removing the
    # config row doesn't orphan them.
    chair = _get_owned(db, user, chair_id)
    record_audit(
        db, request, user, "CHAIR_DELETED", "Chair", chair.id,
        f"Removed operatory chair '{chair.name}'",
    )
    db.delete(chair)
    db.commit()
