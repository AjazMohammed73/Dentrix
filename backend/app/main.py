from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
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

app = FastAPI(
    title="Dentrix API",
    version="0.1.0",
    # No interactive docs / schema in production.
    docs_url=None if _is_prod else "/docs",
    redoc_url=None,
    openapi_url=None if _is_prod else "/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list or ["http://localhost:5180"],
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
