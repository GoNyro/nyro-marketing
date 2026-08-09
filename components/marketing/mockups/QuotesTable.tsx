import {
  ArrowUpDown,
  ChevronDown,
  ListFilter,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The quotes screen, faked at pixel level. Believable records, believable
 * chrome - this is the site's main credibility device, so density and
 * restraint matter more than cleverness here.
 */

type Status =
  | "Draft"
  | "Awaiting approval"
  | "Approved"
  | "In production"
  | "Exported";

const STATUS_STYLE: Record<Status, string> = {
  Draft: "bg-stage text-foreground/60",
  "Awaiting approval": "bg-status-warm text-status-warm-ink",
  Approved: "bg-status-good text-status-good-ink",
  "In production": "bg-status-cool text-status-cool-ink",
  Exported: "bg-stage text-foreground/60",
};

type Row = {
  id: string;
  customer: string;
  reference: string;
  material: string;
  dims: string;
  status: Status;
  total: string;
  updated: string;
};

const ROWS: Row[] = [
  { id: "Q-2481", customer: "Harrington Joinery", reference: "Matai St kitchen", material: "Calacatta Mist · 20mm", dims: "2400 × 900 L", status: "Awaiting approval", total: "$4,912.00", updated: "2m ago" },
  { id: "Q-2480", customer: "Fifth Ave Kitchens", reference: "Unit 7, Fern Rise", material: "Empira Black · 20mm", dims: "3100 × 650", status: "Approved", total: "$6,240.50", updated: "18m ago" },
  { id: "Q-2479", customer: "Southstone Builders", reference: "Show home 2", material: "Cloudburst Concrete · 20mm", dims: "2750 × 750 U", status: "In production", total: "$11,830.00", updated: "1h ago" },
  { id: "Q-2478", customer: "Bay Kitchen Co.", reference: "Whitmore Rd reno", material: "Snowdon White · 20mm", dims: "2200 × 600", status: "Awaiting approval", total: "$3,178.25", updated: "3h ago" },
  { id: "Q-2477", customer: "Elliot & Dunn", reference: "Apartment 12B", material: "Raw Oak · 32mm", dims: "1800 × 620", status: "Draft", total: "$2,410.00", updated: "4h ago" },
  { id: "Q-2476", customer: "Harrington Joinery", reference: "Matai St laundry", material: "Fresh Concrete · 12mm", dims: "1650 × 600", status: "Approved", total: "$1,894.75", updated: "6h ago" },
  { id: "Q-2475", customer: "Coastline Interiors", reference: "Bach, Omaha", material: "Sea Salt · 20mm", dims: "2900 × 900 L", status: "Exported", total: "$7,325.00", updated: "Yesterday" },
  { id: "Q-2474", customer: "M. Tanuvasa Builders", reference: "Kelston new build", material: "Empira Black · 20mm", dims: "3400 × 700 + WF", status: "Approved", total: "$9,610.00", updated: "Yesterday" },
  { id: "Q-2473", customer: "Fifth Ave Kitchens", reference: "Unit 4, Fern Rise", material: "Calacatta Mist · 20mm", dims: "3100 × 650", status: "In production", total: "$6,195.00", updated: "Yesterday" },
  { id: "Q-2472", customer: "Otto Cabinetry", reference: "Greenhithe villa", material: "Snowdon White · 12mm", dims: "2450 × 640", status: "Exported", total: "$3,860.40", updated: "Mon" },
  { id: "Q-2471", customer: "Southstone Builders", reference: "Show home 1", material: "Cloudburst Concrete · 20mm", dims: "2750 × 750 U", status: "Exported", total: "$11,795.00", updated: "Mon" },
  { id: "Q-2470", customer: "Bay Kitchen Co.", reference: "Clifton Tce reno", material: "Raw Oak · 32mm", dims: "2000 × 600", status: "Draft", total: "$2,988.00", updated: "Sun" },
];

const COLS = [
  { label: "Quote", className: "w-[8%]" },
  { label: "Customer", className: "w-[17%]" },
  { label: "Reference", className: "w-[16%] hidden md:table-cell" },
  { label: "Material", className: "w-[19%]" },
  { label: "Size (mm)", className: "w-[11%] hidden lg:table-cell" },
  { label: "Status", className: "w-[13%]" },
  { label: "Total", className: "w-[9%] text-right" },
  { label: "Updated", className: "w-[7%] text-right hidden sm:table-cell" },
] as const;

export function QuotesTable({ className }: { className?: string }) {
  return (
    <div className={cn("text-left", className)} aria-hidden>
      {/* toolbar */}
      <div className="flex items-center justify-between gap-4 border-b border-black/[0.07] px-4 py-2.5">
        <div className="flex items-center gap-4">
          <span className="text-[13px] font-semibold tracking-tight">Quotes</span>
          <div className="hidden items-center gap-1 rounded-md bg-stage p-0.5 text-[11px] font-medium text-foreground/55 sm:flex">
            <span className="rounded bg-card px-2 py-0.5 text-foreground shadow-sm">All</span>
            <span className="px-2 py-0.5">Awaiting approval</span>
            <span className="px-2 py-0.5">In production</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-medium text-foreground/55">
          <span className="hidden items-center gap-1.5 rounded-md border border-black/10 px-2 py-1 sm:flex">
            <ListFilter className="size-3" /> Filter
          </span>
          <span className="hidden items-center gap-1.5 rounded-md border border-black/10 px-2 py-1 sm:flex">
            <ArrowUpDown className="size-3" /> Sort
          </span>
          <span className="hidden items-center gap-1.5 rounded-md border border-black/10 px-2 py-1 md:flex">
            <SlidersHorizontal className="size-3" /> View
          </span>
          <span className="flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-primary-foreground">
            <Plus className="size-3" /> New quote
          </span>
        </div>
      </div>

      {/* table */}
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b border-black/[0.07]">
            <th className="w-[36px] px-0 py-2">
              <span className="mx-auto block size-3 rounded-[3px] border border-black/15" />
            </th>
            {COLS.map((col) => (
              <th
                key={col.label}
                className={cn(
                  "px-2 py-2 text-left font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-foreground/40",
                  col.className,
                )}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {col.label === "Updated" ? (
                    <ChevronDown className="size-2.5" />
                  ) : null}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <tr
              key={row.id}
              className={cn(
                "border-b border-black/[0.05] text-[12px] leading-none",
                i === 0 && "bg-brand-soft/40",
              )}
            >
              <td className="px-0 py-[9px]">
                <span
                  className={cn(
                    "mx-auto block size-3 rounded-[3px] border",
                    i === 0
                      ? "border-brand-strong bg-brand-strong"
                      : "border-black/15",
                  )}
                />
              </td>
              <td className="px-2 py-[9px] font-mono text-[11px] text-foreground/70">
                {row.id}
              </td>
              <td className="truncate px-2 py-[9px] font-medium">{row.customer}</td>
              <td className="hidden truncate px-2 py-[9px] text-foreground/60 md:table-cell">
                {row.reference}
              </td>
              <td className="truncate px-2 py-[9px] text-foreground/70">
                {row.material}
              </td>
              <td className="hidden truncate px-2 py-[9px] font-mono text-[11px] text-foreground/60 lg:table-cell">
                {row.dims}
              </td>
              <td className="px-2 py-[7px]">
                <span
                  className={cn(
                    "inline-block truncate rounded-full px-2 py-1 text-[10.5px] font-medium leading-none",
                    STATUS_STYLE[row.status],
                  )}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-2 py-[9px] text-right font-mono text-[11px]">
                {row.total}
              </td>
              <td className="hidden px-2 py-[9px] text-right text-[11px] text-foreground/50 sm:table-cell">
                {row.updated}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* footer */}
      <div className="flex items-center justify-between px-4 py-2 text-[11px] text-foreground/45">
        <span>128 quotes · 12 awaiting approval</span>
        <span>Rows 1–12</span>
      </div>
    </div>
  );
}
