---
inclusion: fileMatch
fileMatchPattern: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', 'tests/**', 'e2e/**', 'playwright.config.*', 'vitest.config.*']
---

# Nail Up — Testing Strategy

## Tools

- **Unit / integration:** Vitest.
- **End-to-end (browser):** Playwright.

## What to test

- **Unit:** Zod validation schemas, booking rules (duration, buffers, overlap, blocked dates, pending-hold expiry), filename generation & upload validation, pure business logic.
- **Integration:** Route Handlers / Server Actions with mocked or test Supabase (auth, RLS behaviour, conflict handling).
- **E2E (Playwright):** booking flow end-to-end, artwork submission (upload → pending), contact form, lookbook filtering + lightbox + keyboard navigation, admin login + a representative moderation/confirmation action.

## Rules

- Write tests when adding a feature or fixing a bug. Do not add tests the task did not ask for beyond this.
- Prefer `--run` (single execution) over watch mode in CI and when invoked by the agent.
- A task is **not** complete until its required tests pass.
- Keep tests deterministic; avoid real network/email — mock Resend and external calls.

## Accessibility & responsive QA

Verify keyboard navigation, visible focus, reduced-motion behaviour, and layouts at
375/390/430/768/1024/1280/1440/1920 px as part of the relevant feature's QA tasks.
