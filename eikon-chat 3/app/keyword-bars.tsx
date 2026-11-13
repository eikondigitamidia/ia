"use client";
import { useEntrance } from "@/components/app/count-up";
import { fmt } from "@/lib/utils";

export function KeywordBars({ data }: { data: { termo: string; total: number }[] }) {
  const p = useEntrance(1300, 150);
  const max = Math.max(...data.map((d) => d.total));
  return (
    <ul className="flex flex-col gap-3.5">
      {data.map((d, i) => (
        <li key={d.termo} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-3 text-[13px]">
            <span className="rounded-md bg-accent px-1.5 py-0.5 font-mono text-[11.5px] font-medium text-accent-foreground dark:bg-info-bg dark:text-info-fg">{d.termo}</span>
            <span className="font-semibold tabular-nums">{fmt(d.total * p)}</span>
          </div>
          <span aria-hidden className="block h-1 rounded-full bg-muted dark:bg-n-200">
            <span className={i === 0 ? "block h-1 rounded-full bg-primary dark:bg-white" : "block h-1 rounded-full bg-primary/70 dark:bg-primary"} style={{ width: `${(d.total / max) * 100 * p}%` }} />
          </span>
        </li>
      ))}
    </ul>
  );
}
