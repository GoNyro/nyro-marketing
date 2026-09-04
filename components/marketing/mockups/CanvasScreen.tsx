import { ChevronRight, Info, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  A,
  B,
  CUTOUT,
  INK,
  UI_FONT,
  VIEWBOX,
  type Pt,
  centroid,
  mid,
  outward,
} from "./canvas/geometry";
import {
  Chip,
  Cutout,
  Dim,
  EdgeLabel,
  Field,
  Hatch,
  JoinTag,
  MATERIALS,
  Piece,
  PieceLetter,
  PlusButton,
  QuoteHeader,
  RoomsBar,
  SectionLabel,
  Select,
  Toolbar,
  TotalRow,
} from "./canvas/primitives";

/**
 * The quote builder at rest, reproduced from the product's own screen for
 * quote Q-50: two laminate benchtops meeting on a 45° mitre. Static and
 * server-rendered; the home hero uses the animated `CanvasDemo` built from
 * the same vocabulary, and this is its reduced-motion fallback.
 *
 * Two states: `room` (the room inspector - pieces, materials, total) and
 * `cutout` (the sink selected - handles on the canvas, size & position in
 * the inspector). Use different states on different pages.
 */

export type CanvasState = "room" | "cutout";

function Drawing({ state }: { state: CanvasState }) {
  const { x, y, w, h } = CUTOUT;
  const selected = state === "cutout";
  const joinMid = mid(A[1], A[2]);
  const [ex, ey] = outward(B[1], B[2]);
  const endMid = mid(B[1], B[2]);
  const addAt: Pt = [endMid[0] + ex * 420, endMid[1] + ey * 420];

  return (
    <svg viewBox={VIEWBOX} className="block h-auto w-full" aria-hidden>
      <defs>
        <Hatch id="hatch-a" angle={45} />
        <Hatch id="hatch-b" angle={0} />
      </defs>

      <Piece points={A} hatch="hatch-a" />
      <Piece points={B} hatch="hatch-b" />
      <Cutout x={x} y={y} w={w} h={h} selected={selected} />

      <PieceLetter at={[860, 300]}>A</PieceLetter>
      <PieceLetter at={centroid(B)} rotate={45}>
        B
      </PieceLetter>

      <EdgeLabel from={A[0]} to={A[1]} label="Full roll" />
      <EdgeLabel from={A[3]} to={A[0]} label="Raw" />
      <EdgeLabel from={A[2]} to={A[3]} label="Raw" />
      <EdgeLabel from={B[0]} to={B[1]} label="Raw" />
      <EdgeLabel from={B[1]} to={B[2]} label="Raw" />
      <EdgeLabel from={B[2]} to={B[3]} label="Raw" />

      {/* overall length, referenced from B's far corner */}
      <line
        x1={B[1][0]}
        y1={B[1][1]}
        x2={B[1][0]}
        y2={-370}
        stroke={INK.border}
        strokeWidth="1"
        strokeDasharray="22 18"
        vectorEffect="non-scaling-stroke"
      />
      <Dim from={A[0]} to={[B[1][0], 0]} offset={330} label="2885" />
      <Dim from={A[0]} to={A[1]} offset={180} label="1400" />
      <Dim from={A[3]} to={A[0]} offset={170} label="600" />
      <Dim from={A[2]} to={A[3]} offset={170} label="1151" />
      <Dim from={B[0]} to={B[1]} offset={170} label="2100" />
      <Dim from={B[2]} to={B[3]} offset={170} label="1851" />
      <Dim from={B[1]} to={B[2]} offset={170} label="600" />

      {/* cutout: size, then offsets from the piece's left and bottom */}
      <Dim from={[x, y]} to={[x + w, y]} offset={y + 100} label="450" />
      <Dim from={[x + w, y]} to={[x + w, y + h]} offset={100} label="450" />
      <Dim
        from={[x, 600]}
        to={[0, 600]}
        offset={350}
        label={selected ? "77mm" : "77"}
        labelShift={selected ? -230 : -150}
        pill={selected}
      />
      <Dim
        from={[0, 600]}
        to={[0, y + h]}
        offset={360}
        label="60"
        labelShift={130}
      />

      <JoinTag at={joinMid} />
      <PlusButton at={addAt} />
    </svg>
  );
}

/* ── inspector ──────────────────────────────────────────────────────────── */

const PIECES = [
  ["A", "Benchtop", "1400 × 600mm"],
  ["B", "Benchtop", "2100 × 600mm"],
] as const;

function MaterialRow({
  label,
  info,
  value,
  hint,
}: {
  label: string;
  info?: boolean;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex w-[4.6rem] shrink-0 items-center gap-1 text-foreground/70">
        {label}
        {info && <Info className="size-3 text-foreground/35" />}
      </span>
      <Select value={value} hint={hint} />
    </div>
  );
}

function RoomInspector() {
  return (
    <>
      <div className="flex items-center justify-between px-4 pb-3 pt-3.5">
        <span className="flex items-center gap-2 text-[13.5px] font-semibold">
          <span className="h-4 w-[3px] rounded-full bg-foreground" />
          Kitchen
        </span>
        <Chip>Room</Chip>
      </div>

      <div className="border-t border-black/[0.07] px-4 pb-3 pt-3">
        <SectionLabel>Pieces</SectionLabel>
        <ul className="mt-2 space-y-1">
          {PIECES.map(([letter, name, size]) => (
            <li key={letter} className="flex items-center gap-2.5 py-0.5">
              <span className="flex size-4 items-center justify-center rounded-full bg-stage text-[9.5px] font-semibold text-foreground/70">
                {letter}
              </span>
              <span className="font-medium">{name}</span>
              <span className="ml-auto text-foreground/50">{size}</span>
              <ChevronRight className="size-3 text-foreground/35" />
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-black/[0.07] px-4 pb-4 pt-3">
        <div className="flex items-center justify-between">
          <SectionLabel>Materials</SectionLabel>
          <span className="text-[10.5px] text-foreground/45">Whole room</span>
        </div>
        <div className="mt-2.5 space-y-2">
          <MaterialRow label="Surface" {...MATERIALS.surface} />
          <MaterialRow label="Thickness" info {...MATERIALS.thickness} />
          <MaterialRow label="Substrate" info {...MATERIALS.substrate} />
          <MaterialRow label="Underside" info {...MATERIALS.underside} />
        </div>
        <div className="mt-3.5 flex items-center justify-between gap-3">
          <span className="leading-tight">
            <span className="block text-foreground/80">Room quantity</span>
            <span className="block text-[10.5px] text-foreground/45">
              copies of this whole room
            </span>
          </span>
          <span className="flex h-8 w-14 items-center rounded-md border border-black/[0.09] px-2.5">
            1
          </span>
        </div>
      </div>
    </>
  );
}

function CutoutInspector() {
  return (
    <>
      <div className="flex items-center justify-between px-4 pt-3.5 text-[11.5px] text-foreground/60">
        <span className="flex items-center gap-1">
          Kitchen <ChevronRight className="size-3 text-foreground/35" />
          Benchtop <ChevronRight className="size-3 text-foreground/35" />
        </span>
        <Trash2 className="size-3.5 text-[#dc2626]/75" />
      </div>
      <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-2">
        <span className="flex min-w-0 items-center gap-2 text-[13.5px] font-semibold">
          <span className="h-4 w-[3px] shrink-0 rounded-full bg-foreground" />
          <span className="truncate">AA402 Aurora</span>
        </span>
        <span className="flex shrink-0 gap-1.5">
          <Chip>Cutout</Chip>
          <Chip>450 × 450mm</Chip>
        </span>
      </div>

      <div className="border-t border-black/[0.07] px-4 pb-4 pt-3">
        <SectionLabel>Size &amp; position</SectionLabel>
        <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-2.5">
          <Field label="X" value="77" unit="mm" />
          <Field label="Y" value="90" unit="mm" />
          <Field label="Width" value="450" unit="mm" />
          <Field label="Height" value="450" unit="mm" />
          <Field label="Rotation" value="0" unit="°" />
        </div>
      </div>
    </>
  );
}

export function CanvasScreen({
  className,
  state = "room",
}: {
  className?: string;
  state?: CanvasState;
}) {
  return (
    <div
      className={cn(
        "product-ink flex flex-col bg-card text-foreground",
        className,
      )}
      style={{ fontFamily: UI_FONT }}
      aria-hidden
    >
      <QuoteHeader />
      <Toolbar />
      <div className="flex">
        <div className="dot-grid min-w-0 flex-1 px-5 py-5 md:px-8 md:py-7">
          <Drawing state={state} />
        </div>
        <aside className="hidden w-72 shrink-0 flex-col border-l border-black/[0.07] bg-card text-[12px] sm:flex">
          {state === "cutout" ? <CutoutInspector /> : <RoomInspector />}
          <TotalRow>$927.51</TotalRow>
        </aside>
      </div>
      <RoomsBar />
    </div>
  );
}
