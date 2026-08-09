import { Check, Minus, Eye } from "lucide-react";
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
        <Eye className="size-4 text-clay-ink" aria-label="Partially visible" />
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

      {/* Hero */}
      <Section className="border-t-0">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <SectionHeading
            as="h1"
            eyebrow="Retailer Platform · For retailers"
            title="Quote the kitchen while the customer is still in the store."
            titleClassName="display-hero"
          />
          <p data-speakable className="text-lg leading-relaxed text-muted-foreground">
            For chains and merchants selling benchtops: one quoting surface
            across every partner fabricator. Staff quote a homeowner on the
            spot, your margin and branding go on top, and the approved job
            routes to the right fabricator to make.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCta label="Talk to us" nudge withArrow />
            <BookCta
              variant="secondary"
              label="How fabricators fit in"
              href="/customer"
            />
          </div>
        </div>
      </Section>

      {/* Routing flow */}
      <Section surface="card">
        <SectionHeading
          eyebrow="How routing works"
          title="Live catalogs in, one order out."
          sub="The retailer never holds fabricator data. Every quote reads catalog and pricing live from the fabricator's tenant, scoped by the relationship they control."
        />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {FLOW.map((item, i) => (
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

      {/* Who sees what */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Trust boundaries"
              title="Both sides see exactly what they should."
              sub="Commercial terms stay commercial. The platform enforces who sees which number, so partnerships don't depend on politeness."
            />
          </div>
          <Reveal className="lg:col-span-7">
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
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
      </Section>

      {/* Analytics for category buyers */}
      <Section surface="card">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            align="center"
            eyebrow="For category buyers"
            title="See the market you're selling into."
            sub="Demand by region, material and style, quote-to-order conversion by store and by fabricator - the analytics to manage fabricator relationships and negotiate tiers on evidence instead of anecdote."
          />
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <Faq items={FAQS} sub="What retail teams ask about quoting across a fabricator network." />
      </Section>

      <CtaBand
        eyebrow="Partner with us"
        title={
          <>
            Bring benchtops into
            <br className="hidden sm:block" /> the store visit.
          </>
        }
        sub="The Retailer Platform rolls out with our fabricator network. Talk to us about the regions you need covered and we'll map the partners to get you quoting."
        secondary={{ label: "See the fabricator side", href: "/fabricator" }}
      />
    </>
  );
}
