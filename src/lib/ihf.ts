import type { Agent, Listing } from '@/types/data';

type IHFItem = Record<string, unknown>;

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const n = Number(value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

function get(obj: unknown, path: string[]): unknown {
  let current: unknown = obj;
  for (const key of path) {
    if (typeof current !== 'object' || current === null) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function coalesce<T>(...values: T[]): T | undefined {
  for (const v of values) {
    if (v !== undefined && v !== null && (typeof v !== 'number' || Number.isFinite(v))) return v;
  }
  return undefined;
}

function buildAddress(item: IHFItem): string {
  const partsUnknown = [
    get(item, ['address', 'street']) ?? (item as Record<string, unknown>).streetAddress ?? (item as Record<string, unknown>).address,
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

function mapIHFToListing(item: IHFItem, index: number): Listing {
  const id = String(coalesce((item as Record<string, unknown>).id, (item as Record<string, unknown>).listingId, (item as Record<string, unknown>).mlsId, index));
  const address = buildAddress(item) || ((item as Record<string, unknown>).address as string) || 'Address Unavailable';
  const price = toNumber(coalesce((item as Record<string, unknown>).price, (item as Record<string, unknown>).listPrice));
  const beds = toNumber(coalesce((item as Record<string, unknown>).bedrooms, (item as Record<string, unknown>).beds));
  const baths = toNumber(coalesce((item as Record<string, unknown>).bathrooms, (item as Record<string, unknown>).baths));
  const sqft = toNumber(coalesce((item as Record<string, unknown>).sqft, (item as Record<string, unknown>).livingArea));
  const lat = toNumber(coalesce((item as Record<string, unknown>).latitude, (item as Record<string, unknown>).lat, get(item, ['location', 'lat'])));
  const lng = toNumber(coalesce((item as Record<string, unknown>).longitude, (item as Record<string, unknown>).lng, get(item, ['location', 'lng'])));
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

export async function fetchIHFListings(params?: Record<string, string | number>): Promise<Listing[]> {
  const search = new URLSearchParams();
  if (params) {
    for (const [k, v] of Object.entries(params)) search.set(k, String(v));
  }
  const path = `/api/ihf/listings${search.size ? `?${search.toString()}` : ''}`;
  try {
    const controller = new AbortController();
    const timeoutMs = Number(process.env.IHF_TIMEOUT_MS || 8000);
    const t = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(path, { next: { revalidate: 300 }, signal: controller.signal }).finally(() => clearTimeout(t));
    if (!res.ok) return [];
    const json: unknown = await res.json().catch(() => undefined);
    const itemsArray = (val: unknown): unknown[] | null => (Array.isArray(val) ? val : null);
    const getKey = (obj: unknown, key: string): unknown => (typeof obj === 'object' && obj !== null ? (obj as Record<string, unknown>)[key] : undefined);
    const itemsUnknown = itemsArray(json) || itemsArray(getKey(json, 'data')) || itemsArray(getKey(json, 'listings')) || [];
    const items: IHFItem[] = itemsUnknown as IHFItem[];
    return items.map(mapIHFToListing);
  } catch {
    return [];
  }
}

function toString(value: unknown): string | undefined {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return undefined;
}

function mapIHFToAgent(item: IHFItem, index: number): Agent {
  const id = String(coalesce((item as Record<string, unknown>).id, (item as Record<string, unknown>).agentId, index));
  const first = toString((item as Record<string, unknown>).firstName) || '';
  const last = toString((item as Record<string, unknown>).lastName) || '';
  const name = toString((item as Record<string, unknown>).name) || [first, last].filter(Boolean).join(' ') || `Agent ${index + 1}`;
  const slug = name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 80) || id;
  const photo = toString((item as Record<string, unknown>).photo) || toString((item as Record<string, unknown>).image) || '';
  const phone = toString((item as Record<string, unknown>).phone) || '';
  const email = toString((item as Record<string, unknown>).email) || '';
  const title = toString((item as Record<string, unknown>).title) || 'Advisor';
  const bio = toString((item as Record<string, unknown>).bio) || '';
  const languages = Array.isArray((item as Record<string, unknown>).languages) ? ((item as Record<string, unknown>).languages as unknown[]).map(String) : [];
  const specialties = Array.isArray((item as Record<string, unknown>).specialties) ? ((item as Record<string, unknown>).specialties as unknown[]).map(String) : [];
  const serviceAreas = Array.isArray((item as Record<string, unknown>).serviceAreas) ? ((item as Record<string, unknown>).serviceAreas as unknown[]).map(String) : [];
  const office = toString((item as Record<string, unknown>).office) || 'Cross Creek Realty';
  return { id, slug, name, title, photo, phone, email, languages, specialties, office, bio, serviceAreas };
}

export async function fetchIHFAgents(params?: Record<string, string | number>): Promise<Agent[]> {
  const search = new URLSearchParams();
  if (params) {
    for (const [k, v] of Object.entries(params)) search.set(k, String(v));
  }
  const path = `/api/ihf/agents${search.size ? `?${search.toString()}` : ''}`;
  try {
    const controller = new AbortController();
    const timeoutMs = Number(process.env.IHF_TIMEOUT_MS || 8000);
    const t = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(path, { next: { revalidate: 3600 }, signal: controller.signal }).finally(() => clearTimeout(t));
    if (!res.ok) return [];
    const json: unknown = await res.json().catch(() => undefined);
    const itemsArray = (val: unknown): unknown[] | null => (Array.isArray(val) ? val : null);
    const getKey = (obj: unknown, key: string): unknown => (typeof obj === 'object' && obj !== null ? (obj as Record<string, unknown>)[key] : undefined);
    const itemsUnknown = itemsArray(json) || itemsArray(getKey(json, 'data')) || itemsArray(getKey(json, 'agents')) || [];
    const items: IHFItem[] = itemsUnknown as IHFItem[];
    return items.map(mapIHFToAgent);
  } catch {
    return [];
  }
}


