# Portfolio launch readiness

## Problem Statement

People visiting `memnoc.dev` are being asked to judge Matteo Stara's technical
credibility, but the Public draft currently mixes finished work, Current work,
training repositories, dead public links, and claims that the linked source
does not yet support. The site also publishes test content and a technically
inconsistent article, while lacking repeatable checks for its most important
public behavior. A hiring manager cannot reliably distinguish demonstrated
ability from direction or aspiration.

Matteo also needs the portfolio to reflect his current role without obscuring
the systems, distributed-systems, compiler, and low-level work the site exists
to showcase. His professional use of AI, his Applied AI study, and a formal AI
research role are distinct claims and must not be conflated.

## Solution

The Public draft presents only claims a visitor can verify. CodeAtlas and
Northstar become Built entries after their public default branches satisfy the
agreed evidence bar; StarScript becomes the featured Current work at its actual
stage; weaker or unavailable projects no longer masquerade as completed proof.
The copy identifies Matteo as a Sr. Software Engineer, accurately describes
AI-assisted connector development, and preserves systems engineering as the
portfolio's primary direction.

The draft remains directly reachable but unindexed and unpromoted until every
launch condition is verified. Published test content disappears, Writing stays
hidden until a reviewed genuine post exists, and the interactive demo becomes
an honest standalone Lox expression parser. A production-browser suite and
live public-repository checks make credibility requirements repeatable rather
than editorial promises.

## User Stories

1. As a hiring manager, I want every Built entry to link to public evidence for
   its claims, so that I can evaluate demonstrated work without taking the site
   on trust.
2. As a hiring manager, I want Original work distinguished from Adapted and
   extended work, so that I understand Matteo's contribution and the relevant
   source material.
3. As a visitor, I want CodeAtlas presented as the Original Built entry only
   after its public evidence passes, so that the classification has a concrete
   meaning.
4. As a visitor, I want Northstar presented as Adapted and extended only after
   its public evidence passes, so that its origin and Matteo's additions are
   both clear.
5. As a visitor, I want unfinished projects grouped under Current work with
   their real maturity, so that active learning is visible without being
   mistaken for completed proof.
6. As a visitor, I want StarScript described as an early bytecode VM, so that
   its site copy agrees with its public implementation.
7. As a visitor, I do not want dead or private project links presented as
   portfolio evidence, so that every offered path is useful.
8. As a visitor, I want the AST demo identified as a standalone browser-side
   Lox expression parser inspired by StarScript, so that I do not infer a code
   connection that does not exist.
9. As a visitor, I want valid Lox-subset expressions rendered as readable SVG
   trees, so that the demo provides a concrete interactive explanation of
   parsing.
10. As a visitor, I want malformed numbers, unterminated strings, unsupported
    characters, and incomplete expressions rejected with clear feedback, so
    that the demo never silently invents a valid program.
11. As a keyboard user, I want to operate navigation, theme selection, demo
    controls, inputs, and links with a visible focus indicator, so that the
    site is usable without a pointing device.
12. As a small-screen visitor, I want navigation, project information, prose,
    and the AST demo to remain readable and operable, so that the portfolio
    works on a phone without horizontal page overflow.
13. As a visitor using a screen reader, I want meaningful page structure,
    control names and states, error announcements, and non-redundant image
    alternatives, so that the site communicates the same information without
    relying on sight.
14. As a visitor, I want the theme to follow my operating-system preference
    until I make a persistent manual choice, so that the site is comfortable
    without flashing the wrong theme.
15. As a recruiter, I want Matteo's title and professional specialty stated
    accurately without exposing his employer, so that I understand his current
    seniority and work.
16. As a systems-oriented hiring manager, I want systems programming,
    distributed systems, compilers, and low-level tools to remain the site's
    central direction, so that the portfolio's intended specialty is
    unmistakable.
17. As a reader, I want Applied AI study described as study and writing rather
    than a formal research position, so that the site does not overstate
    Matteo's role.
18. As a reader, I want `labotteghina.gallery` used consistently, so that the
    humanizing art link reaches the active site.
19. As an author, I want draft posts excluded from indexes, tag pages, routes,
    and navigation signals, so that unfinished or technically unreviewed
    writing cannot leak into the public site.
20. As an author, I want Writing navigation to appear only when at least one
    reviewed, non-draft post exists, so that an empty section is not advertised.
21. As a direct visitor during the Public draft, I want the site to remain
    usable while carrying `noindex`, so that development access does not imply
    Launch.
22. As a search crawler, I want a page-level noindex directive during the
    Public draft, so that the unfinished portfolio is not added to search
    results.
23. As a person sharing a page after Launch, I want canonical and social
    metadata to identify the correct URL, title, and description, so that links
    have accurate previews and do not create duplicate identities.
24. As the repository maintainer, I want a pinned, reproducible production
    build in CI, so that dependency or compilation drift blocks publication.
25. As the repository maintainer, I want internal routes, published content,
    and Built-entry links checked automatically, so that broken public paths
    block Launch.
26. As the repository maintainer, I want automated accessibility smoke checks
    plus explicit keyboard and responsive-review gates, so that visual polish
    cannot hide basic usability regressions.
27. As the launch owner, I want the public default branches of CodeAtlas and
    Northstar reverified immediately before promotion, so that Built reflects
    current external evidence rather than an earlier audit.
28. As the launch owner, I want promotion to wait until every condition in the
    canonical launch gate passes, so that deployment is never confused with
    Launch.

## Implementation Decisions

- `PLAN.md` remains the canonical product and launch brief; `CONTEXT.md`
  supplies the evidence-bearing vocabulary used by this spec.
- Keep the existing static Astro architecture and use React only for the AST
  viewer island. This effort is an alignment and verification pass, not a
  framework rewrite.
- Treat Public draft versus Launch as one centrally controlled site state. The
  Public draft emits a page-level robots `noindex` directive without blocking
  crawlers in `robots.txt`; Launch removes that directive only after the gate
  passes.
- Use the approved positioning:
  - Title: **Sr. Software Engineer**.
  - Direction: systems software in C and Rust, compilers, distributed systems,
    and low-level tools.
  - Professional specialty: using AI to help build connectors between software
    systems.
  - Personal study: studying applied AI systems and writing about what is
    learned, without claiming an AI research role.
  - Omit the employer name.
- Represent Built entries and Current work as separate concepts rather than a
  single project list with cosmetic badges.
- The initial Built candidates are CodeAtlas as **Original** and Northstar as
  **Adapted and extended**. Do not promote either candidate until the live
  evidence check passes against its public default branch.
- A Built entry requires public working source, a clean build, a runnable
  example, licensing, known limitations, and an explicit account of original
  work versus source material.
- Feature StarScript under Current work and state that its current public
  implementation is an early bytecode VM with a hand-built instruction chunk.
  Do not claim parser, grammar, error-recovery, or AST-viewer integration work
  that the public branch does not contain.
- BYOL may appear as secondary Current work only after its warnings, licensing,
  provenance, and limitations are addressed. The Rust shell may appear as
  secondary Current work only after its repository becomes public.
  `r_command_line` does not appear.
- Remove the shell carousel and its simulated terminal. Present the AST viewer
  directly as a standalone browser-side parser inspired by the StarScript
  learning path.
- Keep the A1 expression subset: literals, identifiers, grouping, unary `!`
  and `-`, multiplication/division, addition/subtraction, comparisons, and
  equality. Render a parse tree only; do not evaluate expressions or expose a
  separate token panel.
- Reject unsupported characters instead of skipping them. Reject malformed
  numeric literals, unterminated quoted strings, trailing tokens, missing
  operands, and unclosed groups with concise user-facing errors. String escape
  syntax is not introduced by this effort.
- Make parser feedback accessible: the input has a persistent label, errors
  are announced, and the SVG has an accessible name while retaining node
  titles for visual users.
- Remove the thumbnail test post from production content. Mark the
  variable-resolution article draft until its explanation and example describe
  the same interpreter architecture and receive technical review.
- Derive Writing navigation visibility from the presence of at least one
  non-draft post. Draft content produces no index entry, tag route, post route,
  or navigation signal.
- Use `labotteghina.gallery` as the canonical art destination throughout.
- Preserve Rosé Pine Dawn/Moon behavior, including operating-system default and
  persistent manual override. Controls expose visible focus and current state.
- Add canonical URL, Open Graph, and social-card metadata through the shared
  page layout, with page-specific title and description values.
- Pin the package-manager version and install from the frozen lockfile in CI
  before the production build.
- Use a production-build browser suite as the principal verification surface.
  Run the real generated site, interact with it as a visitor, and assert
  externally observable outcomes rather than component internals.
- Add a live external-evidence check for CodeAtlas and Northstar. It uses their
  unauthenticated public GitHub surfaces rather than mocks because public
  reachability and evidence availability are the behavior under test.
- Keep this repository responsible for presentation, the launch gate, and
  cross-project verification. CodeAtlas, Northstar, StarScript, BYOL, and the
  Rust shell retain ownership of their own source, tests, decisions, licenses,
  provenance, limitations, and runnable examples.
- Add no analytics until a concrete measurement question exists.

## Testing Decisions

- **Primary seam — production-built site in a browser.** Build and serve the
  real static output, then use a headless browser to assert positioning copy,
  project classification, hidden Writing state, draft exclusion, noindex,
  canonical/social metadata, theme behavior, keyboard operation, responsive
  layouts, accessibility smoke checks, and AST input-to-tree/error behavior.
  Nothing behind the generated page is mocked.
- **External evidence seam — public Built-entry repositories.** Query the
  unauthenticated public GitHub surface for CodeAtlas and Northstar and assert
  that each repository resolves, exposes the expected default branch, and
  makes the required evidence documents reachable. Do not replace this with a
  mocked GitHub response; the external visibility is the requirement.
- The production Astro build is the baseline compilation gate and uses a
  frozen lockfile. A build that installs by mutating dependency policy does not
  count as reproducible verification.
- Good tests assert what a visitor, crawler, keyboard user, or launch owner can
  observe. They do not assert React state, parser private methods, CSS selector
  structure, or the internal representation of project data.
- Exercise the AST grammar through its rendered browser interface, including
  valid precedence/grouping cases and every agreed invalid-input class. Add a
  narrower parser test seam only if browser tests cannot provide useful failure
  localization without becoming slow or brittle.
- Run automated accessibility checks at representative pages and states, then
  retain manual launch checks for keyboard flow and responsive behavior because
  automation cannot establish their full usability.
- This repository has no prior automated test suite to imitate. The existing
  successful Astro production build is the only prior verification behavior;
  the new suite establishes the repository's testing conventions.

## Out of Scope

- Changes inside CodeAtlas or Northstar — out; their evidence documentation and
  verification are owned and handled in those repositories.
- Further StarScript language implementation — out; this effort corrects the
  portfolio claim but does not build the missing parser.
- BYOL warning cleanup, license, or provenance work — out; those changes belong
  to BYOL before it can qualify for display.
- Publishing or implementing the Rust shell — out; the portfolio waits for a
  public repository rather than manufacturing substitute evidence.
- Rewriting the variable-resolution article or authoring a new post — out;
  unfinished writing remains draft and Writing remains hidden.
- RSS — out until Writing contains a reviewed genuine post.
- AST token panel or expression evaluation — out; these remain A2 and A3.
- Sharing parser code or grammar artifacts with StarScript — out until the
  StarScript implementation supplies a real integration seam.
- Project detail pages — out until an individual project has site-specific
  depth that cannot be served by its repository.
- A visual redesign, framework migration, or Three.js visualization — out; the
  existing restrained visual and static architecture remain appropriate.
- Analytics — out until a specific decision requires measurement.
- Employer, customer, or confidential connector details — out; professional
  positioning must not disclose them.

## Further Notes

- Product decisions and the complete launch gate are in
  [`../../PLAN.md`](../../PLAN.md); canonical terminology is in
  [`../../CONTEXT.md`](../../CONTEXT.md).
- At the 2026-08-13 audit, the public site served commit `b658e17` and publicly
  exposed both the thumbnail test post and the variable-resolution article.
- At the same audit, CodeAtlas was publicly reachable on `main`; its local
  checkout contained one additional commit not yet on the public branch.
  Northstar's local and public `main` both resolved to `3af681f`, and its skill
  validation and installer suites passed.
- CodeAtlas and Northstar are considered functionally ready in their V1 forms.
  A parallel session is closing the small evidence-documentation gaps in their
  own repositories. Their live default branches must still be rechecked before
  this site promotes them to Built.
- The current variable-resolution article explains tree-walk resolution using
  a variable-to-depth map but illustrates it with clox bytecode compiler code.
  Draft status prevents that mismatch from being presented as reviewed
  technical writing.
