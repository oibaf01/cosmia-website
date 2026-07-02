import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const TO_EMAIL = 'cosmiahospitality@gmail.com';

// Tempo minimo di compilazione plausibile per un umano (anti-bot time-trap)
const MIN_FORM_TIME_MS = 3000;
const PHONE_REGEX = /^[+]?[\d\s().-]{7,20}$/;
const LINK_REGEX = /https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|it|info|biz|xyz|click)\b/i;

const contactSchema = z
  .object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(254),
    phone: z
      .string()
      .max(30)
      .optional()
      .refine((v) => !v || PHONE_REGEX.test(v), 'Invalid phone number'),
    apartment: z.string().max(50).optional(),
    checkin: z.string().max(30).optional(),
    checkout: z.string().max(30).optional(),
    guests: z.string().max(10).optional(),
    message: z
      .string()
      .min(10)
      .max(5000)
      .refine((v) => !LINK_REGEX.test(v), 'Links not allowed'),
    locale: z.string().max(10).optional(),
    website: z.string().max(200).optional(), // honeypot
    elapsedMs: z.number().optional(), // tempo di compilazione lato client
  })
  .superRefine((data, ctx) => {
    if (data.checkin && data.checkout && new Date(data.checkout) <= new Date(data.checkin)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['checkout'], message: 'Check-out must be after check-in' });
    }
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

  const { name, email, phone, apartment, checkin, checkout, guests, message, website, elapsedMs } = parsed.data;

  // Honeypot compilato o form inviato troppo in fretta → bot: finto successo, nessuna email inviata
  if ((website && website.trim().length > 0) || elapsedMs === undefined || elapsedMs < MIN_FORM_TIME_MS) {
    return NextResponse.json({ success: true });
  }

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
Inviato da cosmiahospitality.com
  `.trim();

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Cosmia Hospitality <noreply@cosmiahospitality.com>',
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
