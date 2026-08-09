import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/marketing/sections/HomeHero";
import { ProductTrio } from "@/components/marketing/sections/ProductTrio";
import { QuoteLoop } from "@/components/marketing/sections/QuoteLoop";
import { PlatformBand } from "@/components/marketing/sections/PlatformBand";
import { CtaBand } from "@/components/marketing/sections/CtaBand";
import {
  Faq,
  faqItemsToSchema,
  type FaqItem,
} from "@/components/marketing/sections/Faq";
import { Section } from "@/components/marketing/primitives/Section";
import { SectionHeading } from "@/components/marketing/primitives/SectionHeading";

export const metadata = buildMetadata({
  // Brand-first <title> for the homepage (the one page where that's standard).
  titleAbsolute: "Engage - Benchtop quoting and order platform",
  // Kept as the punchy, benefit-led title on shared social/OG cards.
  title: "Your customers draw the top. Engage prices it live.",
  description:
    "Engage is the quoting and order platform for benchtop fabricators. Trade customers quote themselves against your catalog at their prices, orders flow through with CNC-ready geometry, and the full fabrication lifecycle is there when you want it.",
  path: "/",
});

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

      {/* The stakes */}
      <Section surface="card">
        <SectionHeading
          align="center"
          eyebrow="The problem"
          title="Quoting is your bottleneck, not your saw."
          sub="Every benchtop starts as a phone call, a sketch and a spreadsheet - then waits in a queue for the one person who can price it. The factory can cut faster than the office can quote."
          className="mx-auto max-w-2xl"
        />
      </Section>

      <ProductTrio />

      <QuoteLoop />

      <PlatformBand />

      {/* FAQ */}
      <Section surface="card">
        <Faq
          items={FAQS}
          sub="Everything about the three Engage products and how they fit together."
        />
      </Section>

      <CtaBand />
    </>
  );
}
