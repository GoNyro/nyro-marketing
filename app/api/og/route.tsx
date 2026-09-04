import { ImageResponse } from "next/og";
import {
  DIMENSION,
  WORDMARK,
  WORDMARK_PATH,
  WORDMARK_VIEWBOX,
} from "@/lib/brand";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

/*
 * Satori (the renderer behind next/og) has no access to the browser's fonts or
 * to next/font's build output, so anything not passed in `fonts` falls back to
 * its bundled default. The TTFs are colocated and loaded through
 * `new URL(..., import.meta.url)` so Next bundles them into the edge function;
 * they must be TTF/OTF because Satori cannot decode WOFF2.
 */
const assets = Promise.all([
  fetch(new URL("./fonts/Archivo-Display.ttf", import.meta.url)).then((r) =>
    r.arrayBuffer(),
  ),
  fetch(new URL("./fonts/InstrumentSans-Regular.ttf", import.meta.url)).then(
    (r) => r.arrayBuffer(),
  ),
]);

const INK = "#20241f";
const STONE = "#f4f3ec";
const MUTED = "rgba(244,243,236,0.62)";
const FAINT = "rgba(244,243,236,0.42)";
// Rendered height of the lockup; width follows the viewBox ratio.
const WORDMARK_HEIGHT = 56;

const PRODUCTS = ["Customer Portal", "Fabrication Platform", "Retailer Platform"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title") ?? "Quote, make and sell benchtops on one platform";
  const subtitle =
    searchParams.get("subtitle") ??
    "Your customers quote themselves. Your factory runs on the same job. Retailers quote in store.";

  const [archivo, instrument] = await assets;

  // Long titles would otherwise overflow the card; step the display size down
  // rather than letting Satori clip the last line.
  const titleSize = title.length > 64 ? 58 : title.length > 44 ? 66 : 74;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 80px",
          background: INK,
          color: STONE,
          fontFamily: "Instrument Sans",
        }}
      >
        {/* Olive glow, bled off the right edge. */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: -200,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(111,135,71,0.28), rgba(111,135,71,0))",
            display: "flex",
          }}
        />

        {/* Lockup: the measured wordmark. Satori has no non-scaling-stroke,
            so the measurer's widths are fixed in font units here. */}
        <div style={{ display: "flex" }}>
          <svg
            width={WORDMARK_HEIGHT * (1989 / 1040)}
            height={WORDMARK_HEIGHT}
            viewBox={WORDMARK_VIEWBOX}
            fill="none"
          >
            <path d={WORDMARK_PATH} fill={STONE} />
            <path
              d={`M0 ${-WORDMARK.xHeight - DIMENSION.gap}V${DIMENSION.y - DIMENSION.overshoot}M${WORDMARK.width} ${-WORDMARK.xHeight - DIMENSION.gap}V${DIMENSION.y - DIMENSION.overshoot}M0 ${DIMENSION.y}H${WORDMARK.width}`}
              stroke={FAINT}
              strokeWidth="22"
            />
            <path
              d={`M${-DIMENSION.tick} ${DIMENSION.y + DIMENSION.tick}L${DIMENSION.tick} ${DIMENSION.y - DIMENSION.tick}M${WORDMARK.width - DIMENSION.tick} ${DIMENSION.y + DIMENSION.tick}L${WORDMARK.width + DIMENSION.tick} ${DIMENSION.y - DIMENSION.tick}`}
              stroke={FAINT}
              strokeWidth="34"
            />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Archivo",
              fontSize: titleSize,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: 920,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 27,
              lineHeight: 1.35,
              color: MUTED,
              maxWidth: 820,
            }}
          >
            {subtitle}
          </div>

          {/* Product strip. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 44,
              fontSize: 19,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: FAINT,
            }}
          >
            {PRODUCTS.map((product, i) => (
              <div key={product} style={{ display: "flex", gap: 14 }}>
                {i > 0 ? <div style={{ display: "flex" }}>·</div> : null}
                <div style={{ display: "flex" }}>{product}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Archivo",
          data: archivo,
          weight: 700,
          style: "normal",
        },
        { name: "Instrument Sans", data: instrument, weight: 400, style: "normal" },
      ],
      headers: {
        // Unfurl caches (Slack, LinkedIn, X) hammer this on every share. Keyed
        // by query string, so a long CDN life is safe; kept revalidatable so a
        // design change isn't frozen at the edge for a year.
        "cache-control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
