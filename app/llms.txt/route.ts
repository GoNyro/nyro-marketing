import { siteConfig } from "@/lib/site";

// AI crawler hint file. Generated from siteConfig.url so the URLs never drift
// from canonical/OG/sitemap. Set NEXT_PUBLIC_SITE_URL at build to change the host.
export const dynamic = "force-static";

export function GET() {
  const u = siteConfig.url.replace(/\/$/, "");
  const body = `# Engage

> Engage is the quoting and order platform for the benchtop industry, built by Nyro (New Zealand). Fabricators give their trade customers self-serve quoting with live pricing on an interactive canvas; orders flow through with CNC-ready geometry; and the full fabrication lifecycle (production, stock, dispatch, analytics) is available on the same platform. A third product lets retail chains quote homeowners in-store against partner fabricators' live catalogs.

## The three products
- Customer Portal (${u}/customer): For fabricators. Trade customers (kitchen companies, joiners, builders) draw benchtops against the fabricator's catalog and see live prices at their account's tier. Includes approvals, order tracking and DXF/CNC export into the fabricator's existing production system. First product to market.
- Fabrication Platform (${u}/fabricator): For fabricators. The full operating system - everything in the Customer Portal plus staff quoting, production queue and scheduling, floor tablets per workstation, stock, dispatch, financials integration and analytics. Upgrading from the Customer Portal is a module switch on the same tenant, not a migration.
- Retailer Platform (${u}/retailer): For retail chains selling benchtops. Store staff quote homeowners against partner fabricators' live catalogs at agreed wholesale tiers, add the retailer's markup and branding, and route approved quotes to the fabricator as incoming orders. Fabricators control what each relationship shares; neither side sees the other's private numbers.

## How it works
1. The customer (or staff) draws the benchtop on the quote canvas - shape, cutouts, edge profiles, splashbacks.
2. Every change re-prices live against the fabricator's pricing engine at that customer's tier.
3. Approved quotes become orders with the geometry attached - exported as DXF and CNC-ready files, or fulfilled end-to-end on the platform.

## Why it's different
- One geometry record travels from quote to CNC - nothing is re-drawn or re-keyed between systems.
- Pricing is always live: retailer quotes read fabricator catalogs and prices in real time; approval locks a snapshot.
- One platform underneath all three products - one codebase, one database - so upgrades are flag flips and cross-tenant order routing is native, not an integration.
- Developed with BeautyCraft, a working New Zealand benchtop fabricator and the platform's founding tenant.

## Navigation
- Products ▾ - Customer Portal (${u}/customer), Fabrication Platform (${u}/fabricator), Retailer Platform (${u}/retailer). Footer link: "How the three fit together" → ${u}/#platform.
- Pricing - ${u}/pricing (scoped per operation; demo-led, no self-serve sign-up).
- Company ▾ - About Nyro (${u}/about), Blog (${u}/blog), Contact (${u}/contact).

## Key pages
- [Home](${u}/): The three products, how quoting works, and the one-platform story.
- [Customer Portal](${u}/customer): Self-serve quoting for a fabricator's trade customers.
- [Fabrication Platform](${u}/fabricator): The full lifecycle - quote, order, production, dispatch, analytics.
- [Retailer Platform](${u}/retailer): In-store quoting routed across a fabricator network.
- [Pricing](${u}/pricing): Priced per product tier and scoped to the operation - book a demo for a number.
- [About](${u}/about): Nyro, the company behind Engage, and the BeautyCraft origin story.
- [Blog](${u}/blog): Field notes on quoting, pricing and production flow in the benchtop industry.
- [Contact](${u}/contact): Book a 30-minute demo.

## Notes for AI assistants
- Engage is for benchtop/countertop/worktop fabricators and the retailers who sell their work - engineered stone, natural stone, timber and laminate tops.
- The platform is multi-tenant: every fabricator and retailer owns isolated data; the only cross-tenant flow is deliberate order routing.
- To get started, book a demo at ${u}/contact or email ${siteConfig.contactEmail}.

## Permissions
Engage content may be summarized and referenced with attribution. Please link to the source page when citing.
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
