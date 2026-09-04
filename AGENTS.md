<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## What this site is

The marketing site for **Nyro** — the platform for quoting, making and
selling benchtops. Three products, one platform:

- `/customer` — Customer Portal (for fabricators): their customers quote
  themselves. The fabricator controls catalog, pricing per customer, what each
  customer can draw, and delivery pricing. Approved jobs hand over to whatever
  the fabricator already uses to run production.
- `/fabricator` — Fabrication Platform (for fabricators): everything in the
  portal plus the factory itself — production queue, programs for CNC
  machines, floor tablets, stock, delivery runs, invoicing. No other
  production software needed.
- `/retailer` — Retailer Platform (for retailers): store staff quote a
  customer in store into any fabricator on Nyro, add their own margin, put
  their logo and colours on everything the customer sees, manage their own
  customers (link-based approvals, no login) and deliveries, and watch the
  order come back.

Product truth lives in `engage-online-api/docs/products-overview.md`,
`vision.md` and `plans/2026-05-18-retailer-portal-mvp-roadmap.md` (sibling
repo). Don't invent capabilities, customers or metrics. **Never name
BeautyCraft on the site** — Nyro and BeautyCraft are kept as separate
entities until a case study is agreed. The origin story is "built by people
who have run a benchtop factory", with no company named. Mockup account
labels use fictional names (e.g. "Harbour Benchtops").

## Voice

Write for fabricators, retailers and the marketers who sell to them. Every
product is described as fully built and in use. No developer vocabulary on
the site: never "tenant", "module", "flag", "surface", "geometry record",
"codebase", "database", "sync", "snapshot", "API". Say "account", "switch
on", "the drawing", "the job", "always current", "locked". "DXF", "CNC" and
"machine-ready files" are fine on fabricator pages only — fabricators use
those words. Retailer pages say "trade price" (never "wholesale tier") and
"margin" (never "markup").

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
- `scripts/process-photos.mjs` — crops, desaturates and grains source photography into `public/photos/*.webp`. Originals are not committed; sources and licences are listed in the script header.
- `mdx-components.tsx` — global MDX component overrides.

## Design system (DOSS register, Nyro-tinted)

Reference: doss.com's professionalism - near-black ink sections, warm-gray
light sections, one sparing accent, realistic product-UI mockups.

- Surfaces: `surface-dark` (ink, with `.ink-grid` masked drafting grid;
  `.ink-dots` is the dot-grid alternative) for
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
  device; `CanvasScreen` is a faithful replica of the product's quote
  builder for quote Q-50 - two benchtops on a 45° mitre - set in DM Sans
  (the product's face, loaded as `--font-dm-sans` for mockups only). It
  carries its own quote bar, so wrap it in `AppWindow chrome="none"`, and
  has two states: `room` (home) and `cutout` (customer page) - don't show
  the same state twice. When the builder changes, re-shoot it and update
  the replica rather than inventing UI), `IsoStack` (hero isometric), `PlaceholderSlab` (deliberate gaps
  for photography/testimonial sessions).
- No scroll-entrance animation above the fold - heroes render statically.
  The one exception is the home hero's `CanvasDemo`: a product
  demonstration loop (Motion, client island) that builds quote Q-50 step by
  step from the product's real screens and running totals. It is content,
  not a reveal; it plays only in view and falls back to the static
  `CanvasScreen` under reduced motion. Storyboard lives in `STEPS` in
  `components/marketing/mockups/CanvasDemo.tsx`; shared drawing and chrome
  vocabulary in `components/marketing/mockups/canvas/`.
- Logo: the measured wordmark (`Wordmark` in `components/marketing/Logo.tsx`,
  geometry in `lib/brand.ts`) - "nyro" outlined from Archivo SemiBold with a
  shop-drawing dimension line over it. The favicon is the waterfall-n glyph
  (`GLYPH_PATH`) on an ink tile. Static exports live in `public/logo.svg` and
  `public/logo-cream.svg`; run `scripts/generate-icons.mjs` after changing
  `app/icon.svg`.
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
