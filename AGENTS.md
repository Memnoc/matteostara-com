## Northstar

This repo follows the northstar engineering skills.

### Pipeline

Invoke `adr` (or `adr-with-docs`), then `to-spec`, `to-tickets`, and
`implement`: one ticket per fresh session, built with `tdd` and reviewed with
`crosscheck`. When all tickets are done, `harden` verifies the assembled
system; after shipping, `next` harvests the V2 agenda. Invoke `guided-mode`
when unsure.

### Artifacts

- `CONTEXT.md` — domain glossary, root
- `docs/adr/` — decision receipts, indexed in its README.md
- `docs/specs/` — specs, `YYYY-MM-DD-<slug>.md`
- `docs/research/` — research notes, same naming
- `docs/intake/` — digested stakeholder material, same naming
- `.scratch/<spec-slug>/` — tickets; disposable once the feature ships

All are created lazily on first write.
