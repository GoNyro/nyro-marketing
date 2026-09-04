import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { cn } from "@/lib/utils";

/**
 * The dark product-story section: quiet menu on the left, one block per
 * product on the right, each with an isometric slab mark. The three products
 * are layers of one system, and the marks say so: the Customer Portal is one
 * slab, the Fabrication Platform is that slab with the factory stacked on top,
 * and the Retailer Platform is a slab hovering over a fabricator's stack that
 * it routes jobs into.
 */

type Mark = "single" | "stacked" | "routed";

/** Isometric footprint shared by every slab: a 2:1 rhombus, 128 wide. */
const HALF_W = 64;
const HALF_H = 32;
/** Slab thickness and the dark seam left between stacked slabs. */
const SLAB_H = 16;
const SEAM = 3;
/** Air between a hovering slab and the stack beneath it. */
const HOVER = 22;
const CX = 88;
/** Front vertex of the bottom slab; the ground shadow sits just under it. */
const GROUND_Y = 170;

type Tone = "hero" | "base";

function slabTop(ty: number) {
  return `M${CX} ${ty} L${CX + HALF_W} ${ty + HALF_H} L${CX} ${ty + 2 * HALF_H} L${CX - HALF_W} ${ty + HALF_H} Z`;
}

function Slab({ ty, tone, uid }: { ty: number; tone: Tone; uid: string }) {
  const front = ty + 2 * HALF_H;
  const side = ty + HALF_H;
  return (
    <g>
      <path
        d={`M${CX - HALF_W} ${side} L${CX} ${front} L${CX} ${front + SLAB_H} L${CX - HALF_W} ${side + SLAB_H} Z`}
        fill={`url(#${uid}-${tone}-left)`}
      />
      <path
        d={`M${CX + HALF_W} ${side} L${CX} ${front} L${CX} ${front + SLAB_H} L${CX + HALF_W} ${side + SLAB_H} Z`}
        fill={`url(#${uid}-${tone}-right)`}
      />
      <path d={slabTop(ty)} fill={`url(#${uid}-${tone}-top)`} />
      {/* front vertical seam, darkest line on the object */}
      <path
        d={`M${CX} ${front} L${CX} ${front + SLAB_H}`}
        stroke="oklch(0.16 0.015 140 / 0.7)"
        strokeWidth="0.75"
      />
      {/* lit rim along the two edges facing the light */}
      <path
        d={`M${CX - HALF_W} ${side} L${CX} ${ty} L${CX + HALF_W} ${side}`}
        fill="none"
        stroke={
          tone === "hero"
            ? "oklch(0.9 0.06 130 / 0.6)"
            : "oklch(0.8 0.05 130 / 0.28)"
        }
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </g>
  );
}

/**
 * One SVG per mark. Every variant shares the same ground line so the three
 * marks sit at the same height on the page; the viewBox is trimmed to the
 * mark's own extent so a single slab doesn't carry empty air above it.
 */
function IsoMark({ mark, className }: { mark: Mark; className?: string }) {
  const uid = `mark-${mark}`;
  const bottomTy = GROUND_Y - 2 * HALF_H - SLAB_H;
  const step = SLAB_H + SEAM;

  // Slabs from the ground up. `hero` is the product itself; `base` is the
  // layer it inherits or routes into, pushed back in tone.
  const slabs: { ty: number; tone: Tone }[] =
    mark === "single"
      ? [{ ty: bottomTy, tone: "hero" }]
      : mark === "stacked"
        ? [
            { ty: bottomTy, tone: "base" },
            { ty: bottomTy - step, tone: "hero" },
          ]
        : [
            { ty: bottomTy, tone: "base" },
            { ty: bottomTy - step, tone: "base" },
            { ty: bottomTy - 2 * step - HOVER, tone: "hero" },
          ];

  const topTy = slabs[slabs.length - 1].ty;
  const minY = topTy - 8;
  const maxY = GROUND_Y + 20;
  const hoverBase = mark === "routed" ? slabs[1].ty : null;

  return (
    <svg
      viewBox={`0 ${minY} 176 ${maxY - minY}`}
      className={cn("w-44", className)}
      aria-hidden
    >
      <defs>
        {/* light from upper-left: top face brightest, left mid, right dark */}
        <linearGradient id={`${uid}-hero-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.74 0.12 130)" />
          <stop offset="1" stopColor="oklch(0.58 0.11 132)" />
        </linearGradient>
        <linearGradient id={`${uid}-hero-left`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.48 0.095 132)" />
          <stop offset="1" stopColor="oklch(0.41 0.085 132)" />
        </linearGradient>
        <linearGradient id={`${uid}-hero-right`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.39 0.08 132)" />
          <stop offset="1" stopColor="oklch(0.32 0.065 132)" />
        </linearGradient>
        <linearGradient id={`${uid}-base-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.5 0.07 132)" />
          <stop offset="1" stopColor="oklch(0.41 0.06 132)" />
        </linearGradient>
        <linearGradient id={`${uid}-base-left`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.35 0.055 132)" />
          <stop offset="1" stopColor="oklch(0.3 0.045 132)" />
        </linearGradient>
        <linearGradient id={`${uid}-base-right`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.29 0.045 132)" />
          <stop offset="1" stopColor="oklch(0.24 0.035 132)" />
        </linearGradient>
        <filter id={`${uid}-blur`} x="-30%" y="-80%" width="160%" height="260%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        {hoverBase !== null && (
          <clipPath id={`${uid}-hover-clip`}>
            <path d={slabTop(hoverBase)} />
          </clipPath>
        )}
      </defs>

      {/* contact shadow: tight, blurred, sits under the front edge */}
      <ellipse
        cx={CX}
        cy={GROUND_Y + 6}
        rx={60}
        ry={9}
        fill="black"
        fillOpacity="0.45"
        filter={`url(#${uid}-blur)`}
      />

      {slabs.slice(0, hoverBase !== null ? 2 : slabs.length).map((slab) => (
        <Slab key={slab.ty} ty={slab.ty} tone={slab.tone} uid={uid} />
      ))}

      {/* the hovering slab casts onto the stack's top face beneath it */}
      {hoverBase !== null && (
        <>
          <g clipPath={`url(#${uid}-hover-clip)`}>
            <ellipse
              cx={CX}
              cy={hoverBase + HALF_H + 4}
              rx={52}
              ry={22}
              fill="black"
              fillOpacity="0.4"
              filter={`url(#${uid}-blur)`}
            />
          </g>
          <Slab ty={slabs[2].ty} tone="hero" uid={uid} />
        </>
      )}
    </svg>
  );
}

type Product = {
  id: string;
  menu: string;
  mark: Mark;
  cube: string;
  who: string;
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
    mark: "single",
    cube: "QUOTE",
    who: "For fabricators who want quoting off their desk",
    title: "Your customers quote themselves",
    body: "Give the kitchen companies, joiners and builders who buy from you a portal of their own. They draw the benchtop, see your price for their account, and send it in. You set the catalog, the pricing, what each customer is allowed to draw, and how delivery is charged. Approved jobs hand over to whatever you use to run production.",
    points: [
      "Your catalog and your prices, set per customer",
      "You decide what each customer can draw",
      "Approvals, order tracking and delivery built in",
      "Connects to the production system you already run",
    ],
    href: "/customer",
    linkLabel: "Explore Customer Portal",
  },
  {
    id: "fabrication-platform",
    menu: "Fabrication Platform",
    mark: "stacked",
    cube: "FABRICATE",
    who: "For fabricators who want the whole job in one place",
    title: "Run the factory on Nyro",
    body: "Everything in the Customer Portal, plus the factory itself. Staff quote on the same drawing tools, orders go straight into the production queue, your CNC machines cut from the approved drawing, floor staff work from tablets, and stock, delivery and invoicing all live on the same job.",
    points: [
      "Everything in the Customer Portal",
      "Production queue, machine programs, floor tablets",
      "Stock, delivery runs and invoicing on the same job",
      "Switch on from the Customer Portal with nothing to move",
    ],
    href: "/fabricator",
    linkLabel: "Explore Fabrication Platform",
  },
  {
    id: "retailer-platform",
    menu: "Retailer Platform",
    mark: "routed",
    cube: "RETAIL",
    who: "For retailers who sell benchtops in store",
    title: "Quote in store, into any fabricator",
    body: "Your store staff quote a customer on the spot, against the catalog and trade prices of any fabricator on Nyro. Your margin goes on top, your logo and colours go on everything the customer sees, and the approved job routes to the fabricator to make and deliver.",
    points: [
      "Any fabricator on Nyro, at your agreed trade price",
      "Your margin, your logo, your colours",
      "Your customers approve and track with a link, no login",
      "Deliveries and order status in one view",
    ],
    href: "/retailer",
    linkLabel: "Explore Retailer Platform",
  },
];

export function ProductStack() {
  return (
    <section className="surface-dark ink-dots relative overflow-hidden">
      <Container className="py-20 md:py-28">
        <h2 className="display-md mx-auto max-w-xl text-center text-surface-dark-foreground">
          Three products. Pick where you start.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-surface-dark-foreground/55">
          Two for fabricators, one for retailers. They share the same drawing
          tools, the same pricing and the same job record, so a quote drawn in
          a store can be cut in a factory without anyone typing it in again.
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
                <div className="flex flex-col items-center gap-4 md:col-span-4">
                  <IsoMark mark={product.mark} />
                  <p className="label-mono text-[0.65rem] text-surface-dark-foreground/40">
                    {product.cube}
                  </p>
                </div>
                <div className="md:col-span-8">
                  <p className="label-mono text-[0.65rem] text-surface-dark-foreground/45">
                    {product.menu}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-surface-dark-foreground">
                    {product.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-brand-bright/90">
                    {product.who}
                  </p>
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
