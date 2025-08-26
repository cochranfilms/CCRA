import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { loadListings } from '@/lib/data';

export const metadata = { title: 'Listings | Cross Creek Realty' };

export default async function ListingsIndex({ searchParams }: { searchParams?: Promise<{ q?: string; mode?: string }> }) {
  const sp = (await searchParams) ?? {};
  const q = sp.q?.toLowerCase() ?? '';
  const listings = await loadListings();
  const filtered = listings.filter((l) => !q || l.address.toLowerCase().includes(q) || l.communitySlug.toLowerCase().includes(q));
  const STOCK: string[] = [
    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560448075-bb4caa6c1e1e?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop',
  ];
  return (
    <Section>
      <div className="container-wide">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">Listings</h1>
        <form className="mb-6 flex gap-2" action="/listings">
          <input className="p-3 rounded-none bg-transparent border flex-1" name="q" placeholder="Search by address, city, school, ZIP" defaultValue={q} />
          <button className="btn-primary">Search</button>
        </form>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((l, idx) => (
            <Link key={l.id} href={`/listings/${l.id}`} className="card overflow-hidden group">
              <div className="aspect-[4/3] bg-[var(--muted)] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={(Array.isArray((l as unknown as { photos?: string[] }).photos) && (l as unknown as { photos?: string[] }).photos![0] && !((l as unknown as { photos?: string[] }).photos![0] as string).endsWith('.svg'))
                    ? (l as unknown as { photos?: string[] }).photos![0] as string
                    : STOCK[idx % STOCK.length]}
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
          {filtered.length === 0 && <div className="opacity-70">No results.</div>}
        </div>
      </div>
    </Section>
  );
}


