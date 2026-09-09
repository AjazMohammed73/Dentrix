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

### Frontend wiring — in progress

**Part (a) — DONE.** Auth + users + tenants now run against the API:
- `src/lib/api.ts` — `fetch` wrapper: `VITE_API_URL` base, `Bearer` token from
  `sessionStorage` (`dentrix_token`), `ApiError` (carries `status` + `detail`),
  fires a `dentrix:unauthorized` window event on 401.
- `src/context/AuthContext.tsx` — rewritten. `loginWithCredentials` -> `POST /auth/login`;
  `/auth/me` on mount if a token exists; `loading` flag; `currentTenant` from
  `GET /tenants`; `allUsers`/`allTenants` from `GET /users`/`GET /tenants`. All the
  users/tenants mutations call the API then reload the list; errors surface via
  `window.alert`. Dropped: `initialUsers`/`initialTenants`, all `localStorage`,
  `loginWithEmail`, `switchRole`, `switchTenant`.
- `src/App.tsx` — `loading` splash; workspace renders only when `isAuthenticated`;
  `DataProvider` moved to wrap only the workspace subtree (so `DataContext` never
  mounts without a user).
- `src/components/layout/TopHeader.tsx` — role-switcher pill bar and tenant `<select>`
  removed; non-super users see a static clinic-name chip.
- `AddStaffModal` / `OnboardTenantModal` gained a required password field (the API
  needs one; proper invite-email flow is later) and call the new context signatures.
- `.env` / `.env.example` add `VITE_API_URL`; `src/vite-env.d.ts` types it.
- `npx tsc --noEmit` and `npm run build` both pass.

**Part (b) — NOT STARTED.** `src/context/DataContext.tsx` still runs on `localStorage` +
`mockData`. Port each method to the API: patients, appointments (+ the auto-invoice is
now server-side, so drop the client one), invoices/payments, clinical notes, services.
Lists load per route via `useEffect`; keep method names/signatures so the views don't
change. `BookAppointmentModal` should call `POST /appointments/check-conflict` instead
of the local pure function; on `POST /appointments` handle the 409 conflict body.
`RevenueView`/`AuditLogModal` CSV export still needs formula-injection escaping (PRE_LAUNCH).

### Then — `PRE_LAUNCH.md` blockers
Rate limiting on `/auth/login`; CSV formula-injection escaping; remove the `SignInModal`
demo-account quick-fill; drop the unbacked HIPAA/RLS claims; `ErrorBoundary` reset-cache
wording; etc. (The role switcher was already removed in part (a).)

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
