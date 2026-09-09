"""Minimal in-memory rate limiter.

ponytail: per-process, resets on restart — fine for a single Render instance.
Move to slowapi + Redis if you ever run more than one instance.
"""

import time
from collections import defaultdict, deque

from fastapi import HTTPException, Request, status

_hits: dict[str, deque[float]] = defaultdict(deque)


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def rate_limit(request: Request, *, key: str, limit: int, window_seconds: int) -> None:
    now = time.monotonic()

    if len(_hits) > 5000:  # cheap sweep of drained buckets
        for k in [k for k, v in _hits.items() if not v]:
            del _hits[k]

    bucket = _hits[f"{key}:{_client_ip(request)}"]
    cutoff = now - window_seconds
    while bucket and bucket[0] < cutoff:
        bucket.popleft()

    if len(bucket) >= limit:
        retry_after = int(bucket[0] + window_seconds - now) + 1
        raise HTTPException(
            status.HTTP_429_TOO_MANY_REQUESTS,
            "Too many attempts. Please wait and try again.",
            headers={"Retry-After": str(retry_after)},
        )
    bucket.append(now)
