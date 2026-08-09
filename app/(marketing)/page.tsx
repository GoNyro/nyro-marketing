import { GitBranch, PencilRuler, ToggleRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/marketing/Container";
import { HomeHero } from "@/components/marketing/sections/HomeHero";
import { FeatureRows, type FeatureRow } from "@/components/marketing/sections/FeatureRows";
import { ProductStack } from "@/components/marketing/sections/ProductStack";
import { SlimCta } from "@/components/marketing/sections/SlimCta";
import { PlaceholderSlab } from "@/components/marketing/sections/PlaceholderSlab";
import {
  Faq,
  faqItemsToSchema,
  type FaqItem,
} from "@/components/marketing/sections/Faq";
import { Section } from "@/components/marketing/primitives/Section";

export const metadata = buildMetadata({
  titleAbsolute: "Engage - The operating system for benchtop fabrication",
  title: "Your customers draw the top. Engage prices it live.",
  description:
    "Engage is the quoting and order platform for benchtop fabricators. Trade customers quote themselves against your catalog at their prices, orders flow through with CNC-ready geometry, and the full fabrication lifecycle is there when you want it.",
  path: "/",
});

const WHY_ROWS: FeatureRow[] = [
  {
    icon: PencilRuler,
    title: "Self-serve quoting,\non your terms",
    lead: "The people who know the job draw the job.",
    body: [
      "Kitchen companies, joiners and builders quote against the catalog you share with them, at the pricing tier you set for their account. Every change re-prices live against your rules - materials, machining, edgework, delivery.",
      "Your estimator stops transcribing sketches and starts reviewing finished quotes.",
    ],
  },
  {
    icon: GitBranch,
    title: "One geometry record,\nquote to CNC",
    lead: "Drawn once, priced once, cut from the same data.",
    body: [
      "The shape a customer draws is the shape that's approved, ordered and exported - as DXF and CNC-ready files, straight into the production system you already run.",
      "No re-drawing between systems means no transcription errors, and revisions become one edit to one record.",
    ],
  },
  {
    icon: ToggleRight,
    title: "Upgrades without\nmigrations",
    lead: "Start with the portal. Switch on the factory when ready.",
    body: [
      "A fabricator on the Customer Portal is the same tenant as one on the full Fabrication Platform - fewer modules turned on. Moving up is a module switch: no data migration, no re-onboarding, no second system.",
      "Retail is the same story - the network's already under it.",
    ],
  },
];

const FAQS: FaqItem[] = [
  {
    q: "What is Engage?",
    a: "Engage is a quoting and order platform for the benchtop industry, built by Nyro. Fabricators use it to give their trade customers self-serve quoting with live pricing, to run their own quoting and production, and - through the Retailer Platform - to receive orders quoted in retail stores.",
  },
  {
    q: "Who is the Customer Portal for?",
    a: "Fabricators who want to stop being the bottleneck on quotes. Your trade customers - kitchen companies, joiners, builders - draw benchtops against your catalog and see live prices at the tier you set for their account. You review what comes in and export DXF/CNC files into your existing production system.",
  },
  {
    q: "Do I have to replace my existing production system to use Engage?",
    a: "No. The Customer Portal runs in front of whatever you use today: quotes come in, you approve them, and you export DXF and CNC-ready files into your current workflow. The full Fabrication Platform is there when you want to run production, stock and dispatch on Engage too - and upgrading is a module switch, not a migration.",
  },
  {
    q: "How does pricing work?",
    a: "You own your pricing engine: materials, machining, edge profiles, cutouts, delivery - and a pricing tier per customer. Every change a customer makes on the canvas re-prices live against your rules, so the price they see is always the price you set.",
  },
  {
    q: "What does the Retailer Platform do?",
    a: "It lets a retailer's store staff quote a homeowner on the spot, against a partner fabricator's live catalog and wholesale pricing, with the retailer's own markup and branding on top. When the homeowner approves, the quote crosses over to the fabricator as an incoming order at the agreed price.",
  },
  {
    q: "Can a fabricator's customers see wholesale or other customers' pricing?",
    a: "No. Every customer sees only the catalog you share with them, priced at their tier. Retailers never see another retailer's markup, and fabricators never see what a retailer charges the homeowner. Each tenant's data is isolated.",
  },
  {
    q: "How do I get started?",
    a: "Book a demo. We'll set up a sample catalog with your materials and pricing and walk you through the portal the way your customers would use it.",
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
            Quoting is the bottleneck. So we rebuilt the whole counter.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Most factories can cut faster than the office can quote. Every job
            starts as a phone call and a sketch, waits for the one person who
            can price it, and gets re-typed at every step after that.
          </p>
          <FeatureRows rows={WHY_ROWS} className="mt-16" />
        </Container>
      </section>

      <SlimCta />

      {/* Proof - built with a working fabricator. The film/testimonial gets
          its own design session; the slab holds the space deliberately. */}
      <section className="surface-gray border-t border-border">
        <Container className="py-20 md:py-24">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="display-md text-balance">
              Built inside a working fabrication business.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Engage was developed with BeautyCraft, the platform&apos;s
              founding fabricator. The workflows exist because a real factory
              needed them.
            </p>
          </div>
          <PlaceholderSlab
            note="BeautyCraft story · photography & testimonial — dedicated session"
            className="mt-12"
          />
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
          sub="Everything about the three Engage products and how they fit together."
        />
      </Section>

      <SlimCta
        title="See a quote price itself."
        sub="Thirty minutes, your materials, your pricing rules - no prep required."
      />
    </>
  );
}
