# Dentrix API

FastAPI backend for the Dentrix dental-clinic admin app.

Stack: FastAPI · SQLAlchemy 2.0 (sync) · psycopg3 · Alembic · Neon Postgres · JWT (Argon2id).

## Layout

```
app/
  config.py          settings (pydantic-settings); normalises the Neon URL, parses CORS_ORIGINS
  database.py         sync engine + session (pool_pre_ping survives Neon autosuspend)
  security.py         Argon2id hash/verify + JWT encode/decode  (self-check: python -m app.security)
  dependencies.py     get_current_user, require_permission(perm), require_super_admin,
                      scoped() query filter, resolve_write_tenant()
  main.py             app factory + CORS + router wiring
  seed.py             one-shot bootstrap Super Admin from env
  models/             base.py · tenant.py · user.py · patient.py · service.py
  schemas/            common.py (CamelModel + Literals) · auth.py · user.py · patient.py · service.py
  routers/            health.py · auth.py · patients.py · services.py
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

| Method | Path | Auth |
|---|---|---|
| GET | `/health` | none — DB ping |
| POST | `/auth/login` | none — `{email, password}` -> `{accessToken, user}` |
| GET | `/auth/me` | bearer |
| GET / POST | `/patients` | `canManagePatients` (tenant-scoped) |
| PATCH | `/patients/{id}` | `canManagePatients` |
| GET / POST | `/services` | `canManageServices` (tenant-scoped; unique CDT code per clinic) |
| PATCH | `/services/{id}` | `canManageServices` (also handles active/archive toggle) |

Super Admin and Doctor Admin implicitly pass every `require_permission` check.
Reads are filtered to the caller's tenant; Super Admin sees all. Writes are locked
to the caller's tenant (Super Admin must pass `tenantId` in the body).

## Deploy (Render)

- **Web Service**, root directory `backend/`, plan **Starter** (free spins down).
- Build: `pip install -r requirements.txt`
- Pre-deploy: `alembic upgrade head`
- Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Health check path: `/health`
- Env vars: `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGINS` (your Vercel domain), `ENV=production`.
  Set `BOOTSTRAP_SUPERADMIN_*` once, run `python -m app.seed` from a shell, then clear the password var.
- Put the Render service and the Neon project in the **same region**.

## Status

Done: config, DB, models (Tenant/User/Patient/Service), auth (login, me), permission
dependencies, health, seed, patients CRUD, services CRUD.

Next: appointments (+ auto-invoice + conflict check) -> clinical notes -> invoices /
payments -> tenants + staff/users -> server-side audit log. Then point the frontend
`AuthContext`/`DataContext` at these endpoints.
