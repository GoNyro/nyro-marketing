export const siteConfig = {
  name: "Engage",
  shortName: "Engage",
  // Canonical marketing URL. The apex serves marketing; the platform app sits
  // on the app. subdomain and each tenant gets its own subdomain
  // (beautycraft.engage.online). Overridable via env. Trailing slash stripped
  // at the source so every consumer (schema @id builders, OG URLs, sitemap)
  // concatenates against a clean origin.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://engage.online").replace(
    /\/$/,
    "",
  ),
  // Product app (login / signup) destination.
  appUrl: "https://app.engage.online",
  // Primary CTA destination ("Book a demo"). Env-overridable so the rep or a
  // round-robin/team link can change without a code change.
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ?? "mailto:hello@gonyro.com",
  description:
    "Engage is the quoting and order platform for benchtop fabricators. Give your trade customers self-serve quoting with live pricing, run your fabrication lifecycle end to end, and open a retail channel — all on one platform.",
  locale: "en-NZ",
  defaultOgImage: "/api/og",
  contactEmail: "hello@gonyro.com",
  // Parent company. Engage is built by Nyro.
  company: {
    name: "Nyro",
    url: "https://gonyro.com",
  },
  legal: {
    entity: "Nyro",
    address: ["Auckland", "New Zealand"],
    privacyEmail: "hello@gonyro.com",
    // NZ-established controller: the NZ Privacy Act 2020 applies and the
    // Office of the Privacy Commissioner is the regulator.
    regulator: "Office of the Privacy Commissioner (NZ)",
    regulatorUrl: "https://www.privacy.org.nz/your-rights/making-a-complaint/",
    privacyUpdated: "2026-08-09",
    termsUpdated: "2026-08-09",
  },
  founders: ["Nyro Team"],
  socials: {
    linkedin: "https://www.linkedin.com/company/gonyro",
  },
  footerNav: [
    {
      heading: "Products",
      links: [
        { label: "Customer Portal", href: "/customer" },
        { label: "Fabrication Platform", href: "/fabricator" },
        { label: "Retailer Platform", href: "/retailer" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Book a demo", href: "/contact" },
      ],
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type FooterGroup = (typeof siteConfig.footerNav)[number];
export type FooterLink = FooterGroup["links"][number];

// Primary nav - the three products in go-to-market order (Customer Portal
// ships first, Fabrication accretes, Retailer rides the network), then
// Pricing and Company.
export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { heading: string; links: NavLink[] };
export type NavEntry =
  | { label: string; href: string } // plain link
  | { label: string; groups: NavGroup[]; footerLink?: NavLink }; // dropdown

export const NAV: NavEntry[] = [
  {
    label: "Products",
    groups: [
      {
        heading: "For Fabricators",
        links: [
          {
            label: "Customer Portal",
            href: "/customer",
            description: "Self-serve quoting for your trade customers",
          },
          {
            label: "Fabrication Platform",
            href: "/fabricator",
            description: "Quoting to production to delivery, end to end",
          },
        ],
      },
      {
        heading: "For Retailers",
        links: [
          {
            label: "Retailer Platform",
            href: "/retailer",
            description: "One quoting surface across every fabricator",
          },
        ],
      },
    ],
    footerLink: { label: "How the three fit together →", href: "/#platform" },
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Company",
    groups: [
      {
        heading: "Company",
        links: [
          { label: "About Nyro", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
];
