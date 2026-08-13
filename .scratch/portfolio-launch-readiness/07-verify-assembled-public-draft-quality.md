# 07 — Verify the assembled Public draft quality

**Spec:** `docs/specs/2026-08-13-portfolio-launch-readiness.md`

**What to build:** The assembled Public draft is demonstrably operable for
keyboard, screen-reader, phone, and desktop visitors, and the repository holds
a repeatable pre-Launch checklist for the usability judgments automation
cannot make.

**Blocked by:** 02 — Make Public draft status machine-readable; 03 — Quarantine
unfinished Writing; 04 — Publish the accurate professional identity; 05 — Make
portfolio status evidence-bearing; 06 — Ship the honest standalone AST demo

**Status:** done

- [x] Automated accessibility smoke checks pass on Home, About, the empty or
  hidden Writing state, both themes, a valid AST tree, and an AST error state.
- [x] Every interactive control and link has a visible focus indicator that is
  not removed by component-specific styles.
- [x] Tabs or selectors expose current state programmatically, errors are
  announced without stealing focus, and decorative imagery is hidden from
  assistive technology.
- [x] Production-browser tests at representative phone and desktop viewports
  prove there is no page-level horizontal overflow and all primary actions
  remain reachable.
- [x] A checked-in pre-Launch checklist records manual keyboard traversal,
  focus order, zoom/readability, narrow-screen interaction, theme behavior,
  public Built-evidence verification, and the decision to remove `noindex`.
- [x] The checklist distinguishes a deployed Public draft from Launch and
  requires every canonical `PLAN.md` launch-gate item to pass before promotion.
- [x] The complete frozen install, build, browser suite, accessibility checks,
  and public Built-evidence checks pass together in CI.
