import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..audit import record_audit
from ..database import get_db
from ..dependencies import CurrentUser, Pagination, require_permission, resolve_write_tenant
from ..models import DEFAULT_STAFF_PERMISSIONS, FULL_PERMISSIONS, User
from ..schemas.user import UserCreate, UserOut, UserUpdate
from ..security import hash_password

router = APIRouter(prefix="/users", tags=["users"])

ManageStaff = Annotated[User, Depends(require_permission("canManageStaff"))]
DbSession = Annotated[Session, Depends(get_db)]

_ADMIN_ROLES = ("SUPER_ADMIN", "DOCTOR_ADMIN")
_PERM_KEYS = set(DEFAULT_STAFF_PERMISSIONS)


def _sanitize_permissions(raw: dict, caller: User) -> dict:
    """Keep only the known permission keys; a non-admin caller cannot grant a
    permission they do not themselves hold (blocks self/peer privilege escalation)."""
    clean = {k: bool(v) for k, v in raw.items() if k in _PERM_KEYS}
    if caller.role not in _ADMIN_ROLES:
        clean = {k: (v and bool(caller.permissions.get(k))) for k, v in clean.items()}
    return clean


def _is_last_super_admin(db: Session, target: User) -> bool:
    if target.role != "SUPER_ADMIN":
        return False
    count = db.scalar(select(func.count()).select_from(User).where(User.role == "SUPER_ADMIN"))
    return (count or 0) <= 1


def _get_target(db: Session, caller: User, user_id: uuid.UUID) -> User:
    target = db.get(User, user_id)
    if target is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if caller.role != "SUPER_ADMIN" and (
        target.tenant_id != caller.tenant_id or target.role in ("DOCTOR_ADMIN", "SUPER_ADMIN")
    ):
        raise HTTPException(status.HTTP_403_FORBIDDEN, "You cannot manage this user")
    return target


@router.get("", response_model=list[UserOut])
def list_users(caller: CurrentUser, db: DbSession, page: Pagination) -> list[User]:
    # Any authenticated member can see their clinic's directory (needed to pick a
    # provider when booking). Mutations below stay behind `canManageStaff`.
    stmt = select(User).order_by(User.name)
    if caller.role != "SUPER_ADMIN":
        stmt = stmt.where(User.tenant_id == caller.tenant_id)
    return list(db.scalars(stmt.limit(page.limit).offset(page.offset)))


@router.post("", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def create_user(
    body: UserCreate, request: Request, caller: ManageStaff, db: DbSession
) -> User:
    tenant_id = resolve_write_tenant(caller, body.tenant_id)

    if body.role == "DOCTOR_ADMIN":
        if caller.role not in _ADMIN_ROLES:
            raise HTTPException(
                status.HTTP_403_FORBIDDEN,
                "Only a Doctor Admin or Super Admin can create a Doctor Admin account.",
            )
        perms = dict(FULL_PERMISSIONS)
    else:
        base = body.permissions.model_dump() if body.permissions is not None else dict(DEFAULT_STAFF_PERMISSIONS)
        perms = _sanitize_permissions(base, caller)

    user = User(
        tenant_id=tenant_id,
        name=body.name.strip(),
        email=body.email.strip().lower(),
        role=body.role,
        title=body.title.strip(),
        phone=body.phone,
        password_hash=hash_password(body.password),
        permissions=perms,
        status="active",
    )
    db.add(user)
    try:
        db.flush()
        record_audit(
            db, request, caller, "USER_CREATED", "User", user.id,
            f"Invited {user.name} ({user.role})", tenant_id=tenant_id,
        )
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status.HTTP_409_CONFLICT, "That email is already registered")
    db.refresh(user)
    return user


@router.patch("/{user_id}", response_model=UserOut)
def update_user(
    user_id: uuid.UUID,
    body: UserUpdate,
    request: Request,
    caller: ManageStaff,
    db: DbSession,
) -> User:
    target = _get_target(db, caller, user_id)
    data = body.model_dump(exclude_unset=True)
    # any of these landing => outstanding access/refresh tokens for the target must die
    revoke = any(data.get(f) is not None for f in ("role", "status", "permissions", "password"))

    if data.get("password") is not None:
        if caller.role != "SUPER_ADMIN":
            raise HTTPException(status.HTTP_403_FORBIDDEN, "Only a Super Admin can reset passwords")
        target.password_hash = hash_password(data["password"])

    new_role = data.get("role")
    if new_role is not None:
        if caller.role != "SUPER_ADMIN":
            raise HTTPException(status.HTTP_403_FORBIDDEN, "Only a Super Admin can change roles")
        if target.id == caller.id:
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "You cannot change your own role")
        if new_role != "SUPER_ADMIN" and _is_last_super_admin(db, target):
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "Cannot demote the last Super Admin")
        target.role = new_role
        if new_role == "DOCTOR_ADMIN":
            target.permissions = dict(FULL_PERMISSIONS)

    if data.get("status") is not None:
        if target.id == caller.id:
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "You cannot change your own status")
        target.status = data["status"]

    for field in ("name", "title", "phone"):
        if data.get(field) is not None:
            setattr(target, field, data[field])

    if data.get("permissions") is not None and target.role != "DOCTOR_ADMIN":
        if caller.role not in _ADMIN_ROLES:
            raise HTTPException(
                status.HTTP_403_FORBIDDEN,
                "Only a Doctor Admin or Super Admin can change the permission matrix.",
            )
        target.permissions = {
            **target.permissions,
            **_sanitize_permissions(data["permissions"], caller),
        }

    if revoke:
        target.token_version += 1

    record_audit(
        db, request, caller, "USER_UPDATED", "User", target.id,
        f"Updated {target.name} (role {target.role}, status {target.status})",
        tenant_id=target.tenant_id,
    )
    db.commit()
    db.refresh(target)
    return target


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: uuid.UUID, request: Request, caller: ManageStaff, db: DbSession
) -> None:
    target = _get_target(db, caller, user_id)
    if target.id == caller.id:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "You cannot delete your own account")
    if _is_last_super_admin(db, target):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Cannot delete the last Super Admin")
    if caller.role != "SUPER_ADMIN" and target.role != "STAFF":
        raise HTTPException(status.HTTP_403_FORBIDDEN, "You can only delete staff members")
    record_audit(
        db, request, caller, "USER_DELETED", "User", target.id,
        f"Deleted {target.name}", tenant_id=target.tenant_id,
    )
    db.delete(target)
    db.commit()
