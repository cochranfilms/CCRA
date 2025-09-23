import { Section } from '@/components/ui/section';
import { Metrics } from '@/components/ui/section';
import { PropertyManagementNav } from '@/components/pm/PropertyManagementNav';

export const metadata = { title: 'About Property Management | Cross Creek Realty Atlanta' };

export default function PMAboutPage() {
  return (
    <>
      <PropertyManagementNav />
      <Section variant="dark" contained={false} className="relative overflow-hidden !py-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div
          className="absolute inset-0 bg-center bg-no-repeat md:bg-cover opacity-25"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="relative z-10">
          <div className="container-wide py-12 md:py-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white">About Us</h1>
            <p className="mt-6 max-w-3xl text-white/90">At Cross Creek Realty Atlanta, we’re more than property managers — we’re trusted partners in your investment journey. As a boutique brokerage, we offer the best of both worlds: the technology and efficiency of a large firm combined with the personal touch and accountability of a local partner.</p>
          </div>
        </div>
      </Section>
      <Section contained={false} className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(800px_400px_at_20%_-10%,#f59e0b,transparent),radial-gradient(800px_400px_at_80%_-10%,#ea580c,transparent)]" />
        <div className="container-wide relative">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs tracking-wider">WHY OWNERS CHOOSE US</div>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[color:var(--brand-deep)]">What Sets Us Apart</h2>
              <p className="mt-3 md:text-lg opacity-80 max-w-2xl">Boutique-level service, enterprise-grade systems. We protect your asset, elevate the resident experience, and deliver consistent performance with accountable, transparent management.</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">✓</span><span>Deep expertise across Midtown, West Midtown, Intown, Buckhead, BeltLine, and beyond.</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">✓</span><span>Full-service brokerage handling residential, commercial, and distressed properties.</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">✓</span><span>Compliance-first operations aligned with GREC, fair housing, and local laws.</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">✓</span><span>A culture built on excellence, transparency, and measurable results.</span></li>
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="/property-management/contact" className="btn-primary">Talk to a Property Manager</a>
                <a href="https://signin.managebuilding.com/manager/public/authentication/login" target="_blank" rel="noopener noreferrer" className="btn-secondary">Owner Portal</a>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg shadow-premium">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?q=80&w=1600&auto=format&fit=crop"
                  alt="Atlanta skyline and neighborhoods"
                  className="w-full h-[320px] md:h-[380px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 bg-white text-[color:var(--brand-deep)] shadow-premium rounded-md px-4 py-2 text-sm md:text-base flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-sm">★</span>
                <span>4.9/5 Owner Satisfaction</span>
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-[color:var(--brand-deep)] text-white shadow-premium rounded-md px-4 py-2 text-sm md:text-base">40+ Years Combined</div>
            </div>
          </div>

          <div className="mt-10">
            <Metrics
              items={[
                { label: 'Owner Retention', value: '94%' },
                { label: 'On‑Time Rent', value: '98%' },
                { label: 'Avg Response Time', value: '24h' },
                { label: 'Avg. Lease-Up', value: '21 days' },
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}


