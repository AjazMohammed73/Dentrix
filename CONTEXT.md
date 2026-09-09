# Dentrix — Project Context

Working notes for anyone (human or AI) picking this up. Read this + `PRE_LAUNCH.md`
+ `backend/README.md` and you're caught up.

_Last updated: 2026-09-09_

---

## What this is

A multi-tenant dental-clinic admin app.

- **`/` (repo root)** — the original frontend: React 18 + Vite 6 + TS + Tailwind.
  Currently a **demo**: all data in `localStorage`, fake auth, RBAC enforced only in
  the browser. Runs with `npm run dev` (port 3000 is blocked on this machine —
  use `npx vite --port 5180 --host 127.0.0.1`).
- **`backend/`** — a real FastAPI + Postgres API being built to replace the
  `localStorage` layer. This is the active work.

## Target deployment

| Piece | Where | Notes |
|---|---|---|
| Frontend | Vercel | static build |
| API | Render **Web Service**, Starter plan ($7) | root dir `backend/`; free plan spins down |
| DB | Neon Postgres (start on free 0.5 GB) | use the **pooled** connection string; same region as Render |

Neon free 0.5 GB lasts ~1 year for 15 clinics **only if audit logs are pruned**
(see `PRE_LAUNCH.md` capacity section). Budget for Neon Launch (~$19, 10 GB) or
Render Postgres ($7) once past a few live clinics.

---

## Backend — decisions locked in

- **Sync SQLAlchemy 2.0** + psycopg3. Not async (no benefit at this scale, more complexity).
- **JWT access token only** (`Authorization: Bearer`), ~12 h expiry, no refresh token yet.
  Argon2id password hashing (`pwdlib`).
- **Alembic** from day one. No `create_all`.
- **Per-domain files**: `models/<entity>.py`, `schemas/<entity>.py`, `routers/<entity>.py`.
- **Wire format is camelCase** (`schemas/common.py::CamelModel`) to match the frontend
  TS types. Python stays snake_case. Nested JSONB blobs (`insurance`, `vitals`, …) use
  plain `BaseModel` with the exact frontend key names.
- **Money = whole INR integers.** No paise, no floats. (`ponytail:` comments mark the
  upgrade path if sub-rupee billing ever appears.)
- **Tenant isolation is server-side.** `dependencies.scoped()` filters every read by
  the caller's `tenant_id`; `resolve_write_tenant()` locks writes. Super Admin bypasses.
  `tenant_id` is **never** taken from a request body (except Super Admin service creation).
- **`require_permission("canX")`**: Super Admin + Doctor Admin implicitly pass all;
  Staff checked against the JSONB `permissions` flag. Mirrors the frontend's
  `canX || isDoctor || isSuperAdmin`.
- **Denormalized names** (`patient_name`, `doctor_name`, `service_name` on appointments/
  invoices) are resolved **server-side from the referenced rows** at create time, not
  trusted from the client. They're an intentional snapshot.
- **Append-only** where the domain is: `clinical_notes` (signed & locked — POST + GET
  only) and `payment_installments` (child table, not a JSONB array).

---

## Status

### Done
- `config`, `database`, `security` (self-check: `python -m app.security`), `dependencies`
- Models: `Tenant`, `User`, `Patient`, `Service`, `Appointment`, `Invoice`,
  `PaymentInstallment`, `ClinicalNote`
- `seed.py` — bootstrap Super Admin from env
- Routers:
  - `auth`: `POST /auth/login`, `GET /auth/me`
  - `health`: `GET /health`
  - `patients`: GET / POST / PATCH  (`canManagePatients`)
  - `services`: GET / POST / PATCH  (`canManageServices`; unique CDT code per tenant)
  - `appointments`: GET (`?date=`, `?patient_id=`) / POST / PATCH / DELETE
    + `POST /appointments/check-conflict`. POST auto-creates the pending invoice and
    bumps `patient.balance`, in one transaction, retrying once on invoice-number races.
  - `invoices`: GET / POST / DELETE + `POST /{id}/payments` + `POST /{id}/mark-paid`
    (`canViewRevenue`). Payments write an installment, recompute balance/status, and
    adjust `patient.balance`.
  - `clinical_notes`: GET (`?patient_id=`) / POST  (read = `canManagePatients`,
    write = `canWriteDoctorNotes`)
  - `tenants`: GET (Super Admin -> all; others -> own only) / POST onboard (creates
    tenant + DOCTOR_ADMIN user + default subscription) / PATCH (status, plan,
    subscription) / `POST /{id}/assign-doctor-admin`. Writes are Super Admin only.
    MRR/ARR is computed client-side over the returned list.
  - `users`: GET / POST (invite; clinic users forced to own tenant, Super Admin passes
    `tenantId`) / PATCH (name/title/phone/status always; `role` Super Admin only;
    `permissions` is **merged**, not replaced) / DELETE. Gate `canManageStaff`.
    Guards: can't touch your own role/status, can't delete yourself, can't demote or
    delete the last Super Admin; Doctor Admin can't manage other admins or delete
    non-staff.
  - `audit`: `GET /audit-logs` (`?q=`, `?limit=`, `?offset=`) for Doctor/Super Admin,
    tenant-scoped (Super Admin sees all). `app/audit.py::record_audit()` adds a row to
    the caller's transaction from every mutation endpoint (login, patient/appt/invoice/
    note/service/tenant/user changes). Uses the authenticated user + `X-Forwarded-For`,
    never client-supplied identity. Model `audit_logs` has **no FKs** (survives
    user/tenant deletion) and no update/delete code paths.

### Not started — roughly in order
1. **Wire the frontend** — replace `context/AuthContext.tsx` and
   `context/DataContext.tsx` `localStorage` logic with `fetch` to the API.
   Add `VITE_API_URL`. Store the JWT (memory + `sessionStorage`), attach as
   `Authorization` header. Keep the same context method names so views don't change.
   Drop the tenant switcher and role switcher (demo-only, like the removed mock data).
2. **Then** the `PRE_LAUNCH.md` blockers: rate limiting on `/auth/login`, CSV
   formula-injection escaping, remove the frontend role switcher + demo accounts,
   drop the unbacked HIPAA/RLS claims, `ErrorBoundary` reset-cache wording, etc.

---

## Gotchas / conventions

- FastAPI is pinned to a version where `app.routes` doesn't expand included routers
  until the first request — check routes via a live `GET /openapi.json`, not
  by iterating `app.routes`.
- `db.py`/`deps.py` were renamed to `database.py`/`dependencies.py`. `models.py`/
  `schemas.py` became packages.
- Conflict-check 409 body shape: `{"detail": {"message", "chairConflict", "doctorConflict"}}`
  where each `*Conflict` is `{id, patientName, startTime, endTime}` or null — the
  `BookAppointmentModal` expects those field names.
- `.venv` and deps are already installed under `backend/`.
- First migration is generated by the developer:
  `alembic revision --autogenerate -m "initial"` then `alembic upgrade head`.
- **Not building**: `SystemHealth` (DB pool / storage / uptime cards in `SuperAdminView`)
  is decorative fake telemetry — leave it hardcoded on the frontend or drop those cards.
  No `/system-health` endpoint.
- **Audit append-only** is by construction in code. For real immutability run once on
  the DB (needs a separate low-priv app role, not the Neon owner):
  `REVOKE UPDATE, DELETE ON audit_logs FROM <app_role>;`  Also add a 90-day retention
  job later (archive older rows to object storage — this table is what fills Neon).
