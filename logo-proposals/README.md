# Logo / favicon proposals

The site currently ships Astro's default favicon (`public/favicon.svg`). This folder
collects four original proposals, drawn as SVG on a `128×128` grid (same as the current
file) and colored from the site's design tokens in `src/styles/theme.css`:

| Token               | Light    | Dark     |
| :------------------ | :------- | :------- |
| `--accent`          | `#006cac` | `#ff6b01` |
| `--foreground`      | `#282728` | `#eaedf3` |
| `--background`      | `#fdfdfd` | `#212737` |

All four adapt to `prefers-color-scheme`, matching the site's light/dark mode.

## Proposals

### 1. `badge-k.svg` — Badge K

![badge-k](badge-k.svg)

A geometric white **K** on a rounded-square badge filled with the accent color
(blue in light mode, orange in dark). The solid badge means the mark stays legible
on any tab-bar background, and the K is the strongest shape at 16 px.

### 2. `terminal.svg` — Terminal prompt

![terminal](terminal.svg)

A `>_` prompt on a fixed dark badge (`#212737`), with the glyph in the accent color.
Speaks to the developer-blog identity; reads well from 32 px up, slightly soft at 16 px.

### 3. `open-book.svg` — Pages

![open-book](open-book.svg)

An open-book glyph in the adaptive foreground color (near-black / near-white) on a
transparent background, echoing the "pages 📄" tagline. Monochrome like the current
Astro favicon, so it disappears on a mismatched tab background if the browser does
not report `prefers-color-scheme`.

### 4. `mono-k.svg` — Mono K.

![mono-k](mono-k.svg)

A transparent-background **K** with an accent-colored period ("K."), in the adaptive
foreground color. Minimal, matches the current favicon's monochrome style, and — like
`badge-k` — survives 16 px well.

## Iterations on `mono-k` (round 2)

Five refinements of proposal 4 — still transparent background, adaptive monochrome K
plus one accent element:

### R1. `iterations/mono-k-round.svg` — Round K.

![mono-k-round](iterations/mono-k-round.svg)

Rounded-cap K with a baseline accent dot, respaced so the dot no longer touches the
lower arm (the main flaw of v1). Balanced proportions; clear from 16 px up.

### R2. `iterations/mono-k-angular.svg` — Angular K.

![mono-k-angular](iterations/mono-k-angular.svg)

Butt caps + miter joins, with a square accent block aligned to the baseline. Sharp,
geometric, editorial; the most legible of the set at 16 px.

### R3. `iterations/mono-k-ring.svg` — K in a ring.

![mono-k-ring](iterations/mono-k-ring.svg)

K and dot enclosed in a thin adaptive ring. Elegant at 32 px and up; weakest at 16 px.

### R4. `iterations/mono-k-node.svg` — Node K.

![mono-k-node](iterations/mono-k-node.svg)

The accent disc sits on the K's arm junction instead of beside it, making the accent
the "joint" of the letter. Distinctive and stable; reads well from 16 px up.

### R5. `iterations/mono-k-thin.svg` — Thin K.

![mono-k-thin](iterations/mono-k-thin.svg)

Lighter 10-unit stroke on a taller K. Refined at large sizes but blurs at 16 px —
likely too light for a favicon.

Verified by rendering every variant at 256/160/32/16 px in both light and dark themes
on white and dark backgrounds. 16 px legibility ranking: **angular ≈ round > node >
ring > thin**.

## Iterations on `mono-k` (round 3)

Combining R2's angular K with a **rounded accent bar** (the dot stretched out like the
cursor line in `terminal.svg`):

### R6. `iterations/mono-k-cursor.svg` — Cursor K. (recommended)

![mono-k-cursor](iterations/mono-k-cursor.svg)

Angular K (butt caps, miter joins) + a round-capped accent bar on the baseline, bottom
aligned with the K. Reads as "K" + cursor/period; clean gap to the lower arm, balanced
centering, recognizable at 16 px in both themes.

### R7. `iterations/mono-k-cursor-long.svg` — longer bar

![mono-k-cursor-long](iterations/mono-k-cursor-long.svg)

Same as R6 with a longer bar (closer to `terminal.svg`'s cursor). More terminal-like,
but the longer bar shifts the visual center right — R6 balances better.

## Notes for implementation

- Whichever design is picked, it replaces `public/favicon.svg` (referenced in
  `src/layouts/Layout.astro:42`).
- `src/layouts/Layout.astro:43` also references `favicon.ico`, which does not exist in
  `public/` today — generating a `.ico` (or removing the link) should be part of the
  implementation.
- The chosen mark can later be reused for OG images / the header brand.
