## Stock images and placeholders

This project ships with high‑quality stock images (via Unsplash) to make pages look real before live media and/or API data are wired up. You can swap any of these with your own assets or local files in `public/`.

Below is a map of where each image is defined and how to change it.

### Home page

- Hero background image (property exterior)
  - File: `src/app/page.tsx`
  - Look for the first `<section ...>` with `backgroundImage:`
  - Replace the URL inside `url('...')` with your own image.

- Featured Listings card images (3 demo photos)
  - File: `src/app/page.tsx`
  - Search for the array of three URLs inside the Featured Listings grid. Replace each with your own.

- “Why Cross Creek Realty” background + cards
  - File: `src/app/page.tsx`
  - Background: find the `section` comment `Why Cross Creek Realty` and replace the `backgroundImage:` URL.
  - Left photo card: replace the `<img src="..." />` URL.

### Listings

- Listings index grid fallback images
  - File: `src/app/listings/page.tsx`
  - Constant: `STOCK: string[]`
  - The grid uses `l.photos[0]` when available; otherwise it cycles through `STOCK`. Update the array URLs to change the placeholders.

- Listing detail gallery fallbacks
  - File: `src/app/listings/[id]/page.tsx`
  - Constant: `FALLBACKS`
  - Each gallery image uses the listing photo when present; if empty/invalid, it falls back to `FALLBACKS[i % FALLBACKS.length]`.

### Agents

- Agents index thumbnails
  - File: `src/app/agents/page.tsx`
  - Constant: `STOCK: string[]` (headshots)
  - Each card uses `a.photo` unless it ends with `.svg`; otherwise it falls back to a stock headshot.

- Agent detail avatar fallback
  - File: `src/app/agents/[slug]/page.tsx`
  - Constant: `FALLBACK` (single headshot URL)

- Find an Agent page
  - File: `src/app/find-an-agent/page.tsx`
  - Constants: `STOCK` (headshots) and a map placeholder image at the top; replace as needed.

### Communities / Areas

- Communities index hero background
  - File: `src/app/communities/page.tsx`
  - Replace the `backgroundImage:` URL in the first section.

- Communities index card image fallback (for SVGs)
  - File: `src/app/communities/page.tsx`
  - Inside the communities grid items, update the fallback `<img src={...} />` URL.

- Community detail map placeholder
  - File: `src/app/communities/[slug]/page.tsx`
  - Replace the `<img src="..." />` URL in the right column of the hero split.

- Featured Areas map placeholder
  - File: `src/app/featured-areas/page.tsx`
  - Replace the `<img src="..." />` URL inside the map container.

### Using local images instead of remote URLs

1. Add your file(s) to `public/images/` (e.g., `public/images/hero.jpg`).
2. Replace any Unsplash URL with the relative path, for example:
   - In CSS style strings: `url('/images/hero.jpg')`
   - In `<img>` tags: `src="/images/hero.jpg"`

### Tips

- For production, prefer local images in `public/` or a CDN you control for performance and consistency.
- Listing and agent pages already prefer real data (from `content/*.json`) when available and only use stocks as fallbacks.
- If you later fetch media from an API, you can leave these fallbacks in place to handle missing photos gracefully.


