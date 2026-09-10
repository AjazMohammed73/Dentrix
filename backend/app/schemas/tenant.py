import uuid
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from .common import (
    BillingCycle,
    CamelModel,
    SubscriptionStatus,
    TenantPlan,
    TenantStatus,
)


class Subscription(BaseModel):
    """Matches the frontend TenantSubscription; stored as-is in JSONB (whole INR)."""

    plan: TenantPlan
    status: SubscriptionStatus
    billingCycle: BillingCycle
    monthlyFee: int = Field(ge=0, le=100_000_000)
    chairLimit: int = Field(ge=0, le=1000)
    renewalDate: date
    autoRenew: bool


class TenantCreate(CamelModel):
    name: str = Field(min_length=1, max_length=200)
    slug: str = Field(min_length=1, max_length=60, pattern=r"^[a-z0-9-]+$")
    address: str = Field(default="", max_length=300)
    phone: str = Field(default="", max_length=40)
    email: str = Field(default="", max_length=200)
    plan: TenantPlan = "Professional"
    doctor_name: str = Field(min_length=1, max_length=200)
    doctor_email: EmailStr
    doctor_password: str = Field(min_length=12, max_length=200)


class TenantUpdate(CamelModel):
    status: TenantStatus | None = None
    plan: TenantPlan | None = None
    subscription: Subscription | None = None


class AssignDoctorAdminRequest(CamelModel):
    user_id: uuid.UUID


class TenantOut(CamelModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    slug: str
    address: str
    phone: str
    email: str
    status: str
    doctor_admin_name: str
    doctor_admin_email: str
    storage_mb: int
    plan: str
    subscription: dict
    created_at: datetime
