import { cn } from "@/lib/utils";

/**
 * Hero illustration: the platform as an isometric stack - three product
 * layers on one axis, a dashed orbit, and a small workpiece satellite.
 * Each layer carries a boxed mono tag on a leader line.
 */

const HW = 120; // half-width of the iso diamond
const HH = 60; // half-height
const T = 24; // slab thickness

function slabPaths(cx: number, y: number) {
  return {
    top: `M ${cx} ${y - HH} L ${cx + HW} ${y} L ${cx} ${y + HH} L ${cx - HW} ${y} Z`,
    left: `M ${cx - HW} ${y} L ${cx} ${y + HH} L ${cx} ${y + HH + T} L ${cx - HW} ${y + T} Z`,
    right: `M ${cx + HW} ${y} L ${cx} ${y + HH} L ${cx} ${y + HH + T} L ${cx + HW} ${y + T} Z`,
  };
}

function Slab({ cx, y }: { cx: number; y: number }) {
  const p = slabPaths(cx, y);
  return (
    <g>
      <path d={p.top} fill="oklch(0.60 0.115 132)" />
      <path d={p.left} fill="oklch(0.40 0.085 132)" />
      <path d={p.right} fill="oklch(0.49 0.10 132)" />
      <path
        d={p.top}
        fill="none"
        stroke="oklch(0.85 0.06 130 / 0.5)"
        strokeWidth="1"
      />
    </g>
  );
}

/** Boxed mono tag with a leader line to a point on the slab edge. */
function Tag({
  x,
  y,
  toX,
  toY,
  index,
  label,
}: {
  x: number;
  y: number;
  toX: number;
  toY: number;
  index: string;
  label: string;
}) {
  const width = 12 + (index.length + label.length + 1) * 6.1;
  return (
    <g>
      <line
        x1={x}
        y1={y + 9}
        x2={toX}
        y2={toY}
        stroke="oklch(0.955 0.004 95 / 0.4)"
        strokeWidth="1"
      />
      <circle cx={toX} cy={toY} r="2" fill="oklch(0.955 0.004 95 / 0.8)" />
      <rect
        x={x}
        y={y}
        width={width}
        height={18}
        fill="oklch(0.955 0.004 95)"
        rx="1.5"
      />
      <text
        x={x + 6}
        y={y + 12.5}
        style={{
          fontFamily: "var(--font-plex-mono)",
          fontSize: "9.5px",
          letterSpacing: "0.06em",
        }}
        fill="oklch(0.22 0.012 145)"
      >
        <tspan fill="oklch(0.22 0.012 145 / 0.5)">{index}</tspan>
        <tspan dx="5">{label}</tspan>
      </text>
    </g>
  );
}

export function IsoStack({ className }: { className?: string }) {
  const cx = 280;
  return (
    <svg
      viewBox="0 0 600 560"
      role="img"
      aria-label="The Nyro platform drawn as an isometric stack: customer portal, fabrication and retail layers on one shared core"
      className={cn("w-full", className)}
    >
      {/* axis */}
      <line
        x1={cx}
        y1={40}
        x2={cx}
        y2={520}
        stroke="oklch(0.955 0.004 95 / 0.25)"
        strokeWidth="1"
      />

      {/* orbit */}
      <ellipse
        cx={cx}
        cy={300}
        rx={244}
        ry={122}
        fill="none"
        stroke="oklch(0.955 0.004 95 / 0.3)"
        strokeWidth="1"
        strokeDasharray="3 6"
      />

      {/* apex node: wireframe sphere */}
      <g stroke="oklch(0.955 0.004 95 / 0.65)" strokeWidth="1" fill="none">
        <circle cx={cx} cy={78} r={34} />
        <ellipse cx={cx} cy={78} rx={34} ry={12} />
        <ellipse cx={cx} cy={78} rx={12} ry={34} />
      </g>

      {/* the three product layers */}
      <Slab cx={cx} y={210} />
      <Slab cx={cx} y={322} />
      <Slab cx={cx} y={434} />

      {/* layer tags, DOSS-style boxed labels on leader lines */}
      <Tag x={432} y={160} toX={cx + HW - 22} toY={199} index="01" label="Customer Portal" />
      <Tag x={452} y={286} toX={cx + HW - 10} toY={322} index="02" label="Fabrication" />
      <Tag x={432} y={470} toX={cx + HW - 22} toY={445} index="03" label="Retail" />

      {/* workpiece satellite: a small iso slab riding the orbit */}
      <g>
        <path
          d="M 64 380 l 28 -14 l 28 14 l -28 14 Z"
          fill="oklch(0.185 0.008 145)"
          stroke="oklch(0.955 0.004 95 / 0.6)"
          strokeWidth="1"
        />
        <path
          d="M 64 380 l 0 11 l 28 14 l 0 -11 Z"
          fill="oklch(0.185 0.008 145)"
          stroke="oklch(0.955 0.004 95 / 0.6)"
          strokeWidth="1"
        />
        <path
          d="M 120 380 l 0 11 l -28 14 l 0 -11 Z"
          fill="oklch(0.185 0.008 145)"
          stroke="oklch(0.955 0.004 95 / 0.6)"
          strokeWidth="1"
        />
        <text
          x={92}
          y={424}
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-plex-mono)",
            fontSize: "8.5px",
            letterSpacing: "0.1em",
          }}
          fill="oklch(0.955 0.004 95 / 0.5)"
        >
          DXF · CNC
        </text>
      </g>
    </svg>
  );
}
