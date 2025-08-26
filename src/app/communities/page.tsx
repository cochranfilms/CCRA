import { loadCommunities } from '@/lib/data';
import { Section } from '@/components/ui/section';
import Link from 'next/link';

export const metadata = {
  title: 'Communities | Cross Creek Realty',
};

export default async function CommunitiesPage() {
  const communities = await loadCommunities();
  return (
    <Section>
      <div className="container-wide">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">Communities</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((c) => (
            <Link key={c.slug} href={`/communities/${c.slug}`} className="card overflow-hidden group">
              <div className="aspect-[4/3] bg-[var(--muted)] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.heroImage} alt={c.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
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
  );
}


