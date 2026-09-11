/*
  VECCTAPIVOT GATEWAY — 7×7×7 matrix + desk page generator.
  Run:  node scripts/gen-matrix.mjs
  Emits: js/matrix.js (window.VP_MATRIX) and the 7 desk pages.
*/
import { writeFileSync } from "node:fs";

const DESKS = [
  { id: 1, slug: "digital", name: "Digital & Brand Systems", blurb: "BRS registry filings, brand identity packs and secure document vaults." },
  { id: 2, slug: "academic", name: "Academic & Testing Logistics", blurb: "Mock archives, revision booklets, KASNEB vaults and CBC distribution runs." },
  { id: 3, slug: "transport", name: "Transport Brokerage Hub", blurb: "Executive rides, courier runs, cargo freight and transit insurance cover." },
  { id: 4, slug: "sourcing", name: "Merchandise Sourcing Links", blurb: "Farm-gate produce, factory price audits, supplier vetting and customs duty math." },
  { id: 5, slug: "fixer", name: "Independent Fixer Desk", blurb: "Ground proxy units for site inspections, permit queues and enforcement disputes." },
  { id: 6, slug: "agency", name: "General Agency Core", blurb: "Cross-sector retainers, unified ledgers, priority queues and escrow holding." },
  { id: 7, slug: "statutory", name: "Statutory & Portal Logistics", blurb: "eCitizen, passports, NTSA TIMMS, SHA/SHIF, DCI, ArdhiSasa and KRA iTax filings." },
];

/* Blueprint copy — the one-line slot descriptions are reproduced verbatim from the desk pages. */
const SLOTS = {
  1: [
    ["BRS Name Reservation Ingestion", "Managing eCitizen database verification protocols to clear corporate business name paths."],
    ["Partnership Layout Setup (BN2 Form)", "Compiling multi-proprietor business firm configuration layout parameters sheets."],
    ["Business Particulars Official Alterations", "Modifying active registry details parameters or updating county layout boundaries."],
    ["Cessation & Form Deregistration Filings", "Processing corporate closure documentation runs to terminate administrative tax loops."],
    ["Historical Legacy Record Linking", "Migrating manual pre-2017 hardcopy registration credentials into the live BRS portal profile layer."],
    ["Vector Identity Branding Packs", "Custom crafting high-fidelity corporate brand logos, stamps layouts, and merchandise vectors."],
    ["Secure Digital Document Vaults", "Provisioning encrypted offline data vaults storage networks to mitigate local record losses."],
  ],
  2: [
    ["Form 1-4 Joint Termly Mock Bundles", "Assembling inter-county mock assessment archives logs complete with marking schemas keys."],
    ["Printed Bound Topical Revision Booklets", "Processing physical spiral-bound evaluation notes booklets print distributions pipelines."],
    ["KASNEB CPA National Paper Archive Vault", "Unlocking direct cloud vault access portals to multiple multi-year CPA examination resources."],
    ["KASNEB ATD Vocational Revision Kits", "Exporting complete kit portfolios tailored for Accounting Technicians Diploma levels."],
    ["Primary/Junior Secondary CBC Distribution", "Shipping joint school assessment packages bundles out to cluster distribution points channels."],
    ["Hardcopy Revision Notes Digitization Run", "Scanning raw hand-written notes pages structures into clean indexed digital PDF folders."],
    ["Candidate Profile Student Portal Setup", "Standardizing academic uploads constraints maps layers on institutional student portals."],
  ],
  3: [
    ["Point-to-Point Executive Ride Bookings", "Allocating verified salon vehicles or compact cabs for rapid town transfers route lines."],
    ["Last-Mile Motorcycle Courier Runs", "Deploying express top-box courier operators for transit of BRS certificates or logbooks."],
    ["Inter-County Agricultural Lorry Sourcing", "Matching produce traders to heavy cargo truck transport fleets canters slots options weight."],
    ["Cold-Chain Ventilated Cargo Freight", "Brokerage of refrigerator transport vehicles to guard perishable harvest lots distributions."],
    ["Multi-Vans Institutional Fleet Itineraries", "Arranging multi-passenger shuttle scheduling tracks layouts for enterprise groups travels."],
    ["Transit Highway Cargo Telemetry Tracks", "Supervising electronic vehicle trackings arrays to update highway checkpoint statuses logs."],
    ["Transit Cargo Third-Party Insurance Cover", "Issuing instant commercial payload protection cover slips matching cargo values charts."],
  ],
  4: [
    ["Farm-Gate Agriculture Produce Sourcing", "Deploying proxy field handlers to compile harvest grading matrices and weights data."],
    ["Industrial Factory Wholesale Price Audits", "Tracing raw bulk manufacturing price files directly at factory gates to save trader overheads."],
    ["B2B Wholesale Import Corridor Vendor Maps", "Blueprinting cross-border trade supply chain trajectories to global supplier factories."],
    ["Supplier Identification Background Audits", "Executing exhaustive legitimacy and fraud validation assessments on distant suppliers depots."],
    ["Customs Entry Freight Duty Calculations", "Pre-calculating cargo entry manifest values and customs tariff code specifications."],
    ["Prototype Quality Inspection Operations", "Reviewing initial manufacturer article product samples metrics blueprints."],
    ["Long-Term Contract Farming Frameworks", "Drafting legally binding production agreements balancing off-take pricing for cooperatives fields."],
  ],
  5: [
    ["Real Estate Plot Site Inspections", "Despatching ground proxy units to trace land references codes coordinates and beacon structures."],
    ["Pre-Transit Cargo Inbound Tally Counts", "Dispatching manual counting auditing tallies straight to loading bays before container sealing."],
    ["Pending Commercial Permits Proxy", "Physically navigating local sub-county administrative offices lines to clear stuck permit records."],
    ["Property Security Compliance Safety Audits", "Evaluating facility fencing boundaries layout settings and secure perimeter configurations."],
    ["Single Business Permit Zoning Guide Maps", "Re-checking commercial storefront layout configurations against municipal council rules."],
    ["Storefront Operational Spot Check Runs", "Undertaking unannounced ground proxy site visits to verify real partner transaction activity signs."],
    ["Municipal Enforcement Dispute Resolution", "Interfacing directly with local enforcement units lines to handle zoning citation blocks."],
  ],
  6: [
    ["Multi-Desk Project Analytics Retainers", "Consolidating different active pipeline task milestones across sectors into an aggregated report."],
    ["Micro-Merchant Intake Menu Redirections", "Structuring basic mobile macro menu shortcut pathways link grids to manage intakes rows."],
    ["Aggregated Billing Ledger Automated Reports", "Compiling financial balances logs charts to deliver unified statements parameters data."],
    ["Priority Multi-Desk Queue Surcharge Override", "Triggering immediate operational asset reallocations to bypass stalled file deadlines."],
    ["Cross-Border Trade Corridor Logistics Maps", "Mapping inter-county regional transit brokerage tracks layouts straight to consumer market corridors."],
    ["Service Desk Response Telemetry KPI Logs", "Auditing response telemetry data charts to verify individual ground proxy speed."],
    ["Multi-Sector Escrow Milestone Holding Proxy", "Managing independent financial escrow protection pools holdings secure bank statements."],
  ],
  7: [
    ["eCitizen Duplicate ID / Maisha Application", "Filing physical identification card replacements runs and mapping biometric capture slots."],
    ["National Passport Travel Document Renewals", "Structuring international travel papers requests and sub-county processing bookings."],
    ["NTSA TIMMS DL Ingestion & Transfer Management", "Up-linking logbook serial references fields and buyer profile IDs parameters profiles."],
    ["SHA / SHIF Portal Healthcare Transitions", "Registering household dependant headcount lists parameters numbers onto health authorities nodes."],
    ["Certificate of Good Conduct Application Run", "Initiating DCI fingerprint hub selection booking dates slots logs allocations via eCitizen portal."],
    ["ArdhiSasa Official Land Boundary Property Searches", "Pulling certified Ministry of Lands land parcel searches boundary map data charts."],
    ["KRA iTax Mandatory Nil & Active Tax Filings", "Processing annual individual income returns sheets statements and downloading official receipts."],
  ],
};

/* ------------------------------------------------------------------ *
 * Per-service spec.                                                   *
 *  o  = the object of work        p  = place / context of the run     *
 *  a  = final artifact            d  = base processing days (E3)      *
 *  de = data-entry fields (job form)                                  *
 *  up = upload / document checklist (job form + E2 requirements)      *
 *  docs= additional documents specific to the service                 *
 * ------------------------------------------------------------------ */
const SPEC = {
  1: {
    de: ["Registered business name (proposed or existing)", "Name of proprietor(s) & ID numbers", "County / town of operation", "Contact phone & email for the registry file"],
    s: [
      { o: "your proposed business names", p: "the eCitizen BRS name-search queue", a: "a reserved, cleared business name", d: "2–4", de: ["1st, 2nd and 3rd choice business names", "Nature of business (one-line description)", "Proprietor full names & ID numbers"], docs: ["Copy of ID / passport for each proprietor", "KRA PIN certificate", "Proposed name spelling variants"] },
      { o: "your BN2 partnership particulars", p: "the BRS registry filing desks", a: "a registered partnership deed & certificate", d: "3–6", docs: ["Executed partnership deed / agreement draft", "IDs & KRA PINs of all partners", "Passport photos of partners", "Proposed physical business address"] },
      { o: "the registry particulars on file", p: "the BRS alterations counter", a: "an updated certificate of registration", d: "2–5", docs: ["Current certificate of registration", "Board resolution / proprietor consent letter", "Evidence of the change (lease, deed, ID)"] },
      { o: "the cessation / deregistration file", p: "the BRS cessation desk & KRA clearance loops", a: "a cessation notice & closed registry record", d: "5–10", docs: ["Original certificate of registration", "KRA nil-return / clearance evidence", "Letter requesting cessation (signed)"] },
      { o: "pre-2017 hardcopy registration records", p: "the archived BRS record room", a: "a linked, live digital BRS profile", d: "4–8", docs: ["Original / photocopy of old registration certificate", "Any old receipts or file numbers", "Proprietor ID used at original registration"] },
      { o: "your brand identity brief", p: "the design studio workbench", a: "a full vector branding pack (logo, stamp, stationery)", d: "3–5", docs: ["Any existing logo or sketch", "Preferred colours & fonts", "Sample merchandise items to brand"] },
      { o: "your document archive", p: "the encrypted vault provisioning layer", a: "a running secure digital document vault", d: "1–2", docs: ["Documents to archive (scans or hardcopies)", "List of people allowed access", "Preferred vault structure / folders"] },
    ],
  },
  2: {
    de: ["School / candidate name & admission number", "Class or paper level (Form 1-4, CPA section, ATD level)", "Term / sitting the bundle targets", "Delivery point & preferred format"],
    s: [
      { o: "your inter-county mock bundle order", p: "the joint mock assessment archive", a: "compiled mock exam bundles with marking keys", d: "3–5", docs: ["List of subjects & papers needed", "Class / stream sizes", "Preferred paper years"] },
      { o: "your topical revision booklet order", p: "the print & bind production line", a: "spiral-bound topical revision booklets", d: "4–7", docs: ["Topic list per subject", "Cover colour / school branding preference", "Copies required per title"] },
      { o: "your CPA archive vault access", p: "the multi-year CPA paper repository", a: "vault access with indexed past papers & schemas", d: "1–2", docs: ["KASNEB registration number (if any)", "Sections attempted", "Preferred years of coverage"] },
      { o: "your ATD revision kit order", p: "the ATD kit compilation bench", a: "complete ATD level revision kits", d: "3–5", docs: ["ATD level & subjects sitting", "Preferred kit format (print / PDF)", "Quantity per level"] },
      { o: "your CBC assessment package order", p: "the cluster distribution points", a: "delivered CBC assessment bundles at each cluster point", d: "3–6", docs: ["School / cluster delivery list", "Grades & learner counts", "Consolidated delivery schedule"] },
      { o: "your handwritten revision notes", p: "the scanning & indexing bay", a: "clean, indexed digital PDF folders", d: "2–4", docs: ["The hardcopy notes to digitise", "Preferred folder / file naming", "Any pages needing careful handling"] },
      { o: "your student portal profile layer", p: "the institutional portal admin console", a: "a configured candidate profile with upload lanes", d: "2–4", docs: ["Portal URL & provisional login", "Candidate academic documents", "Required upload formats & limits"] },
    ],
  },
  3: {
    de: ["Pickup point & drop-off point", "Cargo / passenger description", "Preferred date & time of transit", "Receiver name & phone"],
    s: [
      { o: "your point-to-point ride order", p: "the verified salon-vehicle roster", a: "a confirmed executive ride with driver details", d: "Same-day", de: ["Pickup & destination streets/estates", "Passenger count & luggage", "Preferred vehicle class", "Time of travel"], docs: ["Receiver contact at destination", "Any child-seat / accessibility needs"] },
      { o: "your last-mile courier parcel", p: "the express top-box courier roster", a: "a delivered parcel with proof of drop", d: "Same-day", docs: ["Item description & fragility note", "Receiver name, phone & pin location", "Declared value (if insured)"] },
      { o: "your agricultural lorry requirement", p: "the inter-county lorry & canter pool", a: "a matched lorry booking with tonnage fit", d: "1–3", docs: ["Produce type & tonnage", "Farm-gate loading point", "Market / store destination"] },
      { o: "your cold-chain freight lot", p: "the refrigerated vehicle brokerage desk", a: "a reefer-verified freight booking", d: "1–3", docs: ["Perishable type & shelf sensitivity", "Required temperature band", "Loading & offloading windows"] },
      { o: "your institutional itinerary", p: "the multi-van shuttle scheduler", a: "a scheduled multi-van itinerary with crew roster", d: "2–5", docs: ["Group size & luggage volume", "Full itinerary (stops & dates)", "Institution authorisation letter"] },
      { o: "your cargo telemetry feed", p: "the highway checkpoint telemetry grid", a: "a live tracking link with checkpoint status logs", d: "1–2", docs: ["Vehicle / container registration", "Route & expected checkpoints", "Monitoring contacts"] },
      { o: "your cargo insurance cover", p: "the third-party transit cover desk", a: "an instant transit insurance cover slip", d: "Same-day", docs: ["Cargo invoice / packing list", "Declared cargo value", "Route & transit dates"] },
    ],
  },
  4: {
    de: ["Product / produce specification", "Target quantity & quality grade", "Budget ceiling per unit", "Delivery region & timeline"],
    s: [
      { o: "your produce sourcing brief", p: "the farm-gate grading fields", a: "a graded, weighed produce allocation with grading matrix", d: "2–6", docs: ["Crop type & target grade", "Volumes needed per week/month", "Preferred collection zones"] },
      { o: "your factory price audit", p: "the factory-gate price ledgers", a: "a factory-gate price audit sheet with landed estimates", d: "2–4", docs: ["Product list to audit", "Current supplier prices (if any)", "Target order volumes"] },
      { o: "your import corridor map", p: "the cross-border vendor network", a: "a vendor-mapped import corridor blueprint", d: "5–9", docs: ["Import product categories", "Origin country / market preference", "Landed-cost target"] },
      { o: "your shortlisted suppliers", p: "the supplier vetting circuit", a: "a legitimacy & fraud audit dossier per supplier", d: "3–7", docs: ["Supplier names & contacts", "Any licences / certificates held", "Payment terms offered"] },
      { o: "your customs entry estimate", p: "the tariff & manifest calculation bench", a: "a pre-calculated duty sheet with HS code mapping", d: "1–3", docs: ["Commercial invoice / packing list", "HS codes if known", "Port / border of entry"] },
      { o: "your prototype samples", p: "the quality inspection bay", a: "an inspection report with sample metrics & photos", d: "2–4", docs: ["Product specification sheet", "Acceptable tolerance ranges", "Sample units to inspect"] },
      { o: "your contract farming framework", p: "the off-take agreement drafting table", a: "a signed contract farming framework", d: "5–10", docs: ["Farm / cooperative details", "Crop schedule & projected yields", "Proposed off-take price band"] },
    ],
  },
  5: {
    de: ["Site / parcel location & access details", "What must be verified on the ground", "Preferred visit window", "Report recipient & format"],
    s: [
      { o: "your plot inspection order", p: "the land reference & beacon grid", a: "a photo-verified site inspection report", d: "2–5", docs: ["Parcel number / title deed copy", "Approximate location map or pin", "Seller / caretaker contact (if any)"] },
      { o: "your inbound cargo tally", p: "the loading-bay counting floor", a: "a sealed, countersigned tally sheet", d: "1–2", docs: ["Packing list / manifest", "Container or vehicle number", "Sealing procedure preference"] },
      { o: "your stuck permit file", p: "the sub-county office permit queues", a: "a cleared or unblocked commercial permit", d: "3–8", docs: ["Permit application reference", "Any demand / stop letters received", "Business location details"] },
      { o: "your property security audit", p: "the perimeter & fencing inspection route", a: "a compliance & safety audit report", d: "2–4", docs: ["Property address & caretaker contact", "Areas of concern", "Existing security arrangements"] },
      { o: "your storefront zoning check", p: "the municipal zoning map registers", a: "a zoning verdict with permit pathway map", d: "2–4", docs: ["Storefront address / plot", "Intended business activity", "Existing permit (if any)"] },
      { o: "your storefront spot-check", p: "the partner transaction activity points", a: "an unannounced spot-check activity report", d: "1–3", docs: ["Storefront location & hours", "What to verify (stock, sales, staff)", "Report format preferred"] },
      { o: "your enforcement dispute", p: "the municipal enforcement liaison desks", a: "a resolved citation with written closure", d: "4–10", docs: ["Copies of citations / notices", "Business registration documents", "Timeline of the dispute"] },
    ],
  },
  6: {
    de: ["Desks / sectors in scope", "Reporting cadence & recipients", "Key milestones to track", "Escalation contact"],
    s: [
      { o: "your multi-desk pipeline", p: "the cross-sector analytics bench", a: "a consolidated analytics retainer report", d: "Recurring", docs: ["List of active projects per desk", "Current milestone status", "Preferred report format"] },
      { o: "your merchant intake flow", p: "the mobile menu configuration grid", a: "a live intake menu with routing links", d: "2–4", docs: ["Products / services offered", "Order intake channels in use", "Staff who receive orders"] },
      { o: "your billing ledger", p: "the aggregated ledger engine", a: "an automated unified statement pack", d: "Recurring", docs: ["Accounts / revenue streams to include", "Statement period", "Recipient list for reports"] },
      { o: "your stalled deadline file", p: "the priority queue override console", a: "an expedited override with reallocated assets", d: "1–2", docs: ["Deadline & original promise date", "Reason for the stall", "Authorised budget for surcharge"] },
      { o: "your trade corridor route", p: "the inter-county & border logistics grid", a: "a mapped corridor plan with costed legs", d: "3–6", docs: ["Origin & destination markets", "Cargo categories", "Border / county checkpoints on route"] },
      { o: "your desk response telemetry", p: "the KPI audit console", a: "a proxy speed & response KPI logbook", d: "Recurring", docs: ["Incident / ticket history exports", "Response time targets", "Ground units in scope"] },
      { o: "your escrow milestone schedule", p: "the escrow holding custody layer", a: "a milestone-gated escrow holding arrangement", d: "3–6", docs: ["Transaction parties & roles", "Milestone schedule & values", "Release conditions agreed"] },
    ],
  },
  7: {
    de: ["Full legal names as on records", "ID / certificate / parcel numbers in play", "Portal account status (has login? reset needed?)", "County & collection point"],
    s: [
      { o: "your duplicate ID / Maisha file", p: "the eCitizen & Huduma intake queues", a: "a booked biometric slot with filed replacement request", d: "3–7", docs: ["Original ID number & copy (if available)", "Police abstract (for lost ID)", "eCitizen account credentials"] },
      { o: "your passport renewal file", p: "the immigration portal & sub-county bookings", a: "a paid, booked passport application with interview slot", d: "3–7", docs: ["Current / expired passport", "ID & birth certificate copies", "eCitizen account credentials"] },
      { o: "your TIMMS vehicle transfer", p: "the NTSA TIMMS portal pipeline", a: "a transferred logbook with mirror-grade DL record", d: "5–10", docs: ["Logbook / number plate copy", "Seller & buyer IDs + KRA PINs", "Vehicle inspection status"] },
      { o: "your household SHA / SHIF transition", p: "the health authority registration nodes", a: "registered household dependants with active SHIF records", d: "2–5", docs: ["IDs of household members", "Dependant list & ages", "Preferred facility / county"] },
      { o: "your good conduct application", p: "the DCI fingerprint hub scheduler", a: "a booked DCI slot & filed application", d: "2–5", docs: ["Original ID copy", "eCitizen account credentials", "Preferred DCI hub location"] },
      { o: "your land parcel search", p: "the ArdhiSasa land registry", a: "an official certified parcel search report", d: "2–6", docs: ["Parcel / title number", "County of registration", "Seller consent note (if purchase-related)"] },
      { o: "your iTax filing obligations", p: "the KRA iTax filing engine", a: "filed returns with official acknowledgement receipts", d: "1–3", docs: ["KRA PIN certificate", "iTax password (or reset request)", "Income records / payslips (active filings)"] },
    ],
  },
};

/* Engagement archetypes — the 7 level-3 subs under every service. */
function engagements(spec, svc) {
  const { o, p, a, d, docs = [] } = spec;
  return [
    {
      t: "Discovery Brief & Scope Lock",
      desc: `A desk officer reaches you on WhatsApp, call or SMS to capture the ${o} brief, confirm eligibility rules and lock the exact scope of the ${p} run before any fee is quoted.`,
      req: ["Reachable phone line for the briefing call", "Basic client or business identification details", "Any prior reference numbers linked to this matter"],
      tf: "Same working day",
    },
    {
      t: "Document & Data Ingestion",
      desc: `We issue your personalised checklist and ingest every document and data field needed to action ${o} — gaps are flagged before work starts, never mid-run.`,
      req: ["Completed data-entry form (fields listed in the job form)", docs.slice(0, 3), "Legible scans or physical originals for verification"].flat(),
      tf: "1–2 working days after your submission",
    },
    {
      t: "Processing & Filing Run",
      desc: `The desk team executes the full run across ${p} — queues, filings, field visits and follow-ups handled end to end while you track the reference number.`,
      req: ["Confirmed scope from the discovery brief", "All ingested documents verified complete", "Working phone line for status pings"],
      tf: `${d} working days on average`,
    },
    {
      t: "Verification & Quality Control",
      desc: `Every output tied to ${o} is cross-checked against source records at ${p} before release — nothing moves on assumption, and anomalies are corrected at the desk.`,
      req: ["Draft outputs issued to you for a quick look", "One confirmation call or WhatsApp to sign off", "Originals available if a registry demands sight"],
      tf: "1–2 working days",
    },
    {
      t: "Handover & Delivery",
      desc: `Your ${a} is handed over the way you choose — digital download, desk pickup or courier dispatch to your address, each with a proof-of-handover note.`,
      req: ["Preferred delivery mode confirmed", "Receiver name & phone if by courier", "Balance settled where a milestone plan applies"],
      tf: "1–3 working days",
    },
    {
      t: "Aftercare & Corrections Window",
      desc: `If any authority, printer or portal rejects part of ${o} within the window, we file corrections and follow up until the record is clean — no fresh engagement fee.`,
      req: ["Reference number from the original engagement", "Copies of any rejection letters or error notices", "Report issues as early as you spot them"],
      tf: "Up to 14 calendar days after handover",
    },
    {
      t: "Retainer Watch & Records Safeguarding",
      desc: `The ${a} is archived to your secure vault, renewal and compliance dates are diarised, and a named officer watches ${p} for regulatory changes that could affect you.`,
      req: ["Opt-in during handover (monthly retainer)", "Designated contact person for renewals", "Standing instruction for annual refreshes"],
      tf: "Continuous — reviewed monthly",
    },
  ];
}

/* ------------------------------------------------------------------ */
const matrix = {};
for (const desk of DESKS) {
  const deskSpec = SPEC[desk.id];
  const defaultDe = deskSpec.de;
  matrix[desk.id] = {
    id: desk.id,
    slug: desk.slug,
    name: desk.name,
    blurb: desk.blurb,
    services: SLOTS[desk.id].map(([title, body], i) => {
      const spec = { ...deskSpec.s[i], d: deskSpec.s[i].d ?? 3 };
      return {
        n: i + 1,
        ref: `${desk.id}.${i + 1}`,
        title,
        body,
        de: spec.de || defaultDe,
        docs: spec.docs || [],
        engagements: engagements(spec, title).map((e, j) => ({ ...e, ref: `${desk.id}.${i + 1}.${j + 1}` })),
      };
    }),
  };
}

const js = `/* VECCTAPIVOT GATEWAY — generated 7x7x7 service matrix. Source: scripts/gen-matrix.mjs */
window.VP_MATRIX = ${JSON.stringify(matrix)};
`;
writeFileSync(new URL("../js/matrix.js", import.meta.url), js);

/* ---------------- Desk pages ---------------- */
const page = (d) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${d.name} — VECCTAPIVOT Enterprises</title>
  <meta name="description" content="${d.blurb} Part of the One Pivot service architecture — 49 services scoped, quoted and tracked end to end, wherever you trade.">
  <link rel="icon" href="logo.png">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="utility">
    <div class="uwrap">
      <span class="uitem"><span class="ubadge">BRS BN-AYSO8LRE</span></span>
      <span class="uitem">Unified Cross-Border Service Architecture &middot; 49 services</span>
      <a class="uitem" href="https://wa.me/254788099685">WhatsApp +254 788 099 685</a>
    </div>
  </div>
  <header class="top">
    <div class="navrow">
      <a class="brand" href="index.html">
        <img src="logo.png" alt="Vecctapivot Enterprises logo">
        <span class="brandname">Vecctapivot<em>Enterprises &middot; Service Desk</em></span>
      </a>
      <nav class="mainnav" aria-label="Primary">
        <a href="index.html#services">Services</a>
        <a href="index.html#process">How We Work</a>
        <a href="track.html">Track</a>
        <a href="index.html#faq">FAQ</a>
      </nav>
      <div class="navcta">
        <a class="btn line sm2" href="job.html">Request a Job</a>
        <a class="btn gold sm2" href="ticket.html">Book a Ticket</a>
      </div>
    </div>
  </header>
  <main>
  <p class="backline"><a href="index.html">&#8592; All Services</a></p>
  <section class="deskhead">
    <span class="kicker">${d.name}</span>
    <h1>${d.name}</h1>
    <p>${d.blurb} Open a service below to read each engagement&rsquo;s exact description, requirements and turnaround &mdash; then book a ticket, request a job or start the conversation on WhatsApp.</p>
  </section>
  <section class="schedule" id="slots">
${d.services
  .map(
    (s) => `    <article class="slot" data-slot="${s.n}">
      <button class="slothead" type="button" aria-expanded="false" aria-controls="drawer-${s.n}">
        <h2>${s.title.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</h2>
        <p>${s.body.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</p>
        <span class="chev" aria-hidden="true">&#9662;</span>
      </button>
      <div class="drawer" id="drawer-${s.n}" hidden></div>
    </article>`
  )
  .join("\n")}
  </section>
  <section class="ctarow">
    <a class="btn gold" href="ticket.html">Book a Ticket &rarr;</a>
    <a class="btn line" href="job.html">Request a Job &rarr;</a>
    <a class="btn line" href="track.html">Track a Reference</a>
  </section>
  </main>
  <div id="guaranteeBar" class="guarantees"></div>
  <nav class="contactbar" aria-label="Contact channels">
    <a class="wa" href="https://wa.me/254788099685" aria-label="Chat on WhatsApp">&#9993; WhatsApp</a>
    <a href="tel:+254788099685" aria-label="Call hotline">&#9742; Call</a>
    <a href="sms:+254788099685" aria-label="Send SMS text">&#9993; SMS</a>
    <a href="mailto:vecctapivotenterprises@gmail.com" aria-label="Email secure tunnel">&#9990; Email</a>
  </nav>
  <footer class="sitefoot" id="siteFoot"></footer>
  <script src="js/matrix.js"></script>
  <script src="js/common.js"></script>
  <script>
    (function () {
      var M = window.VP_MATRIX["${d.id}"];
      var wa = function (txt) { return 'https://wa.me/254788099685?text=' + encodeURIComponent(txt); };
      document.querySelectorAll('.slot').forEach(function (slot) {
        var n = Number(slot.getAttribute('data-slot'));
        var svc = M.services[n - 1];
        var head = slot.querySelector('.slothead');
        var drawer = slot.querySelector('.drawer');
        head.addEventListener('click', function () {
          if (!drawer.dataset.ready) {
            var h = '<ol class="steps">';
            svc.engagements.forEach(function (e, i) {
              h += '<li class="step">'
                + '<div class="stephead"><h3>' + e.t + '</h3><span class="tf">' + e.tf + '</span></div>'
                + '<p class="stepdesc">' + e.desc + '</p>'
                + '<div class="steplabel">Requirements</div><ul class="reqs">'
                + e.req.map(function (r) { return '<li>' + r + '</li>'; }).join('')
                + '</ul>'
                + '<div class="stepbtns">'
                + '<a class="btn sm gold" href="ticket.html?desk=' + M.id + '&service=' + encodeURIComponent(svc.title) + '&engagement=' + encodeURIComponent(e.t) + '">Book Ticket</a>'
                + '<a class="btn sm line" href="job.html?desk=' + M.id + '&service=' + encodeURIComponent(svc.title) + '&engagement=' + encodeURIComponent(e.t) + '">Request Job</a>'
                + '<a class="btn sm ghost" target="_blank" rel="noopener" href="' + wa('Hello VECCTAPIVOT, I need ' + M.name + ' / ' + svc.title + ' / ' + e.t + '. Please advise on scope and quote.') + '">WhatsApp</a>'
                + '</div></li>';
            });
            h += '</ol>';
            drawer.innerHTML = h;
            drawer.dataset.ready = '1';
          }
          var open = !drawer.hidden;
          drawer.hidden = open;
          head.setAttribute('aria-expanded', String(!open));
          slot.classList.toggle('open', !open);
        });
      });
    })();
  </script>
</body>
</html>
`;
for (const d of DESKS) writeFileSync(new URL(`../${d.slug}.html`, import.meta.url), page(matrix[d.id]));

console.log("Generated js/matrix.js + 7 desk pages.");
console.log("Engagement nodes:", DESKS.reduce((t, d) => t + matrix[d.id].services.reduce((x, s) => x + s.engagements.length, 0), 0));
