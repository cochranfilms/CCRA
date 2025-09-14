import { Section } from '@/components/ui/section';
import { PropertyManagementNav } from '@/components/pm/PropertyManagementNav';

export const metadata = { title: 'Tenants | Cross Creek Realty Atlanta Property Management' };

export default function PMTenantsPage() {
  return (
    <>
      <PropertyManagementNav />
      <Section variant="dark" contained={false} className="relative overflow-hidden !py-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div
          className="absolute inset-0 bg-center bg-no-repeat md:bg-cover opacity-25"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="relative z-10">
          <div className="container-wide py-12 md:py-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Tenants</h1>
            <p className="mt-6 max-w-3xl text-white/90">We believe tenants deserve a safe, well-maintained, and professional rental experience.</p>
          </div>
        </div>
      </Section>
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop"
              alt="Happy tenants in a new apartment"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3">Tenant Portal Features</h2>
            <ul className="space-y-2 mb-6">
              <li>• Pay rent online 24/7</li>
              <li>• Submit and track maintenance requests</li>
              <li>• View and sign lease documents</li>
              <li>• Access from desktop or mobile</li>
            </ul>
            <div className="flex flex-col gap-3">
              <a 
                href="https://century21intown.managebuilding.com/Resident/portal/login" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary text-center"
              >
                Access Pay Portal
              </a>
              <a 
                href="https://century21intown.managebuilding.com/Resident/portal/login" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline text-center"
              >
                Submit Maintenance Request
              </a>
            </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h2 className="text-2xl font-semibold mb-3">Apply for Rental</h2>
            <p className="mb-6 opacity-80">Ready to find your next home? Start your rental application process with our secure online application system.</p>
            <div className="space-y-4">
              <a 
                href="https://century21intown.managebuilding.com/Resident/rental-application/new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-gold w-full text-center block"
              >
                Start Rental Application
              </a>
              <p className="text-sm opacity-70">
                Our online application process is secure, fast, and convenient. 
                You can complete it from any device and track your application status.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


