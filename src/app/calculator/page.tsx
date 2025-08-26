import { Section } from '@/components/ui/section';
import CalculatorClient from './sfc';

export const metadata = {
  title: 'Mortgage Calculator | Cross Creek Realty',
};

export default function CalculatorPage() {
  return (
    <Section>
      <div className="container-wide">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">Mortgage Calculator</h1>
        <CalculatorClient />
      </div>
    </Section>
  );
}


