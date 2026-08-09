import { Factory, Layers, Ruler, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/marketing/Container";
import { FeatureRows, type FeatureRow } from "@/components/marketing/sections/FeatureRows";
import { SlimCta } from "@/components/marketing/sections/SlimCta";
import { PlaceholderSlab } from "@/components/marketing/sections/PlaceholderSlab";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Nyro builds Engage, the quoting and order platform for the benchtop industry. Developed inside BeautyCraft, a working New Zealand fabrication business, and built to serve the whole industry.",
  path: "/about",
});

const PRINCIPLE_ROWS: FeatureRow[] = [
  {
    icon: Factory,
    title: "The factory\nis the spec",
    lead: "Every workflow exists because a real business needed it.",
    body: [
      "Quoting queues, re-keyed geometry, price lists three revisions stale - we build against the floor, not the whiteboard.",
    ],
  },
  {
    icon: Layers,
    title: "One platform, not three\nproducts taped together",
    lead: "The canvas, pricing engine and catalog are shared infrastructure.",
    body: [
      "That's why an upgrade is a module switch, and why a retailer's quote can read a fabricator's live price - no syncs, no copies, no drift.",
    ],
  },
  {
    icon: Ruler,
    title: "Geometry\nis sacred",
    lead: "A benchtop is its drawing.",
    body: [
      "The shape your customer draws is the shape that's priced, ordered, nested and cut - captured once, carried everywhere, never transcribed.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Commercial boundaries\nare product features",
    lead: "Wholesale tiers and markups only work if the system enforces who sees what.",
    body: [
      "Tenant isolation isn't plumbing to us - it's the deal.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ])}
      />

      {/* Hero */}
      <section className="surface-cream">
        <Container className="pb-4 pt-16 md:pt-24">
          <p className="label-mono text-[0.7rem] text-muted-foreground">
            About Nyro
          </p>
          <h1 className="display-hero mt-5 max-w-2xl text-balance">
            Software for the people who make the tops.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Nyro is a New Zealand software company building Engage - the
            quoting and order platform for the benchtop industry.
          </p>
        </Container>
      </section>

      {/* Story */}
      <section className="surface-gray mt-16 border-t border-border">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="display-md text-balance">
                Born on a factory floor, not in a pitch deck.
              </h2>
            </div>
            <div className="prose-like lg:col-span-7">
              <p data-speakable>
                Engage started inside BeautyCraft, a working benchtop
                fabrication business in New Zealand. The problem was obvious
                from the front office: the factory could cut faster than the
                office could quote. Every job began as a phone call and a
                sketch, waited in a queue for the one person who could price
                it, and got re-typed into a different system at every step.
              </p>
              <p>
                So we built the system we wished existed: a quote canvas that
                understands benchtops, a pricing engine that knows each
                customer&apos;s terms, and an order flow where the geometry
                drawn at quote time is the geometry the CNC cuts. BeautyCraft
                became tenant number one - and the platform was built
                multi-tenant from the first line, because the problem
                isn&apos;t one company&apos;s.
              </p>
              <p>
                Today Engage is three products on that one platform: a customer
                portal fabricators hand to their trade accounts, a full
                fabrication operating system, and a retailer surface that
                connects stores to the fabricator network. The plan is
                deliberate - portals first, the network they create second.
              </p>
            </div>
          </div>

          <PlaceholderSlab
            note="Team & factory photography — dedicated session"
            ratio="aspect-[21/7]"
            className="mt-16"
          />
        </Container>
      </section>

      {/* Principles */}
      <section className="surface-cream border-t border-border">
        <Container className="py-20 md:py-28">
          <h2 className="display-md max-w-xl text-balance">
            Principles we don&apos;t trade away.
          </h2>
          <FeatureRows rows={PRINCIPLE_ROWS} className="mt-16" />
        </Container>
      </section>

      <SlimCta
        title="The industry runs on relationships."
        sub="Whether you cut tops, sell them, or both - we'll show you the platform on your materials."
      />
    </>
  );
}
