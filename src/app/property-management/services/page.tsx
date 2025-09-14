import { Section } from '@/components/ui/section';
import { PropertyManagementNav } from '@/components/pm/PropertyManagementNav';

export const metadata = { title: 'Services | Cross Creek Realty Atlanta Property Management' };

export default function PMServicesPage() {
  return (
    <>
      <PropertyManagementNav />
      <Section variant="dark" contained={false} className="relative overflow-hidden !py-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div
          className="absolute inset-0 bg-center bg-no-repeat md:bg-cover opacity-25"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="relative z-10">
          <div className="container-wide py-12 md:py-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Services</h1>
            <p className="mt-6 max-w-3xl text-white/90">Owner and Tenant services designed to protect your investment, streamline operations, and provide a professional rental experience.</p>
          </div>
        </div>
      </Section>
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop"
              alt="Modern living room in Atlanta rental"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3">Owner Services</h2>
            <ul className="space-y-2">
              <li>• Free Rental Analysis</li>
              <li>• Property Marketing &amp; Advertising</li>
              <li>• Tenant Screening &amp; Placement</li>
              <li>• Lease Preparation &amp; Enforcement</li>
              <li>• Rent Collection &amp; Accounting</li>
              <li>• 24/7 Maintenance Coordination</li>
              <li>• Property Inspections &amp; Reporting</li>
              <li>• Eviction Assistance</li>
            </ul>
            </div>
          </div>
          <div className="card p-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=1600&auto=format&fit=crop"
              alt="Tenants using online portal on laptop"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3">Tenant Services</h2>
            <ul className="space-y-2">
              <li>• Easy Online Applications</li>
              <li>• Secure Online Rent Payments</li>
              <li>• Maintenance Request Portal</li>
              <li>• Professional, Responsive Management Team</li>
              <li>• Clear Lease Terms &amp; Compliance</li>
            </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


