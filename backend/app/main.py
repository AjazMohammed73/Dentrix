from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import get_settings
from .ratelimit import hit
from .security import decode_token
from .routers import (
    appointments,
    audit,
    auth,
    clinical_notes,
    health,
    invoices,
    patients,
    services,
    tenants,
    users,
)

settings = get_settings()
_is_prod = settings.env == "production"
_MAX_BODY_BYTES = 1_000_000  # 1 MB — generous for JSON


class _BodyTooLarge(Exception):
    pass


class BodySizeLimitMiddleware:
    """Pure-ASGI request-body cap. Honours Content-Length up front, and also caps the
    actual byte stream for chunked requests that omit it."""

    def __init__(self, app, max_bytes: int) -> None:
        self.app = app
        self.max_bytes = max_bytes

    async def __call__(self, scope, receive, send) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        async def drain() -> None:
            # discard the rest of the body so the client gets a clean 413, not a reset
            while True:
                msg = await receive()
                if msg["type"] != "http.request" or not msg.get("more_body", False):
                    return

        async def reject() -> None:
            await drain()
            await JSONResponse({"detail": "Request body too large"}, status_code=413)(
                scope, receive, send
            )

        for name, value in scope.get("headers", []):
            if name == b"content-length" and value.isdigit() and int(value) > self.max_bytes:
                await reject()
                return

        total = 0

        async def capped_receive():
            nonlocal total
            message = await receive()
            if message["type"] == "http.request":
                total += len(message.get("body", b""))
                if total > self.max_bytes:
                    raise _BodyTooLarge
            return message

        try:
            await self.app(scope, capped_receive, send)
        except _BodyTooLarge:
            await reject()


app = FastAPI(
    title="Dentrix API",
    version="0.1.0",
    docs_url=None if _is_prod else "/docs",
    redoc_url=None,
    openapi_url=None if _is_prod else "/openapi.json",
)

app.add_middleware(BodySizeLimitMiddleware, max_bytes=_MAX_BODY_BYTES)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list or ["http://localhost:5180", "http://127.0.0.1:5180"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    resp = await call_next(request)
    resp.headers["X-Content-Type-Options"] = "nosniff"
    resp.headers["X-Frame-Options"] = "DENY"
    resp.headers["Referrer-Policy"] = "no-referrer"
    resp.headers["Cache-Control"] = "no-store"
    return resp


_WRITE_METHODS = {"POST", "PUT", "PATCH", "DELETE"}


@app.middleware("http")
async def write_quota(request: Request, call_next):
    """Per-user cap on state-changing calls: a compromised token can't hammer the DB.
    Auth endpoints have their own (stricter) limiter. Bad/missing token => skip here,
    the endpoint's own auth returns 401."""
    if request.method in _WRITE_METHODS and not request.url.path.startswith("/auth/"):
        auth_header = request.headers.get("authorization", "")
        if auth_header.lower().startswith("bearer "):
            try:
                sub = decode_token(auth_header[7:]).get("sub")
            except Exception:
                sub = None
            if sub and not hit(identity=sub, key="writes", limit=240, window_seconds=60):
                return JSONResponse(
                    {"detail": "Too many requests. Slow down."},
                    status_code=429,
                    headers={"Retry-After": "60"},
                )
    return await call_next(request)


@app.exception_handler(RequestValidationError)
async def _validation_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    # Strip `input` / `ctx` — `input` echoes the caller's submitted values (e.g. a
    # password) straight back into the response and any client-side logging.
    errors = [{"type": e["type"], "loc": e["loc"], "msg": e["msg"]} for e in exc.errors()]
    return JSONResponse(status_code=422, content={"detail": errors})


for _router in (
    health.router,
    auth.router,
    tenants.router,
    users.router,
    patients.router,
    services.router,
    appointments.router,
    invoices.router,
    clinical_notes.router,
    audit.router,
):
    app.include_router(_router)


@app.get("/", tags=["root"])
def root() -> dict:
    return {"service": "dentrix-api"}
