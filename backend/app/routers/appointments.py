import uuid
from datetime import date as date_type
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..audit import record_audit
from ..billing import apply_patient_balance, build_appointment_invoice
from ..database import get_db
from ..dependencies import require_permission, scoped
from ..models import Appointment, Invoice, Patient, Service, User
from ..schemas.appointment import (
    AppointmentCreate,
    AppointmentOut,
    AppointmentUpdate,
    ConflictCheckRequest,
    ConflictCheckResponse,
    ConflictPeer,
)

router = APIRouter(prefix="/appointments", tags=["appointments"])

ManageAppointments = Annotated[User, Depends(require_permission("canManageAppointments"))]
DbSession = Annotated[Session, Depends(get_db)]

_INACTIVE = ("Cancelled", "No-Show")


def _to_minutes(hhmm: str) -> int:
    h, m = hhmm.split(":")
    return int(h) * 60 + int(m)


def _add_minutes(hhmm: str, minutes: int) -> str:
    total = _to_minutes(hhmm) + minutes
    return f"{total // 60 % 24:02d}:{total % 60:02d}"


def _find_conflicts(
    db: Session,
    tenant_id: uuid.UUID,
    *,
    day,
    start: str,
    end: str,
    chair: str,
    doctor_id: uuid.UUID,
    exclude_id: uuid.UUID | None = None,
) -> tuple[Appointment | None, Appointment | None]:
    same_day = db.scalars(
        select(Appointment).where(
            Appointment.tenant_id == tenant_id,
            Appointment.date == day,
            Appointment.status.notin_(_INACTIVE),
        )
    ).all()
    ns, ne = _to_minutes(start), _to_minutes(end)
    chair_c: Appointment | None = None
    doctor_c: Appointment | None = None
    for a in same_day:
        if exclude_id and a.id == exclude_id:
            continue
        if max(ns, _to_minutes(a.start_time)) < min(ne, _to_minutes(a.end_time)):
            if a.operatory_chair == chair and chair_c is None:
                chair_c = a
            if a.doctor_id == doctor_id and doctor_c is None:
                doctor_c = a
    return chair_c, doctor_c


def _get_owned(db: Session, user: User, appointment_id: uuid.UUID) -> Appointment:
    appt = db.get(Appointment, appointment_id)
    if appt is None or (user.role != "SUPER_ADMIN" and appt.tenant_id != user.tenant_id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Appointment not found")
    return appt


@router.get("", response_model=list[AppointmentOut])
def list_appointments(
    user: ManageAppointments,
    db: DbSession,
    date: date_type | None = None,
    patient_id: uuid.UUID | None = None,
) -> list[Appointment]:
    stmt = scoped(select(Appointment), Appointment.tenant_id, user)
    if date is not None:
        stmt = stmt.where(Appointment.date == date)
    if patient_id:
        stmt = stmt.where(Appointment.patient_id == patient_id)
    return list(db.scalars(stmt.order_by(Appointment.date, Appointment.start_time)))


@router.post("/check-conflict", response_model=ConflictCheckResponse)
def check_conflict(
    body: ConflictCheckRequest, user: ManageAppointments, db: DbSession
) -> ConflictCheckResponse:
    tenant_id = user.tenant_id
    service = db.get(Service, body.service_id)
    if service is None or (user.role != "SUPER_ADMIN" and service.tenant_id != tenant_id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Service not found")
    end = _add_minutes(body.start_time, service.duration_minutes)
    chair_c, doctor_c = _find_conflicts(
        db, tenant_id, day=body.date, start=body.start_time, end=end,
        chair=body.operatory_chair, doctor_id=body.doctor_id,
        exclude_id=body.exclude_appointment_id,
    )
    return ConflictCheckResponse(
        has_conflict=bool(chair_c or doctor_c),
        chair_conflict=ConflictPeer.model_validate(chair_c) if chair_c else None,
        doctor_conflict=ConflictPeer.model_validate(doctor_c) if doctor_c else None,
    )


def _create(db: Session, request: Request, user: User, body: AppointmentCreate) -> Appointment:
    tenant_id = user.tenant_id
    patient = db.get(Patient, body.patient_id)
    if patient is None or patient.tenant_id != tenant_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Patient not found")
    service = db.get(Service, body.service_id)
    if service is None or service.tenant_id != tenant_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Service not found")
    doctor = db.get(User, body.doctor_id)
    if doctor is None or doctor.tenant_id != tenant_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Provider not found")

    if _to_minutes(body.start_time) + service.duration_minutes >= 24 * 60:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "Appointment would run to or past midnight."
        )
    end_time = _add_minutes(body.start_time, service.duration_minutes)
    chair_c, doctor_c = _find_conflicts(
        db, tenant_id, day=body.date, start=body.start_time, end=end_time,
        chair=body.operatory_chair, doctor_id=body.doctor_id,
    )
    if (chair_c or doctor_c) and not body.allow_override:
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            {
                "message": "Scheduling conflict",
                "chairConflict": ConflictPeer.model_validate(chair_c).model_dump(
                    by_alias=True, mode="json"
                )
                if chair_c else None,
                "doctorConflict": ConflictPeer.model_validate(doctor_c).model_dump(
                    by_alias=True, mode="json"
                )
                if doctor_c else None,
            },
        )

    overridden = bool(body.allow_override and (chair_c or doctor_c))
    appt = Appointment(
        tenant_id=tenant_id,
        patient_id=patient.id,
        patient_name=f"{patient.first_name} {patient.last_name}",
        patient_phone=patient.phone,
        doctor_id=doctor.id,
        doctor_name=doctor.name,
        service_id=service.id,
        service_name=service.name,
        procedure_code=service.code,
        date=body.date,
        start_time=body.start_time,
        end_time=end_time,
        duration_minutes=service.duration_minutes,
        operatory_chair=body.operatory_chair,
        status="Scheduled",
        notes=f"[OVERRIDE APPROVED] {body.notes}" if overridden else body.notes,
        fee=service.base_price,
    )
    db.add(appt)
    db.flush()  # assign appt.id for the invoice FK + audit
    db.add(build_appointment_invoice(db, appt))
    apply_patient_balance(db, patient.id, appt.fee)
    record_audit(
        db, request, user, "APPOINTMENT_SCHEDULED", "Appointment", appt.id,
        f"Booked {appt.service_name} for {appt.patient_name} on {appt.date} {appt.start_time}"
        + (" (override)" if overridden else ""),
    )
    db.commit()
    db.refresh(appt)
    return appt


@router.post("", response_model=AppointmentOut, status_code=status.HTTP_201_CREATED)
def create_appointment(
    body: AppointmentCreate, request: Request, user: ManageAppointments, db: DbSession
) -> Appointment:
    if user.role == "SUPER_ADMIN":
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, "Super Admin cannot book appointments directly"
        )
    for _ in range(2):  # retry once if two bookings raced for the same invoice number
        try:
            return _create(db, request, user, body)
        except IntegrityError:
            db.rollback()
    raise HTTPException(status.HTTP_409_CONFLICT, "Could not allocate an invoice number; please retry")


@router.patch("/{appointment_id}", response_model=AppointmentOut)
def update_appointment(
    appointment_id: uuid.UUID,
    body: AppointmentUpdate,
    request: Request,
    user: ManageAppointments,
    db: DbSession,
) -> Appointment:
    appt = _get_owned(db, user, appointment_id)
    was_active = appt.status not in _INACTIVE
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(appt, key, value)

    # Cancelling/no-showing an appointment voids its still-unpaid auto-invoice so the
    # clinic's A/R and the patient balance don't stay inflated.
    if was_active and appt.status in _INACTIVE:
        inv = db.scalar(select(Invoice).where(Invoice.appointment_id == appt.id))
        if inv is not None and inv.amount_paid == 0 and inv.status != "Paid":
            apply_patient_balance(db, inv.patient_id, -inv.balance)
            db.delete(inv)

    record_audit(
        db, request, user, "APPOINTMENT_STATUS_CHANGED", "Appointment", appt.id,
        f"{appt.patient_name}: status -> {appt.status}",
    )
    db.commit()
    db.refresh(appt)
    return appt


@router.delete("/{appointment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_appointment(
    appointment_id: uuid.UUID, request: Request, user: ManageAppointments, db: DbSession
) -> None:
    appt = _get_owned(db, user, appointment_id)
    record_audit(
        db, request, user, "APPOINTMENT_DELETED", "Appointment", appt.id,
        f"Cancelled {appt.service_name} for {appt.patient_name} on {appt.date}",
    )
    db.delete(appt)  # the auto-invoice stays; its appointment_id becomes NULL
    db.commit()
