import Link from "next/link";
import { Check } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/marketing/Container";
import { Section } from "@/components/marketing/primitives/Section";
import { BookCta } from "@/components/marketing/primitives/BookCta";
import { SlimCta } from "@/components/marketing/sections/SlimCta";
import {
  Faq,
  faqItemsToSchema,
  type FaqItem,
} from "@/components/marketing/sections/Faq";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Nyro is priced per product and scoped to your operation. Start with the Customer Portal, move up to the Fabrication Platform when you want the factory on Nyro, or join as a retailer. Book a demo for a number.",
  path: "/pricing",
});

type Plan = {
  name: string;
  href: string;
  who: string;
  blurb: string;
  includes: string[];
  cta: string;
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Customer Portal",
    href: "/customer",
    who: "Fabricators who want quoting off their desk",
    blurb:
      "Your customers quote themselves on your catalog and your prices. Approved jobs hand over to the production system you already run.",
    includes: [
      "Catalog and price levels, set per customer",
      "Control over what each customer can draw",
      "Approvals, order tracking and delivery pricing",
      "Machine-ready files for your production system",
      "We load your catalog and pricing with you",
    ],
    cta: "Book a demo",
    highlight: true,
  },
  {
    name: "Fabrication Platform",
    href: "/fabricator",
    who: "Fabricators who want the whole job on one system",
    blurb:
      "Everything in the Customer Portal plus the factory: production queue, programs for your machines, floor tablets, stock, delivery and invoicing.",
    includes: [
      "Everything in the Customer Portal",
      "Production queue and scheduling",
      "Programs for your CNC machines",
      "Floor tablets, stock and delivery runs",
      "Invoicing to your accounting system and reporting",
    ],
    cta: "Talk to us",
  },
  {
    name: "Retailer Platform",
    href: "/retailer",
    who: "Retailers who sell benchtops in store",
    blurb:
      "Quote in store into any fabricator on Nyro, with your margin on top and your brand on everything the customer sees.",
    includes: [
      "Quote into any fabricator on Nyro",
      "Your margin, across the board or per item",
      "Your logo and colours on every customer touchpoint",
      "Customer approvals and tracking with a link, no login",
      "Sales and fabricator reporting",
    ],
    cta: "Talk to us",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "Why isn't there a price on this page?",
    a: "Because the honest answer is \"it depends on your operation\": how many customer accounts you invite, which product you're on, and how much help your catalog needs to load. We scope it with you in the first call and give you a number before any commitment.",
  },
  {
    q: "What does onboarding involve?",
    a: "Your catalog and your pricing. We load materials, thicknesses, edge profiles and machining rates with you, set up your customer price levels, and go live with a few customers before opening it up to everyone.",
  },
  {
    q: "What happens to our subscription when we move from the Customer Portal to the Fabrication Platform?",
    a: "We switch on the factory on the account you already have. Your catalog, customers and history stay put, and the subscription changes to match what you've switched on.",
  },
  {
    q: "Is there a contract lock-in?",
    a: "We'd rather keep you with a product you use than a clause you signed. Terms are agreed per engagement. Ask us in the demo.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Pricing", href: "/pricing" },
        ])}
      />
      <JsonLd data={faqPageSchema(faqItemsToSchema(FAQS))} />

      <section className="surface-cream">
        <Container className="pb-4 pt-16 md:pt-24">
          <p className="label-mono text-[0.7rem] text-muted-foreground">
            Pricing
          </p>
          <h1 className="display-hero mt-5 max-w-2xl text-balance">
            Pay for the product you use.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Start where the pain is and switch on more when you&apos;re ready.
            Every engagement is scoped to your operation, and you get a clear
            number before you commit.
          </p>
        </Container>
      </section>

      <section id="plans" className="surface-cream">
        <Container className="py-16 md:py-20">
          <div className="grid gap-x-10 gap-y-14 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <article
                key={plan.name}
                className={cn(
                  "flex flex-col border-t pt-6",
                  plan.highlight
                    ? "border-t-2 border-foreground"
                    : "border-foreground/25",
                )}
              >
                {plan.highlight ? (
                  <p className="label-mono mb-3 text-[0.65rem] text-accent">
                    Most fabricators start here
                  </p>
                ) : null}
                <h2 className="font-display text-2xl text-foreground">
                  {plan.name}
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{plan.who}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-foreground/75">
                  {plan.blurb}
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-foreground/85">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-foreground/50"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center gap-5 pt-8">
                  <BookCta
                    label={plan.cta}
                    variant={plan.highlight ? "primary" : "secondary"}
                    size="default"
                  />
                  <Link
                    href={plan.href}
                    className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-14 max-w-xl text-sm text-muted-foreground">
            Every plan includes onboarding and support. Moving from the
            Customer Portal to the Fabrication Platform happens on the account
            you already have, with nothing to migrate.
          </p>
        </Container>
      </section>

      <Section surface="card">
        <Faq items={FAQS} sub="How Nyro engagements are scoped and priced." />
      </Section>

      <SlimCta
        title="Get a number scoped to your business."
        sub="Thirty minutes, your materials, your quoting volume. A clear price with nothing generic about it."
      />
    </>
  );
}
