import { Section } from '@/components/ui/section';
import { PropertyManagementNav } from '@/components/pm/PropertyManagementNav';

export const metadata = { title: 'Resources | Cross Creek Realty Atlanta Property Management' };

export default function PMResourcesPage() {
  return (
    <>
      <PropertyManagementNav />
      <Section variant="dark" contained={false} className="relative overflow-hidden !py-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div
          className="absolute inset-0 bg-center bg-no-repeat md:bg-cover opacity-25"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="relative z-10">
          <div className="container-wide py-12 md:py-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Resources</h1>
            <p className="mt-6 max-w-3xl text-white/90">Helpful guides and tools for owners and tenants.</p>
          </div>
        </div>
      </Section>
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1521790361543-f645cf042ec4?q=80&w=1600&auto=format&fit=crop"
              alt="Owner resources and planning"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3">For Owners</h2>
            <ul className="space-y-2">
              <li>• Free Rental Analysis Tool</li>
              <li>• Guide to Atlanta Rental Market Trends</li>
              <li>• Eviction Process Explained</li>
              <li>• Maintenance Cost Planning</li>
            </ul>
            </div>
          </div>
          <div className="card p-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1600&auto=format&fit=crop"
              alt="Tenant move-in checklist and keys"
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3">For Tenants</h2>
            <ul className="space-y-2">
              <li>• Move-In Checklist</li>
              <li>• Renter’s Rights &amp; Responsibilities</li>
              <li>• How to Submit a Maintenance Request</li>
              <li>• Tips for On-Time Rent Payments</li>
            </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


