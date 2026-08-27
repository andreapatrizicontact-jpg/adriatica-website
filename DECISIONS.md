# DECISIONS.md

Running log of calls made without stopping to ask, and open questions that
*do* need a real answer from the client before ship. Per brief §11 / rule 4.

## Open questions — need a real answer from Andrea before these go live

Placeholders in the site are marked `TODO_CLIENT` at the exact spot each of
these lands. None are invented.

1. ~~Primary base city~~ — **resolved**, Andrea confirmed Roma. Updated
   `contact.cityDisplay` from the dual-city placeholder to `"Roma"` alone.
2. ~~Client names/case-study permission~~ — **resolved, both approved.**
   Nutriva confirmed publishable first. Rosso Pomodoro was confirmed NOT
   approved shortly after ("i dont have approval from rosso so dont put
   it") — then, later the same session, Andrea got the confirmation and
   said to add it ("at the end u can add rosso pomodoro, i had the
   confirmation"). Both now in `progettiCards`. Noting the reversal
   explicitly here since a "no" changed to a "yes" mid-build — if a similar
   flip happens in reverse, treat it the same way: real permission state
   as of the most recent message, not the first answer given.
3. ~~Real Google review score~~ — **resolved, staying off the site.** Andrea
   confirmed there's no real review score and suggested generating some
   anonymized ones for now. Declining that specifically — fabricated
   reviews presented as real customer feedback are misleading regardless of
   whether a name is attached, and it's exactly what brief §11 already rules
   out ("do not fabricate a 5.0 su Google"). No review section ships until
   real reviews exist; told Andrea directly rather than building it quietly.
4. ~~Founding year / team framing~~ — **resolved**, Andrea confirmed 2026 and
   "solo + 2 collaboratori esterni." Added to `brand.foundedYear` /
   `brand.teamFraming` — supersedes the Instagram-derived "un team di
   creativi e strateghi digitali" phrasing, which overstated headcount.
5. ~~P.IVA~~ — **resolved**, Andrea confirmed he doesn't have one yet.
   Omitted from the footer entirely (`legal.piva` is `null`, only rendered
   when set) rather than showing a placeholder. Legal entity name for the
   future privacy policy is still open once one exists.
6. ~~Calendly~~ — **resolved**, `calendlyUrl` set to
   `calendly.com/team_adriatica`.
7. ~~Social handles~~ — **resolved as final**, Instagram and LinkedIn
   confirmed and added to `socials`. Andrea confirmed directly there's no
   TikTok — not a gap, just not applicable; nothing renders for it and
   nothing further to chase here. Note: the LinkedIn link is Andrea's
   personal profile, not a company page — used as-is since it's the only
   one he sent. **Update:** Instagram handle changed from
   `adriaticacomunicazione` to `adriaticastudio` (matches the domain name),
   updated in `socials`.
8. ~~Production domain~~ — **resolved**, Andrea bought `adriaticastudio.com`
   on Namecheap. Wired into `metadataBase`, canonical URLs, `sitemap.ts`,
   `robots.ts`, and the OG image (see Phase 6 entry below). Site isn't
   deployed yet — still waiting on Andrea to push to GitHub and connect
   Vercel — but the domain-dependent code is ready for when he does.
9. ~~Real pricing~~ — **resolved**, real figures now sourced from Andrea's own
   invoices/proposals (see mid-build decisions below).
10. ~~Markup on subcontractor costs~~ — **resolved for photography and
    website edits.** Andrea set real client prices for photography (€300 in
    zona / €400 fuori regione). For website edits, Andrea confirmed
    directly the client price genuinely varies by the specific edit
    requested — not one flat rate — so `addonServices` now shows
    "da €500" (his real anchor figure, kept as a floor) instead of a flat
    €500. Nothing further to chase here; "it depends" is the real answer.
11. ~~Real logo~~ — **resolved again, superseding the previous "resolved"**:
    Andrea sent the actual PNG file (`LOGO ADRIATICA.png`, found on disk,
    cropped to `public/brand/logo-adriatica-chip.png`) — mixed-case
    "Adriatica.", no icon, white text on a black→blue gradient chip. This
    confirms the image reference from the previous entry was pixel-accurate,
    not just a mockup. Andrea confirmed directly there's no vector file —
    not a gap to keep chasing, just a fact: the live wordmark stays typeset
    text (Poppins) rather than an embedded image, and the PNG is ready for
    Phase 6 favicon/OG generation as-is.
12. ~~Font identity~~ — **resolved, Andrea confirmed Poppins directly.**
    Matches the inference already made from the logo image and the Nutriva
    case study — no change needed, just now explicit rather than inferred.
13. ~~Rosso Pomodoro PDF unreadable~~ — **resolved**, Andrea sent a
    compressed version (2.7MB) that read fine. Content: brand identity for
    a pizzeria — wordmark ("ROSSO pomodoro." in a serif/script mix),
    red/cream checkered pattern, menu design, pizza-box packaging, a
    cartoon mascot. Same shape as Nutriva — brand/packaging work, not
    growth metrics. Publish approval landed separately — see item #2 — now
    in `progettiCards`.
14. **Third client named: La Tellina** — a stabilimento (beach club) in San
    Benedetto del Tronto. Andrea confirmed it can be added to the case
    studies and said he'll produce a presentation deck for it, same as
    Nutriva/Rosso Pomodoro. No deck yet — only name, business type, and
    city are confirmed real facts so far; not enough to build a full
    Progetti card, so not added to `content/site.ts` until the deck lands
    (or he confirms what to say about it in the meantime).
15. **No Resend API key set — form submissions aren't reaching an inbox
    yet.** `/contatti`, `/analisi`, and the home-page CTA form all POST to
    working API routes (`lib/email.ts`), but with no `RESEND_API_KEY`
    configured they only log to the server console (confirmed dev-fallback
    behavior, not a bug) instead of emailing `andreapatrizicontact@gmail.com`.
    Andrea asked directly where submitted data goes — told him plainly this
    isn't wired to a real inbox yet. Needs a Resend account + API key set as
    an env var on whatever host he deploys to, before launch, or a
    different notification method if he'd rather not use Resend.

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
- **Offline mascot, built as a real connection-status banner.** Andrea's
  snippet (preet_7613) was CSS-only — no HTML/SVG was pasted with it, so
  `ui/OfflineFace.tsx` is a reconstruction built to match the given
  keyframes' intent (blink, wandering pupils, a mouth that draws itself in),
  not a pixel copy of artwork that was never provided. Wired to a real
  `navigator.onLine` + `online`/`offline` listener (`lib/onlineStatus.ts`,
  same `useSyncExternalStore` pattern as StickyBar/chromeAccent) rather than
  just being a static decoration. Made it a non-blocking bottom-left toast
  instead of a full-screen takeover — already-loaded pages keep working
  offline, so blocking the whole screen would overstate the problem; it
  auto-clears the instant the browser fires `online` again. Positioned
  bottom-left specifically to avoid colliding with `ContactRail`, which
  already owns bottom-right. Verified in-browser by faking `navigator.onLine`
  and dispatching real `online`/`offline` events, since there's no real
  network to pull.

## Phase 2 — caustics hero, TornEdge, PaperCard

- **Caustics hero shader built as originally scoped** (brief §3.3): R3F
  orthographic full-bleed quad, custom GLSL (layered-sine caustics, not a
  real light simulation, but cheap and convincing), pointer ripple that
  decays over ~1.2s (JS-side exponential decay driving a uniform, not a
  shader-side timer), scroll-depth darkening toward `--color-nero`. Colors
  read live from the CSS custom properties at mount so the shader stays
  driven by the token system. Gated per brief §10: static gradient poster
  first (matches the shader's mood so there's no flash), canvas only mounts
  after IntersectionObserver + requestIdleCallback, skipped entirely under
  `prefers-reduced-motion`, `deviceMemory < 4`, or failed WebGL context
  creation. `CausticsScene` is `next/dynamic` with `ssr:false` so the
  three.js/R3F chunk doesn't ship on routes without it.
- **Hero copy corrected against the brief.** The Phase-1 placeholder had
  reused `brand.positioning` ("Non facciamo solo...") as the hero headline —
  the brief actually specifies a different headline ("Trasformiamo brand in
  storie...") with the positioning line reserved for a separate manifesto
  strip further down. Added `hero.headline`/`hero.sub` to `content/site.ts`
  and split the two apart; the manifesto strip now exists as its own
  section. Wired up `cta.secondary` ("Guarda i progetti") too, which had
  been defined since Phase 1 but never rendered anywhere — links to a new
  `#progetti` anchor on the ScrollScatter section.
- **Real bug found and fixed: `TornEdge`'s torn-paper "valleys" leaked the
  page's base cream background.** The jagged path only fills part of its
  bounding box by design (that's what makes it read as torn rather than a
  solid rectangle) — the gaps need the *adjacent* section's color behind
  them, not nothing. Original one-prop API (`fill`) couldn't express that;
  changed to `from`/`to` (from = wrapper's own background, to = the jagged
  shape torn through it) and updated all three call sites on the home page.
- **Second real bug: Framer Motion's `whileInView` prop never fired** on the
  `TornEdge` SVG in testing, even when the element was confirmed 100%
  inside the viewport (checked via `getBoundingClientRect` and computed
  `clip-path` directly in the browser — it stayed stuck at its `initial`
  value regardless of scroll position or method). Switched to the
  `useInView` hook against an explicit wrapper `ref` + a manual `animate`
  prop instead, which fired correctly — confirmed for all three seams on
  the home page after the fix. Root cause not fully isolated; noting the
  pattern (hook + ref, not the `whileInView` prop) in case it recurs
  elsewhere.
- **`PaperCard` built as the general 3D-tilt primitive** (DESIGN-PLAN §3.4):
  pointer-tracked rotateX/rotateY (max 9°, spring-smoothed), a translateZ-ish
  layered back panel (`--color-abisso`) behind the content face
  (`--color-adriatic`), a pointer-following radial sheen, tilt disabled
  below 1024px and replaced with a touch press-scale, all skipped under
  `prefers-reduced-motion`. Its originally-planned use case ("Cosa facciamo"
  cards) was superseded by the more elaborate `ServiceCard3D` glass cards
  built earlier from a direct Uiverse request — applied it instead to the
  two "Extra" add-on cards in `/metodo`'s pricing section, so it's a real,
  visible primitive rather than unused code. Expect further real
  applications once Phase 3/4 build out the still-missing sections (Chi
  siamo, testimonianze, Loro/Noi, vantaggi).

## Rapid-fire real facts (same session, post Phase 2)

Andrea sent a batch of real facts and assets in quick succession; each
landed in `content/site.ts` as it arrived rather than being queued:

- **Logo — third and current version.** An image captioned "this one is the
  logo": mixed-case "Adriatica.", no sparkle, on a black→blue gradient chip.
  `ui/Wordmark.tsx` rewritten to drop the uppercase transform and the
  sparkle icon entirely (the `ui/Sparkle.tsx` component now only used by
  `ServiceCard3D`'s badge, not the wordmark). The gradient-chip background
  itself wasn't applied to the inline header/footer wordmark — that chip
  reads as a standalone badge treatment (social avatar, favicon-style use),
  not something to wrap around text that already sits on our own colored
  world backgrounds everywhere it appears.
- **Font switched from Archivo to Poppins**, site-wide (`--font-display`).
  Two independent real documents pointed the same way: the confirmed logo's
  rounder letterforms, and the Nutriva case study, which documents Poppins
  by name as its typeface. High-confidence inference, not a direct "yes,
  Poppins" from Andrea — see open question #12.
- **Real case study: Nutriva.** A healthy-food brand-identity project — logo,
  palette (Terracotta/Salvia/Senape/Crema/Espresso), Poppins typography,
  app-icon mockups. This is a brand-identity case study, not a social-growth
  one — no follower counts or "before/after" metrics to show, which matters
  for Phase 3's Progetti section: the stat-trio format DESIGN-PLAN §3.4
  describes (count-up numbers like "da 3 a +500") doesn't fit this project
  and shouldn't be forced onto it once real Progetti cards replace
  `ScrollScatter`'s placeholders.
- **Second case study, Rosso Pomodoro, not yet readable** — see open
  question #13.
- Instagram (`adriaticacomunicazione`), LinkedIn (Andrea's personal
  profile), Calendly (`team_adriatica`), base city (Roma only), founding
  year (2026), and team framing (solo + 2 external collaborators) all
  confirmed directly — see resolved items #1, #4, #6, #7 above.

## Follow-up round: reviews, photo pricing reverted, Rosso Pomodoro readable

- **Reviews: built the honest placeholder Andrea asked for.** Confirmed
  he'd rather show "Stiamo raccogliendo le prime recensioni" than
  fabricated ones — added `trustNote` in `content/site.ts`, rendered under
  the hero CTAs in place of the client-avatar-cluster + review-badge the
  brief originally specified there.
- **Photo shoot pricing reverted to "su richiesta."** Andrea had given real
  client prices (€300/€400) last turn; this turn he said to leave it as
  "su richiesta" after all. Reverted `PricingSection`'s addon card; the
  €300/€400 figures stay as a code comment in `content/site.ts` in case he
  wants them displayed later rather than re-asking.
- **Rosso Pomodoro PDF now readable** — see resolved item #13. Content
  logged, not yet added to the live site (separate publish approval still
  needed, per item #2).
- **Stale dev-server state caused a real-looking but fake bug.** After the
  Poppins font rename a few turns back, the long-running dev server (alive
  since before that commit, survived a machine sleep earlier in the
  session) threw `ReferenceError: archivo is not defined` in the browser —
  the old compiled chunk still referenced the renamed variable. Source had
  no such reference; killing the process on port 3000, clearing `.next/`,
  and restarting fixed it. Worth remembering: a long-lived dev server
  across a big rename can serve stale compiled output even though the
  source is correct — restart it after renames like that instead of
  trusting Fast Refresh to fully recover.
- **Built `/privacy` and `/cookie-policy`, not requested but blocking every
  form on the site.** Every consent checkbox (home CTA, `/consulenza`,
  `/analisi`, `/contatti`) already linked to `/privacy`, and the footer
  already linked to both — both were 404s until now. Content is an honest,
  accurate description of how the site's forms *actually* work today
  (Resend as the only data processor, Calendly as a separate third party on
  `/consulenza`, no analytics/tracking cookies at all, Andrea named as an
  individual with no P.IVA yet — consistent with item #5). This is **not
  professional legal review** — worth having a lawyer confirm it once the
  P.IVA situation resolves, especially the retention/rights language.
  Cookie Policy correctly states no tracking cookies exist, so no
  cookie-consent banner is legally needed yet — but if analytics get added
  later (Vercel Analytics, GA, etc.), both this page and a consent banner
  will need building then.
