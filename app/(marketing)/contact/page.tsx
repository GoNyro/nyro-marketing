import { Check, Clock, Mail } from "lucide-react";
import { Container } from "@/components/marketing/Container";
import { Section } from "@/components/marketing/primitives/Section";
import { Eyebrow } from "@/components/marketing/primitives/Eyebrow";
import { BookCta } from "@/components/marketing/primitives/BookCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Book a demo",
  description:
    "Book a 30-minute Nyro walkthrough. We load a sample catalog with your materials and prices and show you the platform the way your customers, your staff or your stores would use it.",
  path: "/contact",
});

const EXPECT: string[] = [
  "We set up a sample catalog with a few of your real materials, edges and machining rates.",
  "You draw a benchtop and watch it price itself at a customer price level you set.",
  "We walk the job through approval, order and out to production, the full loop.",
  "Retailers: we quote a customer in store, add your margin and send the job to a fabricator.",
  "You leave knowing what rollout looks like for your first few accounts or stores.",
];

export default function ContactPage() {
  const emailHref = `mailto:${siteConfig.contactEmail}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ])}
      />

      {/* Hero */}
      <section className="surface-cream relative overflow-hidden">
        <Container className="relative pb-12 pt-16 md:pb-16 md:pt-24">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="display-hero mt-5 max-w-3xl text-balance">
            Book a demo, and draw a benchtop that prices itself.
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            data-speakable
          >
            Spend 30 minutes with us. We set up a sample catalog on your
            materials, quote a job the way your customers or your store staff
            would, and walk through what rollout looks like. No prep required.
          </p>
          <div className="mt-8">
            <BookCta label="Email us to book" href={emailHref} withArrow />
          </div>
        </Container>
      </section>

      {/* Two-column: what to expect + how to reach us */}
      <Section surface="card" id="book">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - supporting copy */}
          <div>
            <Eyebrow>What to expect</Eyebrow>
            <h2 className="display-sm mt-4 text-balance">
              A working session, not a sales pitch
            </h2>

            <ul className="mt-8 flex flex-col gap-5">
              {EXPECT.map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-accent">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className="text-base leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - contact card */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="label-mono text-[0.65rem] text-muted-foreground">
              Reach us
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground">
              Tell us whether you make benchtops or sell them, roughly how
              many quotes a week you handle, and the materials you work with.
              We&apos;ll come back with demo times.
            </p>
            <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6">
              <p className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Mail className="size-4 text-accent" aria-hidden />
                <span>
                  <a
                    href={emailHref}
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Clock className="size-4 text-accent" aria-hidden />
                We usually reply within one business day.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Slim reassurance close */}
      <Section surface="cream">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-balance text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
            No hard sell. Just your catalog, your prices, and a quote that
            prices itself in front of you.
          </p>
          <p className="label-mono text-[0.65rem] text-muted-foreground">
            Customer Portal · Fabrication Platform · Retailer Platform
          </p>
        </div>
      </Section>
    </>
  );
}
