# Nail Up — Assumptions & Unknown Business Information

This document records technical assumptions and the business facts that are **not yet known**. Per
project rules, unknown facts are never invented — they are configurable (via the `settings` table or
environment) and clearly flagged in the UI as **"awaiting business confirmation."**

## Awaiting business confirmation (do NOT invent)

| Item | Needed for | Status |
| --- | --- | --- |
| Street address | Contact page, SEO LocalBusiness schema, map | ❓ Unknown — no map until provided |
| Opening hours | Booking availability, Contact, SEO | ❓ Unknown — booking shows request/contact fallback until set |
| Service prices (CAD) | Services page, Booking | ❓ Unknown — admin-editable, placeholders only |
| Service durations | Services, Booking slot math | ❓ Unknown — admin-editable |
| Appointment buffer times | Booking conflict rules | ❓ Unknown — admin-configurable, sensible default documented |
| Pending-hold duration | How long a pending booking reserves a slot | ❓ To be decided & documented in booking spec |
| Artist name / bio / qualifications / awards | About page | ❓ Unknown — editable placeholders, never fabricated |
| Genuine testimonials & ratings | Love Notes | ❓ Unknown — demo content clearly labelled, real ones admin-published |
| Real photography (hero, services, lookbook, artist, clients) | All visual pages | ❓ Unknown — replaceable placeholders, never copied from reference sites |
| Blocked dates / holidays | Booking availability | ❓ Unknown — admin-configurable |

## Confirmed business facts

See `.kiro/steering/product.md` (name, type, location=Brampton ON, WhatsApp +1-6473347600,
Instagram https://www.instagram.com/nailup_/, email prabhvirdi3011@gmail.com, CAD, America/Toronto,
English Canadian spelling, and all brand copy).

## Technical assumptions

- **Stack:** Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + Supabase + Resend + Vercel, per `.kiro/steering/tech.md`. Exact versions pinned at install time against latest stable.
- **Booking is in-house** (no external booking service as default), with server + DB-level conflict protection.
- **Until hours/availability are configured**, the booking flow presents an appointment-**request** / contact-the-studio fallback rather than fake available times.
- **Bookings are never auto-confirmed**; an admin must approve. Statuses: pending, confirmed, completed, cancelled, no_show.
- **Artwork submissions** default to private + pending; never auto-published; two content fields only (client name, image); JPEG/PNG/WebP; ≤ 8 MB; validated server-side.
- **Initial admin** is created through a documented secure process (seed/CLI/Supabase dashboard), never a public signup route.

## Reference sites

Studied for inspiration only (service presentation, photography, navigation, galleries, booking UX,
responsiveness, CTAs): nailashes.in, naildit.in, and Bodycraft nail care. Nail Up's identity, code,
structure, copy, and images are entirely original. If a reference is inaccessible, note it and
continue with the rest.
