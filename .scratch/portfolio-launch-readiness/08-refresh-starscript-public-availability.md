# 08 — Refresh StarScript public availability

**Spec:** `docs/specs/2026-08-13-portfolio-launch-readiness.md`

**What to build:** A visitor sees StarScript remain honestly classified as
Current work at its early-bytecode-VM stage, with a working link to its newly
public source instead of the stale “Source currently unavailable” statement.

**Blocked by:** 05 — Make portfolio status evidence-bearing

**Status:** done

- [x] StarScript remains the featured Current work entry and is not promoted
  to Built.
- [x] The entry links to `https://github.com/Memnoc/StarScript` with a clear
  accessible source-link name.
- [x] The stale “Source currently unavailable” statement is removed wherever
  it appears.
- [x] The maturity copy remains limited to the public `main` evidence: an early
  bytecode VM in C that executes a hand-built instruction chunk.
- [x] The source link returns a successful public response.
- [x] Production-browser coverage asserts the Current work classification,
  working source link, accurate maturity claim, and absence of stale
  availability copy.

## Debug receipt

Hardening reproduced the bug twice against a fresh production build with
`{ linked: false, stale: true }`. GitHub independently reported a public,
non-private repository on `main@b1d57b279e976c543610e6b755d89ce99b32f127`.
The root cause is static data in `src/portfolio.ts` with no repository field and
a hard-coded unavailable label; `src/pages/index.astro` renders that state
unconditionally, while `tests/browser/portfolio.spec.ts` preserves it by
expecting zero links and the stale label.
