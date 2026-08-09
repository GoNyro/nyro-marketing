import {
  Factory,
  Layers,
  Ruler,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/marketing/primitives/Section";
import { SectionHeading } from "@/components/marketing/primitives/SectionHeading";
import { Reveal } from "@/components/marketing/primitives/Reveal";
import { CtaBand } from "@/components/marketing/sections/CtaBand";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Nyro builds Engage, the quoting and order platform for the benchtop industry. Developed inside BeautyCraft, a working New Zealand fabrication business, and built to serve the whole industry.",
  path: "/about",
});

const PRINCIPLES: { icon: LucideIcon; title: string; blurb: string }[] = [
  {
    icon: Factory,
    title: "The factory is the spec",
    blurb:
      "Every workflow in Engage exists because a real fabrication business needed it - quoting queues, re-keyed geometry, price lists three revisions stale. We build against the floor, not the whiteboard.",
  },
  {
    icon: Layers,
    title: "One platform, not three products taped together",
    blurb:
      "The canvas, the pricing engine and the catalog are shared infrastructure. That's why an upgrade is a module switch and why a retailer's quote can read a fabricator's live price - no syncs, no copies, no drift.",
  },
  {
    icon: Ruler,
    title: "Geometry is sacred",
    blurb:
      "A benchtop is its drawing. The shape your customer draws is the shape that's priced, ordered, nested and cut - captured once, carried everywhere, never transcribed.",
  },
  {
    icon: ShieldCheck,
    title: "Commercial boundaries are product features",
    blurb:
      "Wholesale tiers, retail markups and customer pricing only work if the system enforces who sees what. Tenant isolation isn't plumbing to us - it's the deal.",
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
      <Section className="border-t-0">
        <SectionHeading
          as="h1"
          eyebrow="About Nyro"
          title="Software for the people who make the tops."
          titleClassName="display-hero"
          sub="Nyro is a New Zealand software company building Engage - the quoting and order platform for the benchtop industry."
        />
      </Section>

      {/* Story */}
      <Section surface="card">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The story"
              title="Born on a factory floor, not in a pitch deck."
            />
          </div>
          <div className="prose-like lg:col-span-7">
            <p data-speakable>
              Engage started inside BeautyCraft, a working benchtop fabrication
              business in New Zealand. The problem was obvious from the front
              office: the factory could cut faster than the office could quote.
              Every job began as a phone call and a sketch, waited in a queue
              for the one person who could price it, and got re-typed into a
              different system at every step.
            </p>
            <p>
              So we built the system we wished existed: a quote canvas that
              understands benchtops, a pricing engine that knows each
              customer&apos;s terms, and an order flow where the geometry drawn
              at quote time is the geometry the CNC cuts. BeautyCraft became
              tenant number one - and the platform was built multi-tenant from
              the first line, because the problem isn&apos;t one company&apos;s.
            </p>
            <p>
              Today Engage is three products on that one platform: a customer
              portal fabricators hand to their trade accounts, a full
              fabrication operating system, and a retailer surface that
              connects stores to the fabricator network. The plan is deliberate
              - portals first, the network they create second.
            </p>
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section>
        <SectionHeading
          eyebrow="How we build"
          title="Principles we don't trade away."
        />
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.title} delay={(i % 2) * 0.06}>
              <principle.icon className="size-6 text-accent" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {principle.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {principle.blurb}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="Work with us"
        title={
          <>
            The industry runs on
            <br className="hidden sm:block" /> relationships. So do we.
          </>
        }
        sub="Whether you cut tops, sell them, or both - book a demo and we'll show you the platform on your materials."
        secondary={{ label: "See the products", href: "/#platform" }}
      />
    </>
  );
}
