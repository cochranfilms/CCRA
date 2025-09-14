import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { PropertyManagementNav } from '@/components/pm/PropertyManagementNav';

export const metadata = { title: 'Available Rentals | Cross Creek Realty Atlanta Property Management' };

export default function PMRentalsPage() {
  return (
    <>
      <PropertyManagementNav />
      <Section variant="dark" contained={false} className="relative overflow-hidden !py-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div
          className="absolute inset-0 bg-center bg-no-repeat md:bg-cover opacity-25"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="relative z-10">
          <div className="container-wide py-12 md:py-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Available Rentals</h1>
            <p className="mt-6 max-w-3xl text-white/90">Explore our up-to-date rental listings across Atlanta, including Midtown, West Midtown, Buckhead, Intown, and surrounding neighborhoods. Each listing includes photos, pricing, and details to help you find the perfect fit.</p>
            <div className="mt-6">
              <Link className="btn-primary" href="/listings?mode=rent">Browse Available Rentals</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


