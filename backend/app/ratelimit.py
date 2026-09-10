"""Minimal in-memory rate limiter.

ponytail: per-process, resets on restart — fine for a single Render instance.
Move to slowapi + Redis if you ever run more than one instance.

The caller passes an explicit `identity` (for login: the normalised email), so the
limit can't be evaded by spoofing `X-Forwarded-For`, and one office behind one NAT IP
isn't a shared bucket. Only *failed* attempts are recorded.
"""

import time
from collections import defaultdict, deque

from fastapi import HTTPException, status

_hits: dict[str, deque[float]] = defaultdict(deque)


def _bucket(identity: str, key: str, window_seconds: int) -> deque[float]:
    if len(_hits) > 5000:  # cheap sweep of drained buckets
        for k in [k for k, v in _hits.items() if not v]:
            del _hits[k]
    bucket = _hits[f"{key}:{identity}"]
    cutoff = time.monotonic() - window_seconds
    while bucket and bucket[0] < cutoff:
        bucket.popleft()
    return bucket


def check_rate_limit(*, identity: str, key: str, limit: int, window_seconds: int) -> None:
    """Raise 429 if `identity` already has `limit` recorded failures in the window."""
    bucket = _bucket(identity, key, window_seconds)
    if len(bucket) >= limit:
        retry_after = int(bucket[0] + window_seconds - time.monotonic()) + 1
        raise HTTPException(
            status.HTTP_429_TOO_MANY_REQUESTS,
            "Too many failed attempts. Please wait and try again.",
            headers={"Retry-After": str(retry_after)},
        )


def record_attempt(*, identity: str, key: str, window_seconds: int) -> None:
    _bucket(identity, key, window_seconds).append(time.monotonic())


def hit(*, identity: str, key: str, limit: int, window_seconds: int) -> bool:
    """Record one event and return False if this identity is now over `limit`."""
    bucket = _bucket(identity, key, window_seconds)
    if len(bucket) >= limit:
        return False
    bucket.append(time.monotonic())
    return True


if __name__ == "__main__":
    # python -m app.ratelimit
    ok = [hit(identity="u1", key="writes", limit=5, window_seconds=60) for _ in range(7)]
    assert ok == [True, True, True, True, True, False, False], ok
    # a different identity has its own bucket
    assert hit(identity="u2", key="writes", limit=5, window_seconds=60) is True
    # check_rate_limit raises once the recorded-failure count reaches the limit
    for _ in range(2):
        record_attempt(identity="e@x.com", key="login-email", window_seconds=300)
    check_rate_limit(identity="e@x.com", key="login-email", limit=3, window_seconds=300)  # 2 < 3, fine
    record_attempt(identity="e@x.com", key="login-email", window_seconds=300)
    raised = False
    try:
        check_rate_limit(identity="e@x.com", key="login-email", limit=3, window_seconds=300)
    except HTTPException as exc:
        raised = exc.status_code == status.HTTP_429_TOO_MANY_REQUESTS
    assert raised
    print("ratelimit self-check ok")
