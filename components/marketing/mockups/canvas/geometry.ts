/**
 * Quote Q-50's geometry, in millimetres, as the builder holds it: piece A at
 * 1400 × 600 on 0°, piece B at 2100 × 600 on 45°, joined on a mitre. Every
 * number here is read off the product, not invented.
 */

export type Pt = readonly [number, number];

/** Piece A before B is attached - a plain rectangle. */
export const A_RECT: readonly Pt[] = [
  [0, 0],
  [1400, 0],
  [1400, 600],
  [0, 600],
];

/** Piece A once B hangs off it - the right edge becomes the mitre. */
export const A: readonly Pt[] = [
  [0, 0],
  [1400, 0],
  [1151, 600],
  [0, 600],
];

/* B shares A's mitre: long edges run 2100 (outer) and 1851 (inner) at 45°,
   the far end is the 600 width. */
export const B: readonly Pt[] = [
  [1400, 0],
  [2885, 1485],
  [2460, 1909],
  [1151, 600],
];

/** The AA402 Aurora sink cutout in A: 450 square, 77 from the left, 60 from the bottom. */
export const CUTOUT = { x: 77, y: 90, w: 450, h: 450 } as const;

/** Drawing viewBox: hugs the dimensioned drawing with an even margin. */
export const VIEWBOX = "-480 -400 3580 2520";

/** The builder's colours, read from engage-online-ui's app.css tokens. */
export const INK = {
  text: "#131129",
  secondary: "#555670",
  muted: "#8a8ca0",
  faint: "#b8bac8",
  border: "#d0d2dc",
  borderStrong: "#a6a8b8",
  subtle: "#f4f5f8",
  selected: "#ececf2",
  ghost: "#e4e5eb",
  cutout: "#f5f4ef",
} as const;

export const UI_FONT =
  "var(--font-dm-sans), var(--font-sans), system-ui, sans-serif";

export function pathOf(points: readonly Pt[]) {
  return (
    points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ") +
    " Z"
  );
}

/** Angle of p1→p2 in degrees, folded so text never reads upside-down. */
export function readingAngle(p1: Pt, p2: Pt) {
  let a = (Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180) / Math.PI;
  if (a > 90) a -= 180;
  if (a < -90) a += 180;
  return a;
}

/** Outward unit normal for an edge of a clockwise (screen-space) polygon. */
export function outward(p1: Pt, p2: Pt): Pt {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const len = Math.hypot(dx, dy);
  return [dy / len, -dx / len];
}

export function mid(p1: Pt, p2: Pt): Pt {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
}

export function centroid(points: readonly Pt[]): Pt {
  const n = points.length;
  return [
    points.reduce((s, p) => s + p[0], 0) / n,
    points.reduce((s, p) => s + p[1], 0) / n,
  ];
}
