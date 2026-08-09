import { Section } from "@/components/marketing/primitives/Section";
import { SectionHeading } from "@/components/marketing/primitives/SectionHeading";
import { Reveal } from "@/components/marketing/primitives/Reveal";

const ENGINE_MODULES = [
  "Quote canvas",
  "Geometry",
  "Pricing engine",
  "Catalog",
  "Orders",
  "DXF / CNC export",
] as const;

const GUARANTEES = [
  {
    title: "Upgrades are a flag flip",
    body: "A fabricator on the Customer Portal is the same tenant as one on the full platform - fewer modules turned on. Moving up means switching modules on. No data migration, no re-onboarding, no second system.",
  },
  {
    title: "Pricing is never stale",
    body: "Retailer quotes read each fabricator's catalog and pricing live, scoped to what that fabricator agreed to share. Change a price and every in-flight quote re-prices - there is no sync and no copy to drift.",
  },
  {
    title: "Tenants stay separate",
    body: "Every fabricator and retailer owns its own isolated data. The only cross-tenant flow is deliberate: an approved retailer quote crossing over to a fabricator as an incoming order, priced as agreed.",
  },
] as const;

/** The "one platform underneath" story: three surfaces over one engine. */
export function PlatformBand() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="One platform"
            title="Different surfaces, one foundation."
            sub="Building three quoting engines would be a waste. The products share what's underneath and keep their audiences apart - a trade portal, a factory floor and a retail counter don't want the same screens."
          />

          <dl className="mt-10 space-y-7">
            {GUARANTEES.map((item) => (
              <Reveal key={item.title} className="border-l-2 border-brand/40 pl-5">
                <dt className="font-medium text-foreground">{item.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* The stack diagram: three product tiles feeding one engine bar. */}
        <Reveal className="lg:col-span-7" y={24}>
          <div className="blueprint-grid flex h-full flex-col justify-center gap-4 rounded-2xl border border-border bg-secondary/60 p-6 sm:p-10">
            <div className="grid gap-3 sm:grid-cols-3">
              {(
                [
                  ["Customer Portal", "Trade customers quoting in", "border-ink-customer/40", "text-ink-customer"],
                  ["Fabrication Platform", "Staff, production, dispatch", "border-ink-fabricator/40", "text-ink-fabricator"],
                  ["Retailer Platform", "Stores quoting homeowners", "border-ink-retailer/40", "text-ink-retailer"],
                ] as const
              ).map(([name, sub, border, ink]) => (
                <div
                  key={name}
                  className={`rounded-xl border ${border} bg-card p-4 shadow-sm`}
                >
                  <p className={`label-mono text-[0.6rem] ${ink}`}>Surface</p>
                  <p className="mt-1.5 text-sm font-semibold text-foreground">
                    {name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>

            {/* connectors */}
            <div aria-hidden className="grid grid-cols-3 px-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex justify-center">
                  <span className="h-6 w-px border-l border-dashed border-foreground/30" />
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-surface-dark p-5 text-surface-dark-foreground">
              <p className="label-mono text-[0.6rem] text-surface-dark-foreground/60">
                One engine · one codebase · one database
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {ENGINE_MODULES.map((module) => (
                  <li
                    key={module}
                    className="flex items-center gap-2 text-sm text-surface-dark-foreground/90"
                  >
                    <span aria-hidden className="size-1.5 rounded-full bg-sage" />
                    {module}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
