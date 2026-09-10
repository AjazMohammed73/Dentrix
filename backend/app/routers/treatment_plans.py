import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..audit import record_audit
from ..database import get_db
from ..dependencies import Pagination, require_permission, scoped
from ..models import Patient, TreatmentPlan, User
from ..schemas.treatment_plan import (
    TreatmentPlanCreate,
    TreatmentPlanOut,
    TreatmentPlanUpdate,
)

router = APIRouter(prefix="/treatment-plans", tags=["treatment-plans"])

ManagePlans = Annotated[User, Depends(require_permission("canManagePatients"))]
DbSession = Annotated[Session, Depends(get_db)]


def _get_owned(db: Session, user: User, plan_id: uuid.UUID) -> TreatmentPlan:
    plan = db.get(TreatmentPlan, plan_id)
    if plan is None or (user.role != "SUPER_ADMIN" and plan.tenant_id != user.tenant_id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Treatment plan not found")
    return plan


@router.get("", response_model=list[TreatmentPlanOut])
def list_treatment_plans(
    user: ManagePlans, db: DbSession, page: Pagination, patient_id: uuid.UUID | None = None
) -> list[TreatmentPlan]:
    stmt = scoped(select(TreatmentPlan), TreatmentPlan.tenant_id, user)
    if patient_id:
        stmt = stmt.where(TreatmentPlan.patient_id == patient_id)
    stmt = stmt.order_by(TreatmentPlan.created_date.desc()).limit(page.limit).offset(page.offset)
    return list(db.scalars(stmt))


@router.post("", response_model=TreatmentPlanOut, status_code=status.HTTP_201_CREATED)
def create_treatment_plan(
    body: TreatmentPlanCreate, request: Request, user: ManagePlans, db: DbSession
) -> TreatmentPlan:
    if user.role == "SUPER_ADMIN":
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Super Admin cannot create treatment plans")
    patient = db.get(Patient, body.patient_id)
    if patient is None or patient.tenant_id != user.tenant_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Patient not found")

    plan = TreatmentPlan(
        tenant_id=user.tenant_id,
        patient_id=patient.id,
        title=body.title,
        created_date=body.created_date,
        created_by=body.created_by or user.name,
        phases=body.phases,
        total_estimated_fee=body.total_estimated_fee,
        accepted_fee=body.accepted_fee,
        status=body.status,
        patient_accepted_date=body.patient_accepted_date,
    )
    db.add(plan)
    db.flush()
    record_audit(
        db, request, user, "TREATMENT_PLAN_CREATED", "TreatmentPlan", plan.id,
        f"Treatment plan '{plan.title}' created for {patient.first_name} {patient.last_name}",
    )
    db.commit()
    db.refresh(plan)
    return plan


@router.patch("/{plan_id}", response_model=TreatmentPlanOut)
def update_treatment_plan(
    plan_id: uuid.UUID, body: TreatmentPlanUpdate, request: Request, user: ManagePlans, db: DbSession
) -> TreatmentPlan:
    plan = _get_owned(db, user, plan_id)
    for field, value in body.model_dump(exclude_unset=True).items():
        if value is not None:  # never null out a NOT NULL column
            setattr(plan, field, value)
    record_audit(
        db, request, user, "TREATMENT_PLAN_UPDATED", "TreatmentPlan", plan.id,
        f"Treatment plan '{plan.title}' -> {plan.status}",
    )
    db.commit()
    db.refresh(plan)
    return plan


@router.delete("/{plan_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_treatment_plan(
    plan_id: uuid.UUID, request: Request, user: ManagePlans, db: DbSession
) -> None:
    plan = _get_owned(db, user, plan_id)
    record_audit(
        db, request, user, "TREATMENT_PLAN_DELETED", "TreatmentPlan", plan.id,
        f"Deleted treatment plan '{plan.title}'",
    )
    db.delete(plan)
    db.commit()
