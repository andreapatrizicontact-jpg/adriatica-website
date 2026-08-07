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
