import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..audit import record_audit
from ..database import get_db
from ..dependencies import Pagination, require_permission, scoped
from ..models import Patient, PerioChart, User
from ..schemas.perio_chart import PerioChartCreate, PerioChartOut, PerioChartUpdate

router = APIRouter(prefix="/perio-charts", tags=["perio-charts"])

ReadClinical = Annotated[User, Depends(require_permission("canManagePatients"))]
WriteClinical = Annotated[User, Depends(require_permission("canWriteDoctorNotes"))]
DbSession = Annotated[Session, Depends(get_db)]


def _get_owned(db: Session, user: User, chart_id: uuid.UUID) -> PerioChart:
    chart = db.get(PerioChart, chart_id)
    if chart is None or (user.role != "SUPER_ADMIN" and chart.tenant_id != user.tenant_id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Perio chart not found")
    return chart


@router.get("", response_model=list[PerioChartOut])
def list_perio_charts(
    user: ReadClinical, db: DbSession, page: Pagination, patient_id: uuid.UUID | None = None
) -> list[PerioChart]:
    stmt = scoped(select(PerioChart), PerioChart.tenant_id, user)
    if patient_id:
        stmt = stmt.where(PerioChart.patient_id == patient_id)
    stmt = stmt.order_by(PerioChart.exam_date.desc()).limit(page.limit).offset(page.offset)
    return list(db.scalars(stmt))


@router.post("", response_model=PerioChartOut, status_code=status.HTTP_201_CREATED)
def create_perio_chart(
    body: PerioChartCreate, request: Request, user: WriteClinical, db: DbSession
) -> PerioChart:
    if user.role == "SUPER_ADMIN":
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Super Admin cannot record perio charts")
    patient = db.get(Patient, body.patient_id)
    if patient is None or patient.tenant_id != user.tenant_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Patient not found")

    chart = PerioChart(
        tenant_id=user.tenant_id,
        patient_id=patient.id,
        exam_date=body.exam_date,
        examined_by=body.examined_by or user.name,
        teeth=body.teeth,
        summary_notes=body.summary_notes,
    )
    db.add(chart)
    db.flush()
    record_audit(
        db, request, user, "PERIO_CHART_UPDATED", "PerioChart", chart.id,
        f"Perio charting recorded ({len(chart.teeth)} teeth)",
    )
    db.commit()
    db.refresh(chart)
    return chart


@router.patch("/{chart_id}", response_model=PerioChartOut)
def update_perio_chart(
    chart_id: uuid.UUID, body: PerioChartUpdate, request: Request, user: WriteClinical, db: DbSession
) -> PerioChart:
    chart = _get_owned(db, user, chart_id)
    for field, value in body.model_dump(exclude_unset=True).items():
        if value is not None:  # never null out a NOT NULL column
            setattr(chart, field, value)
    record_audit(
        db, request, user, "PERIO_CHART_UPDATED", "PerioChart", chart.id, "Perio charting updated"
    )
    db.commit()
    db.refresh(chart)
    return chart


@router.delete("/{chart_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_perio_chart(
    chart_id: uuid.UUID, request: Request, user: WriteClinical, db: DbSession
) -> None:
    chart = _get_owned(db, user, chart_id)
    record_audit(
        db, request, user, "PERIO_CHART_DELETED", "PerioChart", chart.id, "Deleted perio chart"
    )
    db.delete(chart)
    db.commit()
