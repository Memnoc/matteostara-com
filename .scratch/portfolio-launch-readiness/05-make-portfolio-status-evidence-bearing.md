# 05 — Make portfolio status evidence-bearing

**Spec:** `docs/specs/2026-08-13-portfolio-launch-readiness.md`

**What to build:** A hiring manager sees CodeAtlas and Northstar only as
evidence-backed Built entries with distinct provenance classifications, while
StarScript is presented separately as honest Current work and unavailable or
training projects are not offered as proof.

**Blocked by:** 01 — Establish the production-browser verification seam

**Status:** ready

- [ ] CodeAtlas is presented as an Original Built entry with accurate public
  repository URL, concise capability claim, and relevant language/domain tags.
- [ ] Northstar is presented as an Adapted and extended Built entry with
  accurate public repository URL, concise capability claim, and relevant
  language/domain tags.
- [ ] Built and Current work are structurally and textually distinct; status is
  understandable without relying on color alone.
- [ ] StarScript is the featured Current work and is described at its public
  bytecode-VM stage without parser, grammar, custom-error-recovery, or shared
  AST implementation claims.
- [ ] `r_command_line`, BYOL, and the unavailable Rust shell do not appear in
  the current portfolio list.
- [ ] A non-browser verification command checks the unauthenticated public
  default branch of both Built candidates and confirms their agreed evidence:
  working-source repository, runnable instructions or example, license, known
  limitations, and an explicit provenance/original-work account.
- [ ] The external evidence check fails clearly when a repository, default
  branch, or required evidence document is unavailable and runs in CI.
- [ ] Production-browser tests assert the rendered classification, claims,
  working links, and absence of excluded projects.

