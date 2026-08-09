import { ImageResponse } from "next/og";

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
const OLIVE = "#6f8747";

const PRODUCTS = ["Customer Portal", "Fabrication Platform", "Retailer Platform"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title") ?? "Benchtop quoting, priced as they draw";
  const subtitle =
    searchParams.get("subtitle") ??
    "Self-serve quoting for your trade customers, a full fabrication platform behind it.";

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

        {/* Lockup: L-shaped benchtop glyph + wordmark. */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 5.5 a1.5 1.5 0 0 1 1.5 -1.5 h8 a1.5 1.5 0 0 1 1.5 1.5 v6 a1 1 0 0 0 1 1 h2.5 a1.5 1.5 0 0 1 1.5 1.5 v4.5 a1.5 1.5 0 0 1 -1.5 1.5 h-13 a1.5 1.5 0 0 1 -1.5 -1.5 z"
              fill={OLIVE}
            />
            <path
              d="M4 1.75 v2.5 M15 1.75 v2.5 M4 3 h11"
              stroke="rgba(244,243,236,0.4)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontFamily: "Archivo",
              fontSize: 46,
              letterSpacing: "-0.03em",
            }}
          >
            engage
          </div>
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
