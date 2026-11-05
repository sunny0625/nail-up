---
inclusion: always
---

# Nail Up — Technology & Architecture

## Stack

- **Framework:** Next.js (App Router), React, TypeScript (strict).
- **Styling:** Tailwind CSS, shadcn/ui where appropriate, Lucide React for icons.
- **Animation:** Motion for React (selective), CSS transitions for simple effects, native browser APIs where appropriate.
- **Backend:** Next.js Server Components (default), Route Handlers, Server Actions only where appropriate. Business logic kept in well-separated server-side modules.
- **Database / services:** Supabase PostgreSQL, Supabase Storage, Supabase Auth via `@supabase/ssr` (auth-helpers is deprecated — do not use it).
- **Validation / forms:** Zod (source of truth for schemas), React Hook Form where useful.
- **Email:** Resend.
- **Testing:** Vitest (unit), Playwright (e2e).
- **Deploy:** Vercel + GitHub.

## Version policy

Pin exact dependency versions at install time against the **latest stable** release; verify with
official docs before installing. As of project start, Next.js 16.x (App Router) and `@supabase/ssr`
are current. Do not use deprecated APIs or add unnecessary packages.

## Architecture principles

- **Server Components by default.** Use Client Components only for genuine interactivity (forms, lightbox, menus, booking wizard).
- Keep client JavaScript lean. Avoid unnecessary dependencies.
- Separate concerns: UI components, server data access, validation schemas (Zod), and business rules live in distinct modules.
- Reuse components; do not duplicate logic.
- Privileged operations (service-role key, admin mutations) run **only** server-side. Never expose privileged credentials to the client.
- Use `NEXT_PUBLIC_` prefix only for genuinely public values (anon key, public URLs).

## Suggested project layout

```
app/                     # App Router routes (public + /admin)
  (public)/              # public marketing + booking pages
  admin/                 # protected admin dashboard
  api/                   # Route Handlers
components/              # reusable UI (ui/ for shadcn primitives)
lib/
  supabase/              # server/client/admin client factories (@supabase/ssr)
  validation/            # Zod schemas
  services/              # server-side business logic (booking rules, etc.)
  email/                 # Resend wrappers
supabase/
  migrations/            # SQL migrations (documented)
public/images/           # hero, services, lookbook, artist, clients, branding
.kiro/specs/             # feature specs
docs/                    # assumptions, roadmap, image manifest
```

## Environment variables (placeholders only — never commit real values)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-only, never exposed to client
RESEND_API_KEY=                   # server-only
EMAIL_FROM=
EMAIL_BUSINESS_NOTIFICATION=      # where booking/contact notices go
NEXT_PUBLIC_SITE_URL=
```

## Rules

- Do not silently change the stack. Propose and explain any deviation first.
- Do not skip migrations. Every schema change is a documented SQL migration.
- Do not leave fake functionality in production code.
- Run relevant checks (typecheck, lint, tests) before marking a task complete.
