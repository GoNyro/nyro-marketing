import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/marketing/Container";
import { Lockup } from "@/components/marketing/Logo";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="surface-dark relative overflow-hidden border-t border-surface-dark-foreground/10">
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label={`${siteConfig.name} home`}
              className="inline-flex items-center"
            >
              <Lockup tone="cream" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-surface-dark-foreground/60">
              The quoting and order platform for benchtop fabricators. Your
              customers draw the job, Nyro prices it live, and the order
              flows through to the factory floor.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 lg:col-span-7 lg:justify-items-end">
            {siteConfig.footerNav.map((group) => (
              <div key={group.heading}>
                <h3 className="label-mono text-[0.65rem] text-surface-dark-foreground/40">
                  {group.heading}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-surface-dark-foreground/75 transition-colors hover:text-surface-dark-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-surface-dark-foreground/10 pt-7 text-xs text-surface-dark-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {siteConfig.legal.entity}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors hover:text-surface-dark-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-surface-dark-foreground"
            >
              Terms
            </Link>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-surface-dark-foreground"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="transition-colors hover:text-surface-dark-foreground"
            >
              {siteConfig.contactEmail}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
