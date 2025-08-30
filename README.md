Cross Creek Realty — Next.js App Router site.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment

Copy `.env.example` to `.env.local` and set keys:

- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `PLACES_API_KEY`
- `POSTMARK_API_KEY` or EmailJS keys
- `NEXT_PUBLIC_BASE_URL`

EmailJS public env vars (no secrets):

```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_EMAILJS_TEMPLATE_BUYER=your_buyer_template_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_SELLER=your_seller_template_id
```

### Lead/CRM Integration

Leads post to `api/leads`, which normalizes payloads and forwards them to a pluggable CRM adapter. Currently a console adapter is used as a safe default for development.

- Hidden UTM fields (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) are auto-captured on forms and included in submissions.
- Property context (listing id/slug, address, lat/lng, beds/baths/sqft, price) is attached on the listing showing form for future MLS/IDX mapping.

Environment variables reserved for integrations:

```
# Base URL for server components to call API routes (optional in production)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Places API (optional; nearby uses fallback if unset)
PLACES_API_KEY=your_key_here

# EmailJS legacy placeholders (replaced by public vars above)
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=

# CRM selection (placeholder for future adapters)
CRM_PROVIDER=CONSOLE
```

### Content

- Edit JSON seeds: `/content/agents.json`, `/content/communities.json`, `/content/listings.json`

### Theming

- Update brand tokens in `src/app/globals.css`: `--brand-primary`, `--brand-deep`, `--brand-accent`, base neutrals

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Editing navigation

The primary navigation is config-driven. Edit `src/components/layout/nav.config.ts` to add, remove, or reorder items.

- `label`: Display text
- `href`: Optional direct link
- `children`: Optional child links with `label`, `href`, and optional `description`
- `ctaHref`/`ctaLabel`: Optional right-aligned CTA inside dropdowns

Components involved:

- `Header.tsx`: Two-row sticky header with shrink-on-scroll
- `MainNav.tsx`: Pill-style nav, active state, focus ring
- `NavDropdown.tsx`: Accessible dropdown with keyboard support and animation
- `MobileDrawer.tsx`: Full-height mobile drawer with accordions and pinned CTAs
