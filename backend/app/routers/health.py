from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from ..database import get_db

router = APIRouter(tags=["health"])


@router.get("/health")
def health() -> dict:
    """Liveness — no DB call, so a flood can't exhaust the connection pool."""
    return {"status": "ok"}


@router.get("/health/ready")
def readiness(db: Annotated[Session, Depends(get_db)]) -> dict:
    """Readiness — pings the DB. Use this for monitoring/alerting, not Render's check."""
    db.execute(text("SELECT 1"))
    return {"status": "ready"}
