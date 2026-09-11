import uuid
from datetime import date, timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..audit import record_audit
from ..database import get_db
from ..dependencies import CurrentUser, require_super_admin
from ..models import FULL_PERMISSIONS, OperatoryChairConfig, Tenant, User
from ..schemas.tenant import (
    AssignDoctorAdminRequest,
    TenantCreate,
    TenantOut,
    TenantUpdate,
)
from ..security import hash_password

router = APIRouter(prefix="/tenants", tags=["tenants"])

DbSession = Annotated[Session, Depends(get_db)]
SuperAdmin = Annotated[User, Depends(require_super_admin)]

# (monthly fee in INR, chair limit) per plan
_PLAN_DEFAULTS: dict[str, tuple[int, int]] = {
    "Starter": (7999, 2),
    "Professional": (15999, 6),
    "Enterprise": (31999, 15),
}

_DOCTOR_TITLE_HINTS = ("Doctor", "DDS", "DMD")

# Standard starter chairs given to every new clinic (real DB rows, not a client-side fallback).
_DEFAULT_CHAIRS = [
    ("Chair 1 - Hygiene", "Hygiene", "sky"),
    ("Chair 2 - Surgery", "Surgery", "rose"),
    ("Chair 3 - General", "General", "emerald"),
]


@router.get("", response_model=list[TenantOut])
def list_tenants(user: CurrentUser, db: DbSession) -> list[Tenant]:
    if user.role == "SUPER_ADMIN":
        return list(db.scalars(select(Tenant).order_by(Tenant.name)))
    tenant = db.get(Tenant, user.tenant_id) if user.tenant_id else None
    return [tenant] if tenant else []


@router.post("", response_model=TenantOut, status_code=status.HTTP_201_CREATED)
def onboard_tenant(
    body: TenantCreate, request: Request, actor: SuperAdmin, db: DbSession
) -> Tenant:
    fee, chairs = _PLAN_DEFAULTS[body.plan]
    doctor_email = body.doctor_email.strip().lower()
    tenant = Tenant(
        name=body.name.strip(),
        slug=body.slug.strip().lower(),
        address=body.address,
        phone=body.phone,
        email=body.email,
        status="active",
        doctor_admin_name=body.doctor_name.strip(),
        doctor_admin_email=doctor_email,
        storage_mb=0,
        plan=body.plan,
        subscription={
            "plan": body.plan,
            "status": "Active",
            "billingCycle": "Monthly",
            "monthlyFee": fee,
            "chairLimit": chairs,
            "renewalDate": (date.today() + timedelta(days=30)).isoformat(),
            "autoRenew": True,
        },
    )
    db.add(tenant)
    try:
        db.flush()
        db.add(
            User(
                tenant_id=tenant.id,
                name=body.doctor_name.strip(),
                email=doctor_email,
                role="DOCTOR_ADMIN",
                title="Doctor Admin & Clinic Owner",
                password_hash=hash_password(body.doctor_password),
                permissions=dict(FULL_PERMISSIONS),
                status="active",
            )
        )
        for name, chair_type, color in _DEFAULT_CHAIRS:
            db.add(
                OperatoryChairConfig(
                    tenant_id=tenant.id, name=name, chair_type=chair_type, is_active=True, color=color,
                )
            )
        record_audit(
            db, request, actor, "TENANT_CREATED", "Tenant", tenant.id,
            f"Onboarded {tenant.name} ({tenant.slug})", tenant_id=tenant.id,
        )
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status.HTTP_409_CONFLICT, "That slug or doctor email is already in use"
        )
    db.refresh(tenant)
    return tenant


@router.patch("/{tenant_id}", response_model=TenantOut)
def update_tenant(
    tenant_id: uuid.UUID,
    body: TenantUpdate,
    request: Request,
    actor: SuperAdmin,
    db: DbSession,
) -> Tenant:
    tenant = db.get(Tenant, tenant_id)
    if tenant is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Tenant not found")
    if body.status is not None:
        tenant.status = body.status
    if body.subscription is not None:
        tenant.subscription = body.subscription.model_dump(mode="json")
        tenant.plan = body.subscription.plan
    elif body.plan is not None:
        tenant.plan = body.plan
    record_audit(
        db, request, actor, "TENANT_UPDATED", "Tenant", tenant.id,
        f"Updated {tenant.name} (plan {tenant.plan}, status {tenant.status})",
        tenant_id=tenant.id,
    )
    db.commit()
    db.refresh(tenant)
    return tenant


@router.post("/{tenant_id}/assign-doctor-admin", response_model=TenantOut)
def assign_doctor_admin(
    tenant_id: uuid.UUID,
    body: AssignDoctorAdminRequest,
    request: Request,
    actor: SuperAdmin,
    db: DbSession,
) -> Tenant:
    tenant = db.get(Tenant, tenant_id)
    if tenant is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Tenant not found")
    target = db.get(User, body.user_id)
    if target is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if target.role == "SUPER_ADMIN":
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "Cannot reassign a Super Admin as a clinic Doctor Admin"
        )
    if target.tenant_id is not None and target.tenant_id != tenant.id:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            "That user already belongs to another clinic. Move or invite them first.",
        )

    # step down any current Doctor Admin(s) of this clinic to Staff
    for current in db.scalars(
        select(User).where(User.tenant_id == tenant.id, User.role == "DOCTOR_ADMIN")
    ):
        if current.id != target.id:
            current.role = "STAFF"
            current.token_version += 1  # demoted => kill their outstanding tokens

    target.tenant_id = tenant.id
    target.role = "DOCTOR_ADMIN"
    target.permissions = dict(FULL_PERMISSIONS)
    target.token_version += 1  # role/tenant changed => re-auth
    if not any(hint in target.title for hint in _DOCTOR_TITLE_HINTS):
        target.title = f"{target.title} (Doctor Admin)".strip()
    tenant.doctor_admin_name = target.name
    tenant.doctor_admin_email = target.email

    record_audit(
        db, request, actor, "DOCTOR_ADMIN_ASSIGNED", "Tenant", tenant.id,
        f"Assigned {target.name} as Doctor Admin of {tenant.name}", tenant_id=tenant.id,
    )
    db.commit()
    db.refresh(tenant)
    return tenant
