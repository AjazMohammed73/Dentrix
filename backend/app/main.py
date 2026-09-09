from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .routers import auth, health, patients, services

settings = get_settings()

app = FastAPI(title="Dentrix API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list or ["http://localhost:5180"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

for _router in (health.router, auth.router, patients.router, services.router):
    app.include_router(_router)


@app.get("/", tags=["root"])
def root() -> dict:
    return {"service": "dentrix-api", "env": settings.env}
