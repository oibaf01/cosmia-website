import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const TO_EMAIL = 'cosmiahospitality@gmail.com';

// Stesse difese anti-bot del form contatti: honeypot + tempo minimo di compilazione
const MIN_FORM_TIME_MS = 3000;
const LINK_REGEX = /https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|it|info|biz|xyz|click)\b/i;

const VALID_SLUGS = ['casa-lira', 'casa-vela'] as const;
const VALID_HIGHLIGHTS = [
  'cleanliness',
  'location',
  'communication',
  'comfort',
  'value',
  'checkin',
] as const;

const reviewSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(254).optional().or(z.literal('')),
  property: z.enum(VALID_SLUGS),
  rating: z.number().int().min(1).max(5),
  highlights: z.array(z.enum(VALID_HIGHLIGHTS)).max(VALID_HIGHLIGHTS.length).optional(),
  comment: z
    .string()
    .min(20)
    .max(3000)
    .refine((v) => !LINK_REGEX.test(v), 'Links not allowed'),
  consent: z.boolean(),
  locale: z.string().max(10).optional(),
  website: z.string().max(200).optional(), // honeypot
  elapsedMs: z.number().optional(),
});

const PROPERTY_LABEL: Record<(typeof VALID_SLUGS)[number], string> = {
  'casa-lira': 'Casa Lira',
  'casa-vela': 'Casa Vela',
};

const HIGHLIGHT_LABEL: Record<(typeof VALID_HIGHLIGHTS)[number], string> = {
  cleanliness: 'Pulizia',
  location: 'Posizione',
  communication: 'Comunicazione',
  comfort: 'Comfort',
  value: 'Rapporto qualità-prezzo',
  checkin: 'Check-in',
};

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 422 });
  }

  const { name, email, property, rating, highlights, comment, consent, locale, website, elapsedMs } = parsed.data;

  // Honeypot compilato o invio troppo rapido → bot: finto successo, nessuna email inviata
  if ((website && website.trim().length > 0) || elapsedMs === undefined || elapsedMs < MIN_FORM_TIME_MS) {
    return NextResponse.json({ success: true });
  }

  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  const highlightLabels = (highlights ?? []).map((h) => HIGHLIGHT_LABEL[h]).join(', ');

  const emailBody = `
Nuova recensione da Cosmia Hospitality Website

Casa: ${PROPERTY_LABEL[property]}
Valutazione: ${stars} (${rating}/5)
Ospite: ${name}
Email: ${email || 'Non fornita'}
Lingua: ${locale || 'n/d'}

Punti forti: ${highlightLabels || 'Nessuno selezionato'}

Recensione:
${comment}

---
CONSENSO ALLA PUBBLICAZIONE: ${consent ? 'SÌ — pubblicabile su cosmiahospitality.com (stelle, testo, nome)' : 'NO — feedback privato, NON pubblicare'}

Inviato da cosmiahospitality.com
  `.trim();

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Cosmia Hospitality <noreply@cosmiahospitality.com>',
      to: TO_EMAIL,
      ...(email ? { replyTo: email } : {}),
      subject: `Recensione ${rating}/5 — ${PROPERTY_LABEL[property]} — ${name}${consent ? '' : ' [NON PUBBLICARE]'}`,
      text: emailBody,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
