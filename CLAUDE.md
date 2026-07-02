# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run lint     # ESLint
```

No test suite — manual testing only.

## Architecture

**Next.js 16 + next-intl 4** marketing website for Cosmia Hospitality (vacation rentals, Gargano, Puglia).

### Routing & i18n

All pages live under `app/[locale]/`. Locales: `it` (default), `en`. Translations in `messages/it.json` and `messages/en.json`.

- `i18n/routing.ts` — locale config (single source of truth for supported locales)
- `i18n/request.ts` — `getRequestConfig` used by next-intl server side
- `i18n/navigation.ts` — exports locale-aware `Link`, `redirect`, `useRouter`, `usePathname`; **always use these instead of `next/navigation` equivalents**
- `proxy.ts` — next-intl middleware; handles locale redirect at the edge

Every page must call `setRequestLocale(locale)` at the top of the server component, and export `generateStaticParams` returning all locales.

### Data layer

`lib/data/properties.ts` — static array of `Property` objects (no DB, no CMS). All bilingual fields are `{ it: string; en: string }`. Add/edit properties here. `getPropertyBySlug` is the only accessor.

`lib/data/reviews.ts` — static review data.

`lib/data/amenityIcons.ts` — maps amenity key strings to Lucide icons.

### SEO

- `lib/seo/metadata.ts` — `buildMetadata()` generates per-page `Metadata` with canonical, hreflang alternates, OG, Twitter, and geo tags. Use it in every page's `generateMetadata`.
- `lib/seo/schema.ts` — JSON-LD helpers (`organizationSchema`, `websiteSchema`, `itemListSchema`, etc.). Inject via `<script type="application/ld+json">` in the page JSX.

### Layout

`app/[locale]/layout.tsx` — root locale layout. Loads Google Fonts (Inter + Playfair Display as CSS vars `--font-sans`/`--font-serif`), wraps with `NextIntlClientProvider`.

`app/layout.tsx` — minimal pass-through; `html`/`body` are in the locale layout.

Each page composes: `Header` + `<main>` with section components + `Footer` + `WhatsAppButton` + `CookieBanner`.

### API

`app/api/contact/route.ts` — POST endpoint. Validates with Zod, sends email via **Resend**. Requires `RESEND_API_KEY` in `.env.local`. Sends to `fabiopastore27@gmail.com`, `from` domain `cosmiahospitality.it`.

### Styling

Tailwind CSS v4 (`@import "tailwindcss"` in `globals.css`). Brand tokens defined in `@theme {}`:

| Token | Value |
|---|---|
| `brand-navy` | `#0D1321` |
| `brand-deep` | `#1E2938` |
| `brand-gold` | `#C8A26E` |
| `brand-sand` | `#E7D7B7` |
| `brand-ivory` | `#F7F4EF` |

`font-sans` = Inter, `font-serif` = Playfair Display.

Shooting-star CSS animation lives in `globals.css` — three `@keyframes` with staggered delays; uses `animation-fill-mode: backwards`.

### Animations

Use `motion` (Framer Motion v12+) for all animations. Import: `import { motion } from "motion/react"`. Never use CSS keyframes or other animation libraries unless explicitly requested.

### Adding a new property

1. Add entry to `properties` array in `lib/data/properties.ts` with a unique `slug`
2. Add photos to `public/images/<slug>/`
3. The slug automatically generates a route at `/[locale]/appartamenti/[slug]`

## Deployment & Infrastructure

**Live domain**: `cosmiahospitality.com` (Squarespace registrar, DNS pointing to Vercel)

**Hosting**: Vercel (serverless, edge functions, always-on, zero cold-start)

**Environment variables** (Vercel Settings → Environment Variables, all environments: Production/Preview/Development):
- `RESEND_API_KEY` — email API (transactional contact form emails)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics 4 tracking

**Email** (contact form):
- Sent via Resend from `noreply@cosmiahospitality.com`
- Received at `cosmiahospitality@gmail.com`
- Domain verification: Resend requires SPF/DKIM records on `cosmiahospitality.com` (DNS configured)

**Uptime**: Vercel does not hibernate/sleep after inactivity. Site is 24/7 online, no heartbeat script needed.

## Git Workflow & CI/CD

**Branch structure**:
- `main` — production. Every push → Vercel auto-builds and deploys live (atomic, zero-downtime)
- `developing` — integration branch for feature testing before PR to main
- `pastore-dev` — personal development branch (staccato, optional)
- Feature branches: `feature/*`, `fix/*`, `chore/*` (checked out from `developing`)

**Workflow**:
1. Create feature branch: `git checkout -b feature/xyz developing`
2. Commit work, push: `git push -u origin feature/xyz`
3. Open PR on GitHub: `feature/xyz` → `developing`
4. After review/testing, merge PR into `developing`
5. When ready for production: create PR `developing` → `main`
6. Merge PR on GitHub → Vercel auto-deploys (watch dashboard for status)
7. Preview deployments auto-created for every branch push (unique URL per branch)

**Form validation & anti-spam** (added 2026-07-02):
- Phone number: regex E.164-ish validation (7-20 chars, digits/spaces/+/parens/hyphens)
- Check-in/check-out: enforces checkout > checkin
- Message: blocks links (regex: URL/www/common TLDs) to prevent spam
- Honeypot: invisible `website` field; if filled → silent rejection (returns fake success)
- Time-trap: minimum 3 seconds elapsed between form load and submit; if faster → silent rejection
- All validations replicated client (UX feedback) and server (security)

**Contact form email rejection**: honeypot-filled or time-trap-triggered forms return `{"success": true}` but send no email (silent, prevents bot learning)
