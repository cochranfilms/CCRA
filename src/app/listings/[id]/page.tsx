import { loadListings } from '@/lib/data';
import { Section, Split } from '@/components/ui/section';
import ShareButtons from '@/components/ui/ShareButtons';
import ShowingForm from '@/components/ui/ShowingForm';
import CalculatorClient from '@/app/calculator/sfc';

interface Props { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  const listings = await loadListings();
  return listings.map((l) => ({ id: l.id }));
}

export default async function ListingDetail({ params }: Props) {
  const { id } = await params;
  const listings = await loadListings();
  const listing = listings.find((l) => l.id === id || l.slug === id);
  if (!listing) return <div className="container-wide section">Listing not found.</div>;

  // Ensure placeholders for photos and features
  const FALLBACKS = [
    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop',
  ];
  const photos = (listing.photos?.length ? listing.photos : FALLBACKS).map((src, i) =>
    (src && !src.endsWith('.svg')) ? src : FALLBACKS[i % FALLBACKS.length]
  );
  const features = listing.features?.length ? listing.features : ['Open floor plan', 'Renovated kitchen', 'Large backyard', 'Two-car garage', 'Quiet street', 'Near parks'];

  return (
    <>
      <Section contained={false}>
        <div className="container-wide">
          <Split
            left={(
              <div className="grid grid-cols-3 gap-2">
                {photos.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt="" className={`rounded-none object-cover w-full h-28 md:h-40 ${i === 0 ? 'col-span-3 h-56 md:h-80' : ''}`} />
                ))}
              </div>
            )}
            right={(
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">{listing.address}</h1>
                <div className="text-xl text-[var(--brand-primary)] mt-1">{listing.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div className="opacity-80 mt-2">{listing.beds} bd · {listing.baths} ba · {listing.sqft.toLocaleString()} sqft</div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {features.slice(0, 6).map((f) => (
                    <div key={f} className="text-sm">• {f}</div>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <a href={`#book`} className="btn-primary">Book a Showing</a>
                  <a href={`mailto:info@crosscreekrealty.com?subject=${encodeURIComponent('Inquiry: ' + listing.address)}`} className="btn-outline">Contact Agent</a>
                </div>
                <div className="mt-4">
                  <ShareButtons title={listing.address} />
                </div>
              </div>
            )}
          />
        </div>
      </Section>

      <Section variant="dark">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-4">Map</h2>
          <div className="h-80 rounded-none overflow-hidden">
            <iframe
              title="map"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${listing.lng-0.02}%2C${listing.lat-0.02}%2C${listing.lng+0.02}%2C${listing.lat+0.02}&layer=mapnik&marker=${listing.lat}%2C${listing.lng}`}
            />
          </div>
        </div>
      </Section>

      <Section variant="light">
        <div className="container-wide" id="nearby">
          <h2 className="text-2xl font-semibold mb-4">What’s Nearby</h2>
          <Nearby lat={listing.lat} lng={listing.lng} />
        </div>
      </Section>

      <Section variant="dark">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-4">Mortgage Calculator</h2>
          <CalculatorClient initialPrice={listing.price} />
        </div>
      </Section>

      <Section variant="light">
        <div className="container-wide">
          <ShowingForm address={listing.address} />
        </div>
      </Section>
    </>
  );
}

interface NearbyPlace {
  id: string;
  name: string;
  distanceText?: string;
  mapUrl: string;
}

async function fetchNearby(lat: number, lng: number, cat: string): Promise<NearbyPlace[]> {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base) return [] as NearbyPlace[];
  try {
    const res = await fetch(`${base}/api/nearby?lat=${lat}&lng=${lng}&cat=${cat}`, { next: { revalidate: 300 } });
    if (!res.ok) return [] as NearbyPlace[];
    return res.json();
  } catch {
    return [] as NearbyPlace[];
  }
}

async function Nearby({ lat, lng }: { lat: number; lng: number }) {
  const _categories = ['Dining', 'Groceries', 'Schools', 'Fitness', 'Parks', 'Transit'];
  const [dining, groceries] = await Promise.all([
    fetchNearby(lat, lng, 'Dining'),
    fetchNearby(lat, lng, 'Groceries'),
  ]);
  const fallback: NearbyPlace[] = [
    { id: 'f1', name: 'Sample Cafe', distanceText: '0.3 mi', mapUrl: `https://www.google.com/maps?q=${lat},${lng}` },
    { id: 'f2', name: 'Green Market', distanceText: '0.5 mi', mapUrl: `https://www.google.com/maps?q=${lat},${lng}` },
    { id: 'f3', name: 'Neighborhood Park', distanceText: '0.7 mi', mapUrl: `https://www.google.com/maps?q=${lat},${lng}` },
  ];
  const items = [...dining, ...groceries].slice(0, 8);
  const list = items.length ? items : fallback;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {list.map((p: NearbyPlace) => (
        <a key={p.id} className="card p-4" href={p.mapUrl} target="_blank" rel="noopener noreferrer">
          <div className="font-medium">{p.name}</div>
          <div className="text-sm opacity-80">{p.distanceText ?? '~'} away</div>
        </a>
      ))}
    </div>
  );
}


