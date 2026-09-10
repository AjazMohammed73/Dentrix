# Must Change Before Going Live

> **Status (2026-09-10, round 2):** the code side is done. Real FastAPI + Postgres
> backend, frontend runs entirely on it, auth is real (JWT access + HttpOnly refresh
> cookie + CSRF, Argon2id, `token_version` revocation, 60-min access token,
> `logout-all`), RBAC + tenant isolation server-side, append-only audit log now
> enforced by a **DB trigger** (no deploy `REVOKE` needed), login rate-limited
> (per-email + per-IP), per-user write quota, 1 MB body cap, strict CSP, pagination,
> soft-delete on appointments + invoices, CSV injection-safe, CI workflow. Demo
> accounts and unbacked HIPAA/RLS claims are gone. See `CONTEXT.md` for detail.
>
> **Still open — all deployment / infra, no code left:** rotate the Neon password
> (pasted in chat); clear `BOOTSTRAP_SUPERADMIN_PASSWORD` from Render env after first
> boot; set `ENV=production`; replace `<YOUR-RENDER-API>` in `vercel.json`; pick an
> email provider for password reset; add MFA/TOTP; nightly `pg_dump` backups;
> put Cloudflare / a WAF in front for global brute-force protection; Sentry.
> Money stays whole-INR integers (fine for INR).

Original checklist below — items marked here are the ones that still need doing.

---

## 1. Blockers (do not launch without these)

- [ ] **No backend exists.** `AuthContext` / `DataContext` hold everything in
      React state + `localStorage`. Build the FastAPI service (see section 2) and
      point the frontend at it. Nothing is persisted server-side today.
- [ ] **`isAuthenticated` defaults to `true`.**
      `src/context/AuthContext.tsx` — `useState(() => authState !== null ? ... : true)`.
      Default must be `false`; app must gate on a verified session/JWT from the server.
- [ ] **Password handling is unsafe.** `src/utils/crypto.ts` uses SHA-256 with a
      single hardcoded salt `dentrix_salt_2026`, and `verifyPassword` accepts
      `Password123!` / `admin` / `dentrix` when no hash is set. Replace with
      **server-side Argon2id or bcrypt, per-user random salt**. Delete the fallback.
- [ ] **RBAC is client-side only.** Every `currentUser.permissions.*` check
      (views, `Sidebar`, `TopHeader`, `AccessDeniedView`) runs in the browser and
      can be bypassed from devtools. **Enforce every permission and every
      `tenant_id` scope in the API**, on every endpoint. The frontend checks are
      UX only.
- [ ] **Tenant isolation is a client `.filter()`.** `DataContext` filters by
      `tenantId` in JS. On the server, scope every query by the authenticated
      user's tenant (row-level filter or Postgres RLS). Never accept `tenant_id`
      from the request body.
- [ ] **Role switcher must go.** `TopHeader` "Simulate Role" pill bar and
      `switchRole` / `switchTenant` let anyone become Super Admin. Remove entirely
      for production (keep behind a dev-only flag if you want it for demos).
- [ ] **Demo accounts must go.** `src/data/mockData.ts` (all users/tenants) and
      the `demoAccounts` list in `src/components/modals/SignInModal.tsx`. Seed real
      accounts through an admin flow, not source code.
- [ ] **Compliance claims are unbacked.** README + UI say "HIPAA", "row-level
      security", "cryptographic logical boundary", "dedicated encryption key",
      "Immutable Log". None of that is implemented. Either build it (encryption at
      rest, real RLS, append-only audit table, BAA with host) or remove the
      claims — they are legal exposure.
- [ ] **`crypto.subtle` needs HTTPS.** Works on deployed HTTPS, silently fails on
      plain `http://`. Moot once hashing moves server-side, but don't ship any
      `crypto.subtle` call to an http origin.

---

## 2. Backend to build (FastAPI)

- [ ] **Auth**: login endpoint issuing a short-lived JWT (or server session
      cookie, `HttpOnly` + `Secure` + `SameSite=Lax`). Refresh flow. Logout that
      actually invalidates.
- [ ] **Password hashing**: `argon2-cffi` or `passlib[bcrypt]`, per-user salt,
      configurable work factor.
- [ ] **Authorization dependency**: a FastAPI dependency that loads the user,
      checks role + the specific `UserPermissions` flag for the route, and injects
      the tenant scope. Applied to every non-public route.
- [ ] **Pydantic models** for every request body — reject unknown fields,
      validate types, bound string lengths (patient notes, diagnosis, etc.).
- [ ] **CORS**: `allow_origins` = explicit list (your Vercel domain + preview
      domains). Not `*`. `allow_credentials=True` only with an explicit origin list.
- [ ] **Rate limiting**: at least on `/login` and write endpoints
      (`slowapi` or a reverse-proxy rule). Lockout / backoff on repeated login fail.
- [x] **Audit log server-side**: `record_audit` writes into the caller's transaction
      with the authenticated user + `X-Forwarded-For`. A `BEFORE UPDATE OR DELETE`
      trigger (`dentrix_block_audit_mutation`, migration `b1f2a3c4d5e6`) makes the
      table append-only at the DB — no separate low-priv role / `REVOKE` needed.
- [ ] **Secrets from env only**: DB URL, JWT signing key, any API keys. Nothing in
      the repo. `.env` in `.gitignore` (confirm), provide `.env.example`.
- [ ] **DB migrations**: Alembic. No `create_all` in production.
- [ ] **Health endpoint**: `/health` that pings the DB — used by Render health
      checks and to keep Neon warm.
- [ ] **Connection pooling for Neon**: use the `-pooler` connection string,
      `pool_size` small (5–10 for a persistent Render service), `pool_pre_ping=True`,
      sane `pool_recycle` (e.g. 300s) so autosuspended-then-resumed connections
      don't error.

---

## 3. Data / correctness bugs

- [ ] **Money is `number` (float).** All amounts (`amount`, `amountPaid`,
      `balance`, `fee`, `basePrice`, installments) are JS numbers. Store as
      **integer minor units (paise)** in the DB; format on display. Float rounding
      on partial payments will drift balances.
- [ ] **Invoice numbers can collide.** `CreateInvoiceModal` /
      `DataContext.addAppointment` build `INV-YYYY-<Math.random 4–5 digits>`.
      Generate server-side from a sequence or `tenant_id + year + serial` unique
      constraint.
- [ ] **IDs use `Date.now()`.** `pat_${Date.now()}`, `apt_${Date.now()}`, etc.
      Two fast creates collide. Use UUIDs (DB default `gen_random_uuid()`).
- [ ] **CSV export = injection risk.** `RevenueView.exportCSV` and
      `AuditLogModal.handleExportCSV` interpolate raw field values. A patient named
      `=cmd|...` becomes a live formula in Excel. Prefix any cell starting with
      `= + - @` with `'`, and quote/escape all fields.
- [ ] **Dates use local time.** `new Date().toISOString().split('T')[0]` and
      `.slice(0,19)` mix UTC and local assumptions. Pick a storage convention
      (UTC timestamptz in DB) and a clinic timezone for "today" calculations
      (dashboard, "today's appointments", audit timestamps).
- [ ] **Appointment conflict check is advisory + client-side.**
      `checkAppointmentConflict` runs in the browser and can be skipped. Re-check
      on the server inside the booking transaction (exclusion constraint on
      `tstzrange` per chair/doctor is the clean way).
- [ ] **Balance sync is best-effort.** `addInvoice` / `addInvoicePayment` /
      `deleteInvoice` / `markInvoicePaid` each hand-adjust `patient.balance`. Make
      it a derived value (`SELECT sum(balance) ...`) or update it in the same DB
      transaction as the invoice write, never separately.
- [ ] **`ErrorBoundary` "Reset Local Cache" wipes data.** Fine for a demo, but
      once data is server-backed this button just clears a stale cache — reword it
      so staff don't think they've deleted patient records, and make sure it can't
      run mid-write.
- [ ] **Odontogram state is inferred from note text.**
      `PatientDetailView.getToothStatus` keyword-matches `procedureName` /
      `diagnosis` strings and hardcodes tooth #19 as "Restored". For real charts,
      store explicit `ToothRecord` rows (the type already exists in
      `src/types/index.ts`) written by the clinician, not parsed from prose.

---

## 4. Ops / deployment

- [ ] **API on Render Starter ($7), not free.** Free service spins down (30–60s
      cold start). Add a Render health check on `/health`.
- [ ] **Frontend env var** for the API base URL (`VITE_API_URL`), set per
      environment in Vercel. No hardcoded `localhost`.
- [ ] **Same region** for Render service and Neon project.
- [ ] **`vite.config.ts` port 3000 fails on some machines** (`listen EACCES ::1:3000`).
      Harmless for prod (Vercel builds static output) but change the dev port or
      `host` so local `npm run dev` works for everyone.
- [ ] **Backups**: Neon free PITR is ~24h. Schedule a daily `pg_dump` to object
      storage (Cloudflare R2 / S3), or move to Neon Launch / Render Postgres which
      include real backups.
- [ ] **Audit log retention**: keep 90 days in Postgres, archive older rows to
      object storage. This is the table that fills the 0.5 GB Neon quota (see
      capacity notes) — leaving it unbounded gives you ~4–5 months for 15 clinics.
- [ ] **Error monitoring**: Sentry (or similar) on both frontend and API.
- [ ] **Bundle weight**: `three` is pulled in only for the sidebar logo
      (`vendor-three` chunk). If first-load size matters, lazy-load `Tooth3D` or
      replace it with a static SVG.
- [ ] **Remove `console.error` PHI leakage**: `ErrorBoundary.componentDidCatch`
      logs full errors; make sure server logs and browser console don't capture
      patient data in production.

---

## 5. Nice-to-have (not launch blockers)

- [ ] Pagination on patient / appointment / invoice / audit lists (they render
      every row today).
- [ ] Optimistic-UI rollback when an API write fails.
- [ ] Real global search (the `TopHeader` search input is decorative).
- [ ] Insurance claim workflow — `Invoice.insuranceClaim` type exists but no UI.
- [x] Soft-delete (`deleted_at`) for invoices + appointments (2026-09-10). Patients
      still hard-delete — add `deleted_at` there too if it becomes a concern.
