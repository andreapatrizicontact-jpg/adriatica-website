# Adriatica Studio — site renewal (October 2026)

Status: **built and verified locally, NOT published.** Nothing has been committed, pushed or deployed.
Work lives on branch `site-renewal` (uncommitted). The previous site is preserved on tag
`old-site-2026-10-19` and branch `backup/old-site-with-farsi-wip` (that branch also holds the
never-published `/farsi-trovare` work). The old design, components and styles are deleted from the working tree.

Reference: the approved design kit (`Adriatica-Claude-Code-Handoff`: `design-reference/`, `brand-tokens.json`,
`copy-italiano.json`, `reviews-source.json`, `CONTATTI-E-ROUTE.json`).

## What the visitor gets

- **Home (`/`)**, six blocks with the kit's ids: `#inizio` (hero) · `#servizi` · `#direzione` · `#studio` · `#recensioni` · `#contatti`.
- **Opening video** ("la firma", 6 s, muted) is the opener of the site: shown once per browser session on the homepage, skip button
  ("Entra nello studio") available at once, replay with "Rivedi la firma" in the footer.
- **Cartellino**: in the hero a physics-driven lanyard badge ("Andrea Patrizi — Social Media Manager and Brand Creator") hangs from the top,
  swings and can be dragged and released (mouse, touch, keyboard arrows). It drops in when the intro ends. Reduced motion: still badge.
- **Real contact form** (service chips, name, email, message, privacy consent) wired to the existing Resend backend.
- Everything else that used to be on the long homepage is reachable from the footer and from the services block.

## Route map

| URL | Status | Notes |
|---|---|---|
| `/` | rebuilt | six blocks above |
| `/metodo` | restyled | keeps `#loro-noi #processo #prezzi #faq`; **new `#servizi`** lists all six services (Social Media Management, Content Creation, Strategia & Ads, Siti Web & SEO, Automazione & AI, Il bollino trovabile) + Settori |
| `/consulenza` | restyled | Calendly booking kept (`#prenota`) |
| `/contatti` | restyled | full form (adds azienda / telefono / budget) + direct contacts + FAQ |
| `/analisi` | restyled | free social analysis form → `/api/analisi` |
| `/privacy`, `/cookie-policy` | restyled | legal text untouched, character for character |
| `/progetti` | **new** | the published projects that used to be the scattered cards on the old home |
| `/bollino` | **new** | the "bollino trovabile" offer that used to be a homepage section |
| `/farsi-trovare` | not carried over | was never published (404 live); preserved on the backup branch |
| `/api/contatti`, `/api/analisi` | hardened | see below |
| `/sitemap.xml`, `/robots.txt` | kept | sitemap now lists `/progetti` and `/bollino` |

Legacy homepage fragments (client-side, `components/layout/HashRedirect.tsx`): `/#recensioni` kept · `/#chi-siamo` → `/#studio` ·
`/#progetti` → `/progetti` · `/#bollino` → `/bollino`. `/metodo#servizi` is now a real anchor.

## Contact form and backend

- `POST /api/contatti` and `/api/analisi` (JSON). **200 `{ok:true}` only when Resend really accepted the email.** In production a missing
  `RESEND_API_KEY` or a provider error returns 503 and the form shows the honest error (with a mailto link) and keeps what was typed.
  In development without a key the submission is logged to the server console and answered 200, so the form can be tested.
- 400 validation (Italian messages) · 413 body > 10 KB · 429 rate limit.
- Antispam: honeypot field `website`, in-memory per-IP rate limits (5 deliveries / 10 min, 30 rejected / 10 min) plus a global 40 / hour
  budget per route, CR/LF stripped from anything that reaches the email subject. Same sender and recipient as before
  (`Adriatica — Sito Web <onboarding@resend.dev>` → `contact.email` in `content/site.ts`). No new mail service.
- **Before publishing:** `RESEND_API_KEY` must exist in the Vercel project environment (it did for the previous site). The `onboarding@resend.dev`
  sender only delivers to the Resend account owner's own address, so `contact.email` must be that address.
- Service preselection: the three "Parliamo di…" links carry `data-service="social|shooting|strategy"` and
  `/?servizio=…#contatti`; the form reads both (works from any page).

## Code layout

- `app/globals.css` fonts (self-hosted from `/public/fonts`, licences kept), design tokens, reset, intro first-paint cover. Everything else is a
  co-located CSS Module. Tailwind, three.js, lenis and motion were removed; so were react-hook-form and @hookform/resolvers. Dependencies now:
  next, react, react-dom, resend, zod.
- `components/home/*` the six blocks (+ `Lanyard.tsx`, client) · `components/intro/IntroOverlay.tsx` (client) · `components/contact/ContactForm.tsx` (client)
  · `components/layout/*` header, footer, skip link, hash redirect · `components/pages/*` building blocks and per-page sections · `components/ui/*` primitives.
- `lib/lanyardPhysics.ts` (pure 2D Verlet, no library) · `lib/intro.ts` (events / storage keys / boot script) · `lib/services.ts` · `lib/email.ts`,
  `lib/rateLimit.ts`, `lib/validation.ts` (backend) · `lib/legacyHashes.ts`.
- Copy: `content/home.ts` (homepage, verbatim from the kit), `content/reviews.ts` (the three published reviews, verbatim),
  `content/site.ts` (contact data, services, pricing, projects, FAQ, legal — unchanged except removal of the old homepage-only strings).
- Opening video: `public/intro/intro-1080p.mp4` (desktop, 841 KB) and `intro-phone.mp4` (portrait phones, 427 KB). Only one is ever downloaded.
  Decision: 1080p is visually indistinguishable from the 4K master on normal displays (PSNR 48–60 dB); the 720p is visibly softer and is not used;
  the 4K master (1.58 MB) stays in `Adriatica-Motion-Formats` and is not shipped.
- `app/opengraph-image.jpg` / `twitter-image.jpg` are static files (the dynamic `ImageResponse` route failed locally with sharp 0.35).

## Verification done (local, Chromium pane)

`next build` passes · `tsc` clean · eslint clean · all 9 pages return 200 with one h1 and a canonical · 30 internal link targets and anchors resolve
(no broken link) · no horizontal overflow at 320 / 390 / 768 on all pages · kit comparison of the home sections at 21 widths from 1920 to 320 (computed styles)
· intro: normal, skip, replay (home and from another page), reload, autoplay refused, video error, stall, Escape, unmount, reduced motion (stubbed), one source per device
· lanyard: drop-in, drag, release, keyboard, StrictMode, no console errors · contact form: validation, success (dev fallback), failure in production (honest error,
input kept), preselection from link and URL · reviews: text byte-identical to `content/reviews.ts`.

## Not verified / known limits

- Real iOS Safari, Android, Firefox, desktop Safari; real screen readers; real OS "reduce motion" (emulated); a real Resend delivery (no key used).
- Hash landing on a hard load (`/metodo#servizi`) was checked in the preview pane only, where smooth scrolling does not run in a background tab.
- `next build` prints ~115 Turbopack warnings coming from inside `node_modules` (file tracing through the `node_modules.nosync` symlink). They do not exist in our code.

## Decisions Andrea should look at

1. **Cartellino placement.** Implemented over the kit's water hero (badge hangs in front of the end of the giant wordmark). Alternative: a light, typographic first
   screen like the reference site with the badge as the only protagonist, and the water hero moved below. On phones the rest pose may touch the top of the
   wordmark on short screens and covers the end of the small "SOCIAL MEDIA STUDIO · ROMA" label.
2. **Legal text.** The privacy policy lists the forms as Contatti / Consulenza / Analisi and does not mention the homepage form; the cookie policy says nothing
   is stored, while the intro writes a "seen" flag in `sessionStorage`. Text was not changed. Worth a legal read.
3. **First person on `/metodo`.** The pricing intro and the founder quote are first person (real published copy, kept verbatim) — the brief reserves first person for the studio block.
4. **`/consulenza`** shows the home form variant next to the calendar ("Preferisci scriverci prima?") instead of the old quick form.
5. **Canonical.** `metadataBase`/canonical/sitemap use `https://adriaticastudio.com` (apex) while the live site is served on `www` (apex redirects). Kept as before; consider switching to `www`.
6. **Pilates studio** project card still marked work-in-progress with the placeholder image.

## Publishing checklist (only after Andrea says yes)

1. Review locally (`sh .tools/dev.sh`, http://localhost:3000). 2. Commit on `site-renewal`, push from Andrea's own terminal (no credentials in this environment).
3. Confirm `RESEND_API_KEY` in Vercel. 4. `npx vercel --prod` uploads the **local disk state** (not the git commit): make sure the tree contains exactly what was approved.
5. After deploy: submit one real test message, check the inbox, check `/sitemap.xml`, the social preview and `/#progetti`.

## Update 2026-10-20 (second round)

- New hero from Andrea's mockups: photo of people on the blue carpet, floating cream nav bar (Servizi / Studio / Recensioni, @adriaticastudio, Parliamone),
  "Un’altra prospettiva.", cartellino kept and now centred. Studio method block redone as "Dalle persone. Alle idee." with the three line-art figures;
  handshake illustration on `/contatti`. The old water image was removed.
- Prices removed everywhere for now: `/metodo` pricing section and guarantee, `/bollino` price block, "Budget indicativo" in the full contact form.
  The data stays in `content/site.ts`; the components are parked in `components/pages/_parked/`.
- `/metodo` made neutral: first-person pricing intro and founder quote removed; "io" → "Andrea"; FAQ no longer points to rates.
- Legal text reviewed and rewritten (privacy + cookie policy, dated 20 ottobre 2026): homepage form, hosting (Vercel) and mailbox (Gmail) named,
  IP/antispam, US transfers, correct legal basis (art. 6.1.b instead of "explicit consent"), full list of rights + Garante complaint,
  sessionStorage flag of the intro. This is a careful drafting review, not legal advice; still worth a professional read. Open point for Andrea:
  the policy states publicly that there is no active P.IVA, and the retention period is described by criteria only.
