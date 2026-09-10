import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..audit import record_audit
from ..database import get_db
from ..dependencies import Pagination, require_permission, scoped
from ..models import Patient, User
from ..schemas.patient import PatientCreate, PatientOut, PatientUpdate

router = APIRouter(prefix="/patients", tags=["patients"])

ManagePatients = Annotated[User, Depends(require_permission("canManagePatients"))]
DbSession = Annotated[Session, Depends(get_db)]


def _get_owned(db: Session, user: User, patient_id: uuid.UUID) -> Patient:
    patient = db.get(Patient, patient_id)
    if patient is None or (user.role != "SUPER_ADMIN" and patient.tenant_id != user.tenant_id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Patient not found")
    return patient


@router.get("", response_model=list[PatientOut])
def list_patients(user: ManagePatients, db: DbSession, page: Pagination) -> list[Patient]:
    stmt = (
        scoped(select(Patient), Patient.tenant_id, user)
        .order_by(Patient.last_name, Patient.first_name)
        .limit(page.limit)
        .offset(page.offset)
    )
    return list(db.scalars(stmt))


@router.post("", response_model=PatientOut, status_code=status.HTTP_201_CREATED)
def create_patient(
    body: PatientCreate, request: Request, user: ManagePatients, db: DbSession
) -> Patient:
    if user.role == "SUPER_ADMIN":
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "Super Admin cannot create patients directly"
        )
    patient = Patient(tenant_id=user.tenant_id, **body.model_dump())
    db.add(patient)
    db.flush()
    record_audit(
        db, request, user, "PATIENT_CREATED", "Patient", patient.id,
        f"Created patient {patient.first_name} {patient.last_name}",
    )
    db.commit()
    db.refresh(patient)
    return patient


@router.patch("/{patient_id}", response_model=PatientOut)
def update_patient(
    patient_id: uuid.UUID,
    body: PatientUpdate,
    request: Request,
    user: ManagePatients,
    db: DbSession,
) -> Patient:
    patient = _get_owned(db, user, patient_id)
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(patient, key, value)
    record_audit(
        db, request, user, "PATIENT_UPDATED", "Patient", patient.id,
        f"Updated patient {patient.first_name} {patient.last_name}",
    )
    db.commit()
    db.refresh(patient)
    return patient
