import Link from 'next/link';
import { Section } from '@/components/ui/section';

export const metadata = { title: 'Scheduled Maintenance | Cross Creek Realty Atlanta' };

export default function MaintenancePage() {
  return (
    <>
      <Section variant="dark" contained={false} className="relative overflow-hidden !py-0">
        <div
          className="absolute inset-0 bg-center bg-cover opacity-25"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/80 to-slate-900/90"></div>
        <div className="relative z-10">
          <div className="container-wide py-14 md:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[color:var(--brand-accent)] text-xs tracking-widest uppercase">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--brand-primary)] text-[color:var(--brand-deep)]">
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11 3h2v10h-2V3Zm1 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/></svg>
                </span>
                Scheduled Update
              </div>
              <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">Were briefly down for maintenance</h1>
              <p className="mt-4 text-white/85 max-w-prose">
                Were improving our experience and will be back online shortly. Thanks for your
                patience. In the meantime, you can still reach our team directly.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a href="tel:14043552833" className="group block p-4 bg-white/5 border border-white/15 hover:border-white/30 text-white shadow-premium hover-lift transition-premium">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center bg-white text-[color:var(--brand-deep)]">
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.4 22 2 13.6 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.2 2.47.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z"/></svg>
                    </span>
                    <div>
                      <div className="font-semibold">Call Us</div>
                      <div className="text-xs opacity-80">(404) 355-2833</div>
                    </div>
                  </div>
                </a>
                <a href="mailto:info@crosscreekrealtyatl.com" className="group block p-4 bg-white/5 border border-white/15 hover:border-white/30 text-white shadow-premium hover-lift transition-premium">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center bg-white text-[color:var(--brand-deep)]">
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>
                    </span>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-xs opacity-80">info@crosscreekrealtyatl.com</div>
                    </div>
                  </div>
                </a>
                <Link href="/book" className="group block p-4 bg-[color:var(--brand-primary)] text-[color:var(--brand-deep)] border border-[color:var(--brand-primary)] shadow-premium-glow hover-scale transition-premium">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center bg-[color:var(--brand-deep)] text-white">
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h2v3h8V2h2v3h3v17H3V5h3V2Zm0 7v2h12V9H6Zm0 4v2h12v-2H6Z"/></svg>
                    </span>
                    <div>
                      <div className="font-semibold">Book a Consult</div>
                      <div className="text-xs opacity-80">Well follow up quickly</div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="mt-10 text-white/70 text-sm">
                Expected downtime: under 30 minutes. Thanks for your understanding.
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="light">
        <div className="container-wide">
          <div className="card p-6 md:p-8 shadow-premium">
            <h2 className="text-xl md:text-2xl font-semibold text-[color:var(--brand-deep)]">Looking for listings right now?</h2>
            <p className="mt-2 opacity-80">Browse our active inventory once were back, or call us to get a concierge tour arranged the moment we go live.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/listings" className="btn-outline">Browse for Sale</Link>
              <Link href="/listings?mode=rent" className="btn-outline">Browse Rentals</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


