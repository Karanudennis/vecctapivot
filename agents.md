# AGENTS.md — VECCTAPIVOT Gateway

## What this project is
A static-first, zero-framework marketing/services gateway for VECCTAPIVOT ENTERPRISES (Kenya / Central East Africa). Originally generated from a "Master System Blueprint Document" specifying 8 static pages, exactly 7 service slots per desk (49 total), a keyword search on the index, and native `tel:` / `sms:` / `mailto:` contact channels.

It has since grown into a **7×7×7 service matrix**: 7 pillars (desks) → 7 services each (49) → 7 guided engagements each (343), with serverless intake. Each engagement carries a detailed job description, requirements list and timeframe. Two intake flows with server-issued unique references persist to Netlify Database (Postgres via Drizzle): ticket booking (TKT-…) and job requests (JOB-…). A tracking page looks references up.

## Key files
- `index.html` — landing: hero + search (`#deskSearch` matches pillar keywords AND all 49 service titles via `js/matrix.js`), 7 pillar cards, how-it-works strip, 12-question FAQ, 4-channel contact strip, footer.
- `digital.html`, `academic.html`, `transport.html`, `sourcing.html`, `fixer.html`, `agency.html`, `statutory.html` — the 7 pillars. Each `.slot` has a clickable `slothead` that lazily renders the 7 engagement steps (`N.M.K`) into its `.drawer` from `js/matrix.js`, with Book Ticket / Request Job / WhatsApp buttons deep-linking to the forms.
- `ticket.html` — ticket booking: cascade selects (pillar → service → engagement), client details, POSTs `/api/ticket`, shows the unique TKT number.
- `job.html` — job request: same cascade, plus engagement-specific data-entry fields and upload/document checklist rendered from the matrix, deadline + priority, POSTs `/api/job`, shows the unique JOB number.
- `track.html` — reference lookup against `/api/track?ref=`.
- `js/matrix.js` — generated `window.VP_MATRIX` (7 pillars × 7 services × 7 engagements with descriptions, requirements, timeframes, data-entry fields, document checklists). **Generated — do not hand-edit.**
- `js/common.js` — footer injection (`#siteFoot`), reveal-on-scroll, query-param/date helpers.
- `style.css` — single design system. Palette: dark navy + engraved gold; fonts Fraunces (display) + IBM Plex Sans via @import. Blueprint-grid background.
- `scripts/gen-matrix.mjs` — **source of truth** for all matrix copy and desk pages. Edit the DESKS/SLOTS/SPEC blocks here, then run `node scripts/gen-matrix.mjs` to regenerate `js/matrix.js` and all 7 desk pages. Never hand-edit desk pages or matrix.js.
- `netlify/functions/` — `ticket.mts` (POST /api/ticket), `job.mts` (POST /api/job), `track.mts` (GET /api/track), `_lib/` shared (DESKS/SERVICES catalog, reference generator `TKT-YYMDDDRAND`, validation).
- `db/schema.ts` — Drizzle schema (`tickets`, `jobs` tables). Migrations in `netlify/database/migrations/` (applied automatically at deploy). After schema edits run `npx drizzle-kit generate --name <slug>`.
- `templates.txt` — canonical copy blocks and channel constants — keep future copy edits consistent with it.
- `logo.png` — brand mark supplied by the client (96×96 PNG; source master lives outside the repo). Used in headers, footer and favicon.

## Conventions & non-obvious decisions
- Desk numbering: service slots are `N.M`, engagements `N.M.K` (e.g. 7.3.2); kickers/card badges read "Pillar N · Desk N". Blueprint slot copy is reproduced verbatim — don't paraphrase.
- Contact constants (single source of truth: templates.txt): hotline `+254788099685`, mailbox `vecctapivotenterprises@gmail.com`, WhatsApp `https://wa.me/254788099685` (same number). Every page carries all four channels in the fixed bottom bar.
- Reference numbers are issued **server-side** in the functions (`makeRef`), never client-side, and stored in Postgres so `track.html` can resolve them. Format: `TKT-`/`JOB-` + YY + month letter (A-L, base-36 month) + day-of-year 3 digits + 4 random base-36 chars.
- Forms intentionally do NOT accept file uploads; they record the engagement's upload/document checklist and the agreed delivery lane (WhatsApp/email/desk). Blueprint keeps the public surface static and backend-minimal.
- FAQ content lives inline in index.html (array of [q, a] pairs); footer is injected by `js/common.js` so every page stays in sync.
- Netlify deploy needs no build command; publish directory is the repo root.

## Do not
- Do not add frameworks, bundlers, analytics scripts, or third-party embeds. The only external dependency is the Google Fonts @import (acceptable trade-off, has system-font fallbacks).
- Do not change the 7-slots-per-desk or 7-engagements-per-service structure without updating `scripts/gen-matrix.mjs`, the index `data-keywords`, and the FAQ copy (matrix counts are quoted in several places).
- Do not hand-edit `js/matrix.js` or the 7 desk pages — regenerate via `node scripts/gen-matrix.mjs`.