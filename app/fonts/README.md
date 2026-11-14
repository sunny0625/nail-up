# Self-hosted fonts

Loaded in `app/layout.tsx` with `next/font/local`. Nothing is requested from
Google Fonts or any other third party at build time or in the browser.

| File | Role | CSS variable | Weight range | Licence |
| --- | --- | --- | --- | --- |
| `bodoni-moda-latin-wght-normal.woff2` | Headline serif | `--font-headline` | 400 to 900 | SIL OFL 1.1 (`OFL-bodoni-moda.txt`) |
| `dm-sans-latin-wght-normal.woff2` | Body sans-serif | `--font-body` | 100 to 1000 | SIL OFL 1.1 (`OFL-dm-sans.txt`) |

Source: `@fontsource-variable/bodoni-moda@5.3.0` and `@fontsource-variable/dm-sans@5.3.0`
on npm (latin subset, variable weight axis, upright style only). The files were
copied out of the packages and are not an npm dependency of this project.

SHA-256:

- `bodoni-moda-latin-wght-normal.woff2`: `192AE876C21D9258D096A526DAD5BDDF37F0DAA69CFE943CAE5F6BE5A52ADDA2`
- `dm-sans-latin-wght-normal.woff2`: `9FEA608A947E67020C33CAD9A6FE3D60C54119DFB8CFF87768A8117A15ED7543`

The SIL OFL requires the licence text to accompany the font files, so keep the
`OFL-*.txt` files next to them.

To change a font, replace the file, update the `src` and `weight` in
`app/layout.tsx`, and update this table. The token names `--font-headline` and
`--font-body` (consumed by `--font-serif` and `--font-sans` in `app/globals.css`)
must not change.

Glyph coverage is the latin subset. Characters outside it, such as the decorative
`✦` in the announcement bar, render from a system fallback font.
