import {
  BookOpen,
  DraftingCompass,
  BadgeDollarSign,
  FileCheck2,
  Bell,
  FileCode2,
  type LucideIcon,
} from "lucide-react";
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
import { QuoteSheet } from "@/components/marketing/visuals/QuoteSheet";

export const metadata = buildMetadata({
  title: "Customer Portal - self-serve quoting for your trade customers",
  description:
    "Give kitchen companies, joiners and builders a portal where they draw benchtops against your catalog, see live prices at their tier, and place orders you export straight to CNC. Your catalog, your pricing, your margins.",
  path: "/customer",
});

const FEATURES: { icon: LucideIcon; title: string; blurb: string }[] = [
  {
    icon: BookOpen,
    title: "Your catalog, scoped per customer",
    blurb:
      "Share the full range or a hand-picked subset with each account. Materials, thicknesses, edge profiles, cutouts - customers only ever see what you've chosen to show them.",
  },
  {
    icon: DraftingCompass,
    title: "The quote canvas",
    blurb:
      "A drawing surface built for benchtops: L-shapes and U-shapes, mitres, waterfalls, splashbacks, sink and hob cutouts. The geometry is captured once, correctly, by the person who knows the job.",
  },
  {
    icon: BadgeDollarSign,
    title: "Live pricing at their tier",
    blurb:
      "Every account has a pricing tier you control. As the customer draws, the price updates against your rules - materials, machining, edgework, delivery - so quoting stops being a queue.",
  },
  {
    icon: FileCheck2,
    title: "Approvals that keep you in charge",
    blurb:
      "Quotes land with you for review before they become orders. Homeowner approvals run through branded magic links - no login, no friction, a clear paper trail.",
  },
  {
    icon: FileCode2,
    title: "DXF and CNC-ready export",
    blurb:
      "Approved jobs export as DXF and CNC-ready files with the geometry attached, straight into the production system you already run. No re-drawing, no transcription errors.",
  },
  {
    icon: Bell,
    title: "Notifications that close the loop",
    blurb:
      "Customers see where their job is - quoted, approved, in production, ready - without ringing your front desk. Your team sees what needs action today.",
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

      {/* Hero */}
      <Section className="border-t-0">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <div className="flex max-w-xl flex-col items-start gap-6">
            <SectionHeading
              as="h1"
              eyebrow="Customer Portal · For fabricators"
              title="Let your trade customers quote themselves."
              titleClassName="display-hero"
            />
            <p data-speakable className="text-lg leading-relaxed text-muted-foreground">
              The kitchen companies, joiners and builders who buy from you
              already know the job. Give them a portal where they draw it
              against your catalog, see your price for their account, and send
              it in - while your team reviews instead of transcribes.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <BookCta nudge withArrow />
              <BookCta
                variant="secondary"
                label="See how pricing works"
                href="#pricing-control"
              />
            </div>
          </div>
          <Reveal y={24}>
            <div className="blueprint-grid relative rounded-2xl border border-border bg-secondary/60 p-6 sm:p-10">
              <QuoteSheet />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Features */}
      <Section surface="card" id="pricing-control">
        <SectionHeading
          eyebrow="What's included"
          title="Everything between the enquiry and the saw."
          sub="The portal covers quoting end to end - and hands production to the systems you already trust."
        />
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 0.06}>
              <feature.icon className="size-6 text-accent" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {feature.blurb}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Honest scope: what stays yours */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow="Deliberately scoped"
            title="Production stays wherever you want it."
            sub="The Customer Portal doesn't ask you to change how you make things. It fixes the front of the funnel and exports clean geometry to the back."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal className="rounded-xl border border-border bg-card p-6">
              <p className="label-mono text-[0.65rem] text-ink-customer">
                On Engage
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/80">
                <li>Catalog & customer access</li>
                <li>Quote canvas & live pricing</li>
                <li>Approvals & magic links</li>
                <li>Order intake & tracking</li>
                <li>DXF / CNC file export</li>
                <li>Notifications</li>
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="rounded-xl border border-dashed border-border bg-transparent p-6">
              <p className="label-mono text-[0.65rem] text-muted-foreground">
                In your existing systems
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>Production & scheduling</li>
                <li>CAM & nesting</li>
                <li>Stock & materials</li>
                <li>Dispatch & delivery runs</li>
                <li>Financials</li>
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Want these on Engage too? That&apos;s the{" "}
                <a
                  href="/fabricator"
                  className="font-medium text-accent underline decoration-accent/40 underline-offset-4"
                >
                  Fabrication Platform
                </a>{" "}
                - and upgrading is a module switch, not a migration.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section surface="card">
        <Faq
          items={FAQS}
          sub="What fabricators ask before putting quoting in their customers' hands."
        />
      </Section>

      <CtaBand
        title={
          <>
            Your best customers already
            <br className="hidden sm:block" /> know what they need.
          </>
        }
        sub="Book a demo and we'll load a sample catalog with your materials, then walk through the portal exactly as your biggest trade account would see it."
        secondary={{ label: "Compare the three products", href: "/#platform" }}
      />
    </>
  );
}
