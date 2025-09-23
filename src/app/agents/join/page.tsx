import { Section } from '@/components/ui/section';
import Link from 'next/link';

export const metadata = { title: 'Join as an Agent | Cross Creek Realty' };

export default function JoinAgentPage() {
  return (
    <>
      {/* Full-bleed hero inspired by reference */}
      <section
        className="relative h-[60vh] md:h-[78vh] overflow-hidden"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/realty.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
        <div className="relative container-wide h-full flex items-center">
          <div className="max-w-5xl text-white">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-[color:var(--brand-deep)] text-xs font-semibold tracking-widest uppercase">
              Career at Cross Creek
            </div>
            <div className="mt-4 glass-effect-dark rounded-md p-6 md:p-8 shadow-premium">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Why Do Top Agents Choose <span className="text-amber-400">Cross Creek?</span>
              </h1>
              <p className="mt-3 md:text-lg text-white/85 max-w-3xl">
                A platform built for high‑performers: premium marketing, qualified opportunities, and a
                collaborative culture that helps you grow faster.
              </p>
              <div className="mt-4 h-1 w-28 bg-gradient-to-r from-amber-400 to-orange-500" />
            </div>
          </div>
        </div>
      </section>

      <section
        className="section relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2000&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container-wide text-white">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Join Cross Creek Realty</h1>
          <p className="mb-6 max-w-2xl opacity-95">We equip advisors with luxury marketing, high-intent leads, and collaborative culture. If you are growth-minded and client-obsessed, we want to talk.</p>
          <Link href="/#contact" className="btn-primary">Start the Conversation</Link>
        </div>
      </section>

      {/* Hero: 3D framed media + content to the right */}
      <Section contained={false}>
        <div className="container-wide grid lg:grid-cols-12 gap-8 items-center">
          {/* Framed media */}
          <div className="lg:col-span-6">
            <div className="relative bg-white text-[color:var(--brand-deep)] h-[460px] md:h-[620px] p-4 md:p-6 border-[3px] border-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)]">
              {/* 3D side and bottom facets */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-16px] top-10 bottom-10 w-4 bg-white border-l-2 border-t-2 border-b-2 border-black -skew-y-12" />
                <div className="absolute bottom-[-16px] left-10 right-10 h-4 bg-white border-b-2 border-l-2 border-r-2 border-black skew-x-12" />
              </div>
              <div className="absolute top-3 left-8 right-8 flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-black" />
                  <span className="inline-block w-3 h-3 rounded-full bg-black" />
                  <span className="inline-block w-3 h-3 rounded-full bg-black" />
                </div>
                <div className="text-sm ml-4">With Robert Reffkin, Compass CEO and Ashley Donat, Head of Coaching</div>
              </div>
              <div className="absolute inset-x-8 bottom-12 top-16 border-[3px] border-black bg-white" id="join-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1800&auto=format&fit=crop" alt="Real estate team" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 right-12 w-16 h-16 border-b-2 border-r-2 border-black rotate-45 bg-white shadow-[10px_10px_0_0_#000]" aria-hidden />
            </div>
          </div>
          {/* Content */}
          <div className="lg:col-span-6">
            <div className="text-xs tracking-widest uppercase mb-3">Live Talk</div>
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight">Thinking About Joining Cross Creek?</h2>
            <p className="mt-4 max-w-prose text-lg">Request an invitation to our exclusive session to see how our platform helps advisors grow their business in smarter, more sustainable ways.</p>
            <div className="mt-4 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2"><span>📅</span><span>September 16th</span></div>
              <div className="flex items-center gap-2"><span>⏰</span><span>1 PM ET / 10 AM PT</span></div>
            </div>
            <Link href="/#contact" className="btn-primary mt-6 inline-flex">Request an Invite</Link>
          </div>
        </div>
      </Section>
    </>
  );
}


