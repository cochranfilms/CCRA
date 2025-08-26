import Link from 'next/link';
import { Section, Split, CTA } from '@/components/ui/section';
import HeroSearch from '@/components/ui/hero-search';

export default function Home() {
  return (
    <>
      <section className="relative section" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?q=80&w=2000&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-[var(--brand-deep)]/60" />
        <div className="relative container-wide">
          <div className="grid items-center md:grid-cols-2 gap-8 md:gap-12 text-white">
            <div>
              <div className="text-[var(--brand-accent)] text-sm mb-2">Cross Creek Realty</div>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Unlock your next chapter in metro Atlanta</h1>
              <p className="mt-4 opacity-90 max-w-xl">Buy, sell, or invest with a strategic advisory team focused on outcomes.</p>
              <div className="mt-6 flex gap-3">
                <Link href="/listings/l1" className="btn-primary">Browse Listings</Link>
                <Link href="/book" className="btn-outline">Book a Consult</Link>
              </div>
            </div>
            <HeroSearch />
          </div>
        </div>
      </section>

      <Section>
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Featured Listings</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="card overflow-hidden">
                <div className="aspect-[4/3] bg-[var(--muted)]" />
                <div className="p-4">
                  <div className="font-medium">$1,200,000</div>
                  <div className="text-sm opacity-80">4 bd · 3 ba · 3,000 sqft</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-wide">
          <CTA title="Why Cross Creek Realty" subtitle="Luxury marketing, local expertise, concierge service" cta={<Link href="/book" className="btn-primary">Talk to an Advisor</Link>} />
        </div>
      </Section>
    </>
  );
}
