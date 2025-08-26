import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { loadListings } from '@/lib/data';

export const metadata = { title: 'Listings | Cross Creek Realty' };

export default async function ListingsIndex({ searchParams }: { searchParams?: Promise<{ q?: string; mode?: string }> }) {
  const sp = (await searchParams) ?? {};
  const q = sp.q?.toLowerCase() ?? '';
  const listings = await loadListings();
  const filtered = listings.filter((l) => !q || l.address.toLowerCase().includes(q) || l.communitySlug.toLowerCase().includes(q));
  return (
    <Section>
      <div className="container-wide">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">Listings</h1>
        <form className="mb-6 flex gap-2" action="/listings">
          <input className="p-3 rounded-none bg-transparent border flex-1" name="q" placeholder="Search by address, city, school, ZIP" defaultValue={q} />
          <button className="btn-primary">Search</button>
        </form>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((l) => (
            <Link key={l.id} href={`/listings/${l.id}`} className="card overflow-hidden group">
              <div className="aspect-[4/3] bg-[var(--muted)]" />
              <div className="p-4">
                <div className="font-medium">{l.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                <div className="text-sm opacity-80">{l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString()} sqft</div>
                <div className="text-sm mt-1">{l.address}</div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && <div className="opacity-70">No results.</div>}
        </div>
      </div>
    </Section>
  );
}


