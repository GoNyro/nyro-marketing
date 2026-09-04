import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Download,
  Layers,
  MessageCircle,
  Palette,
  Plus,
  Redo2,
  RotateCw,
  SquarePlus,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/marketing/Logo";
import {
  INK,
  type Pt,
  UI_FONT,
  mid,
  outward,
  pathOf,
  readingAngle,
} from "./geometry";

/**
 * The builder's chrome and drawing vocabulary, shared by the static screen
 * and the animated demo. Server-safe: no hooks, no motion. Everything is
 * copied from the product so the two mockups can't drift from each other.
 */

export const FONT = { fontFamily: UI_FONT } as const;

/* ── HTML chrome ────────────────────────────────────────────────────────── */

export function Tool({
  icon: Icon,
  label,
  active,
  className,
  ...rest
}: {
  icon: React.ComponentType<{ className?: string }>;
  label?: string;
  active?: boolean;
  className?: string;
  ref?: React.Ref<HTMLSpanElement>;
} & Omit<React.HTMLAttributes<HTMLSpanElement>, "children">) {
  return (
    <span
      className={cn(
        "flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2 text-[12.5px] text-foreground/80",
        active && "bg-foreground text-card",
        className,
      )}
      {...rest}
    >
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}

export function Divider({ className }: { className?: string }) {
  return <span className={cn("mx-1 h-4 w-px bg-black/10", className)} />;
}

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/45",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-md bg-stage px-1.5 py-0.5 text-[10.5px] text-foreground/60">
      {children}
    </span>
  );
}

export function Select({
  value,
  hint,
  className,
  ...rest
}: {
  value: string;
  hint?: string;
  className?: string;
  ref?: React.Ref<HTMLSpanElement>;
} & Omit<React.HTMLAttributes<HTMLSpanElement>, "children">) {
  return (
    <span
      className={cn(
        "flex h-8 min-w-0 flex-1 items-center gap-1.5 rounded-md border border-black/[0.09] bg-card px-2.5 text-[12px]",
        className,
      )}
      {...rest}
    >
      <span className="truncate">{value}</span>
      {hint && (
        <span className="truncate text-[10.5px] uppercase tracking-wide text-foreground/45">
          {hint}
        </span>
      )}
      <ChevronsUpDown className="ml-auto size-3 shrink-0 text-foreground/40" />
    </span>
  );
}

export function Field({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <span className="block">
      <span className="block text-foreground/70">{label}</span>
      <span className="mt-1 flex h-8 items-center rounded-md border border-black/[0.09] bg-card px-2.5 text-[12px]">
        {value}
        <span className="ml-auto text-[10.5px] text-foreground/40">{unit}</span>
      </span>
    </span>
  );
}

export function Toggle() {
  return (
    <span className="relative inline-block h-4 w-7 rounded-full bg-black/[0.12]">
      <span className="absolute left-0.5 top-0.5 size-3 rounded-full bg-card shadow-sm" />
    </span>
  );
}

export function TotalRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-auto flex items-center justify-between border-t border-black/[0.07] px-4 py-3.5">
      <span className="flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-foreground/50">
        <ChevronRight className="size-3" />
        Total (incl. GST)
      </span>
      <span className="text-[13.5px] font-semibold tabular-nums">
        {children}
      </span>
    </div>
  );
}

export function QuoteHeader() {
  return (
    <div className="flex h-11 items-center gap-3 border-b border-black/[0.07] px-4 text-[13px]">
      <Wordmark className="h-3.5" measured={false} />
      <Divider />
      <span className="flex shrink-0 items-center gap-1 whitespace-nowrap text-foreground/80">
        <ChevronLeft className="size-3.5" />
        Quotes
      </span>
      <span className="flex min-w-0 flex-1 items-center gap-2 whitespace-nowrap">
        <span className="shrink-0 font-semibold">Q-50</span>
        <span className="shrink-0 text-foreground/35">·</span>
        <span className="truncate text-foreground/80">
          Harrington Joinery
        </span>
      </span>
      <span className="ml-auto flex shrink-0 items-center gap-2">
        <span className="rounded-full bg-stage px-2.5 py-0.5 text-[10.5px] text-foreground/70">
          Draft
        </span>
        <span className="hidden items-center gap-1 rounded-full border border-black/[0.09] px-2.5 py-0.5 text-[11px] text-foreground/80 sm:flex">
          LMT <ChevronDown className="size-3 text-foreground/45" />
        </span>
      </span>
    </div>
  );
}

export function Toolbar({
  addPieceRef,
  addPieceActive,
  children,
}: {
  addPieceRef?: React.Ref<HTMLSpanElement>;
  addPieceActive?: boolean;
  /** Slot rendered under the Add piece button (its popover). */
  children?: React.ReactNode;
}) {
  return (
    <div className="relative flex h-11 items-center gap-0.5 border-b border-black/[0.07] px-3">
      <span className="relative">
        <Tool
          ref={addPieceRef}
          icon={SquarePlus}
          label="Add piece"
          className={cn(addPieceActive && "bg-stage")}
        />
        {children}
      </span>
      <Divider />
      <Tool icon={Undo2} className="hidden px-1.5 text-foreground/55 sm:flex" />
      <Tool icon={Redo2} className="hidden px-1.5 text-foreground/30 sm:flex" />
      <Divider className="hidden sm:block" />
      <Tool icon={RotateCw} label="0°" />
      <Divider className="hidden md:block" />
      <Tool icon={Layers} label="Elevations" className="hidden md:flex" />
      <Tool icon={Palette} label="Colour" className="hidden md:flex" />
      <Divider className="hidden sm:block" />
      <span className="hidden items-center gap-1 whitespace-nowrap px-1.5 text-[12.5px] text-foreground/80 sm:flex">
        100% <ChevronDown className="size-3 text-foreground/45" />
      </span>
      <span className="ml-auto flex shrink-0 items-center gap-2">
        <span className="hidden h-7 items-center gap-1.5 rounded-full bg-stage px-3 text-[12px] font-medium sm:flex">
          <Download className="size-3.5" />
          Download PDF
        </span>
        <span className="flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full bg-foreground px-3 text-[12px] font-medium text-card">
          <span>
            Send<span className="hidden sm:inline"> to customer</span>
          </span>
          <ArrowRight className="size-3.5" />
        </span>
      </span>
    </div>
  );
}

export function RoomsBar() {
  return (
    <div className="flex h-9 items-center gap-1 border-t border-black/[0.07] px-2 text-[12px]">
      <span className="rounded-md bg-stage px-2.5 py-1 font-medium">
        Kitchen
      </span>
      <span className="flex items-center gap-1 px-2 py-1 text-foreground/70">
        <Plus className="size-3" />
        Add room
      </span>
      <span className="ml-auto flex items-center gap-1.5 pr-2 text-foreground/80">
        <MessageCircle className="size-3.5" />
        Messages
      </span>
    </div>
  );
}

/* ── Inspector rows shared by both screens ───────────────────────────────── */

export const MATERIALS = {
  surface: { value: "Basalt NT", hint: "Laminex" },
  thickness: { value: "39 mm — 30 base + 9" },
  substrate: { value: "MDF" },
  underside: { value: "None" },
} as const;

/* ── SVG vocabulary ──────────────────────────────────────────────────────── */

export function Hatch({ id, angle }: { id: string; angle: number }) {
  return (
    <pattern
      id={id}
      width="30"
      height="30"
      patternUnits="userSpaceOnUse"
      patternTransform={`rotate(${angle})`}
    >
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="30"
        stroke={INK.border}
        strokeWidth="2.5"
      />
    </pattern>
  );
}

/** Hatched workpiece: a base fill (tinted when selected), the hatch, the outline. */
export function Piece({
  points,
  hatch,
  selected,
}: {
  points: readonly Pt[];
  hatch: string;
  selected?: boolean;
}) {
  const d = pathOf(points);
  return (
    <g>
      <path d={d} fill={selected ? INK.selected : "#ffffff"} />
      <path d={d} fill={`url(#${hatch})`} />
      <path
        d={d}
        fill="none"
        stroke={selected ? INK.text : INK.borderStrong}
        strokeWidth={selected ? 1.5 : 2}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );
}

/**
 * A dimension the way the builder draws one: faint extension lines from the
 * measured edge, a hairline with perpendicular end ticks, and the value set
 * on the line with a paper halo so the line reads as broken behind it. The
 * `pill` form is the builder's live-edit dimension: value in a bordered box.
 */
export function Dim({
  from,
  to,
  offset,
  label,
  labelShift = 0,
  pill = false,
}: {
  from: Pt;
  to: Pt;
  offset: number;
  label: string;
  /** Slide the value along the line (mm, towards `to`) - for dimensions too
      short to carry their value, the builder sets it beside the ticks. */
  labelShift?: number;
  pill?: boolean;
}) {
  const [nx, ny] = outward(from, to);
  const len = Math.hypot(to[0] - from[0], to[1] - from[1]);
  const ux = (to[0] - from[0]) / len;
  const uy = (to[1] - from[1]) / len;
  const a: Pt = [from[0] + nx * offset, from[1] + ny * offset];
  const b: Pt = [to[0] + nx * offset, to[1] + ny * offset];
  const m: Pt = [
    (a[0] + b[0]) / 2 + ux * labelShift,
    (a[1] + b[1]) / 2 + uy * labelShift,
  ];
  const angle = readingAngle(from, to);
  const tick = 34;
  const tx = nx * tick;
  const ty = ny * tick;
  const pillW = 60 + label.length * 30;

  return (
    <g>
      <g
        stroke={pill ? INK.borderStrong : INK.border}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        strokeDasharray="22 18"
      >
        <line
          x1={from[0]}
          y1={from[1]}
          x2={a[0] + nx * 40}
          y2={a[1] + ny * 40}
        />
        <line x1={to[0]} y1={to[1]} x2={b[0] + nx * 40} y2={b[1] + ny * 40} />
      </g>
      <g
        stroke={pill ? INK.text : INK.borderStrong}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
        <line x1={a[0] - tx} y1={a[1] - ty} x2={a[0] + tx} y2={a[1] + ty} />
        <line x1={b[0] - tx} y1={b[1] - ty} x2={b[0] + tx} y2={b[1] + ty} />
      </g>
      <g transform={`translate(${m[0]} ${m[1]}) rotate(${angle})`}>
        {pill && (
          <rect
            x={-pillW / 2}
            y={-40}
            width={pillW}
            height={80}
            rx={14}
            className="fill-card stroke-foreground"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        )}
        <text
          textAnchor="middle"
          dominantBaseline="central"
          className={
            pill ? "fill-foreground" : "fill-foreground/75 stroke-card"
          }
          strokeWidth={pill ? 0 : 26}
          strokeLinejoin="round"
          paintOrder="stroke"
          style={{
            ...FONT,
            fontSize: pill ? 46 : 50,
            fontWeight: pill ? 500 : 400,
            letterSpacing: 1,
          }}
        >
          {label}
        </text>
      </g>
    </g>
  );
}

/** Edge profile name, sitting just outside its edge and reading along it. */
export function EdgeLabel({
  from,
  to,
  label,
  italic,
}: {
  from: Pt;
  to: Pt;
  label: string;
  italic?: boolean;
}) {
  const [nx, ny] = outward(from, to);
  const off = 52;
  const m = mid(from, to);
  return (
    <text
      transform={`translate(${m[0] + nx * off} ${m[1] + ny * off}) rotate(${readingAngle(from, to)})`}
      textAnchor="middle"
      dominantBaseline="central"
      className="fill-foreground/60"
      style={{
        ...FONT,
        fontSize: 40,
        fontStyle: italic ? "italic" : undefined,
      }}
    >
      {label}
    </text>
  );
}

/** Ghosted piece letter, as the builder writes it across each workpiece. */
export function PieceLetter({
  at,
  rotate = 0,
  children,
}: {
  at: Pt;
  rotate?: number;
  children: string;
}) {
  return (
    <text
      transform={`translate(${at[0]} ${at[1]}) rotate(${rotate})`}
      textAnchor="middle"
      dominantBaseline="central"
      fill={INK.faint}
      style={{ ...FONT, fontSize: 200, fontWeight: 600 }}
    >
      {children}
    </text>
  );
}

/** The R 45° tag on the mitre, with its short leader. */
export function JoinTag({ at }: { at: Pt }) {
  return (
    <g transform={`translate(${at[0] + 190} ${at[1]})`}>
      <line
        x1={-190}
        y1={0}
        x2={-120}
        y2={0}
        stroke={INK.text}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x={-120}
        y={-44}
        width={240}
        height={88}
        rx={44}
        fill="#ffffff"
        stroke={INK.text}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill={INK.text}
        style={{ ...FONT, fontSize: 42, fontWeight: 600 }}
      >
        R 45°
      </text>
    </g>
  );
}

/** The circular ⊕ that adds a connected piece off an edge. */
export function PlusButton({ at }: { at: Pt }) {
  return (
    <g transform={`translate(${at[0]} ${at[1]})`}>
      <circle
        r={58}
        fill="#ffffff"
        stroke={INK.text}
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M-26 0H26M0 -26V26"
        stroke={INK.text}
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );
}

/** The sink cutout: dashed at rest, solid with handles when selected. */
export function Cutout({
  x,
  y,
  w,
  h,
  selected,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  selected?: boolean;
}) {
  const handle = 30;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={INK.cutout}
        stroke={selected ? INK.text : INK.borderStrong}
        strokeWidth={selected ? 1.5 : 1}
        strokeDasharray={selected ? undefined : "22 16"}
        vectorEffect="non-scaling-stroke"
      />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={INK.secondary}
        style={{ ...FONT, fontSize: 44, fontStyle: "italic" }}
      >
        AA402 Aurora
      </text>
      {selected &&
        (
          [
            [x, y],
            [x + w, y],
            [x, y + h],
            [x + w, y + h],
          ] as Pt[]
        ).map(([hx, hy]) => (
          <rect
            key={`${hx}-${hy}`}
            x={hx - handle / 2}
            y={hy - handle / 2}
            width={handle}
            height={handle}
            fill={INK.text}
          />
        ))}
    </g>
  );
}
