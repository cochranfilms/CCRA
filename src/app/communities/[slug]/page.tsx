import { loadCommunities, loadListings, getListingsByCommunity } from '@/lib/data';
import { Section, Split, CTA } from '@/components/ui/section';
import Link from 'next/link';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const communities = await loadCommunities();
  return communities.map((c) => ({ slug: c.slug }));
}

export default async function CommunityDetail({ params }: Props) {
  const { slug } = await params;
  const [communities, listings] = await Promise.all([loadCommunities(), loadListings()]);
  const community = communities.find((c) => c.slug === slug);
  if (!community) return <div className="container-wide section">Community not found.</div>;
  const featured = getListingsByCommunity(listings, community.slug).slice(0, 6);

  return (
    <>
      <Section contained={false}>
        <div className="container-wide">
          <Split
            left={(
              <div>
                <h1 className="text-3xl md:text-5xl font-semibold">{community.name}</h1>
                <p className="mt-3 opacity-90 max-w-2xl">{community.description}</p>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="card p-4"><div className="text-xs opacity-70">Median Price</div><div className="text-lg font-medium">{community.stats.medianPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div></div>
                  <div className="card p-4"><div className="text-xs opacity-70">DOM</div><div className="text-lg font-medium">{community.stats.dom}</div></div>
                  <div className="card p-4"><div className="text-xs opacity-70">Highlights</div><div className="text-sm">{community.highlights.slice(0,2).join(', ')}…</div></div>
                </div>
              </div>
            )}
            right={(
              <div className="rounded-xl overflow-hidden h-64 md:h-80 bg-[var(--muted)]/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1496568816309-51d7c20e1fd5?q=80&w=1600&auto=format&fit=crop"
                  alt="Map placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          />
        </div>
      </Section>
      <Section variant="dark">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-4">Why people love {community.name}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card p-4">Parks & green space</div>
            <div className="card p-4">Dining & retail</div>
            <div className="card p-4">Commute & transit</div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-4">Featured Listings</h2>
          {featured.length === 0 ? (
            <div className="opacity-70">No listings available.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((l) => (
                <Link key={l.id} href={`/listings/${l.id}`} className="card overflow-hidden group">
                  <div className="aspect-[4/3] bg-[var(--muted)] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.photos[0]} alt={l.address} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
                  </div>
                  <div className="p-4">
                    <div className="font-medium">${'{'}(l.price).toLocaleString(){'}'}</div>
                    <div className="text-sm opacity-80">{l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString()} sqft</div>
                    <div className="text-sm mt-1">{l.address}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section>
        <div className="container-wide">
          <CTA title="What’s Nearby" subtitle="Coffee, groceries, parks, transit and more" cta={<Link href={`#nearby`} className="btn-primary">Explore</Link>} />
        </div>
      </Section>
    </>
  );
}


