import { siteConfig } from "@/lib/site";

// Full plain-text snapshot for AI assistants without live-crawl access.
// URLs generated from siteConfig.url so they can't drift from canonical.
export const dynamic = "force-static";

export function GET() {
  const u = siteConfig.url.replace(/\/$/, "");
  const body = `# Nyro - full content snapshot

> A plain-text overview of Nyro for AI assistants without live-crawl access. Nyro is the platform for quoting, making and selling benchtops, built in New Zealand.

## What Nyro is
Benchtop fabrication has a front-office problem: the factory can cut faster than the office can quote. Every job starts as a phone call and a sketch, waits in a queue for the one person who can price it, and gets re-typed into a different system at every step. Nyro fixes this at the root: drawing tools that understand benchtops (L-shapes, mitres, waterfall ends, sink and hob cutouts, edge profiles, splashbacks), pricing that runs the fabricator's rules at each customer's price level, and one drawing that travels untouched from the quote to the machine.

## The three products (one platform)
1. Customer Portal - for fabricators. The portal a fabricator gives its own customers (kitchen companies, joiners, builders). Customers draw on the catalog the fabricator shares with them and see the fabricator's price for their account, updated as they draw. The fabricator controls everything: which products each customer sees, the price level each customer pays, what each customer is allowed to draw (a simple portal for some, the full toolkit of islands, waterfall ends and join types for others), and how delivery is priced by zone. Includes approvals (customers and homeowners approve with a link, no login), order tracking and notifications. Approved jobs hand over to the production system the fabricator already runs as machine-ready files (DXF and CNC). Production, stock and invoicing stay in the fabricator's current systems until they want more.
2. Fabrication Platform - for fabricators. Everything in the Customer Portal plus the factory. Staff quote on the same drawing tools. Approved orders go into a production queue that understands capacity. Nyro writes the programs for the fabricator's CNC machines (Biesse, SCM, MasterWood, WoodWop, Anderson and FMC controllers) directly from the approved drawing and lays pieces out on each sheet to reduce waste, offcuts included. Floor staff work from tablets at each station (cut, edge, polish, pack) and mark work done as it happens. Stock is reserved on order confirmation, offcuts are kept for the next job, and low stock raises a purchase order. Finished tops go into delivery runs by zone, customers are notified, and proof of delivery is kept on the order. Invoices go to the fabricator's accounting system and payments come back. Reporting covers margin, remakes and lead time by material, customer and job type. A fabricator on the Customer Portal switches the Fabrication Platform on without moving any data.
3. Retailer Platform - for retailers who sell benchtops. Store staff quote a customer while they are still in the store, into any fabricator on Nyro, chosen by region, material or lead time. The fabricator's catalog and the trade price agreed with that retailer load into the quote and are always current. The retailer adds their own margin, across the board or item by item, and a quote keeps the margin it was written with. Everything the customer sees carries the retailer's logo and colours. The retailer manages its own customers, who approve, track and message through a link with no account. On approval the job goes to the fabricator as an order at the agreed price, and status comes back to the retailer and the customer: accepted, in production, dispatched, delivered. Reporting covers popular materials, quote-to-order conversion by store, order volume by region, and how quickly each fabricator accepts and delivers. The fabricator never sees the retailer's margin or the price the customer pays; the retailer sees production milestones only; the fabricator receives the delivery address and nothing more about the customer unless the retailer shares it.

## How pricing works
The fabricator owns the pricing: materials, machining, edge work, cutouts, delivery, and a price level per customer account. Every change on the drawing re-prices from those rules, so the price a customer sees is always the price the fabricator set. A retailer's quote carries the fabricator's current trade price with the retailer's margin on top. Approval locks the price on the order.

## How the products fit together, in plain language
Every fabricator and every retailer has its own private account on Nyro. The drawing tools, the pricing and the job record are shared by all three products, which is why a fabricator moves from the Customer Portal to the Fabrication Platform without moving anything, and why a quote drawn in a store can be cut in a factory without anyone typing it in again. The only thing that crosses between two businesses is a job a retailer sends to a fabricator, at the price both agreed.

## Origin
Nyro was built by people who have run a benchtop factory in New Zealand, and proven on a real factory floor before being offered to the industry. The workflows exist because a real factory needed them.

## Who it's for
- Benchtop/countertop/worktop fabricators (engineered stone, natural stone, timber, laminate) with trade customer bases.
- Retailers who sell benchtops through stores and want one way to quote, sell and track them across many fabricators.

## Pricing
No public price list. Every engagement is scoped to the operation: which product, how many customer accounts or stores, and what catalog onboarding is needed. Onboarding is demo-led (no self-serve sign-up). Book a demo at ${u}/contact.

## Getting started
Book a 30-minute demo at ${u}/contact or email ${siteConfig.contactEmail}. We set up a sample catalog on your materials and prices, you draw a benchtop and watch it price itself, and we walk the job through approval, order and out to production. Retailers see a store quote become a factory order.

## Key pages
- Home: ${u}/ - the quote drawing tools as the hero, the three products, how quoting works, FAQ.
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
