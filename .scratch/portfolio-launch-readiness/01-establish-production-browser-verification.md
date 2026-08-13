# 01 — Establish the production-browser verification seam

**Spec:** `docs/specs/2026-08-13-portfolio-launch-readiness.md`

**What to build:** A repository maintainer can install the pinned dependencies,
build the actual static site from the frozen lockfile, serve that output, and
run a browser smoke check locally and in CI. This is the verified path every
later visitor-facing slice extends.

**Blocked by:** None — can start immediately

**Status:** ready

- [ ] The repository pins the package-manager version and exposes documented
  commands for a frozen dependency install, production build, and browser test.
- [ ] CI performs the frozen install and production build without editing the
  lockfile or requiring an interactive dependency-policy decision.
- [ ] A production server is started and stopped automatically around browser
  tests; the suite does not test against the development server.
- [ ] A headless browser opens the built home page and asserts a visitor-visible
  smoke behavior.
- [ ] Browser-test artifacts and generated output are ignored rather than
  committed.
- [ ] The production build and browser smoke test pass locally.

