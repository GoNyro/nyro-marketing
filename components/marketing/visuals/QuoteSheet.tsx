import { cn } from "@/lib/utils";

/**
 * The signature visual: a benchtop quote as a shop drawing. An L-shaped top
 * in plan view on graph paper - dimension lines, a sink cutout, an edge
 * callout - with the live price panel overlaid, the way the quote canvas
 * prices while you draw. Pure SVG + CSS; no client JS.
 */
export function QuoteSheet({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 640 460"
        role="img"
        aria-label="A benchtop quote drawn in plan view: an L-shaped top with a sink cutout, dimension lines and a live price"
        className="w-full"
      >
        {/* ── the slab ──────────────────────────────────────────────── */}
        <path
          d="M80 110 h384 v240 h-96 v-144 h-288 z"
          className="fill-card stroke-foreground/70"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* front-edge emphasis: the machined edge, drawn heavier */}
        <path
          d="M80 206 h288 v144 h96"
          fill="none"
          className="stroke-brand-strong"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* ── sink cutout ───────────────────────────────────────────── */}
        <rect
          x="140"
          y="134"
          width="88"
          height="48"
          rx="7"
          className="fill-stage stroke-clay-ink"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        {/* crosshair */}
        <path
          d="M184 150 v16 M176 158 h16"
          className="stroke-clay-ink/70"
          strokeWidth="1"
        />
        {/* tap holes */}
        <circle cx="246" cy="146" r="3.5" className="fill-none stroke-foreground/50" strokeWidth="1.5" />
        <circle cx="262" cy="146" r="3.5" className="fill-none stroke-foreground/50" strokeWidth="1.5" />
        <text
          x="140"
          y="125"
          className="fill-clay-ink"
          style={{ fontFamily: "var(--font-plex-mono)", fontSize: "10px", letterSpacing: "0.08em" }}
        >
          SINK CUTOUT 720×400
        </text>

        {/* ── dimensions ────────────────────────────────────────────── */}
        {/* top: 2400, the edge being measured - dashes crawl */}
        <g className="stroke-foreground/50" strokeWidth="1">
          <path d="M80 78 v20 M464 78 v20" />
          <path d="M80 86 h384" strokeDasharray="6 6" className="dim-dash" />
        </g>
        <text
          x="272"
          y="76"
          textAnchor="middle"
          className="fill-foreground/70"
          style={{ fontFamily: "var(--font-plex-mono)", fontSize: "12px", letterSpacing: "0.1em" }}
        >
          2400
        </text>

        {/* right: 1500 overall */}
        <g className="stroke-foreground/50" strokeWidth="1">
          <path d="M488 110 h20 M488 350 h20" />
          <path d="M496 110 v240" />
        </g>
        <text
          x="512"
          y="234"
          className="fill-foreground/70"
          style={{ fontFamily: "var(--font-plex-mono)", fontSize: "12px", letterSpacing: "0.1em" }}
        >
          1500
        </text>

        {/* bottom of leg: 600 */}
        <g className="stroke-foreground/50" strokeWidth="1">
          <path d="M368 362 v14 M464 362 v14" />
          <path d="M368 369 h96" />
        </g>
        <text
          x="416"
          y="392"
          textAnchor="middle"
          className="fill-foreground/70"
          style={{ fontFamily: "var(--font-plex-mono)", fontSize: "12px", letterSpacing: "0.1em" }}
        >
          600
        </text>

        {/* ── edge profile callout ──────────────────────────────────── */}
        <path d="M232 206 l-40 44" className="stroke-foreground/40" strokeWidth="1" />
        <circle cx="232" cy="206" r="3" className="fill-brand-strong" />
        <g>
          <rect
            x="108"
            y="250"
            width="164"
            height="26"
            rx="6"
            className="fill-background stroke-border"
            strokeWidth="1"
          />
          <text
            x="120"
            y="267"
            className="fill-foreground/80"
            style={{ fontFamily: "var(--font-plex-mono)", fontSize: "10px", letterSpacing: "0.08em" }}
          >
            EDGE · PENCIL ROUND
          </text>
        </g>

        {/* sheet reference, bottom-left corner - the drawing-title-block nod */}
        <text
          x="80"
          y="430"
          className="fill-muted-foreground/70"
          style={{ fontFamily: "var(--font-plex-mono)", fontSize: "10px", letterSpacing: "0.14em" }}
        >
          QUOTE Q-2481 · REV B · SCALE 1:20
        </text>
      </svg>

      {/* material chip - top-right corner, clear of the 2400 dimension */}
      <div className="absolute right-[1%] top-0 rounded-lg border border-border bg-card px-3 py-2 shadow-sm">
        <p className="label-mono text-[0.6rem] text-muted-foreground">Material</p>
        <p className="mt-0.5 text-sm font-semibold text-foreground">
          Calacatta Mist <span className="font-normal text-muted-foreground">· 20mm</span>
        </p>
      </div>

      {/* live price panel - floats in the empty inner corner, like a canvas HUD */}
      <div className="absolute left-[30%] top-[63%] w-48 rounded-xl border border-border bg-card p-4 shadow-lg">
        <p className="label-mono flex items-center gap-2 text-[0.6rem] text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-strong" />
          </span>
          Live price
        </p>
        <p className="mt-2 font-display text-2xl text-foreground">$4,912</p>
        <p className="mt-1 text-xs text-muted-foreground">
          incl. GST · re-priced as the shape changes
        </p>
      </div>
    </div>
  );
}
