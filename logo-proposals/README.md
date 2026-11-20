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

## Notes for implementation

- Whichever design is picked, it replaces `public/favicon.svg` (referenced in
  `src/layouts/Layout.astro:42`).
- `src/layouts/Layout.astro:43` also references `favicon.ico`, which does not exist in
  `public/` today — generating a `.ico` (or removing the link) should be part of the
  implementation.
- The chosen mark can later be reused for OG images / the header brand.
