# pages 📄

Personal blog of Kha Nguyen — [khanetor.github.io](https://khanetor.github.io). Thoughts, projects and notes.

Built with [Astro](https://astro.build/) on top of the [AstroPaper](https://github.com/satnaing/astro-paper) theme: static site, MDX posts, Pagefind search, RSS, sitemap, light & dark mode, dynamic OG images, i18n support.

## ✍️ Writing

Posts live in `src/content/posts/` as Markdown/MDX. Subdirectories become part of the post URL. Frontmatter fields are typed in `src/content.config.ts`; site metadata is configured in `astro-paper.config.ts`.

## 💻 Tech Stack

**Framework** — [Astro](https://astro.build/) · **Type Checking** — [TypeScript](https://www.typescriptlang.org/) · **Styling** — [Tailwind CSS](https://tailwindcss.com/) · **Static Search** — [Pagefind](https://pagefind.app/) · **OG Images** — [Satori](https://github.com/vercel/satori) + [Sharp](https://sharp.pixelplumbing.com/) · **Linting/Formatting** — ESLint + Prettier

## 💻 Running Locally

Requires Node.js ≥ 22.12 and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev     # dev server at localhost:4321
```

Alternatively, `docker compose up` runs the dev server in a container with hot reload.

## 🧞 Commands

| Command        | Action                                                                          |
| :------------- | :------------------------------------------------------------------------------ |
| `pnpm dev`     | Starts local dev server at `localhost:4321`                                     |
| `pnpm build`   | Type-checks, builds the site, runs Pagefind indexing, copies index to `public/` |
| `pnpm preview` | Preview your build locally, before deploying                                    |
| `pnpm sync`    | Generates TypeScript types for all Astro modules                                |
| `pnpm lint`    | Runs ESLint                                                                     |
| `pnpm format`  | Formats code with Prettier                                                      |

## 🚢 Deployment

Static output (`dist/`), deployed to [GitHub Pages](https://docs.github.com/pages) by the workflow in `.github/workflows/`.

## 📜 License

Source code is licensed under the [MIT License](LICENSE). Blog posts and content are © Kha Nguyen unless otherwise noted.

---

Theme and design by [Sat Naing](https://satnaing.dev) ([AstroPaper](https://github.com/satnaing/astro-paper)).
