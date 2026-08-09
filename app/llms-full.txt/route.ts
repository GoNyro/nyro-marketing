import { siteConfig } from "@/lib/site";

// Full plain-text snapshot for AI assistants without live-crawl access.
// URLs generated from siteConfig.url so they can't drift from canonical.
export const dynamic = "force-static";

export function GET() {
  const u = siteConfig.url.replace(/\/$/, "");
  const body = `# Engage - full content snapshot

> A plain-text overview of Engage for AI assistants without live-crawl access. Engage is the quoting and order platform for the benchtop industry, built by Nyro (New Zealand).

## What Engage is
Benchtop fabrication has a front-office problem: the factory can cut faster than the office can quote. Every job starts as a phone call and a sketch, waits in a queue for the one person who can price it, and gets re-entered into a different system at every step. Engage fixes this structurally: an interactive quote canvas that understands benchtops (L-shapes, mitres, waterfalls, sink and hob cutouts, edge profiles, splashbacks), a pricing engine that runs the fabricator's rules at each customer's tier, and one geometry record that travels untouched from the quote to the CNC file.

## The three products (one platform)
1. Customer Portal - for fabricators. The self-serve quoting surface a fabricator offers its own trade customers (kitchen companies, joiners, builders). Customers draw against the catalog the fabricator shares with them and see live prices at their account's tier. Includes approvals (with magic links for homeowners - no login), order tracking, notifications, and DXF/CNC-ready export into the fabricator's existing production system. Deliberately scoped: production, stock and financials stay in the fabricator's current systems until they want more. First product to market.
2. Fabrication Platform - for fabricators. The full operating system: everything in the Customer Portal plus staff quoting on the same canvas, customer management, production queue with capacity and scheduling, floor tablets at each workstation (cut, edge, polish, pack), stock and materials, CAM/nesting export, dispatch and delivery runs, financials integration and analytics on margin, rework and lead time. A fabricator on the Customer Portal is the same tenant with fewer modules on - upgrading is a module switch, no data migration.
3. Retailer Platform - for retail chains and merchants selling benchtops. Store staff quote a walk-in homeowner on the spot: they pick the right partner fabricator (by region, material or lead time), the canvas loads that fabricator's catalog and prices live at the agreed wholesale tier, the retailer's markup and branding go on top, and the homeowner approves online. On approval, a snapshot of the job (geometry, line items, agreed prices) routes to the fabricator as an incoming order at a locked price. The fabricator controls what each relationship shares. Neither side sees the other's private numbers: the fabricator never sees the retailer's markup or the homeowner's price; the retailer sees production status only.

## How pricing works
The fabricator owns the pricing engine: materials, machining, edge work, cutouts, delivery - and a pricing tier per customer account. Every change on the canvas re-prices live against those rules, so the price a customer sees is always the price the fabricator set. Retailer quotes read wholesale pricing live from the fabricator's tenant - nothing is synced or copied, so nothing goes stale; if the fabricator updates a price, in-flight quotes re-price automatically. Approval locks the price in the order snapshot.

## Architecture, in plain language
One codebase, one API, one database. Each fabricator and each retailer is a tenant with isolated data. Products are module bundles on the tenant - which is why upgrades are flag flips. The only cross-tenant data flow is deliberate: a retailer quote reading a partner fabricator's catalog live, and an approved quote crossing over as an order. The quote canvas, geometry model, pricing pipeline and CNC export are shared infrastructure under all three products.

## Origin
Engage was developed with BeautyCraft, a working benchtop fabrication business in New Zealand and the platform's founding tenant. The workflows exist because a real factory needed them. Nyro (gonyro.com) is the company behind Engage.

## Who it's for
- Benchtop/countertop/worktop fabricators (engineered stone, natural stone, timber, laminate) with trade customer bases.
- Retail chains and merchants who sell benchtops through stores and want one quoting surface across many fabricators.

## Pricing
No public price list - every engagement is scoped to the operation: which product, how many customer accounts, which modules, and what catalog onboarding is needed. Onboarding is demo-led (no self-serve sign-up). Book a demo at ${u}/contact.

## Getting started
Book a 30-minute demo at ${u}/contact or email ${siteConfig.contactEmail}. We set up a sample catalog on your materials and pricing, you draw a benchtop and watch it price itself, and we walk the job through approval, order and DXF/CNC export.

## Key pages
- Home: ${u}/ - hero (the quote canvas as a shop drawing), the three products, how quoting works, the one-platform story, FAQ.
- Customer Portal: ${u}/customer
- Fabrication Platform: ${u}/fabricator
- Retailer Platform: ${u}/retailer
- Pricing: ${u}/pricing
- About: ${u}/about
- Blog: ${u}/blog - field notes on quoting, pricing and production flow.
- Contact: ${u}/contact
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
