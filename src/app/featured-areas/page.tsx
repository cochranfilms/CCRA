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
      <section
        className="relative section overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2000&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative container-wide text-white">
          <h1 className="text-3xl md:text-5xl font-semibold">Our Service Areas</h1>
          <p className="mt-2 max-w-2xl opacity-95">Discover Atlanta&#39;s most sought-after neighborhoods and communities.</p>
        </div>
      </section>

      <Section variant="dark">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-2">Where we specialize</h2>
          <p className="opacity-90 max-w-3xl">North Fulton suburbs, intown luxury, and family-friendly communities across the metro.</p>
        </div>
      </Section>

      <Section contained={false}>
        <div className="relative w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/featured-map.jpg"
            alt="Service areas map"
            className="w-full h-auto block"
          />
        </div>
      </Section>

      <Section variant="light">
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


