"""Audit-log retention.

Archives `audit_logs` rows older than `AUDIT_RETENTION_DAYS` (default 90) to a
gzipped JSON-Lines file, optionally uploads that file to S3 / Cloudflare R2, then
deletes the archived rows from the table.

Run it on a schedule — a Render Cron Job or a scheduled GitHub Action — NOT inside
the API process:

    python -m app.retention              # archive + prune
    python -m app.retention --dry-run    # report what would happen, touch nothing
    python -m app.retention --selfcheck  # serialization check, no DB

The `audit_logs` append-only trigger normally blocks DELETE; this command opts in
for its own transaction with `SET LOCAL "dentrix.audit_retention" = 'on'`. Nothing
else sets that flag, so the table stays immutable to the API and to ad-hoc SQL.
"""

from __future__ import annotations

import argparse
import gzip
import json
import sys
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path

from sqlalchemy import delete, func, select, text

from .config import get_settings
from .database import SessionLocal
from .models import AuditLog

_BATCH = 10_000
_COLUMNS = (
    "id", "tenant_id", "timestamp", "user_id", "user_name", "user_role",
    "action", "resource_type", "resource_id", "details", "ip_address",
)


def _jsonable(row: AuditLog) -> dict:
    out: dict = {}
    for col in _COLUMNS:
        val = getattr(row, col)
        if isinstance(val, (uuid.UUID, datetime)):
            val = val.isoformat() if isinstance(val, datetime) else str(val)
        out[col] = val
    return out


def _upload_to_s3(path: Path) -> str:
    settings = get_settings()
    try:
        import boto3  # optional — only needed when an archive bucket is configured
    except ModuleNotFoundError:  # pragma: no cover
        raise SystemExit(
            "AUDIT_ARCHIVE_S3_BUCKET is set but boto3 is not installed "
            "(`pip install boto3`)."
        )
    client = boto3.client("s3", endpoint_url=settings.audit_archive_s3_endpoint or None)
    key = f"audit-archive/{path.name}"
    client.upload_file(str(path), settings.audit_archive_s3_bucket, key)
    return f"s3://{settings.audit_archive_s3_bucket}/{key}"


def archive_and_prune(*, dry_run: bool = False) -> int:
    settings = get_settings()
    cutoff = datetime.now(timezone.utc) - timedelta(days=settings.audit_retention_days)

    with SessionLocal() as session:
        total = session.scalar(
            select(func.count()).select_from(AuditLog).where(AuditLog.timestamp < cutoff)
        ) or 0
        if total == 0:
            print(f"Nothing older than {settings.audit_retention_days} days ({cutoff.date()}).")
            return 0

        stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
        out_dir = Path(settings.audit_archive_dir)
        out_dir.mkdir(parents=True, exist_ok=True)
        archive_path = out_dir / f"audit-before-{cutoff.date()}-{stamp}.jsonl.gz"

        written = 0
        with gzip.open(archive_path, "wt", encoding="utf-8") as fh:
            stmt = (
                select(AuditLog)
                .where(AuditLog.timestamp < cutoff)
                .order_by(AuditLog.timestamp)
                .execution_options(yield_per=_BATCH)
            )
            for row in session.execute(stmt).scalars():
                fh.write(json.dumps(_jsonable(row), separators=(",", ":")) + "\n")
                written += 1

        location = str(archive_path)
        if settings.audit_archive_s3_bucket:
            location = _upload_to_s3(archive_path)

        if dry_run:
            print(f"[dry-run] would archive {written} rows -> {location}; table left intact.")
            return written

        # One transaction: opt past the append-only trigger, delete the archived window.
        session.execute(text('SET LOCAL "dentrix.audit_retention" = \'on\''))
        deleted = session.execute(
            delete(AuditLog).where(AuditLog.timestamp < cutoff)
        ).rowcount
        session.commit()
        print(f"Archived {written} rows -> {location}; deleted {deleted} from audit_logs.")
        return deleted


def _selfcheck() -> None:
    row = AuditLog(
        id=uuid.uuid4(),
        tenant_id=uuid.uuid4(),
        timestamp=datetime(2026, 1, 2, 3, 4, 5, tzinfo=timezone.utc),
        user_name="Dr. X",
        user_role="DOCTOR_ADMIN",
        action="PATIENT_UPDATED",
        resource_type="Patient",
        resource_id="abc",
        details="edited",
        ip_address="1.2.3.4",
    )
    d = _jsonable(row)
    round_tripped = json.loads(json.dumps(d))
    assert round_tripped["action"] == "PATIENT_UPDATED"
    assert round_tripped["timestamp"] == "2026-01-02T03:04:05+00:00"
    assert isinstance(round_tripped["id"], str) and isinstance(round_tripped["tenant_id"], str)
    assert set(d) == set(_COLUMNS)
    print("retention self-check ok")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Archive and prune old audit_logs rows.")
    parser.add_argument("--dry-run", action="store_true", help="report only, change nothing")
    parser.add_argument("--selfcheck", action="store_true", help="serialization check, no DB")
    args = parser.parse_args()
    if args.selfcheck:
        _selfcheck()
        sys.exit(0)
    archive_and_prune(dry_run=args.dry_run)
