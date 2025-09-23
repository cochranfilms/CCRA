import Link from 'next/link';
import { Section } from '@/components/ui/section';
import ContactForm from '@/components/ContactForm';

export const metadata = { title: 'Contact | Cross Creek Realty Atlanta' };

export default function ContactPage() {
  return (
    <>
      <Section variant="dark" contained={false} className="relative overflow-hidden !py-0">
        {/* Subtle real-estate background with lowered opacity */}
        <div
          className="absolute inset-0 bg-center bg-cover opacity-25"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2000&auto=format&fit=crop')" }}
        />
        {/* Dark gradient wash for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/80 to-slate-900/90"></div>
        <div className="relative z-10">
          <div className="container-wide py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <div className="flex flex-col h-full">
                <div className="glass-effect-dark rounded-md p-6 md:p-8 shadow-premium text-white">
                <div className="inline-flex items-center gap-2 text-[color:var(--brand-accent)] text-xs tracking-widest uppercase">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--brand-primary)] text-[color:var(--brand-deep)]">
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.4 22 2 13.6 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.2 2.47.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z"/></svg>
                  </span>
                  Get in touch
                </div>
                <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">Contact</h1>
                <p className="mt-3 text-white/85 max-w-prose">Your next move deserves boutique attention. Let’s start the conversation.</p>
                <div className="mt-6 space-y-3 text-white/90">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center bg-white/10 text-white rounded">
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>
                    </span>
                    <div>
                      <div>Cross Creek Realty Atlanta</div>
                      <div>1234 (Insert Office Address)</div>
                      <div>Atlanta, GA</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center bg-white/10 text-white rounded">
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.4 22 2 13.6 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.2 2.47.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z"/></svg>
                    </span>
                    <a href="tel:14045550123" className="hover:underline">(404) 555-0123</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center bg-white/10 text-white rounded">
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>
                    </span>
                    <a href="mailto:info@crosscreekrealty.com" className="hover:underline">info@crosscreekrealty.com</a>
                  </div>
                </div>
                </div>
                <div className="mt-6 md:mt-8 grid grid-cols-2 gap-4 mt-auto">
                  <Link href="/listings" className="group block p-4 bg-white border border-[color:var(--brand-deep)]/10 hover:border-[color:var(--brand-deep)]/25 shadow-premium hover-lift transition-premium text-[color:var(--brand-deep)]">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center bg-[color:var(--brand-deep)] text-white">
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 3 10h2v10h6V14h2v6h6V10h2z"/></svg>
                      </span>
                      <div>
                        <div className="font-semibold">Browse Listings</div>
                        <div className="text-xs opacity-70">Explore homes now</div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/listings?mode=rent" className="group block p-4 bg-white border border-[color:var(--brand-deep)]/10 hover:border-[color:var(--brand-deep)]/25 shadow-premium hover-lift transition-premium text-[color:var(--brand-deep)]">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center bg-[color:var(--brand-deep)] text-white">
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 3a7 7 0 1 0 6.32 10H22l-2 2v2h-2v2h-2v2h-2v-3.17l4.59-4.58A7 7 0 0 0 14 3Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/></svg>
                      </span>
                      <div>
                        <div className="font-semibold">Available Rentals</div>
                        <div className="text-xs opacity-70">See inventory</div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/property-management/owners" className="group block p-4 bg-white border border-[color:var(--brand-deep)]/10 hover:border-[color:var(--brand-deep)]/25 shadow-premium hover-lift transition-premium text-[color:var(--brand-deep)]">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center bg-[color:var(--brand-deep)] text-white">
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h4v8H3v-8Zm7-6h4v14h-4V7Zm7-4h4v18h-4V3Z"/></svg>
                      </span>
                      <div>
                        <div className="font-semibold">Owner Services</div>
                        <div className="text-xs opacity-70">Protect returns</div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/book" className="group block p-4 bg-[color:var(--brand-deep)] text-white border border-[color:var(--brand-deep)] shadow-premium-glow hover-scale transition-premium">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center bg-white text-[color:var(--brand-deep)]">
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h2v3h8V2h2v3h3v17H3V5h3V2Zm0 7v2h12V9H6Zm0 4v2h12v-2H6Z"/></svg>
                      </span>
                      <div>
                        <div className="font-semibold">Book a Consult</div>
                        <div className="text-xs opacity-80">Personalized plan</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Section>

      

      {/* Helpful details */}
      <Section variant="light">
        <div className="container-wide grid md:grid-cols-3 gap-6">
          <div className="card p-6 shadow-premium">
            <div className="text-sm opacity-80">Call us</div>
            <div className="mt-1 text-xl font-semibold">(404) 355-2833</div>
            <Link href="tel:14043552833" className="mt-4 inline-block btn-outline">Tap to Call</Link>
          </div>
          <div className="card p-6 shadow-premium">
            <div className="text-sm opacity-80">Email</div>
            <div className="mt-1 text-xl font-semibold">info@crosscreekrealtyatl.com</div>
            <a href="mailto:info@crosscreekrealtyatl.com" className="mt-4 inline-block btn-outline">Compose Email</a>
          </div>
          <div className="card p-6 shadow-premium">
            <div className="text-sm opacity-80">Office Hours</div>
            <ul className="mt-1 opacity-90">
              <li>Mon–Fri: 9:00a – 6:00p</li>
              <li>Sat: By appointment</li>
              <li>Sun: Closed</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}

 

