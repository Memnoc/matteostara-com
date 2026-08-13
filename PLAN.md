# memnoc.dev — Plan

Locked from grilling session. Single source of truth for site decisions. Update inline when a decision changes; this file is the canonical reference, not chat history.

---

## Positioning

**Sr. Software Engineer** whose professional work uses AI to help build
connectors between software systems. Personal technical direction remains
**systems programming, distributed systems, compilers/language runtimes, and
low-level tools**. Also studies applied AI systems and writes about what he
learns; do not imply an official AI research role.

Not a junior portfolio. Portfolio = credential-building, not desperation.

**Audience:** hiring managers in kernel/compiler space (drewdevault, jvns, syshero, andrewkelley reference set). Recruiters reach the URL only via CV link.

**Tone target:** "this person can build, knows the domain, has fun with it, is a human being like me." Anti-LinkedIn.

---

## Launch model

The deployed site is a **public draft**: directly reachable, deliberately
unindexed, and not promoted through CV / LinkedIn / applications / social
until the launch gate is fully met. Use page-level/site-wide `noindex`; do not
block crawlers in `robots.txt`, because they must crawl a page to observe the
directive.

### Launch gate (all must be true)

- Built tier has **≥2 externally verifiable entries**:
  - **CodeAtlas** — Original Built entry
  - **Northstar** — Adapted and extended Built entry
- Each Built entry's public default branch provides working source, a clean
  build, a runnable example, a license, known limitations, and an explicit
  account of original work versus source material.
- Every site claim about a project is verifiable against that project's
  current public default branch.
- CodeAtlas has its missing license and provenance boundary, its latest local
  work is public, and its full verification remains green.
- Northstar has its stale `adr` description corrected, an explicit Known
  Limitations section, a clear adaptation/original-work boundary, and green
  validation and installer tests.
- Standalone AST viewer works at scope A1 (see below) and has parser behaviour
  tests.
- About page reflects the current role and technical direction accurately.
- Current work is live and states each project's actual maturity.
- `/writing` is hidden from navigation until the corrected variable-resolution
  article or another genuine post is ready.
- The test thumbnail post is removed.
- CI verifies the pinned build, parser behaviour, internal content, public
  project links, and focused accessibility checks; responsive browser checks
  and a keyboard review pass.
- Canonical and social metadata are correct.

---

## Identity

- Primary: **Matteo Stara**
- Subtitle/handle: **(memnoc)**
- Title shown: **Sr. Software Engineer** — employer name omitted
- Art linked through **labotteghina.gallery** (active canonical URL)

### Landing one-liner

> Matteo Stara (memnoc)
>
> Sr. Software Engineer
>
> I write systems software in C and Rust—compilers, distributed systems, and
> low-level tools. Professionally, I use AI to help build connectors between
> software systems. I also study applied AI systems and write about what I
> learn.

"Currently" line updates every few weeks. Decays gracefully.

---

## Domain + hosting

- Domain: **memnoc.dev** (registered on Cloudflare Registrar, ~$12/yr)
- Hosting: **Cloudflare Pages** (free, edge CDN, git-push deploy)
- DNS: managed directly in Cloudflare (domain + hosting same account)

---

## Stack

**S1 — Astro + React island.**

- Astro static site
- TypeScript throughout
- MDX for blog posts
- React mounted **only as an island** for the AST viewer
- Content pages ship ~0 KB JS
- Boring stack on purpose — site is a tool, not a portfolio piece

Three.js: **dropped**. Wrong tool for 2D AST viz + wrong signal for niche.

---

## Information architecture (IA3)

- `/` — single landing page (everything below)
- `/writing` — dedicated section, **hidden from nav until a reviewed genuine post exists**
- `/projects/<slug>` — per-project detail pages, added only when a project has real depth to share (post-mortem, architecture notes, design rationale). Not at launch.

---

## Landing page structure (top → bottom)

1. **Header**
   - Profile image (real photo, casual)
   - Name + (memnoc)
   - Nav: Home · About · Writing (hidden until populated)
   - Social row: GitHub, LinkedIn, labotteghina.gallery, RSS (added when /writing exists)
   - Theme toggle (sun/moon), top-right
2. **Hero**: positioning copy (above)
3. **AST viewer** — inline, quiet framing, no theatrics. Scope = A1 (parse →
   SVG tree only). A standalone browser-side Lox expression parser inspired by
   the StarScript work, not wired to or presented as StarScript's parser.
4. **Built tier**
   - CodeAtlas: status badge **Original**
   - Northstar: status badge **Adapted and extended**
   - Minimal cards: name · 1-line blurb · language/domain tags · status badge · GitHub link
   - Built is an evidence classification, not a synonym for repository.
5. **Current work**
   - StarScript is the featured current project, described at its actual
     bytecode-VM stage. Do not claim it has a parser, named grammar rules,
     custom error recovery, or a connection to the browser AST viewer until
     its public default branch demonstrates those capabilities.
   - BYOL may appear secondarily after its build warnings, license, provenance,
     and limitations are addressed.
   - The Rust shell may appear secondarily after its repository is public.
   - `r_command_line` is a training repository and does not appear.
   - Current state + one-line study note, including applied AI study when there
     is something concrete to say.
   - Updated every few weeks
6. **Writing** link (only visible once `/writing` populated)
7. **Contact** (email + GitHub + LinkedIn + labotteghina.gallery)

---

## About page (~600-900 words, narrative not CV-speak)

7 sections, syshero-shaped:

1. **Hook** — who you are now in ~3 sentences
2. **XDA / Memnoc origin** — ROM porting on HTC, back-engineering newer firmware to older devices, XDA-recognized status. *Lead the backstory with this.*
3. **Linguistics → languages bridge** — BA in Linguistic Mediation, MA in Linguistics (International Communication). Natural-language structure → programming-language structure. Why compilers feel natural.
4. **Professional path** — Linux/OSS years → Android (Java) → Frontend
   (TS/React) → Sr. Software Engineer using AI to help build connectors between
   software systems. Distinguish the current professional specialty from the
   systems and low-level work pursued personally. One paragraph, not a CV
   timeline; employer remains unnamed.
5. **Currently** — StarScript, systems/distributed-systems study, and applied
   AI study. Honest about the state of each.
6. **Outside** — painting (link to labotteghina.gallery), baking
   (bread/pizza/cakes), custom keyboards (embedded angle).
7. **Contact**.

---

## Visual

- **Palette: Rosé Pine** — full token set as CSS variables (`base, surface, overlay, muted, subtle, text, love, gold, rose, pine, foam, iris`)
- **Theme toggle: Rosé Pine Dawn (light) ↔ Rosé Pine Moon (dark)**
  - Default: OS `prefers-color-scheme`
  - Manual override stored in `localStorage`
  - Sun/moon icon in header, top-right
- **Restraint rule**: mostly `text` on `base`. Accent (`foam` or `iris`) reserved for links + small highlights. Avoid every-token-sprinkled-everywhere trap.
- **Body font**: system sans (`-apple-system, ui-sans-serif, system-ui, ...`)
- **Mono**: JetBrains Mono or Berkeley Mono
- **Layout**: single-column, max-width content. No sidebars.

---

## AST viewer scope (A1)

- Text input → tokenize → parse → render SVG tree
- Standalone browser-side Lox expression grammar, inspired by StarScript but
  not sharing its implementation or claiming parity
- Renders **only the parse tree**. No eval. No token list shown separately.
- React island, mounted by Astro.
- Parser behaviour is covered by tests, including malformed numbers,
  unterminated strings, unsupported characters, and incomplete expressions.
- Future upgrades (out of scope for v1): A2 token list panel; A3 step-through evaluation.

---

## Writing

- Remove the public thumbnail test post; tests must use fixtures, not published
  production content.
- Mark the variable-resolution article as draft until its explanation and code
  example describe the same interpreter architecture and receive technical
  review.
- Hide Writing from navigation until that corrected article or another genuine
  post is ready.
- Applied AI systems are a valid future topic when written from real study or
  experimentation and without exposing employer or customer information.
- Do not fabricate retrospectives or imply a professional AI research role.

---

## Verification and repository boundaries

- This repository owns the portfolio, launch gate, public claims, and
  cross-project evidence checklist.
- Each linked project owns its own decisions, specs, tests, license,
  provenance, limitations, and runnable proof. Improvements happen in that
  project's repository, not by copying its evidence into this one.
- Build with pinned dependencies and verify in CI.
- Test the AST parser at its behavioural interface.
- Validate internal routes/content and public Built-entry links.
- Run focused automated accessibility smoke checks plus manual keyboard and
  responsive-browser reviews.
- Provide correct canonical and social metadata.
- No analytics until a concrete need exists.

---

## Out of scope (impl-phase decisions, not grilled)

- Exact Rosé Pine accent assignment (links / hover / selected)
- Project detail page template — decide when first project earns one
- First writing post topic — wait for a real moment per the "no fabricated retrospectives" rule
- DNS pointer mechanics at Hostinger / CF Pages site setup
- README "what's mine vs source material" exact template wording
- Footer content (copyright? license note? "built with Astro" credit? — probably none)
- Analytics — add only for a concrete question, not by default

---

## Future re-opens

- AST viewer **A2 upgrade** (add token list panel)
- **Genuine 3D viz** (page-table walker, cache hierarchy) — only when there's an underlying real project to back it. Three.js considered only then.
- `/writing` **cross-posting strategy** — revisit when 3+ posts exist
- Project detail pages — added per-project when depth justifies
- RSS — turn on with /writing

---

## Doc surface (per adr-with-docs skill)

- **CONTEXT.md:** defines the evidence-bearing portfolio terms whose precise
  meanings matter: Public draft, Launch, Built entry, Current work, Project
  claim, AI-assisted connector development, and Applied AI study.
- **ADRs:** none rise to the hard-to-reverse + surprising + real-trade-off bar.
  Astro, React, Cloudflare, the visual system, and the evidence tiers remain
  reversible in days. Skip per the three-part gate.
- `PLAN.md` remains the canonical product and launch brief. `CONTEXT.md`
  provides its shared vocabulary; future specs describe bounded delivery work.

---

## Reference sites (aesthetic anchors)

- syshero.org/about — chosen primary reference
- drewdevault.com — minimalism + restraint
- jvns.ca — honest "I'm learning this" framing
- andrewkelley.me — niche signal example
- bellard.org — extreme minimalism baseline
