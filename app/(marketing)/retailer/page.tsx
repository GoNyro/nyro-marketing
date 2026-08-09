import { Check, Eye, Minus } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/marketing/Container";
import { Section } from "@/components/marketing/primitives/Section";
import { BookCta } from "@/components/marketing/primitives/BookCta";
import { Reveal } from "@/components/marketing/primitives/Reveal";
import { SlimCta } from "@/components/marketing/sections/SlimCta";
import {
  Faq,
  faqItemsToSchema,
  type FaqItem,
} from "@/components/marketing/sections/Faq";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = buildMetadata({
  title: "Retailer Platform - quote in-store, fulfil through any fabricator",
  description:
    "For retail chains selling benchtops: store staff quote homeowners on the spot against partner fabricators' live catalogs and wholesale pricing, add your markup and branding, and route approved jobs to the right fabricator for fulfilment.",
  path: "/retailer",
});

/* The routing flow is a genuine sequence. */
const FLOW = [
  {
    step: "01",
    title: "Pick the fabricator",
    blurb:
      "A homeowner walks in. Store staff pick the right partner fabricator for the job - by region, material or lead time - from the relationships you hold.",
  },
  {
    step: "02",
    title: "Quote against a live catalog",
    blurb:
      "The canvas loads that fabricator's catalog and prices live, at your agreed wholesale tier. If they update a price tomorrow, in-flight quotes re-price - nothing is synced, copied or stale.",
  },
  {
    step: "03",
    title: "Add your margin",
    blurb:
      "Your markup goes on top. The homeowner sees one number, your branding and a quote they can approve online - never the wholesale cost behind it.",
  },
  {
    step: "04",
    title: "Route the order",
    blurb:
      "On approval, a snapshot of the job - geometry, line items, agreed prices - crosses to the fabricator as an incoming order. From there they fulfil it like any other job, price locked.",
  },
] as const;

type Visibility = "yes" | "no" | "partial";
const VISIBILITY_ROWS: {
  item: string;
  retailer: Visibility;
  fabricator: Visibility;
  note?: string;
}[] = [
  { item: "Wholesale cost (retailer pays fabricator)", retailer: "yes", fabricator: "yes" },
  { item: "Retailer's markup", retailer: "yes", fabricator: "no" },
  { item: "Price the homeowner pays", retailer: "yes", fabricator: "no" },
  {
    item: "Homeowner's contact details",
    retailer: "yes",
    fabricator: "partial",
    note: "fulfilment details only",
  },
  {
    item: "Production progress",
    retailer: "partial",
    fabricator: "yes",
    note: "status only - In Production, Ready",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "Do we have to hold or maintain the fabricators' catalogs?",
    a: "No - that's the point. You never own a copy of a fabricator's catalog or pricing. Each relationship defines what you can see and the wholesale tier you pay, and the platform reads it live from the fabricator's own tenant.",
  },
  {
    q: "Can fabricators see our margin?",
    a: "No. The fabricator sees the wholesale price they agreed to charge you - which is what they invoice. Your markup and the homeowner's price are yours alone.",
  },
  {
    q: "What if a fabricator changes prices mid-quote?",
    a: "Unapproved quotes re-price live, so store staff always quote on current numbers. The moment a homeowner approves, the price is locked in the order snapshot - future catalog changes can't touch it.",
  },
  {
    q: "Which fabricators can we quote against?",
    a: "Any fabricator on Engage who agrees a relationship with you - the fabricator controls what's shared. The network is growing fabricator by fabricator; talk to us about the regions and partners you need covered.",
  },
];

function VisibilityCell({ value, note }: { value: Visibility; note?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {value === "yes" ? (
        <Check className="size-4 text-accent" aria-label="Visible" />
      ) : value === "partial" ? (
        <Eye className="size-4 text-status-warm-ink" aria-label="Partially visible" />
      ) : (
        <Minus className="size-4 text-muted-foreground/50" aria-label="Not visible" />
      )}
      {note ? <span className="text-xs text-muted-foreground">{note}</span> : null}
    </span>
  );
}

export default function RetailerPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Retailer Platform", href: "/retailer" },
        ])}
      />
      <JsonLd data={faqPageSchema(faqItemsToSchema(FAQS))} />

      {/* Dark hero with the routing flow */}
      <section className="surface-dark ink-grid relative overflow-hidden">
        <Container className="relative pb-16 pt-16 md:pb-20 md:pt-20">
          <p className="label-mono text-[0.7rem] text-surface-dark-foreground/50">
            Retailer Platform · for retailers
          </p>
          <h1 className="display-hero mt-5 max-w-2xl text-balance text-surface-dark-foreground">
            Quote the kitchen while the customer is still in the store
          </h1>
          <p
            data-speakable
            className="mt-5 max-w-xl text-base leading-relaxed text-surface-dark-foreground/65"
          >
            For chains and merchants selling benchtops: one quoting surface
            across every partner fabricator. Staff quote a homeowner on the
            spot, your margin and branding go on top, and the approved job
            routes to the right fabricator to make.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCta variant="inverse" label="Talk to us" />
            <BookCta
              variant="ghost-dark"
              label="How fabricators fit in"
              href="/customer"
            />
          </div>

          {/* routing flow rail */}
          <div className="mt-16">
            <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {FLOW.map((item) => (
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

      {/* Who sees what */}
      <section className="surface-gray border-t border-border">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="display-md text-balance">
                Both sides see exactly what they should.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                Commercial terms stay commercial. The platform enforces who
                sees which number, so partnerships don&apos;t depend on
                politeness.
              </p>
            </div>
            <Reveal className="lg:col-span-7">
              <div className="overflow-x-auto rounded-xl bg-card shadow-[0_16px_48px_-24px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-56">What</TableHead>
                      <TableHead>Retailer sees</TableHead>
                      <TableHead>Fabricator sees</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {VISIBILITY_ROWS.map((row) => (
                      <TableRow key={row.item}>
                        <TableCell className="whitespace-normal font-medium text-foreground/90">
                          {row.item}
                        </TableCell>
                        <TableCell>
                          <VisibilityCell
                            value={row.retailer}
                            note={row.retailer === "partial" ? row.note : undefined}
                          />
                        </TableCell>
                        <TableCell>
                          <VisibilityCell
                            value={row.fabricator}
                            note={row.fabricator === "partial" ? row.note : undefined}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <SlimCta
        title="Bring benchtops into the store visit."
        sub="The Retailer Platform rolls out with our fabricator network - talk to us about the regions you need covered."
        label="Register interest"
      />

      {/* Analytics for category buyers */}
      <section className="surface-gray border-t border-border">
        <Container className="py-20 md:py-24">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="display-md text-balance">
              See the market you&apos;re selling into.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Demand by region, material and style, quote-to-order conversion
              by store and by fabricator - the analytics to manage fabricator
              relationships and negotiate tiers on evidence instead of
              anecdote.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <Section surface="card">
        <Faq
          items={FAQS}
          sub="What retail teams ask about quoting across a fabricator network."
        />
      </Section>

      <SlimCta
        title="Map the partners to get you quoting."
        sub="Tell us the regions and fabricators you need covered."
        label="Talk to us"
      />
    </>
  );
}
