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
9. ~~Real pricing~~ — **resolved**, real figures now sourced from Andrea's own
   invoices/proposals (see mid-build decisions below).
10. **Markup on subcontractor costs.** Andrea gave costs, not prices, for two
    add-ons: website editor (€500–800) and photographer (€200–350/shoot → 20–30
    assets). No margin decision has been made, so `/metodo`'s "Extra" section
    lists them with "su richiesta" instead of a number — needs a real
    client-facing price (or a standing markup rule) from Andrea.
11. ~~Real logo file~~ — **resolved**, Andrea confirmed the invoice wordmark
    is current ("u can go ahead"). Adopted site-wide (see mid-build decisions
    below). Still open: no vector source file — the sparkle icon is a
    hand-built SVG approximation, not Andrea's original artwork, since only
    the flattened PDF render was available. Would still like the real
    `logo-adriatica.svg` if one exists, to replace the approximation.

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
- **Pricing rebuilt with real figures from three actual client documents**
  Andrea attached (`Fattura 450 euro.pdf`, `Proposta Aniela Corsisi.pdf`,
  `fattura_proforma_servizi_digitali_8_rate.pdf`), replacing the placeholder
  numbers entirely. This also surfaced that the "monthly/annual" toggle
  framing I'd invented doesn't match how Andrea actually prices anything —
  none of the three real documents show an annual-prepay discount. Repurposed
  Toggle3D instead for something evidenced: the Aniela proposal treats
  "gestione sito web" (€200/mese) as a separate line from "gestione social"
  (€300/mese), so the toggle now adds/removes that real add-on rate across
  tiers. Used the invoice's *list* price for brand identity (€500), not the
  €350 one-off negotiated discount on that specific job — a discount given to
  one client isn't a standing rate. Caught and fixed a real bug before
  shipping: the toggle was double-charging Full Service, since that tier's
  base €500/mese already bundles site management (300+200) per the real
  proposal — added `includesSite` to skip the addon there instead of adding
  it on top (would've shown €700 instead of the correct €500).
- **Photographer/website-editor costs kept out of client-facing prices.**
  Andrea labeled these explicitly as costs ("the cost I have"), not prices —
  mixing his subcontractor cost with a client rate without a margin decision
  would either underprice the service or fabricate a markup he never set. The
  two "Extra" line items ship with "su richiesta" instead of a number; see
  open question #10.
- **Real services and target niches added.** Andrea listed the full service
  catalogue (15 items) and three target verticals (Fitness; Sanitario &
  Socio-Sanitario; Ristorazione, the last one covering hotels, discoteche and
  Airbnb too based on where he added them). Grouped the 15 services into 5
  pillars for `ServicesSection` — the granular ones (report mensile, analisi
  competitor, impostazione profili…) weren't repeated as their own cards
  since they already appear as concrete deliverables inside the pricing
  plans' feature lists. Built `NicheSection` for the verticals. Both wired
  into the home page between the hero and the Progetti gallery.
- **Wordmark switched to the real invoice logo.** Andrea confirmed the
  all-caps "ADRIATICA." + sparkle-icon lockup from `Fattura 450 euro.pdf` is
  current, replacing the colored-period version Phase 0 built from the story
  slides. Rebuilt `ui/Wordmark.tsx`: uppercase via CSS (the underlying
  `brand.wordmark` string stays `"Adriatica."`, unchanged, so it still reads
  correctly anywhere it's used as plain text/metadata), and a hand-built SVG
  sparkle (a standard four-point "twinkle" curve, not traced from the PDF —
  no vector source was available, see open question #11) replacing the
  periwinkle-period accent. Also swapped `OverlayNav`'s separate hardcoded
  wordmark markup for the real `Wordmark` component, removing a duplicate.
  The invoice also shows a second, mixed-case white-on-navy pill lockup
  (footer stamp) — read as a compact secondary badge, not adopted as the
  primary mark.
- **Gradient pricing cards — a deliberate exception to the dark-world
  "0 radius" rule.** Andrea pasted a Uiverse.io card snippet (Cobp) and said
  to implement it for the pricing section. Its purple/violet gradient border
  was swapped for periwinkle→adriatic→abisso→nero (fits the black+blue
  system directly), and a matching `gradient` variant added to `Pill` for
  its CTA (inset highlight + hover glow, adapted from the snippet's button).
  This card is genuinely rounded (32px) — DESIGN-PLAN §1.4 says dark-world
  cards are 0-radius, but the rounded corner *is* what was asked for here,
  not decoration on top of it, so flattening it would mean not actually
  building what Andrea pasted. Scoped narrowly: only the three pricing plan
  cards use this treatment; the "Extra" add-on cards below them keep the
  existing flat bordered style. All three plan cards now share one visual
  treatment, which also simplified the component — the earlier
  featured-vs-regular branching (different background, different button
  variant per card) is gone, replaced by a small "Più scelto" badge in the
  gradient header row.
- **3D glass card for "Cosa facciamo"**, from another Uiverse.io snippet
  (Smit-Prajapati) Andrea pasted directly. Genuine multi-layer 3D — card,
  glass pane, content and badge sit at different `translateZ` depths, and
  the whole card tilts via `rotate3d` on hover while a five-ring concentric
  badge and three action buttons push further forward with staggered
  delays, not a flat card with a drop shadow. Original mint-green recolored
  to periwinkle→adriatic. Two content decisions made translating a generic
  product-card template onto real service copy:
  - The row of three generic "social" buttons is repurposed as the same
    real contact actions used elsewhere on the site — phone, email,
    WhatsApp (`contact.whatsappHref`, defined since Phase 1 but unused until
    now) — rather than inventing fake social links. The third icon is a
    plain chat bubble, not the WhatsApp logo mark, since that's a
    trademarked icon.
  - The badge's center icon is the real sparkle from the invoice wordmark
    (extracted into a shared `ui/Sparkle.tsx`), tying this new card style
    back to the actual brand mark instead of using a generic icon.
  - Dropped the per-pillar "includes" tag list that the previous flat card
    version showed — the glass card's fixed-height, two-line title+text
    layout has no room for a bullet list, and every one of those granular
    items is still visible in the pricing plans' feature lists. Nothing was
    deleted from `content/site.ts`, just not rendered on this card.
  Respects `prefers-reduced-motion`: the resting depth stack (glass pane,
  badge rings) stays, since that's layout, not motion — only the
  hover-triggered tilt/push is disabled.
