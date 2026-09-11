import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { jobs } from "../../db/schema.js";
import { makeRef, validatePayload, deskLabel, fail, ok } from "./_lib/http.mjs";

interface JobBody {
  clientName?: string;
  phone?: string;
  email?: string;
  desk?: string;
  service?: string;
  engagement?: string;
  dataEntry?: string | string[];
  uploads?: string | string[];
  deadline?: string;
  priority?: string;
  notes?: string;
}

function toList(v: unknown): string {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean).join(" | ");
  return String(v || "").trim();
}

export default async (req: Request) => {
  if (req.method !== "POST") return fail(405, "Use POST to submit a job request.");

  let body: JobBody;
  try {
    body = (await req.json()) as JobBody;
  } catch {
    return fail(400, "Request body must be valid JSON.");
  }

  const desk = String(body.desk || "").trim();
  const service = String(body.service || "").trim();
  const engagement = String(body.engagement || "").trim();
  const priorityRaw = String(body.priority || "STANDARD").trim().toUpperCase();
  const priority = ["STANDARD", "EXPRESS", "PRIORITY"].includes(priorityRaw) ? priorityRaw : "STANDARD";

  const { errors, name, phone, email } = validatePayload(body as Record<string, unknown>);
  if (!desk) errors.push("Select the desk this job belongs to.");
  if (!service) errors.push("Select the service for this job request.");
  if (!engagement) errors.push("Select the engagement tier for this job.");
  if (body.deadline && !/^\d{4}-\d{2}-\d{2}$/.test(String(body.deadline))) errors.push("Deadline must be a valid date.");

  if (errors.length) return fail(422, errors.join(" "), { errors });

  const reference = makeRef("JOB");
  try {
    const [row] = await db
      .insert(jobs)
      .values({
        reference,
        clientName: name,
        phone,
        email,
        desk,
        deskName: deskLabel(desk),
        service,
        engagement,
        dataEntryFields: toList(body.dataEntry),
        uploadChecklist: toList(body.uploads),
        deadline: body.deadline ? String(body.deadline) : null,
        priority,
        notes: String(body.notes || "").trim(),
      })
      .returning();
    return ok({ ok: true, reference: row.reference, job: row });
  } catch (err) {
    console.error("job insert failed", err);
    return fail(500, "We could not save the job request. Please retry or use the hotline.");
  }
};

export const config: Config = {
  path: "/api/job",
  method: ["POST"],
};
