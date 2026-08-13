# 06 — Ship the honest standalone AST demo

**Spec:** `docs/specs/2026-08-13-portfolio-launch-readiness.md`

**What to build:** A visitor can enter a supported Lox-subset expression and
see its parse tree, or enter malformed input and receive explicit accessible
feedback. The site accurately presents this as a standalone browser parser
inspired by the StarScript learning path, not as StarScript running in-browser.

**Blocked by:** 01 — Establish the production-browser verification seam

**Status:** done

- [x] The shell carousel, simulated terminal, shell framing, and shell client
  code are no longer shipped.
- [x] The demo caption clearly identifies a standalone browser-side Lox
  expression parser inspired by StarScript and makes no integration claim.
- [x] Literals, identifiers, grouping, unary operators, multiplication and
  division, addition and subtraction, comparisons, and equality render trees
  with correct precedence and associativity.
- [x] Unsupported characters, malformed numeric literals, unterminated quoted
  strings, trailing tokens, missing operands, and unclosed groups each produce
  a concise error instead of a partial or silently altered tree.
- [x] String escape syntax is not accidentally accepted or advertised.
- [x] The input has a persistent visible label, parser errors are announced,
  examples are keyboard-operable, and the rendered SVG has a meaningful
  accessible name.
- [x] The tree remains horizontally contained within the demo on narrow
  viewports rather than causing page-level overflow.
- [x] Production-browser tests cover representative precedence/grouping cases
  and every agreed invalid-input class through visitor-visible output.
