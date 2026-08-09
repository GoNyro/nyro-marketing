import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/** The brand glyph: an L-shaped benchtop in plan view, drawn like a shop
    drawing - solid olive slab with a hairline dimension tick. Shared visual
    language with the quote canvas. */
export function LogoGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-hidden="true"
      fill="none"
    >
      {/* L-shaped slab */}
      <path
        d="M4 5.5 a1.5 1.5 0 0 1 1.5 -1.5 h8 a1.5 1.5 0 0 1 1.5 1.5 v6 a1 1 0 0 0 1 1 h2.5 a1.5 1.5 0 0 1 1.5 1.5 v4.5 a1.5 1.5 0 0 1 -1.5 1.5 h-13 a1.5 1.5 0 0 1 -1.5 -1.5 z"
        fill="currentColor"
        className="text-brand-strong"
      />
      {/* dimension line along the top edge */}
      <path
        d="M4 1.75 v2.5 M15 1.75 v2.5 M4 3 h11"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        className="text-foreground/40"
      />
    </svg>
  );
}

/** "engage" wordmark set in the display face. */
export function Wordmark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "cream";
}) {
  return (
    <span
      className={cn(
        "font-display leading-none",
        tone === "cream" ? "text-surface-dark-foreground" : "text-foreground",
        className,
      )}
      style={{ fontWeight: 660, fontStretch: "106%", letterSpacing: "-0.03em" }}
    >
      engage
    </span>
  );
}

/** Glyph + wordmark lockup. On dark surfaces pass tone="cream". */
export function Lockup({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "cream";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoGlyph
        className={cn(
          "size-6",
          tone === "cream" && "[&_.text-brand-strong]:text-sage",
        )}
      />
      <Wordmark tone={tone} className="text-[1.35rem]" />
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
