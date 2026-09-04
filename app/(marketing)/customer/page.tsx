import {
  BadgeDollarSign,
  BookOpen,
  FileCheck2,
  Plug,
  Scissors,
  SlidersHorizontal,
  Truck,
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
  title: "Customer Portal - let your customers quote themselves",
  description:
    "Give kitchen companies, joiners and builders a portal where they draw benchtops on your catalog, see your price for their account, and place orders. You control the catalog, the pricing, what each customer can draw and how delivery is charged. Approved jobs hand over to the production system you already run.",
  path: "/customer",
});

const ROWS: FeatureRow[] = [
  {
    icon: BookOpen,
    title: "Your catalog,\nshared your way",
    lead: "Every customer sees exactly the range you choose for them.",
    body: [
      "Load your materials, thicknesses, edge profiles, cutouts and joins once. Then share the full range with most customers and a hand-picked list with the accounts that need one. A contracted customer only ever sees what's in their contract.",
    ],
  },
  {
    icon: BadgeDollarSign,
    title: "Your prices,\nper customer",
    lead: "The price they see is the price you set, updated as they draw.",
    body: [
      "Set your pricing once: materials, machining, edge work, cutouts, delivery. Then give each customer a price level. As they draw, the price updates in front of them. Your costs, your margins and other customers' prices stay private.",
    ],
  },
  {
    icon: Scissors,
    title: "Priced on the sheet\nit actually uses",
    lead: "Every quote is nested the moment it's drawn, so a small job is never charged for a full sheet.",
    body: [
      "As your customer draws, Nyro lays their pieces out on your sheet sizes, with your blade width and your offcut rules, and prices the material on what the job really consumes: a quarter, a half or a full sheet. Nobody on your team runs an optimiser, and the customer never waits for a number.",
      "The nesting engine was built on more than 300,000 real quotes and checked against ten thousand factory cutting runs before it priced a single one of yours. It matches a commercial optimiser on nine jobs in ten and errs on the side of your margin on the rest.",
    ],
  },
  {
    icon: SlidersHorizontal,
    title: "You decide what\nthey can draw",
    lead: "A simple portal for some customers, the full toolkit for others.",
    body: [
      "Choose, per customer, what's on the table: straight runs only or full L-shapes and islands, which join types, whether waterfall ends and drop-fronts are allowed. Customers who need a simple experience get one. Your staff always have every tool.",
    ],
  },
  {
    icon: FileCheck2,
    title: "Approvals that\nkeep you in charge",
    lead: "Quotes land with you for review before they become orders.",
    body: [
      "Nothing goes to the factory without your say-so. Customers approve with a link, no login and no paperwork, and watch the job move from quoted to approved to in production to ready without ringing the front desk.",
    ],
  },
  {
    icon: Truck,
    title: "Delivery,\npriced in",
    lead: "Delivery zones and freight rates are part of the quote.",
    body: [
      "Set up your delivery areas and rates once. When a customer quotes, delivery to their address is priced alongside the top, so the number they approve is the whole number.",
    ],
  },
  {
    icon: Plug,
    title: "Works with the\nsystem you run today",
    lead: "Approved jobs hand over to your production software as machine-ready files.",
    body: [
      "The shape the customer drew goes to your existing production system exactly as drawn, as DXF and CNC-ready files. No re-drawing, no transcription errors. Production, stock and invoicing stay where they are today. The portal fixes the front of the business.",
    ],
  },
];

const FAQS: FaqItem[] = [
  {
    q: "Does the Customer Portal replace my production system?",
    a: "No. It sits in front of it. Quoting, approvals and order intake happen on Nyro, and approved jobs hand over to whatever you run today as machine-ready files. When you want to run production on Nyro too, you switch on the Fabrication Platform and everything carries across.",
  },
  {
    q: "Can my customers see my costs or other customers' prices?",
    a: "Never. Each customer sees one thing: their price, at the level you gave them. Your pricing rules, your margins and everyone else's prices are invisible to them.",
  },
  {
    q: "Do I have to nest each quote before it can be priced?",
    a: "No. Nesting runs inside the price. When a customer draws, their pieces are laid out on your sheet sizes with your blade and offcut rules, and the material line reflects the fraction of a sheet the job uses. Batching jobs across customers and reusing remnants stay yours as margin. The customer is only ever priced on their own job.",
  },
  {
    q: "Can I limit what a customer is able to draw?",
    a: "Yes, per customer. Some accounts get straight runs and standard joins. Others get the full toolkit: islands, waterfall ends, drop-fronts, every join type. You choose, and you can change it any time.",
  },
  {
    q: "What about homeowners who don't want a login?",
    a: "Homeowners never need an account. They review, approve, track and message about their job through a link you send them, branded as your business.",
  },
  {
    q: "How long does setup take?",
    a: "Setup is your catalog plus your pricing. We load your materials, edges and machining rates with you, set up your customer price levels, and you invite customers account by account, starting with the two or three that fill your quoting inbox.",
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
      <section className="surface-dark ink-dots relative overflow-hidden">
        <Container className="relative pb-14 pt-16 md:pb-20 md:pt-20">
          <p className="label-mono text-[0.7rem] text-surface-dark-foreground/50">
            Customer Portal · for fabricators
          </p>
          <h1 className="display-hero mt-5 max-w-2xl text-balance text-surface-dark-foreground">
            Let your customers quote themselves
          </h1>
          <p
            data-speakable
            className="mt-5 max-w-xl text-base leading-relaxed text-surface-dark-foreground/65"
          >
            The kitchen companies, joiners and builders who buy from you
            already know the job. Give them a portal where they draw it on your
            catalog, see your price for their account, and send it in. You set
            what they can see, what they pay and what they can draw. Your team
            reviews instead of re-typing.
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
            <AppWindow chrome="none">
              <CanvasScreen state="cutout" />
            </AppWindow>
          </div>
        </Container>
      </section>

      {/* What's included - editorial rows */}
      <section id="included" className="surface-gray scroll-mt-16 border-t border-border">
        <Container className="py-20 md:py-28">
          <h2 className="display-md max-w-2xl text-balance">
            Everything between the enquiry and the factory.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            The portal covers the whole front of the business, from catalog to
            approved order, and hands production to the system you already
            trust.
          </p>
          <FeatureRows rows={ROWS} className="mt-16" />
        </Container>
      </section>

      <SlimCta
        title="Start with two accounts."
        sub="Roll the portal out to the customers who fill your quoting inbox first."
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
        sub="We load a sample catalog and walk the portal exactly as your biggest account would see it."
      />
    </>
  );
}
