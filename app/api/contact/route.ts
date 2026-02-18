import { Resend } from "resend";

export const runtime = "nodejs";

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

    // Estas claves deben coincidir con el formulario (page.tsx)
    const company = String(body.company ?? "").trim();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const notes = String(body.notes ?? "").trim();

    if (!email) {
      return new Response("Missing email", { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL; // ej: admin@coforma.es
    const to = process.env.RESEND_TO_EMAIL || from; // si no defines TO, se envía a FROM

    if (!resendKey || !from || !to) {
      return new Response("Missing RESEND env vars", { status: 500 });
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

    await resend.emails.send({
      from,
      to,
      replyTo: email, // para responder al interesado directamente
      subject,
      text,
      html,
    });

    // IMPORTANTE: devolver 200 SIEMPRE que el send fue OK
    return Response.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_API_ERROR", err);
    return new Response("Error sending message", { status: 500 });
  }
}
