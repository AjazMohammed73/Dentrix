from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field
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
# Free-form: clinics name/add their own chairs via the frontend ManageChairs UI.
# Bounded to the DB column width; the booking conflict check compares the raw string.
OperatoryChair = Annotated[str, Field(min_length=1, max_length=40)]
AppointmentStatus = Literal[
    "Scheduled", "Arrived", "In-Chair", "Delayed", "Completed", "Cancelled", "No-Show"
]
InvoiceStatus = Literal["Paid", "Pending", "Overdue"]
InstallmentMethod = Literal["Credit Card", "Insurance", "Cash", "Debit Card", "UPI / Bank"]
TenantPlan = Literal["Starter", "Professional", "Enterprise"]
TenantStatus = Literal["active", "suspended"]
SubscriptionStatus = Literal["Active", "Trial", "Past Due", "Cancelled"]
BillingCycle = Literal["Monthly", "Annual"]
