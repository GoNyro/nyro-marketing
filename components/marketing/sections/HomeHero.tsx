import { BookCta } from "@/components/marketing/primitives/BookCta";
import { Container } from "@/components/marketing/Container";
import { IsoStack } from "@/components/marketing/visuals/IsoStack";
import { AppWindow } from "@/components/marketing/mockups/AppWindow";
import { QuotesTable } from "@/components/marketing/mockups/QuotesTable";
import { TabStrip } from "@/components/marketing/sections/TabStrip";

/* Everything here is above (or near) the fold, so it renders statically -
   no scroll-triggered entrances. The page must be complete before hydration. */
export function HomeHero() {
  return (
    <section className="surface-dark ink-grid relative overflow-hidden">
      {/* soft vignette so the grid fades toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90rem 40rem at 50% 0%, transparent 55%, oklch(0.185 0.008 145 / 0.9) 100%)",
        }}
      />

      <Container className="relative grid items-center gap-10 pb-4 pt-16 md:pt-20 lg:grid-cols-2">
        <div className="flex max-w-xl flex-col items-start gap-6">
          <h1 className="display-hero text-balance text-surface-dark-foreground">
            Nyro is the operating system for benchtop fabrication
          </h1>
          <p
            data-speakable
            className="max-w-md text-base leading-relaxed text-surface-dark-foreground/65"
          >
            Your trade customers quote themselves against your catalog and
            your prices. Orders arrive with CNC-ready geometry. The whole
            lifecycle - quoting to dispatch - runs on one record.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCta variant="inverse" />
            <BookCta
              variant="ghost-dark"
              label="See the three products"
              href="#products"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <IsoStack className="mx-auto max-h-[30rem]" />
        </div>
      </Container>

      {/* the six stations */}
      <div className="relative pb-6 pt-10">
        <TabStrip />
      </div>

      {/* the credibility shot: the quotes screen */}
      <Container className="relative pb-20 md:pb-24">
        <AppWindow>
          <QuotesTable />
        </AppWindow>
      </Container>
    </section>
  );
}
