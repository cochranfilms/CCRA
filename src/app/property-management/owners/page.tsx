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
      {/* Combined Owner Services + Portal Section */}
      <Section variant="dark" contained={false} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80" />
        <div className="relative z-10">
          <div className="container-wide py-12 md:py-16">
            <h2 className="text-3xl md:text-4xl font-semibold">Owner Services & Portal</h2>
            <p className="mt-3 text-white/90 md:text-lg max-w-3xl">Everything you need to manage performance and stay informed—streamlined and secure.</p>
            <div className="mt-8 grid md:grid-cols-2 gap-8">
              {/* Benefits card */}
              <div className="bg-white text-slate-900 p-6 md:p-8 shadow-premium">
                <h3 className="text-2xl font-semibold mb-3">Benefits to Owners</h3>
                <ul className="space-y-2">
                  <li>• Faster leasing with targeted marketing.</li>
                  <li>• Lower vacancy through proactive management.</li>
                  <li>• Fewer headaches with reliable tenant screening.</li>
                  <li>• Real-time financial visibility through our secure Owner Portal.</li>
                </ul>
              </div>
              {/* Features + CTA card */}
              <div className="bg-white text-slate-900 p-6 md:p-8 shadow-premium">
                <h3 className="text-2xl font-semibold mb-3">Owner Portal Features</h3>
                <ul className="space-y-2">
                  <li>• Monthly financial statements</li>
                  <li>• Secure rent disbursements</li>
                  <li>• Maintenance request tracking</li>
                  <li>• Lease documents stored digitally</li>
                </ul>
                <div className="mt-6">
                  <a
                    href="https://signin.managebuilding.com/manager/public/authentication/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    Access Owner Portal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


