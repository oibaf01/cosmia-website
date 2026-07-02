# Cosmia Hospitality — Vacation Rentals on the Gargano

Premium vacation rental website for luxury stays in Mattinata, Gargano, Puglia. Built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **next-intl** for multi-language support (IT, EN, FR, DE).

**Live:** [cosmiahospitality.com](https://cosmiahospitality.com)

---

## 🎯 Project Overview

Cosmia Hospitality is a **Next.js 16 marketing website** for vacation rental properties on the Italian coast. Features include:

- **Multi-language support** — Italian (default), English, French, German
- **Property listings** — Casa Lira, Casa Vela with photo galleries
- **Contact form** — Transactional email via Resend
- **SEO optimized** — JSON-LD schema, hreflang alternates, Open Graph meta tags
- **Anti-spam protection** — Honeypot field + time-trap validation
- **WhatsApp integration** — Direct chat button with tooltip
- **Responsive design** — Mobile-first, luxury aesthetic (navy + gold + ivory)
- **Zero database** — Static content stored in TypeScript files

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** (npm >= 9.x) or **yarn** (yarn >= 3.x)

### Local Development

```bash
# Clone repository
git clone https://github.com/oibaf01/cosmia-website.git
cd cosmia-website

# Install dependencies
npm install

# Create .env.local (see Environment Variables section)
echo "RESEND_API_KEY=re_xxx" > .env.local
echo "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-xxx" >> .env.local

# Start dev server
npm run dev

# Open http://localhost:3000
```

### Build & Production

```bash
npm run build     # Production build
npm start         # Start production server (local testing)
npm run lint      # ESLint
```

---

## 🛠 Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js | 16.2.9 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **i18n** | next-intl | 4.13.0 |
| **Forms** | react-hook-form | 7.80.0 |
| **Validation** | Zod | 4.4.3 |
| **Email** | Resend | 6.16.0 |
| **Animations** | Framer Motion | 12.42.0 |
| **Icons** | Lucide React | 1.22.0 |
| **Analytics** | Vercel Analytics | 2.0.1 |
| **Hosting** | Vercel | — |

---

## 📁 Project Structure

```
cosmia-website/
├── app/
│   ├── [locale]/                 # Locale-specific routes
│   │   ├── layout.tsx            # Root layout (fonts, providers)
│   │   ├── page.tsx              # Home page
│   │   ├── appartamenti/         # Properties listing & detail
│   │   ├── chi-siamo/            # About page
│   │   ├── contatti/             # Contact page
│   │   ├── orari-bus/            # Bus schedule
│   │   ├── privacy/              # Privacy policy
│   │   └── termini/              # Terms of service
│   ├── api/contact/route.ts      # Contact form endpoint (Resend)
│   ├── layout.tsx                # Global layout (html/body tags)
│   └── robots.txt, sitemap.xml   # SEO
├── components/
│   ├── layout/                   # Header, Footer, Navigation
│   ├── sections/                 # Page sections (Hero, Properties, etc.)
│   ├── ui/                       # Reusable UI components
│   └── CookieBanner.tsx          # Cookie consent
├── i18n/
│   ├── routing.ts                # Locale config (IT, EN, FR, DE)
│   ├── request.ts                # next-intl server config
│   ├── navigation.ts             # Locale-aware Link, redirect, etc.
│   └── proxy.ts                  # Middleware (locale detection)
├── lib/
│   ├── data/
│   │   ├── properties.ts         # Static property data
│   │   ├── reviews.ts            # Testimonials
│   │   └── amenityIcons.ts       # Icon mappings
│   ├── seo/
│   │   ├── metadata.ts           # buildMetadata() function
│   │   └── schema.ts             # JSON-LD helpers
│   └── locale.ts                 # Utility for bilingual fields
├── messages/                     # Translation files (it.json, en.json, fr.json, de.json)
├── public/
│   ├── images/
│   │   ├── hero/                 # OG image, hero backgrounds
│   │   ├── casa-lira/            # Casa Lira photos
│   │   └── casa-vela/            # Casa Vela photos
│   └── logos/                    # Brand icon
├── next.config.ts                # Next.js config (next-intl plugin)
├── tailwind.config.ts            # Tailwind config (brand tokens)
├── tsconfig.json                 # TypeScript config
├── CLAUDE.md                      # Codebase guidance (development context)
└── README.md                      # This file
```

---

## 📝 Environment Variables

Create `.env.local` in the root directory:

```env
# Resend API Key — https://resend.com/api-keys
# Used for transactional emails from contact form
RESEND_API_KEY=re_xxx

# Google Analytics 4 Measurement ID
# Get from: https://analytics.google.com (Admin > Streams > Web stream)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-xxx
```

On **Vercel**, add these same variables via:
**Project Settings → Environment Variables** (all environments: Production, Preview, Development)

---

## 🌍 Internationalization (i18n)

The site supports **4 locales**:
- `it` — Italian (default)
- `en` — English
- `fr` — French
- `de` — German

### How i18n Works

1. All pages live under `app/[locale]/` (e.g., `/it/`, `/en/`, `/fr/`)
2. Translations stored in `messages/{locale}.json`
3. `next-intl` middleware (`proxy.ts`) handles locale detection from browser `Accept-Language` header
4. Use locale-aware components from `i18n/navigation.ts` (not `next/navigation`)

### Adding a New Translation

1. Add key to all `messages/*.json` files:
   ```json
   "your_section": {
     "your_key": "English text"
   }
   ```
2. Use in component:
   ```tsx
   const t = useTranslations('your_section');
   return <p>{t('your_key')}</p>;
   ```

---

## 📧 Contact Form & Email

### How It Works

1. User fills form on `/contatti` (Contact page)
2. Client-side validation (Zod schema) + anti-spam checks:
   - **Honeypot**: invisible `website` field; if filled → silent rejection
   - **Time-trap**: minimum 3 seconds between load and submit; if faster → silent rejection
   - **Phone regex**: validates phone number format
   - **Dates**: enforces checkout > checkin
   - **Links**: blocks URLs in message to prevent spam
3. Form submitted to `/api/contact` (POST)
4. Server-side validation (same rules, repeated for security)
5. If valid → email sent via **Resend** to `cosmiahospitality@gmail.com` from `noreply@cosmiahospitality.com`
6. User sees success message; bot sees silent rejection (no feedback loop)

### Domain Verification (Resend)

For emails to appear professional:
1. Register domain `cosmiahospitality.com` in Resend dashboard
2. Add SPF/DKIM DNS records (provided by Resend)
3. Resend verifies ownership
4. Emails now sent from `noreply@cosmiahospitality.com` instead of Resend sandbox

---

## 🎨 Styling & Brand

### Brand Colors (CSS Variables)

Defined in `tailwind.config.ts` under `@theme {}`:

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-navy` | `#0D1321` | Primary dark background |
| `brand-deep` | `#1E2938` | Secondary dark shade |
| `brand-gold` | `#C8A26E` | Accent, highlights |
| `brand-sand` | `#E7D7B7` | Light accent |
| `brand-ivory` | `#F7F4EF` | Light text, backgrounds |

### Tailwind CSS v4

- Modern `@import "tailwindcss"` syntax in `globals.css`
- Custom brand tokens automatically available as `bg-brand-navy`, `text-brand-gold`, etc.
- No component library by default (built with primitives + Tailwind utilities)

### Animations

Use **Framer Motion** for all animations:
```tsx
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

Never use CSS `@keyframes` unless explicitly requested.

---

## 🔍 SEO

### Meta Tags

Every page uses `buildMetadata()` from `lib/seo/metadata.ts`:
- **Title** — page title + "| Cosmia Hospitality — Gargano"
- **Description** — bilingual descriptions
- **Canonical URL** — prevents duplicate content
- **hreflang alternates** — signals alternate language versions to search engines
- **Open Graph** — `og:image` (1200x630), `og:title`, `og:description` for social sharing
- **Twitter Card** — `twitter:image`, `twitter:title`, `twitter:description`
- **Geo tags** — location metadata for local SEO (Gargano, Puglia)

### JSON-LD Schema

Structured data for search engines:
- **Organization schema** — company info
- **Website schema** — site-level metadata
- **ItemList schema** — properties listing
- **Breadcrumb schema** — navigation hierarchy

Injected via `<script type="application/ld+json">` in page JSX.

### Sitemap & Robots

- `public/robots.txt` — search engine crawl rules
- `public/sitemap.xml` — all indexable pages (auto-generated)

---

## 🚀 Deployment

### Hosting: Vercel

**Why Vercel?**
- Zero-cost (free tier)
- Auto-scaling, no cold-start
- Atomic deployments (zero downtime)
- Edge functions, CDN included
- Always-on (no hibernation after inactivity)

### Deployment Process

1. Push code to `main` branch on GitHub
2. Vercel automatically detects push and builds
3. New deployment goes live in 1-2 minutes (atomic cutover)
4. Previous version remains available until new build succeeds

### Domains

**Primary domain**: `cosmiahospitality.com` (Squarespace registrar)
- DNS points to Vercel (CNAME/A records configured)
- SSL certificate auto-provisioned (Let's Encrypt)

### Environment Variables

Set on Vercel dashboard (not in `.env` files):
- `RESEND_API_KEY` — email API
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — analytics tracking

---

## 🔄 Git Workflow

### Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production (live on cosmiahospitality.com). Every push → auto-deploy via Vercel. |
| `developing` | Integration branch for features before PR to `main`. |
| `pastore-dev` | Personal development branch (optional). |
| `feature/*` | Feature branches (check out from `developing`). |
| `fix/*` | Bug fix branches (check out from `developing`). |

### How to Contribute

1. **Create feature branch:**
   ```bash
   git checkout -b feature/your-feature developing
   ```

2. **Commit with Conventional Commits:**
   ```bash
   git commit -m "feat: add new section to homepage"
   git commit -m "fix: correct form validation logic"
   git commit -m "chore: update dependencies"
   ```

3. **Push and open PR:**
   ```bash
   git push -u origin feature/your-feature
   gh pr create --title "feat: your feature" --body "Description"
   ```

4. **PR workflow:**
   - Create PR: `feature/your-feature` → `developing`
   - Preview deployment auto-created by Vercel
   - Review & test on preview URL
   - Merge to `developing`
   - Later: PR `developing` → `main` → auto-deploy to production

5. **Merge to production:**
   ```bash
   gh pr create --base main --head developing
   gh pr merge  # Merges to main → Vercel auto-deploys
   ```

### Commit Conventions

Follow **Conventional Commits**:
- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — maintenance (deps, config)
- `refactor:` — code cleanup (no behavior change)
- `docs:` — documentation
- `style:` — formatting (no logic change)

Example:
```
feat: add photo gallery to property pages

- Add Framer Motion transitions
- Implement keyboard navigation (arrow keys, ESC)
- Add accessibility labels (aria-label)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
```

---

## 🧪 Testing

**Manual testing only** — no automated test suite.

### Local Testing Checklist

- [ ] Dev server runs: `npm run dev`
- [ ] All pages load in all locales (IT, EN, FR, DE)
- [ ] Links work (use locale-aware `Link` from `i18n/navigation`)
- [ ] Contact form submits + email arrives
- [ ] Responsive on mobile (375px+)
- [ ] Lighthouse performance ≥ 80

### Vercel Preview Testing

After pushing feature branch:
1. Vercel creates preview deployment (unique URL)
2. Test same checklist on preview URL
3. Share preview URL for feedback
4. Merge only after testing passes

---

## 📦 Adding a New Property

To add a vacation rental property:

1. **Add data** to `lib/data/properties.ts`:
   ```typescript
   const properties: Property[] = [
     {
       slug: 'casa-lira',  // unique URL slug
       name: { it: 'Casa Lira', en: 'Lira House' },
       // ... other fields (bilingual: { it: '...', en: '...' })
     },
     // Add your new property here
   ];
   ```

2. **Add photos** to `public/images/{slug}/`:
   ```
   public/images/your-property/
   ├── kitchen1.jpg
   ├── bedroom1.jpg
   ├── bathroom.jpg
   └── ... (more photos)
   ```

3. **Route auto-generated:** `/[locale]/appartamenti/{slug}` is now available

---

## 🤝 Contributing

Contributions welcome! Fork → feature branch → PR workflow (see Git Workflow section).

### Development Guidelines

- **TypeScript strict mode** — no `any` types
- **ESLint enforcement** — `npm run lint` must pass
- **Responsive first** — mobile-first design
- **Accessibility** — ARIA labels, semantic HTML
- **No external component libraries** — build with Tailwind + primitives (unless explicitly needed)
- **Comment sparingly** — code should be self-documenting; comment the "why", not the "what"

---

## 📄 License

Proprietary — Cosmia Hospitality. All rights reserved.

---

## 📞 Contact & Support

- **Website:** [cosmiahospitality.com](https://cosmiahospitality.com)
- **WhatsApp:** [Direct chat](https://wa.me/393317728100)
- **Email:** [fabiopastore27@gmail.com](mailto:fabiopastore27@gmail.com)

---

## 📚 Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **next-intl Guide:** https://next-intl-docs.vercel.app
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion
- **Vercel Docs:** https://vercel.com/docs

---

**Last updated:** July 2, 2026  
**Built by:** Fabio Pastore  
**Hosted by:** Vercel
