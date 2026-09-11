export const DESKS = [
  { id: 1, slug: "digital", name: "Digital & Brand Systems", blurb: "BRS registry filings, brand identity packs and secure document vaults." },
  { id: 2, slug: "academic", name: "Academic & Testing Logistics", blurb: "Mock archives, revision booklets, KASNEB vaults and CBC distribution runs." },
  { id: 3, slug: "transport", name: "Transport Brokerage Hub", blurb: "Executive rides, courier runs, cargo freight and transit insurance cover." },
  { id: 4, slug: "sourcing", name: "Merchandise Sourcing Links", blurb: "Farm-gate produce, factory price audits, supplier vetting and customs duty math." },
  { id: 5, slug: "fixer", name: "Independent Fixer Desk", blurb: "Ground proxy units for site inspections, permit queues and enforcement disputes." },
  { id: 6, slug: "agency", name: "General Agency Core", blurb: "Cross-sector retainers, unified ledgers, priority queues and escrow holding." },
  { id: 7, slug: "statutory", name: "Statutory & Portal Logistics", blurb: "eCitizen, passports, NTSA TIMMS, SHA/SHIF, DCI, ArdhiSasa and KRA iTax filings." },
];

export const SERVICES = {
  1: [
    "BRS Name Reservation Ingestion",
    "Partnership Layout Setup (BN2 Form)",
    "Business Particulars Official Alterations",
    "Cessation & Deregistration Filings",
    "Historical Legacy Record Linking",
    "Vector Identity Branding Packs",
    "Secure Digital Document Vaults",
  ],
  2: [
    "Form 1-4 Joint Termly Mock Bundles",
    "Printed Bound Topical Revision Booklets",
    "KASNEB CPA National Paper Archive Vault",
    "KASNEB ATD Vocational Revision Kits",
    "Primary/Junior Secondary CBC Distribution",
    "Hardcopy Revision Notes Digitization Run",
    "Candidate Profile Student Portal Setup",
  ],
  3: [
    "Point-to-Point Executive Ride Bookings",
    "Last-Mile Motorcycle Courier Runs",
    "Inter-County Agricultural Lorry Sourcing",
    "Cold-Chain Ventilated Cargo Freight",
    "Multi-Vans Institutional Fleet Itineraries",
    "Transit Highway Cargo Telemetry Tracks",
    "Transit Cargo Third-Party Insurance Cover",
  ],
  4: [
    "Farm-Gate Agriculture Produce Sourcing",
    "Industrial Factory Wholesale Price Audits",
    "B2B Wholesale Import Corridor Vendor Maps",
    "Supplier Identification Background Audits",
    "Customs Entry Freight Duty Calculations",
    "Prototype Quality Inspection Operations",
    "Long-Term Contract Farming Frameworks",
  ],
  5: [
    "Real Estate Plot Site Inspections",
    "Pre-Transit Cargo Inbound Tally Counts",
    "Pending Commercial Permits Proxy",
    "Property Security Compliance Safety Audits",
    "Single Business Permit Zoning Guide Maps",
    "Storefront Operational Spot Check Runs",
    "Municipal Enforcement Dispute Resolution",
  ],
  6: [
    "Multi-Desk Project Analytics Retainers",
    "Micro-Merchant Intake Menu Redirections",
    "Aggregated Billing Ledger Automated Reports",
    "Priority Multi-Desk Queue Surcharge Override",
    "Cross-Border Trade Corridor Logistics Maps",
    "Service Desk Response Telemetry KPI Logs",
    "Multi-Sector Escrow Milestone Holding Proxy",
  ],
  7: [
    "eCitizen Duplicate ID / Maisha Application",
    "National Passport Travel Document Renewals",
    "NTSA TIMMS DL Ingestion & Transfer Management",
    "SHA / SHIF Portal Healthcare Transitions",
    "Certificate of Good Conduct Application Run",
    "ArdhiSasa Official Land Boundary Property Searches",
    "KRA iTax Mandatory Nil & Active Tax Filings",
  ],
};

export const HOTLINE = "+254788099685";
export const MAILBOX = "vecctapivotenterprises@gmail.com";
export const WHATSAPP = "+254788099685";

export function makeRef(kind) {
  const d = new Date();
  const y = String(d.getFullYear()).slice(-2);
  const m = "ABCDEFGHJKLMNPQRSTUVWXYZ"[d.getUTCMonth()];
  const days = (Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - Date.UTC(d.getUTCFullYear(), 0, 1)) / 86400000 + 1;
  let rnd = "";
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const b = new Uint8Array(4);
    crypto.getRandomValues(b);
    rnd = Array.from(b).map((x) => (x % 36).toString(36).toUpperCase()).join("");
  } else {
    rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  }
  return `${kind}-${y}${m}${String(days).padStart(3, "0")}${rnd}`;
}

export function getServicesByDesk(deskId) {
  return SERVICES[deskId] || [];
}
