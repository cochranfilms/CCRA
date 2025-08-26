## Cross Creek Realty — Upgrade Plan (Current → Target)

### Current Inventory (detected)
- Framework: Next.js App Router (next 15), TypeScript, React 19, Tailwind CSS v4 (inline @theme)
- Files:
  - `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `public/*`, `next.config.ts`, `tsconfig.json`
- Styling:
  - Tailwind v4 with `@import "tailwindcss"` and `@theme inline`
  - No brand tokens yet; default light/dark variables only
- Routes:
  - `/` (home placeholder)
  - No API routes, no additional pages yet

### Target (high-level)
- Premium 2025-level real estate site with compass-inspired rhythm
- New pages: `/agents`, `/agents/[slug]`, `/find-an-agent`, `/communities`, `/communities/[slug]`, `/listings/[id]`, `/book`, utility pages, and `/api/nearby`
- Section primitives: `Section`, `Split`, `Metrics`, `CTA`, `Carousel` (light), consistent spacing and reveals
- Data via JSON seeds under `/content` (agents, listings, communities)
- Theme tokens: brand colors (gold/deep navy), neutrals, light/dark; accessible contrast
- Nearby service using Places API (if configured) with OSM fallback and caching
- Booking wizard with zod validation and server action (email stub)
- SEO (metadata + JSON-LD), a11y focus, performance (lazy maps, skeletons)

### Keep
- Next.js App Router, Tailwind v4 setup, TypeScript strict
- Existing directory structure under `src/app`

### Improve
- Introduce brand tokens and spacing scale in `globals.css`
- Add UI primitives and cards; unify paddings and grids
- Add server routes and data loader utilities
- Add tests (Vitest) for booking validation and nearby API helpers

### Step-by-Step Plan
1) Foundations
   - Add brand tokens to `globals.css` and Section primitives
   - Create `/content/*.json` seeds and typed interfaces in `src/types/data.ts`
   - Add data utilities `src/lib/data.ts` (load and filter)
2) Pages & Components
   - Implement `/agents` directory with filters (URL params) and cards; `/agents/[slug]`
   - Implement `/find-an-agent` with search + map/list toggle (map placeholder if no key)
   - Implement `/communities` index and `/communities/[slug]` micro pages (stats, listings, map placeholder)
   - Upgrade `/listings/[id]` with gallery, facts, map, and Nearby widget (via `/api/nearby`)
   - Implement `/book` BookingWizard with Buyer/Seller toggle, zod validation, server action email stub
3) Data & Integrations
   - `/api/nearby` with Places → OSM fallback and simple in-memory caching
   - Mapbox token gate (`NEXT_PUBLIC_MAPBOX_TOKEN`) with graceful placeholders
4) SEO & A11y
   - Add metadata per page and JSON-LD (Organization, Agent, Residence/Place)
   - Keyboard navigation in filters and wizard; focus management
5) Performance
   - Lazy-load map and carousels; add skeletons for lists
6) DX & Docs
   - Add `.env.example`, update `README.md` (quick start, keys, theming), add tests

### Acceptance
- Existing base remains; enhancements slot cleanly; all new components typed and accessible; tests pass.


