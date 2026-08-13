# memnoc.dev

Personal site and technical writing. Built with Astro 6 as a fully static site — no runtime, no server, no JS framework overhead on the critical path.

## Architecture

Astro's island architecture: pages render to static HTML at build time. Interactive components (the terminal shell demo on the home page) hydrate client-side as isolated React 19 islands via `client:only`. Everything else ships zero JS.

Content is managed through Astro's typed content layer — blog posts are Markdown files with Zod-validated frontmatter, compiled to static routes at build time. No CMS, no database.

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Astro 6 | Static-first, island architecture, zero JS by default |
| Islands | React 19 | Selective hydration for interactive components only |
| Content | Astro content collections + MDX | Type-safe frontmatter, static route generation |
| Styling | Plain CSS, Rosé Pine tokens | No build step, no runtime style injection |
| Hosting | Cloudflare Pages | Edge CDN, git-push deploy, no bandwidth billing |
| Domain | Cloudflare Registrar | Single control plane for DNS + TLS + deploy |

## Local verification

Requires Node ≥ 22.12. The repository pins pnpm in `package.json`; Corepack or
another package-manager launcher can use that exact version.

```sh
pnpm install --frozen-lockfile        # install without changing pnpm-lock.yaml
pnpm verify:evidence                  # verify Built candidates on public GitHub
pnpm build                            # production output → dist/
pnpm exec playwright install chromium # one-time local browser install
pnpm test:browser                     # serve dist/, smoke test, then stop the server
```

`pnpm verify:evidence` queries the unauthenticated public default branches of
CodeAtlas and Northstar. It fails if either repository or default branch is
unavailable, or if working source, a clean verification run, runnable
instructions, licensing, known limitations, or the agreed provenance account
is missing. CodeAtlas's public CI must pass at the verified revision;
Northstar's validation and installer suites run from a revision-pinned archive.
`pnpm test:evidence`
also exercises those failure messages against live GitHub responses; CI runs
that suite before building the portfolio.

The browser suite always runs against Astro's production preview server. Run
`pnpm build` first so `dist/` reflects the source under test. For day-to-day
development, `pnpm dev` starts the HMR server at `localhost:4321`.

## Structure

```
src/
  components/       # React islands (terminal shell demo)
  content/blog/     # Markdown posts — typed via Zod schema
  content.config.ts # Content collection schema
  layouts/Base.astro
  pages/            # File-based routing
  styles/global.css # Rosé Pine Moon/Dawn theme, CSS custom properties
public/
  favicon.svg       # SVG favicon with light/dark prefers-color-scheme
```

## Deploy

Push to `main` → Cloudflare Pages builds and deploys automatically. Build command: `pnpm build`. Output: `dist/`.

No environment variables required.
