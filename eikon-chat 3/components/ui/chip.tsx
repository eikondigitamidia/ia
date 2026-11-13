"use client";
import { cn } from "@/lib/utils";

/** Chip de filtro (Logs de DMs). */
export function Chip({ active, count, onClick, children }: { active?: boolean; count?: number; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[13px] font-medium transition-colors duration-fast ease-out",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card text-subtle hover:border-input hover:text-foreground"
      )}
    >
      {children}
      {count !== undefined && (
        <span className={cn("font-mono text-[11px]", active ? "opacity-80" : "text-muted-foreground")}>{count}</span>
      )}
    </button>
  );
}
