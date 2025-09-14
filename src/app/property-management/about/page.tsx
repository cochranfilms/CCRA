import { Section } from '@/components/ui/section';
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
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-3">What Sets Us Apart</h2>
            <ul className="space-y-2">
              <li>• Deep expertise across Midtown, West Midtown, Intown, Buckhead, BeltLine, and beyond.</li>
              <li>• Full-service brokerage handling residential, commercial, and distressed properties.</li>
              <li>• Commitment to compliance and ethics, keeping you aligned with GREC, fair housing, and local laws.</li>
              <li>• A culture built on excellence, transparency, and results.</li>
            </ul>
          </div>
          <div className="card p-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?q=80&w=1600&auto=format&fit=crop"
              alt="Atlanta skyline and neighborhoods"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </Section>
    </>
  );
}


