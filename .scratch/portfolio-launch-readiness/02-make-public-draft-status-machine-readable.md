# 02 — Make Public draft status machine-readable

**Spec:** `docs/specs/2026-08-13-portfolio-launch-readiness.md`

**What to build:** A direct visitor can use every page of the Public draft,
while crawlers and link-sharing systems receive one coherent, centrally
controlled statement of the site's current status and identity.

**Blocked by:** 01 — Establish the production-browser verification seam

**Status:** done

- [x] Every generated Public draft page emits a robots `noindex` directive and
  remains crawlable; no `robots.txt` rule prevents observing the directive.
- [x] A single site-state control removes `noindex` for a future Launch without
  requiring page-by-page edits.
- [x] Every generated page emits an absolute canonical URL for `memnoc.dev`.
- [x] Shared Open Graph and social metadata uses the page's actual title,
  description, canonical URL, and an appropriate site identity.
- [x] The initial theme follows the operating-system preference without a
  wrong-theme flash, and a manual Dawn/Moon choice persists across navigation
  and reloads.
- [x] The theme control exposes an accessible name and current state.
- [x] Production-browser tests cover `noindex`, canonical/social metadata, and
  theme persistence through observable page behavior.
