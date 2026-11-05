---
inclusion: always
---

# Nail Up — Product & Business Facts

Nail Up is a premium nail extension and nail art studio in Brampton, Ontario, Canada. We are
building its public website and a private business-management platform (booking, CMS, admin).

## Brand vision

A premium digital nail atelier that communicates creativity, feminine confidence, modern luxury,
high-quality artistry, personal expression, professionalism, client trust, and an enjoyable booking
experience. The feel: luxury fashion editorial × premium beauty campaign × contemporary
independent nail studio. **Not** a generic salon template.

## Official business facts — single source of truth

These values are final. Never substitute a different name, number, email, location, or Instagram.

| Property | Value |
| --- | --- |
| Business name | Nail Up |
| Business type | Nail Extension Artist & Nail Art Studio |
| Location | Brampton, Ontario, Canada |
| WhatsApp | +1-6473347600 |
| WhatsApp URL | https://wa.me/16473347600 |
| Instagram | https://www.instagram.com/nailup_/ (clean URL, no tracking params) |
| Business email | prabhvirdi3011@gmail.com |
| Booking route | /book |
| Currency | CAD |
| Timezone | America/Toronto |
| Language | English (Canadian spelling) |

## Brand copy

- Tagline: **Nails, but make them art.**
- Homepage headline: **Your nails. Your canvas.**
- Supporting statement: **Luxury nail extensions and custom nail artistry, designed around your style.**
- Default announcement bar: **Brampton, your next nail obsession starts here. ✦ Book your set.**
- Primary CTA: **BOOK YOUR SET**
- Secondary CTA: **EXPLORE THE LOOKBOOK**
- Community CTA: **SHARE YOUR NAIL INSPIRATION**
- Your Art heading: **Your Idea. Our Canvas.**
- Your Art supporting text: **Found a nail design you love? Share it with Nail Up and let's make your next set personal.**

## Do NOT invent

The following are **unknown** until the business confirms them. Never fabricate them. Make them
configurable (via the `settings` table / env) and clearly flag as "awaiting business confirmation":

- Street address, map location
- Opening hours / availability
- Service prices and durations
- Artist name, biography, qualifications, awards, experience
- Genuine customer reviews / testimonials / ratings

Demonstration content must be clearly labelled as such. See `docs/ASSUMPTIONS.md`.

## Pages

**Public (no login):** `/` `/services` `/lookbook` `/love-notes` `/your-art` `/about` `/book`
`/contact` `/privacy` `/terms`

**Admin (protected):** `/admin/login` `/admin` `/admin/appointments` `/admin/services`
`/admin/lookbook` `/admin/testimonials` `/admin/artworks` `/admin/availability` `/admin/settings`

The public site is fully usable without registration. Only authenticated, authorised admins reach
protected business-management functions. There is **no public admin-signup route**.
