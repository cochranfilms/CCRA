import { Section } from '@/components/ui/section';
import PropertyContactForm from '@/components/pm/PropertyContactForm';
import { PropertyManagementNav } from '@/components/pm/PropertyManagementNav';

export const metadata = { title: 'Contact | Cross Creek Realty Atlanta Property Management' };

export default function PMContactPage() {
  return (
    <>
      <PropertyManagementNav />
      <Section variant="dark" contained={false} className="relative overflow-hidden !py-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div
          className="absolute inset-0 bg-center bg-no-repeat md:bg-cover opacity-25"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="relative z-10">
          <div className="container-wide py-12 md:py-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Contact</h1>
            <div className="mt-6 grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="space-y-2 text-white/90">
                  <div>Cross Creek Realty Atlanta</div>
                  <div>1234 (Insert Office Address)</div>
                  <div>Atlanta, GA</div>
                  <div>(404) 355-2833</div>
                  <div>info@crosscreekrealtyatl.com</div>
                </div>
              </div>
              <div>
                <PropertyContactForm />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


