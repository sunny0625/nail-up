---
inclusion: fileMatch
fileMatchPattern: ['**/*.tsx', '**/*.css', 'tailwind.config.*', '**/components/**']
---

# NAIL UP — EDITORIAL BEAUTY EXPERIENCE (Design System)

An original visual identity. Luxury fashion editorial meets premium beauty campaign. Not a generic
salon template or SaaS design.

## Colour palette (names → design tokens, finalise hex at implementation)

- Warm ivory, Milky cream (backgrounds / canvas)
- Dusty rose, Muted blush (accents)
- Deep espresso (primary text / dark surfaces)
- Soft plum (secondary accent)
- Champagne, Subtle chrome / silver (highlights, metallics)

Expose these as CSS variables / Tailwind theme tokens so they are consistent and themeable.

## Typography

- **Headlines:** elegant, high-contrast serif.
- **Body:** contemporary sans-serif.
- **Labels:** refined uppercase editorial labels (letter-spaced).

## Composition

Asymmetric layouts, large photography, generous whitespace, editorial image grids, carefully
layered content, organic image crops, restrained borders, premium buttons, smooth hover states.

## Avoid

Generic pink gradients · childish elements · excessive rounded cards · repetitive layouts · generic
SaaS look · excessive glassmorphism · distracting animations · stock-photo-heavy appearance.

## Animation (Motion for React, selective)

Hero entrance · staggered text reveal · scroll-triggered images · gallery hover · lightbox
transitions · mobile menu · smooth button interactions · booking progress · subtle section reveals.
**Always respect `prefers-reduced-motion`.** Never delay interaction or harm mobile scrolling.

## Responsive breakpoints (must all be designed for)

375 · 390 · 430 · 768 · 1024 · 1280 · 1440 · 1920 px. Mobile-first — a large share of visitors
arrive from Instagram.

## Accessibility (WCAG 2.2 AA where feasible)

Keyboard navigation · visible focus · screen-reader-friendly semantics · accessible forms &
dialogs · sufficient contrast · reduced motion support · descriptive alt text on all images.

## Images

Use `next/image`. Prioritise hero loading, lazy-load the rest, prevent cumulative layout shift.
Use replaceable placeholders until real Nail Up photography is available. Never copy images from
reference sites. See `docs/IMAGE_MANIFEST.md`.
