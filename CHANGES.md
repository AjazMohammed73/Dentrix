# Changes — security hardening, seam fixes, clinical-suite APIs

This document records the bugs found and fixed, and the features added, across two
commits:

- **`ff17135`** — Security hardening round 2
- **`1032858`** — Clinical-suite APIs + hybrid seam fixes + a security/edge-case pass on
  the new endpoints

Every item below is verified by the end-to-end API test suite
(`scratchpad/e2e.py`, **239 assertions, all passing**) plus `tsc --noEmit` and
`npm run build` for the frontend.

---

## Part 1 — Security hardening round 2 (`ff17135`)

### 1.1 You could not revoke a login token before it expired

**What it was.** When a user signed in, the server gave the browser a JSON Web Token
(JWT) that stayed valid for its full lifetime (12 hours). If that token leaked, or if
an admin demoted / suspended a user, the old token kept working until it expired. The
only kill switch was deleting the user row.

**What the fix does.**

- Added a `token_version` integer column to the `users` table (starts at `1`).
- Both the access token and the refresh token now carry a `tv` claim holding that
  number.
- On every authenticated request (`get_current_user`) and on every token refresh
  (`POST /auth/refresh`), the server compares the token's `tv` against the user's
  current `token_version`. If they differ, the request is rejected with
  `401 "Session has been revoked"`.
- `token_version` is bumped (invalidating every outstanding token for that user) when:
  - their role, status, or permissions change (`PATCH /users/{id}`);
  - they are assigned or removed as a clinic's Doctor Admin
    (`POST /tenants/{id}/assign-doctor-admin` — bumps the new admin and any stepped-down
    old admins);
  - they use the new **`POST /auth/logout-all`** endpoint ("sign out of all devices"),
    which is CSRF-protected and writes a `SECURITY_LOGOUT` audit row.

**Effect.** A demoted, suspended, or permission-changed user is locked out on their
very next request. A user who suspects their session was stolen can invalidate every
device immediately.

### 1.2 Access tokens lived too long

**What it was.** A leaked access token was usable for 12 hours.

**What the fix does.** `config.access_token_expire_minutes` changed from `720` (12 h)
to `60` (1 h). The HttpOnly refresh cookie silently mints a fresh access token in the
background, so the user experience is unchanged.

**Effect.** The window in which a stolen access token is useful drops from 12 hours to
at most 1 hour (and to zero if the user is suspended or calls `logout-all`).

### 1.3 Login brute-force protection was single-layered

**What it was.** The login limiter only counted failures per email address. A scripted
attacker spreading attempts across many accounts from one machine was not slowed down.

**What the fix does.** Added a second layer: per client IP, 50 failed attempts per
5 minutes, on top of the existing per-email limit (10 per 5 minutes). Only failed
logins are counted, so a busy office behind one shared IP is never locked out by
normal use.

### 1.4 A compromised token could hammer the database

**What it was.** There was no ceiling on how many write requests a single authenticated
user could make. A stolen token could spam `POST /patients`, `/invoices`, etc.,
bloating one tenant's data and the shared database.

**What the fix does.** A new middleware in `app/main.py` counts state-changing requests
(`POST`, `PUT`, `PATCH`, `DELETE`, excluding `/auth/*`) per user id. Over
**240 per 60 seconds** returns `429 Too Many Requests` with a `Retry-After` header.
Requests with a missing or invalid token are ignored here and left to the endpoint's
own authentication.

### 1.5 Deleting an appointment or invoice destroyed the record

**What it was.** `DELETE /appointments/{id}` and `DELETE /invoices/{id}` ran a hard
SQL `DELETE`. A malicious or careless admin could permanently wipe billing and
scheduling history, and the linked auto-invoice / patient balance were left
inconsistent.

**What the fix does.** Both tables gained a `deleted_at` timestamp column
(soft delete).

- `DELETE` now sets `deleted_at` instead of removing the row.
- Every list query, the "get one" helper (`_get_owned`, which now returns `404` for a
  soft-deleted row), and the appointment scheduling-conflict check all filter
  `deleted_at IS NULL`.
- Deleting an appointment or invoice reverses the patient's account balance and
  soft-voids the linked unpaid invoice, so accounts receivable stays correct.

**Effect.** Deleted records disappear from the app but remain in the database for
recovery and audit. A bulk delete no longer loses data or corrupts balances.

### 1.6 The audit log was only "append-only" by convention

**What it was.** Nothing in the application code updated or deleted `audit_logs` rows,
but nothing stopped a database user from doing so either. The plan had been to run a
manual `REVOKE UPDATE, DELETE` at deploy time on a separate low-privilege role.

**What the fix does.** Migration `b1f2a3c4d5e6` installs a PostgreSQL trigger
(`dentrix_block_audit_mutation`) that fires `BEFORE UPDATE OR DELETE` on `audit_logs`
and raises `audit_logs is append-only`. `INSERT` is still allowed. The trigger works
regardless of which database role connects, so the manual deploy step is no longer
needed.

### 1.7 Continuous integration

Added `.github/workflows/ci.yml`: on every push and pull request it runs the frontend
type-check, production build, and `npm audit`, plus the backend security self-check,
an import check, and `pip-audit`.

---

## Part 2 — Hybrid seam fixes (`1032858`)

Background: a teammate's earlier merges (`a69d5aa`, `f6497d7`) layered a large
browser-only feature set (prescriptions, radiographs, periodontal charts, treatment
plans, operatory-chair configuration and ~14 modals) on top of the API-backed core.
Those features stored their data in the browser's `localStorage`. This left three
seams where the two halves did not meet cleanly.

### 2.1 Custom operatory chairs were rejected when booking

**What it was.** The backend restricted an appointment's `operatoryChair` field to
exactly three hard-coded names (`"Chair 1 - Hygiene"`, `"Chair 2 - Surgery"`,
`"Chair 3 - General"`). But the "Manage Chairs" screen lets a clinic name and add its
own chairs. Booking an appointment on any other chair failed with
`422 Unprocessable Entity`.

**What the fix does.** `schemas/common.py::OperatoryChair` is now a free-form string
of 1–40 characters instead of a fixed list. The scheduling-conflict check already
compares chair names as plain strings, so nothing else had to change.

### 2.2 The chair dropdown was empty for real accounts

**What it was.** The seed chair data was keyed to mock tenant identifiers. A real
tenant (identified by a UUID) matched none of them, so the booking screen's chair
dropdown showed no options. Booking still worked because the form fell back to a
default value, but the dropdown and the whole "Manage Chairs" feature looked broken.

**What the fix does.** `DataContext` now hands a brand-new clinic three standard
chairs bound to its real tenant id, until the clinic configures its own through the
API — at which point the real rows take over and the fallback stops appearing.

### 2.3 Insurance-claim edits were never saved

**What it was.** The "Claim Settlement" screen updated the claim only in React state.
There was no API call and no endpoint, so any claim edit was lost on page refresh.

**What the fix does.** Added `PATCH /invoices/{id}`, which updates only the
`insurance_claim` JSON blob (the column already existed on the `invoices` table). It
is gated on `canViewRevenue`, scoped to the caller's tenant, and writes an
`INVOICE_UPDATED` audit row. The frontend's `updateInvoiceInsuranceClaim` now calls
this endpoint and reloads the invoice list.

---

## Part 3 — Clinical-suite APIs (`1032858`)

Five feature areas that were browser-only are now real, server-backed, multi-tenant
APIs. Migration `c7d8e9f0a1b2_clinical_suite_tables` adds five tables. Nested
structures (prescription line items, periodontal `teeth`, treatment-plan `phases`) are
stored as JSONB; scalar fields that need filtering are stored as normal columns.

| Endpoint | List filter | Read permission | Write permission |
|---|---|---|---|
| `/prescriptions` | `?patient_id=` | `canManagePatients` | `canWriteDoctorNotes` |
| `/radiographs` | `?patient_id=` | `canManagePatients` | `canWriteDoctorNotes` |
| `/perio-charts` | `?patient_id=` | `canManagePatients` | `canWriteDoctorNotes` |
| `/treatment-plans` | `?patient_id=` | `canManagePatients` | `canManagePatients` |
| `/operatory-chairs` | — | any signed-in user | `canManageServices` |

Common rules for all five:

- Every row carries a `tenant_id`; reads are filtered to the caller's tenant
  (Super Admin sees all), and cross-tenant access to a specific row returns `404`.
- The Platform Super Admin cannot create these records — they belong to a clinic.
- Every create, update, and delete writes an audit row
  (`PRESCRIPTION_*`, `RADIOGRAPH_*`, `PERIO_CHART_*`, `TREATMENT_PLAN_*`, `CHAIR_*`).
- The per-user write-quota middleware from Part 1 automatically covers these new
  write endpoints.

**Frontend changes.** `DataContext` was rewired: the five feature lists now load from
the API on startup, and every mutation is an `async` API call followed by a reload,
matching how patients and invoices already worked. The obsolete mock-data file
(`src/data/mockData.ts`, ~1,200 lines) was deleted. "Restore from backup file" is now
a disabled no-op with an explanatory message, because bulk-importing clinical records
from a client-supplied file needs its own server endpoint; export still works.

**Radiograph images** are stored as a base64 data URL in a `TEXT` column, with a
~7.5 MB cap that matches the frontend's 5 MB file limit. This is a deliberate
shortcut for now; the code carries a note to move image storage to object storage
(S3 / Cloudflare R2) when volume grows.

---

## Part 4 — Security and edge-case pass on the new endpoints (`1032858`)

Four bugs were found and fixed while stress-testing the clinical-suite endpoints.

### 4.1 Radiograph uploads always failed with 413

**What it was.** A global middleware caps every request body at 1 MB. A real
radiograph image (the frontend allows up to 5 MB, which becomes roughly 6.7 MB once
base64-encoded into JSON) was rejected with `413 Payload Too Large` before it ever
reached the endpoint.

**What the fix does.** `BodySizeLimitMiddleware` now accepts a per-path override map.
`POST /radiographs` is allowed 8 MB; every other endpoint keeps the 1 MB limit.
Verified: a 2 MB image is accepted (`201`), a 9 MB image is rejected (`413`).

### 4.2 The subscription's chair limit was not enforced on the server

**What it was.** `POST /operatory-chairs` had no limit. The frontend checked the
plan's `chairLimit`, but that check is easy to bypass. A clinic could create an
unlimited number of chairs, ignoring its plan.

**What the fix does.** On create, and on any `PATCH` that reactivates a chair, the
server reads `tenant.subscription.chairLimit`, counts the tenant's active chairs, and
returns `409 Conflict` if the limit is reached. Inactive chairs do not count.

### 4.3 A `PATCH` with an explicit `null` could crash with a 500

**What it was.** Sending, for example, `PATCH /radiographs/{id}` with
`{"toothNumbers": null}` or `{"title": null}` set a database column that is declared
`NOT NULL` to `null`, causing an `IntegrityError` and a `500` response.

**What the fix does.** All four update endpoints (`radiographs`, `perio-charts`,
`treatment-plans`, `operatory-chairs`) now skip `null` values when applying a partial
update. Fields that are genuinely nullable (a chair's `roomNumber` and `color`) can
still be cleared.

### 4.4 The periodontal `teeth` object was unbounded

**What it was.** `PerioChartCreate.teeth` was an unvalidated dictionary. A client
could submit an arbitrarily large object (subject only to the 1 MB body cap).

**What the fix does.** A validator caps it at 52 keys — the maximum realistic number
of teeth (32 permanent plus 20 primary). Over that returns `422`.

### Checked and already correct (attacked, held)

- **Cross-tenant access (IDOR):** every "get one" helper and every "create for this
  patient" check returns `404` for another tenant's data.
- **Mass assignment:** the update request models physically cannot carry `tenant_id`,
  `patient_id`, or `id`, so a client cannot move a record to another tenant or patient.
  Verified by sending those fields in a `PATCH` body and confirming they are ignored.
- **Payload limits:** prescription items ≤ 50, treatment-plan phases ≤ 12, money
  fields ≤ ₹10 crore, tooth numbers 1–32, and length limits on every free-text field.
- **Authentication:** a missing bearer token returns `401` (not `403`), which is what
  the frontend's silent session-recovery listens for; a malformed UUID in the path
  returns `422`; a non-existent record returns `404`.

---

## Status — answers to the open questions

**Is the work done?** Yes, for everything that is code. The backend is feature-complete
for version 1 (core practice management + billing + the full clinical suite), the
frontend runs entirely on that API with no mock data or browser-only storage for
shared records, and all 239 end-to-end assertions pass.

**Are there more bugs right now?** None known. Every bug found during the security and
edge-case passes in this work has been fixed and has a regression test. The test suite
covers all endpoints across all three roles, cross-tenant isolation, injection
attempts, oversized payloads, JWT forgery, CSRF, and the rate limits.

**Is security updated?** Yes. In summary:

- Instant token revocation (`token_version`), 1-hour access tokens, "log out
  everywhere".
- Two-layer login rate limiting (per email and per IP), timing-equalized password
  checks, generic error messages.
- Per-user write quota against a compromised token.
- Soft delete for appointments and invoices; database-enforced immutable audit log.
- Tenant isolation and role/permission checks on every endpoint, including all five
  new clinical-suite endpoints.
- Strict Content-Security-Policy on the built frontend, request body size limits
  (with a documented per-path exception for radiograph images), and length/range
  limits on all input.

**What is left?** Only deployment and infrastructure tasks, which are not code:

- Rotate the Neon database password (it was pasted into a chat earlier).
- Set `ENV=production` and clear `BOOTSTRAP_SUPERADMIN_PASSWORD` from the Render
  environment after first boot.
- Put the real Render API URL into `vercel.json` (replace the `<YOUR-RENDER-API>`
  placeholder).
- Product decisions for later: multi-factor authentication, self-service password
  reset (needs an email provider), automated database backups, and a web application
  firewall / Cloudflare in front for cross-account brute-force protection.
- Move radiograph image storage from the database to object storage when volume grows.
