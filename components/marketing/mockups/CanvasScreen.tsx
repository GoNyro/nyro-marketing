import {
  ChevronDown,
  Layers,
  MousePointer2,
  PenLine,
  Redo2,
  Ruler,
  Square,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The quote canvas as a product screen: tool rail, drawing surface with the
 * dimensioned benchtop, live price panel on the right. This is the site's
 * signature shot, so the drawing follows real drafting conventions -
 * architectural tick marks, extension lines, a selected edge with handles.
 */

const PRICE_LINES = [
  ["Calacatta Mist · 20mm", "$2,304.00"],
  ["Machining & polish", "$1,118.00"],
  ["Edge · pencil round · 4.2m", "$392.00"],
  ["Sink cutout · undermount", "$186.00"],
  ["Delivery · Zone 2", "$210.00"],
  ["Templating", "$390.00"],
] as const;

/* Architectural dimension: extension lines + a dim line with 45° ticks. */
function Dim({
  x1,
  y1,
  x2,
  y2,
  label,
  side = "above",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  side?: "above" | "right" | "below";
}) {
  const horizontal = y1 === y2;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return (
    <g className="stroke-foreground/40" strokeWidth="0.75">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {/* 45° ticks at each end */}
      {horizontal ? (
        <>
          <line x1={x1 - 3.2} y1={y1 + 3.2} x2={x1 + 3.2} y2={y1 - 3.2} />
          <line x1={x2 - 3.2} y1={y2 + 3.2} x2={x2 + 3.2} y2={y2 - 3.2} />
        </>
      ) : (
        <>
          <line x1={x1 - 3.2} y1={y1 + 3.2} x2={x1 + 3.2} y2={y1 - 3.2} />
          <line x1={x2 - 3.2} y1={y2 + 3.2} x2={x2 + 3.2} y2={y2 - 3.2} />
        </>
      )}
      <text
        x={horizontal ? midX : midX + 10}
        y={horizontal ? (side === "below" ? midY + 14 : midY - 6) : midY}
        textAnchor={horizontal ? "middle" : "start"}
        dominantBaseline={horizontal ? undefined : "middle"}
        className="fill-foreground/60"
        stroke="none"
        style={{
          fontFamily: "var(--font-plex-mono)",
          fontSize: "10.5px",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </text>
    </g>
  );
}

function Drawing() {
  /* Slab geometry at 0.18 px/mm: main run 2400×600, return leg 600 wide ×
     1500 overall. Plan view, top-left at (76,84). */
  return (
    <svg viewBox="0 0 720 400" className="w-full" aria-hidden>
      {/* extension lines from the measured edges */}
      <g className="stroke-foreground/25" strokeWidth="0.6">
        <line x1={76} y1={78} x2={76} y2={56} />
        <line x1={508} y1={78} x2={508} y2={56} />
        <line x1={514} y1={84} x2={538} y2={84} />
        <line x1={514} y1={354} x2={538} y2={354} />
        <line x1={400} y1={360} x2={400} y2={382} />
        <line x1={508} y1={360} x2={508} y2={382} />
      </g>

      {/* the slab */}
      <path
        d="M76 84 H508 V354 H400 V192 H76 Z"
        className="fill-card stroke-foreground/75"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* subtle inner offset - stone thickness read */}
      <path
        d="M82 90 H502 V348 H406 V186 H82 Z"
        fill="none"
        className="stroke-foreground/12"
        strokeWidth="1"
      />

      {/* sink cutout */}
      <rect
        x="150"
        y="108"
        width="130"
        height="60"
        rx="8"
        className="fill-stage stroke-foreground/50"
        strokeWidth="1"
        strokeDasharray="5 3.5"
      />
      <line x1={215} y1={128} x2={215} y2={148} className="stroke-foreground/30" strokeWidth="0.75" />
      <line x1={205} y1={138} x2={225} y2={138} className="stroke-foreground/30" strokeWidth="0.75" />
      <text
        x="150"
        y="100"
        className="fill-foreground/55"
        style={{ fontFamily: "var(--font-plex-mono)", fontSize: "9.5px", letterSpacing: "0.08em" }}
      >
        SINK · UNDERMOUNT 720×400
      </text>
      {/* tap holes */}
      <circle cx="312" cy="124" r="4" className="fill-none stroke-foreground/45" strokeWidth="1.1" />
      <circle cx="330" cy="124" r="4" className="fill-none stroke-foreground/45" strokeWidth="1.1" />

      {/* selected front edge - the canvas selection state */}
      <path
        d="M76 192 H400 V354"
        fill="none"
        className="stroke-brand-strong"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="238" cy="192" r="4" className="fill-card stroke-brand-strong" strokeWidth="1.75" />
      <circle cx="400" cy="273" r="4" className="fill-card stroke-brand-strong" strokeWidth="1.75" />

      {/* edge tag on a leader */}
      <line x1={238} y1={196} x2={210} y2={232} className="stroke-foreground/30" strokeWidth="0.75" />
      <g>
        <rect
          x="128"
          y="232"
          width="164"
          height="24"
          rx="5"
          className="fill-card stroke-black/15"
          strokeWidth="0.9"
        />
        <circle cx="142" cy="244" r="3" className="fill-brand-strong" />
        <text
          x="152"
          y="248"
          className="fill-foreground/75"
          style={{ fontFamily: "var(--font-plex-mono)", fontSize: "9.5px", letterSpacing: "0.07em" }}
        >
          EDGE · PENCIL ROUND
        </text>
      </g>

      {/* join line where the leg meets the main run */}
      <line
        x1={400}
        y1={192}
        x2={508}
        y2={192}
        className="stroke-foreground/30"
        strokeWidth="0.9"
        strokeDasharray="7 4"
      />
      <text
        x="446"
        y="186"
        className="fill-foreground/40"
        style={{ fontFamily: "var(--font-plex-mono)", fontSize: "8.5px", letterSpacing: "0.1em" }}
      >
        JOIN
      </text>

      {/* dimensions */}
      <Dim x1={76} y1={62} x2={508} y2={62} label="2400" />
      <Dim x1={532} y1={84} x2={532} y2={354} label="1500" side="right" />
      <Dim x1={400} y1={376} x2={508} y2={376} label="600" side="below" />
    </svg>
  );
}

export function CanvasScreen({ className }: { className?: string }) {
  return (
    <div className={cn("flex", className)} aria-hidden>
      {/* tool rail */}
      <div className="flex w-11 shrink-0 flex-col items-center gap-1 border-r border-black/[0.07] py-3 text-foreground/45">
        <span className="flex size-7 items-center justify-center rounded-md bg-brand-soft text-brand-strong">
          <MousePointer2 className="size-3.5" />
        </span>
        <span className="flex size-7 items-center justify-center rounded-md">
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
        <div className="mt-auto flex flex-col items-center gap-1 border-t border-black/[0.07] pt-2">
          <span className="flex size-7 items-center justify-center rounded-md">
            <Undo2 className="size-3.5" />
          </span>
          <span className="flex size-7 items-center justify-center rounded-md text-foreground/25">
            <Redo2 className="size-3.5" />
          </span>
        </div>
      </div>

      {/* canvas */}
      <div className="blueprint-grid min-w-0 flex-1 bg-secondary/50 p-4">
        <div className="flex items-center justify-between px-1 pb-2">
          <span className="font-mono text-[10px] tracking-[0.08em] text-foreground/45">
            Q-2481 · HARRINGTON JOINERY · REV B
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] tracking-[0.08em] text-foreground/35">
            1:20 <ChevronDown className="size-2.5" />
          </span>
        </div>
        <Drawing />
      </div>

      {/* price panel */}
      <div className="hidden w-60 shrink-0 flex-col border-l border-black/[0.07] sm:flex">
        <div className="border-b border-black/[0.07] px-4 py-3">
          <p className="text-[12.5px] font-semibold leading-none">Price</p>
          <p className="mt-1.5 text-[10.5px] text-foreground/45">
            Harrington Joinery · Tier 2
          </p>
        </div>
        <div className="flex flex-col gap-2.5 px-4 py-3.5">
          {PRICE_LINES.map(([label, value]) => (
            <div
              key={label}
              className="flex items-baseline justify-between gap-2 text-[11px]"
            >
              <span className="truncate text-foreground/60">{label}</span>
              <span className="shrink-0 font-mono text-[10.5px] text-foreground/80">
                {value}
              </span>
            </div>
          ))}
        </div>
        {/* what the pricing engine measured */}
        <div className="mx-4 mt-1 rounded-lg bg-stage px-3 py-2.5">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-foreground/40">
            Measured from drawing
          </p>
          <dl className="mt-2 space-y-1.5 text-[10.5px] text-foreground/60">
            <div className="flex justify-between">
              <dt>Slab area</dt>
              <dd className="font-mono text-[10px]">2.34 m²</dd>
            </div>
            <div className="flex justify-between">
              <dt>Machined edge</dt>
              <dd className="font-mono text-[10px]">4.2 m</dd>
            </div>
            <div className="flex justify-between">
              <dt>Cutouts</dt>
              <dd className="font-mono text-[10px]">1 + 2 tap holes</dd>
            </div>
            <div className="flex justify-between">
              <dt>Joins</dt>
              <dd className="font-mono text-[10px]">1 mitre</dd>
            </div>
          </dl>
        </div>
        <div className="mt-auto border-t border-black/[0.07] px-4 py-3.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] text-foreground/60">Total · incl. GST</span>
            <span className="font-mono text-[16px] font-semibold">$4,600.00</span>
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-foreground/45">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-strong" />
            </span>
            Re-priced as the shape changes
          </p>
          <span className="mt-3.5 block rounded-md bg-primary py-2 text-center text-[11.5px] font-medium text-primary-foreground">
            Submit for approval
          </span>
        </div>
      </div>
    </div>
  );
}
