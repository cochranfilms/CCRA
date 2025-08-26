import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
  contained?: boolean;
}

export function Section({ children, className = '', variant = 'light', contained = true }: SectionProps) {
  const variantClasses = variant === 'dark'
    ? 'bg-[var(--brand-deep)] text-white'
    : 'bg-[var(--bg)] text-[var(--fg)]';
  const containerClass = contained ? 'container-wide' : '';
  return (
    <section className={`section ${variantClasses} ${className}`}>
      <div className={containerClass}>{children}</div>
    </section>
  );
}

interface SplitProps {
  left: ReactNode;
  right: ReactNode;
  reverse?: boolean;
  gap?: string;
}

export function Split({ left, right, reverse = false, gap = 'gap-8 md:gap-12' }: SplitProps) {
  return (
    <div className={`grid items-center md:grid-cols-2 ${gap}`}>
      <div className={reverse ? 'md:order-2' : ''}>{left}</div>
      <div className={reverse ? 'md:order-1' : ''}>{right}</div>
    </div>
  );
}

interface MetricsItem {
  label: string;
  value: string;
}

export function Metrics({ items }: { items: MetricsItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((item) => (
        <div key={item.label} className="text-center card p-6">
          <div className="text-3xl font-semibold text-[var(--brand-primary)]">{item.value}</div>
          <div className="text-sm opacity-80 mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

export function CTA({ title, subtitle, cta }: { title: string; subtitle?: string; cta?: ReactNode }) {
  return (
    <div className="card p-8 md:p-10 flex items-center justify-between gap-6 text-[color:var(--brand-deep)]">
      <div>
        <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
        {subtitle && <p className="opacity-80 mt-1">{subtitle}</p>}
      </div>
      {cta}
    </div>
  );
}


