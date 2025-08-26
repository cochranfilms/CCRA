import { loadCommunities } from '@/lib/data';
import { Section } from '@/components/ui/section';
import Link from 'next/link';

export const metadata = {
  title: 'Communities | Cross Creek Realty',
};

export default async function CommunitiesPage() {
  const communities = await loadCommunities();
  return (
    <>
      <Section contained={false}>
        <div className="container-wide">
          <div className="rounded-none overflow-hidden h-64 md:h-80 bg-[var(--muted)]/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?q=80&w=1600&auto=format&fit=crop"
              alt="Communities skyline"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Section>
      <Section variant="dark">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-2">Explore Atlanta Areas</h2>
          <p className="opacity-90 max-w-3xl">From intown high-rises to North Fulton cul‑de‑sacs, browse communities to compare lifestyle, schools, commute, and nearby amenities.</p>
        </div>
      </Section>
      <Section>
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Communities</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((c, idx) => (
              <Link key={c.slug} href={`/communities/${c.slug}`} className="card overflow-hidden group">
                <div className="aspect-[4/3] bg-[var(--muted)] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={!c.heroImage.endsWith('.svg') ? c.heroImage : `https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop`} alt={c.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
                </div>
                <div className="p-4">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-sm opacity-80">Median {c.stats.medianPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} · DOM {c.stats.dom}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}


