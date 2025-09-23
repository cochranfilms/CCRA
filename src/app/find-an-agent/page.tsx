import { loadAgents } from '@/lib/data';
import { Section } from '@/components/ui/section';
import Link from 'next/link';
import QuickLeadForm from '@/components/QuickLeadForm';

export const metadata = {
  title: 'Find an Agent | Cross Creek Realty',
};

// Render at request time to avoid long build-time external calls
export const dynamic = 'force-dynamic';

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
    <>
      {/* Hero with background video and title card (consistent with Agents/Join) */}
      <section className="relative h-[44vh] md:h-[60vh] overflow-hidden">
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
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-[color:var(--brand-deep)] text-xs font-semibold tracking-widest uppercase">Find Your Advisor</div>
            <div className="mt-4 glass-effect-dark rounded-md p-6 md:p-8 shadow-premium">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">Find an <span className="text-amber-400">Agent</span></h1>
              <p className="mt-3 md:text-lg text-white/85 max-w-3xl">Match with a local specialist for buying, selling, or investing across metro Atlanta.</p>
              <div className="mt-4 h-1 w-28 bg-gradient-to-r from-amber-400 to-orange-500" />
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="container-wide">
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
          <QuickLeadForm />
        </div>
        </div>
      </Section>
    </>
  );
}
