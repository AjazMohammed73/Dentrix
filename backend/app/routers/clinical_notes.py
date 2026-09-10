import uuid
from datetime import datetime, timezone
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..audit import record_audit
from ..database import get_db
from ..dependencies import require_permission, scoped
from ..models import ClinicalNote, Patient, User
from ..schemas.clinical_note import ClinicalNoteCreate, ClinicalNoteOut

router = APIRouter(prefix="/clinical-notes", tags=["clinical-notes"])

ReadNotes = Annotated[User, Depends(require_permission("canManagePatients"))]
WriteNotes = Annotated[User, Depends(require_permission("canWriteDoctorNotes"))]
DbSession = Annotated[Session, Depends(get_db)]


@router.get("", response_model=list[ClinicalNoteOut])
def list_notes(
    user: ReadNotes, db: DbSession, patient_id: uuid.UUID | None = None
) -> list[ClinicalNote]:
    stmt = scoped(select(ClinicalNote), ClinicalNote.tenant_id, user)
    if patient_id:
        stmt = stmt.where(ClinicalNote.patient_id == patient_id)
    return list(db.scalars(stmt.order_by(ClinicalNote.signed_at.desc())))


@router.post("", response_model=ClinicalNoteOut, status_code=status.HTTP_201_CREATED)
def create_note(
    body: ClinicalNoteCreate, request: Request, user: WriteNotes, db: DbSession
) -> ClinicalNote:
    if user.role == "SUPER_ADMIN":
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "Super Admin cannot write clinical notes"
        )
    patient = db.get(Patient, body.patient_id)
    if patient is None or patient.tenant_id != user.tenant_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Patient not found")

    note = ClinicalNote(
        tenant_id=user.tenant_id,
        patient_id=patient.id,
        doctor_id=user.id,
        doctor_name=user.name,
        date=body.date,
        tooth_number=body.tooth_number,
        tooth_numbers=body.tooth_numbers,
        tooth_surfaces=body.tooth_surfaces,
        procedure_name=body.procedure_name,
        diagnosis=body.diagnosis,
        notes=body.notes,
        treatment_plan_summary=body.treatment_plan_summary,
        vitals=body.vitals.model_dump(),
        doctor_signature=f"{user.name} (License verified)",
        signed_at=datetime.now(timezone.utc),
    )
    db.add(note)
    db.flush()
    record_audit(
        db, request, user, "NOTE_SIGNED", "ClinicalNote", note.id,
        f"Signed clinical note ({note.procedure_name}) for {patient.first_name} {patient.last_name}",
    )
    db.commit()
    db.refresh(note)
    return note
