from typing import Literal

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    """Snake_case in Python, camelCase on the wire — matches the frontend TS types."""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)


Role = Literal["SUPER_ADMIN", "DOCTOR_ADMIN", "STAFF"]
UserStatus = Literal["active", "inactive", "suspended"]
Gender = Literal["Male", "Female", "Other"]
PatientStatus = Literal["Active", "Inactive"]
ServiceCategory = Literal[
    "Preventive",
    "Restorative",
    "Endodontics",
    "Periodontics",
    "Oral Surgery",
    "Orthodontics",
]
OperatoryChair = Literal["Chair 1 - Hygiene", "Chair 2 - Surgery", "Chair 3 - General"]
AppointmentStatus = Literal[
    "Scheduled", "In-Chair", "Delayed", "Completed", "Cancelled", "No-Show"
]
InvoiceStatus = Literal["Paid", "Pending", "Overdue"]
InstallmentMethod = Literal["Credit Card", "Insurance", "Cash", "Debit Card", "UPI / Bank"]
TenantPlan = Literal["Starter", "Professional", "Enterprise"]
TenantStatus = Literal["active", "suspended"]
SubscriptionStatus = Literal["Active", "Trial", "Past Due", "Cancelled"]
BillingCycle = Literal["Monthly", "Annual"]
