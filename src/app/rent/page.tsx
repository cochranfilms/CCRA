import Link from 'next/link';
import { Section } from '@/components/ui/section';

export const metadata = { title: 'Rent | Cross Creek Realty' };

export default function RentPage() {
  return (
    <>
      {/* Hero with background video and title card (matching site style) */}
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
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-[color:var(--brand-deep)] text-xs font-semibold tracking-widest uppercase">Rent with Cross Creek</div>
            <div className="mt-4 glass-effect-dark rounded-md p-6 md:p-8 shadow-premium">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">Luxury. Convenience. Care.</h1>
              <p className="mt-3 md:text-lg text-white/85 max-w-3xl">Renting made boutique. Discover thoughtfully managed homes across Atlanta&apos;s most desirable neighborhoods.</p>
              <div className="mt-4 h-1 w-28 bg-gradient-to-r from-amber-400 to-orange-500" />
              <div className="mt-6 flex gap-3">
                <Link href="/listings?mode=rent" className="btn-gold">View Available Rentals</Link>
                <Link href="https://century21intown.managebuilding.com/Resident/rental-application/new" className="btn-outline-inverse">Apply Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Section variant="light">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">Luxury. Convenience. Care. Renting made boutique.</h1>
          <p className="mb-6 max-w-3xl">Finding the right rental shouldn’t feel overwhelming. With Cross Creek Realty Atlanta, you’ll discover thoughtfully managed rental options across Atlanta’s most desirable neighborhoods.</p>
          <ul className="list-disc pl-5 space-y-2 mb-6 max-w-3xl">
            <li><strong>Available Rentals</strong> – Browse curated rental listings designed for comfort, convenience, and lifestyle.</li>
            <li><strong>Application</strong> – Our secure online application makes the process quick, transparent, and hassle-free.</li>
            <li><strong>Maintenance</strong> – Already a resident? Enjoy boutique-level care with 24/7 support.</li>
          </ul>
          <div className="flex gap-3 flex-wrap">
            <Link href="/listings?mode=rent" className="btn-primary">View Available Rentals</Link>
            <Link href="https://century21intown.managebuilding.com/Resident/rental-application/new" className="btn-outline">Apply Now</Link>
            <Link href="https://century21intown.managebuilding.com/Resident/portal/login" className="btn-outline">Resident Portal</Link>
          </div>
        </div>
      </Section>
      <Section variant="dark">
        <div className="container-wide">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-white">Why rent with us</h2>
            <p className="text-white/80 mt-2 max-w-3xl">Boutique-level care with 24/7 support, easy online tools, and curated neighborhoods across Atlanta.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Maintenance */}
            <article className="relative overflow-hidden border border-white/10 bg-white/5 p-6 text-white shadow-premium">
              <div className="inline-flex h-10 w-10 items-center justify-center bg-white text-[color:var(--brand-deep)] mb-4">🛠️</div>
              <h3 className="text-xl font-semibold">Responsive maintenance</h3>
              <p className="mt-2 text-white/85">24/7 maintenance requests with vetted vendors and proactive communication.</p>
            </article>
            {/* Portal */}
            <article className="relative overflow-hidden border border-white/10 bg-white/5 p-6 text-white shadow-premium">
              <div className="inline-flex h-10 w-10 items-center justify-center bg-white text-[color:var(--brand-deep)] mb-4">💻</div>
              <h3 className="text-xl font-semibold">Easy online portal</h3>
              <p className="mt-2 text-white/85">Pay rent, submit requests, and access documents from any device.</p>
            </article>
            {/* Neighborhoods */}
            <article className="relative overflow-hidden border border-white/10 bg-white/5 p-6 text-white shadow-premium">
              <div className="inline-flex h-10 w-10 items-center justify-center bg-white text-[color:var(--brand-deep)] mb-4">📍</div>
              <h3 className="text-xl font-semibold">Great neighborhoods</h3>
              <p className="mt-2 text-white/85">Thoughtfully managed homes in Atlanta’s most desirable, convenient areas.</p>
            </article>
          </div>
        </div>
      </Section>
      <Section variant="light">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-2">Get started</h2>
          <p className="mb-4">Luxury. Convenience. Care. Renting made boutique.</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/listings?mode=rent" className="btn-primary">View Available Rentals</Link>
            <Link href="https://century21intown.managebuilding.com/Resident/rental-application/new" className="btn-outline">Apply Now</Link>
            <Link href="/#contact" className="btn-outline">Talk to our team</Link>
          </div>
        </div>
      </Section>
    </>
  );
}


