# Nail Up

Premium nail extension and nail art studio website and business-management platform for **Nail Up**, a studio based in Brampton, Ontario, Canada.

> **Brand tagline:** Nails, but make them art.
> **Homepage headline:** Your nails. Your canvas.

This is a greenfield, spec-driven full-stack application built with Kiro's Spec-Driven Development methodology.

---

## Status

🟢 **Foundation implemented.** The public website shell, the ten public routes, the Editorial Beauty Experience design tokens, the error and 404 pages, and the unit-test setup are in place. The homepage shows confirmed brand copy; the other nine public pages are clearly marked "coming soon" placeholders.

Not built yet (each arrives in its own feature spec): page content beyond the homepage, appointment booking, the Supabase database, the admin dashboard, and artwork uploads. See `docs/ROADMAP.md`, `.kiro/steering/` and `docs/ASSUMPTIONS.md`.

---

## Tech stack (planned)

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router) + React + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | Lucide React |
| Animation | Motion for React |
| Database | Supabase PostgreSQL (with Row Level Security) |
| Storage | Supabase Storage |
| Auth | Supabase Auth (`@supabase/ssr`) |
| Validation | Zod + React Hook Form |
| Email | Resend |
| Testing | Vitest (unit) + Playwright (e2e) |
| Hosting | Vercel + GitHub |

Exact dependency versions are pinned at install time against the latest stable releases.

**Installed so far (Foundation):** Next.js 16.4.6, React 19.3.0, TypeScript 5.9.3 (strict), Tailwind CSS 4.3.5, ESLint 9.39.5, and Vitest 4.1.12 with React Testing Library and jsdom. The other entries above (shadcn/ui, Lucide, Motion, Supabase, Zod, React Hook Form, Resend, Playwright) are planned for later specs and are not installed yet.

---

## Project pages

**Public:** `/` `/services` `/lookbook` `/love-notes` `/your-art` `/about` `/book` `/contact` `/privacy` `/terms`

All ten public routes exist. `/` shows the brand landing; the others show a "coming soon" placeholder. Unknown URLs return a 404 page.

**Admin (protected, planned):** `/admin/login` `/admin` `/admin/appointments` `/admin/services` `/admin/lookbook` `/admin/testimonials` `/admin/artworks` `/admin/availability` `/admin/settings`

The admin routes are not implemented yet. Their place in the architecture is reserved (see [Layout boundaries](#layout-boundaries)).

---

## Prerequisites

| Tool | Version | Notes |
| --- | --- | --- |
| Node.js | **22.22.2 or later on 22.x, 24.15 or later on 24.x, or 26 or later** (tested with 24.22.2) | The strictest requirement comes from `jsdom`, used by the tests (its range is `^22.22.2 \|\| ^24.15.0 \|\| >=26.0.0`). **Node.js 25 is not supported** by the current `jsdom` requirements. Next.js itself needs 20.9 or later. |
| npm | Tested with 11.19.1 | The project uses `package-lock.json`, so use npm (not Yarn or pnpm). |
| Git | Any recent version | |

---

## Getting started

```bash
git clone https://github.com/sunny0625/nail-up.git
cd nail-up
npm ci                         # installs the exact versions in package-lock.json
cp .env.example .env.local     # Windows PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Then open <http://localhost:3000>.

**Environment variables.** `.env.example` lists the placeholder keys the project will need (Supabase, Resend, site URL). The Foundation does not read any of them yet, so `.env.local` can stay empty for now. Never commit `.env.local` or real values: it is git-ignored. Only variables prefixed with `NEXT_PUBLIC_` reach the browser; server-only keys such as `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` must never be used in a Client Component.

---

## Commands

| Command | Runs | What it does |
| --- | --- | --- |
| `npm run dev` | `next dev` | Starts the development server at <http://localhost:3000>. |
| `npm run build` | `next build` | Creates the production build. It does **not** lint (see `lint`). |
| `npm run start` | `next start` | Serves the production build. Run `npm run build` first. |
| `npm run lint` | `eslint .` | Lints the whole project. Run it as a separate step: Next.js 16 removed `next lint`, and `next build` no longer lints. |
| `npm run typecheck` | `next typegen && tsc --noEmit` | Generates Next.js route types (such as `LayoutProps`), then type-checks in strict mode. Works on a fresh checkout, before any build. |
| `npm test` | `vitest --run` | Runs the unit tests in `tests/` once and exits (no watch mode). |

Before committing, all four checks must pass: `npm run typecheck`, `npm run lint`, `npm test` and `npm run build`.

When the tests run, Vite prints a warning that `vitest.config.ts` uses ES-module syntax in a file loaded as CommonJS. It is a warning, not a test failure: the current test suite runs and passes. Vite adds that its native config loader, which does not support this setup, is planned to become the default in a future major version, so the configuration may need updating before a future major Vite upgrade.

On Windows, keep the project in a normal long path. In the tested Windows environment, running the tests from a folder path that contains an 8.3 short name (for example `C:\Users\ABCDEF~1\...`, which `%TEMP%` can resolve to) made `npm test` fail with `Cannot find module '/tests/setup.ts'`. The same project passed from its normal long path, so this does not affect the standard setup. If you see this error, move the project out of the 8.3 short-path location.

---

## Conventions

- **Language:** English (Canadian spelling) in all user-facing copy.
- **Server Components by default.** Add `"use client"` only for genuine interactivity. Today only four files are Client Components: `components/layout/mobile-nav.tsx`, `components/layout/nav-link.tsx`, `app/error.tsx` and `app/(public)/error.tsx`.
- **Naming:**
  - File names are kebab-case, for example `page-container.tsx`.
  - Components and types are PascalCase, for example `PageContainer`, `BusinessConfig`.
  - Functions and variables are camelCase, for example `placeholderMetadata`.
  - Route folders are lowercase kebab-case and match the URL, for example `app/(public)/love-notes/`.
- **No magic values.** Colours, spacing, typography, radii, borders, shadows, motion and breakpoints come from the design tokens in the `@theme` block of `app/globals.css`, used through Tailwind utilities or `var(--token)`. Only structural values such as `0`, `100%` and a basic `1px` border may be written literally.
- **Business facts and copy** come only from `lib/config/business.ts`. Never invent unconfirmed facts such as the address, opening hours, prices, the artist's biography or reviews.
- **Dependencies** are pinned to exact versions (no `^` or `~`).

---

## Architecture

### Project directories

These directories exist in the repository today.

| Directory | Responsibility |
| --- | --- |
| `app/` | App Router routes and layouts: the root layout (`layout.tsx`), the global stylesheet and design tokens (`globals.css`), self-hosted fonts (`fonts/`), the root error boundary (`error.tsx`), the 404 page (`not-found.tsx`), and the `(public)/` route group with the ten public pages, their layout and their error boundary. |
| `components/` | Reusable UI. `components/layout/` holds the shell components (announcement bar, header, navigation, mobile menu, footer, wordmark, booking button, social links) and shared page pieces (page container, placeholder page, error message). |
| `lib/` | Non-UI logic. `lib/config/` holds the typed business configuration (`business.ts`) and the page-metadata helper. |
| `types/` | Shared TypeScript type definitions, with no runtime code. |
| `tests/` | The single location for Vitest unit tests, plus the test setup file (`setup.ts`). |
| `docs/` | Project documents: assumptions and unconfirmed facts, the roadmap, and the image manifest (which sets the descriptive alt-text pattern for images). |
| `.kiro/` | Kiro project files: feature specs in `.kiro/specs/` and project guidance in `.kiro/steering/`. |
| `public/` | Static files served as-is. It is currently empty and not tracked by Git, so a fresh clone does not contain it; it is created when the first asset is added. |

### Reserved directories (not created yet)

These are planned locations. Each is created only when its first real file is added, so the repository has no empty placeholder folders.

| Directory | Intended responsibility |
| --- | --- |
| `components/ui/` | shadcn/ui primitives. |
| `lib/data-access/` | Server-side data access (Supabase). |
| `lib/validation/` | Zod validation schemas. |
| `lib/services/` | Server-side business logic, such as booking rules. |
| `lib/utils/` | Small shared helpers. |
| `public/images/` | Images, in the `hero/`, `services/`, `lookbook/`, `artist/`, `clients/` and `branding/` subfolders listed in `docs/IMAGE_MANIFEST.md`. |
| `app/admin/` | The protected admin area (see below). |

### Generated, tooling and local directories

These are not application source code.

| Directory | Responsibility |
| --- | --- |
| `node_modules/` | Installed dependencies. Created by `npm ci` or `npm install`; git-ignored. |
| `.next/` | Next.js build output and generated types. Created by `dev`, `build` and `typecheck`; git-ignored. |
| `.git/` | Git version history. |
| `others/` | Internal working notes, kept locally only; git-ignored. |

The root also holds configuration files (`package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `vitest.config.ts`, `.env.example`, `.gitignore`) and `AGENTS.md`, which carries Next.js guidance for AI coding agents and is re-added by `next dev`.

### Layout boundaries

- **Root layout (`app/layout.tsx`)** wraps every route. It renders only `<html>` and `<body>`, loads the fonts and `globals.css`, and sets the base metadata. It deliberately contains **no** shell (no announcement bar, navigation or footer), so it can also serve the future admin area.
- **Public layout (`app/(public)/layout.tsx`)** adds the public shell in this order: announcement bar, header (with the single navigation landmark), one `<main>`, footer. It applies only to routes inside the `(public)` route group. The group name adds no URL segment, so `app/(public)/services/` is served at `/services`. Pages inside it must not render their own `<main>`.
- **Admin boundary (reserved).** The future admin area will live **outside** the `(public)` group, in `app/admin/` with its own `app/admin/layout.tsx`. It will inherit only the root layout, so the public announcement bar, navigation and footer never appear in the admin dashboard. Nothing in `app/admin/` exists yet.
- **Errors and 404.** `app/(public)/error.tsx` handles errors in public pages and keeps the shell in place. `app/error.tsx` is the fallback for other segments, including errors in the public layout itself. `app/not-found.tsx` is a deliberately slim 404 page (the wordmark and a link home), because Next.js includes the root not-found page in every route's payload.

---

## Spec-driven workflow

Feature specs live under `.kiro/specs/`. Each feature has `requirements.md`, `design.md`, and `tasks.md`, reviewed before implementation. See the roadmap in `docs/ROADMAP.md`.

## Important notes

- Official business facts (name, contact, Instagram) are the single source of truth. See `.kiro/steering/product.md`.
- Missing business info (address, hours, prices, bio, reviews) is **not invented** — it is configurable and flagged as awaiting confirmation. See `docs/ASSUMPTIONS.md`.
- The `others/` folder holds internal working notes and is git-ignored.
