# Nail Up — Implementation Roadmap

Spec-driven development with Kiro. We build feature by feature; each feature gets its own spec
(`requirements.md` → `design.md` → `tasks.md`) under `.kiro/specs/`, reviewed before implementation.
No single massive spec for the whole app.

## Build order

1. **Workspace & steering setup** — ✅ done (steering files, assumptions, roadmap, .gitignore, README).
2. **Project foundation & design system** — scaffold Next.js app, Tailwind, design tokens, base layout/nav/footer, env setup. _(next recommended spec)_
3. **Homepage & global experience** — editorial homepage + global navigation/announcement bar/footer.
4. **Public marketing pages** — Services, Lookbook, Love Notes, About, Contact, Privacy, Terms (static/placeholder-driven first).
5. **Supabase foundation** — database schema, migrations, RLS policies, storage buckets, client factories.
6. **Services, Lookbook & testimonials integration** — wire pages to Supabase data.
7. **Protected admin dashboard & CMS** — auth, overview, and management sections.
8. **Client artwork upload & moderation** — Your Art submission + admin moderation.
9. **Appointment booking** — in-house booking flow with server/DB conflict protection.
10. **Contact forms & notifications** — contact form + Resend emails (customer receipt + business notice).
11. **SEO & local discoverability** — metadata, OG, sitemap, robots, structured data (only with real facts).
12. **Accessibility & responsive QA** — WCAG 2.2 AA pass, breakpoint audit.
13. **Security & performance audit** — review auth, RLS, uploads, rate limiting, secrets, performance.
14. **Production deployment** — Vercel + GitHub release.

## Spec folders (to be created via the Kiro Spec workflow, one at a time)

```
.kiro/specs/
  01-project-foundation/
  02-homepage-and-global-experience/
  03-services-and-lookbook/
  04-supabase-foundation/
  05-admin-cms/
  06-client-artwork/
  07-appointment-booking/
  08-contact-and-notifications/
  09-seo-accessibility-and-performance/
  10-production-release/
```

## Next recommended step

Create the first **standard, Requirements-First Feature Spec**: **`01-project-foundation`**. It should
cover scaffolding the Next.js App Router project, TypeScript, Tailwind + design tokens from the
design system, shadcn/ui setup, base layout (global nav, announcement bar, footer shell), env/config
plumbing, and the initial Git commit — without implementing page content or any backend yet.
