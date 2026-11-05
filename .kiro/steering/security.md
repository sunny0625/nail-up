---
inclusion: always
---

# Nail Up — Security

Security is reviewed as part of every feature, scaled to its real attack surface.

## Core rules

- **Never expose privileged credentials** (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) to the client. Server-only.
- Enforce authorisation **server-side AND via Supabase Row Level Security (RLS)** — never trust the client.
- Public users get **read-only** access to appropriate **published** content only. No public writes to privileged tables.
- No public admin-signup route. Document a secure process to establish the initial admin.

## Protect against

XSS · SQL injection · unauthorised data access · malicious uploads · file-type spoofing · oversized
uploads · IDOR · spam · privilege escalation · exposed credentials.

## Area-specific requirements

- **Auth/authz:** Supabase Auth via `@supabase/ssr`; verify role on the server for every admin action and in RLS policies.
- **Uploads (Your Art):** validate type (JPEG/PNG/WebP) and size (≤ 8 MB) **on the server**, verify real content type (not just extension/MIME header), generate unique safe filenames, store private & `pending` by default, never auto-publish.
- **Booking:** validate on server and DB; enforce conflict prevention transactionally at the DB level; handle concurrent submissions safely; a booking is never "confirmed" until an admin approves it.
- **Forms (contact, booking, artwork):** Zod validation server-side; basic spam protection (e.g. honeypot + rate limiting); sanitise anything rendered.
- **API routes / Server Actions:** authenticate & authorise; validate all input; rate-limit sensitive endpoints.
- **Secrets:** environment variables only, placeholders in the repo, real values never committed.

## Data protection

Protect private client info (names, phone, email, notes, submissions). Define sensible retention and
deletion behaviour. Use secure server-side access for privileged operations.
