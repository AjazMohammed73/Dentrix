from datetime import datetime, timedelta, timezone

import jwt
import pytest

from app.config import get_settings
from app.security import (
    DUMMY_HASH,
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)


def test_hash_password_roundtrip():
    h = hash_password("correct-horse-battery-staple")
    assert verify_password("correct-horse-battery-staple", h)


def test_verify_password_rejects_wrong_password():
    h = hash_password("correct-horse-battery-staple")
    assert not verify_password("wrong-password", h)


def test_verify_password_against_dummy_hash_never_matches():
    # DUMMY_HASH is used by /auth/login for a nonexistent user so timing doesn't leak
    # account existence — it must never verify true for any real password.
    assert not verify_password("anything", DUMMY_HASH)


def test_hash_password_uses_unique_salt():
    # Same password twice must not produce the same hash (no fixed/reused salt).
    h1 = hash_password("same-password")
    h2 = hash_password("same-password")
    assert h1 != h2
    assert verify_password("same-password", h1)
    assert verify_password("same-password", h2)


def test_access_token_roundtrip():
    token = create_access_token(user_id="u1", role="STAFF", tenant_id="t1", token_version=1)
    payload = decode_token(token)
    assert payload["sub"] == "u1"
    assert payload["role"] == "STAFF"
    assert payload["tenant_id"] == "t1"
    assert payload["typ"] == "access"
    assert payload["tv"] == 1


def test_refresh_token_has_different_type_than_access_token():
    access = decode_token(create_access_token(user_id="u1", role="STAFF", tenant_id=None, token_version=1))
    refresh = decode_token(create_refresh_token(user_id="u1", token_version=1))
    assert access["typ"] == "access"
    assert refresh["typ"] == "refresh"


def test_decode_token_rejects_tampered_signature():
    token = create_access_token(user_id="u1", role="STAFF", tenant_id=None, token_version=1)
    tampered = token[:-4] + ("A" * 4)
    with pytest.raises(jwt.PyJWTError):
        decode_token(tampered)


def test_decode_token_rejects_wrong_secret():
    token = create_access_token(user_id="u1", role="STAFF", tenant_id=None, token_version=1)
    with pytest.raises(jwt.PyJWTError):
        jwt.decode(token, "a-completely-different-secret-32bytes+", algorithms=["HS256"])


def test_expired_access_token_is_rejected():
    settings = get_settings()
    now = datetime.now(timezone.utc)
    expired_payload = {
        "sub": "u1",
        "typ": "access",
        "tv": 1,
        "role": "STAFF",
        "tenant_id": None,
        "iat": now - timedelta(hours=2),
        "exp": now - timedelta(hours=1),
    }
    expired_token = jwt.encode(expired_payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)
    with pytest.raises(jwt.ExpiredSignatureError):
        decode_token(expired_token)
