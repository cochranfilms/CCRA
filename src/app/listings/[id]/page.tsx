import { loadListings } from '@/lib/data';
import { fetchIHFListings } from '@/lib/ihf';
// Layout helpers not used on the redesigned listing page
import ShareButtons from '@/components/ui/ShareButtons';
import ShowingForm from '@/components/ui/ShowingForm';
import CalculatorClient from '@/app/calculator/sfc';
import Link from 'next/link';

interface Props { params: Promise<{ id: string }> }

export const revalidate = 300;

export async function generateStaticParams() {
  const listings = (await fetchIHFListings({ limit: 60 })) || (await loadListings());
  return listings.map((l) => ({ id: l.id }));
}

export default async function ListingDetail({ params }: Props) {
  const { id } = await params;
  let listings = await fetchIHFListings({ limit: 60 });
  if (!listings.length) {
    listings = await loadListings();
  }
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
  const similar = listings
    .filter((x) => (x.id !== listing.id) && (x.communitySlug === listing.communitySlug || Math.abs(x.price - listing.price) / listing.price < 0.2))
    .slice(0, 3);

  return (
    <div className="section">
      <div className="container-wide grid lg:grid-cols-12 gap-8">
        {/* Left: gallery + overview stacked */}
        <div className="lg:col-span-8 grid gap-6">
          <div className="grid grid-cols-3 gap-2 card overflow-hidden p-2">
            {photos.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="" className={`rounded-none object-cover w-full h-28 md:h-40 ${i === 0 ? 'col-span-3 h-56 md:h-96' : ''}`} />
            ))}
          </div>
          <div className="card p-6 text-[color:var(--brand-deep)]">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">Overview</h2>
            <p>
              Discover this inviting home featuring an open floor plan and abundant natural light. The kitchen offers
              ample storage with a large island, and the living area flows seamlessly to the backyard—perfect for
              entertaining. Upstairs, generously sized bedrooms provide comfort and privacy.
            </p>
            <p className="mt-2">
              This is placeholder copy to visualize where the MLS remarks will appear. Replace with IDX-fed
              description when connected.
            </p>
          </div>
        </div>
        {/* Right: summary + actions */}
        <div className="lg:col-span-4">
          <div className="card p-6 text-[color:var(--brand-deep)]">
            <h1 className="text-2xl md:text-3xl font-semibold">{listing.address}</h1>
            <div className="text-xl text-[var(--brand-primary)] mt-1">{listing.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
            <div className="opacity-80 mt-2">{listing.beds} bd · {listing.baths} ba · {listing.sqft.toLocaleString()} sqft</div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {features.slice(0, 6).map((f) => (
                <div key={f}>• {f}</div>
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
          <div className="mt-6 card p-4 text-[color:var(--brand-deep)]">
            <div className="text-lg font-semibold mb-2">Listing Agent</div>
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop" alt="Agent" className="w-14 h-14 object-cover rounded-none" />
              <div>
                <div className="font-medium leading-tight">Alex Johnson</div>
                <div className="text-sm opacity-80 leading-tight">Senior Advisor</div>
                <div className="text-sm opacity-80 leading-tight">(404) 555-0123</div>
              </div>
              <div className="ml-auto"><Link className="btn-outline" href="/find-an-agent">View Profile</Link></div>
            </div>
          </div>
          <div className="mt-6 sticky top-24 grid gap-6">
            <ShowingForm
              address={listing.address}
              listing={{
                id: listing.id,
                slug: listing.slug,
                price: listing.price,
                beds: listing.beds,
                baths: listing.baths,
                sqft: listing.sqft,
                lat: listing.lat,
                lng: listing.lng,
                communitySlug: listing.communitySlug,
              }}
            />
          </div>
        </div>

        {/* Main content grid below */}
        <div className="lg:col-span-8 grid gap-6">
          <div className="card p-6 text-[color:var(--brand-deep)]">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Property Details</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="font-semibold mb-1">Subdivision / Complex</div>
                <div>Brookhaven Heights</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Exterior</div>
                <div>Brick 4 Sides</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Parking Features</div>
                <div>2-Car Garage · Driveway</div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Mortgage Calculator</h2>
            <CalculatorClient initialPrice={listing.price} />
          </div>

          <div className="card overflow-hidden">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                title="Virtual Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Map</h2>
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

          <div className="card p-6" id="nearby">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">What’s Nearby</h2>
            <Nearby lat={listing.lat} lng={listing.lng} />
          </div>

          <div className="card p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Property Information</h2>
            <div className="grid md:grid-cols-2 gap-6 text-[color:var(--brand-deep)]">
              <div className="card p-4">
                <div className="font-semibold mb-2">Location & General Information</div>
                <ul className="text-sm space-y-1">
                  <li>County: Fulton</li>
                  <li>Subdivision: Brookhaven Heights</li>
                  <li>Year Built: 2012</li>
                </ul>
              </div>
              <div className="card p-4">
                <div className="font-semibold mb-2">Taxes & HOA Information</div>
                <ul className="text-sm space-y-1">
                  <li>Tax Year: 2024</li>
                  <li>Annual Taxes: $8,500</li>
                  <li>HOA: $95/mo</li>
                </ul>
              </div>
              <div className="card p-4">
                <div className="font-semibold mb-2">School Information</div>
                <ul className="text-sm space-y-1">
                  <li>Elementary: Garden Hills</li>
                  <li>Middle: Sutton</li>
                  <li>High: North Atlanta</li>
                </ul>
              </div>
              <div className="card p-4">
                <div className="font-semibold mb-2">Parking</div>
                <ul className="text-sm space-y-1">
                  <li>Garage Spaces: 2</li>
                  <li>Parking Features: Attached, Driveway</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Similar Homes</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((l, idx) => (
                <Link key={l.id} href={`/listings/${l.id}`} className="card overflow-hidden group">
                  <div className="aspect-[4/3] bg-[var(--muted)] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={(l.photos?.[0] && !l.photos[0].endsWith('.svg')) ? l.photos[0] : (idx % 2 === 0 ? 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop')}
                      alt="Listing photo"
                      className="w-full h-full object-cover transition-transform group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-4">
                    <div className="font-medium">{l.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                    <div className="text-sm opacity-80">{l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString()} sqft</div>
                    <div className="text-sm mt-1">{l.address}</div>
                  </div>
                </Link>
              ))}
              {similar.length === 0 && <div className="opacity-70">No similar homes found.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NearbyPlace {
  id: string;
  name: string;
  distanceText?: string;
  mapUrl: string;
}

async function fetchNearby(lat: number, lng: number, cat: string): Promise<NearbyPlace[]> {
  try {
    const res = await fetch(`/api/nearby?lat=${lat}&lng=${lng}&cat=${cat}`, { next: { revalidate: 300 } });
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


