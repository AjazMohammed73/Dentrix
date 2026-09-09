from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..audit import record_audit
from ..database import get_db
from ..dependencies import CurrentUser
from ..models import User
from ..schemas.auth import LoginRequest, TokenResponse
from ..schemas.user import UserOut
from ..security import create_access_token, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
def login(
    body: LoginRequest, request: Request, db: Annotated[Session, Depends(get_db)]
) -> TokenResponse:
    email = body.email.strip().lower()
    user = db.scalar(select(User).where(func.lower(User.email) == email))

    # Generic message on purpose: do not reveal whether the email exists.
    if user is None or not verify_password(body.password, user.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid email or password")
    if user.status != "active":
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            "Account is not active. Contact your clinic administrator.",
        )

    record_audit(db, request, user, "SECURITY_LOGIN", "Security", user.id, "Signed in")
    db.commit()

    token = create_access_token(
        user_id=str(user.id),
        role=user.role,
        tenant_id=str(user.tenant_id) if user.tenant_id else None,
    )
    return TokenResponse(access_token=token, user=UserOut.model_validate(user))


@router.get("/me", response_model=UserOut)
def me(user: CurrentUser) -> User:
    return user
