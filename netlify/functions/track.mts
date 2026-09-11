import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { tickets, jobs } from "../../db/schema.js";
import { fail, ok } from "./_lib/http.mjs";

export default async (req: Request) => {
  const ref = (new URL(req.url).searchParams.get("ref") || "").trim().toUpperCase();
  if (!ref) return fail(400, "Provide a reference, e.g. ?ref=TKT-26A001ABCD.");

  const pattern = ref.length >= 4 ? ref : ref + "%";
  try {
    const t = await db.select().from(tickets).where(eq(tickets.reference, pattern)).limit(1);
    if (t.length) {
      const r = t[0];
      return ok({
        ok: true,
        kind: "TICKET",
        reference: r.reference,
        clientName: r.clientName,
        desk: r.deskName,
        service: r.service,
        engagement: r.engagement,
        details: r.details,
        logged: r.createdAt,
      });
    }
    const j = await db.select().from(jobs).where(eq(jobs.reference, pattern)).limit(1);
    if (j.length) {
      const r = j[0];
      return ok({
        ok: true,
        kind: "JOB",
        reference: r.reference,
        clientName: r.clientName,
        desk: r.deskName,
        service: r.service,
        engagement: r.engagement,
        timeframe: r.timeframe,
        dataEntryFields: r.dataEntryFields,
        uploadChecklist: r.uploadChecklist,
        deadline: r.deadline,
        priority: r.priority,
        notes: r.notes,
        logged: r.createdAt,
      });
    }
    return fail(404, `No ticket or job found for ${ref}. Check the reference or contact the hotline.`);
  } catch (err) {
    console.error("track lookup failed", err);
    return fail(500, "Lookup failed. Please retry shortly.");
  }
};

export const config: Config = {
  path: "/api/track",
  method: ["GET"],
};
