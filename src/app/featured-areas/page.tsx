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
      {/* Hero with stock real estate video and title card (match style) */}
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
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-[color:var(--brand-deep)] text-xs font-semibold tracking-widest uppercase">Explore Atlanta</div>
            <div className="mt-4 glass-effect-dark rounded-md p-6 md:p-8 shadow-premium">
              <h1 className="text-3xl md:text-6xl font-bold leading-tight">From Fulton to Gwinnett</h1>
              <p className="mt-3 md:text-lg text-white/85 max-w-3xl">Discover where value and opportunity thrive across Metro Atlanta.</p>
              <div className="mt-4 h-1 w-28 bg-gradient-to-r from-amber-400 to-orange-500" />
            </div>
          </div>
        </div>
      </section>

      <Section variant="dark">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-2">Where we specialize</h2>
          <p className="opacity-90 max-w-3xl">Metro Atlanta is a dynamic landscape of opportunity. Whether you’re seeking investment potential, family-focused living, or vibrant city access, we help you unlock the right county for your goals.</p>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-effect-dark rounded-md p-6 shadow-premium">
              <div className="inline-flex h-10 w-10 items-center justify-center bg-white text-[color:var(--brand-deep)] mb-3">
                <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 2 7l10 5 10-5-10-5Zm0 7-10 5 10 5 10-5-10-5Zm-10 8 10 5 10-5v2l-10 5-10-5v-2Z"/></svg>
              </div>
              <h3 className="text-xl font-semibold">Fulton County</h3>
              <p className="mt-1 text-white/85">Atlanta’s powerhouse of business, culture, and opportunity.</p>
            </div>
            <div className="glass-effect-dark rounded-md p-6 shadow-premium">
              <div className="inline-flex h-10 w-10 items-center justify-center bg-white text-[color:var(--brand-deep)] mb-3">
                <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v4H4V4Zm0 6h10v4H4v-4Zm0 6h16v4H4v-4Z"/></svg>
              </div>
              <h3 className="text-xl font-semibold">Cobb County</h3>
              <p className="mt-1 text-white/85">A balance of suburban comfort and city proximity.</p>
            </div>
            <div className="glass-effect-dark rounded-md p-6 shadow-premium">
              <div className="inline-flex h-10 w-10 items-center justify-center bg-white text-[color:var(--brand-deep)] mb-3">
                <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm-9 18v-2a6 6 0 0 1 12 0v2H3Z"/></svg>
              </div>
              <h3 className="text-xl font-semibold">DeKalb County</h3>
              <p className="mt-1 text-white/85">A diverse mix of historic charm and growth.</p>
            </div>
            <div className="glass-effect-dark rounded-md p-6 shadow-premium">
              <div className="inline-flex h-10 w-10 items-center justify-center bg-white text-[color:var(--brand-deep)] mb-3">
                <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 2 7l10 5 10-5-10-5Zm0 7-10 5 10 5 10-5-10-5Zm-10 8 10 5 10-5v2l-10 5-10-5v-2Z"/></svg>
              </div>
              <h3 className="text-xl font-semibold">Gwinnett County</h3>
              <p className="mt-1 text-white/85">One of the fastest-growing counties, known for family-friendly communities.</p>
            </div>
          </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((c) => (
              <div key={c.slug} className="relative overflow-hidden border border-[color:var(--brand-deep)]/10 bg-white shadow-premium group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://source.unsplash.com/featured/800x600/?neighborhood,${encodeURIComponent(c.name)}`} alt={c.name} className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="p-4 text-[color:var(--brand-deep)]">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm opacity-80">Median {c.stats.medianPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a href="/listings" className="btn-primary">Search Homes by County</a>
          </div>
        </div>
      </Section>
    </>
  );
}


