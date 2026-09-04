/*
 * Brand geometry shared by the Logo component, the OG image and the icon
 * script. Everything is vector so the mark renders identically in the nav,
 * on a quote PDF and in a social card, with no dependency on font loading.
 *
 * The wordmark is "nyro" outlined from Archivo SemiBold at -0.03em tracking
 * (the same setting the site's display type uses). Units are font units:
 * 1000 per em, baseline at y = 0, y negative upwards. Ink starts at x = 0.
 */

export const WORDMARK_PATH =
  "M0 0L0 -526L102 -526L112 -456L119 -456Q137 -480 161.5 -498.5Q186 -517 217.5 -527.5Q249 -538 287 -538Q337 -538 375.5 -520Q414 -502 436 -462Q458 -422 458 -355L458 0L335 0L335 -333Q335 -361 328.5 -379.5Q322 -398 309.5 -409.5Q297 -421 279 -426Q261 -431 239 -431Q206 -431 179.5 -415Q153 -399 137.5 -371Q122 -343 122 -306L122 0ZM624 182Q587 182 564 176.5Q541 171 538 170L538 83L594 83Q615 83 636 72Q657 61 674 42Q691 23 699 0L494 -526L622 -526L720 -274Q727 -257 734.5 -231Q742 -205 750 -177.5Q758 -150 763 -128L768 -128Q772 -143 777 -162Q782 -181 787.5 -201Q793 -221 799 -240Q805 -259 809 -273L889 -526L1013 -526L837 -27Q822 15 803.5 53Q785 91 760.5 120Q736 149 702.5 165.5Q669 182 624 182ZM1053 0L1053 -526L1155 -526L1165 -443L1172 -443Q1182 -468 1196.5 -489.5Q1211 -511 1234 -524.5Q1257 -538 1290 -538Q1306 -538 1319.5 -535Q1333 -532 1340 -529L1340 -414L1303 -414Q1272 -414 1248 -405.5Q1224 -397 1207.5 -379Q1191 -361 1183 -334Q1175 -307 1175 -271L1175 0ZM1609 12Q1523 12 1465 -17.5Q1407 -47 1378 -108Q1349 -169 1349 -263Q1349 -358 1378 -418.5Q1407 -479 1465 -508.5Q1523 -538 1609 -538Q1696 -538 1753.5 -508.5Q1811 -479 1840 -418.5Q1869 -358 1869 -263Q1869 -169 1840 -108Q1811 -47 1753.5 -17.5Q1696 12 1609 12ZM1609 -88Q1657 -88 1686.5 -106.5Q1716 -125 1729.5 -162.5Q1743 -200 1743 -256L1743 -270Q1743 -326 1729.5 -363.5Q1716 -401 1686.5 -419.5Q1657 -438 1609 -438Q1561 -438 1531.5 -419.5Q1502 -401 1488.5 -363.5Q1475 -326 1475 -270L1475 -256Q1475 -200 1488.5 -162.5Q1502 -125 1531.5 -106.5Q1561 -88 1609 -88Z";

/** Ink extents of the outlined word, in font units. */
export const WORDMARK = {
  width: 1869,
  xHeight: 526,
  descender: 190,
} as const;

/*
 * The measurer: a shop-drawing dimension across the word. Extension lines
 * rise from the first and last ink edge with a small gap from the letters,
 * the dimension line spans them, and each end carries an architectural 45°
 * tick rather than an arrowhead.
 */
export const DIMENSION = {
  /** y of the dimension line (negative = above baseline). */
  y: -760,
  /** Gap between the top of the letters and the start of an extension line. */
  gap: 70,
  /** How far an extension line runs past the dimension line. */
  overshoot: 60,
  /** Half-length of the oblique tick, per axis. */
  tick: 45,
} as const;

/** viewBox that frames the wordmark plus its measurer, with tick clearance. */
export const WORDMARK_VIEWBOX = "-60 -840 1989 1040";

/*
 * The mark: a benchtop island in section. One slab across the top, two
 * waterfall returns to the floor. Outer corners carry a pencil-round edge
 * profile; inner corners stay sharp like a mitred join. Reads as an "n".
 * Drawn on a 24-unit grid; ink spans 3..21 on both axes.
 */
export const GLYPH_PATH =
  "M3 5.5a2.5 2.5 0 0 1 2.5-2.5h13a2.5 2.5 0 0 1 2.5 2.5V21h-4.5V7.5h-9V21H3z";
