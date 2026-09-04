import { Container } from "@/components/marketing/Container";
import { BookCta } from "@/components/marketing/primitives/BookCta";
import { cn } from "@/lib/utils";

/**
 * The recurring slim CTA strip: statement left, one dark pill right.
 * Quiet, repeated - the DOSS cadence, not a billboard.
 */
export function SlimCta({
  title = "See it on your own materials.",
  sub = "A thirty-minute walkthrough on your catalog and your prices. No prep needed.",
  label = "Book a demo",
  className,
}: {
  title?: string;
  sub?: string;
  label?: string;
  className?: string;
}) {
  return (
    <section className={cn("surface-cream border-t border-border", className)}>
      <Container className="flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between md:py-14">
        <div>
          <h2 className="font-display text-2xl text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
        </div>
        <BookCta label={label} className="shrink-0" />
      </Container>
    </section>
  );
}
