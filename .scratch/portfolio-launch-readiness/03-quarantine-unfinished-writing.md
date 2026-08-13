# 03 — Quarantine unfinished Writing

**Spec:** `docs/specs/2026-08-13-portfolio-launch-readiness.md`

**What to build:** Visitors see no test or technically unreviewed writing, and
the navigation advertises Writing only when at least one reviewed, non-draft
post actually produces a public route.

**Blocked by:** 01 — Establish the production-browser verification seam

**Status:** ready

- [ ] The thumbnail test post is removed from production content rather than
  hidden behind a runtime condition.
- [ ] The variable-resolution article is marked draft without rewriting its
  content in this ticket.
- [ ] Draft posts produce no post page, Writing index item, tag page, or tag
  index signal in the production build.
- [ ] Writing navigation is derived from the presence of at least one
  non-draft post and is absent when the collection has none.
- [ ] Direct navigation to the Writing index remains a coherent empty state or
  deliberate not-found response without exposing draft content.
- [ ] Production-browser tests prove that unfinished titles and routes are not
  public and Writing is absent from navigation.

