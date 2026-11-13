import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function EmptyState({ icon: Icon, title, description, action, compact, className }: {
  icon: LucideIcon; title: string; description?: string; action?: React.ReactNode; compact?: boolean; className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-input text-center",
        compact ? "gap-2 px-6 py-8" : "gap-3 px-6 py-14",
        className
      )}
    >
      <div aria-hidden className="hatch pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_80%_at_50%_0%,#000,transparent)]" />
      <span className="relative grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground dark:bg-n-200 dark:text-link">
        <Icon className="size-5" strokeWidth={1.75} aria-hidden />
      </span>
      <p className="relative text-[15px] font-bold dark:font-semibold">{title}</p>
      {description && <p className="relative max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="relative mt-2">{action}</div>}
    </div>
  );
}
