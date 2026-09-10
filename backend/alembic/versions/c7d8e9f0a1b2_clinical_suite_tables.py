"""clinical suite: prescriptions, radiographs, perio charts, treatment plans, operatory chairs

Revision ID: c7d8e9f0a1b2
Revises: b1f2a3c4d5e6
Create Date: 2026-09-11 00:00:00.000000
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "c7d8e9f0a1b2"
down_revision: Union[str, None] = "b1f2a3c4d5e6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

_TS = sa.DateTime(timezone=True)
_JSONB = postgresql.JSONB(astext_type=sa.Text())


def _tenant_fk() -> sa.Column:
    return sa.Column(
        "tenant_id", sa.UUID(), sa.ForeignKey("tenants.id", ondelete="CASCADE"), nullable=False
    )


def _patient_fk() -> sa.Column:
    return sa.Column(
        "patient_id", sa.UUID(), sa.ForeignKey("patients.id", ondelete="CASCADE"), nullable=False
    )


def upgrade() -> None:
    op.create_table(
        "prescriptions",
        sa.Column("id", sa.UUID(), primary_key=True),
        _tenant_fk(),
        _patient_fk(),
        sa.Column("patient_name", sa.String(200), nullable=False, server_default=""),
        sa.Column("patient_age", sa.Integer(), nullable=True),
        sa.Column("patient_gender", sa.String(20), nullable=True),
        sa.Column("doctor_id", sa.UUID(), sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True),
        sa.Column("doctor_name", sa.String(200), nullable=False, server_default=""),
        sa.Column("doctor_registration_number", sa.String(80), nullable=True),
        sa.Column("date", sa.Date(), nullable=False),
        sa.Column("diagnosis", sa.Text(), nullable=False, server_default=""),
        sa.Column("items", _JSONB, nullable=False, server_default="[]"),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", _TS, server_default=sa.text("now()"), nullable=False),
    )
    op.create_index("ix_prescriptions_tenant_id", "prescriptions", ["tenant_id"])
    op.create_index("ix_prescriptions_patient_id", "prescriptions", ["patient_id"])

    op.create_table(
        "radiographs",
        sa.Column("id", sa.UUID(), primary_key=True),
        _tenant_fk(),
        _patient_fk(),
        sa.Column("title", sa.String(200), nullable=False, server_default=""),
        sa.Column("category", sa.String(40), nullable=False, server_default=""),
        sa.Column("date_taken", sa.Date(), nullable=False),
        sa.Column("tooth_numbers", _JSONB, nullable=False, server_default="[]"),
        sa.Column("image_url", sa.Text(), nullable=False, server_default=""),
        sa.Column("findings", sa.Text(), nullable=False, server_default=""),
        sa.Column("taken_by", sa.String(200), nullable=False, server_default=""),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", _TS, server_default=sa.text("now()"), nullable=False),
    )
    op.create_index("ix_radiographs_tenant_id", "radiographs", ["tenant_id"])
    op.create_index("ix_radiographs_patient_id", "radiographs", ["patient_id"])

    op.create_table(
        "perio_charts",
        sa.Column("id", sa.UUID(), primary_key=True),
        _tenant_fk(),
        _patient_fk(),
        sa.Column("exam_date", sa.Date(), nullable=False),
        sa.Column("examined_by", sa.String(200), nullable=False, server_default=""),
        sa.Column("teeth", _JSONB, nullable=False, server_default="{}"),
        sa.Column("summary_notes", sa.Text(), nullable=True),
        sa.Column("created_at", _TS, server_default=sa.text("now()"), nullable=False),
    )
    op.create_index("ix_perio_charts_tenant_id", "perio_charts", ["tenant_id"])
    op.create_index("ix_perio_charts_patient_id", "perio_charts", ["patient_id"])

    op.create_table(
        "treatment_plans",
        sa.Column("id", sa.UUID(), primary_key=True),
        _tenant_fk(),
        _patient_fk(),
        sa.Column("title", sa.String(200), nullable=False, server_default=""),
        sa.Column("created_date", sa.Date(), nullable=False),
        sa.Column("created_by", sa.String(200), nullable=False, server_default=""),
        sa.Column("phases", _JSONB, nullable=False, server_default="[]"),
        sa.Column("total_estimated_fee", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("accepted_fee", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("status", sa.String(20), nullable=False, server_default="Draft"),
        sa.Column("patient_accepted_date", sa.Date(), nullable=True),
        sa.Column("created_at", _TS, server_default=sa.text("now()"), nullable=False),
    )
    op.create_index("ix_treatment_plans_tenant_id", "treatment_plans", ["tenant_id"])
    op.create_index("ix_treatment_plans_patient_id", "treatment_plans", ["patient_id"])

    op.create_table(
        "operatory_chairs",
        sa.Column("id", sa.UUID(), primary_key=True),
        _tenant_fk(),
        sa.Column("name", sa.String(40), nullable=False),
        sa.Column("room_number", sa.String(40), nullable=True),
        sa.Column("chair_type", sa.String(30), nullable=False, server_default="General"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("color", sa.String(20), nullable=True),
        sa.Column("created_at", _TS, server_default=sa.text("now()"), nullable=False),
    )
    op.create_index("ix_operatory_chairs_tenant_id", "operatory_chairs", ["tenant_id"])


def downgrade() -> None:
    op.drop_table("operatory_chairs")
    op.drop_table("treatment_plans")
    op.drop_table("perio_charts")
    op.drop_table("radiographs")
    op.drop_table("prescriptions")
