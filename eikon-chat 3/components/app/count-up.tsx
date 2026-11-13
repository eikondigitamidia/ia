"use client";
import * as React from "react";
import { fmt } from "@/lib/utils";

/** Hook: progresso 0→1 com ease-out expo ao montar. Respeita prefers-reduced-motion. */
export function useEntrance(duration = 1300, delay = 0) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setP(1); return; }
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (now: number) => {
      const x = Math.min(1, Math.max(0, (now - t0) / duration));
      setP(x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
      if (x < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, delay]);
  return p;
}

/** Número que conta do zero até o valor ao abrir a tela. */
export function CountUp({ value, decimals = 0, suffix = "", compact, delay = 0 }: { value: number; decimals?: number; suffix?: string; compact?: boolean; delay?: number }) {
  const p = useEntrance(1300, delay);
  const v = value * p;
  return (
    <span aria-label={`${fmt(value, { decimals, compact })}${suffix}`}>
      <span aria-hidden>{fmt(compact ? Math.round(v) : v, { decimals, compact })}{suffix}</span>
    </span>
  );
}
