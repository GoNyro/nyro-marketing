import Link from "next/link";
import { Check } from "lucide-react";
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
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Engage pricing follows the product path: start with the Customer Portal, switch on the full Fabrication Platform when you're ready, partner with us on the Retailer Platform. Scoped to your operation - talk to us for a quote.",
  path: "/pricing",
});

type Plan = {
  name: string;
  href: string;
  ink: string;
  rule: string;
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
    ink: "text-ink-customer",
    rule: "bg-ink-customer",
    who: "Fabricators who want quoting off their desk first",
    blurb:
      "Self-serve quoting for your trade customers on your catalog and pricing, with orders and DXF/CNC export into your existing production setup.",
    includes: [
      "Catalog, scoped per customer account",
      "Quote canvas with live tier pricing",
      "Approvals, magic links & order tracking",
      "DXF / CNC-ready export",
      "Onboarding of your catalog & pricing rules",
    ],
    cta: "Book a demo",
    highlight: true,
  },
  {
    name: "Fabrication Platform",
    href: "/fabricator",
    ink: "text-ink-fabricator",
    rule: "bg-ink-fabricator",
    who: "Fabricators ready to run the lifecycle on one system",
    blurb:
      "Everything in the Customer Portal plus staff quoting, production scheduling, floor tablets, stock, dispatch, financials integration and analytics.",
    includes: [
      "Everything in Customer Portal",
      "Production queue & scheduling",
      "Floor tablets per workstation",
      "Stock, dispatch & financials sync",
      "Analytics on margin and lead time",
    ],
    cta: "Talk to us",
  },
  {
    name: "Retailer Platform",
    href: "/retailer",
    ink: "text-ink-retailer",
    rule: "bg-ink-retailer",
    who: "Retail chains selling benchtops in-store",
    blurb:
      "In-store quoting across your partner fabricators' live catalogs, your markup and branding on top, orders routed for fulfilment. Rolled out as a partnership.",
    includes: [
      "Quoting against live fabricator catalogs",
      "Wholesale tiers & your retail markup",
      "Branded homeowner approvals",
      "Order routing to fabricators",
      "Market analytics for category buyers",
    ],
    cta: "Register interest",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "Why isn't there a price on this page?",
    a: "Because the honest answer is \"it depends on your operation\": how many customer accounts you invite, which modules are on, and what onboarding your catalog needs. We scope it with you in the first call and give you a number before any commitment.",
  },
  {
    q: "What does onboarding involve?",
    a: "Your catalog and your pricing rules. We load materials, thicknesses, edge profiles and machining rates with you, set up customer tiers, and go live with a small set of trade accounts before widening access.",
  },
  {
    q: "What happens to our pricing when we upgrade tiers?",
    a: "Upgrading from Customer Portal to the full Fabrication Platform is a module switch on the same tenant - your data, catalog and customers stay put, and the subscription changes to match the modules you turn on.",
  },
  {
    q: "Is there a contract lock-in?",
    a: "We'd rather keep you with a product you use than a clause you signed. Terms are agreed per engagement - ask us in the demo.",
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

      <Section className="border-t-0">
        <SectionHeading
          as="h1"
          eyebrow="Pricing"
          title="Pay for the surface you use."
          titleClassName="display-hero"
          sub="Engage is priced to follow the product path: start where the pain is, switch on more when you're ready. Every engagement is scoped to your operation - no per-seat games."
        />
      </Section>

      <Section surface="card" id="plans">
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08} className="flex">
              <article
                className={cn(
                  "flex w-full flex-col rounded-xl border bg-card p-7",
                  plan.highlight
                    ? "border-brand-strong/40 shadow-lg"
                    : "border-border",
                )}
              >
                <div className={cn("h-1 w-10 rounded-full", plan.rule)} />
                {plan.highlight ? (
                  <p className="label-mono mt-5 text-[0.6rem] text-accent">
                    First to market · start here
                  </p>
                ) : null}
                <h2 className={cn("font-display text-2xl text-foreground", plan.highlight ? "mt-2" : "mt-5")}>
                  {plan.name}
                </h2>
                <p className={cn("label-mono mt-2 text-[0.6rem]", plan.ink)}>
                  {plan.who}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {plan.blurb}
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-foreground/85">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-3 pt-8">
                  <BookCta
                    label={plan.cta}
                    variant={plan.highlight ? "primary" : "secondary"}
                    size="default"
                  />
                  <Link
                    href={plan.href}
                    className="text-center text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    Product details →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Every plan includes onboarding, support and the shared platform
          underneath - one login, one database, no data migrations between
          tiers.
        </p>
      </Section>

      <Section>
        <Faq items={FAQS} sub="How Engage engagements are scoped and priced." />
      </Section>

      <CtaBand
        eyebrow="Next step"
        title={
          <>
            Get a number scoped
            <br className="hidden sm:block" /> to your factory.
          </>
        }
        sub="Thirty minutes, your materials, your quoting volume - and a clear price with nothing generic about it."
        secondary={{ label: "Compare the products", href: "/#platform" }}
      />
    </>
  );
}
