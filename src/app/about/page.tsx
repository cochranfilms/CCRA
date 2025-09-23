import Link from 'next/link';
import { Section } from '@/components/ui/section';

export const metadata = { title: 'About Us | Cross Creek Realty Atlanta' };

export default function AboutPage() {
  return (
    <>
      <Section variant="dark" contained={false} className="relative overflow-hidden !py-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('/featured-map.jpg')] bg-center bg-no-repeat md:bg-cover opacity-20"></div>
        <div className="relative z-10">
          <div className="container-wide py-12 md:py-20">
            <div className="max-w-4xl">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold tracking-wider mb-6">
                ABOUT US
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Boutique Service. Big-Market Results.
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed">
                Cross Creek Realty Atlanta isn’t just another brokerage — we’re a legacy, a lifestyle, and a trusted partner in one of the nation’s most dynamic real estate markets.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="light" className="py-16 md:py-20">
        <div className="container-wide">
          <div className="prose prose-lg max-w-none">
            <p>
              For more than 40 years, we’ve been woven into the fabric of Atlanta’s growth, serving clients across Midtown, Intown, and beyond. From families buying their first home to developers shaping skylines, from investors building wealth to tenants seeking community — we’ve guided thousands of clients with integrity, strategy, and boutique-level attention.
            </p>
          </div>
        </div>
      </Section>

      <Section variant="dark" className="py-16 md:py-20">
        <div className="container-wide">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">What sets us apart?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white">Neighborhood Expertise</h3>
              <p className="text-white/85 mt-2">
                We don’t just work in Midtown, Buckhead, and the surrounding areas — we live here, invest here, and know every street, skyline view, and future development.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white">Multifaceted Services</h3>
              <p className="text-white/85 mt-2">
                Residential, commercial, new construction, distressed properties, or property management — our team delivers results across the spectrum, tailored to your goals.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white">Boutique Philosophy</h3>
              <p className="text-white/85 mt-2">
                Bigger isn’t always better. We believe in quality over quantity, relationships over transactions, and service that feels personal, not corporate.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white">Proven Legacy</h3>
              <p className="text-white/85 mt-2">
                Trusted by HUD, housing authorities, investors, developers, and generations of Atlanta families — our reputation is built on consistency and results.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 md:col-span-2">
              <h3 className="text-xl font-semibold text-white">Forward-Thinking Approach</h3>
              <p className="text-white/85 mt-2">
                While rooted in tradition, we embrace innovation. From cutting-edge CRM tools to marketing strategies that reach modern buyers, we position our clients for today’s success and tomorrow’s growth.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="light" className="py-16 md:py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-lg opacity-90">
              At Cross Creek Realty Atlanta, we’re redefining what it means to be a boutique brokerage. Driven by excellence, defined by results, and committed to community — we don’t just close deals, we open doors to new possibilities.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/agents" className="btn-primary">Meet Our Team</Link>
              <Link href="/contact" className="btn-outline">Contact Us Today</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


