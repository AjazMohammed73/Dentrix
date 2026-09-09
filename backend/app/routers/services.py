import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..audit import record_audit
from ..database import get_db
from ..dependencies import CurrentUser, require_permission, resolve_write_tenant, scoped
from ..models import Service, User
from ..schemas.service import ServiceCreate, ServiceOut, ServiceUpdate

router = APIRouter(prefix="/services", tags=["services"])

ManageServices = Annotated[User, Depends(require_permission("canManageServices"))]
DbSession = Annotated[Session, Depends(get_db)]


def _get_owned(db: Session, user: User, service_id: uuid.UUID) -> Service:
    service = db.get(Service, service_id)
    if service is None or (user.role != "SUPER_ADMIN" and service.tenant_id != user.tenant_id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Service not found")
    return service


@router.get("", response_model=list[ServiceOut])
def list_services(user: CurrentUser, db: DbSession) -> list[Service]:
    # Any authenticated clinic member can read the catalog (needed to book / bill).
    stmt = scoped(select(Service), Service.tenant_id, user).order_by(Service.code)
    return list(db.scalars(stmt))


@router.post("", response_model=ServiceOut, status_code=status.HTTP_201_CREATED)
def create_service(
    body: ServiceCreate, request: Request, user: ManageServices, db: DbSession
) -> Service:
    tenant_id = resolve_write_tenant(user, body.tenant_id)
    data = body.model_dump(exclude={"tenant_id"})
    data["code"] = data["code"].strip().upper()
    service = Service(tenant_id=tenant_id, **data)
    db.add(service)
    db.flush()
    record_audit(
        db, request, user, "SERVICE_CREATED", "Service", service.id,
        f"Added procedure {service.code} {service.name}",
    )
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            f"A service with code {data['code']} already exists for this clinic",
        )
    db.refresh(service)
    return service


@router.patch("/{service_id}", response_model=ServiceOut)
def update_service(
    service_id: uuid.UUID,
    body: ServiceUpdate,
    request: Request,
    user: ManageServices,
    db: DbSession,
) -> Service:
    service = _get_owned(db, user, service_id)
    updates = body.model_dump(exclude_unset=True)
    if updates.get("code"):
        updates["code"] = updates["code"].strip().upper()
    for key, value in updates.items():
        setattr(service, key, value)
    record_audit(
        db, request, user, "SERVICE_UPDATED", "Service", service.id,
        f"Updated procedure {service.code} {service.name}",
    )
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            "That CDT code is already used by another service in this clinic",
        )
    db.refresh(service)
    return service
