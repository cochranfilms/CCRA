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
      {/* Hero with background video and title card (matching Join page style) */}
      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/realty.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
        <div className="relative container-wide h-full flex items-center">
          <div className="max-w-5xl text-white">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-[color:var(--brand-deep)] text-xs font-semibold tracking-widest uppercase">
              Our Team
            </div>
            <div className="mt-4 glass-effect-dark rounded-md p-6 md:p-8 shadow-premium">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">Meet the Agents of <span className="text-amber-400">Cross Creek</span></h1>
              <p className="mt-3 md:text-lg text-white/85 max-w-3xl">Strategic advisors with local expertise—committed to results and client experience.</p>
              <div className="mt-4 h-1 w-28 bg-gradient-to-r from-amber-400 to-orange-500" />
            </div>
          </div>
        </div>
      </section>

      <Section variant="light">
        <div className="container-wide">
          <div className="mb-8 md:mb-10 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold">Real advisors. Real expertise. Real results.</h1>
              <p className="opacity-80 mt-1 max-w-3xl">Our agents aren’t just salespeople — they’re trusted guides. Each advisor brings specialized expertise, boutique-level service, and a passion for helping clients achieve their goals.</p>
              <ul className="list-disc pl-6 mt-3 space-y-1 opacity-90">
                <li><strong>Meet Our Team</strong> – Local experts dedicated to excellence.</li>
                <li><strong>Find an Agent</strong> – Connect with the advisor best suited to your lifestyle and goals.</li>
                <li><strong>Join Our Team</strong> – Grow your career with mentorship, cutting-edge tools, and a boutique brand that sets you apart.</li>
              </ul>
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
              <h3 className="text-xl font-semibold">Meet Our Team</h3>
              <p className="opacity-80 mt-2">Connect with a local expert. Get transparent estimates and insights drawn from MLS comps.</p>
              <Link href="/find-an-agent" className="btn-outline mt-4">Find a local agent</Link>
            </div>
            <div className="card p-6 text-[color:var(--brand-deep)] flex flex-col items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/globe.svg" alt="Rent a home" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold">Find an Agent</h3>
              <p className="opacity-80 mt-2">Browse by specialty, language, or area to connect with your ideal advisor.</p>
              <Link href="/find-an-agent" className="btn-outline mt-4">Find an Agent</Link>
            </div>
            <div className="card p-6 text-[color:var(--brand-deep)] flex flex-col items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/file.svg" alt="See today's rates" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold">Join Our Team</h3>
              <p className="opacity-80 mt-2">Grow your career with mentorship, cutting-edge tools, and a boutique brand.</p>
              <Link href="/agents/join" className="btn-outline mt-4">Apply to Join</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


