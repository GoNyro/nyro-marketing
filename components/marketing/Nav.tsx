"use client";

import * as React from "react";
import Link from "next/link";
import { NavigationMenu } from "radix-ui";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV, siteConfig, type NavEntry } from "@/lib/site";
import { Logo } from "@/components/marketing/Logo";
import { BookCta } from "@/components/marketing/primitives/BookCta";
import { cn } from "@/lib/utils";
import { useIsomorphicReducedMotion } from "@/lib/use-reduced-motion";

/* Dark chrome: the bar and its panels live on the ink surface. */

const triggerClass =
  "group flex cursor-pointer items-center gap-1.5 rounded-md text-sm font-medium text-surface-dark-foreground/85 outline-none transition-colors hover:text-surface-dark-foreground focus-visible:text-surface-dark-foreground data-[state=open]:text-surface-dark-foreground";

const plainLinkClass =
  "text-sm font-medium text-surface-dark-foreground/85 transition-colors hover:text-surface-dark-foreground";

/* Editorial intro for each mega-menu's left column. */
const MENU_INTRO: Record<string, { label: string; title: string }> = {
  Products: {
    label: "The platform",
    title: "Three products, one quoting engine",
  },
  Company: {
    label: "Company",
    title: "Proven on a real factory floor",
  },
};

function DropdownPanel({
  entry,
}: {
  entry: Extract<NavEntry, { groups: unknown }>;
}) {
  const intro = MENU_INTRO[entry.label] ?? { label: entry.label, title: "" };
  const cols = Math.max(entry.groups.length, 2);

  return (
    <div className="w-full border-b border-surface-dark-foreground/10 bg-surface-dark text-surface-dark-foreground shadow-[0_32px_64px_-32px_rgba(0,0,0,0.5)]">
      <div className="mx-auto w-full max-w-6xl">
        <div
          className="grid gap-x-8 px-4 py-10 sm:px-6 lg:px-8"
          style={{ gridTemplateColumns: `1.25fr repeat(${cols}, 1fr)` }}
        >
          <div className="pr-4">
            <p className="label-mono text-[0.65rem] text-surface-dark-foreground/50">
              {intro.label}
            </p>
            <p className="mt-4 max-w-[15rem] text-xl font-medium leading-snug tracking-tight">
              {intro.title}
            </p>
          </div>
          {entry.groups.map((group) => (
            <div
              key={group.heading}
              className="border-l border-surface-dark-foreground/10 pl-8"
            >
              <p className="label-mono text-[0.65rem] text-surface-dark-foreground/50">
                {group.heading}
              </p>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <NavigationMenu.Link asChild>
                      <Link href={link.href} className="group/link block">
                        <span className="block text-sm leading-snug text-surface-dark-foreground/75 transition-colors group-hover/link:text-surface-dark-foreground">
                          {link.label}
                        </span>
                        {link.description ? (
                          <span className="mt-0.5 block text-xs text-surface-dark-foreground/45">
                            {link.description}
                          </span>
                        ) : null}
                      </Link>
                    </NavigationMenu.Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {Array.from({ length: cols - entry.groups.length }).map((_, i) => (
            <div
              key={i}
              aria-hidden
              className="border-l border-surface-dark-foreground/10"
            />
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-surface-dark-foreground/10 px-4 py-4 sm:px-6 lg:px-8">
          <NavigationMenu.Link asChild>
            <Link
              href="/contact#book"
              className="text-sm font-medium text-surface-dark-foreground transition-colors hover:text-brand-bright"
            >
              Book a demo →
            </Link>
          </NavigationMenu.Link>
          {entry.footerLink ? (
            <NavigationMenu.Link asChild>
              <Link
                href={entry.footerLink.href}
                className="text-sm text-surface-dark-foreground/60 transition-colors hover:text-surface-dark-foreground"
              >
                {entry.footerLink.label}
              </Link>
            </NavigationMenu.Link>
          ) : (
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-surface-dark-foreground/60 transition-colors hover:text-surface-dark-foreground"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function DesktopNav() {
  const reduced = useIsomorphicReducedMotion();
  const [openMenu, setOpenMenu] = React.useState("");

  return (
    <NavigationMenu.Root
      aria-label="Primary"
      className="hidden lg:flex"
      delayDuration={100}
      value={openMenu}
      onValueChange={setOpenMenu}
    >
      <NavigationMenu.List className="flex items-center gap-7">
        {NAV.map((item) =>
          "href" in item ? (
            <NavigationMenu.Item key={item.href}>
              <NavigationMenu.Link asChild>
                <Link href={item.href} className={plainLinkClass}>
                  {item.label}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item key={item.label} value={item.label}>
              <NavigationMenu.Trigger className={triggerClass}>
                {item.label}
                <ChevronDown
                  aria-hidden
                  className="size-3 text-surface-dark-foreground/50 transition-transform duration-200 group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="w-full">
                <DropdownPanel entry={item} />
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ),
        )}
      </NavigationMenu.List>

      {/* Scrim below the open panel. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-full h-screen w-screen -translate-x-1/2 bg-black/40 transition-opacity duration-300",
          openMenu ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="absolute left-1/2 top-full w-screen -translate-x-1/2">
        <NavigationMenu.Viewport
          className={cn(
            "relative w-full overflow-hidden",
            "h-[var(--radix-navigation-menu-viewport-height)]",
            !reduced &&
              "duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          )}
        />
      </div>
    </NavigationMenu.Root>
  );
}

function MobileGroup({
  item,
  onNavigate,
}: {
  item: Extract<NavEntry, { groups: unknown }>;
  onNavigate: () => void;
}) {
  const flatten = item.groups.length === 1;

  return (
    <div className="py-2">
      <p className="label-mono px-3 text-surface-dark-foreground/50">
        {item.label}
      </p>
      <div className="mt-2 flex flex-col gap-3">
        {item.groups.map((group) => (
          <div key={group.heading}>
            {!flatten ? (
              <p className="label-mono px-3 text-[0.65rem] text-surface-dark-foreground/35">
                {group.heading}
              </p>
            ) : null}
            <div className="mt-1 flex flex-col gap-1">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onNavigate}
                  className="rounded-lg px-3 py-2 text-base font-medium text-surface-dark-foreground/85 transition-colors hover:bg-surface-dark-foreground/10 hover:text-surface-dark-foreground"
                >
                  {link.label}
                  {link.description ? (
                    <span className="block text-xs font-normal text-surface-dark-foreground/45">
                      {link.description}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {item.footerLink ? (
        <Link
          href={item.footerLink.href}
          onClick={onNavigate}
          className="mt-2 block rounded-lg px-3 py-2 text-sm font-medium text-brand-bright transition-colors hover:bg-surface-dark-foreground/10"
        >
          {item.footerLink.label}
        </Link>
      ) : null}
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  // The bar slides away scrolling down, returns the instant you scroll up.
  React.useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 16);

      const delta = y - lastY;
      if (Math.abs(delta) > 4) {
        setHidden(y > 72 && delta > 0);
        lastY = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHidden = hidden && !open;

  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-transform duration-300 ease-out",
        isHidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div
        className={cn(
          "surface-dark relative transition-colors duration-300",
          scrolled || open ? "bg-surface-dark/95 backdrop-blur-md" : "",
        )}
      >
        <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 lg:gap-12">
            <Logo tone="cream" />
            <DesktopNav />
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href={siteConfig.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm font-medium text-surface-dark-foreground/70 transition-colors hover:text-surface-dark-foreground lg:inline-flex"
            >
              Sign in
            </a>
            <BookCta
              label="Book a demo"
              variant="inverse"
              size="default"
              className="inline-flex"
            />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-surface-dark-foreground transition-colors hover:bg-surface-dark-foreground/10 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          hidden={!open}
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-surface-dark-foreground/10 lg:hidden"
        >
          <nav
            aria-label="Mobile"
            className="mx-auto flex max-w-6xl flex-col divide-y divide-surface-dark-foreground/10 px-4 py-2 sm:px-6"
          >
            {NAV.map((item) =>
              "href" in item ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-surface-dark-foreground/85 transition-colors hover:bg-surface-dark-foreground/10 hover:text-surface-dark-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <MobileGroup
                  key={item.label}
                  item={item}
                  onNavigate={() => setOpen(false)}
                />
              ),
            )}
            <div className="flex flex-col gap-1 py-2">
              <a
                href={siteConfig.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-3 py-2.5 text-base font-medium text-surface-dark-foreground/85 transition-colors hover:bg-surface-dark-foreground/10 hover:text-surface-dark-foreground"
              >
                Sign in
              </a>
              <div className="px-3 pt-3">
                <BookCta variant="inverse" className="w-full" />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
