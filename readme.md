# VECCTAPIVOT GATEWAY

The official public gateway for **VECCTAPIVOT ENTERPRISES** (BRS Status: BN-AYSO8LRE), a multi-sector services operation based in Central East Africa. The site presents 49 cross-cutting solution desks across 7 business sectors, with real-time keyword search and native device contact channels.

## Architecture (per the Master System Blueprint)

- **100% static HTML** — no runtime frameworks, no external JavaScript, no third-party widgets. Every page is self-contained so it loads fast on standard mobile carrier networks and can never suffer stylesheet corruption across desks.
- **`index.html`** — Main Ingress Hub: real-time keyword search (client-side, ~30 lines of vanilla JS, no dependencies) plus 7 navigational cards, one per desk.
- **7 standalone workspace desk files**, each showing exactly 7 service slots (49 total):
  - `digital.html` — Desk 1: Digital & Brand Systems (BRS filings, branding, vaults)
  - `academic.html` — Desk 2: Academic & Testing Logistics (mock bundles, KASNEB, CBC)
  - `transport.html` — Desk 3: Transport Brokerage Hub (rides, couriers, cargo, insurance)
  - `sourcing.html` — Desk 4: Merchandise Sourcing Links (produce, audits, customs)
  - `fixer.html` — Desk 5: Independent Fixer Desk (inspections, permits, disputes)
  - `agency.html` — Desk 6: General Agency Core (retainers, ledgers, escrow)
  - `statutory.html` — Desk 7: Statutory & Portal Logistics (eCitizen, NTSA, KRA iTax…)
- **`ticket.html`** — service ticket intake page (extra to the blueprint): a plain form that composes a pre-filled email/SMS in the visitor's own mail or SMS app.
- **`style.css`** — the single shared stylesheet (kept lightweight).
- **`templates.txt`** — reusable corporate copy blocks and channel constants.
- **`logo.png`** — gateway brand mark.

## Communication channels (decoupled core)

No third-party chat widgets. All requests transmit via native device protocols:

- Hotline dialer: `tel:+254788099685`
- Carrier SMS: `sms:+254788099685`
- Secure mail tunnel: `vecctapivotenterprises@gmail.com`

## Running locally

Any static file server works, e.g.:

```bash
npx serve .          # or
python3 -m http.server 8080
```

Then open the printed URL in a browser. No build step is required — deploy by pushing the directory as-is (Netlify serves it as a static site with no build command).