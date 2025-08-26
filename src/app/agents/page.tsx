import { loadAgents } from '@/lib/data';
import { Section } from '@/components/ui/section';
import Link from 'next/link';

export const metadata = {
  title: 'Our Agents | Cross Creek Realty',
  description: 'Meet the Cross Creek Realty team serving metro Atlanta.',
};

export default async function AgentsPage({ searchParams }: { searchParams?: Promise<{ q?: string; specialty?: string; language?: string }> }) {
  const agents = await loadAgents();
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
    <Section>
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
          {filtered.map((a) => (
            <Link key={a.id} href={`/agents/${a.slug}`} className="card overflow-hidden group">
              <div className="aspect-[4/3] bg-[var(--muted)] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.photo} alt={a.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
              </div>
              <div className="p-4">
                <div className="font-medium">{a.name}</div>
                <div className="text-sm opacity-80">{a.title}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {a.specialties.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full border border-[var(--brand-deep)]/20">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}


