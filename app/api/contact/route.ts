import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const TO_EMAIL = 'fabiopastore27@gmail.com';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  apartment: z.string().optional(),
  checkin: z.string().optional(),
  checkout: z.string().optional(),
  guests: z.string().optional(),
  message: z.string().min(5),
  locale: z.string().optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 422 });
  }

  const { name, email, phone, apartment, checkin, checkout, guests, message } = parsed.data;

  const apartmentLabel = apartment
    ? apartment === 'general'
      ? 'Informazioni generali'
      : apartment === 'casa-lira'
      ? 'Casa Lira'
      : apartment === 'casa-vela'
      ? 'Casa Vela'
      : apartment
    : 'Non specificato';

  const emailBody = `
Nuova richiesta da Cosmia Hospitality Website

Nome: ${name}
Email: ${email}
Telefono: ${phone || 'Non fornito'}

Appartamento: ${apartmentLabel}
Check-in: ${checkin || 'Non specificato'}
Check-out: ${checkout || 'Non specificato'}
Ospiti: ${guests || 'Non specificato'}

Messaggio:
${message}

---
Inviato da cosmiahospitality.it
  `.trim();

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Cosmia Hospitality <noreply@cosmiahospitality.it>',
      to: TO_EMAIL,
      replyTo: email,
      subject: `Nuova richiesta: ${name} — ${apartmentLabel}`,
      text: emailBody,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
