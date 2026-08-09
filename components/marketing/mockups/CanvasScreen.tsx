import {
  Layers,
  MousePointer2,
  PenLine,
  Ruler,
  Square,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The quote canvas as a product screen: tool rail, drawing surface with the
 * dimensioned benchtop, live price panel on the right. Composed inside
 * AppWindow wherever it's used.
 */

const PRICE_LINES = [
  ["Calacatta Mist · 20mm", "$2,304.00"],
  ["Machining & polish", "$1,118.00"],
  ["Edge · pencil round", "$392.00"],
  ["Sink cutout", "$186.00"],
  ["Delivery · Zone 2", "$210.00"],
] as const;

function Drawing() {
  return (
    <svg viewBox="0 0 460 320" className="w-full" aria-hidden>
      {/* slab */}
      <path
        d="M60 78 h288 v180 h-72 v-108 h-216 z"
        className="fill-card stroke-foreground/70"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M60 150 h216 v108 h72"
        fill="none"
        className="stroke-brand-strong"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* sink cutout */}
      <rect
        x="105"
        y="96"
        width="66"
        height="36"
        rx="5"
        className="fill-stage stroke-status-warm-ink"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <path d="M138 108 v12 M132 114 h12" className="stroke-status-warm-ink/70" strokeWidth="0.75" />
      <circle cx="185" cy="105" r="2.5" className="fill-none stroke-foreground/50" strokeWidth="1" />
      <circle cx="197" cy="105" r="2.5" className="fill-none stroke-foreground/50" strokeWidth="1" />

      {/* dimensions */}
      <g className="stroke-foreground/45" strokeWidth="0.75">
        <path d="M60 54 v16 M348 54 v16" />
        <path d="M60 61 h288" strokeDasharray="5 5" className="dim-dash" />
        <path d="M368 78 h14 M368 258 h14" />
        <path d="M375 78 v180" />
        <path d="M276 272 v12 M348 272 v12" />
        <path d="M276 278 h72" />
      </g>
      <text x="204" y="50" textAnchor="middle" className="fill-foreground/65" style={{ fontFamily: "var(--font-plex-mono)", fontSize: "10px", letterSpacing: "0.08em" }}>
        2400
      </text>
      <text x="384" y="172" className="fill-foreground/65" style={{ fontFamily: "var(--font-plex-mono)", fontSize: "10px", letterSpacing: "0.08em" }}>
        1500
      </text>
      <text x="312" y="296" textAnchor="middle" className="fill-foreground/65" style={{ fontFamily: "var(--font-plex-mono)", fontSize: "10px", letterSpacing: "0.08em" }}>
        600
      </text>

      {/* selected-edge tag */}
      <circle cx="170" cy="150" r="2.5" className="fill-brand-strong" />
      <path d="M170 150 l-26 30" className="stroke-foreground/35" strokeWidth="0.75" />
      <rect x="96" y="180" width="112" height="20" rx="4" className="fill-background stroke-black/10" strokeWidth="0.75" />
      <text x="104" y="193" className="fill-foreground/70" style={{ fontFamily: "var(--font-plex-mono)", fontSize: "8.5px", letterSpacing: "0.06em" }}>
        EDGE · PENCIL ROUND
      </text>
    </svg>
  );
}

export function CanvasScreen({ className }: { className?: string }) {
  return (
    <div className={cn("flex", className)} aria-hidden>
      {/* tool rail */}
      <div className="flex w-10 shrink-0 flex-col items-center gap-1 border-r border-black/[0.07] py-3 text-foreground/45">
        <span className="flex size-7 items-center justify-center rounded-md bg-brand-soft text-brand-strong">
          <MousePointer2 className="size-3.5" />
        </span>
        <span className="flex size-7 items-center justify-center rounded-md hover:bg-stage">
          <PenLine className="size-3.5" />
        </span>
        <span className="flex size-7 items-center justify-center rounded-md">
          <Square className="size-3.5" />
        </span>
        <span className="flex size-7 items-center justify-center rounded-md">
          <Ruler className="size-3.5" />
        </span>
        <span className="flex size-7 items-center justify-center rounded-md">
          <Layers className="size-3.5" />
        </span>
        <span className="mt-auto flex size-7 items-center justify-center rounded-md">
          <Undo2 className="size-3.5" />
        </span>
      </div>

      {/* canvas */}
      <div className="blueprint-grid min-w-0 flex-1 bg-secondary/50 p-3">
        <div className="flex items-center justify-between px-1 pb-1">
          <span className="font-mono text-[10px] tracking-[0.08em] text-foreground/45">
            Q-2481 · HARRINGTON JOINERY · REV B
          </span>
          <span className="font-mono text-[10px] tracking-[0.08em] text-foreground/35">
            1:20
          </span>
        </div>
        <Drawing />
      </div>

      {/* price panel */}
      <div className="hidden w-52 shrink-0 flex-col border-l border-black/[0.07] sm:flex">
        <div className="border-b border-black/[0.07] px-3.5 py-2.5">
          <p className="text-[12px] font-semibold">Price</p>
        </div>
        <div className="flex flex-col gap-2 px-3.5 py-3">
          {PRICE_LINES.map(([label, value]) => (
            <div
              key={label}
              className="flex items-baseline justify-between gap-2 text-[11px]"
            >
              <span className="truncate text-foreground/60">{label}</span>
              <span className="font-mono text-[10.5px] text-foreground/80">
                {value}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-auto border-t border-black/[0.07] px-3.5 py-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] text-foreground/60">Total · incl. GST</span>
            <span className="font-mono text-[15px] font-semibold">$4,912.00</span>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-[10px] text-foreground/45">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-strong" />
            </span>
            Re-priced as the shape changes
          </p>
          <span className="mt-3 block rounded-md bg-primary py-1.5 text-center text-[11px] font-medium text-primary-foreground">
            Submit for approval
          </span>
        </div>
      </div>
    </div>
  );
}
