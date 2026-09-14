import pytest
from fastapi import HTTPException, status

from app.ratelimit import check_rate_limit, hit, record_attempt


def test_hit_allows_up_to_limit_then_blocks():
    results = [hit(identity="unit-u1", key="writes", limit=5, window_seconds=60) for _ in range(7)]
    assert results == [True, True, True, True, True, False, False]


def test_hit_buckets_are_isolated_per_identity():
    for _ in range(5):
        hit(identity="unit-shared-key-a", key="writes-iso", limit=5, window_seconds=60)
    # a different identity under the same key has its own, unblocked bucket
    assert hit(identity="unit-shared-key-b", key="writes-iso", limit=5, window_seconds=60) is True


def test_hit_buckets_are_isolated_per_key():
    for _ in range(5):
        hit(identity="unit-u2", key="writes-a", limit=5, window_seconds=60)
    # same identity, different key => separate bucket
    assert hit(identity="unit-u2", key="writes-b", limit=5, window_seconds=60) is True


def test_check_rate_limit_raises_429_once_failures_reach_limit():
    email = "unit-test-e@example.com"
    for _ in range(2):
        record_attempt(identity=email, key="unit-login-email", window_seconds=300)
    check_rate_limit(identity=email, key="unit-login-email", limit=3, window_seconds=300)  # 2 < 3, fine

    record_attempt(identity=email, key="unit-login-email", window_seconds=300)
    with pytest.raises(HTTPException) as exc_info:
        check_rate_limit(identity=email, key="unit-login-email", limit=3, window_seconds=300)
    assert exc_info.value.status_code == status.HTTP_429_TOO_MANY_REQUESTS
    assert "Retry-After" in exc_info.value.headers


def test_check_rate_limit_does_not_raise_below_limit():
    identity = "unit-under-limit@example.com"
    record_attempt(identity=identity, key="unit-login-email-2", window_seconds=300)
    check_rate_limit(identity=identity, key="unit-login-email-2", limit=10, window_seconds=300)
