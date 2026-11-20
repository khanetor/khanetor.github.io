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

## Iterations on `mono-k` (round 4 — "boxed" K)

R7's wings protruded above/below the stem. These variants shorten the wings so the K
fits inside a square, keeping R7's long cursor bar:

### R8. `iterations/mono-k-boxed.svg` — Boxed K (no frame)

![mono-k-boxed](iterations/mono-k-boxed.svg)

Wing tips pulled in to y=40/88 so the whole K fits a 64×64 box (x 14–78, y 32–96);
long accent bar unchanged. Reads as a contained, "boxed" K without drawing the box.
Clean at 16 px and up.

### R9. `iterations/mono-k-boxed-frame.svg` — Boxed K with frame

![mono-k-boxed-frame](iterations/mono-k-boxed-frame.svg)

Same shortened-wing K inside a literal square frame (8-unit stroke), accent bar to the
right of the frame. The most explicit "boxed" look; slightly busier at 16 px.

## Iterations on `mono-k` (round 5 — same wing angles, shorter wings)

Round 4 rotated the wings to fit a box; feedback was to keep R7's angles exactly and
drop the box. These variants shorten the wings **along the same diagonal directions**
(direction vectors scaled, so angles are identical to R7) — the tips simply stop
shorter, so nothing protrudes past the stem's top/bottom:

### R10. `iterations/mono-k-short-wings.svg` — Short wings — **recommended**

![mono-k-short-wings](iterations/mono-k-short-wings.svg)

R7's K with wing tips at 70% of their length along the original diagonals
(upper Δ 0.7·(−34,34), lower Δ 0.7·(36,30)); R7's long accent bar kept. Wing cap
corners now sit at y≈36.5/93.1, inside the stem's 32–96 — no protrusion, same angles.
Recognizable at 16 px.

### R11. `iterations/mono-k-shorter-wings.svg` — Shorter wings

![mono-k-shorter-wings](iterations/mono-k-shorter-wings.svg)

Wings at 50% length (Δ 0.5·(−34,34) / 0.5·(36,30)), bar nudged left to keep centering.
More compact, but the K reads less clearly at 16 px.

## Iterations on `mono-k` (round 6 — wings touch the bounding box)

Wings run at the full original angle; each wing tip's butt cap is placed so its two
corners land exactly on the K's imaginary bounding box — the upper wing touches the
top edge and right edge, the lower wing the bottom edge and right edge (2 contact
points each, no protrusion, no clipping). Stem is flush with the box's left/top/bottom.
Accent bar moved much closer to the K.

### R12. `iterations/mono-k-touch.svg` — Touch, bar h20 — **recommended**

![mono-k-touch](iterations/mono-k-touch.svg)

Box = [18,72]×[32,96]; stem `M26 32v64`; 45° wings from junction (40,64) with tips at
(66.34, 37.66) / (66.34, 90.34) — cap corners land exactly on the box edges:
(60.69, 32) + (72, 43.31) for the upper wing, (60.69, 96) + (72, 84.69) for the lower.
Bar `M83 88h20` (3-unit gap from the box).
Verified with a box-overlay render: 2 contact points per wing, zero protrusion.

### R13. `iterations/mono-k-touch-long.svg` — Touch, longer bar h24

![mono-k-touch-long](iterations/mono-k-touch-long.svg)

Same K shifted left (box [16,70]×[32,96]); bar `M83 88h24` — longer, like R7's cursor.

## Notes for implementation

- Whichever design is picked, it replaces `public/favicon.svg` (referenced in
  `src/layouts/Layout.astro:42`).
- `src/layouts/Layout.astro:43` also references `favicon.ico`, which does not exist in
  `public/` today — generating a `.ico` (or removing the link) should be part of the
  implementation.
- The chosen mark can later be reused for OG images / the header brand.
