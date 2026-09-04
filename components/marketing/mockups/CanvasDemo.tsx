"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { Check, ChevronRight, Info, Plus, Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CanvasScreen } from "./CanvasScreen";
import {
  A,
  A_RECT,
  B,
  CUTOUT,
  INK,
  UI_FONT,
  VIEWBOX,
  type Pt,
  centroid,
  mid,
  outward,
  pathOf,
} from "./canvas/geometry";
import {
  Chip,
  Cutout,
  Dim,
  EdgeLabel,
  FONT,
  Hatch,
  JoinTag,
  MATERIALS,
  PieceLetter,
  PlusButton,
  QuoteHeader,
  RoomsBar,
  SectionLabel,
  Select,
  Toggle,
  Toolbar,
  TotalRow,
} from "./canvas/primitives";

/**
 * The quote builder, building quote Q-50 the way a customer does: add a top,
 * choose the materials, set the front edge, hang a return off it at 45°,
 * drop the sink in. Every screen, popover, option list and running total is
 * taken from the product; the sequence is the one Ash recorded on
 * app.gonyro.com.
 *
 * A step clock drives everything: `STEPS` is the storyboard, each element
 * derives its state from where the clock is, and Motion animates between
 * states. It plays while in view and loops. Reduced-motion users get the
 * finished static screen instead.
 */

/* ── storyboard ─────────────────────────────────────────────────────────── */

const STEPS = [
  { id: "empty", hold: 1100, cursor: "rest" },
  { id: "to-add-piece", hold: 650, cursor: "add-piece" },
  { id: "add-piece-open", hold: 1500, cursor: "add-piece", click: true },
  { id: "add-piece-submit", hold: 500, cursor: "add-to-canvas", click: true },
  { id: "piece-a", hold: 1700, cursor: "add-to-canvas" },
  { id: "to-surface", hold: 550, cursor: "sel-surface" },
  { id: "surface-open", hold: 800, cursor: "sel-surface", click: true },
  { id: "surface-pick", hold: 650, cursor: "opt-surface", click: true },
  { id: "to-thickness", hold: 500, cursor: "sel-thickness" },
  { id: "thickness-open", hold: 800, cursor: "sel-thickness", click: true },
  { id: "thickness-pick", hold: 650, cursor: "opt-thickness", click: true },
  { id: "to-substrate", hold: 500, cursor: "sel-substrate" },
  { id: "substrate-open", hold: 700, cursor: "sel-substrate", click: true },
  { id: "substrate-pick", hold: 650, cursor: "opt-substrate", click: true },
  { id: "to-top-edge", hold: 700, cursor: "edge-top" },
  { id: "edge-select", hold: 900, cursor: "edge-top", click: true },
  { id: "profile-open", hold: 800, cursor: "sel-profile", click: true },
  { id: "profile-pick", hold: 650, cursor: "opt-profile", click: true },
  { id: "to-plus", hold: 1100, cursor: "plus" },
  { id: "plus-click", hold: 900, cursor: "plus", click: true },
  { id: "direction-pick", hold: 900, cursor: "arrow-45", click: true },
  { id: "new-top-form", hold: 1500, cursor: "new-top-length" },
  { id: "new-top-add", hold: 500, cursor: "new-top-add", click: true },
  { id: "piece-b", hold: 2200, cursor: "new-top-add" },
  { id: "to-add-cutout", hold: 650, cursor: "add-cutout" },
  { id: "add-cutout-open", hold: 900, cursor: "add-cutout", click: true },
  { id: "cutout-pick", hold: 650, cursor: "opt-cutout", click: true },
  { id: "cutout-added", hold: 1500, cursor: "opt-cutout" },
  { id: "deselect", hold: 700, cursor: "canvas-blank", click: true },
  { id: "rest", hold: 4500, cursor: "rest" },
] as const;

type StepId = (typeof STEPS)[number]["id"];
const INDEX = Object.fromEntries(STEPS.map((s, i) => [s.id, i])) as Record<
  StepId,
  number
>;

/* ── small helpers ──────────────────────────────────────────────────────── */

const money = (v: number) =>
  "$" +
  v.toLocaleString("en-NZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const ease = [0.22, 1, 0.36, 1] as const;

/** Text that types itself in while `active`. Remount (key) to reset. */
function Typed({ text, active }: { text: string; active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setInterval(
      () => setN((v) => (v >= text.length ? v : v + 1)),
      55,
    );
    return () => clearInterval(t);
  }, [active, text]);
  return (
    <>
      {text.slice(0, n)}
      {active && n < text.length && (
        <span className="ml-px inline-block h-3 w-px animate-pulse bg-foreground align-middle" />
      )}
    </>
  );
}

const pop = {
  initial: { opacity: 0, scale: 0.96, y: -4 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: -2 },
  transition: { duration: 0.18, ease },
} as const;

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease },
} as const;

/** The builder's direction compass, measured from its screen: block
    arrows in slate, the vertical pair riding the edge, the other three
    fanned off it. Each entry is the arrow's base relative to the edge
    midpoint and its rotation from "up". */
const COMPASS = [
  { deg: 0, dx: 0, dy: -62 },
  { deg: 180, dx: 0, dy: 62 },
  { deg: 90, dx: 69, dy: 0 },
  { deg: 45, dx: 51, dy: -51 },
  { deg: 135, dx: 51, dy: 51 },
] as const;
/** The direction the return takes: south-east. */
const CHOSEN = 135;
/** A block arrow pointing up, base at the origin, in drawing millimetres. */
const ARROW = "M-18 0 V-70 H-46 L0 -130 L46 -70 H18 V0 Z";

function Dropdown({
  search,
  options,
  picked,
  optionRef,
  className,
}: {
  search: string;
  options: (string | { group: string })[];
  picked: string;
  optionRef: (el: HTMLElement | null) => void;
  className?: string;
}) {
  return (
    <motion.div
      {...pop}
      className={cn(
        "absolute left-0 right-0 top-[calc(100%+4px)] z-20 rounded-lg border border-black/[0.08] bg-card p-1.5 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.25)]",
        className,
      )}
    >
      <span className="flex h-8 items-center gap-1.5 rounded-md border border-foreground/80 px-2 text-[11.5px] text-foreground/40">
        <Search className="size-3" />
        {search}
      </span>
      <ul className="mt-1.5 max-h-56 space-y-px overflow-hidden">
        {options.map((o) =>
          typeof o === "string" ? (
            <li
              key={o}
              ref={o === picked ? optionRef : undefined}
              className={cn(
                "flex h-7 items-center justify-between gap-2 whitespace-nowrap rounded-md px-2 text-[12px]",
                o === picked && "bg-stage",
              )}
            >
              <span className="truncate">{o}</span>
              {o === picked && <Check className="size-3 shrink-0" />}
            </li>
          ) : (
            <li
              key={`g-${o.group}`}
              className="px-2 pb-0.5 pt-1.5 text-[10.5px] text-foreground/45"
            >
              {o.group}
            </li>
          ),
        )}
      </ul>
    </motion.div>
  );
}

/* ── the demo ───────────────────────────────────────────────────────────── */

export function CanvasDemo({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <CanvasScreen className={className} />;
  return <Demo className={className} />;
}

function Demo({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const [i, setI] = useState(0);
  const step = STEPS[i];

  /* the clock: advance while in view; a paused clock resumes where it was */
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setI((v) => (v + 1) % STEPS.length), step.hold);
    return () => clearTimeout(t);
  }, [i, inView, step.hold]);

  const after = (id: StepId) => i >= INDEX[id];
  const at = (...ids: StepId[]) => (ids as readonly string[]).includes(step.id);
  const between = (from: StepId, to: StepId) =>
    i >= INDEX[from] && i <= INDEX[to];

  /* ── derived state ── */
  const hasA = after("piece-a");
  const hasB = after("piece-b");
  const hasCutout = after("cutout-added");
  const surfaceSet = after("to-thickness");
  const thicknessSet = after("to-substrate");
  const substrateSet = after("to-top-edge");
  const fullRoll = after("to-plus");
  const addPieceOpen = at("add-piece-open", "add-piece-submit");
  const surfaceOpen = at("surface-open", "surface-pick");
  const thicknessOpen = at("thickness-open", "thickness-pick");
  const substrateOpen = at("substrate-open", "substrate-pick");
  const profileOpen = at("profile-open", "profile-pick");
  const topEdgeSelected = between("edge-select", "to-plus");
  const panel: "room" | "edge" | "piece" = between("edge-select", "to-plus")
    ? "edge"
    : between("plus-click", "cutout-added")
      ? "piece"
      : "room";
  const addMode = between("plus-click", "new-top-add");
  const compass = at("plus-click", "direction-pick");
  const ghostB = between("direction-pick", "new-top-add");
  const newTopForm = at("new-top-form", "new-top-add");
  const aSelected = between("plus-click", "cutout-added");
  const pickerOpen = at("add-cutout-open", "cutout-pick");

  /* ── running total: only figures the product actually produced ── */
  const totalTarget = hasCutout
    ? 927.51
    : hasB
      ? 837.51
      : fullRoll
        ? 387.59
        : null;
  const total = useMotionValue(0);
  const totalText = useTransform(total, (v) => money(v));
  useEffect(() => {
    if (totalTarget == null) {
      total.set(0);
      return;
    }
    const c = animate(total, totalTarget, { duration: 0.9, ease: "easeOut" });
    return () => c.stop();
  }, [totalTarget, total]);

  /* ── A's right edge becomes the mitre the instant B lands, as in the
        product: the join is a recompute, not a motion ── */
  const dA = pathOf(hasB ? A : A_RECT);

  /* ── cursor: follows named targets measured from the live DOM ── */
  const targets = useRef(new Map<string, Element>());
  const reg = useCallback(
    (id: string) => (el: Element | null) => {
      if (el) targets.current.set(id, el);
      else targets.current.delete(id);
    },
    [],
  );
  const [cursor, setCursor] = useState({ x: 0, y: 0, ready: false });
  const [ripple, setRipple] = useState(0);
  useLayoutEffect(() => {
    const root = rootRef.current;
    const el = targets.current.get(step.cursor);
    if (!root || !el) return;
    const r = root.getBoundingClientRect();
    const t = el.getBoundingClientRect();
    setCursor({
      x: t.left - r.left + t.width / 2,
      y: t.top - r.top + t.height / 2,
      ready: true,
    });
  }, [i, step.cursor]);
  useEffect(() => {
    if (!("click" in step) || !step.click) return;
    const t = setTimeout(() => setRipple((v) => v + 1), 330);
    return () => clearTimeout(t);
  }, [i, step]);

  /* geometry for the canvas overlays */
  const joinMid = mid(A[1], A[2]);
  const rightMid = mid(A_RECT[1], A_RECT[2]);
  const bEnd = mid(B[1], B[2]);
  const [ex, ey] = outward(B[1], B[2]);
  const plusAt: Pt = hasB
    ? [bEnd[0] + ex * 420, bEnd[1] + ey * 420]
    : [rightMid[0] + 260, rightMid[1] - 220];
  const { x, y, w, h } = CUTOUT;

  return (
    <div
      ref={rootRef}
      className={cn(
        "product-ink relative flex flex-col bg-card text-foreground",
        className,
      )}
      style={{ fontFamily: UI_FONT }}
      aria-hidden
    >
      <QuoteHeader />

      <Toolbar addPieceRef={reg("add-piece")} addPieceActive={addPieceOpen}>
        <AnimatePresence>
          {addPieceOpen && (
            <motion.div
              {...pop}
              className="absolute left-0 top-[calc(100%+6px)] z-30 w-[300px] rounded-xl border border-black/[0.08] bg-card p-4 text-[12px] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.3)]"
            >
              <p className="text-[13px] font-semibold">Add standalone piece</p>
              <p className="mt-2 leading-snug text-foreground/55">
                Creates an independent piece (island, splashback, etc). To add a
                connected return piece, select an edge on the canvas and press
                the ⊕ button that appears.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="block text-foreground/70">Length (mm)</span>
                  <span className="mt-1 flex h-8 items-center rounded-md border border-foreground px-2.5">
                    <Typed text="1400" active={addPieceOpen} />
                  </span>
                </label>
                <label className="block">
                  <span className="block text-foreground/70">Depth (mm)</span>
                  <span className="mt-1 flex h-8 items-center rounded-md border border-black/[0.09] px-2.5">
                    600
                  </span>
                </label>
              </div>
              <span
                ref={reg("add-to-canvas")}
                className="mt-3.5 flex h-8 items-center justify-center rounded-full bg-foreground text-[12.5px] font-medium text-card"
              >
                Add to canvas
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </Toolbar>

      <div className="flex">
        {/* ── canvas ── */}
        <div className="dot-grid relative min-w-0 flex-1 px-5 py-5 md:px-8 md:py-7">
          <svg viewBox={VIEWBOX} className="block h-auto w-full">
            <defs>
              <Hatch id="demo-hatch-a" angle={45} />
              <Hatch id="demo-hatch-b" angle={0} />
            </defs>

            {/* blank-canvas click target and the cursor's resting spot */}
            <circle
              ref={reg("canvas-blank")}
              cx={600}
              cy={1500}
              r={1}
              fill="none"
            />
            <circle ref={reg("rest")} cx={1200} cy={1950} r={1} fill="none" />

            {/* ── piece A ── */}
            {hasA && (
              <g>
                <motion.path
                  d={dA}
                  fill={aSelected ? INK.selected : "#ffffff"}
                  stroke="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                />
                <motion.path
                  d={dA}
                  fill="url(#demo-hatch-a)"
                  stroke="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                />
                <motion.path
                  d={dA}
                  fill="none"
                  stroke={aSelected ? INK.text : INK.borderStrong}
                  strokeWidth={aSelected ? 1.5 : 2}
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease }}
                />
                {/* rotation handle: rises from the top edge while A is selected */}
                <AnimatePresence>
                  {(aSelected || topEdgeSelected) && (
                    <motion.g {...fade} transition={{ duration: 0.2 }}>
                      <line
                        x1={700}
                        y1={0}
                        x2={700}
                        y2={-290}
                        stroke={INK.text}
                        strokeWidth="1.25"
                        vectorEffect="non-scaling-stroke"
                      />
                      <circle cx={700} cy={-290} r={24} fill={INK.text} />
                    </motion.g>
                  )}
                </AnimatePresence>

                <motion.g {...fade} transition={{ duration: 0.4, delay: 0.7 }}>
                  <PieceLetter at={[hasB ? 860 : 700, 300]}>A</PieceLetter>
                </motion.g>
                <motion.g {...fade} transition={{ duration: 0.4, delay: 0.85 }}>
                  <EdgeLabel
                    from={A[0]}
                    to={A[1]}
                    label={fullRoll ? "Full roll" : "Raw"}
                    italic={topEdgeSelected}
                  />
                  <EdgeLabel from={A[3]} to={A[0]} label="Raw" />
                  {hasB ? (
                    <EdgeLabel from={A[2]} to={A[3]} label="Raw" />
                  ) : (
                    <>
                      <EdgeLabel from={A_RECT[2]} to={A_RECT[3]} label="Raw" />
                      {!compass && !ghostB && (
                        <EdgeLabel
                          from={A_RECT[1]}
                          to={A_RECT[2]}
                          label="Raw"
                        />
                      )}
                    </>
                  )}
                  <Dim
                    from={A[0]}
                    to={A[1]}
                    offset={180}
                    label={topEdgeSelected ? "1400mm" : "1400"}
                    pill={topEdgeSelected}
                  />
                  <Dim from={A[3]} to={A[0]} offset={170} label="600" />
                  {!hasB && !compass && !ghostB && (
                    <Dim
                      from={A_RECT[1]}
                      to={A_RECT[2]}
                      offset={170}
                      label="600"
                    />
                  )}
                </motion.g>
              </g>
            )}

            {/* selected top edge: heavy line, mid handle, live length */}
            <AnimatePresence>
              {topEdgeSelected && (
                <motion.g {...fade} transition={{ duration: 0.2 }}>
                  <line
                    x1={A[0][0]}
                    y1={A[0][1]}
                    x2={A[1][0]}
                    y2={A[1][1]}
                    stroke={INK.text}
                    strokeWidth="2.5"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle cx={700} cy={0} r={26} fill={INK.text} />
                  {/* the other edges' handles */}
                  {[
                    mid(A_RECT[1], A_RECT[2]),
                    mid(A_RECT[2], A_RECT[3]),
                    mid(A_RECT[3], A_RECT[0]),
                  ].map(([hx, hy]) => (
                    <rect
                      key={`${hx}-${hy}`}
                      x={hx - 22}
                      y={hy - 16}
                      width={44}
                      height={32}
                      rx={10}
                      fill="#ffffff"
                      stroke={INK.text}
                      strokeWidth="1.25"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </motion.g>
              )}
            </AnimatePresence>
            {/* click target on the top edge (invisible) */}
            <circle ref={reg("edge-top")} cx={700} cy={0} r={1} fill="none" />

            {/* piece A selected: corner dots, Sharp chips, edge handles */}
            <AnimatePresence>
              {aSelected && (
                <motion.g {...fade} transition={{ duration: 0.2 }}>
                  {(hasB ? A : A_RECT).map(([cx, cy], k) => (
                    <g key={k}>
                      <circle cx={cx} cy={cy} r={14} fill={INK.text} />
                      {
                        <g
                          transform={`translate(${cx + (k === 0 || k === 3 ? -150 : 150)} ${cy + (k <= 1 ? -95 : 95)})`}
                        >
                          <rect
                            x={-95}
                            y={-34}
                            width={190}
                            height={68}
                            rx={34}
                            fill={INK.secondary}
                          />
                          <text
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#ffffff"
                            style={{ ...FONT, fontSize: 36, fontWeight: 600 }}
                          >
                            Sharp
                          </text>
                        </g>
                      }
                    </g>
                  ))}
                  {[
                    mid(A[0], A[1]),
                    mid(A[3], A[0]),
                    hasB ? mid(A[2], A[3]) : mid(A_RECT[2], A_RECT[3]),
                  ].map(([hx, hy]) => (
                    <rect
                      key={`${hx}-${hy}`}
                      x={hx - 22}
                      y={hy - 16}
                      width={44}
                      height={32}
                      rx={10}
                      fill="#ffffff"
                      stroke={INK.text}
                      strokeWidth="1.25"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </motion.g>
              )}
            </AnimatePresence>

            {/* ⊕ add a connected piece */}
            <AnimatePresence>
              {hasA && !compass && !ghostB && (
                <motion.g
                  key={hasB ? "plus-b" : "plus-a"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.6,
                    transition: { duration: 0.15 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: hasB ? 0.6 : 1.1,
                  }}
                  style={{ transformOrigin: `${plusAt[0]}px ${plusAt[1]}px` }}
                >
                  <PlusButton at={plusAt} />
                </motion.g>
              )}
            </AnimatePresence>
            {!hasB && (
              <circle
                ref={reg("plus")}
                cx={plusAt[0]}
                cy={plusAt[1]}
                r={1}
                fill="none"
              />
            )}

            {/* direction compass on A's right edge, as the product draws
                it; the arrow under the cursor darkens */}
            <AnimatePresence>
              {compass && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.25, ease }}
                  style={{
                    transformOrigin: `${rightMid[0]}px ${rightMid[1]}px`,
                  }}
                >
                  {COMPASS.map(({ deg, dx, dy }) => (
                    <path
                      key={deg}
                      d={ARROW}
                      fill={
                        deg === CHOSEN && at("direction-pick")
                          ? INK.text
                          : INK.secondary
                      }
                      transform={`translate(${rightMid[0] + dx} ${rightMid[1] + dy}) rotate(${deg})`}
                    />
                  ))}
                  <circle
                    cx={rightMid[0]}
                    cy={rightMid[1]}
                    r={20}
                    fill={INK.text}
                  />
                  {at("direction-pick") && (
                    <text
                      x={rightMid[0]}
                      y={rightMid[1] - 245}
                      textAnchor="middle"
                      fill={INK.text}
                      style={{ ...FONT, fontSize: 40, fontWeight: 600 }}
                    >
                      Right 45°
                    </text>
                  )}
                </motion.g>
              )}
            </AnimatePresence>
            <circle
              ref={reg("arrow-45")}
              cx={rightMid[0] + 110}
              cy={rightMid[1] + 110}
              r={1}
              fill="none"
            />

            {/* ghost of the return before it's confirmed */}
            <AnimatePresence>
              {ghostB && (
                <motion.path
                  d={pathOf(B)}
                  {...fade}
                  fill={INK.ghost}
                  fillOpacity={0.78}
                  stroke={INK.borderStrong}
                  strokeWidth="1.5"
                  strokeDasharray="40 26"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              )}
            </AnimatePresence>

            {/* ── piece B ── */}
            {hasB && (
              <g>
                <path d={pathOf(B)} fill="#ffffff" stroke="none" />
                <path d={pathOf(B)} fill="url(#demo-hatch-b)" stroke="none" />
                <path
                  d={pathOf(B)}
                  fill="none"
                  stroke={INK.borderStrong}
                  strokeWidth="2"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                <motion.g {...fade} transition={{ duration: 0.3, delay: 0.15 }}>
                  <PieceLetter at={centroid(B)} rotate={45}>
                    B
                  </PieceLetter>
                  <EdgeLabel from={B[0]} to={B[1]} label="Raw" />
                  <EdgeLabel from={B[1]} to={B[2]} label="Raw" />
                  <EdgeLabel from={B[2]} to={B[3]} label="Raw" />
                  <Dim from={A[2]} to={A[3]} offset={170} label="1151" />
                  <Dim from={B[0]} to={B[1]} offset={170} label="2100" />
                  <Dim from={B[2]} to={B[3]} offset={170} label="1851" />
                  <Dim from={B[1]} to={B[2]} offset={170} label="600" />
                </motion.g>
                <motion.g {...fade} transition={{ duration: 0.3, delay: 0.3 }}>
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
                  <Dim
                    from={A[0]}
                    to={[B[1][0], 0]}
                    offset={330}
                    label="2885"
                  />
                </motion.g>
                <motion.g
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                    delay: 0.25,
                  }}
                  style={{
                    transformOrigin: `${joinMid[0] + 190}px ${joinMid[1]}px`,
                  }}
                >
                  <JoinTag at={joinMid} />
                </motion.g>
              </g>
            )}

            {/* ── the sink ── */}
            {hasCutout && (
              <g>
                <motion.g
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease }}
                  style={{ transformOrigin: `${x + w / 2}px ${y + h / 2}px` }}
                >
                  <Cutout x={x} y={y} w={w} h={h} />
                </motion.g>
                <motion.g {...fade} transition={{ duration: 0.4, delay: 0.35 }}>
                  <Dim
                    from={[x, y]}
                    to={[x + w, y]}
                    offset={y + 100}
                    label="450"
                  />
                  <Dim
                    from={[x + w, y]}
                    to={[x + w, y + h]}
                    offset={100}
                    label="450"
                  />
                  <Dim
                    from={[x, 600]}
                    to={[0, 600]}
                    offset={350}
                    label="77"
                    labelShift={-150}
                  />
                  <Dim
                    from={[0, 600]}
                    to={[0, y + h]}
                    offset={360}
                    label="60"
                    labelShift={130}
                  />
                </motion.g>
              </g>
            )}
          </svg>

          {/* "New top" form, floated beside A's right edge */}
          <AnimatePresence>
            {newTopForm && (
              <motion.div
                {...pop}
                className="absolute z-30 w-[240px] rounded-xl border border-black/[0.08] bg-card p-4 text-[12px] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.3)]"
                style={{ left: "55%", top: "30%" }}
              >
                <p className="text-[13px] font-semibold">New top</p>
                <SectionLabel className="mt-3">Length (mm)</SectionLabel>
                <span
                  ref={reg("new-top-length")}
                  className="mt-1 flex h-8 items-center rounded-md border border-foreground px-2.5"
                >
                  <Typed text="2100" active={newTopForm} />
                </span>
                <SectionLabel className="mt-2.5">Width (mm)</SectionLabel>
                <span className="mt-1 flex h-8 items-center rounded-md border border-black/[0.09] px-2.5">
                  600
                </span>
                <SectionLabel className="mt-2.5">Connection</SectionLabel>
                <Select value="SITE" className="mt-1 flex-none" />
                <div className="mt-3.5 flex items-center justify-end gap-3">
                  <span className="text-[12.5px] font-medium">Cancel</span>
                  <span
                    ref={reg("new-top-add")}
                    className="flex h-8 items-center rounded-full bg-foreground px-4 text-[12.5px] font-medium text-card"
                  >
                    Add
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── inspector ── */}
        <aside className="relative hidden w-72 shrink-0 flex-col border-l border-black/[0.07] bg-card text-[12px] sm:flex">
          <AnimatePresence mode="wait" initial={false}>
            {panel === "room" && (
              <motion.div
                key="room"
                {...fade}
                transition={{ duration: 0.18 }}
                className="flex flex-col"
              >
                <div className="flex items-center justify-between px-4 pb-3 pt-3.5">
                  <span className="flex items-center gap-2 text-[13.5px] font-semibold">
                    <span className="h-4 w-[3px] rounded-full bg-foreground" />
                    Kitchen
                  </span>
                  <Chip>Room</Chip>
                </div>

                <div className="border-t border-black/[0.07] px-4 pb-3 pt-3">
                  <SectionLabel>Pieces</SectionLabel>
                  {!hasA ? (
                    <p className="mt-2 rounded-lg border border-dashed border-black/[0.12] px-3 py-3 text-center leading-snug text-foreground/50">
                      No pieces yet. Use &ldquo;Add piece&rdquo; in the toolbar
                      above to draw the first one.
                    </p>
                  ) : (
                    <ul className="mt-2 space-y-1">
                      {(["A", "B"] as const)
                        .filter((l) => l === "A" || hasB)
                        .map((letter) => (
                          <motion.li
                            key={letter}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, ease, delay: 0.6 }}
                            className="flex items-center gap-2.5 py-0.5"
                          >
                            <span className="flex size-4 items-center justify-center rounded-full bg-stage text-[9.5px] font-semibold text-foreground/70">
                              {letter}
                            </span>
                            <span className="font-medium">Benchtop</span>
                            <span className="ml-auto text-foreground/50">
                              {letter === "A" ? "1400 × 600mm" : "2100 × 600mm"}
                            </span>
                            <ChevronRight className="size-3 text-foreground/35" />
                          </motion.li>
                        ))}
                    </ul>
                  )}
                </div>

                <div className="border-t border-black/[0.07] px-4 pb-4 pt-3">
                  <div className="flex items-center justify-between">
                    <SectionLabel>Materials</SectionLabel>
                    <span className="text-[10.5px] text-foreground/45">
                      Whole room
                    </span>
                  </div>
                  <div className="mt-2.5 space-y-2">
                    <div className="relative flex items-center gap-3">
                      <span className="w-[4.6rem] shrink-0 text-foreground/70">
                        Surface
                      </span>
                      <Select
                        ref={reg("sel-surface")}
                        value={surfaceSet ? MATERIALS.surface.value : "Not set"}
                        hint={surfaceSet ? MATERIALS.surface.hint : undefined}
                        className={cn(
                          surfaceOpen && "border-foreground",
                          !surfaceSet && "text-foreground/45",
                        )}
                      />
                      <AnimatePresence>
                        {surfaceOpen && (
                          <Dropdown
                            search="Search materials…"
                            options={[
                              { group: "Laminex" },
                              "Basalt NT",
                              "Oyster Grey",
                              "Fossil",
                              { group: "Formica" },
                              "Natural Oak",
                            ]}
                            picked="Basalt NT"
                            optionRef={reg("opt-surface")}
                            className="left-[5.35rem]"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="relative flex items-center gap-3">
                      <span className="flex w-[4.6rem] shrink-0 items-center gap-1 text-foreground/70">
                        Thickness <Info className="size-3 text-foreground/35" />
                      </span>
                      <Select
                        ref={reg("sel-thickness")}
                        value={
                          thicknessSet ? MATERIALS.thickness.value : "Not set"
                        }
                        className={cn(
                          thicknessOpen && "border-foreground",
                          !thicknessSet && "text-foreground/45",
                        )}
                      />
                      <AnimatePresence>
                        {thicknessOpen && (
                          <Dropdown
                            search="Search…"
                            options={[
                              "18 mm — 18 substrate",
                              "30 mm — 30 substrate",
                              "36 mm — 36 substrate",
                              "39 mm — 30 base + 9",
                              "48 mm — 30 base + 18",
                            ]}
                            picked="39 mm — 30 base + 9"
                            optionRef={reg("opt-thickness")}
                            className="left-[5.35rem]"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="relative flex items-center gap-3">
                      <span className="flex w-[4.6rem] shrink-0 items-center gap-1 text-foreground/70">
                        Substrate <Info className="size-3 text-foreground/35" />
                      </span>
                      <Select
                        ref={reg("sel-substrate")}
                        value={
                          substrateSet ? MATERIALS.substrate.value : "Not set"
                        }
                        className={cn(
                          substrateOpen && "border-foreground",
                          !substrateSet && "text-foreground/45",
                        )}
                      />
                      <AnimatePresence>
                        {substrateOpen && (
                          <Dropdown
                            search="Search…"
                            options={["MDF", "Particleboard", "Plywood"]}
                            picked="MDF"
                            optionRef={reg("opt-substrate")}
                            className="left-[5.35rem]"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex w-[4.6rem] shrink-0 items-center gap-1 text-foreground/70">
                        Underside <Info className="size-3 text-foreground/35" />
                      </span>
                      <Select value={MATERIALS.underside.value} />
                    </div>
                  </div>
                  <div className="mt-3.5 flex items-center justify-between gap-3">
                    <span className="leading-tight">
                      <span className="block text-foreground/80">
                        Room quantity
                      </span>
                      <span className="block text-[10.5px] text-foreground/45">
                        copies of this whole room
                      </span>
                    </span>
                    <span className="flex h-8 w-14 items-center rounded-md border border-black/[0.09] px-2.5">
                      1
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {panel === "edge" && (
              <motion.div
                key="edge"
                {...fade}
                transition={{ duration: 0.18 }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-1 px-4 pt-3.5 text-[11.5px] text-foreground/60">
                  Kitchen <ChevronRight className="size-3 text-foreground/35" />
                  Benchtop{" "}
                  <ChevronRight className="size-3 text-foreground/35" />
                </div>
                <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-2">
                  <span className="flex items-center gap-2 text-[13.5px] font-semibold">
                    <span className="h-4 w-[3px] rounded-full bg-foreground" />
                    Top edge
                  </span>
                  <span className="flex gap-1.5">
                    <Chip>Edge</Chip>
                    <Chip>1400mm</Chip>
                  </span>
                </div>
                <div className="space-y-2 border-t border-black/[0.07] px-4 pb-3 pt-3">
                  <div className="flex items-center gap-3">
                    <span className="flex w-[4.6rem] shrink-0 items-center gap-1 text-foreground/70">
                      Treatment <Info className="size-3 text-foreground/35" />
                    </span>
                    <Select value="Edge profile" />
                  </div>
                  <div className="relative flex items-center gap-3">
                    <span className="w-[4.6rem] shrink-0 text-foreground/70">
                      Profile
                    </span>
                    <Select
                      ref={reg("sel-profile")}
                      value={fullRoll ? "Full roll" : "Raw"}
                      className={cn(profileOpen && "border-foreground")}
                    />
                    <AnimatePresence>
                      {profileOpen && (
                        <Dropdown
                          search="Search…"
                          options={[
                            "Coved upstand clashed top",
                            "Dropfront side HPL clashed",
                            "Dropfront side Raw",
                            "Edgetape SQ edge",
                            "Full roll",
                            "HPL SQ edge",
                            "Loose clashing",
                          ]}
                          picked="Full roll"
                          optionRef={reg("opt-profile")}
                          className="left-[5.35rem]"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  <span className="inline-block rounded-full border border-black/[0.09] px-2.5 py-1 text-[11.5px]">
                    Split profile
                  </span>
                </div>
                <div className="border-t border-black/[0.07] px-4 pb-3 pt-3">
                  <SectionLabel>Underside</SectionLabel>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-foreground/80">
                      HPL strip <Info className="size-3 text-foreground/35" />
                    </span>
                    <Toggle />
                  </div>
                </div>
                <div className="border-t border-black/[0.07] px-4 pb-4 pt-3">
                  <SectionLabel>Outline</SectionLabel>
                  <div className="mt-2 flex gap-2">
                    <span className="rounded-full border border-black/[0.09] px-2.5 py-1 text-[11.5px]">
                      Notch
                    </span>
                    <span className="rounded-full border border-black/[0.09] px-2.5 py-1 text-[11.5px]">
                      Insert point
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {panel === "piece" && (
              <motion.div
                key="piece"
                {...fade}
                transition={{ duration: 0.18 }}
                className="flex flex-col"
              >
                <AnimatePresence>
                  {addMode && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease }}
                      className="overflow-hidden border-b border-black/[0.07] bg-stage/60 text-[11.5px] leading-snug"
                    >
                      <span className="block px-4 py-3">
                        Add piece mode active. Choose a direction on the canvas
                        to place the next piece.
                      </span>
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="flex items-center justify-between px-4 pt-3.5 text-[11.5px] text-foreground/60">
                  <span className="flex items-center gap-1">
                    Kitchen{" "}
                    <ChevronRight className="size-3 text-foreground/35" />
                  </span>
                  <Trash2 className="size-3.5 text-[#dc2626]/75" />
                </div>
                <div className="px-4 pb-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[13.5px] font-semibold">
                      <span className="h-4 w-[3px] rounded-full bg-foreground" />
                      Benchtop
                    </span>
                    <Chip>Piece</Chip>
                  </div>
                  <p className="mt-1.5 pl-[11px] text-[11px] leading-snug text-foreground/50">
                    1,400 × 600mm · 0.84 m²
                    <br />
                    Basalt NT · MDF · 39mm
                  </p>
                </div>
                <div className="border-t border-black/[0.07] px-4 pb-3 pt-3">
                  <SectionLabel>Underside</SectionLabel>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-foreground/80">
                      Full underside{" "}
                      <Info className="size-3 text-foreground/35" />
                    </span>
                    <Toggle />
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="w-[4.6rem] shrink-0 truncate text-foreground/70">
                      Underside mat…
                    </span>
                    <Select value="Room default — not set" />
                  </div>
                </div>
                <div className="relative border-t border-black/[0.07] px-4 pb-4 pt-3">
                  <div className="flex items-center justify-between">
                    <SectionLabel>Features</SectionLabel>
                    {hasCutout && (
                      <span className="flex items-center gap-1 rounded-full border border-black/[0.09] px-2 py-0.5 text-[11px]">
                        <Plus className="size-3" /> Add cutout
                      </span>
                    )}
                  </div>
                  {hasCutout ? (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="mt-2 flex items-center gap-2.5 py-0.5"
                    >
                      <span className="size-3 rounded-[3px] border border-foreground/50" />
                      <span className="font-medium">AA402 Aurora</span>
                      <span className="ml-auto text-foreground/50">
                        450 × 450mm
                      </span>
                      <ChevronRight className="size-3 text-foreground/35" />
                    </motion.div>
                  ) : (
                    <div className="mt-2 rounded-lg border border-dashed border-black/[0.12] px-3 py-3 text-center">
                      <span className="mx-auto block size-4 rounded-[3px] border border-dashed border-foreground/40" />
                      <p className="mt-2 leading-snug text-foreground/50">
                        No cutouts yet — add a sink or hob to have it priced and
                        cut.
                      </p>
                      <span
                        ref={reg("add-cutout")}
                        className={cn(
                          "mt-2.5 inline-flex items-center gap-1 rounded-full border border-black/[0.09] bg-card px-2.5 py-1 text-[11.5px]",
                          pickerOpen && "border-foreground",
                        )}
                      >
                        <Plus className="size-3" /> Add cutout
                      </span>
                    </div>
                  )}

                  {/* cutout picker opens leftwards over the canvas */}
                  <AnimatePresence>
                    {pickerOpen && (
                      <motion.div
                        {...pop}
                        className="absolute right-4 top-2 z-30 w-[300px] rounded-xl border border-black/[0.08] bg-card p-2 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.3)]"
                      >
                        <span className="flex h-8 items-center gap-1.5 rounded-md border border-foreground/80 px-2 text-[11.5px] text-foreground/40">
                          <Search className="size-3" />
                          Search cutouts…
                        </span>
                        <SectionLabel className="mt-2.5 px-2">
                          Recently used
                        </SectionLabel>
                        <ul className="mt-1 space-y-px">
                          {[
                            ["AA402 Aurora", "Over-mount", "450×450"],
                            ["560 x 480 Hob", "", "480×560"],
                            ["100mm Hole", "", "100×100"],
                          ].map(([n, s, d]) => (
                            <li
                              key={n}
                              className="flex items-center gap-2.5 rounded-md px-2 py-1.5"
                            >
                              <span className="flex size-6 items-center justify-center rounded-md border border-black/[0.09]">
                                <span className="size-2.5 rounded-[2px] border border-foreground/50" />
                              </span>
                              <span className="leading-tight">
                                <span className="block font-medium">{n}</span>
                                {s && (
                                  <span className="block text-[10.5px] text-foreground/50">
                                    {s}
                                  </span>
                                )}
                              </span>
                              <span className="ml-auto text-[11px] text-foreground/50">
                                {d}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <SectionLabel className="mt-2 px-2">Sinks</SectionLabel>
                        <ul className="mt-1 space-y-px">
                          {[
                            ["AA402 Aurora", "Under-mount", "450×450", true],
                            ["AA403 Aurora", "Over-mount", "450×450", false],
                          ].map(([n, s, d, hi]) => (
                            <li
                              key={n as string}
                              ref={hi ? reg("opt-cutout") : undefined}
                              className={cn(
                                "flex items-center gap-2.5 rounded-md px-2 py-1.5",
                                hi && "bg-stage",
                              )}
                            >
                              <span className="flex size-6 items-center justify-center rounded-md border border-black/[0.09] bg-card">
                                <span className="size-2.5 rounded-[2px] border border-foreground/50" />
                              </span>
                              <span className="leading-tight">
                                <span className="block font-medium">{n}</span>
                                <span className="block text-[10.5px] text-foreground/50">
                                  {s}
                                </span>
                              </span>
                              <span className="ml-auto text-[11px] text-foreground/50">
                                {d}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <TotalRow>
            {totalTarget == null ? (
              <span className="text-foreground/35">—</span>
            ) : (
              <motion.span>{totalText}</motion.span>
            )}
          </TotalRow>
        </aside>
      </div>

      <RoomsBar />

      {/* ── the cursor ── */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-40"
        initial={false}
        animate={{ x: cursor.x, y: cursor.y, opacity: cursor.ready ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.7 }}
      >
        <AnimatePresence>
          {ripple > 0 && (
            <motion.span
              key={ripple}
              initial={{ opacity: 0.35, scale: 0.4 }}
              animate={{ opacity: 0, scale: 1.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute -left-3 -top-3 size-6 rounded-full bg-foreground"
            />
          )}
        </AnimatePresence>
        <svg
          viewBox="0 0 16 20"
          className="-ml-[3px] -mt-[2px] size-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
        >
          <path
            d="M2 1.5 L2 15.5 L5.6 12.4 L8.2 18.2 L10.8 17 L8.3 11.4 L13 11.4 Z"
            fill="#fff"
            stroke="#111"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
