# nyro-marketing

Marketing site for Nyro — the quoting and order platform for
benchtop fabricators. Next.js 16 (App Router) · TypeScript · Tailwind v4 ·
shadcn/ui · MDX.

## Pages

| Route | What it sells |
|---|---|
| `/` | The three products and the one-platform story |
| `/customer` | Customer Portal — self-serve quoting for a fabricator's trade customers |
| `/fabricator` | Fabrication Platform — the full lifecycle on one system |
| `/retailer` | Retailer Platform — in-store quoting routed across the fabricator network |
| `/pricing` | Contact-led pricing, per product tier |
| `/about` | Nyro + the BeautyCraft origin story |
| `/blog` | MDX field notes (`content/blog/`) |
| `/contact` | Book a demo |

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm lint       # ESLint
pnpm typecheck  # tsc --noEmit
```

## Environment

- `NEXT_PUBLIC_SITE_URL` — canonical marketing origin. Defaults to
  `https://gonyro.com`. Set on the host.
- `NEXT_PUBLIC_GA_ID` — GA4 measurement ID (production scope only).
- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` — HubSpot tracking + cookie banner.
- `NEXT_PUBLIC_BOOKING_URL` — overrides the primary CTA destination
  (defaults to `mailto:hello@gonyro.com`).

All measurement is env-gated: with nothing set, the site runs clean for local
dev and previews.

## Domains

The apex `gonyro.com` serves this marketing site. The platform app sits on
`app.gonyro.com`, and each tenant gets its own subdomain
(e.g. `beautycraft.gonyro.com`).

## Brand assets

`app/icon.svg` is the source of truth for the mark. Regenerate every raster
(favicons, PWA icons, `public/logo.png`) with:

```bash
node scripts/generate-icons.mjs
```

See `CLAUDE.md` / `AGENTS.md` for project conventions.
