import uuid
from datetime import date, datetime

from pydantic import ConfigDict, Field

from .common import AppointmentStatus, CamelModel, OperatoryChair


class AppointmentCreate(CamelModel):
    patient_id: uuid.UUID
    service_id: uuid.UUID
    doctor_id: uuid.UUID
    date: date
    start_time: str = Field(pattern=r"^([01]\d|2[0-3]):[0-5]\d$")
    operatory_chair: OperatoryChair
    notes: str = Field(default="", max_length=2000)
    allow_override: bool = False  # book anyway despite a scheduling conflict


class AppointmentUpdate(CamelModel):
    status: AppointmentStatus | None = None
    notes: str | None = Field(default=None, max_length=2000)


class AppointmentOut(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID
    patient_id: uuid.UUID
    patient_name: str
    patient_phone: str
    doctor_id: uuid.UUID | None
    doctor_name: str
    service_id: uuid.UUID | None
    service_name: str
    procedure_code: str
    date: date
    start_time: str
    end_time: str
    duration_minutes: int
    operatory_chair: str
    status: str
    notes: str
    fee: int
    created_at: datetime


class ConflictCheckRequest(CamelModel):
    service_id: uuid.UUID
    doctor_id: uuid.UUID
    date: date
    start_time: str = Field(pattern=r"^([01]\d|2[0-3]):[0-5]\d$")
    operatory_chair: str
    exclude_appointment_id: uuid.UUID | None = None


class ConflictPeer(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    patient_name: str
    start_time: str
    end_time: str


class ConflictCheckResponse(CamelModel):
    has_conflict: bool
    chair_conflict: ConflictPeer | None = None
    doctor_conflict: ConflictPeer | None = None
