import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { cn } from "@/lib/utils";

/**
 * The six-station strip under the hero: bold verb, muted object, top rule.
 * Reads as the platform's table of contents.
 */

const STATIONS = [
  { verb: "Quote", rest: "drawn by the customer", href: "/customer" },
  { verb: "Price", rest: "live, from your rules", href: "/customer" },
  { verb: "Approve", rest: "with one link", href: "/customer" },
  { verb: "Export", rest: "DXF & CNC-ready", href: "/customer" },
  { verb: "Produce", rest: "on the factory floor", href: "/fabricator" },
  { verb: "Analyze", rest: "margin & lead time", href: "/fabricator" },
] as const;

export function TabStrip({ className }: { className?: string }) {
  return (
    <Container className={cn("py-2", className)}>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
        {STATIONS.map((station) => (
          <li key={station.verb}>
            <Link
              href={station.href}
              className="group block border-t border-surface-dark-foreground/25 pt-3 transition-colors hover:border-surface-dark-foreground/60"
            >
              <span className="block text-sm font-medium text-surface-dark-foreground">
                {station.verb}
              </span>
              <span className="mt-0.5 block text-sm text-surface-dark-foreground/50 transition-colors group-hover:text-surface-dark-foreground/70">
                {station.rest}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
