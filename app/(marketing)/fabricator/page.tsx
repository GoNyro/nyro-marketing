import {
  Boxes,
  Cpu,
  Factory,
  LineChart,
  TabletSmartphone,
  Truck,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/marketing/Container";
import { AppWindow } from "@/components/marketing/mockups/AppWindow";
import { QuotesTable } from "@/components/marketing/mockups/QuotesTable";
import { Section } from "@/components/marketing/primitives/Section";
import { BookCta } from "@/components/marketing/primitives/BookCta";
import { FeatureRows, type FeatureRow } from "@/components/marketing/sections/FeatureRows";
import { SlimCta } from "@/components/marketing/sections/SlimCta";
import {
  Faq,
  faqItemsToSchema,
  type FaqItem,
} from "@/components/marketing/sections/Faq";

export const metadata = buildMetadata({
  title: "Fabrication Platform - run the whole job on Nyro",
  description:
    "Everything a benchtop fabricator needs in one place: staff and customer quoting, orders, production scheduling, programs for your CNC machines, floor tablets, stock, delivery and invoicing. One job record from enquiry to installed top.",
  path: "/fabricator",
});

/* The lifecycle is a genuine sequence - the numbering is the order a job
   moves through the factory. */
const LIFECYCLE = [
  {
    step: "01",
    title: "Quote",
    blurb:
      "Staff quote on the same drawing tools your customers use in the portal. Same catalog, same pricing, whoever draws it.",
  },
  {
    step: "02",
    title: "Order",
    blurb:
      "Approval turns the quote into an order with the drawing, the price and the paper trail intact. Nothing is re-entered.",
  },
  {
    step: "03",
    title: "Make",
    blurb:
      "Jobs land in the production queue. Your CNC machines cut from the approved drawing and floor staff work from tablets at each station.",
  },
  {
    step: "04",
    title: "Deliver",
    blurb:
      "Finished tops go into delivery runs by zone. Customers are told at each step, and proof of delivery is kept on the job.",
  },
  {
    step: "05",
    title: "Invoice",
    blurb:
      "Invoices go to your accounting system without being keyed twice. Reports show where margin is made and lost.",
  },
] as const;

const MODULE_ROWS: FeatureRow[] = [
  {
    icon: Factory,
    title: "Production queue\n& scheduling",
    lead: "A queue that knows what the factory can take on.",
    body: [
      "See what's committed, what's at risk and what you can promise this week. Reorder by drag, batch by material, and plan around holidays and shutdowns. Every job carries its full history from the quote onward.",
    ],
  },
  {
    icon: Cpu,
    title: "Programs for\nyour machines",
    lead: "The approved drawing becomes the machine program.",
    body: [
      "Nyro writes the programs for your CNC machines directly from the drawing the customer approved, and lays pieces out on each sheet to get the most from every slab, offcuts included. Biesse, SCM, MasterWood, WoodWop, Anderson and FMC controllers are supported.",
    ],
  },
  {
    icon: TabletSmartphone,
    title: "Floor tablets\nat every station",
    lead: "Job status is real, not remembered.",
    body: [
      "Operators see the piece, the drawing and the operation at each station: cut, edge, polish, pack. They mark work done as it happens, which is what keeps order status honest for the office and the customer.",
    ],
  },
  {
    icon: Boxes,
    title: "Stock &\nmaterials",
    lead: "Every slab and offcut, tracked against a job.",
    body: [
      "Material is reserved when an order is confirmed, stock levels update as it's used, and usable offcuts are kept for the next job that fits. Low stock raises a reorder and a purchase order to your supplier.",
    ],
  },
  {
    icon: Truck,
    title: "Delivery\n& dispatch",
    lead: "The last mile handled like the first.",
    body: [
      "Delivery zones and rates price into the quote. Finished tops go into runs, customers are notified when it's on the way, and the driver records proof of delivery against the order.",
    ],
  },
  {
    icon: LineChart,
    title: "Invoicing\n& reporting",
    lead: "The numbers a fabricator actually argues about.",
    body: [
      "Invoices go to your accounting system so the office doesn't key them twice, and payments come back so orders show as paid. Reports cover margin, remakes and lead time, by material, by customer and by job type.",
    ],
  },
];

const FAQS: FaqItem[] = [
  {
    q: "We're on the Customer Portal. What does moving up involve?",
    a: "We switch on production, stock, delivery and invoicing on the account you already have. Your catalog, customers, quotes and orders stay exactly where they are. Then we train your team on the new screens.",
  },
  {
    q: "Can we start on the Fabrication Platform without using the Customer Portal first?",
    a: "Yes. Plenty of fabricators want the whole job on one system from day one. The Customer Portal is included, so your customers can quote themselves from the start.",
  },
  {
    q: "Which CNC machines does it work with?",
    a: "Nyro writes programs for Biesse, SCM, MasterWood, WoodWop, Anderson and FMC controllers. If you run something else, tell us in the demo.",
  },
  {
    q: "Does it connect to our accounting system?",
    a: "Yes. Invoices and customers go to your accounting system and payment status comes back, so nobody keys an invoice twice. Tell us what you use in the demo.",
  },
  {
    q: "What happens on the factory floor?",
    a: "Each station gets a tablet view of its queue. Operators see the piece, the drawing and the operation, and mark work done as it happens. That's what keeps order status honest for customers and staff alike.",
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
      <section className="surface-dark ink-dots relative overflow-hidden">
        <Container className="relative pb-16 pt-16 md:pb-20 md:pt-20">
          <p className="label-mono text-[0.7rem] text-surface-dark-foreground/50">
            Fabrication Platform · for fabricators
          </p>
          <h1 className="display-hero mt-5 max-w-2xl text-balance text-surface-dark-foreground">
            Run the whole job on one system
          </h1>
          <p
            data-speakable
            className="mt-5 max-w-xl text-base leading-relaxed text-surface-dark-foreground/65"
          >
            Everything in the Customer Portal, plus the factory. Quoting,
            orders, production, your CNC machines, stock, delivery and
            invoicing on one platform, so a job is entered once and everyone
            from the front office to the polisher works from the same drawing.
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

          {/* the office view: every job, one record */}
          <div className="mt-14">
            <AppWindow>
              <QuotesTable />
            </AppWindow>
          </div>
        </Container>
      </section>

      {/* Modules */}
      <section className="surface-gray border-t border-border">
        <Container className="py-20 md:py-28">
          <h2 className="display-md max-w-2xl text-balance">
            Everything the office and the floor argue about, handled.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            The Fabrication Platform takes the job from the approved quote
            through your machines and out the door. No other production
            software required.
          </p>
          <FeatureRows rows={MODULE_ROWS} className="mt-16" />
        </Container>
      </section>

      <SlimCta
        title="Already on the Customer Portal?"
        sub="We switch on the factory on the account you already have. Nothing moves."
        label="Talk to us"
      />

      {/* Production queue and floor-tablet screens return here once the
          platform has them to replicate. Until then the section is hidden. */}

      {/* FAQ */}
      <Section surface="card">
        <Faq
          items={FAQS}
          sub="What owners and production managers ask about running the factory on Nyro."
        />
      </Section>

      <SlimCta
        title="See a job go from sketch to cut list."
        sub="Quote, order, production queue, floor tablet, delivery, on a sample factory."
      />
    </>
  );
}
