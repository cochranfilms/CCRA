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
  // Buy
  {
    label: 'Buy',
    href: '/buy',
    children: [
      { label: 'Listings', href: '/listings', description: 'Search homes on the market now.' },
      { label: 'Featured Areas', href: '/featured-areas', description: 'Explore popular areas we serve.' },
      { label: 'Calculator', href: '/calculator', description: 'Estimate payments and affordability.' },
    ],
  },
  // Rent
  {
    label: 'Rent',
    href: '/rent',
    children: [
      { label: 'Available Rentals', href: '/listings?mode=rent' },
      { label: 'Application', href: 'https://century21intown.managebuilding.com/Resident/rental-application/new' },
      { label: 'Maintenance', href: 'https://century21intown.managebuilding.com/Resident/portal/login' },
    ],
  },
  // Sell
  {
    label: 'Sell',
    href: '/sell',
    children: [
      { label: 'Home Valuation', href: '/sell' },
      { label: 'Marketing Plan', href: '/resources' },
      { label: 'New Construction', href: '/listings?q=New%20Construction' },
      { label: 'Talk to a Seller Advisor', href: '/contact?role=Seller', description: 'Open the Seller contact form.' },
    ],
  },
  // Property Management (moved to appear after Sell)
  {
    label: 'Property Management',
    href: '/property-management',
  },
  // Communities
  {
    label: 'Communities',
    href: '/communities',
    children: [
      { label: 'Buckhead', href: '/communities/buckhead' },
      { label: 'Alpharetta', href: '/communities/alpharetta' },
      { label: 'Midtown', href: '/communities/midtown' },
    ],
  },
  // Featured Areas
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
  // Agents
  {
    label: 'Agents',
    href: '/agents',
    children: [
      { label: 'Meet our Team', href: '/agents' },
      { label: 'Find an Agent', href: '/find-an-agent' },
      { label: 'Join as an Agent', href: '/agents/join' },
    ],
  },
  // Contact CTA (scrolls to home contact section)
  { label: 'Contact', href: '/contact' },
  // Blog
  { label: 'Blog', href: '/blog' },
];


