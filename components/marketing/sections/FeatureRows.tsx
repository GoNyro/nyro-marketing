import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeatureRow = {
  icon?: LucideIcon;
  /** Short bold phrase, left column. Break with \n for a controlled wrap. */
  title: string;
  /** Bold one-line lead, right column. */
  lead: string;
  /** Supporting paragraphs. */
  body: string[];
};

/**
 * The workhorse editorial pattern: hairline-separated rows, term on the
 * left, argument on the right. Replaces icon-card grids everywhere.
 */
export function FeatureRows({
  rows,
  className,
}: {
  rows: FeatureRow[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      {rows.map((row) => (
        <div
          key={row.title}
          className="grid gap-5 border-t border-border py-10 md:grid-cols-12 md:gap-8 md:py-14"
        >
          <div className="flex items-start gap-4 md:col-span-5">
            {row.icon ? (
              <row.icon
                className="mt-0.5 size-5 shrink-0 text-foreground/70"
                strokeWidth={1.5}
              />
            ) : null}
            <h3 className="whitespace-pre-line text-xl font-medium leading-snug tracking-tight text-foreground md:text-2xl">
              {row.title}
            </h3>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-base font-semibold text-foreground">{row.lead}</p>
            {row.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
