import { loadListings } from '@/lib/data';
import { Section, Split } from '@/components/ui/section';

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

  return (
    <>
      <Section contained={false}>
        <div className="container-wide">
          <Split
            left={(
              <div className="grid grid-cols-3 gap-2">
                {listing.photos.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt="" className={`rounded-lg object-cover w-full h-28 md:h-40 ${i === 0 ? 'col-span-3 h-56 md:h-80' : ''}`} />
                ))}
              </div>
            )}
            right={(
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">{listing.address}</h1>
                <div className="text-xl text-[var(--brand-primary)] mt-1">{listing.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div className="opacity-80 mt-2">{listing.beds} bd · {listing.baths} ba · {listing.sqft.toLocaleString()} sqft</div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {listing.features.slice(0, 6).map((f) => (
                    <div key={f} className="text-sm">• {f}</div>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <a href={`#book`} className="btn-primary">Book a Showing</a>
                  <a href={`mailto:info@crosscreekrealty.com?subject=${encodeURIComponent('Inquiry: ' + listing.address)}`} className="btn-outline">Contact Agent</a>
                </div>
              </div>
            )}
          />
        </div>
      </Section>

      <Section>
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-4">Map</h2>
          <div className="h-72 rounded-xl bg-[var(--muted)]/40 flex items-center justify-center">
            <div className="text-center">
              <div className="font-medium mb-1">Map placeholder</div>
              <div className="text-sm opacity-70">Lat {listing.lat.toFixed(4)}, Lng {listing.lng.toFixed(4)}</div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-wide" id="nearby">
          <h2 className="text-2xl font-semibold mb-4">What’s Nearby</h2>
          <Nearby lat={listing.lat} lng={listing.lng} />
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
  const items = [...dining, ...groceries].slice(0, 8);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((p: NearbyPlace) => (
        <a key={p.id} className="card p-4" href={p.mapUrl} target="_blank" rel="noopener noreferrer">
          <div className="font-medium">{p.name}</div>
          <div className="text-sm opacity-80">{p.distanceText ?? '~'} away</div>
        </a>
      ))}
      {items.length === 0 && <div className="opacity-70">No nearby places found.</div>}
    </div>
  );
}


