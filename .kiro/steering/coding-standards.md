---
inclusion: always
---

# Nail Up — Coding Standards

## Per-task workflow

1. Inspect the existing codebase and read the relevant spec + steering files.
2. Respect the existing architecture; implement **only** the task's scope.
3. Reuse components and utilities; avoid duplication and unnecessary refactoring.
4. Provide complete, working code — no stubs or fake functionality in production paths.
5. Run relevant checks (typecheck, lint, unit/e2e as applicable). Fix failures before marking done.
6. Update docs if the change alters an interface or configuration.

## Conventions

- TypeScript strict mode; no `any` unless justified with a comment.
- Zod schemas are the single source of truth for input shapes; infer TS types from them.
- Server Components by default; add `"use client"` only when interactivity requires it.
- Co-locate component styles with Tailwind; share tokens from the design system, no magic values.
- Name things clearly; prefer small, focused modules.
- Handle errors explicitly: validation errors, DB errors, upload failures, email failures — each with a clear user-facing state.
- English (Canadian spelling) in all user-facing copy.

## Must not

- Invent missing business facts (prices, hours, address, bio, reviews).
- Silently change the stack or skip migrations.
- Expose secrets or privileged credentials to the client.
- Mark a task complete if required tests have not passed.

## Git

Use Git from the start. Meaningful commits after verified milestones
(e.g. `feat: build Nail Up homepage`, `feat: integrate Supabase`). Keep spec files under version
control. Never overwrite unrelated files without inspecting them.
