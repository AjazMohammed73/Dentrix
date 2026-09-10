"""security hardening: token_version, soft-delete, audit immutability

Revision ID: b1f2a3c4d5e6
Revises: 2cceb055fef1
Create Date: 2026-09-10 00:00:00.000000
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "b1f2a3c4d5e6"
down_revision: Union[str, None] = "2cceb055fef1"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

_BLOCK_FN = """
CREATE OR REPLACE FUNCTION dentrix_block_audit_mutation() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
    RAISE EXCEPTION 'audit_logs is append-only';
END;
$$;
"""


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column("token_version", sa.Integer(), nullable=False, server_default="1"),
    )
    op.add_column(
        "appointments",
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.add_column(
        "invoices",
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.execute(_BLOCK_FN)
    op.execute(
        "CREATE TRIGGER audit_logs_no_mutation "
        "BEFORE UPDATE OR DELETE ON audit_logs "
        "FOR EACH ROW EXECUTE FUNCTION dentrix_block_audit_mutation();"
    )


def downgrade() -> None:
    op.execute("DROP TRIGGER IF EXISTS audit_logs_no_mutation ON audit_logs;")
    op.execute("DROP FUNCTION IF EXISTS dentrix_block_audit_mutation();")
    op.drop_column("invoices", "deleted_at")
    op.drop_column("appointments", "deleted_at")
    op.drop_column("users", "token_version")
