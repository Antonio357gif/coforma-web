import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { empresa, nombre, telefono, email, observaciones } = await req.json();

    const data = await resend.emails.send({
      from: 'Coforma <admin@coforma.es>',
      to: ['admin@coforma.es'],
      subject: 'Nueva solicitud de contacto - Coforma',
      html: `
        <h2>Nueva solicitud de contacto</h2>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Observaciones:</strong><br/> ${observaciones}</p>
      `,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
