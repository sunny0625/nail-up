# Nail Up

Premium nail extension and nail art studio website and business-management platform for **Nail Up**, a studio based in Brampton, Ontario, Canada.

> **Brand tagline:** Nails, but make them art.
> **Homepage headline:** Your nails. Your canvas.

This is a greenfield, spec-driven full-stack application built with Kiro's Spec-Driven Development methodology.

---

## Status

🟡 **Foundation & steering setup.** No feature code has been implemented yet. The project architecture, business rules, assumptions, and roadmap are being established first. See `.kiro/steering/` and `docs/ASSUMPTIONS.md`.

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

---

## Project pages

**Public:** `/` `/services` `/lookbook` `/love-notes` `/your-art` `/about` `/book` `/contact` `/privacy` `/terms`

**Admin (protected):** `/admin/login` `/admin` `/admin/appointments` `/admin/services` `/admin/lookbook` `/admin/testimonials` `/admin/artworks` `/admin/availability` `/admin/settings`

---

## Getting started

> ⚠️ Not runnable yet — the Next.js application has not been scaffolded. These commands will apply once the project foundation spec is implemented.

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

---

## Spec-driven workflow

Feature specs live under `.kiro/specs/`. Each feature has `requirements.md`, `design.md`, and `tasks.md`, reviewed before implementation. See the roadmap in `docs/ROADMAP.md`.

## Important notes

- Official business facts (name, contact, Instagram) are the single source of truth. See `.kiro/steering/product.md`.
- Missing business info (address, hours, prices, bio, reviews) is **not invented** — it is configurable and flagged as awaiting confirmation. See `docs/ASSUMPTIONS.md`.
- The `others/` folder holds internal working notes and is git-ignored.
