import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/marketing/Container";
import { cn } from "@/lib/utils";

/**
 * The six-station strip under the hero: bold verb, muted object, top rule.
 * Reads as the platform's table of contents - the life of a benchtop, in
 * the order it happens. Each station names the product that owns it, so
 * the reader knows where the link goes before clicking (three stations
 * belong to the Customer Portal, two to the Fabrication Platform, one to
 * the Retailer Platform).
 */

const STATIONS = [
  {
    verb: "Quote",
    rest: "drawn by the customer",
    product: "Customer Portal",
    href: "/customer",
  },
  {
    verb: "Price",
    rest: "as they draw, from your rules",
    product: "Customer Portal",
    href: "/customer",
  },
  {
    verb: "Approve",
    rest: "with one link, no login",
    product: "Customer Portal",
    href: "/customer",
  },
  {
    verb: "Make",
    rest: "on your machines",
    product: "Fabrication Platform",
    href: "/fabricator",
  },
  {
    verb: "Deliver",
    rest: "zones, runs, proof",
    product: "Fabrication Platform",
    href: "/fabricator",
  },
  {
    verb: "Sell",
    rest: "in store, through retailers",
    product: "Retailer Platform",
    href: "/retailer",
  },
] as const;

export function TabStrip({ className }: { className?: string }) {
  return (
    <Container className={cn("py-2", className)}>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
        {STATIONS.map((station) => (
          <li key={station.verb}>
            <Link
              href={station.href}
              aria-label={`${station.verb}: ${station.rest}. ${station.product}`}
              className="group flex h-full flex-col border-t border-surface-dark-foreground/25 pt-3 transition-colors hover:border-surface-dark-foreground/60"
            >
              <span className="flex items-center justify-between text-sm font-medium text-surface-dark-foreground">
                {station.verb}
                <ArrowUpRight
                  aria-hidden
                  className="size-3.5 text-surface-dark-foreground/35 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-bright"
                />
              </span>
              <span className="mt-0.5 block text-sm text-surface-dark-foreground/50 transition-colors group-hover:text-surface-dark-foreground/70">
                {station.rest}
              </span>
              <span className="label-mono mt-auto pt-3 text-[0.6rem] text-surface-dark-foreground/35 transition-colors group-hover:text-brand-bright">
                {station.product}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
