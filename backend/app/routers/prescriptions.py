import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..audit import record_audit
from ..database import get_db
from ..dependencies import Pagination, require_permission, scoped
from ..models import Patient, Prescription, User
from ..schemas.prescription import PrescriptionCreate, PrescriptionOut

router = APIRouter(prefix="/prescriptions", tags=["prescriptions"])

ReadClinical = Annotated[User, Depends(require_permission("canManagePatients"))]
WriteClinical = Annotated[User, Depends(require_permission("canWriteDoctorNotes"))]
DbSession = Annotated[Session, Depends(get_db)]


def _get_owned(db: Session, user: User, rx_id: uuid.UUID) -> Prescription:
    rx = db.get(Prescription, rx_id)
    if rx is None or (user.role != "SUPER_ADMIN" and rx.tenant_id != user.tenant_id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Prescription not found")
    return rx


@router.get("", response_model=list[PrescriptionOut])
def list_prescriptions(
    user: ReadClinical, db: DbSession, page: Pagination, patient_id: uuid.UUID | None = None
) -> list[Prescription]:
    stmt = scoped(select(Prescription), Prescription.tenant_id, user)
    if patient_id:
        stmt = stmt.where(Prescription.patient_id == patient_id)
    stmt = stmt.order_by(Prescription.date.desc()).limit(page.limit).offset(page.offset)
    return list(db.scalars(stmt))


@router.post("", response_model=PrescriptionOut, status_code=status.HTTP_201_CREATED)
def create_prescription(
    body: PrescriptionCreate, request: Request, user: WriteClinical, db: DbSession
) -> Prescription:
    if user.role == "SUPER_ADMIN":
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Super Admin cannot write prescriptions")
    patient = db.get(Patient, body.patient_id)
    if patient is None or patient.tenant_id != user.tenant_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Patient not found")

    rx = Prescription(
        tenant_id=user.tenant_id,
        patient_id=patient.id,
        patient_name=body.patient_name or f"{patient.first_name} {patient.last_name}",
        patient_age=body.patient_age,
        patient_gender=body.patient_gender,
        doctor_id=user.id,
        doctor_name=user.name,
        doctor_registration_number=body.doctor_registration_number,
        date=body.date,
        diagnosis=body.diagnosis,
        items=body.items,
        notes=body.notes,
    )
    db.add(rx)
    db.flush()
    record_audit(
        db, request, user, "PRESCRIPTION_CREATED", "Prescription", rx.id,
        f"Prescription for {rx.patient_name} ({len(rx.items)} drug(s))",
    )
    db.commit()
    db.refresh(rx)
    return rx


@router.delete("/{rx_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_prescription(
    rx_id: uuid.UUID, request: Request, user: WriteClinical, db: DbSession
) -> None:
    rx = _get_owned(db, user, rx_id)
    record_audit(
        db, request, user, "PRESCRIPTION_DELETED", "Prescription", rx.id,
        f"Deleted prescription for {rx.patient_name}",
    )
    db.delete(rx)
    db.commit()
