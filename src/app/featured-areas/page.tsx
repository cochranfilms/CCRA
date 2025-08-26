import { Section } from '@/components/ui/section';
import { loadCommunities } from '@/lib/data';

export const metadata = {
  title: 'Our Service Areas | Cross Creek Realty',
};

export default async function FeaturedAreasPage() {
  const communities = await loadCommunities();
  const featured = communities.slice(0, 4);
  return (
    <>
      <Section contained={false}>
        <div className="container-wide">
          <h1 className="text-3xl md:text-5xl font-semibold">Our Service Areas</h1>
          <p className="opacity-80 mt-2 max-w-2xl">Discover Atlanta&#39;s most sought-after neighborhoods and communities.</p>
        </div>
      </Section>

      <Section>
        <div className="container-wide">
          <div className="rounded-none overflow-hidden bg-[var(--muted)]/40 h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="font-medium mb-1">Featured Areas Map</div>
              <div className="text-sm opacity-70">Add interactive Mapbox map here with polygons and markers</div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-4">Featured Communities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((c) => (
              <div key={c.slug} className="card p-4">
                <div className="font-medium">{c.name}</div>
                <div className="text-sm opacity-80">Median {c.stats.medianPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}


