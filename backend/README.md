# Dentrix API

FastAPI backend for the Dentrix dental-clinic admin app.

Stack: FastAPI · SQLAlchemy 2.0 (sync) · psycopg3 · Alembic · Neon Postgres · JWT (Argon2id).

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
uvicorn app.main:app --reload --port 8000
```

- Docs: http://127.0.0.1:8000/docs
- `GET /health` — DB ping
- `POST /auth/login` — `{ "email", "password" }` -> `{ access_token, user }`
- `GET /auth/me` — requires `Authorization: Bearer <token>`

Self-check for the crypto layer: `python -m app.security`

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

Implemented: config, DB, `Tenant` + `User` models, auth (login, me), permission
dependencies, health, seed.

Next: patients → appointments (+ auto-invoice) → services → clinical notes →
invoices/payments → audit log. Then wire the frontend `AuthContext`/`DataContext`
to these endpoints.
