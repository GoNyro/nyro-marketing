import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { cn } from "@/lib/utils";

/**
 * The dark product-story section: quiet menu on the left, one block per
 * product on the right, each with an isometric cube badge. The three
 * products presented as layers of one system.
 */

function IsoCube({ label, className }: { label: string; className?: string }) {
  return (
    <svg viewBox="0 0 160 150" className={cn("w-36", className)} aria-hidden>
      <path
        d="M80 15 L145 47 L80 79 L15 47 Z"
        fill="oklch(0.60 0.115 132)"
        stroke="oklch(0.85 0.06 130 / 0.4)"
        strokeWidth="1"
      />
      <path d="M15 47 L80 79 L80 135 L15 103 Z" fill="oklch(0.40 0.085 132)" />
      <path d="M145 47 L80 79 L80 135 L145 103 Z" fill="oklch(0.49 0.10 132)" />
      <text
        x={80}
        y={112}
        textAnchor="middle"
        style={{
          fontFamily: "var(--font-plex-mono)",
          fontSize: "9px",
          letterSpacing: "0.14em",
        }}
        fill="oklch(0.97 0.005 95 / 0.9)"
      >
        {label}
      </text>
    </svg>
  );
}

type Product = {
  id: string;
  menu: string;
  cube: string;
  title: string;
  body: string;
  points: string[];
  href: string;
  linkLabel: string;
};

const PRODUCTS: Product[] = [
  {
    id: "customer-portal",
    menu: "Customer Portal",
    cube: "QUOTE",
    title: "Give your customers the counter",
    body: "The self-serve quoting surface a fabricator hands to its trade accounts. Customers draw against the catalog you share, at the tier you set, and orders arrive with CNC-ready geometry attached.",
    points: [
      "Catalog scoped per account",
      "Live pricing from your rules",
      "Approvals, magic links, DXF / CNC export",
    ],
    href: "/customer",
    linkLabel: "Explore Customer Portal",
  },
  {
    id: "fabrication-platform",
    menu: "Fabrication Platform",
    cube: "FABRICATE",
    title: "Run the factory on the same record",
    body: "The full operating system: staff quoting, production queue, floor tablets, stock, dispatch, financials and analytics. The quote's geometry is the piece the floor cuts - nothing re-entered.",
    points: [
      "Everything in Customer Portal",
      "Scheduling, floor tablets, stock, dispatch",
      "Upgrade is a module switch, not a migration",
    ],
    href: "/fabricator",
    linkLabel: "Explore Fabrication Platform",
  },
  {
    id: "retailer-platform",
    menu: "Retailer Platform",
    cube: "RETAIL",
    title: "Open the retail channel",
    body: "Store staff quote homeowners against partner fabricators' live catalogs at agreed wholesale tiers, add the retailer's markup and branding, and route approved jobs out for fulfilment.",
    points: [
      "Live catalogs, never copies",
      "Your markup, your branding",
      "Approved quotes route as orders",
    ],
    href: "/retailer",
    linkLabel: "Explore Retailer Platform",
  },
];

export function ProductStack() {
  return (
    <section className="surface-dark ink-grid relative overflow-hidden">
      <Container className="py-20 md:py-28">
        <h2 className="display-md mx-auto max-w-xl text-center text-surface-dark-foreground">
          One platform, sold three ways.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-surface-dark-foreground/55">
          The canvas, the pricing engine and the catalog are shared
          infrastructure. Each product is a different surface on the same core,
          for a different side of the industry.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* menu */}
          <nav aria-label="Products" className="hidden lg:col-span-3 lg:block">
            <ul className="sticky top-24 flex flex-col border-l border-surface-dark-foreground/15">
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <a
                    href={`#${product.id}`}
                    className="block border-l-2 border-transparent py-2.5 pl-5 text-sm text-surface-dark-foreground/55 transition-colors hover:border-brand hover:text-surface-dark-foreground"
                  >
                    {product.menu}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* blocks */}
          <div className="flex flex-col gap-20 lg:col-span-9 md:gap-24">
            {PRODUCTS.map((product) => (
              <article
                key={product.id}
                id={product.id}
                className="grid scroll-mt-28 items-center gap-8 md:grid-cols-12"
              >
                <div className="flex justify-center md:col-span-4">
                  <IsoCube label={product.cube} />
                </div>
                <div className="md:col-span-8">
                  <p className="label-mono text-[0.65rem] text-surface-dark-foreground/45">
                    {product.menu}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-surface-dark-foreground">
                    {product.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-surface-dark-foreground/60">
                    {product.body}
                  </p>
                  <ul className="mt-4 flex flex-col gap-1.5">
                    {product.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2.5 text-sm text-surface-dark-foreground/80"
                      >
                        <span
                          aria-hidden
                          className="h-px w-3 bg-surface-dark-foreground/40"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={product.href}
                    className="mt-5 inline-block text-sm font-medium text-brand-bright underline-offset-4 hover:underline"
                  >
                    {product.linkLabel} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
