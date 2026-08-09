import {
  BadgeDollarSign,
  BookOpen,
  FileCheck2,
  FileCode2,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/marketing/Container";
import { Section } from "@/components/marketing/primitives/Section";
import { BookCta } from "@/components/marketing/primitives/BookCta";
import { AppWindow } from "@/components/marketing/mockups/AppWindow";
import { CanvasScreen } from "@/components/marketing/mockups/CanvasScreen";
import { FeatureRows, type FeatureRow } from "@/components/marketing/sections/FeatureRows";
import { SlimCta } from "@/components/marketing/sections/SlimCta";
import {
  Faq,
  faqItemsToSchema,
  type FaqItem,
} from "@/components/marketing/sections/Faq";

export const metadata = buildMetadata({
  title: "Customer Portal - self-serve quoting for your trade customers",
  description:
    "Give kitchen companies, joiners and builders a portal where they draw benchtops against your catalog, see live prices at their tier, and place orders you export straight to CNC. Your catalog, your pricing, your margins.",
  path: "/customer",
});

const ROWS: FeatureRow[] = [
  {
    icon: BookOpen,
    title: "Your catalog,\nscoped per customer",
    lead: "Every account sees exactly what you choose - nothing more.",
    body: [
      "Share the full range or a hand-picked subset with each customer: materials, thicknesses, edge profiles, cutouts. Pricing tiers sit beside access, so the same slab can carry a different number for every account.",
    ],
  },
  {
    icon: BadgeDollarSign,
    title: "Live pricing\nfrom your rules",
    lead: "The price they see is the price you set, recalculated on every edit.",
    body: [
      "Materials, machining, edgework, cutouts, delivery zones - your pricing engine runs on each change to the drawing. Quoting stops being a queue behind one estimator; the weird 10% of jobs is all your team touches.",
    ],
  },
  {
    icon: FileCheck2,
    title: "Approvals that\nkeep you in charge",
    lead: "Quotes land with you for review before they become orders.",
    body: [
      "Homeowner approvals run over branded magic links - no login, no friction, a clear paper trail. Customers watch status change - quoted, approved, in production, ready - without ringing the front desk.",
    ],
  },
  {
    icon: FileCode2,
    title: "DXF & CNC-ready\nexport",
    lead: "Approved geometry lands in your production system untouched.",
    body: [
      "The shape the customer drew exports as DXF and CNC-ready files - no re-drawing, no transcription errors. Production, stock and financials stay wherever you run them today; the portal fixes the front of the funnel.",
    ],
  },
];

const FAQS: FaqItem[] = [
  {
    q: "Does the Customer Portal replace my production system?",
    a: "No - it runs in front of it. Quoting, approvals and order intake happen on Engage; approved jobs export as DXF and CNC-ready files into whatever you run today. When you're ready to run production on Engage too, the Fabrication Platform is a module switch away.",
  },
  {
    q: "Can my customers see my cost structure?",
    a: "Never. Each customer sees one thing: their price, at the tier you assigned them. Pricing rules, margins and other customers' tiers are invisible.",
  },
  {
    q: "What about homeowners who don't want a login?",
    a: "Retail customers can use a simpler configurator for a ballpark price and enquiry, and quote approvals run over branded magic links - no account required.",
  },
  {
    q: "How long does setup take?",
    a: "Setup is your catalog plus your pricing rules. We onboard your materials, edges and machining rates with you, then you invite customers account by account - starting with the two or three trade accounts that fill your quoting inbox.",
  },
];

export default function CustomerPortalPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Customer Portal", href: "/customer" },
        ])}
      />
      <JsonLd data={faqPageSchema(faqItemsToSchema(FAQS))} />

      {/* Dark hero with the canvas screen */}
      <section className="surface-dark ink-grid relative overflow-hidden">
        <Container className="relative pb-14 pt-16 md:pb-20 md:pt-20">
          <p className="label-mono text-[0.7rem] text-surface-dark-foreground/50">
            Customer Portal · for fabricators
          </p>
          <h1 className="display-hero mt-5 max-w-2xl text-balance text-surface-dark-foreground">
            Let your trade customers quote themselves
          </h1>
          <p
            data-speakable
            className="mt-5 max-w-xl text-base leading-relaxed text-surface-dark-foreground/65"
          >
            The kitchen companies, joiners and builders who buy from you
            already know the job. Give them a portal where they draw it against
            your catalog, see your price for their account, and send it in -
            while your team reviews instead of transcribes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCta variant="inverse" />
            <BookCta
              variant="ghost-dark"
              label="What's included"
              href="#included"
            />
          </div>

          <div className="mt-14">
            <AppWindow>
              <CanvasScreen />
            </AppWindow>
          </div>
        </Container>
      </section>

      {/* What's included - editorial rows */}
      <section id="included" className="surface-gray scroll-mt-16 border-t border-border">
        <Container className="py-20 md:py-28">
          <h2 className="display-md max-w-2xl text-balance">
            Everything between the enquiry and the saw.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            The portal covers quoting end to end - and hands production to the
            systems you already trust.
          </p>
          <FeatureRows rows={ROWS} className="mt-16" />
        </Container>
      </section>

      <SlimCta
        title="Start with two accounts."
        sub="Roll the portal out to the trade customers who fill your quoting inbox first."
      />

      {/* FAQ */}
      <Section surface="card">
        <Faq
          items={FAQS}
          sub="What fabricators ask before putting quoting in their customers' hands."
        />
      </Section>

      <SlimCta
        title="See it on your materials."
        sub="We'll load a sample catalog and walk the portal exactly as your biggest account would see it."
      />
    </>
  );
}
