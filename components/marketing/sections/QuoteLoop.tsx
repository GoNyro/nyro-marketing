import { Section } from "@/components/marketing/primitives/Section";
import { SectionHeading } from "@/components/marketing/primitives/SectionHeading";
import { Reveal } from "@/components/marketing/primitives/Reveal";

/* A real sequence, so the numbering carries information: this is the order
   a job moves through the portal. */
const STEPS = [
  {
    step: "01",
    title: "They draw it",
    body: "Your customer opens the portal, picks a material from the catalog you've shared with them, and draws the top - shape, cutouts, edge profiles, splashbacks. The canvas handles the geometry.",
    label: "SHAPE · CUTOUTS · EDGES",
  },
  {
    step: "02",
    title: "It prices itself",
    body: "Every change re-prices against your pricing engine at that customer's tier. The price they see is the price you set - no ring-backs, no \"I'll get back to you Friday\".",
    label: "YOUR RULES · THEIR TIER",
  },
  {
    step: "03",
    title: "The job flows through",
    body: "Approved quotes become orders with the geometry attached. Export DXF and CNC-ready files straight into your production system, or run the whole lifecycle on Engage.",
    label: "ORDER · DXF · CNC",
  },
] as const;

export function QuoteLoop() {
  return (
    <Section surface="card">
      <SectionHeading
        eyebrow="How it works"
        title="From sketch to order without a phone call."
        sub="The portal does the work your quoting inbox does today - except your customer does the drawing and your pricing rules do the math."
      />
      <ol className="mt-14 grid gap-10 md:grid-cols-3">
        {STEPS.map((item, i) => (
          <Reveal key={item.step} as="li" delay={i * 0.08}>
            <div className="flex items-baseline justify-between border-t border-foreground/20 pt-5">
              <span className="label-mono text-muted-foreground">{item.step}</span>
              <span className="label-mono text-[0.6rem] text-muted-foreground/60">
                {item.label}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl text-foreground">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
