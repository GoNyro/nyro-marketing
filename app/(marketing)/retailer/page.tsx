import {
  ChartBar,
  Check,
  Eye,
  Minus,
  Palette,
  Percent,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/marketing/Container";
import { Section } from "@/components/marketing/primitives/Section";
import { BookCta } from "@/components/marketing/primitives/BookCta";
import { Reveal } from "@/components/marketing/primitives/Reveal";
import { FeatureRows, type FeatureRow } from "@/components/marketing/sections/FeatureRows";
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
  title: "Retailer Platform - quote in store, into any fabricator",
  description:
    "For retailers who sell benchtops: store staff quote customers on the spot against any fabricator on Nyro, add your margin, and send the approved job to the fabricator to make and deliver. White-label from quote to delivery: your logo and colours on everything the customer sees, and the fabricator never appears.",
  path: "/retailer",
});

/* The routing flow is a genuine sequence. */
const FLOW = [
  {
    step: "01",
    title: "Choose the fabricator",
    blurb:
      "A customer walks in. Store staff pick the fabricator for the job from any fabricator on Nyro, by region, material or lead time.",
  },
  {
    step: "02",
    title: "Quote on their catalog",
    blurb:
      "That fabricator's catalog and your agreed trade price load into the quote. Prices are always current, so staff never quote off a stale price list.",
  },
  {
    step: "03",
    title: "Add your margin",
    blurb:
      "Your margin goes on top. The customer sees one price, your logo and colours, and a quote they can approve from their phone. The trade price behind it stays yours.",
  },
  {
    step: "04",
    title: "Send it to be made",
    blurb:
      "On approval, the job goes to the fabricator as an order at the agreed price. They make it and deliver it, and the status comes back to your screen and your customer's.",
  },
] as const;

const ROWS: FeatureRow[] = [
  {
    icon: Store,
    title: "Quote in store,\nwith the customer",
    lead: "Staff draw the benchtop and price it while the customer is still there.",
    body: [
      "The same drawing tools fabricators use, on a store screen. Staff choose the shape, the material, the edges and the sink and hob cutouts, and the price updates as they go. The customer leaves with a real quote, not a promise to call back.",
    ],
  },
  {
    icon: Percent,
    title: "Your margin,\nyour rules",
    lead: "Set a margin across the board or item by item.",
    body: [
      "Every fabricator on Nyro gives you a trade price. You decide what goes on top: one margin for everything, or a different one per material and product. Quotes keep the margin they were written with, so a change today never moves a price you've already given.",
    ],
  },
  {
    icon: Palette,
    title: "White-label,\nquote to delivery",
    lead: "The customer sees your brand at every step and never learns who made the top.",
    body: [
      "Upload your logo and set your colours once. The quote, the approval page, the emails, the order tracking page and the invoice all carry your name and your brand. Emails go out under your name, and messages from the customer come to you.",
      "The fabricator is a supplier behind the scenes. Their name, their prices and their production detail never reach your customer: what comes back is placed, in production, dispatched, delivered, under your brand.",
    ],
  },
  {
    icon: Users,
    title: "Your customers,\nmanaged by you",
    lead: "Customer details stay with you, and approvals take one tap.",
    body: [
      "Your customers approve their quote, track their order and message you through a link you send them. No account, no password. The fabricator gets the delivery address they need to ship, and nothing more unless you choose to share it.",
    ],
  },
  {
    icon: Truck,
    title: "Deliveries\nin view",
    lead: "Know where every job is without ringing the factory.",
    body: [
      "Once a job is with the fabricator, its progress comes back to your screen: accepted, in production, dispatched, delivered. Your customer sees the same milestones under your brand.",
    ],
  },
  {
    icon: ChartBar,
    title: "See the market\nyou're selling into",
    lead: "What's selling, where, and which fabricators deliver.",
    body: [
      "Most popular materials, quote-to-order conversion by store, order volume by region, and how quickly each fabricator accepts and delivers. Manage supplier relationships and negotiate trade prices on evidence.",
    ],
  },
];

type Visibility = "yes" | "no" | "partial";
const VISIBILITY_ROWS: {
  item: string;
  retailer: Visibility;
  fabricator: Visibility;
  note?: string;
}[] = [
  { item: "Trade price (what you pay the fabricator)", retailer: "yes", fabricator: "yes" },
  { item: "Your margin", retailer: "yes", fabricator: "no" },
  { item: "Price the customer pays you", retailer: "yes", fabricator: "no" },
  {
    item: "Your customer's contact details",
    retailer: "yes",
    fabricator: "partial",
    note: "delivery address only",
  },
  {
    item: "Production progress",
    retailer: "partial",
    fabricator: "yes",
    note: "milestones only",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "Which fabricators can we quote into?",
    a: "Any fabricator on Nyro. Each fabricator agrees a trade price with you and chooses which of their products you can sell. Quote against one fabricator for Auckland and another for Wellington, from the same screen.",
  },
  {
    q: "Do we have to maintain the fabricators' catalogs or price lists?",
    a: "No. Each fabricator's catalog and trade prices are kept current for you automatically. Your staff always quote off today's numbers, and there's no price list to update.",
  },
  {
    q: "Can fabricators see our margin?",
    a: "No. The fabricator sees the trade price they agreed with you, which is what they invoice. Your margin and the price your customer pays are yours alone.",
  },
  {
    q: "What if a fabricator changes their prices?",
    a: "New quotes use the new price. A quote you've already given keeps the price it was written with, and once a customer approves, that price is locked on the order.",
  },
  {
    q: "Is the Retailer Platform white-label?",
    a: "Yes, on everything your customer touches. Your logo and colours are on the quote, the approval page, the order tracking page, the invoice and every email, and emails are sent under your name. The fabricator making the top never appears to your customer. Pages are served from Nyro's secure domain rather than your own website, so the link your customer opens is a Nyro link carrying your brand.",
  },
  {
    q: "Do our customers need an account?",
    a: "No. They review, approve, track and message about their benchtop through a link you send them, with your branding on it. Your store staff have their own logins.",
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
      <section className="surface-dark ink-dots relative overflow-hidden">
        <Container className="relative pb-16 pt-16 md:pb-20 md:pt-20">
          <p className="label-mono text-[0.7rem] text-surface-dark-foreground/50">
            Retailer Platform · for retailers
          </p>
          <h1 className="display-hero mt-5 max-w-2xl text-balance text-surface-dark-foreground">
            Quote the benchtop while the customer is still in the store
          </h1>
          <p
            data-speakable
            className="mt-5 max-w-xl text-base leading-relaxed text-surface-dark-foreground/65"
          >
            For retailers who sell benchtops. Your staff quote a customer on
            the spot, into any fabricator on Nyro, with your margin on top and
            your brand on everything the customer sees. The approved job goes
            to the fabricator to make and deliver, and you watch it happen.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCta variant="inverse" />
            <BookCta
              variant="ghost-dark"
              label="What's included"
              href="#included"
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

      {/* What's included */}
      <section id="included" className="surface-gray scroll-mt-16 border-t border-border">
        <Container className="py-20 md:py-28">
          <h2 className="display-md max-w-2xl text-balance">
            Your store, your brand, every fabricator on Nyro behind it.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            The Retailer Platform gives your stores one way to quote, sell and
            track benchtops, whichever fabricator makes them.
          </p>
          <FeatureRows rows={ROWS} className="mt-16" />
        </Container>
      </section>

      <SlimCta
        title="Bring benchtops into the store visit."
        sub="Tell us the regions you sell in and we'll show you quoting into the fabricators who cover them."
        label="Book a demo"
      />

      {/* Who sees what */}
      <section className="surface-gray border-t border-border">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="display-md text-balance">
                Both sides see exactly what they should.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                Commercial terms stay commercial. Nyro decides who sees which
                number, so the partnership doesn&apos;t depend on anyone being
                polite.
              </p>
            </div>
            <Reveal className="lg:col-span-7">
              <div className="overflow-x-auto rounded-xl bg-card shadow-[0_16px_48px_-24px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-56">What</TableHead>
                      <TableHead>You see</TableHead>
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

      {/* FAQ */}
      <Section surface="card">
        <Faq
          items={FAQS}
          sub="What retail teams ask about quoting into a network of fabricators."
        />
      </Section>

      <SlimCta
        title="See a store quote become a factory order."
        sub="Thirty minutes: quote a customer, add your margin, send it to a fabricator, watch it come back."
        label="Book a demo"
      />
    </>
  );
}
