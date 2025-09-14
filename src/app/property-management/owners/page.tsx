import { Section } from '@/components/ui/section';
import { PropertyManagementNav } from '@/components/pm/PropertyManagementNav';

export const metadata = { title: 'Owners | Cross Creek Realty Atlanta Property Management' };

export default function PMOwnersPage() {
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
            <h1 className="text-4xl md:text-6xl font-bold text-white">Owners</h1>
            <p className="mt-6 max-w-3xl text-white/90">Owning rental property doesn’t have to be stressful. Cross Creek Realty Atlanta handles everything from tenant placement to rent collection, so you can focus on returns, not repairs.</p>
          </div>
        </div>
      </Section>
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1499914485622-a88fac536970?q=80&w=1600&auto=format&fit=crop"
              alt="Owner reviewing financial statements"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3">Benefits to Owners</h2>
            <ul className="space-y-2">
              <li>• Faster leasing with targeted marketing.</li>
              <li>• Lower vacancy through proactive management.</li>
              <li>• Fewer headaches with reliable tenant screening.</li>
              <li>• Real-time financial visibility through our secure Owner Portal.</li>
            </ul>
            </div>
          </div>
          <div className="card p-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1560518883-4b4e6c5a3a2e?q=80&w=1600&auto=format&fit=crop"
              alt="Portal and maintenance tracking"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3">Owner Portal Features</h2>
            <ul className="space-y-2">
              <li>• Monthly financial statements</li>
              <li>• Secure rent disbursements</li>
              <li>• Maintenance request tracking</li>
              <li>• Lease documents stored digitally</li>
            </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


