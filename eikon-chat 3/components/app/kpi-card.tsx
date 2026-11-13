import { cn } from "@/lib/utils";
import { CountUp } from "./count-up";

export type Tom = "up" | "down" | "neutro";
const tomCls: Record<Tom, string> = { up: "text-success-fg", down: "text-danger-fg", neutro: "text-muted-foreground" };

export function KpiCard({ rotulo, valor, sufixo, decimais, delta, tom = "neutro", compact, delay, className }: {
  rotulo: string; valor: number; sufixo?: string; decimais?: number; delta?: string; tom?: Tom; compact?: boolean; delay?: number; className?: string;
}) {
  return (
    <div className={cn("group flex flex-col gap-2.5 rounded-xl border border-border bg-card p-4 shadow-e1 transition-[box-shadow,transform,background-color] duration-base ease-out hover:-translate-y-px hover:shadow-e2 dark:hover:translate-y-0 dark:hover:bg-[#121826]", className)}>
      <span className="text-[13px] font-medium text-muted-foreground">{rotulo}</span>
      <span className="kpi-num text-kpi"><CountUp value={valor} decimals={decimais} suffix={sufixo} compact={compact} delay={delay} /></span>
      {delta && <span className={cn("text-xs font-medium", tomCls[tom])}>{delta}</span>}
    </div>
  );
}
