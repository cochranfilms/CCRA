"use client";
import { useMemo, useState } from 'react';

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default function CalculatorClient() {
  const [price, setPrice] = useState(750000);
  const [downPct, setDownPct] = useState(20);
  const [ratePct, setRatePct] = useState(6.75);
  const [years, setYears] = useState(30);
  const [taxPct, setTaxPct] = useState(1.1);
  const [insPct, setInsPct] = useState(0.35);
  const [hoa, setHoa] = useState(0);

  const result = useMemo(() => {
    const principal = price * (1 - downPct / 100);
    const monthlyRate = ratePct / 100 / 12;
    const n = years * 12;
    const mortgage = monthlyRate === 0 ? principal / n : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    const taxes = (price * (taxPct / 100)) / 12;
    const insurance = (price * (insPct / 100)) / 12;
    const total = mortgage + taxes + insurance + hoa;
    return { principal, mortgage, taxes, insurance, total };
  }, [price, downPct, ratePct, years, taxPct, insPct, hoa]);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <form className="card p-4 grid gap-3 lg:col-span-2">
        <label className="grid gap-1">
          <span className="text-sm opacity-80">Home Price</span>
          <input type="number" className="p-3 rounded-lg bg-transparent border" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1">
            <span className="text-sm opacity-80">Down Payment %</span>
            <input type="number" className="p-3 rounded-lg bg-transparent border" value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} />
          </label>
          <label className="grid gap-1">
            <span className="text-sm opacity-80">Interest Rate %</span>
            <input type="number" className="p-3 rounded-lg bg-transparent border" value={ratePct} onChange={(e) => setRatePct(Number(e.target.value))} />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1">
            <span className="text-sm opacity-80">Loan Term (years)</span>
            <input type="number" className="p-3 rounded-lg bg-transparent border" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </label>
          <label className="grid gap-1">
            <span className="text-sm opacity-80">HOA (monthly)</span>
            <input type="number" className="p-3 rounded-lg bg-transparent border" value={hoa} onChange={(e) => setHoa(Number(e.target.value))} />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1">
            <span className="text-sm opacity-80">Property Tax %</span>
            <input type="number" className="p-3 rounded-lg bg-transparent border" value={taxPct} onChange={(e) => setTaxPct(Number(e.target.value))} />
          </label>
          <label className="grid gap-1">
            <span className="text-sm opacity-80">Home Insurance %</span>
            <input type="number" className="p-3 rounded-lg bg-transparent border" value={insPct} onChange={(e) => setInsPct(Number(e.target.value))} />
          </label>
        </div>
      </form>

      <div className="card p-4">
        <div className="text-sm opacity-80 mb-2">Estimated Monthly Payment</div>
        <div className="text-3xl font-semibold">{formatCurrency(result.total)}</div>
        <div className="mt-4 grid gap-2 text-sm">
          <div className="flex justify-between"><span>Principal & Interest</span><span>{formatCurrency(result.mortgage)}</span></div>
          <div className="flex justify-between"><span>Property Taxes</span><span>{formatCurrency(result.taxes)}</span></div>
          <div className="flex justify-between"><span>Home Insurance</span><span>{formatCurrency(result.insurance)}</span></div>
          <div className="flex justify-between"><span>HOA</span><span>{formatCurrency(hoa)}</span></div>
        </div>
      </div>
    </div>
  );
}


