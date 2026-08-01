import { cn, getStockLabel } from "@/lib/utils";
import type { StockStatus } from "@/lib/types";

interface StockBadgeProps {
  status?: StockStatus;
  className?: string;
}

export default function StockBadge({ status, className }: StockBadgeProps) {
  if (!status) return null;

  return (
    <span
      className={cn(
        "inline-block text-[10px] uppercase tracking-[0.15em]",
        status === "in_stock" && "text-accent",
        status === "low_stock" && "text-muted",
        status === "out_of_stock" && "text-stone",
        className
      )}
    >
      {getStockLabel(status)}
    </span>
  );
}
