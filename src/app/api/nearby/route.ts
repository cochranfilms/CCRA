import { NextRequest, NextResponse } from 'next/server';

interface Place {
  id: string;
  name: string;
  distanceText: string | '~';
  mapUrl: string;
}

// Simple in-memory cache
const cache = new Map<string, { data: Place[]; ts: number }>();
const TTL_MS = 1000 * 60 * 5; // 5 minutes

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = Number(searchParams.get('lat'));
  const lng = Number(searchParams.get('lng'));
  const cat = (searchParams.get('cat') || 'Dining').toString();
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ error: 'lat,lng required' }, { status: 400 });
  }
  const key = `${lat.toFixed(4)}:${lng.toFixed(4)}:${cat}`;
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && now - hit.ts < TTL_MS) {
    return NextResponse.json(hit.data);
  }

  const placesKey = process.env.PLACES_API_KEY;
  let data: Place[] = [];
  if (placesKey) {
    try {
      // Placeholder: return stubbed shape; integrate Places Nearby later
      data = [
        { id: 'p1', name: `${cat} Place One`, distanceText: '0.5 mi', mapUrl: `https://maps.google.com/?q=${lat},${lng}` },
        { id: 'p2', name: `${cat} Place Two`, distanceText: '0.8 mi', mapUrl: `https://maps.google.com/?q=${lat},${lng}` },
      ];
    } catch {
      data = [];
    }
  }
  if (!placesKey || data.length === 0) {
    // OSM/Nominatim fallback: return minimal stub for now
    data = [
      { id: 'o1', name: `${cat} Spot A`, distanceText: '~', mapUrl: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}` },
      { id: 'o2', name: `${cat} Spot B`, distanceText: '~', mapUrl: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}` },
    ];
  }

  cache.set(key, { data, ts: now });
  return NextResponse.json(data);
}


