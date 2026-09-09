import uuid
from datetime import date, datetime

from pydantic import ConfigDict, Field

from .common import CamelModel, InstallmentMethod, InvoiceStatus


class PaymentInstallmentOut(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    receipt_number: str | None
    date: date
    amount: int
    method: str
    collected_by: str | None
    recorded_by: str | None
    notes: str | None


class InvoiceCreate(CamelModel):
    patient_id: uuid.UUID
    service_name: str = Field(min_length=1, max_length=300)
    amount: int = Field(ge=0)
    amount_paid: int = Field(default=0, ge=0)
    date: date
    due_date: date
    status: InvoiceStatus = "Pending"
    payment_method: InstallmentMethod | None = None


class InvoicePaymentRequest(CamelModel):
    amount: int = Field(gt=0)
    method: InstallmentMethod
    notes: str | None = None


class InvoiceOut(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    tenant_id: uuid.UUID
    invoice_number: str
    patient_id: uuid.UUID
    patient_name: str
    appointment_id: uuid.UUID | None
    service_name: str
    amount: int
    amount_paid: int
    balance: int
    date: date
    due_date: date
    status: str
    payment_method: str | None
    installments: list[PaymentInstallmentOut] = []
    insurance_claim: dict | None
    created_at: datetime
