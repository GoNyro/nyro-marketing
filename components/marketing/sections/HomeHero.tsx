import { BookCta } from "@/components/marketing/primitives/BookCta";
import { Container } from "@/components/marketing/Container";
import { AppWindow } from "@/components/marketing/mockups/AppWindow";
import { CanvasScreen } from "@/components/marketing/mockups/CanvasScreen";
import { TabStrip } from "@/components/marketing/sections/TabStrip";

/* Attio/DOSS pattern: no illustration - the product screen IS the hero
   graphic. Everything renders statically; the page must be complete before
   hydration. */
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

      <Container className="relative pt-16 md:pt-24">
        <div className="max-w-3xl">
          <h1 className="display-hero text-balance text-surface-dark-foreground">
            Nyro is the operating system for benchtop fabrication
          </h1>
          <p
            data-speakable
            className="mt-6 max-w-xl text-base leading-relaxed text-surface-dark-foreground/65"
          >
            Your trade customers quote themselves against your catalog and your
            prices. Orders arrive with CNC-ready geometry. The whole lifecycle
            - quoting to dispatch - runs on one record.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookCta variant="inverse" />
            <BookCta
              variant="ghost-dark"
              label="See the three products"
              href="#products"
            />
          </div>
        </div>
      </Container>

      {/* the six stations */}
      <div className="relative pb-2 pt-14 md:pt-16">
        <TabStrip />
      </div>

      {/* the hero shot: the quote canvas */}
      <Container className="relative pb-20 pt-8 md:pb-24">
        <div className="relative">
          {/* grounding glow beneath the window */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-16 -bottom-24 top-1/3"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 100%, oklch(0.58 0.11 132 / 0.16), transparent 70%)",
            }}
          />
          <AppWindow className="relative">
            <CanvasScreen />
          </AppWindow>
        </div>
      </Container>
    </section>
  );
}
