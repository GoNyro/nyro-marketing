import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type BookCtaProps = {
  /** Monochrome system: ink pill on light surfaces, white pill on dark,
      quiet bordered ghost for secondary actions. */
  variant?: "primary" | "inverse" | "secondary" | "ghost-dark";
  label?: string;
  href?: string;
  className?: string;
  withArrow?: boolean;
  size?: "default" | "lg";
};

const variantClass = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/85",
  inverse: "bg-background text-foreground hover:bg-background/90",
  secondary:
    "border border-border bg-transparent text-foreground hover:bg-secondary",
  "ghost-dark":
    "border border-surface-dark-foreground/25 bg-transparent text-surface-dark-foreground hover:bg-surface-dark-foreground/10",
} as const;

/**
 * The site's recurring call-to-action. Defaults to the contact page's booking
 * section. Pass `href`/`label` to repurpose it for secondary actions.
 */
export function BookCta({
  variant = "primary",
  label = "Book a demo",
  href = "/contact#book",
  className,
  withArrow = false,
  size = "lg",
}: BookCtaProps) {
  const isExternal = /^(https?:|mailto:)/.test(href);
  const classes = cn(
    "group rounded-full px-6 text-sm font-medium",
    variantClass[variant],
    className,
  );
  const inner = (
    <>
      {label}
      {withArrow ? (
        <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  return (
    <Button asChild size={size} className={classes}>
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        <Link href={href}>{inner}</Link>
      )}
    </Button>
  );
}
