"use client";
import { cn } from "@/lib/utils";

/** Controle segmentado (abas da prévia, filtros curtos). */
export function Segmented<T extends string>({ value, onChange, options, label, className }: {
  value: T; onChange: (v: T) => void; options: { value: T; label: string }[]; label: string; className?: string;
}) {
  return (
    <div role="tablist" aria-label={label} className={cn("inline-flex gap-0.5 rounded-xl border border-border bg-muted p-1", className)}>
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          type="button"
          aria-selected={o.value === value}
          onClick={() => onChange(o.value)}
          className={cn(
            "h-8 rounded-lg px-3.5 text-[13px] font-medium transition-colors duration-fast ease-out",
            o.value === value ? "bg-card text-foreground shadow-e1 dark:bg-n-200" : "text-subtle hover:text-foreground"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
