import { Factory, Layers, Ruler, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/marketing/Container";
import { FeatureRows, type FeatureRow } from "@/components/marketing/sections/FeatureRows";
import { SlimCta } from "@/components/marketing/sections/SlimCta";
import Image from "next/image";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Nyro is a New Zealand software company building the platform for quoting, making and selling benchtops. Built by people who have run a benchtop factory, for the whole industry.",
  path: "/about",
});

const PRINCIPLE_ROWS: FeatureRow[] = [
  {
    icon: Factory,
    title: "The factory\nis the spec",
    lead: "Every workflow exists because a real business needed it.",
    body: [
      "Quoting queues, re-typed drawings, price lists three revisions stale. We build against the factory floor, not the whiteboard.",
    ],
  },
  {
    icon: Layers,
    title: "One platform, not three\nproducts taped together",
    lead: "The drawing tools, the pricing and the job record are shared by all three products.",
    body: [
      "That's why a fabricator can move from the Customer Portal to the Fabrication Platform without moving anything, and why a retailer's quote always carries a fabricator's current price.",
    ],
  },
  {
    icon: Ruler,
    title: "The drawing\nis the job",
    lead: "A benchtop is its drawing.",
    body: [
      "The shape your customer draws is the shape that's priced, ordered, laid out on the slab and cut. Captured once, carried everywhere, never re-typed.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Commercial boundaries\nare product features",
    lead: "Trade prices and margins only work if the system enforces who sees what.",
    body: [
      "Every fabricator and every retailer has their own private account. Who sees which number is a rule Nyro enforces, not a courtesy people extend.",
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
            Software for the people who make and sell the tops.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Nyro is a New Zealand software company building the platform for
            quoting, making and selling benchtops.
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
                Nyro was built by people who have run a benchtop factory in
                New Zealand. The problem was obvious from the front office:
                the factory could cut faster than the office could quote.
                Every job began as a phone call and a sketch, waited in a
                queue for the one person who could price it, and got re-typed
                into a different system at every step.
              </p>
              <p>
                So we built the system we wished existed: drawing tools that
                understand benchtops, pricing that knows each customer&apos;s
                terms, and an order flow where the drawing on the quote is the
                drawing the machine cuts. It was proven on a real factory
                floor before it was offered to anyone else, and built for
                many businesses from the first day, because the problem
                isn&apos;t one company&apos;s.
              </p>
              <p>
                Today Nyro is three products on that one platform: a portal
                fabricators hand to their customers, a full system for running
                the factory, and a retail platform that lets stores quote into
                any fabricator on Nyro. Together they cover the life of a
                benchtop, from the first sketch to the delivery truck.
              </p>
            </div>
          </div>

          <figure className="mt-16">
            <div className="overflow-hidden rounded-xl ring-1 ring-black/5">
              <Image
                src="/photos/slab-yard.webp"
                alt="Engineered stone and marble slabs leaning in rows on the floor of a fabrication factory"
                width={2400}
                height={800}
                sizes="(min-width: 1280px) 1152px, 100vw"
                className="block h-auto w-full object-cover"
              />
            </div>
            <figcaption className="label-mono mt-3 text-[0.65rem] text-muted-foreground">
              Slab yard, engineered stone and marble
            </figcaption>
          </figure>
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
        sub="Whether you make tops, sell them, or both, we'll show you the platform on your materials."
      />
    </>
  );
}
