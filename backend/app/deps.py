import uuid
from collections.abc import Callable
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from .db import get_db
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


def require_permission(perm: str) -> Callable[[User], User]:
    """Super Admin and Doctor Admin implicitly hold every permission (matches the frontend)."""

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


def tenant_scope(user: User) -> uuid.UUID | None:
    """The tenant a query must be filtered to. None => Super Admin, no filter."""
    return None if user.role == "SUPER_ADMIN" else user.tenant_id
