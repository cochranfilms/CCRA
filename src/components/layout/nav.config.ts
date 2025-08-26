export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
  ctaHref?: string;
  ctaLabel?: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Owner Services',
    children: [
      { label: 'Property Management', href: '/resources', description: 'End-to-end service for single-family & multi-unit owners.' },
      { label: 'Tenant Placement', href: '/resources', description: 'Marketing, screening, and lease execution.' },
      { label: 'Portfolio Advisory', href: '/book', description: 'Optimize returns with data-driven guidance.' },
    ],
    ctaHref: '/book',
    ctaLabel: 'Book Now',
  },
  {
    label: 'Tenant Services',
    children: [
      { label: 'Pay Portal', href: '/resources', description: 'Pay rent, view ledger, and more.' },
      { label: 'Maintenance Request', href: '/book', description: 'Submit and track service requests.' },
      { label: 'Rental Application', href: '/book', description: 'Apply online in minutes.' },
    ],
    ctaHref: '/book',
    ctaLabel: 'Book Now',
  },
  {
    label: 'Listings',
    href: '/listings',
    children: [
      { label: 'Active Listings', href: '/listings' },
      { label: 'Luxury', href: '/listings?q=Luxury' },
      { label: 'New Construction', href: '/listings?q=New%20Construction' },
    ],
  },
  {
    label: 'Featured Areas',
    href: '/featured-areas',
    children: [
      { label: 'Fulton County', href: '/featured-areas' },
      { label: 'Cobb County', href: '/featured-areas' },
      { label: 'DeKalb County', href: '/featured-areas' },
      { label: 'Gwinnett County', href: '/featured-areas' },
    ],
  },
  {
    label: 'Communities',
    href: '/communities',
    children: [
      { label: 'Buckhead', href: '/communities/buckhead' },
      { label: 'Alpharetta', href: '/communities/alpharetta' },
      { label: 'Midtown', href: '/communities/midtown' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Guides & FAQs', href: '/resources' },
      { label: 'Calculator', href: '/calculator' },
    ],
  },
  { label: 'Calculator', href: '/calculator' },
  { label: 'Contact', href: '/book' },
  { label: 'Start Your Search', href: '/listings' },
];


