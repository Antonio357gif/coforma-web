import { randomUUID } from "node:crypto";
import { BlobNotFoundError, head, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const requestIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function isRecorded(path: string) {
  try {
    await head(path);
    return true;
  } catch (error) {
    if (error instanceof BlobNotFoundError) return false;
    throw error;
  }
}

function esc(v: unknown) {
  return String(v ?? "").replace(/[&<>"']/g, (m) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return map[m] || m;
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const company = String(body.company ?? "").trim();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const notes = String(body.notes ?? "").trim();

    if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });
    }

    const id = body.requestId ?? randomUUID();
    if (typeof id !== "string" || !requestIdPattern.test(id)) {
      return NextResponse.json({ ok: false, error: "Invalid request ID" }, { status: 400 });
    }
    const requestId = id.toLowerCase();
    const path = `solicitudes-demo/${requestId}.json`;
    const recordRequest = process.env.VERCEL_ENV === "production" ||
      (!process.env.VERCEL_ENV && Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN));

    const resendKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;   // admin@coforma.es
    const to = process.env.RESEND_TO_EMAIL || from;

    if (!resendKey || !from || !to) {
      return NextResponse.json(
        { ok: false, error: "Missing RESEND env vars" },
        { status: 500 }
      );
    }

    if (recordRequest && await isRecorded(path)) {
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(resendKey);

    const subject = "Nueva solicitud de contacto";
    const text =
      `Nueva solicitud de contacto\n\n` +
      `Empresa: ${company || "-"}\n` +
      `Nombre: ${name || "-"}\n` +
      `Teléfono: ${phone || "-"}\n` +
      `Email: ${email}\n` +
      `Observaciones: ${notes || "-"}\n`;

    const html = `
      <h1>Nueva solicitud de contacto</h1>
      <p><b>Empresa:</b> ${esc(company || "-")}</p>
      <p><b>Nombre:</b> ${esc(name || "-")}</p>
      <p><b>Teléfono:</b> ${esc(phone || "-")}</p>
      <p><b>Email:</b> ${esc(email)}</p>
      <p><b>Observaciones:</b><br/>${esc(notes || "-").replace(/\n/g, "<br/>")}</p>
    `;

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    }, { idempotencyKey: `solicitud-demo/${requestId}` });

    if (error || !data?.id) {
      return NextResponse.json({ ok: false, error: "Error sending message" }, { status: 502 });
    }

    if (recordRequest) {
      try {
        await put(path, JSON.stringify({ requestId, acceptedAt: new Date().toISOString() }), {
          access: "private",
          contentType: "application/json",
          allowOverwrite: false,
        });
      } catch (error) {
        // A concurrent request can finish recording the same accepted email first.
        if (!await isRecorded(path)) throw error;
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("CONTACT_API_ERROR", err instanceof Error ? err.name : "Unknown error");
    return NextResponse.json(
      { ok: false, error: "Error sending message" },
      { status: 500 }
    );
  }
}

