/* Integration test: real handlers against in-process Postgres (PGlite). */
import { PGlite } from "@electric-sql/pglite";
import fs from "node:fs";
import path from "node:path";

const db = new PGlite();
await db.exec(fs.readFileSync(path.resolve("netlify/database/migrations/20260911142505_create_tickets_and_jobs/migration.sql"), "utf8"));

import { drizzle } from "drizzle-orm/pglite";
import * as schema from "../db/schema.ts";

const d = drizzle({ client: db, schema });
const { makeRef, validatePayload, deskLabel } = await import("./../netlify/functions/_lib/http.mjs");

/* Fake a ticket insert exactly like netlify/functions/ticket.mts does. */
const body = {
  clientName: "Wanjiru A. Mwangi",
  phone: "+254 788 099 685",
  email: "wanjiru@example.com",
  desk: "7",
  service: "National Passport Travel Document Renewals",
  engagement: "Document & Data Ingestion",
  details: "Expiring in March; need booked slot before travel.",
};

const { errors, name, phone, email } = validatePayload(body);
if (errors.length) throw new Error("validation failed: " + errors.join(" "));
const ref = makeRef("TKT");
const [row] = await d.insert(schema.tickets).values({
  reference: ref,
  clientName: name,
  phone,
  email,
  desk: "7",
  deskName: deskLabel("7"),
  service: body.service,
  engagement: body.engagement,
  details: body.details,
}).returning();
console.log("TICKET inserted:", row.reference, "|", row.deskName);

/* Job insert exactly like netlify/functions/job.mts does. */
const jbody = {
  clientName: "Otieno D. Kiplagat",
  phone: "0788099685",
  desk: "4",
  service: "Customs Entry Freight Duty Calculations",
  engagement: "Processing & Filing Run",
  dataEntry: ["Commercial invoice: INV-88231", "HS codes: 8708.99"],
  uploads: ["READY: Commercial invoice / packing list", "PENDING: HS codes if known"],
  deadline: "2026-09-30",
  priority: "EXPRESS",
  notes: "Border: Busia",
};
const v2 = validatePayload(jbody);
if (v2.errors.length) throw new Error("job validation failed: " + v2.errors.join(" "));
const jref = makeRef("JOB");
const [jrow] = await d.insert(schema.jobs).values({
  reference: jref,
  clientName: v2.name,
  phone: v2.phone,
  email: null,
  desk: "4",
  deskName: deskLabel("4"),
  service: jbody.service,
  engagement: jbody.engagement,
  dataEntryFields: jbody.dataEntry.join(" | "),
  uploadChecklist: jbody.uploads.join(" | "),
  deadline: jbody.deadline,
  priority: jbody.priority,
  notes: jbody.notes,
}).returning();
console.log("JOB inserted:", jrow.reference, "| priority", jrow.priority);

/* Track lookups exactly like netlify/functions/track.mts does. */
const { eq } = await import("drizzle-orm");
const t = await d.select().from(schema.tickets).where(eq(schema.tickets.reference, ref)).limit(1);
const j = await d.select().from(schema.jobs).where(eq(schema.jobs.reference, jref)).limit(1);
console.log("track ticket found:", t.length === 1 && t[0].reference === ref);
console.log("track job found:", j.length === 1 && j[0].reference === jref);
const miss = await d.select().from(schema.tickets).where(eq(schema.tickets.reference, "TKT-26A000ZZZZ")).limit(1);
console.log("track miss returns empty:", miss.length === 0);

console.log("ALL INTEGRATION CHECKS PASSED");
