import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { tickets } from "../../db/schema.js";
import { makeRef, validatePayload, deskLabel, fail, ok } from "./_lib/http.mjs";

interface TicketBody {
  clientName?: string;
  phone?: string;
  email?: string;
  desk?: string;
  service?: string;
  engagement?: string;
  details?: string;
}

export default async (req: Request) => {
  if (req.method !== "POST") return fail(405, "Use POST to book a ticket.");

  let body: TicketBody;
  try {
    body = (await req.json()) as TicketBody;
  } catch {
    return fail(400, "Request body must be valid JSON.");
  }

  const desk = String(body.desk || "").trim();
  const service = String(body.service || "").trim();
  const engagement = String(body.engagement || "").trim();

  const { errors, name, phone, email } = validatePayload(body as Record<string, unknown>);
  if (!desk) errors.push("Select the desk this ticket belongs to.");
  if (!service) errors.push("Select the service you are booking for.");
  if (!engagement) errors.push("Select the engagement tier for this service.");

  if (errors.length) return fail(422, errors.join(" "), { errors });

  const reference = makeRef("TKT");
  try {
    const [row] = await db
      .insert(tickets)
      .values({
        reference,
        clientName: name,
        phone,
        email,
        desk,
        deskName: deskLabel(desk),
        service,
        engagement,
        details: String(body.details || "").trim(),
      })
      .returning();
    return ok({ ok: true, reference: row.reference, ticket: row });
  } catch (err) {
    console.error("ticket insert failed", err);
    return fail(500, "We could not save the ticket. Please retry or use the hotline.");
  }
};

export const config: Config = {
  path: "/api/ticket",
  method: ["POST"],
};
