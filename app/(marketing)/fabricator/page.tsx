import {
  Users,
  Factory,
  TabletSmartphone,
  Boxes,
  Truck,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/marketing/primitives/Section";
import { SectionHeading } from "@/components/marketing/primitives/SectionHeading";
import { BookCta } from "@/components/marketing/primitives/BookCta";
import { Reveal } from "@/components/marketing/primitives/Reveal";
import { CtaBand } from "@/components/marketing/sections/CtaBand";
import {
  Faq,
  faqItemsToSchema,
  type FaqItem,
} from "@/components/marketing/sections/Faq";

export const metadata = buildMetadata({
  title: "Fabrication Platform - quoting to delivery on one system",
  description:
    "The full operating system for a benchtop fabricator: staff and customer quoting, orders, production scheduling, floor tablets, CAM export, stock, dispatch, financials integration and analytics - one system from enquiry to installed top.",
  path: "/fabricator",
});

/* The lifecycle is a genuine sequence - the numbering is the order a job
   moves through the factory. */
const LIFECYCLE = [
  {
    step: "01",
    title: "Quote",
    blurb:
      "Staff quote over the phone or in person on the same canvas your customers use in the portal. One engine, one price, whoever draws it.",
  },
  {
    step: "02",
    title: "Order",
    blurb:
      "Approval converts the quote - geometry, pricing and paper trail intact. Nothing is re-entered, so nothing is re-entered wrong.",
  },
  {
    step: "03",
    title: "Production",
    blurb:
      "Jobs land in the manufacturing queue with capacity and scheduling in view. Floor staff work from tablets at each station - cut, edge, polish, pack.",
  },
  {
    step: "04",
    title: "Dispatch",
    blurb:
      "Ready tops roll into delivery runs with the customer notified at each step - and stock decremented as material is consumed.",
  },
  {
    step: "05",
    title: "Prove it",
    blurb:
      "Financials flow to your accounting system, and analytics show where margin is made and lost - by material, by customer, by job type.",
  },
] as const;

const MODULES: { icon: LucideIcon; title: string; blurb: string }[] = [
  {
    icon: Users,
    title: "Customers & CRM",
    blurb:
      "Every account, contact, quote and order in one place - with the customer-facing portal included, because the Fabrication Platform is a superset of it.",
  },
  {
    icon: Factory,
    title: "Production & scheduling",
    blurb:
      "A manufacturing queue that understands capacity. See what's committed, what's at risk, and what the factory can actually take on this week.",
  },
  {
    icon: TabletSmartphone,
    title: "Floor tablets",
    blurb:
      "Guided workflows at each workstation. Operators mark pieces cut, edged, polished and packed - so job status is real, not remembered.",
  },
  {
    icon: Boxes,
    title: "Stock & materials",
    blurb:
      "Slabs, offcuts and consumables tracked against jobs, with CAM and nesting export to make the most of every sheet.",
  },
  {
    icon: Truck,
    title: "Dispatch & delivery",
    blurb:
      "Delivery runs, ready-for-pickup states and customer notifications - the last mile handled with the same paper trail as the first.",
  },
  {
    icon: LineChart,
    title: "Financials & analytics",
    blurb:
      "Invoicing that syncs to your accounting system, and reporting on the numbers a fabricator actually argues about: margin, rework, lead time.",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "We're on the Customer Portal - what does upgrading involve?",
    a: "A module switch. You're already the same tenant on the same platform, so your catalog, customers, quotes and orders carry straight over. We turn on production, stock, dispatch and analytics, and train your team on the new screens.",
  },
  {
    q: "Can we buy the Fabrication Platform directly, without starting on the portal?",
    a: "Yes. The staged path exists for fabricators who want low commitment first, but there's nothing stopping a direct start on the full platform.",
  },
  {
    q: "Does it integrate with our accounting system?",
    a: "Financials integration is part of the platform - invoices and payments sync out so the office doesn't key them twice. Talk to us about your specific stack in the demo.",
  },
  {
    q: "What happens on the factory floor?",
    a: "Each workstation gets a tablet view of its queue. Operators see the piece, the drawing and the operation, and mark work done as it happens - which is what keeps order status honest for customers and staff alike.",
  },
];

export default function FabricatorPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Fabrication Platform", href: "/fabricator" },
        ])}
      />
      <JsonLd data={faqPageSchema(faqItemsToSchema(FAQS))} />

      {/* Hero */}
      <Section className="border-t-0">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <SectionHeading
            as="h1"
            eyebrow="Fabrication Platform · For fabricators"
            title="One system from enquiry to installed top."
            titleClassName="display-hero"
          />
          <p data-speakable className="text-lg leading-relaxed text-muted-foreground">
            The full operating system for a benchtop fabricator. Quoting,
            orders, production, stock, dispatch and the numbers - on one
            platform, so a job is entered once and everyone from the front
            office to the polisher works from the same truth.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCta nudge withArrow />
            <BookCta
              variant="secondary"
              label="Start smaller with the portal"
              href="/customer"
            />
          </div>
        </div>
      </Section>

      {/* Lifecycle rail */}
      <Section surface="card">
        <SectionHeading
          eyebrow="The lifecycle"
          title="Follow the job, not the paperwork."
          sub="Five stages, one record. The quote's geometry is the order's geometry is the piece the floor cuts."
        />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {LIFECYCLE.map((item, i) => (
            <Reveal key={item.step} as="li" delay={i * 0.06}>
              <div className="border-t border-foreground/20 pt-5">
                <span className="label-mono text-muted-foreground">{item.step}</span>
              </div>
              <h3 className="mt-3 font-display text-xl text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.blurb}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Modules */}
      <Section>
        <SectionHeading
          eyebrow="The modules"
          title="Everything the office and the floor argue about, handled."
        />
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module, i) => (
            <Reveal key={module.title} delay={(i % 3) * 0.06}>
              <module.icon className="size-6 text-ink-fabricator" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {module.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {module.blurb}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Proof / origin */}
      <Section surface="card">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            align="center"
            eyebrow="Proven where it hurts"
            title="Built inside a working fabrication business."
            sub="Engage was developed with BeautyCraft, the platform's founding fabricator. The workflows exist because a real factory needed them - not because a whiteboard suggested them."
          />
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <Faq items={FAQS} sub="What owners and ops managers ask about running the factory on Engage." />
      </Section>

      <CtaBand
        title={
          <>
            See a job go from sketch
            <br className="hidden sm:block" /> to cut list.
          </>
        }
        sub="Book a demo and we'll walk the full lifecycle - quote, order, production queue, floor tablet, dispatch - on a sample factory."
        secondary={{ label: "Start with the Customer Portal", href: "/customer" }}
      />
    </>
  );
}
