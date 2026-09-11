import { DESKS } from "./data.mjs";
export { makeRef } from "./data.mjs";

export const CONTACT = {
  hotline: "+254788099685",
  mailbox: "vecctapivotenterprises@gmail.com",
  whatsapp: "+254788099685",
  waNumber: "254788099685",
};

export function ok(body, headers = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

export function fail(status, message, extra = {}) {
  return new Response(JSON.stringify({ ok: false, error: message, ...extra }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const NAME = /^[A-Za-z\u00C0-\u024F.' \-]{2,80}$/;

export function validatePayload(body) {
  const errors = [];
  const name = String(body.clientName || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  if (!NAME.test(name)) errors.push("Client name: use 2-80 letters (hyphen or apostrophe allowed).");
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.length < 9 || digits.length > 15) errors.push("Phone: provide a reachable phone number including country code.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push("Email address format looks invalid.");
  return { errors, name, phone, email: email || null, digits };
}

export function deskLabel(deskId) {
  const d = DESKS.find((x) => x.id === Number(deskId));
  return d ? `${d.id}. ${d.name}` : String(deskId);
}
