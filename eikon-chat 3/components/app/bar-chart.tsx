"use client";
import { cn, fmt } from "@/lib/utils";
import { useEntrance } from "./count-up";

/** Barras de 7 dias. Crescem uma após a outra ao abrir. O pico ganha a cor de destaque. */
export function BarChart({ data, height = 180, onSpotlight }: { data: { dia: string; v: number }[]; height?: number; onSpotlight?: boolean }) {
  const p = useEntrance(1700, 100);
  const max = Math.max(...data.map((d) => d.v));
  return (
    <figure className="m-0">
      <figcaption className="sr-only">{data.map((d) => `${d.dia}: ${d.v}`).join(", ")}</figcaption>
      <div
        className={cn("flex items-end gap-3 border-b sm:gap-4", onSpotlight ? "border-spotlight-border" : "border-border")}
        style={{
          height: height + 24,
          backgroundImage: `repeating-linear-gradient(0deg, rgb(var(${onSpotlight ? "--spotlight-border" : "--border"}) / .7) 0 1px, transparent 1px ${height / 3}px)`,
        }}
        aria-hidden
      >
        {data.map((d, i) => {
          const local = Math.min(1, Math.max(0, p * 1.35 - i * 0.05));
          const pico = d.v === max;
          return (
            <div key={d.dia} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <span className={cn("font-mono text-[11px]", pico ? "font-semibold" : "", onSpotlight ? "text-spotlight-muted" : "text-muted-foreground", pico && (onSpotlight ? "text-spotlight-foreground" : "text-foreground"))}>
                {fmt(d.v * local)}
              </span>
              <span
                className={cn(
                  "block w-full max-w-[44px] rounded-t-md rounded-b-sm",
                  pico ? "bg-chart-peak shadow-brand dark:shadow-[0_10px_24px_-10px_rgb(10_13_20/.8)]" : "bg-chart-3 dark:bg-chart-1"
                )}
                style={{ height: Math.round((d.v / max) * height * local) }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-3 sm:gap-4" aria-hidden>
        {data.map((d) => (
          <span key={d.dia} className={cn("flex-1 text-center text-xs", onSpotlight ? "text-spotlight-muted" : "text-muted-foreground")}>{d.dia}</span>
        ))}
      </div>
    </figure>
  );
}
