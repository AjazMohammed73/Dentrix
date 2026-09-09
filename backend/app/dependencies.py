import uuid
from collections.abc import Callable
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import Select
from sqlalchemy.orm import Session

from .database import get_db
from .models import User
from .security import decode_access_token

_bearer = HTTPBearer(auto_error=True)
_ADMIN_ROLES = {"SUPER_ADMIN", "DOCTOR_ADMIN"}


def get_current_user(
    creds: Annotated[HTTPAuthorizationCredentials, Depends(_bearer)],
    db: Annotated[Session, Depends(get_db)],
) -> User:
    try:
        payload = decode_access_token(creds.credentials)
        user_id = uuid.UUID(payload["sub"])
    except (jwt.PyJWTError, KeyError, ValueError):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired token")

    user = db.get(User, user_id)
    if user is None or user.status != "active":
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Account not active")
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]


def require_permission(perm: str) -> Callable[..., User]:
    """Super Admin and Doctor Admin implicitly hold every permission (mirrors the frontend)."""

    def checker(user: CurrentUser) -> User:
        if user.role in _ADMIN_ROLES:
            return user
        if not user.permissions.get(perm, False):
            raise HTTPException(status.HTTP_403_FORBIDDEN, f"Missing permission: {perm}")
        return user

    return checker


def require_super_admin(user: CurrentUser) -> User:
    if user.role != "SUPER_ADMIN":
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Super Admin only")
    return user


def require_audit_access(user: CurrentUser) -> User:
    if user.role not in _ADMIN_ROLES:
        raise HTTPException(
            status.HTTP_403_FORBIDDEN, "Audit trail is restricted to administrators"
        )
    return user


def require_billing_access(user: CurrentUser) -> User:
    """Front-desk billing: raising an invoice is a receptionist task even when the
    revenue *reports* screen is restricted. Revenue analytics stays behind
    `canViewRevenue` in the view + on GET/payments/delete."""
    if user.role in _ADMIN_ROLES:
        return user
    if user.permissions.get("canViewRevenue") or user.permissions.get("canManagePatients"):
        return user
    raise HTTPException(status.HTTP_403_FORBIDDEN, "Billing access required")


def scoped(stmt: Select, tenant_column, user: User) -> Select:
    """Constrain a SELECT to the caller's tenant. Super Admin sees everything."""
    if user.role != "SUPER_ADMIN":
        return stmt.where(tenant_column == user.tenant_id)
    return stmt


def resolve_write_tenant(user: User, body_tenant_id: uuid.UUID | None) -> uuid.UUID:
    """Which tenant a create/update targets. Clinic users are locked to their own tenant."""
    if user.role != "SUPER_ADMIN":
        return user.tenant_id  # type: ignore[return-value]
    if body_tenant_id is None:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "tenant_id is required for Super Admin writes"
        )
    return body_tenant_id
