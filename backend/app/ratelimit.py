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
