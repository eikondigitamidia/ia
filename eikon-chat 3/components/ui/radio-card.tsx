"use client";
import { cn } from "@/lib/utils";

type Opt<T extends string> = { value: T; label: string; description?: string };

/** Grupo de rádio em card (gatilho, palavras). */
export function RadioCards<T extends string>({ name, value, onChange, options, className, children }: {
  name: string; value: T; onChange: (v: T) => void; options: Opt<T>[]; className?: string;
  children?: (v: T) => React.ReactNode;
}) {
  return (
    <div role="radiogroup" className={cn("flex flex-col gap-2", className)}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <div key={o.value} className="flex flex-col gap-2">
            <label
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition-colors duration-fast ease-out",
                on ? "border-primary bg-accent shadow-[0_0_0_3px_rgb(var(--primary)/.10)] dark:border-accent-ring" : "border-border bg-card hover:border-input"
              )}
            >
              <input type="radio" name={name} value={o.value} checked={on} onChange={() => onChange(o.value)} className="peer sr-only" />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
                  on ? "border-primary dark:border-link" : "border-n-400"
                )}
              >
                <span className={cn("size-2 rounded-full transition-transform duration-fast", on ? "scale-100 bg-primary dark:bg-link" : "scale-0")} />
              </span>
              <span className="min-w-0">
                <span className={cn("block text-sm", on ? "font-semibold text-foreground" : "text-foreground")}>{o.label}</span>
                {o.description && <span className="mt-0.5 block text-caption text-muted-foreground">{o.description}</span>}
              </span>
            </label>
            {on && children?.(o.value)}
          </div>
        );
      })}
    </div>
  );
}
