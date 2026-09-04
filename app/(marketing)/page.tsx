import { ArrowLeftRight, PencilRuler, Store } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/marketing/Container";
import { HomeHero } from "@/components/marketing/sections/HomeHero";
import { FeatureRows, type FeatureRow } from "@/components/marketing/sections/FeatureRows";
import { ProductStack } from "@/components/marketing/sections/ProductStack";
import { SlimCta } from "@/components/marketing/sections/SlimCta";
import Image from "next/image";
import {
  Faq,
  faqItemsToSchema,
  type FaqItem,
} from "@/components/marketing/sections/Faq";
import { Section } from "@/components/marketing/primitives/Section";

export const metadata = buildMetadata({
  titleAbsolute: "Nyro - Quote, make and sell benchtops on one platform",
  title: "Quote, make and sell benchtops on one platform",
  description:
    "Nyro is the platform for benchtop fabricators and the retailers who sell their work. Customers quote themselves on your catalog and prices, the factory runs from quote to delivery, and retailers quote in store into any fabricator on Nyro.",
  path: "/",
});

const WHY_ROWS: FeatureRow[] = [
  {
    icon: PencilRuler,
    title: "The customer draws it.\nNyro prices it.",
    lead: "The people who know the job draw the job.",
    body: [
      "Kitchen companies, joiners and builders draw the benchtop themselves, against the catalog you share with them and at the prices you set for their account. Every change re-prices as they draw: material, edges, cutouts, joins, delivery.",
      "Your estimator stops re-typing sketches and starts reviewing finished quotes.",
    ],
  },
  {
    icon: ArrowLeftRight,
    title: "Entered once.\nNever re-typed.",
    lead: "The drawing on the quote is the drawing the factory cuts.",
    body: [
      "The shape a customer draws is the shape that gets approved, ordered and made. On the Customer Portal it hands over as machine-ready files to the system you already run. On the Fabrication Platform it goes straight to your machines.",
      "Nothing is re-drawn between systems, so revisions are one change to one job and remakes from transcription go away.",
    ],
  },
  {
    icon: Store,
    title: "Start small.\nGrow without moving.",
    lead: "Begin with the portal. Switch on the factory when you're ready.",
    body: [
      "Fabricators start with the Customer Portal and switch on the full Fabrication Platform when they want production on Nyro too. Your catalog, customers, quotes and orders stay exactly where they are.",
      "Retailers plug into the same fabricators, so every fabricator on Nyro is a fabricator retailers can quote into.",
    ],
  },
];

const FAQS: FaqItem[] = [
  {
    q: "What is Nyro?",
    a: "Nyro is a platform for quoting, making and selling benchtops. It has three products. The Customer Portal lets a fabricator's customers quote themselves. The Fabrication Platform runs a fabricator's whole operation, from quote to delivery. The Retailer Platform lets retail stores quote customers on the spot and send the job to any fabricator on Nyro.",
  },
  {
    q: "Which product should a fabricator start with?",
    a: "Most fabricators start with the Customer Portal. It puts quoting in your customers' hands and hands approved jobs to the production system you already use. When you want production, stock, delivery and invoicing on Nyro too, you switch on the Fabrication Platform and everything you've built carries over.",
  },
  {
    q: "Do I have to replace my existing production system to use Nyro?",
    a: "No. The Customer Portal sits in front of whatever you run today. Quotes come in, you approve them, and the approved drawing goes to your existing system as machine-ready files. The Fabrication Platform is there when you want to run the factory on Nyro as well.",
  },
  {
    q: "How does pricing work?",
    a: "You own the pricing. Materials, machining, edge profiles, cutouts and delivery are priced from rules you set, and every customer is assigned a price level. As a customer draws, the price updates in front of them, so the number they see is always the number you set.",
  },
  {
    q: "What does the Retailer Platform do?",
    a: "It lets a retailer's store staff quote a customer while they're still in the store, against the catalog and trade prices of any fabricator on Nyro. The retailer adds their own margin and branding. When the customer approves, the job goes to the fabricator to make and deliver, at the price both sides agreed.",
  },
  {
    q: "Can my customers see my costs, or each other's prices?",
    a: "No. Each customer sees only the catalog you share with them, at their own price level. A retailer never sees another retailer's margin, and a fabricator never sees what a retailer charges the homeowner. Every business on Nyro has its own private account.",
  },
  {
    q: "How do I get started?",
    a: "Book a demo. We load a sample catalog with your materials and prices and walk you through the portal the way your customers would use it.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }])} />
      <JsonLd data={faqPageSchema(faqItemsToSchema(FAQS))} />

      <HomeHero />

      {/* The argument */}
      <section className="surface-gray border-t border-border">
        <Container className="py-20 md:py-28">
          <h2 className="display-md max-w-2xl text-balance">
            Your factory can cut faster than your office can quote.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Every job starts as a phone call and a sketch, waits for the one
            person who can price it, and gets re-typed at every step after
            that. Nyro fixes the front of the business first, then runs the
            rest of it.
          </p>
          <FeatureRows rows={WHY_ROWS} className="mt-16" />
        </Container>
      </section>

      <SlimCta />

      {/* Proof - built by people who have run a factory. Editorial split:
          documentary photograph left, the claim right. The case-study film
          and testimonial get their own session later. */}
      <section className="surface-gray border-t border-border">
        <Container className="py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <figure className="lg:col-span-5">
              <div className="overflow-hidden rounded-xl ring-1 ring-black/5">
                <Image
                  src="/photos/slabs-hook.webp"
                  alt="Stone slabs standing in a rack beneath a lifting beam and hook in a fabrication workshop"
                  width={1200}
                  height={1500}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="block h-auto w-full object-cover"
                />
              </div>
              <figcaption className="label-mono mt-3 text-[0.65rem] text-muted-foreground">
                Slab rack, lifting beam
              </figcaption>
            </figure>
            <div className="lg:col-span-6 lg:col-start-7">
              <h2 className="display-md text-balance">
                Built by fabricators, for fabricators.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Nyro was built by people who have run a benchtop factory and
                quoted the jobs themselves. Every workflow exists because a
                real factory needed it: the quoting queue, the re-typed
                drawing, the price list three revisions stale.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                It was proven on a real factory floor before it was offered
                to anyone else.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The three products */}
      <div id="products" className="scroll-mt-16">
        <ProductStack />
      </div>

      {/* FAQ */}
      <Section surface="card">
        <Faq
          items={FAQS}
          sub="The three Nyro products, and how to pick where to start."
        />
      </Section>

      <SlimCta
        title="Watch a quote price itself."
        sub="Thirty minutes, your materials, your prices. No prep required."
      />
    </>
  );
}
