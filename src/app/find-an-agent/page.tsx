import { loadAgents } from '@/lib/data';
import { Section } from '@/components/ui/section';
import Link from 'next/link';

export const metadata = {
  title: 'Find an Agent | Cross Creek Realty',
};

export default async function FindAgentPage({ searchParams }: { searchParams?: Promise<Record<string, string>> }) {
  const agents = await loadAgents();
  const sp = (await searchParams) ?? {};
  const q = (sp.q ?? '').toLowerCase();
  const filtered = agents.filter((a) => !q || a.name.toLowerCase().includes(q));
  const STOCK: string[] = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541753866388-0b3c701627d3?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop',
  ];

  return (
    <Section>
      <div className="container-wide">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">Find an Agent</h1>
        <form className="flex gap-3 mb-6">
          <input className="card p-3 flex-1" name="q" placeholder="Search by name, area, specialty" defaultValue={q} />
          <button className="btn-primary" type="submit">Search</button>
        </form>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="card overflow-hidden h-[420px] bg-[var(--muted)]/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1496568816309-51d7c20e1fd5?q=80&w=1600&auto=format&fit=crop"
                alt="Map placeholder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="grid gap-4 max-h-[420px] overflow-auto pr-2">
              {filtered.map((a, idx) => (
                <Link key={a.id} href={`/agents/${a.slug}`} className="card p-4 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={(a.photo && !a.photo.endsWith('.svg')) ? a.photo : STOCK[idx % STOCK.length]} alt={a.name} className="w-16 h-16 rounded-none object-cover bg-[var(--muted)]" />
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-sm opacity-80">{a.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <form className="card p-4 grid md:grid-cols-4 gap-3" action="/api/leads" method="post">
            <input className="p-3 rounded-none bg-transparent border" name="name" placeholder="Name" required />
            <input className="p-3 rounded-none bg-transparent border" name="email" placeholder="Email" required />
            <input className="p-3 rounded-none bg-transparent border" name="zip" placeholder="ZIP" />
            <button className="btn-primary" type="submit">Match Me</button>
          </form>
        </div>
      </div>
    </Section>
  );
}


