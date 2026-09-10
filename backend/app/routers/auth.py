import secrets
import uuid
from typing import Annotated

import jwt
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..audit import record_audit
from ..config import get_settings
from ..database import get_db
from ..dependencies import CurrentUser
from ..models import Tenant, User
from ..ratelimit import check_rate_limit, record_attempt
from ..schemas.auth import LoginRequest, TokenResponse
from ..schemas.user import UserOut
from ..security import (
    DUMMY_HASH,
    create_access_token,
    create_refresh_token,
    decode_token,
    verify_password,
)

router = APIRouter(prefix="/auth", tags=["auth"])

_settings = get_settings()
_IS_PROD = _settings.env == "production"
REFRESH_COOKIE = "dentrix_refresh"
CSRF_COOKIE = "dentrix_csrf"
_COOKIE_PATH = "/auth"
_COOKIE_MAX_AGE = _settings.refresh_token_expire_days * 86400
# Cross-site in prod (Vercel <-> Render) => SameSite=None; Secure. Same-site locally => Lax.
_SAMESITE = "none" if _IS_PROD else "lax"


def _set_auth_cookies(response: Response, user_id: str) -> None:
    csrf = secrets.token_urlsafe(32)
    response.set_cookie(
        REFRESH_COOKIE,
        create_refresh_token(user_id=user_id),
        max_age=_COOKIE_MAX_AGE,
        httponly=True,
        secure=_IS_PROD,
        samesite=_SAMESITE,
        path=_COOKIE_PATH,
    )
    response.set_cookie(
        CSRF_COOKIE,
        csrf,
        max_age=_COOKIE_MAX_AGE,
        httponly=False,  # the SPA reads this and echoes it in the X-CSRF-Token header
        secure=_IS_PROD,
        samesite=_SAMESITE,
        path=_COOKIE_PATH,
    )


def _clear_auth_cookies(response: Response) -> None:
    response.delete_cookie(REFRESH_COOKIE, path=_COOKIE_PATH, samesite=_SAMESITE, secure=_IS_PROD)
    response.delete_cookie(CSRF_COOKIE, path=_COOKIE_PATH, samesite=_SAMESITE, secure=_IS_PROD)


def _require_csrf(request: Request) -> None:
    header = request.headers.get("x-csrf-token")
    cookie = request.cookies.get(CSRF_COOKIE)
    if not header or not cookie or not secrets.compare_digest(header, cookie):
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Missing or invalid CSRF token")


def _load_active_user(db: Session, user_id: uuid.UUID) -> User:
    user = db.get(User, user_id)
    if user is None or user.status != "active":
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Session is no longer valid")
    if user.tenant_id is not None:
        tenant = db.get(Tenant, user.tenant_id)
        if tenant is None or tenant.status != "active":
            raise HTTPException(status.HTTP_403_FORBIDDEN, "This clinic's account is suspended.")
    return user


def _issue(user: User) -> str:
    return create_access_token(
        user_id=str(user.id),
        role=user.role,
        tenant_id=str(user.tenant_id) if user.tenant_id else None,
    )


@router.post("/login", response_model=TokenResponse)
def login(
    body: LoginRequest,
    request: Request,
    response: Response,
    db: Annotated[Session, Depends(get_db)],
) -> TokenResponse:
    email = body.email.strip().lower()
    check_rate_limit(identity=email, key="login", limit=10, window_seconds=300)

    user = db.scalar(select(User).where(func.lower(User.email) == email))
    # Always verify (dummy hash if no such user) so timing doesn't leak existence.
    password_ok = verify_password(body.password, user.password_hash if user else DUMMY_HASH)
    if user is None or not password_ok:
        record_attempt(identity=email, key="login", window_seconds=300)
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid email or password")
    if user.status != "active":
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            "Account is not active. Contact your clinic administrator.",
        )

    record_audit(db, request, user, "SECURITY_LOGIN", "Security", user.id, "Signed in")
    db.commit()

    _set_auth_cookies(response, str(user.id))
    return TokenResponse(access_token=_issue(user), user=UserOut.model_validate(user))


@router.post("/refresh", response_model=TokenResponse)
def refresh(
    request: Request, response: Response, db: Annotated[Session, Depends(get_db)]
) -> TokenResponse:
    """Mint a fresh access token from the HttpOnly refresh cookie. Rotates the cookie."""
    _require_csrf(request)
    raw = request.cookies.get(REFRESH_COOKIE)
    if not raw:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "No session")
    try:
        payload = decode_token(raw)
        if payload.get("typ") != "refresh":
            raise ValueError("wrong token type")
        user_id = uuid.UUID(payload["sub"])
    except (jwt.PyJWTError, KeyError, ValueError):
        _clear_auth_cookies(response)
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Session expired")

    user = _load_active_user(db, user_id)
    _set_auth_cookies(response, str(user.id))  # rotation
    return TokenResponse(access_token=_issue(user), user=UserOut.model_validate(user))


@router.post("/logout")
def logout(request: Request, response: Response) -> dict:
    _require_csrf(request)
    _clear_auth_cookies(response)
    return {"ok": True}


@router.get("/me", response_model=UserOut)
def me(user: CurrentUser) -> User:
    return user
