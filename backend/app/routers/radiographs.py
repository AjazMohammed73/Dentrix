import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..audit import record_audit
from ..database import get_db
from ..dependencies import Pagination, require_permission, scoped
from ..models import Patient, Radiograph, User
from ..schemas.radiograph import RadiographCreate, RadiographOut, RadiographUpdate

router = APIRouter(prefix="/radiographs", tags=["radiographs"])

ReadClinical = Annotated[User, Depends(require_permission("canManagePatients"))]
WriteClinical = Annotated[User, Depends(require_permission("canWriteDoctorNotes"))]
DbSession = Annotated[Session, Depends(get_db)]


def _get_owned(db: Session, user: User, xr_id: uuid.UUID) -> Radiograph:
    xr = db.get(Radiograph, xr_id)
    if xr is None or (user.role != "SUPER_ADMIN" and xr.tenant_id != user.tenant_id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Radiograph not found")
    return xr


@router.get("", response_model=list[RadiographOut])
def list_radiographs(
    user: ReadClinical, db: DbSession, page: Pagination, patient_id: uuid.UUID | None = None
) -> list[Radiograph]:
    stmt = scoped(select(Radiograph), Radiograph.tenant_id, user)
    if patient_id:
        stmt = stmt.where(Radiograph.patient_id == patient_id)
    stmt = stmt.order_by(Radiograph.date_taken.desc()).limit(page.limit).offset(page.offset)
    return list(db.scalars(stmt))


@router.post("", response_model=RadiographOut, status_code=status.HTTP_201_CREATED)
def create_radiograph(
    body: RadiographCreate, request: Request, user: WriteClinical, db: DbSession
) -> Radiograph:
    if user.role == "SUPER_ADMIN":
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Super Admin cannot upload radiographs")
    patient = db.get(Patient, body.patient_id)
    if patient is None or patient.tenant_id != user.tenant_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Patient not found")

    xr = Radiograph(
        tenant_id=user.tenant_id,
        patient_id=patient.id,
        title=body.title,
        category=body.category,
        date_taken=body.date_taken,
        tooth_numbers=body.tooth_numbers,
        image_url=body.image_url,
        findings=body.findings,
        taken_by=body.taken_by or user.name,
        notes=body.notes,
    )
    db.add(xr)
    db.flush()
    record_audit(
        db, request, user, "RADIOGRAPH_UPLOADED", "Radiograph", xr.id,
        f"{xr.category} radiograph '{xr.title}' added",
    )
    db.commit()
    db.refresh(xr)
    return xr


@router.patch("/{xr_id}", response_model=RadiographOut)
def update_radiograph(
    xr_id: uuid.UUID, body: RadiographUpdate, request: Request, user: WriteClinical, db: DbSession
) -> Radiograph:
    xr = _get_owned(db, user, xr_id)
    for field, value in body.model_dump(exclude_unset=True).items():
        if value is not None:  # never null out a NOT NULL column
            setattr(xr, field, value)
    record_audit(
        db, request, user, "RADIOGRAPH_UPDATED", "Radiograph", xr.id,
        f"Updated radiograph '{xr.title}'",
    )
    db.commit()
    db.refresh(xr)
    return xr


@router.delete("/{xr_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_radiograph(
    xr_id: uuid.UUID, request: Request, user: WriteClinical, db: DbSession
) -> None:
    xr = _get_owned(db, user, xr_id)
    record_audit(
        db, request, user, "RADIOGRAPH_DELETED", "Radiograph", xr.id,
        f"Deleted radiograph '{xr.title}'",
    )
    db.delete(xr)
    db.commit()
