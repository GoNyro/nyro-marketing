import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import {
  DIMENSION,
  GLYPH_PATH,
  WORDMARK,
  WORDMARK_PATH,
  WORDMARK_VIEWBOX,
} from "@/lib/brand";

/** The brand glyph: a benchtop island in section, two waterfall returns to
    the floor, reading as an "n". Used for the favicon and small marks. Fills
    with currentColor; defaults to olive, override via className. */
export function LogoGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("text-brand-strong", className)}
      role="img"
      aria-hidden="true"
    >
      <path d={GLYPH_PATH} fill="currentColor" />
    </svg>
  );
}

/** The logo: "nyro" outlined from Archivo SemiBold, measured like the object
    on a shop drawing. The letters scale with the SVG; the measurer keeps a
    one-pixel hairline at every size so it stays crisp in the nav and quiet
    in a hero. Size it with a height class (default h-6). */
export function Wordmark({
  className,
  tone = "ink",
  measured = true,
  ticks = true,
}: {
  className?: string;
  tone?: "ink" | "cream";
  /** Draw the dimension line at all. */
  measured?: boolean;
  /** Draw the 45° end ticks. Turn off below ~40px tall: at nav scale the
      tick is two pixels long and only smudges the corner where three
      strokes meet; the extension lines terminate the dimension on their own. */
  ticks?: boolean;
}) {
  const { width, xHeight } = WORDMARK;
  const { y, gap, overshoot, tick } = DIMENSION;
  const extTop = y - overshoot;
  const extBottom = -xHeight - gap;

  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      className={cn(
        "h-6 w-auto",
        tone === "cream" ? "text-surface-dark-foreground" : "text-foreground",
        className,
      )}
      role="img"
      aria-hidden="true"
    >
      <path d={WORDMARK_PATH} fill="currentColor" />
      {measured && (
        <g stroke="currentColor" opacity="0.55" fill="none">
          {/* extension lines and dimension line: snapped to the pixel grid so
              the one-pixel hairline stays crisp instead of smearing across
              two grey rows at nav size */}
          <path
            d={`M0 ${extBottom}V${extTop}M${width} ${extBottom}V${extTop}M0 ${y}H${width}`}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            shapeRendering="crispEdges"
          />
          {/* oblique ticks, drawn heavier than the line as on a drawing */}
          {ticks && (
            <path
              d={`M${-tick} ${y + tick}L${tick} ${y - tick}M${width - tick} ${y + tick}L${width + tick} ${y - tick}`}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </g>
      )}
    </svg>
  );
}

/** The measured wordmark at nav scale. On dark surfaces pass tone="cream". */
export function Lockup({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "cream";
}) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Wordmark tone={tone} ticks={false} />
    </span>
  );
}

/** The lockup, linked home. */
export function Logo({
  className,
  tone = "ink",
  href = "/",
}: {
  className?: string;
  tone?: "ink" | "cream";
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} home`}
      className={cn("inline-flex items-center", className)}
    >
      <Lockup tone={tone} />
    </Link>
  );
}
