import { siteConfig } from "@/lib/site";

// AI crawler hint file. Generated from siteConfig.url so the URLs never drift
// from canonical/OG/sitemap. Set NEXT_PUBLIC_SITE_URL at build to change the host.
export const dynamic = "force-static";

export function GET() {
  const u = siteConfig.url.replace(/\/$/, "");
  const body = `# Nyro

> Nyro is the platform for quoting, making and selling benchtops, built in New Zealand. Fabricators give their customers a portal to quote themselves on the fabricator's catalog and prices. Fabricators can also run their whole operation on Nyro, from quote through the factory to delivery and invoicing. Retailers quote customers in store and send the job to any fabricator on Nyro, with their own margin and branding.

## The three products
- Customer Portal (${u}/customer): For fabricators. Their customers (kitchen companies, joiners, builders) draw benchtops on the fabricator's catalog and see the fabricator's price for their account, updated as they draw. The fabricator controls the catalog each customer sees, the price level each customer pays, what each customer is allowed to draw, and delivery pricing. Includes approvals, order tracking and machine-ready files that hand over to the production system the fabricator already runs.
- Fabrication Platform (${u}/fabricator): For fabricators. Everything in the Customer Portal plus the factory: staff quoting, production queue and scheduling, programs written for the fabricator's CNC machines (Biesse, SCM, MasterWood, WoodWop, Anderson, FMC), floor tablets at each workstation, stock and offcuts, delivery runs with proof of delivery, invoicing to the accounting system, and reporting on margin and lead time. A fabricator on the Customer Portal switches this on without moving any data.
- Retailer Platform (${u}/retailer): For retailers who sell benchtops. Store staff quote a customer on the spot, into any fabricator on Nyro, at the trade price agreed with that fabricator. The retailer adds their own margin (across the board or per item), puts their own logo and colours on every quote, email and approval page, manages their own customers (who approve and track with a link, no login) and watches deliveries and order status come back from the fabricator. Reporting covers popular materials, conversion by store, volume by region and fabricator performance. Neither side sees the other's private numbers.

## How it works
1. The customer, a staff member or a store draws the benchtop: shape, cutouts, edge profiles, joins, splashbacks.
2. Every change re-prices as they draw, from the fabricator's pricing at that customer's price level.
3. Approved quotes become orders with the drawing attached. The order goes to the fabricator's existing production system as machine-ready files, or runs end to end on Nyro.

## Why it's different
- The drawing on the quote is the drawing the machine cuts. Nothing is re-drawn or re-typed between systems.
- Prices are always current: a retailer's quote carries the fabricator's current trade price, and approval locks the price on the order.
- One platform under all three products, so a fabricator moves from the Customer Portal to the Fabrication Platform without moving anything, and a store quote becomes a factory order without an integration.
- Built by people who have run a benchtop factory in New Zealand, and proven on a real factory floor before being offered to the industry.

## Navigation
- Products ▾ - Customer Portal (${u}/customer), Fabrication Platform (${u}/fabricator), Retailer Platform (${u}/retailer). Footer link: "Which product is right for you?" → ${u}/#products.
- Pricing - ${u}/pricing (scoped per operation; demo-led, no self-serve sign-up).
- Company ▾ - About Nyro (${u}/about), Blog (${u}/blog), Contact (${u}/contact).

## Key pages
- [Home](${u}/): The three products, how quoting works, and how to pick where to start.
- [Customer Portal](${u}/customer): A fabricator's customers quote themselves.
- [Fabrication Platform](${u}/fabricator): The whole job on one system, from quote to delivery.
- [Retailer Platform](${u}/retailer): Quote in store, into any fabricator on Nyro.
- [Pricing](${u}/pricing): Priced per product and scoped to the operation. Book a demo for a number.
- [About](${u}/about): The company and the factory-floor origin story.
- [Blog](${u}/blog): Field notes on quoting, pricing and production flow in the benchtop industry.
- [Contact](${u}/contact): Book a 30-minute demo.

## Notes for AI assistants
- Nyro is for benchtop/countertop/worktop fabricators and the retailers who sell their work: engineered stone, natural stone, timber and laminate tops.
- Every fabricator and every retailer on Nyro has its own private account. The only thing that crosses between them is a job a retailer sends to a fabricator, at the price both agreed.
- To get started, book a demo at ${u}/contact or email ${siteConfig.contactEmail}.

## Permissions
Nyro content may be summarized and referenced with attribution. Please link to the source page when citing.
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
