# Dentrix — Project Context

Working notes for anyone (human or AI) picking this up. Read this + `PRE_LAUNCH.md`
+ `backend/README.md` and you're caught up.

_Last updated: 2026-09-10 (security hardening round 2)_

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
- **JWT auth**: in-memory access token (`Authorization: Bearer`, 60 min) + HttpOnly
  `dentrix_refresh` cookie (30 d, `POST /auth/refresh` with double-submit CSRF). Both
  carry `tv` (token_version) for instant revocation. Argon2id hashing (`pwdlib`).
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
  - `invoices`: `POST` needs **billing access** (`canManagePatients` OR `canViewRevenue`
    — front-desk staff raise invoices without seeing revenue reports); `GET` / `DELETE` /
    `POST /{id}/payments` / `POST /{id}/mark-paid` stay behind `canViewRevenue` (only
    reachable from RevenueView). Payments write an installment, recompute balance/status,
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

**Part (b) — DONE.** `src/context/DataContext.tsx` rewritten to hit the API:
- On mount, `DataProvider` loads `/patients`, `/services`, `/appointments`,
  `/clinical-notes`, and (gated) `/invoices`, `/audit-logs`. Each list load falls back
  to `[]` on error (`safeList`). `refreshAll` re-pulls everything.
- Every mutation calls the API then reloads the affected list(s); errors -> `window.alert`.
  Booking reloads appointments + invoices + patients (the auto-invoice + balance move
  are server-side now). `addInvoice` returns the created invoice for the print modal.
- `checkAppointmentConflict` stayed a **sync pure function** over the in-memory
  `appointments` list (advisory; the server re-checks on `POST /appointments`), so
  `BookAppointmentModal` keeps its live warning banner. That modal now sends only
  `{patientId, serviceId, doctorId, date, startTime, operatoryChair, notes, allowOverride}`
  — names/times/fee are derived server-side.
- `logAuditEvent` removed (server logs); `allPatients/allAppointments/allInvoices`
  removed (unused); `allServices` aliases `services`. `systemHealth` is a static const.
- `src/data/mockData.ts` deleted. `CreateInvoiceModal` awaits `addInvoice` with a
  try/catch. `AddStaffModal`/`OnboardTenantModal` password fields from part (a).
- Backend read-gates loosened so a receptionist can book: `GET /services` and
  `GET /users` now need only authentication (still tenant-scoped; writes still gated).
- `tsc` + `npm run build` pass; backend still imports.

Still TODO on the frontend: `RevenueView`/`AuditLogModal` CSV export needs
formula-injection escaping (PRE_LAUNCH); `signedAt`/timestamps render as raw ISO.

### PRE_LAUNCH blockers — DONE (2026-09-10)
- **Rate limit** `/auth/login`: `backend/app/ratelimit.py` — in-memory sliding window,
  10 / 5 min / IP, 429 + `Retry-After`. (`ponytail`: per-process; slowapi+Redis if >1 instance.)
- **CSV formula-injection**: `src/utils/csv.ts` (`csvCell` prefixes `'` on `= + - @`,
  `toCsv`, `downloadCsv` via Blob). Used in `RevenueView.exportCSV` + `AuditLogModal`.
- **`SignInModal`**: demo-account quick-fill + prefilled password removed; honest footer copy.
- **Unbacked claims**: `LandingPageView` FAQ + footer reworded (no "HIPAA compliance",
  "row-level security", "cryptographic boundary"); "cryptographically signed" notes ->
  "electronically signed, locked"; `OnboardTenantModal` already accurate. Root `README.md`
  had a stray UTF-16 tail — stripped; it has no false claims.
- **`ErrorBoundary`**: reset button now "Sign Out & Reload" (clears `dentrix_token`),
  wording says server data is unaffected.
- Still MANUAL: audit `REVOKE UPDATE, DELETE` — needs a low-priv DB role (not the Neon
  owner). SQL is in `backend/README.md`; do it at deploy.

### Deploy config — DONE
- `backend/render.yaml` — Render Blueprint (web service, `rootDir: backend`, build /
  preDeploy `alembic upgrade head` / start / health `/health`, env-var placeholders).
- Vercel: no config file needed (auto-detects Vite); set `VITE_API_URL` to the Render URL
  in the Vercel dashboard.

### Demo data
- `backend/app/seed_demo.py` — `python -m app.seed_demo` (no-op if the clinic exists).
  Seeds Apex Dental Studio + `dr.vance@apexdental.com` / `emma.reception@apexdental.com`
  (both `Password123!`), 8 CDT services, 3 patients, 2 appointments (+ their auto-invoices).
  Already run against the live Neon DB.

---

## Local run (wired 2026-09-10)

- Neon DB is live (`backend/.env`, gitignored). Migration `2cceb055fef1_initial` applied;
  one `SUPER_ADMIN` seeded (`suvignan@gmail.com` / `DentrixAdmin!2026` — change it).
  **The Neon password was pasted in chat — rotate it in the Neon console.**
- **API runs on `:8001`** locally (`:8000` is taken by the Restaurant-POS backend).
  `uvicorn app.main:app --host 127.0.0.1 --port 8001` from `backend/`.
- Frontend `.env` -> `VITE_API_URL=http://127.0.0.1:8001`. `npm run dev` (Vite on
  `:5180`, in the backend `CORS_ORIGINS`). `:3000` is also allowed but blocked on this box.
- End-to-end smoke test passed: login -> JWT, all list endpoints 200, audit row written.
- The app opens empty for the Super Admin — onboard a clinic via "Provision New Clinic",
  then sign in as that Doctor Admin to exercise patients / appointments / billing.

## E2E testing & bug fixes (2026-09-10)

Ran a 136-assertion API suite (`scratchpad/e2e.py`) across all 3 roles + a fork-agent
code review. **136/136 pass.** Covered: every endpoint, auth/RBAC negatives, cross-tenant
isolation (a clinic-B doctor gets 404 on every clinic-A resource), edge inputs, the
booking→invoice→payment→balance chain, and audit coverage. Fixed along the way:

- **500→409 on duplicate slug / email / CDT code** — the `db.flush()` added for audit
  logging fired the unique check *outside* the `try`. Wrapped flush+audit+commit together.
- **500 on appointment conflict** — the 409 detail dict held a raw `UUID`; now
  `model_dump(mode="json")`.
- **500 on `GET /appointments?date=`** — `Date` column compared to a `str`; param is now `date`.
- **Cancel/No-Show now voids the unpaid auto-invoice** and reverses the patient balance
  (was leaving A/R permanently inflated).
- **Suspended tenant now blocks its users** — `get_current_user` checks `tenant.status`.
- **Missing `Authorization` header → 401** (was 403), so the frontend session-recovery fires.
- **Login rate limit keyed by email**, not IP — unspoofable via `X-Forwarded-For`, doesn't
  punish an office behind one NAT; only failed attempts count (10 / 5 min).
- **`next_invoice_number` uses MAX(...)+1**, not COUNT — a deleted invoice no longer makes
  the next number collide. `POST /invoices` retries the race like bookings do.
- **`apply_patient_balance` is now one atomic `UPDATE ... GREATEST(0, balance+delta)`** —
  no lost-update race between concurrent payments.
- **"Overdue" is derived on read** in `GET /invoices` (past due-date + unpaid).
- **`assign-doctor-admin`** rejects a user from another clinic and steps down the old owner(s).
- **`start_time` regex** tightened to real `HH:MM`; appointment running to/past midnight → 400.
- **Frontend**: `safeList` rethrows non-403 errors (was hiding 5xx as "no data");
  `refreshAll` shows one alert on real failure; dates use the browser's local tz, not UTC
  (`todayISO` / `isoAfterDays` / `shiftISO`); `dentrix:unauthorized` no longer fires on a
  failed login; `BookAppointmentModal` fills its dropdowns once the lists load;
  `AuditAction`/`resourceType` TS unions widened to the new server actions.

**Not covered** (no browser-automation tool here): actual UI click-throughs. tsc + `npm run
build` pass; the API the UI calls is fully exercised.

## Security hardening (2026-09-10)

Adversarial pass — attempted forgery, IDOR, privilege escalation, injection, DoS,
info disclosure. 153-assertion suite (`scratchpad/e2e.py`, security section) passes.
Fixed:

- **Privilege escalation** — a STAFF with `canManageStaff` could `POST /users` a
  `DOCTOR_ADMIN` (full perms + a password they choose) and log in as a clinic admin.
  Now: creating a DOCTOR_ADMIN requires the caller *be* a Doctor/Super Admin; a non-admin
  caller cannot touch the permission matrix at all; and any perms it grants a new STAFF
  are clamped to the subset the caller itself holds. Unknown permission keys are dropped.
- **User-enumeration timing oracle** — a wrong email skipped Argon2 (fast) while a valid
  email + wrong password ran it (slow). Login now always runs a verify (against a dummy
  hash when there's no such user).
- **`X-Forwarded-For`-spoofable rate limit** — the login limiter is keyed by the
  normalised email, not the client IP, so it can't be evaded with a header and doesn't
  lock out an office behind one NAT.
- **Integer overflow → 500** — money fields (`amount`, `base_price`, `balance`,
  `monthlyFee`, payment amount) now have `le=` bounds well below int32.
- **Payload DoS** — every free-text request field is now length-bounded
  (clinical-note narrative 20 k, notes/description ~2 k, names/titles/addresses ~120–300,
  `medical_alerts` ≤30 items × 120 chars, audit `q` ≤200).
- **LIKE injection** in the audit `?q=` search — `% _ \` are escaped now.
- **Weak passwords** — minimum bumped 8 → 12 (backend schema + both modals).
- **`seed_demo` refuses to run when `ENV=production`** (its accounts use `Password123!`).
- **Prod info disclosure** — `/docs` + `/openapi.json` disabled when `ENV=production`;
  `GET /` no longer returns the env name.
- **Response headers** — `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy: no-referrer`, `Cache-Control: no-store` on every response.
- **Frontend** — `window.open(...)` for WhatsApp share now uses `noopener,noreferrer`.

Verified safe (attacked, held): JWT `alg=none` / RS256→HS256 confusion (fixed algorithm
list); tampered signatures; cross-tenant IDOR on every resource (404, not a leak); SQL
injection (parameterised throughout); stored XSS (React auto-escapes, no
`dangerouslySetInnerHTML`); CSRF (Bearer header, not cookies — not applicable);
`password_hash`/`salt` never in any response; Doctor Admin cannot reach `SUPER_ADMIN`.

### XSS hardening (2026-09-10)
- **CSP** — a Vite build plugin (`vite.config.ts`) bakes a strict
  `Content-Security-Policy` `<meta>` into `dist/index.html`: `script-src 'self'` (no
  inline script, no inline `on*` handlers, no `eval`), `connect-src` locked to the API
  origin (from `VITE_API_URL`) so injected JS **cannot exfiltrate the token**,
  `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`. Not applied to the
  dev server (HMR needs inline/eval). `vercel.json` ships the same CSP as a real header
  plus HSTS / X-Frame-Options / Referrer-Policy / Permissions-Policy on the SPA document
  — **edit `<YOUR-RENDER-API>` in `vercel.json` to the real Render URL before deploy.**
- Confirmed: built `index.html` has zero inline `<script>`; `src/` has no
  `dangerouslySetInnerHTML` / `innerHTML` / `eval` / `document.write` / `location.hash`
  parsing. React auto-escaping + CSP is the layered defense.
- Backend: 1 MB request-body cap (413); `/health` no longer opens a DB connection
  (`/health/ready` does, for monitoring) so a flood can't drain the pool.

### Pagination + token storage (2026-09-10)
- **Pagination** — every list endpoint (`/patients`, `/appointments`, `/invoices`,
  `/users`, `/clinical-notes`) takes `?limit=` (default 200, **max 1000**) + `?offset=`;
  `/appointments` also takes `?from=`/`?to=` date range. The frontend `DataContext`
  requests `limit=1000` and an 8-month appointment window, and still filters/searches
  client-side. Server-side `?q` search + a paged UI is the follow-up past ~1000
  patients/clinic; `/audit-logs` was already capped.
- **Token storage** — the access token is now **in memory only** (no
  localStorage/sessionStorage). On login the server sets an **HttpOnly** `dentrix_refresh`
  cookie (30 d, `Path=/auth`, `SameSite=None; Secure` in prod / `Lax` locally) plus a
  JS-readable `dentrix_csrf` cookie. `POST /auth/refresh` mints a fresh access token from
  the refresh cookie (rotating both) — guarded by a **double-submit CSRF check**
  (`X-CSRF-Token` header must equal the `dentrix_csrf` cookie). `POST /auth/logout` clears
  them. On mount / on any 401, the SPA silently calls `/auth/refresh` once. Net: an XSS
  can't steal a long-lived credential, and there's no persisted token to lift.
- **Body cap** — pure-ASGI middleware: 1 MB, honours `Content-Length` and caps the actual
  chunked stream, drains the rest so the client gets a clean 413.

## Security hardening — round 2 (2026-09-10)

Finished the "next hardening tier". Migration `b1f2a3c4d5e6_security_hardening`
(token_version + deleted_at columns + audit-immutability trigger). `python -m
app.ratelimit` self-check added; E2E suite extended (token revocation, logout-all,
soft-delete).

- **Instant token revocation** — `users.token_version` (int, `server_default '1'`).
  Both access + refresh tokens carry `tv`; `get_current_user` and `/auth/refresh`
  401 (`"Session has been revoked"`) if it no longer matches. Bumped on any
  role / status / permissions change (`users.update_user`), on `assign-doctor-admin`
  (target + stepped-down old admins), and by the new **`POST /auth/logout-all`**
  (self-service "sign out of all devices", CSRF-guarded, audited `SECURITY_LOGOUT`).
- **Access-token lifetime 12 h → 60 min** (`config.access_token_expire_minutes`);
  the refresh cookie covers UX, so a leaked access token dies fast now.
- **Per-user write quota** — `main.py` middleware: 240 state-changing
  (`POST/PUT/PATCH/DELETE`, non-`/auth/`) requests per user id per 60 s → 429 +
  `Retry-After`. Bad/absent token → skipped (the endpoint's own auth answers).
  Counter logic covered by `python -m app.ratelimit`.
- **Login: added a second per-IP layer** (50 failures / 5 min) on top of the
  per-email one (10 / 5 min). Only failures count; still `X-Forwarded-For`-proof.
- **`audit_logs` is now immutable at the DB** — a `BEFORE UPDATE OR DELETE` trigger
  (`dentrix_block_audit_mutation`) raises `audit_logs is append-only`. Survives
  `DROP TABLE` on downgrade (row triggers don't fire on DDL). Replaces the
  deploy-time `REVOKE` task — no separate DB role needed.
- **Soft-delete** — `appointments.deleted_at` / `invoices.deleted_at`. `DELETE`
  now stamps the column; list queries, `_get_owned` (404), and the conflict finder
  all filter `deleted_at IS NULL`. Cancelling an appointment or deleting an
  invoice reverses the patient balance and soft-voids the linked unpaid invoice.
  Data survives a malicious admin's bulk delete; audit trail stays intact.
- **CI** — `.github/workflows/ci.yml`: frontend `tsc --noEmit` + `vite build` +
  `npm audit`; backend `python -m app.security` + `import app.main` + `pip-audit`.

### Still open (need product / infra decisions — NOT code)
- **MFA / TOTP** on `SUPER_ADMIN` / `DOCTOR_ADMIN` — needs enrolment UI + recovery codes.
- **Self-service password reset** — needs an email provider chosen (currently admins
  hand out temp passwords out-of-band).
- **Automated backups** — Neon free PITR ≈ 24 h; add nightly `pg_dump` → object storage.
- **Global brute-force / credential-stuffing cap** across many accounts from one
  source — needs Cloudflare / a WAF in front (Render's proxy makes IP caps unreliable).
- Third-party Google Fonts (CSP pins the origins; low risk) — optionally self-host woff2.

### Deploy-time tasks (see `PRE_LAUNCH.md`)
- Rotate the Neon password (pasted in chat).
- Clear `BOOTSTRAP_SUPERADMIN_PASSWORD` from Render env after first boot.
- Set `ENV=production`; replace `<YOUR-RENDER-API>` in `vercel.json` with the real URL.

### Residual risk (accepted)
- A leaked access token still works until `exp` (now ≤ 60 min) unless the user is
  suspended / `logout-all` is called / a role-perm-status change bumps `tv`.
- Rate limiter `_hits` dict is per-process (resets on deploy). One Render instance is fine.
- `/health` opens no DB connection; `/health/ready` does (for monitoring).

## Known limitations (low priority, noted not fixed)
- Pagination is offset-based (`?limit=`/`?offset=`, max 1000) with no server-side `?q`
  search — the SPA pulls `limit=1000` and filters client-side. Add a paged UI + server
  search past ~1000 patients/clinic.
- Rate limiter + its `_hits` dict are per-process (reset on deploy). One Render instance is fine.
- Doctor Admin can't self-edit their profile (no UI for it either).
- `SystemHealth` cards are static placeholders.
- Remote Neon round-trip from this dev box is ~2 s/query (SSL + `pool_pre_ping`) — the
  full E2E suite takes many minutes locally. Not representative of Render↔Neon in-region.

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
