import {
  Boxes,
  Factory,
  LineChart,
  TabletSmartphone,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/marketing/Container";
import { Section } from "@/components/marketing/primitives/Section";
import { BookCta } from "@/components/marketing/primitives/BookCta";
import { FeatureRows, type FeatureRow } from "@/components/marketing/sections/FeatureRows";
import { SlimCta } from "@/components/marketing/sections/SlimCta";
import { PlaceholderSlab } from "@/components/marketing/sections/PlaceholderSlab";
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
      "Staff quote on the same canvas your customers use in the portal. One engine, one price, whoever draws it.",
  },
  {
    step: "02",
    title: "Order",
    blurb:
      "Approval converts the quote - geometry, pricing and paper trail intact. Nothing is re-entered.",
  },
  {
    step: "03",
    title: "Produce",
    blurb:
      "Jobs land in the manufacturing queue with capacity in view. Floor staff work from tablets at each station.",
  },
  {
    step: "04",
    title: "Dispatch",
    blurb:
      "Ready tops roll into delivery runs, customers notified at each step, stock decremented as material is consumed.",
  },
  {
    step: "05",
    title: "Prove",
    blurb:
      "Financials flow to your accounting system; analytics show where margin is made and lost.",
  },
] as const;

const MODULE_ROWS: FeatureRow[] = [
  {
    icon: Factory,
    title: "Production\n& scheduling",
    lead: "A manufacturing queue that understands capacity.",
    body: [
      "See what's committed, what's at risk, and what the factory can actually take on this week. Jobs carry their full history - the quote's geometry is the piece the floor cuts.",
    ],
  },
  {
    icon: TabletSmartphone,
    title: "Floor tablets\nper workstation",
    lead: "Job status is real, not remembered.",
    body: [
      "Operators see the piece, the drawing and the operation at each station - cut, edge, polish, pack - and mark work done as it happens. That's what keeps order status honest for customers and staff alike.",
    ],
  },
  {
    icon: Boxes,
    title: "Stock, dispatch\n& CAM export",
    lead: "Slabs, offcuts and delivery runs on the same record.",
    body: [
      "Materials tracked against jobs with CAM and nesting export to make the most of every sheet. Ready tops roll into delivery runs with the last mile handled like the first - notified, tracked, signed off.",
    ],
  },
  {
    icon: LineChart,
    title: "Financials\n& analytics",
    lead: "The numbers a fabricator actually argues about.",
    body: [
      "Invoicing syncs to your accounting system so the office doesn't key it twice. Reporting covers margin, rework and lead time - by material, by customer, by job type.",
    ],
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

      {/* Dark hero with the lifecycle rail */}
      <section className="surface-dark ink-grid relative overflow-hidden">
        <Container className="relative pb-16 pt-16 md:pb-20 md:pt-20">
          <p className="label-mono text-[0.7rem] text-surface-dark-foreground/50">
            Fabrication Platform · for fabricators
          </p>
          <h1 className="display-hero mt-5 max-w-2xl text-balance text-surface-dark-foreground">
            One system from enquiry to installed top
          </h1>
          <p
            data-speakable
            className="mt-5 max-w-xl text-base leading-relaxed text-surface-dark-foreground/65"
          >
            The full operating system for a benchtop fabricator. Quoting,
            orders, production, stock, dispatch and the numbers - on one
            platform, so a job is entered once and everyone from the front
            office to the polisher works from the same truth.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCta variant="inverse" />
            <BookCta
              variant="ghost-dark"
              label="Start smaller with the portal"
              href="/customer"
            />
          </div>

          {/* lifecycle rail */}
          <div className="mt-16">
            <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
              {LIFECYCLE.map((item) => (
                <li
                  key={item.step}
                  className="border-t border-surface-dark-foreground/25 pt-4"
                >
                  <span className="label-mono text-[0.65rem] text-surface-dark-foreground/45">
                    {item.step}
                  </span>
                  <h3 className="mt-2 text-sm font-medium text-surface-dark-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-surface-dark-foreground/55">
                    {item.blurb}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Modules */}
      <section className="surface-gray border-t border-border">
        <Container className="py-20 md:py-28">
          <h2 className="display-md max-w-2xl text-balance">
            Everything the office and the floor argue about, handled.
          </h2>
          <FeatureRows rows={MODULE_ROWS} className="mt-16" />
        </Container>
      </section>

      <SlimCta
        title="Already on the portal?"
        sub="Upgrading is a module switch on the same tenant - your data stays put."
        label="Talk to us"
      />

      {/* Production screens get their own design session. */}
      <section className="surface-gray border-t border-border">
        <Container className="py-20 md:py-24">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="display-md text-balance">
              From queue to cut list.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The production queue, floor tablet and dispatch screens - walked
              through end to end in the demo.
            </p>
          </div>
          <PlaceholderSlab
            note="Production & floor-tablet screens · mockups — dedicated session"
            className="mt-12"
          />
        </Container>
      </section>

      {/* FAQ */}
      <Section surface="card">
        <Faq
          items={FAQS}
          sub="What owners and ops managers ask about running the factory on Nyro."
        />
      </Section>

      <SlimCta
        title="See a job go from sketch to cut list."
        sub="Quote, order, production queue, floor tablet, dispatch - on a sample factory."
      />
    </>
  );
}
