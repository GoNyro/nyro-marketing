import { cn } from "@/lib/utils";

/**
 * A deliberate, structured gap: marks a section whose real design (photo,
 * testimonial, film, bespoke visual) gets built in its own focused session.
 * Reads as intentional negative space, with a small note only a maintainer
 * would parse.
 */
export function PlaceholderSlab({
  note,
  ratio = "aspect-[21/9]",
  className,
}: {
  /** What belongs here, e.g. "Customer film · BeautyCraft factory floor". */
  note: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl border border-dashed border-foreground/15",
        ratio,
        className,
      )}
    >
      <p className="label-mono text-[0.65rem] text-foreground/30">{note}</p>
    </div>
  );
}
