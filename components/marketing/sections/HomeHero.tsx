import { BookCta } from "@/components/marketing/primitives/BookCta";
import { Container } from "@/components/marketing/Container";
import { Eyebrow } from "@/components/marketing/primitives/Eyebrow";
import { Reveal } from "@/components/marketing/primitives/Reveal";
import { QuoteSheet } from "@/components/marketing/visuals/QuoteSheet";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-2 lg:gap-10">
        <div className="flex max-w-xl flex-col items-start gap-6">
          <Reveal>
            <Eyebrow>The platform for benchtop fabricators</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-hero text-balance">
              Your customers draw the top. Engage prices it live.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p data-speakable className="text-lg leading-relaxed text-muted-foreground">
              Engage gives your trade customers a quoting portal built on your
              catalog and your prices. They draw the benchtop, watch it price
              itself, and place the order - no phone tag, no re-keying, no
              spreadsheet round trips.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCta nudge withArrow />
            <BookCta
              variant="secondary"
              label="See the three products"
              href="#platform"
            />
          </Reveal>
          <Reveal delay={0.24}>
            <p className="text-sm text-muted-foreground">
              Developed with BeautyCraft, the platform&apos;s founding
              fabricator - quoting real kitchens every day.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={24}>
          <div className="blueprint-grid relative rounded-2xl border border-border bg-secondary/60 p-6 sm:p-10">
            <QuoteSheet />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
