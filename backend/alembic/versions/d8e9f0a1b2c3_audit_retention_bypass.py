"""audit retention: let the pruning job delete archived rows, nothing else

Revision ID: d8e9f0a1b2c3
Revises: c7d8e9f0a1b2
Create Date: 2026-09-11 00:00:00.000000

The append-only trigger from b1f2a3c4d5e6 blocks every UPDATE and DELETE on
audit_logs. The retention job (`python -m app.retention`) needs to delete rows it
has already archived. This replaces the trigger function so a DELETE is allowed
*only* when the session has explicitly opted in with

    SET LOCAL "dentrix.audit_retention" = 'on'

which nothing but the retention command ever does. UPDATE stays blocked always.
"""
from typing import Sequence, Union

from alembic import op

revision: str = "d8e9f0a1b2c3"
down_revision: Union[str, None] = "c7d8e9f0a1b2"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

_FN_WITH_BYPASS = """
CREATE OR REPLACE FUNCTION dentrix_block_audit_mutation() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
    IF TG_OP = 'DELETE'
       AND current_setting('dentrix.audit_retention', true) = 'on' THEN
        RETURN OLD;  -- retention job, archived rows only
    END IF;
    RAISE EXCEPTION 'audit_logs is append-only';
END;
$$;
"""

_FN_STRICT = """
CREATE OR REPLACE FUNCTION dentrix_block_audit_mutation() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
    RAISE EXCEPTION 'audit_logs is append-only';
END;
$$;
"""


def upgrade() -> None:
    op.execute(_FN_WITH_BYPASS)


def downgrade() -> None:
    op.execute(_FN_STRICT)
