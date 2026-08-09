<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## What this site is

The marketing site for **Engage** (by **Nyro**) — the quoting and order
platform for benchtop fabricators. Three products, one platform:

- `/customer` — Customer Portal: self-serve quoting for a fabricator's trade customers (first to market).
- `/fabricator` — Fabrication Platform: the full lifecycle (quote → production → dispatch).
- `/retailer` — Retailer Platform: in-store quoting routed across the fabricator network.

Product truth lives in `engage-online-api/docs/products-overview.md` (sibling
repo). Don't invent capabilities, customers or metrics — BeautyCraft is the
founding fabricator and the only named tenant.

## Project layout (skeleton)

- `app/(marketing)/` — public marketing routes (home, customer, fabricator, retailer, pricing, about, contact, blog, legal). All share `Nav` + `Footer` via the route-group layout.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` — auto-generated SEO files. The sitemap walks `content/blog/` for posts.
- `app/api/og/route.tsx` — dynamic OG image generator. Pass `?title=…&subtitle=…`.
- `app/layout.tsx` — root layout. Injects `Organization` + `WebSite` JSON-LD on every page.
- `content/blog/*.mdx` — blog posts. Frontmatter drives metadata, sitemap, and `Article` schema.
- `lib/site.ts` — canonical site config (name, url, socials, nav). Edit this first when branding changes.
- `lib/seo.ts` — `buildMetadata()` helper. Use on every page.
- `lib/schema.ts` — JSON-LD builders (`articleSchema`, `faqPageSchema`, `breadcrumbSchema`, etc.).
- `lib/mdx.ts` — MDX loader (frontmatter, reading time).
- `components/seo/JsonLd.tsx` — typed JSON-LD renderer; wrap structured data in this.
- `components/marketing/` — `Nav`, `Footer`, `Container`, `sections/`, `mockups/` (AppWindow, QuotesTable, CanvasScreen) and `visuals/IsoStack`. shadcn primitives in `components/ui/`.
- `app/llms.txt/`, `app/llms-full.txt/` — AI crawler hint routes. Update when content changes.
- `scripts/generate-icons.mjs` — regenerates favicons/PWA icons from `app/icon.svg`.
- `mdx-components.tsx` — global MDX component overrides.

## Design system (DOSS register, Engage-tinted)

Reference: doss.com's professionalism - near-black ink sections, warm-gray
light sections, one sparing accent, realistic product-UI mockups.

- Surfaces: `surface-dark` (ink, with `.ink-grid` diagonal survey lines) for
  nav, heroes, product stories, footer; `surface-gray` / `surface-cream` for
  editorial sections; white only for cards and app mockups.
- Buttons are monochrome pills (`BookCta`: primary ink / inverse white /
  secondary border / ghost-dark). Olive is decorative + links only
  (`brand-bright` on dark).
- Type: one grotesque voice - Archivo at medium weight, tight, sentence case
  with a full stop. Body Instrument Sans; IBM Plex Mono for tiny technical
  labels (`.label-mono`), always muted.
- Patterns: `FeatureRows` (hairline rows, never icon-card grids), `SlimCta`
  (statement left, one pill right - never a billboard band), `TabStrip`,
  `ProductStack` (dark, side menu + iso cubes), `AppWindow` +
  `QuotesTable`/`CanvasScreen` (pixel-realistic mockups - the credibility
  device), `IsoStack` (hero isometric), `PlaceholderSlab` (deliberate gaps
  for photography/testimonial sessions).
- No scroll-entrance animation above the fold - heroes render statically.
- Tokens live in `app/globals.css`. Mockup-only status hues are
  `--status-good/warm/cool` (+ `-ink` text variants).

## Conventions

- **Every page** calls `buildMetadata({ title, description, path })`. This handles canonical, OG, Twitter, robots.
- **Every page** renders a `<JsonLd data={breadcrumbSchema([...])} />` block. Blog posts also render `articleSchema(...)`. FAQ sections render `faqPageSchema(...)`.
- Add `data-speakable` to the main lede paragraph — `Article.speakable` schema picks it up for voice/AI answer surfaces.
- Static-first: avoid client components on marketing pages unless required.
- `params` and `searchParams` are `Promise<…>` in Next.js 16 — always `await` them.
- No fabricated proof: no fake logos, testimonials or metrics. Pricing is contact-led.

## Commands

- `pnpm dev` — start dev server (Turbopack).
- `pnpm build` — production build.
- `pnpm lint` — ESLint.
- `pnpm typecheck` — tsc.
