import { Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoGlyph } from "@/components/marketing/Logo";

/**
 * The app-window chrome every product mockup sits in: top bar with the mark,
 * a search field, and account chrome. Deliberately pixel-quiet - the point
 * is that it reads as a real product screen, not an illustration.
 */
export function AppWindow({
  className,
  children,
  tenant = "BeautyCraft",
}: {
  className?: string;
  children: React.ReactNode;
  tenant?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-card text-card-foreground shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)] ring-1 ring-black/10",
        className,
      )}
    >
      {/* top chrome */}
      <div className="flex h-11 items-center justify-between border-b border-black/[0.07] px-4">
        <div className="flex items-center gap-2.5">
          <LogoGlyph className="size-4" />
          <span className="text-[13px] font-semibold tracking-tight">
            nyro
          </span>
          <span className="ml-2 hidden rounded-md bg-stage px-2 py-0.5 text-[11px] font-medium text-foreground/60 sm:inline">
            {tenant}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden h-7 w-44 items-center gap-2 rounded-md bg-stage px-2.5 text-[11px] text-foreground/45 sm:flex">
            <Search className="size-3" />
            Search…
            <span className="ml-auto font-mono text-[10px] text-foreground/35">
              ⌘K
            </span>
          </div>
          <Bell className="size-3.5 text-foreground/45" />
          <span className="flex size-6 items-center justify-center rounded-full bg-brand-strong text-[10px] font-semibold text-white">
            AC
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
