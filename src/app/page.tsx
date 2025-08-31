import Link from 'next/link';
import { Section, Split, CTA } from '@/components/ui/section';
import HeroSearch from '@/components/ui/hero-search';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <>
      <section className="relative section overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover -z-10 pointer-events-none"
          src="/Interior_real_estate.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-[var(--brand-deep)]/60 pointer-events-none" />
        <div className="relative container-wide">
          <div className="grid items-center md:grid-cols-2 gap-8 md:gap-12 text-white">
            <div>
              <div className="text-[var(--brand-accent)] text-sm mb-2">Cross Creek Realty</div>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Unlock your next chapter in metro Atlanta</h1>
              <p className="mt-4 opacity-90 max-w-xl">Buy, sell, or invest with a strategic advisory team focused on outcomes.</p>
              <div className="mt-6 flex gap-3">
                <Link href="/listings/l1" className="btn-primary">Browse Listings</Link>
                <Link href="/book" className="btn-outline-inverse">Book a Consult</Link>
              </div>
            </div>
            <HeroSearch />
          </div>
        </div>
      </section>

      <Section variant="light">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Featured Listings</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
            ].map((src, i) => (
              <div key={i} className="card overflow-hidden group">
                <div className="aspect-[4/3] bg-[var(--muted)] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="Featured listing" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
                </div>
                <div className="p-4">
                  <div className="font-medium">$1,200,000</div>
                  <div className="text-sm opacity-80">4 bd · 3 ba · 3,000 sqft</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why Cross Creek Realty - image background with 50% black overlay and two cards */}
      <section className="relative section overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-center bg-cover pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="relative container-wide">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            <div className="card overflow-hidden border border-white/20 shadow-[0_35px_80px_-25px_rgba(0,0,0,0.6)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop"
                alt="Beautiful home interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="card p-8 md:p-10 text-[color:var(--brand-deep)] border border-white/20 shadow-[0_35px_80px_-25px_rgba(0,0,0,0.6)]">
              <h3 className="text-2xl md:text-3xl font-semibold">Why Cross Creek Realty</h3>
              <p className="mt-3 max-w-prose">
                Luxury marketing, local expertise, concierge service. We combine data-driven strategy with
                white‑glove guidance to help you buy or sell confidently across metro Atlanta.
              </p>
              <ul className="mt-4 space-y-2 text-sm md:text-base">
                <li>• Strategic pricing and positioning</li>
                <li>• Best‑in‑class photography and marketing</li>
                <li>• Skilled negotiation and seamless closing</li>
              </ul>
              <div className="mt-6">
                <Link href="/book" className="btn-primary">Talk to an Advisor</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section variant="light">
        <div className="container-wide" id="contact">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Get in Touch</h2>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
