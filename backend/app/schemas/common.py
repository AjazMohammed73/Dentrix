from typing import Literal

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    """Snake_case in Python, camelCase on the wire — matches the frontend TS types."""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)


Role = Literal["SUPER_ADMIN", "DOCTOR_ADMIN", "STAFF"]
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
