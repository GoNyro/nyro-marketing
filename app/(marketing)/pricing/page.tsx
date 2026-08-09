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
    "Nyro pricing follows the product path: start with the Customer Portal, switch on the full Fabrication Platform when you're ready, partner with us on the Retailer Platform. Scoped to your operation - talk to us for a quote.",
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

      <section className="surface-cream">
        <Container className="pb-4 pt-16 md:pt-24">
          <p className="label-mono text-[0.7rem] text-muted-foreground">
            Pricing
          </p>
          <h1 className="display-hero mt-5 max-w-2xl text-balance">
            Pay for the surface you use.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Nyro is priced to follow the product path: start where the pain
            is, switch on more when you&apos;re ready. Every engagement is
            scoped to your operation - no per-seat games.
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
                    First to market · start here
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
            Every plan includes onboarding, support and the shared platform
            underneath - one login, one database, no data migrations between
            tiers.
          </p>
        </Container>
      </section>

      <Section surface="card">
        <Faq items={FAQS} sub="How Nyro engagements are scoped and priced." />
      </Section>

      <SlimCta
        title="Get a number scoped to your factory."
        sub="Thirty minutes, your materials, your quoting volume - a clear price with nothing generic about it."
      />
    </>
  );
}
