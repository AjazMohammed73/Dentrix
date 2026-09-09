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
  models/             base · tenant · user · patient · service · appointment · invoice
                      · clinical_note · audit_log
  schemas/            common (CamelModel + Literals) · auth · user · tenant · patient · service
                      · appointment · invoice · clinical_note · audit
  routers/            health · auth · tenants · users · patients · services · appointments
                      · invoices · clinical_notes · audit
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
uvicorn app.main:app --reload --port 8000       # docs at http://127.0.0.1:8000/docs
```

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
| GET / POST / DELETE | `/invoices` | `canViewRevenue` |
| POST | `/invoices/{id}/payments` · `/invoices/{id}/mark-paid` | `canViewRevenue` |
| GET | `/clinical-notes` (+ `?patient_id=`) | `canManagePatients` |
| POST | `/clinical-notes` | `canWriteDoctorNotes` |
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
- Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Health check path: `/health`
- Env vars: `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGINS` (your Vercel domain), `ENV=production`.
  Set `BOOTSTRAP_SUPERADMIN_*` once, run `python -m app.seed` from a shell, then clear the password var.
- Put the Render service and the Neon project in the **same region**.
- **Audit immutability**: `audit_logs` is append-only in code. For a hard guarantee,
  connect the app as a low-privilege role and run once:
  `REVOKE UPDATE, DELETE ON audit_logs FROM <app_role>;`

## Next

Per `../CONTEXT.md`: wire the frontend `AuthContext`/`DataContext` to the API.
