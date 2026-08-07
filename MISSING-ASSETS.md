# MISSING-ASSETS.md

Tracks brief §8's asset list against what actually exists in `ADRIATICA DATA`
(the client's own folder, copied into `public/brand/source/`).

## Found in `ADRIATICA DATA` — usable now

| Brief asset | Source file | Notes |
|---|---|---|
| Wordmark reference | `source/business-card.png` (1050×600) | Raster only. Per DESIGN-PLAN §1/brief §3.2 the `Adriatica.` wordmark is typeset live in Archivo Black (`components/hero/Wordmark.tsx`), not an image, so this PNG is reference-only for exact color/spacing, not a shipped asset. |
| `andrea-patrizi.jpg` (founder portrait) | `public/team/andrea-patrizi.jpg` | Real photo, supplied by Andrea directly in chat (casual portrait, Colosseum). In use on the home page "Chi siamo" section. |
| Story-slide backgrounds/copy | `source/stories-presentazione/1.png`–`11.png` | These are the actual Instagram story slides — confirmed source for the exact `--adriatic`/`--lime`/`--kraft` tones, the torn-cardboard texture, the taped-arrow cutout motif, and several copy lines already quoted verbatim into DESIGN-PLAN/brief (§5). Used as the visual reference for `TornEdge` and `PaperCutout` builds in Phase 2, not sliced directly (they're flattened story exports, not layered source files). |
| IG highlight-cover icons | `source/3.png`, `4.png`, `5.png` (compass rose on `--adriatic`, 3375×4219) | Not used in the site build — highlight covers, not site assets. Kept for reference only. |

## Found later in the build (raster logo)

| Brief asset | Source file | Notes |
|---|---|---|
| Real logo, raster | `public/brand/logo-adriatica-chip.png` (1000×310, cropped from `LOGO ADRIATICA.png`, original in `source/logo-full-canvas.png`) | Andrea confirmed this as "the logo" — mixed-case "Adriatica.", white text on a black→blue gradient chip, Poppins-like rounded font. Superseded two earlier in-repo wordmark treatments (story-slide colored-period version, then the invoice's all-caps + sparkle version) — see DECISIONS.md. Ready for Phase 6 (favicon/OG generation) once that phase starts. |

## Still missing — no source found anywhere in `ADRIATICA DATA`

- **Vector logo** (`.svg`/`.ai`) — still none. Every wordmark reference so far
  (story slides, invoice PDF, this PNG) has been a flattened raster. The live
  site wordmark stays typeset text (Poppins Black, matching the confirmed
  PNG) rather than an embedded image, so this only matters for favicon/OG
  generation in Phase 6, which can work from the PNG in the meantime.
- `kraft-edge.png/svg` as a standalone cutout asset — being built as a custom
  SVG path in `ui/TornEdge.tsx` instead (procedural, not a bitmap), styled to
  match the texture visible in the story slides.
- `arrow-cutout.png` / `arrow-down-cutout.png` as standalone assets — being
  built as the `ui/PaperCutout.tsx` SVG primitive (see DESIGN-PLAN §1.6),
  matching the taped-marker-arrow look from the story slides rather than
  shipping the flattened PNGs.
- `clients/*.svg` — no client logos found. Logo wall ships with `TODO_CLIENT`
  placeholder marks (typeset client-name chips) until real logos/permission are
  confirmed — see DECISIONS.md item 2.
- `cases/*.mp4` + posters — no case videos found. Case-study slots ship with a
  static gradient poster + `TODO_CLIENT` caption until real vertical clips are
  supplied.

## Not asset-related but found in the folder, noted for later phases

- `Adriatica_Lead_Tracker.xlsx` — internal lead tracker, not site content.
- `SCRIPT EMAIL_DM_CALL.pages` — outreach scripts; may be useful voice/tone
  reference when writing `content/site.ts` copy in Phase 1, not pulled in
  directly.
- An unrelated older static `index.html` draft exists one level up in
  `ADRIATICA DATA/` (navy/indigo/Sora-Inter theme). Superseded by the approved
  DESIGN-PLAN.md palette and system — not used as a basis for this build,
  checked only for factual copy (phone/email matched what's already in the
  brief; no new facts found).
