import Link from 'next/link';
import { Section } from '@/components/ui/section';

export const metadata = { title: 'Sell | Cross Creek Realty' };

export default function SellPage() {
  return (
    <>
      {/* Hero with unique stock real estate video and title card - adjusted copy */}
      <section className="relative h-[44vh] md:h-[60vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/Interior_real_estate.mp4"
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
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-[color:var(--brand-deep)] text-xs font-semibold tracking-widest uppercase">Sell with Confidence</div>
            <div className="mt-4 glass-effect-dark rounded-md p-6 md:p-8 shadow-premium">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">Your story deserves the right stage</h1>
              <p className="mt-3 md:text-lg text-white/85 max-w-3xl">We position your property to shine. Selling a home in Atlanta’s competitive market requires more than a listing — it demands a strategy. Our boutique approach includes professional staging, premium marketing campaigns, targeted outreach, and expert negotiation.</p>
              <div className="mt-4 h-1 w-28 bg-gradient-to-r from-amber-400 to-orange-500" />
              <div className="mt-6 flex gap-3">
                <Link href="/contact?role=Seller" className="btn-gold">Talk to a Seller Advisor</Link>
                <Link href="/calculator" className="btn-outline-inverse">Payment Calculator</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Section variant="dark">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold mb-1">Our listing process</h2>
          <p className="opacity-85 mb-6 max-w-3xl">A proven, concierge approach that turns preparation into premium and marketing into momentum.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative overflow-hidden border border-white/10 bg-white/5 p-6 text-white shadow-premium">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 to-transparent" />
              <div className="inline-flex h-10 w-10 items-center justify-center bg-white text-[color:var(--brand-deep)] mb-4">
                <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 2 7l10 5 10-5-10-5Zm0 7-10 5 10 5 10-5-10-5Zm-10 8 10 5 10-5v2l-10 5-10-5v-2Z"/></svg>
              </div>
              <h3 className="text-xl font-semibold">Preparation & Staging</h3>
              <p className="mt-2 text-white/85">Data‑driven pricing, punch‑list coordination, pro styling, and high‑impact upgrades to maximize first impressions.</p>
              <ul className="mt-3 text-sm text-white/80 space-y-1">
                <li>• Vendor coordination and oversight</li>
                <li>• Staging plan and execution</li>
                <li>• Pre‑launch checklist</li>
              </ul>
            </div>
            <div className="relative overflow-hidden border border-white/10 bg-white/5 p-6 text-white shadow-premium">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 to-transparent" />
              <div className="inline-flex h-10 w-10 items-center justify-center bg-white text-[color:var(--brand-deep)] mb-4">
                <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v4H4V4Zm0 6h10v4H4v-4Zm0 6h16v4H4v-4Z"/></svg>
              </div>
              <h3 className="text-xl font-semibold">Launch & Marketing</h3>
              <p className="mt-2 text-white/85">Cinematic media, premium print, social + portal syndication, and agent network exposure on day one.</p>
              <ul className="mt-3 text-sm text-white/80 space-y-1">
                <li>• HDR photo + film</li>
                <li>• Targeted ads and email</li>
                <li>• MLS + portal optimization</li>
              </ul>
            </div>
            <div className="relative overflow-hidden border border-white/10 bg-white/5 p-6 text-white shadow-premium">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 to-transparent" />
              <div className="inline-flex h-10 w-10 items-center justify-center bg-white text-[color:var(--brand-deep)] mb-4">
                <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 0 1 5 5c0 1.38-.56 2.63-1.46 3.54l-1.46 1.46 6.46 6.46-2.12 2.12-6.46-6.46-1.46 1.46A5 5 0 1 1 12 2Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>
              </div>
              <h3 className="text-xl font-semibold">Negotiation & Closing</h3>
              <p className="mt-2 text-white/85">Skilled negotiation, risk mitigation, and coordination through appraisal, inspection, and escrow to a smooth close.</p>
              <ul className="mt-3 text-sm text-white/80 space-y-1">
                <li>• Offer strategy and vetting</li>
                <li>• Inspection/appraisal guidance</li>
                <li>• Closing coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
      <Section variant="light">
        <div className="container-wide">
          <div className="card p-8 md:p-10 text-[color:var(--brand-deep)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-premium">
            <div>
              <div className="inline-block px-3 py-1 text-xs tracking-widest uppercase bg-[color:var(--brand-deep)] text-white">
                No‑obligation
              </div>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold">Request Your Home Valuation</h2>
              <p className="opacity-80 mt-2 max-w-prose">With Cross Creek, your home becomes more than a property — it becomes a story that sells.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact?role=Seller" className="btn-primary">Request Home Valuation</Link>
              <Link href="/book" className="btn-outline">Book a Consult</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


