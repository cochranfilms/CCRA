"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PM_NAV_ITEMS = [
  { label: 'Home', href: '/property-management' },
  { label: 'About', href: '/property-management/about' },
  { label: 'Services', href: '/property-management/services' },
  { label: 'Owners', href: '/property-management/owners' },
  { label: 'Tenants', href: '/property-management/tenants' },
  { label: 'Available Rentals', href: '/property-management/rentals' },
  { label: 'Resources', href: '/property-management/resources' },
  { label: 'Contact', href: '/property-management/contact' },
];

export function PropertyManagementNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-white/10">
      <div className="container-wide">
        <div className="flex items-center gap-1 overflow-x-auto">
          {PM_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'relative px-4 py-3 text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap',
                  'border-b-2 border-transparent hover:border-amber-400/50',
                  isActive
                    ? 'text-amber-400 border-amber-400 bg-gradient-to-r from-amber-500/10 to-orange-500/10'
                    : 'text-white/80 hover:text-white'
                ].join(' ')}
              >
                {item.label}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-t-md"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
