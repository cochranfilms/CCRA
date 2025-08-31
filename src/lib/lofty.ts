import type { Listing } from '@/types/data';

type LoftyItem = Record<string, unknown>;

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const n = Number(value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

function coalesce<T>(...values: T[]): T | undefined {
  for (const v of values) {
    if (v !== undefined && v !== null && (typeof v !== 'number' || Number.isFinite(v))) return v;
  }
  return undefined;
}

function get(obj: unknown, path: string[]): unknown {
  let current: unknown = obj;
  for (const key of path) {
    if (typeof current !== 'object' || current === null) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function buildAddress(item: LoftyItem): string {
  const partsUnknown = [
    get(item, ['address', 'street']) ?? (item as Record<string, unknown>).address_line ?? (item as Record<string, unknown>).streetAddress,
    get(item, ['address', 'city']) ?? (item as Record<string, unknown>).city,
    get(item, ['address', 'state']) ?? (item as Record<string, unknown>).state ?? (item as Record<string, unknown>).stateOrProvince,
    get(item, ['address', 'postalCode']) ?? (item as Record<string, unknown>).postalCode ?? (item as Record<string, unknown>).zip,
  ];
  const parts = partsUnknown
    .filter((v): v is string | number => typeof v === 'string' || typeof v === 'number')
    .map((v) => String(v).trim())
    .filter(Boolean);
  return parts.join(', ');
}

function mapLoftyToListing(item: LoftyItem, index: number): Listing {
  const id = String(coalesce((item as Record<string, unknown>).id, (item as Record<string, unknown>).listing_id, (item as Record<string, unknown>).mls_id, (item as Record<string, unknown>).uuid, index));
  const address = buildAddress(item) || ((item as Record<string, unknown>).address as string) || 'Address Unavailable';
  const price = toNumber(coalesce((item as Record<string, unknown>).price, (item as Record<string, unknown>).listPrice, (item as Record<string, unknown>).list_price, (item as Record<string, unknown>).listingPrice), 0);
  const beds = toNumber(coalesce((item as Record<string, unknown>).bedrooms, (item as Record<string, unknown>).beds, (item as Record<string, unknown>).bedRooms), 0);
  const baths = toNumber(coalesce((item as Record<string, unknown>).bathrooms, (item as Record<string, unknown>).baths, (item as Record<string, unknown>).bathRooms, (item as Record<string, unknown>).bathrooms_total), 0);
  const sqft = toNumber(coalesce((item as Record<string, unknown>).sqft, (item as Record<string, unknown>).livingArea, (item as Record<string, unknown>).lot_size, (item as Record<string, unknown>).livingAreaValue), 0);
  const lat = toNumber(
    coalesce(
      (item as Record<string, unknown>).latitude,
      (item as Record<string, unknown>).lat,
      get(item, ['location', 'lat']),
      get(item, ['coordinates', 'lat'])
    ),
    0
  );
  const lng = toNumber(
    coalesce(
      (item as Record<string, unknown>).longitude,
      (item as Record<string, unknown>).lng,
      get(item, ['location', 'lng']),
      get(item, ['coordinates', 'lng'])
    ),
    0
  );
  const photosSource = coalesce<unknown[]>((item as Record<string, unknown>).photos as unknown[], (item as Record<string, unknown>).images as unknown[], (item as Record<string, unknown>).media as unknown[]) || [];
  const photos: string[] = photosSource
    .map((p: unknown) => {
      if (typeof p === 'string') return p;
      if (p && typeof p === 'object') {
        const maybe = p as { url?: unknown; href?: unknown };
        if (typeof maybe.url === 'string') return maybe.url;
        if (typeof maybe.href === 'string') return maybe.href;
      }
      return undefined;
    })
    .filter((v: string | undefined): v is string => Boolean(v))
    .slice(0, 8);
  const status = String(coalesce((item as Record<string, unknown>).status, (item as Record<string, unknown>).propertyStatus, 'active')) as Listing['status'];
  const neighborhood = (item as Record<string, unknown>).neighborhood as string | undefined;
  const city = (item as Record<string, unknown>).city as string | undefined;
  const communitySlug = (neighborhood || city || 'metro-atlanta').toString().toLowerCase().replace(/\s+/g, '-');

  return {
    id,
    slug: id,
    address,
    lat,
    lng,
    price,
    beds,
    baths,
    sqft,
    photos,
    communitySlug,
    agentIds: [],
    features: [],
    status: (status === 'pending' || status === 'sold') ? status : 'active',
  };
}

export async function fetchLoftyListings(params?: Record<string, string | number>): Promise<Listing[]> {
  // Build a relative internal URL so Next can cache it properly in app router
  const search = new URLSearchParams();
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      search.set(k, String(v));
    }
  }
  const path = `/api/lofty${search.size ? `?${search.toString()}` : ''}`;
  try {
    // Use ISR by default to avoid static-to-dynamic shifts in app router
    const res = await fetch(path, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const json: unknown = await res.json().catch(() => undefined);
    const itemsArray = (val: unknown): unknown[] | null => (Array.isArray(val) ? val : null);
    const get = (obj: unknown, key: string): unknown => (typeof obj === 'object' && obj !== null ? (obj as Record<string, unknown>)[key] : undefined);
    const itemsUnknown = itemsArray(json) || itemsArray(get(json, 'data')) || itemsArray(get(json, 'listings')) || [];
    const items: LoftyItem[] = itemsUnknown as LoftyItem[];
    return items.map(mapLoftyToListing);
  } catch {
    return [];
  }
}


