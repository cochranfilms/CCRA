import { loadAgents } from '@/lib/data';
import { Section } from '@/components/ui/section';
import Link from 'next/link';

export const metadata = {
  title: 'Our Agents | Cross Creek Realty',
  description: 'Meet the Cross Creek Realty team serving metro Atlanta.',
};

export default async function AgentsPage({ searchParams }: { searchParams?: Promise<{ q?: string; specialty?: string; language?: string }> }) {
  const agents = await loadAgents();
  const STOCK: string[] = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop', // woman pro headshot
    'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop', // man pro headshot
    'https://images.unsplash.com/photo-1541753866388-0b3c701627d3?q=80&w=1200&auto=format&fit=crop', // smiling headshot
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop',
  ];
  const sp = (await searchParams) ?? {};
  const q = sp.q?.toLowerCase() ?? '';
  const specialty = sp.specialty;
  const language = sp.language;

  const filtered = agents.filter((a) => {
    const textMatch = !q || a.name.toLowerCase().includes(q) || a.serviceAreas.join(' ').includes(q);
    const specMatch = !specialty || a.specialties.includes(specialty);
    const langMatch = !language || a.languages.includes(language);
    return textMatch && specMatch && langMatch;
  });

  return (
    <>
      <Section variant="light">
        <div className="container-wide">
          <div className="mb-8 md:mb-10 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold">Our Agents</h1>
              <p className="opacity-80 mt-1">Strategic advisors across metro Atlanta communities.</p>
            </div>
            <Link href="/find-an-agent" className="btn-outline focus-ring">Find an Agent</Link>
          </div>

          <form className="grid md:grid-cols-4 gap-3 mb-8">
            <input className="card p-3" name="q" placeholder="Search by name or area" defaultValue={q} />
            <select className="card p-3" name="specialty" defaultValue={specialty ?? ''}>
              <option value="">All specialties</option>
              <option>Luxury</option>
              <option>Relocation</option>
              <option>First-Time Buyers</option>
              <option>Investment</option>
              <option>New Construction</option>
              <option>Condos</option>
            </select>
            <select className="card p-3" name="language" defaultValue={language ?? ''}>
              <option value="">All languages</option>
              <option>English</option>
              <option>Spanish</option>
              <option>Mandarin</option>
            </select>
            <button className="btn-primary focus-ring" type="submit">Apply</button>
          </form>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a, idx) => (
              <Link key={a.id} href={`/agents/${a.slug}`} className="card overflow-hidden group">
                <div className="aspect-[4/3] bg-[var(--muted)] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={(a.photo && !a.photo.endsWith('.svg')) ? a.photo : STOCK[idx % STOCK.length]} alt={a.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
                </div>
                <div className="p-4">
                  <div className="font-medium">{a.name}</div>
                  <div className="text-sm opacity-80">{a.title}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {a.specialties.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-none border border-[var(--brand-deep)]/20">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section variant="dark">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-6">Work with a specialist</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 text-[color:var(--brand-deep)] flex flex-col items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/window.svg" alt="Buy a home" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold">Buy a home</h3>
              <p className="opacity-80 mt-2">Connect with a local expert. Get transparent estimates and insights drawn from MLS comps.</p>
              <Link href="/find-an-agent" className="btn-outline mt-4">Find a local agent</Link>
            </div>
            <div className="card p-6 text-[color:var(--brand-deep)] flex flex-col items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/globe.svg" alt="Rent a home" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold">Rent a home</h3>
              <p className="opacity-80 mt-2">Browse verified rentals. Coming soon: MLS-sourced vacancy and pricing trends.</p>
              <Link href="/rent" className="btn-outline mt-4">Find rentals</Link>
            </div>
            <div className="card p-6 text-[color:var(--brand-deep)] flex flex-col items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/file.svg" alt="See today's rates" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold">See today&apos;s rates</h3>
              <p className="opacity-80 mt-2">Live mortgage rate snapshots and affordability charts will pull from lender/MLS integrations.</p>
              <Link href="/calculator" className="btn-outline mt-4">See rates</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


