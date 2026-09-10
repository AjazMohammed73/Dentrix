from datetime import datetime, timedelta, timezone

import jwt
from pwdlib import PasswordHash

from .config import get_settings

_pwd = PasswordHash.recommended()  # Argon2id

# A real Argon2 hash to verify against when the account doesn't exist, so a wrong
# email and a wrong password take the same time (no user-enumeration timing oracle).
DUMMY_HASH = _pwd.hash("not-a-real-password-timing-equalizer")


def hash_password(password: str) -> str:
    return _pwd.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return _pwd.verify(password, password_hash)


def create_access_token(
    *, user_id: str, role: str, tenant_id: str | None, token_version: int
) -> str:
    settings = get_settings()
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(user_id),
        "typ": "access",
        "tv": token_version,
        "role": role,
        "tenant_id": str(tenant_id) if tenant_id else None,
        "iat": now,
        "exp": now + timedelta(minutes=settings.access_token_expire_minutes),
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def create_refresh_token(*, user_id: str, token_version: int) -> str:
    settings = get_settings()
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(user_id),
        "typ": "refresh",
        "tv": token_version,
        "iat": now,
        "exp": now + timedelta(days=settings.refresh_token_expire_days),
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def decode_token(token: str) -> dict:
    settings = get_settings()
    return jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])


if __name__ == "__main__":
    # Runnable self-check:  python -m app.security
    import os

    os.environ.setdefault("DATABASE_URL", "postgresql://u:p@localhost/x")
    os.environ.setdefault("JWT_SECRET", "dev-selfcheck-secret")

    h = hash_password("s3cret-pw")
    assert verify_password("s3cret-pw", h)
    assert not verify_password("wrong-pw", h)

    tok = create_access_token(user_id="u1", role="STAFF", tenant_id=None, token_version=1)
    data = decode_token(tok)
    assert data["sub"] == "u1" and data["role"] == "STAFF" and data["typ"] == "access" and data["tv"] == 1

    rt = create_refresh_token(user_id="u1", token_version=1)
    assert decode_token(rt)["typ"] == "refresh"
    print("security self-check ok")
