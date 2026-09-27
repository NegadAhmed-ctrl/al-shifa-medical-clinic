# Al Shifa Medical Clinic — Website

## ⚠️ Before you deploy

This repo uses `https://alshifa-clinic.example.com` as a placeholder production domain.
**Find-and-replace it with your real domain before going live**, in these files:

- `index.html` — `<link rel="canonical">` and the `og:url` meta tag
- `public/sitemap.xml` — every `<loc>` entry
- `public/robots.txt` — the `Sitemap:` line

Also see the two other demo-only placeholders that must not ship as-is:

- `src/utils/adminAuth.ts` — the admin dashboard password (`/admin/bookings`) is a single
  hardcoded string checked in the browser. It is **not real security**. Replace it with
  real authentication and a real backend before this dashboard is used with real patient data.
- `src/utils/patientIdentity.ts` — "My Bookings" identifies a patient by phone number alone,
  stored in that browser's `localStorage`, with no verification (no OTP, no password). It's
  a placeholder for a real login system, good enough for a demo on a single device but not
  for production.


A production-ready, bilingual (Arabic/English) medical clinic website built with React, TypeScript, Vite and Tailwind CSS.

> **Demo project.** "Al Shifa Medical Clinic" and all doctors, patient reviews and contact details in this repository are fictional and used only to demonstrate the website.

## Features

- Arabic (RTL) as the default language, with a full English (LTR) translation — not just labels, every section has real bilingual content
- Home, Doctors (with search + specialty filter), Doctor Details, Services, Appointment Booking (with validation), About, Contact, and a custom 404 page
- Reusable component library: Navbar, Footer, DoctorCard, ServiceCard, TestimonialCard, FAQAccordion, AppointmentForm, floating WhatsApp/call buttons, loading/empty/error states
- Fully responsive, mobile-first layout (tested from 320px up to large desktop)
- Accessible: semantic HTML, visible focus states, labeled form fields, reduced-motion support
- SEO basics: meta description, Open Graph tags, `robots.txt`, `sitemap.xml`
- No backend required to run — the appointment and contact forms are structured so a real API can be plugged in later (see `AppointmentForm.tsx`)

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- React Router 6
- lucide-react icons

## Project Structure

```
src/
├── components/     # Reusable UI components (Navbar, Footer, cards, form, etc.)
├── pages/          # Route-level pages (Home, Doctors, Services, Appointment, ...)
├── data/           # Doctors, services, testimonials, FAQ — plain data, easy to edit
├── i18n/           # Arabic/English translation dictionary + language context
├── layouts/        # MainLayout (navbar + footer + floating actions wrapper)
├── hooks/          # (reserved for custom hooks)
├── utils/          # Validation, localization helpers, icon map
└── types/          # Shared TypeScript interfaces
public/
├── robots.txt
├── sitemap.xml
└── favicon.svg
```

## Running Locally

Requires Node.js 18+.

```bash
npm install
npm run dev       # starts the dev server (default: http://localhost:5173)
npm run build     # type-checks and builds a production bundle into dist/
npm run preview   # serves the production build locally to sanity-check it
```

## Editing Content

- **Doctors:** `src/data/doctors.ts`
- **Services:** `src/data/services.ts`
- **Testimonials & FAQ:** `src/data/testimonials.ts`
- **Clinic phone / WhatsApp / email / address:** `src/utils/localize.ts` — replace `CLINIC_PHONE_DISPLAY`, `CLINIC_WHATSAPP_NUMBER`, `CLINIC_EMAIL`, `CLINIC_ADDRESS_AR/EN` with the real clinic details before going live
- **All UI text (nav, headings, buttons, form labels, etc.):** `src/i18n/translations.ts`, under the `ar` and `en` keys

## Connecting a Real Backend Later

The appointment form (`src/components/AppointmentForm.tsx`) and the contact form (`src/pages/Contact.tsx`) currently simulate a submission. To connect a real API:

1. Replace the `await new Promise((resolve) => setTimeout(resolve, 900))` line in `AppointmentForm.tsx` with a real `fetch()`/API call, using the existing `data` object (already typed via `AppointmentFormData`) as the request body.
2. Do the same for the contact form's `handleSubmit` in `Contact.tsx`.
3. No other structural changes are needed — validation, loading and success/error states are already wired up.

## Environment Variables

None are required for the current version. If you add a backend, create a `.env` file (already ignored by `.gitignore`) and read variables via `import.meta.env.VITE_YOUR_VAR`.

## Deployment

### GitHub Pages

1. Push this repository to GitHub.
2. In `vite.config.ts`, `base: './'` is already set so the build works from any subpath — no change needed for most GitHub Pages setups.
3. Build the site: `npm run build` (outputs to `dist/`).
4. Either:
   - Use the **gh-pages** package: `npm install -D gh-pages`, add `"deploy": "gh-pages -d dist"` to `package.json` scripts, then run `npm run deploy`, or
   - Push the contents of `dist/` to a `gh-pages` branch manually.
5. In your repository settings, enable GitHub Pages for the `gh-pages` branch.

### Vercel

1. Import the GitHub repository into Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy — no environment variables are required for the current version.

### Netlify

1. Import the repository into Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`

## Pre-Launch Checklist

- [ ] Replace placeholder phone number, WhatsApp number, email and address in `src/utils/localize.ts`
- [ ] Replace the Google Maps embed query (`src/pages/Home.tsx` and `src/pages/Contact.tsx`) with the clinic's real address
- [ ] Swap the Unsplash stock photography for real, licensed clinic and doctor photos
- [ ] Connect the appointment and contact forms to a real backend or booking API
- [ ] Update `public/sitemap.xml` and the Open Graph tags in `index.html` with the real production domain
