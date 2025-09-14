import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { PropertyManagementNav } from '@/components/pm/PropertyManagementNav';

export const metadata = { title: 'Property Management | Cross Creek Realty Atlanta' };

export default function PropertyManagementHomePage() {
  return (
    <>
      <PropertyManagementNav />
      <Section variant="dark" contained={false} className="relative overflow-hidden !py-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div
          className="absolute inset-0 bg-center bg-no-repeat md:bg-cover opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="relative z-10">
          <div className="container-wide py-12 md:py-20">
            <div className="max-w-4xl">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold tracking-wider mb-6">
                PROPERTY MANAGEMENT IN METRO ATLANTA
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Protecting Your Investment.
                <span className="block text-4xl md:text-5xl font-light text-amber-400 mt-2">Maximizing Your Return. Simplifying Your Life.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl leading-relaxed">
                Cross Creek Realty Atlanta is a full-service boutique brokerage specializing in residential, commercial, and property management. With over 40 years of combined experience, we’ve helped countless Atlanta property owners reduce stress, protect their assets, and maximize profitability.
              </p>
              <p className="text-white/90 max-w-3xl mb-10">
                Whether you own a single-family home, multi-unit property, or commercial space, our proven systems and dedicated team deliver peace of mind with measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-12">
                <Link href="/property-management/contact" className="btn-primary">Call for Free Rental Analysis – (404) 355-2833</Link>
                <Link href="/property-management/services" className="btn-secondary">Explore Services</Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">Property Marketing</h3>
            <p>Attract the right tenants fast.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">Tenant Screening</h3>
            <p>Protect your investment with quality tenants.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">Owner Portal</h3>
            <p>Real-time access to your property’s performance.</p>
          </div>
        </div>
      </Section>

      <Section variant="dark">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="opacity-90 mb-4">At Cross Creek Realty Atlanta, we’re more than property managers — we’re trusted partners in your investment journey. As a boutique brokerage, we offer the best of both worlds: the technology and efficiency of a large firm combined with the personal touch and accountability of a local partner.</p>
            <ul className="space-y-2 opacity-90">
              <li>• Deep expertise across Midtown, West Midtown, Intown, Buckhead, BeltLine, and beyond.</li>
              <li>• Full-service brokerage handling residential, commercial, and distressed properties.</li>
              <li>• Commitment to compliance and ethics, keeping you aligned with GREC, fair housing, and local laws.</li>
              <li>• A culture built on excellence, transparency, and results.</li>
            </ul>
          </div>
          <div className="card p-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600&auto=format&fit=crop"
              alt="Team reviewing property management strategy"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Owner & Tenant Services</h3>
            <p className="opacity-80">Explore services tailored to owners and tenants—from leasing and accounting to portal access and maintenance.</p>
            <div className="mt-4 flex gap-3">
              <Link className="btn-primary" href="/property-management/owners">For Owners</Link>
              <Link className="btn-secondary" href="/property-management/tenants">For Tenants</Link>
            </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="card p-8 md:p-10 text-[color:var(--brand-deep)]">
          <h3 className="text-2xl font-semibold">Available Rentals</h3>
          <p className="opacity-80 mt-2">Explore current rental opportunities across Atlanta including Midtown, West Midtown, Buckhead, Intown, and more.</p>
          <div className="mt-4">
            <Link href="/property-management/rentals" className="btn-primary">Browse Available Rentals</Link>
          </div>
        </div>
      </Section>
    </>
  );
}


