# DECISIONS.md

Running log of calls made without stopping to ask, and open questions that
*do* need a real answer from the client before ship. Per brief §11 / rule 4.

## Open questions — need a real answer from Andrea before these go live

Placeholders in the site are marked `TODO_CLIENT` at the exact spot each of
these lands. None are invented.

1. **Primary base city.** Business card says San Benedetto del Tronto; brief
   text says Roma. Placeholder copy defaults to `Roma · San Benedetto del
   Tronto` pending confirmation — swap to a single city if the client wants one.
2. Real client names/logos for the logo wall and case studies, and whether
   case-study metrics (the "3→500", "+140 in prima pagina" style stats) can be
   published as-is or need to be genericized.
3. Real Google review score/count. No "5.0 su Google" ships until this is
   confirmed with a source.
4. Founding year, and team size framing — copy currently says "un team di
   creativi e strateghi digitali" per the client's own Instagram copy (kept
   verbatim), confirm this still holds vs. "studio di una persona."
5. P.IVA / legal entity name for footer + privacy policy.
6. Calendly (or equivalent) booking URL for `/consulenza`.
7. Social handles — Instagram, TikTok, LinkedIn.
8. Production domain, for canonicals/OG/sitemap.
9. **Real pricing.** The `/metodo` pricing section (3 plans, monthly/annual
   toggle) ships with placeholder figures (€490/€990/€1.890 per month) — round,
   plausible numbers picked to make the UI demonstrable, not real rates. Needs
   either real numbers from Andrea or a decision to keep it custom-quote-only
   (common for agencies, and arguably the more honest choice given "ogni
   progetto riceve un preventivo su misura" is already the framing).

## Decisions made without stopping (Phase 0)

- Project scaffolded at `~/adriatica-website` as a fresh git repo — the brief's
  working directory (`~/Downloads/Visual Studio Code.app`) is the VS Code
  application bundle, not a project folder.
- Shape system: pills reserved for CTAs only (real client asset); everything
  else 0-radius, no blur shadows — see DESIGN-PLAN.md §1.4 for the reasoning.
- Secondary "taped paper cutout" motif added as a system primitive
  (`ui/PaperCutout.tsx`) — not spelled out token-by-token in the brief, but
  present in the client's own story assets and reused for scroll cues / list
  markers instead of a generic icon set.

## Decisions made without stopping (mid-build, post Phase 1)

- **Project moved into `ADRIATICA DATA/`.** Andrea asked the work be moved
  into `Desktop/COMPANIES/ADRIATICA SOCIAL MEDIA AGENCY/ADRIATICA DATA/` — the
  client's own asset folder. Real assets found there (business card, all 11
  IG story slides, 3 highlight-cover icons) were pulled into
  `public/brand/source/`; gap list in MISSING-ASSETS.md. An unrelated older
  static `index.html` draft in that folder (navy/indigo/Sora palette) was
  checked for facts only (phone/email matched, nothing new) — not used as a
  design basis, since it predates and conflicts with the approved DESIGN-PLAN.
- **Node.js installed as a portable, project-local binary.** The Mac had no
  Node/npm/Homebrew at all. With Andrea's explicit go-ahead, downloaded the
  official Node v24.19.0 LTS darwin-arm64 tarball from nodejs.org (checksum
  verified), extracted to `.tools/node/` inside the project (gitignored, not
  system-wide).
- **Green/kraft world retired for a mixed black+blue system.** Andrea asked
  directly, referencing karolortyl.com as a technique reference and asking to
  "remove the green pattern and mix a black and blue pattern." Removed
  `--color-lime` / `--color-lime-dim` / `--color-kraft` entirely; added
  `--color-nero` (`#06060F`). `data-world="green"` renamed to
  `data-world="dark"`, background is now two `color-mix()` radial gradients
  (adriatic + abisso) bled into nero — a literal mixed pattern, not a flat
  swap to a different flat color. Every component that referenced lime
  (Wordmark period, OverlayNav accents, Pill hover, footer link hovers) was
  swept to periwinkle. Full reasoning in DESIGN-PLAN.md §1.1/§1.4.
- **Researched karolortyl.com directly** (Andrea's reference link) rather than
  guessing at "3D animation." Inspected the DOM/computed styles instead of
  assuming WebGL: it's plain CSS `matrix3d` transforms on absolutely-positioned
  card wrappers, scroll-driven, built in Framer — not Three.js. Reproduced the
  same technique natively with `motion`'s `useScroll`/`useTransform` as
  `components/sections/ScrollScatter.tsx`: per-card differential scroll speed
  by depth, a left-side "FIG. 01 / FIG. 02…" index rail that highlights the
  active card, full static-grid fallback under `prefers-reduced-motion`. Wired
  into the home page's Progetti section with placeholder cards — real case
  content still pending Phase 3 (MISSING-ASSETS.md).
- **Two Uiverse.io snippets adapted into the token system**, pasted directly
  by Andrea: a 3D flip-switch (`ui/Toggle3D.tsx`, r7chardgh) and a falling-
  domino loader (`ui/DominoLoader.tsx`, satyamchaudharydev). Both re-skinned
  from the originals' hardcoded greys to `--color-*` tokens, and both respect
  `prefers-reduced-motion`. Toggle3D is a real `role="switch"` checkbox, not a
  div — the snippet's raw HTML wasn't accessible as given.
- **"Chunky" 3D variant added to `Pill`** for action buttons (Andrea asked for
  the 3D-button language on CTAs generally, e.g. "start a call"), using the
  same stacked hard-edge-shadow depth logic as Toggle3D's track, not the
  flip-switch mechanic itself — a CTA is a single action, not a binary state,
  so it keeps real button/link semantics rather than reusing the checkbox
  structure.
- **Scoped the "change the theme" request deliberately, rather than building
  a full site-wide light/dark mode.** Andrea's message named it as one example
  use for the 3D toggle, alongside "start a call" — not a full spec. Built
  Toggle3D wired to a real, visible, low-risk effect: a `data-chrome-accent`
  attribute (persisted for the session) that swaps the *neutral chrome only*
  (header-on-scroll, sticky bar, contact rail) between abisso-blue and nero,
  via one `--chrome-bg` custom property. Each page's branded `data-world`
  sections keep their authored colors regardless of the toggle — a full
  re-theme of the hero/dark/paper worlds would be a real design exercise
  (what does "light mode" mean for a caustics shader hero?), not something to
  invent silently. Flagging this back to Andrea rather than building it
  further without direction.
- Two Tailwind cascade-order bugs found and fixed live in the browser, both
  the same category: a component's own base class sets `display` (or, for
  Toggle3D, a raw non-Tailwind CSS rule sets it), and passing `hidden` through
  `className` doesn't reliably win since Tailwind's utility order isn't
  string order. Fixed both by wrapping in a container that controls display
  instead of overriding it through the component's own className. Documented
  inline on `Pill` and `Toggle3D` so it isn't rediscovered a third time.
- **Pricing toggle, not a checkout.** Andrea pasted the same Toggle3D switch
  snippet again saying "this code can be used for payment section." The brief
  has no pricing/e-commerce anywhere, and "payment section" is genuinely
  ambiguous between a pricing-plan toggle (safe, pure UI) and a real charge
  going through (which needs a proper processor and Andrea's own account, not
  something to hand-roll or wire up unattended) — asked directly rather than
  guessing given how different the two builds are. Confirmed: pricing toggle
  only. Built `PricingSection` on `/metodo` (3 plans × monthly/annual via
  Toggle3D, "Mese"/"Anno" — his original left/right labels wouldn't fit the
  switch's width) with placeholder figures, see open question #9 above.
