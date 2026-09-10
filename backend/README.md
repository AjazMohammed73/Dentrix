# Dentrix API

FastAPI backend for the Dentrix dental-clinic admin app. See `../CONTEXT.md` for the
big picture and roadmap.

Stack: FastAPI · SQLAlchemy 2.0 (sync) · psycopg3 · Alembic · Neon Postgres · JWT (Argon2id).

## Layout

```
app/
  config.py          settings; normalises the Neon URL, parses CORS_ORIGINS
  database.py         sync engine + session (pool_pre_ping survives Neon autosuspend)
  security.py         Argon2id hash/verify + JWT encode/decode  (self-check: python -m app.security)
  dependencies.py     get_current_user, require_permission(perm), require_super_admin,
                      scoped() query filter, resolve_write_tenant()
  billing.py          invoice-number allocation, balance recompute, patient-balance sync
  main.py             app factory + CORS + router wiring
  seed.py             one-shot bootstrap Super Admin from env
  audit.py           record_audit() — appends an audit row to the caller's transaction
  retention.py       archive + prune old audit_logs rows (run on a schedule)
  ratelimit.py       in-memory sliding-window limiter (login + per-user write quota)
  models/             base · tenant · user · patient · service · appointment · invoice
                      · clinical_note · audit_log · prescription · radiograph
                      · perio_chart · treatment_plan · operatory_chair
  schemas/            common (CamelModel + Literals) · auth · user · tenant · patient · service
                      · appointment · invoice · clinical_note · audit + the clinical-suite ones
  routers/            health · auth · tenants · users · patients · services · appointments
                      · invoices · clinical_notes · audit · prescriptions · radiographs
                      · perio_charts · treatment_plans · operatory_chairs
alembic/              migrations, wired to app settings in env.py
```

Wire format is **camelCase** (matches the frontend TS types); Python stays snake_case
via `CamelModel`. Money is stored as **whole INR integers**.

## Local setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate            # Windows;  source .venv/bin/activate on macOS/Linux
pip install -r requirements.txt

cp .env.example .env              # then fill DATABASE_URL and JWT_SECRET
python -c "import secrets; print(secrets.token_urlsafe(48))"   # -> JWT_SECRET
```

Use the Neon **pooled** connection string (host contains `-pooler`).

## Database

```bash
alembic revision --autogenerate -m "initial"   # generates alembic/versions/xxxx_initial.py
alembic upgrade head
python -m app.seed                              # creates the bootstrap Super Admin from .env
```

On later model changes: `alembic revision --autogenerate -m "..."` then `alembic upgrade head`.

## Run

```bash
uvicorn app.main:app --reload --port 8001 --no-server-header       # docs at http://127.0.0.1:8001/docs
```

Local port is **8001** (8000 is used by another project on this machine). The frontend
`.env` must match (`VITE_API_URL=http://127.0.0.1:8001`).

### Endpoints

| Method | Path | Gate |
|---|---|---|
| GET | `/health` | none — DB ping |
| POST | `/auth/login` | none — `{email, password}` -> `{accessToken, user}` |
| GET | `/auth/me` | bearer |
| GET / POST | `/patients` · PATCH `/patients/{id}` | `canManagePatients` |
| GET / POST | `/services` · PATCH `/services/{id}` | `canManageServices` (unique CDT code / clinic) |
| GET / POST / PATCH / DELETE | `/appointments` (+ `?date=`, `?patient_id=`) | `canManageAppointments` |
| POST | `/appointments/check-conflict` | `canManageAppointments` |
| GET / POST / PATCH / DELETE | `/invoices` | `canViewRevenue` (POST also `canManagePatients`) |
| POST | `/invoices/{id}/payments` · `/invoices/{id}/mark-paid` | `canViewRevenue` |
| PATCH | `/invoices/{id}` — insurance-claim blob only | `canViewRevenue` |
| GET | `/clinical-notes` (+ `?patient_id=`) | `canManagePatients` |
| POST | `/clinical-notes` | `canWriteDoctorNotes` |
| GET / POST / DELETE | `/prescriptions` (+ `?patient_id=`) | read `canManagePatients` · write `canWriteDoctorNotes` |
| GET / POST / PATCH / DELETE | `/radiographs` (+ `?patient_id=`) | read `canManagePatients` · write `canWriteDoctorNotes` |
| GET / POST / PATCH / DELETE | `/perio-charts` (+ `?patient_id=`) | read `canManagePatients` · write `canWriteDoctorNotes` |
| GET / POST / PATCH / DELETE | `/treatment-plans` (+ `?patient_id=`) | `canManagePatients` |
| GET / POST / PATCH / DELETE | `/operatory-chairs` | read: any bearer · write `canManageServices` |
| GET | `/tenants` | bearer (Super Admin -> all; others -> own only) |
| POST / PATCH | `/tenants` · `/tenants/{id}` | Super Admin (onboard; status / plan / subscription) |
| POST | `/tenants/{id}/assign-doctor-admin` | Super Admin — `{userId}` |
| GET / POST | `/users` · PATCH / DELETE `/users/{id}` | `canManageStaff` |
| GET | `/audit-logs` (+ `?q=`, `?limit=`, `?offset=`) | Doctor / Super Admin (tenant-scoped) |

Super Admin and Doctor Admin implicitly pass every `require_permission` check. Reads are
filtered to the caller's tenant; Super Admin sees all. Writes are locked to the caller's
tenant. Booking an appointment auto-creates its pending invoice and updates the patient
balance in the same transaction. Clinical notes and payment installments are append-only.

## Deploy (Render)

- **Web Service**, root directory `backend/`, plan **Starter** (free spins down).
- Build: `pip install -r requirements.txt`
- Pre-deploy: `alembic upgrade head`
- Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT --no-server-header --proxy-headers`
- Health check path: `/health`
- Env vars: `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGINS` (your Vercel domain), `ENV=production`.
  Set `BOOTSTRAP_SUPERADMIN_*` once, run `python -m app.seed` from a shell, then clear the password var.
- Put the Render service and the Neon project in the **same region**.
- **Audit immutability**: enforced by a DB trigger (`dentrix_block_audit_mutation`,
  migration `b1f2a3c4d5e6`) that blocks every `UPDATE`/`DELETE` on `audit_logs`. No
  manual `REVOKE` needed.

## Audit-log retention

`audit_logs` is the fastest-growing table. Run the retention command on a schedule
(Render **Cron Job**, or a scheduled GitHub Action) — never in the API process:

    python -m app.retention            # archive rows older than AUDIT_RETENTION_DAYS, then delete them
    python -m app.retention --dry-run  # report only

It writes the old rows to `AUDIT_ARCHIVE_DIR/audit-before-<date>-<ts>.jsonl.gz`, then —
if `AUDIT_ARCHIVE_S3_BUCKET` is set — uploads that file to S3 / Cloudflare R2 (set
`AUDIT_ARCHIVE_S3_ENDPOINT` for R2; AWS creds come from the standard env vars), then
deletes the archived rows. The delete is permitted only inside this command's
transaction (`SET LOCAL "dentrix.audit_retention" = 'on'`); the append-only trigger
still blocks everything else.

Env: `AUDIT_RETENTION_DAYS` (default 90), `AUDIT_ARCHIVE_DIR` (default `audit_archive`),
`AUDIT_ARCHIVE_S3_BUCKET`, `AUDIT_ARCHIVE_S3_ENDPOINT`. Suggested schedule: weekly.

## Next

Per `../CONTEXT.md`: wire the frontend `AuthContext`/`DataContext` to the API.
