import { cn } from "@/lib/utils";

/** Small mono kicker above a heading. Muted by default; quiet by design. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("label-mono text-[0.7rem] text-muted-foreground", className)}>
      {children}
    </p>
  );
}
