# DESIGN-PLAN — Adriatica Marketing Studio

Phase 0 deliverable. Covers the token system, a wireframe of every page and every
piece of global chrome, and the justification for the signature element. Nothing
below gets built until this is approved.

---

## 1. Token system

### 1.1 Color

Base palette is fixed by the brief (§3.1) — sampled from the client's own business
card and Instagram assets. Tailwind v4 `@theme` tokens, no arbitrary hex in
components:

```css
@theme {
  --color-adriatic:    #004AAD;  /* primary brand blue */
  --color-abisso:       #25227A;  /* deep navy — dark sections */
  --color-lime:          #7ED957;  /* acid lime — services world */
  --color-periwinkle: #5271FF;  /* CTA pill fill */
  --color-inchiostro: #0B0C2A;  /* text on light / text in pills */
  --color-carta:          #F5F2EA;  /* off-white paper */
  --color-kraft:          #BC9765;  /* torn cardboard edge */
  --color-bianco:        #FFFFFF;
}
```

Derived, computed (not hand-picked) tones — kept to a strict minimum so the
palette doesn't drift into "generic SaaS with 40 shades of blue":

- `--color-adriatic-60` / `-30` — alpha variants of adriatic for the shader's
  darkest depth and for glass/overlay panels only.
- `--color-inchiostro-70` — body copy on `--carta` (never pure black — softer,
  matches the off-white paper).
- `--color-lime-dim` (`#5FAE3E`) — hover/pressed state for lime elements, not a
  lighter tint (light tints of lime go pastel and lose the "acid" quality).

Two-world rule (brief §3.1) is enforced structurally, not just visually: every
`<section>` carries a `data-world="blue" | "green"` attribute that drives which
token set is active for children (`--surface`, `--ink`, `--accent` get reassigned
per world), so a component like `PaperCard` or `Pill` never hardcodes which world
it's in — it inherits.

### 1.2 Type scale

Two families carry all display/body text; a third is utility-only.

| Token | Size (`clamp`) | Weight/wdth | Line-height | Tracking | Use |
|---|---|---|---|---|---|
| `--text-display-2xl` | `clamp(3.5rem, 11vw, 11rem)` | Archivo 900, wdth 100 | 0.88 | -0.03em | Hero headline only |
| `--text-display-xl` | `clamp(2.75rem, 8vw, 7rem)` | Archivo 900, wdth 100 | 0.88 | -0.03em | Manifesto strip, page heroes (`/metodo`, `/analisi`) |
| `--text-display-l` | `clamp(2.25rem, 5vw, 4rem)` | Archivo 800, wdth 100 | 0.92 | -0.02em | Section headers ("Cosa facciamo", "Progetti"…) |
| `--text-display-m` | `clamp(1.5rem, 3.2vw, 2.25rem)` | Archivo 800, wdth 112 | 0.95 | -0.01em | Card headlines, accordion step titles |
| `--text-body-l` | `clamp(1.125rem, 1.4vw, 1.375rem)` | Instrument Sans 500 | 1.5 | 0 | Hero sub, lead paragraphs |
| `--text-body-m` | `1rem` | Instrument Sans 400 | 1.6 | 0 | Standard body |
| `--text-body-s` | `0.875rem` | Instrument Sans 400 | 1.5 | 0 | Captions, footnotes, form helper text |
| `--text-mono` | `11px`–`12px` | Geist Mono 500 | 1.4 | 0.18em, uppercase | Eyebrows, stat captions, field labels, nav numbering |

Rule: nothing above 40px renders in anything but Archivo Black/ExtraBold. Nothing
in Archivo drops below 24px — once we're below that threshold we're in Instrument
Sans territory. This line is what keeps the type system from turning into the
generic "one bold display font, everything else system-ui" pattern.

### 1.3 Spacing

4px base unit, exposed as a restrained scale (not the default Tailwind 1–96
sprawl):

```
--space-1   4px      --space-8    32px      --space-32   128px
--space-2   8px      --space-12   48px      --space-48   192px
--space-3   12px     --space-16   64px
--space-4   16px     --space-24   96px
--space-6   24px
```

Section vertical rhythm: `--space-24` top/bottom on mobile, scaling via `clamp()`
to `--space-48` on desktop — one token (`--section-pad-y`), not a per-section
guess. Card internal padding is always `--space-6` (mobile) / `--space-8`
(desktop). Never an odd value outside this scale.

### 1.4 Shape — the anti-"rounded-2xl-shadow-lg" rule

This is the single most important restraint in the system, because it's the
default the brief explicitly forbids.

- **Blue world** (hero, about, contact, CTA pills): CTAs are genuinely pill-shaped
  (`border-radius: 999px`) — that's a real, deliberate lockup from the client's
  own asset (the periwinkle pill on the business card / story slides), so it's
  earned, not decorative. Everything else in the blue world — panels, the
  founder-portrait frame, the contact card — is **rectangular, 0 radius**. No
  intermediate `rounded-lg` anywhere.
- **Green world** (services, process, cases): 0 radius, full stop. These are
  paper cutouts — paper doesn't have `border-radius: 16px`, it has a torn or
  scissor edge. Corners are either square or literally torn (SVG mask).
- **No blur shadows, anywhere.** Depth in the green world comes from a layered
  "print misregistration" offset instead: a `PaperCard` is three flat layers
  (kraft backing, lime face, `--inchiostro` type) offset by 3–5px on `translateZ`,
  the way an off-register screen print looks. Depth in the blue world comes from
  the shader's own darkening-with-depth, not from `box-shadow`.
- Borders where they appear are **2px solid `--inchiostro`**, mimicking the
  thick-marker outline visible on the client's own cutout-arrow assets — never a
  1px hairline `border-gray-200`.

### 1.5 Motion tokens

Fixed by brief §3.4:

```
--motion-fast   180ms   cubic-bezier(0.22, 1, 0.36, 1)   /* entrances */
--motion-base   320ms   cubic-bezier(0.22, 1, 0.36, 1)
--motion-slow   620ms   cubic-bezier(0.65, 0, 0.35, 1)   /* transitions, page wipes */
```

All three are exposed as CSS custom properties and as `motion`/Framer variants in
`lib/motion.ts`, so no component hand-writes an easing curve. Every animated
component checks `useReducedMotion()` (or the CSS `@media (prefers-reduced-motion)`
equivalent) and has an explicit reduced state — not just "animation: none",
but the specific fallback described per-effect in brief §3.4.

### 1.6 Secondary motif: the taped paper-cutout

Not named in the brief's token list but present in the client's own Instagram
assets (the marker-outlined, tape-textured arrow cutouts) and reused throughout
the green world as the scroll-cue and list-marker system — `ui/PaperCutout.tsx`,
an SVG primitive parameterized by rotation and direction (down/right), with a
torn-paper fill and two diagonal "tape" rects at fixed offsets. This keeps a
second, consistent hand-made mark in the system instead of a generic chevron or
Lucide arrow icon.

---

## 2. Wireframes

Legend: `[[BLUE]]` = `--adriatic`/`--abisso` world, `[[GREEN]]` = `--lime`/`--kraft`
world, `≈≈≈` = torn-edge transition.

### 2.0 Global chrome (present on every page)

```
┌─────────────────────────────────────────────────────────────┐
│ ▓ sticky provocation bar — rotating line · dismiss ×         │  [[BLUE]] abisso
├─────────────────────────────────────────────────────────────┤
│ Adriatica.        [avatar··· 4.x★ cluster]   (Prenota) [≡ 01]│  header, transparent→blue on scroll
└─────────────────────────────────────────────────────────────┘
                         ... page content ...
┌─────────────────────────────────────────────────────────────┐
│ Adriatica.   Servizi     Studio      Contatti      P.IVA ··· │  footer, abisso
│ tel · email · social      Privacy · Cookie · credit           │
└─────────────────────────────────────────────────────────────┘
                                                    ┌──────────┐
                                                    │ ☎ 📧 rail │  fixed, bottom-right
                                                    └──────────┘
```

Overlay nav (triggered by `[≡ 01]`), full-bleed `--abisso`:

```
┌─────────────────────────────────────────────────────────────┐
│ Adriatica.                                              ✕    │
│                                                                │
│   01  Home                          ┌───────────┐            │
│   02  Il Metodo                     │ thumbnail │ (on hover)  │
│   03  Consulenza gratuita           └───────────┘            │
│   04  Analisi social gratuita                                │
│   05  Contatti                                                │
│                                                                │
│   ☎ +39 349 244 2534   ✉ andreapatrizicontact@gmail.com      │
│   IG · TikTok · LinkedIn                                       │
└─────────────────────────────────────────────────────────────┘
```

### 2.1 `/` — Home

```
[[BLUE — hero, caustics canvas fills viewport]]
┌─────────────────────────────────────────────────────────────┐
│  SOCIAL MEDIA MARKETING & COMUNICAZIONE — ROMA   (mono)       │
│                                                                 │
│  Trasformiamo brand in storie                                  │
│  che le persone vogliono                                       │
│  seguire.                            (display-2xl, on water)   │
│                                                                 │
│  Uniamo strategia, contenuti e dati per                        │
│  far crescere davvero la tua presenza online. (body-l)         │
│                                                                 │
│  (● Prenota una call gratuita)   Guarda i progetti →           │
│                                                                 │
│  [●●●●] Clienti seguiti dal TODO_CLIENT   ★ TODO_CLIENT        │
└─────────────────────────────────────────────────────────────┘
[[BLUE — manifesto strip, abisso]]
┌─────────────────────────────────────────────────────────────┐
│      Non facciamo solo social media marketing.                 │
│      Costruiamo ‾‾connessioni‾‾.        (display-xl, 8vw)      │
└─────────────────────────────────────────────────────────────┘
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈ torn edge, kraft → lime ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈
[[GREEN — cosa facciamo]]
┌─────────────────────────────────────────────────────────────┐
│  COSA FACCIAMO  (mono eyebrow)                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Social   │ │ Content  │ │Strategia │ │ Siti Web │  3D tilt  │
│  │ Media    │ │ Creation │ │ & Ads    │ │ che      │  paper    │
│  │ Manage-  │ │          │ │          │ │ convert. │  cards    │
│  │ ment     │ │          │ │          │ │          │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────────────┘
[[GREEN — progetti]]
┌─────────────────────────────────────────────────────────────┐
│  PROGETTI                                                       │
│  ┌───────┐  cliente: TODO   [ 6 mesi | 3→500 | +140 pag.1 ]    │
│  │ 9:16  │  problema → intervento                              │
│  │ video │                                                      │
│  └───────┘  (×3, stacked mobile / row desktop)                 │
└─────────────────────────────────────────────────────────────┘
[[GREEN — logo wall, 3D depth marquee]]
┌─────────────────────────────────────────────────────────────┐
│ row1 →→→ logo logo logo logo   (translateZ 0, fast)            │
│ row2 ←←← logo logo logo logo   (translateZ -40, mid)           │
│ row3 →→→ logo logo logo logo   (translateZ -80, slow)          │
└─────────────────────────────────────────────────────────────┘
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈ torn edge, lime → abisso ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈
[[BLUE — chi siamo]]
┌─────────────────────────────────────────────────────────────┐
│  ┌─────────┐   Chi siamo? 👋                                   │
│  │ Andrea  │   Siamo Adriatica, un team di creativi e           │
│  │ portrait│   strateghi digitali.                              │
│  └─────────┘   [founder paragraph, 2–3 sentences]                │
└─────────────────────────────────────────────────────────────┘
[[BLUE — testimonianze]]
┌─────────────────────────────────────────────────────────────┐
│  [▶ 0:24] [▶ 0:18] [▶ 0:31]     ‹  "quote quote quote…"   ›    │
│  video grid                     written carousel                │
└─────────────────────────────────────────────────────────────┘
[[BLUE — CTA finale]]
┌─────────────────────────────────────────────────────────────┐
│  Pronto a crescere davvero?     [ nome / email / messaggio ]   │
│  (● Prenota una call gratuita)  [           Invia          ]   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 `/metodo` — Il Metodo

```
[[BLUE hero]]  Il nostro metodo. Zero fuffa.     │ 01 Loro/Noi   (sticky
                                                  │ 02 Processo    in-page
                                                  │ 03 Vantaggi    TOC,
                                                  │ 04 FAQ         active-highlight)
≈≈≈ torn → green ≈≈≈
[[GREEN — Loro / Noi]]
┌───────────────────────┬───────────────────────┐
│ LORO           (carta)│ NOI          (adriatic)│
│ grey type              │ white type              │
│ · ti vendono cosa hai  │ · ti chiediamo cosa      │
│   chiesto              │   serve davvero          │
│ · rincorrono i like    │ · rincorriamo richieste, │
│                        │   prenotazioni, vendite  │
│ …×8 rows, staggered-in │                          │
└───────────────────────┴───────────────────────┘
[[GREEN — il processo, numbered accordion]]
01 Analisi ▾        [open: 3–4 sub-bullets]
02 Strategia ▸
03 Produzione ▸
04 Distribuzione ▸
05 Community ▸
06 Report & iterazione ▸
[[ABISSO — founder pull-quote]]
   " ... " — large, lime on abisso        — Andrea Patrizi
[[GREEN — vantaggi]]  [card][card][card]
                       [card][card][card]
[[GREEN/CARTA — FAQ]]  8-item accordion
[[GREEN — PER GOOGLE — SEO]]  (mono eyebrow, long-form block, muted)
[[BLUE — CTA]]
```

### 2.3 `/consulenza` — Consulenza gratuita

```
minimal header: Adriatica.                          ☎ +39 349 244 2534
[[BLUE hero]] La tua prima mossa è gratis.
  3 bullet: cosa copriamo · quanto costa (niente) · cosa NON è (una vendita)
[[GREEN]] come funziona — 3 step, numbered
[[BLUE]] credibility block — Andrea, mini-bio, TODO_CLIENT stat
[[GREEN]] FAQ (4)
[[CARTA/BLUE]] booking:
  ┌──────────────────────────────┐
  │  Calendly embed (env URL)    │  ← fallback: native form → /api/contatti
  └──────────────────────────────┘
```

### 2.4 `/analisi` — Analisi social gratuita

```
[[BLUE hero]] Scopri cosa frena il tuo profilo. Gratis, in 48 ore.
[[CARTA form]]
  handle IG/TikTok · sito · settore · obiettivo (select)
  nome · email · telefono (opz.) · [ ] consenso GDPR → /privacy
  [ Invia la mia richiesta ]
       ↓ on submit
[[GREEN confirmation]]
  ✓ Bio & posizionamento   ✓ Cadenza pubblicazione   ✓ Mix formati
  ✓ Hook / primi 3 sec.    ✓ Hashtag & SEO           ✓ Coerenza cover
  ✓ CTA presenti           ✓ Tempo risposta community ✓ Ads sì/no
  ✓ Delta competitor        ✓ …            (12 total)
  "Ti rispondiamo entro 48 ore."
[[GREEN]] before/after ×3 (growth examples)
[[GREEN]] PER GOOGLE — SEO long-form
```

### 2.5 `/contatti` — Contatti

```
[[BLUE]]
┌───────────────────────────┬───────────────────────────┐
│ FORM                       │ CONTATTO DIRETTO           │
│ nome · azienda · email     │ ☎ tel: link                │
│ telefono · budget (select) │ ✉ mailto: link              │
│ messaggio · [ ] GDPR       │ 📍 città base                │
│ [ Invia ]  inline zod err. │ risposta entro X · WhatsApp │
│                             │ IG · TikTok · LinkedIn      │
└───────────────────────────┴───────────────────────────┘
[[map or stylised SVG Italy, marker on base city — only if perf allows]]
[[orari / disponibilità]]
[[FAQ ×2]]
```

---

## 3. Signature element — justification

The caustics hero earns the "spend the boldness here" budget the brief allows
because it's the only element that does three jobs at once instead of one: it
**is** the brand mark (the studio is named after the Adriatic, the client's own
content already runs pool-caustics textures, so this isn't a generic "cool WebGL
hero" bolted onto an unrelated brand — it's the most literal possible visual
translation of the name "Adriatica"), it **is** the primary interaction (pointer
ripple + scroll-depth darkening give the hero a reason to invite touch/scroll
instead of just sitting there, which is what separates it from a looping video
background), and it **is** the performance-budget line in the sand: because it's
the one deliberately expensive thing on the site, everything else in the token
system above — no blur shadows, no rounded-2xl, restrained spacing scale, cheap
CSS-3D for the paper cards instead of a second WebGL surface — exists specifically
so that this one effect can be expensive without the site missing its Lighthouse
and CLS targets. One bold thing, disciplined everywhere else, is the whole design
argument of this brief; the shader is where that argument is made concrete.

---

## 4. Open questions carried to `DECISIONS.md`

Per brief §11 — none of these block Phase 0, but they gate real copy going into
`content/site.ts` in Phase 1: primary base city, real client names/logos and
whether case metrics are publishable, real review score/count, founding
year and team size framing, P.IVA/legal entity, Calendly URL, social handles,
production domain. Placeholders (`TODO_CLIENT`) shown in the wireframes above
mark exactly where these land.
