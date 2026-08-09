import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/marketing/primitives/Section";
import { SectionHeading } from "@/components/marketing/primitives/SectionHeading";
import { Reveal } from "@/components/marketing/primitives/Reveal";
import { cn } from "@/lib/utils";

type Product = {
  name: string;
  href: string;
  audience: string;
  ink: string;
  rule: string;
  tagline: string;
  points: string[];
  note?: string;
};

const PRODUCTS: Product[] = [
  {
    name: "Customer Portal",
    href: "/customer",
    audience: "For fabricators",
    ink: "text-ink-customer",
    rule: "bg-ink-customer",
    tagline:
      "Self-serve quoting for your trade customers, on your catalog at their prices.",
    points: [
      "Customers draw benchtops against the catalog you choose to show them",
      "Live pricing at the tier you set for each account",
      "Approvals, order tracking and DXF/CNC export into your production system",
    ],
    note: "First to market - start here",
  },
  {
    name: "Fabrication Platform",
    href: "/fabricator",
    audience: "For fabricators",
    ink: "text-ink-fabricator",
    rule: "bg-ink-fabricator",
    tagline:
      "The full operating system: quoting, production, stock, dispatch and analytics.",
    points: [
      "Everything in Customer Portal, plus staff quoting and customer management",
      "Production queue, scheduling and floor tablets at each workstation",
      "Stock, dispatch, financials integration and analytics",
    ],
    note: "Upgrading is a flag flip, not a migration",
  },
  {
    name: "Retailer Platform",
    href: "/retailer",
    audience: "For retailers",
    ink: "text-ink-retailer",
    rule: "bg-ink-retailer",
    tagline:
      "Quote homeowners in-store and route every job to the right fabricator.",
    points: [
      "Live catalogs and wholesale pricing from every partner fabricator",
      "Your markup and your branding on the quote the homeowner sees",
      "Approved quotes cross over as orders for the fabricator to fulfil",
    ],
  },
];

export function ProductTrio() {
  return (
    <Section id="platform">
      <SectionHeading
        eyebrow="The products"
        title="Three products. One quoting engine."
        sub="The canvas, the geometry, the pricing pipeline and the CNC export are shared infrastructure - each product is a different surface on the same platform, sold to a different side of the industry."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PRODUCTS.map((product, i) => (
          <Reveal key={product.href} delay={i * 0.08} className="flex">
            <article className="group relative flex flex-col rounded-xl border border-border bg-card p-7 transition-shadow hover:shadow-lg">
              <div className={cn("h-1 w-10 rounded-full", product.rule)} />
              <p className={cn("label-mono mt-5 text-[0.65rem]", product.ink)}>
                {product.audience}
              </p>
              <h3 className="mt-2 font-display text-2xl text-foreground">
                <Link href={product.href} className="focus-visible:outline-none">
                  {/* stretched link */}
                  <span className="absolute inset-0" aria-hidden />
                  {product.name}
                </Link>
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {product.tagline}
              </p>
              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-foreground/80">
                {product.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className={cn("mt-[0.55rem] h-px w-3 shrink-0", product.rule)}
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                {product.note ? (
                  <p className="text-xs text-muted-foreground">{product.note}</p>
                ) : null}
                <p
                  className={cn(
                    "mt-2 inline-flex items-center gap-1.5 text-sm font-medium",
                    product.ink,
                  )}
                >
                  Explore {product.name}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
