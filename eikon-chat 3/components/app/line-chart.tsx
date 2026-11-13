"use client";
import * as React from "react";
import { fmt } from "@/lib/utils";

/** Linha de seguidores (SVG puro). Desenha o traço ao abrir. */
export function LineChart({ data }: { data: { data: string; total: number }[] }) {
  const W = 1000, H = 260, pad = { l: 72, r: 12, t: 12, b: 28 };
  const min = Math.floor(Math.min(...data.map((d) => d.total)) / 100) * 100;
  const max = Math.ceil(Math.max(...data.map((d) => d.total)) / 100) * 100;
  const x = (i: number) => pad.l + (i / (data.length - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * (H - pad.t - pad.b);
  const pts = data.map((d, i) => [x(i), y(d.total)] as const);
  const path = pts.reduce((acc, [px, py], i) => {
    if (i === 0) return `M${px},${py}`;
    const [qx, qy] = pts[i - 1];
    const cx = (qx + px) / 2;
    return `${acc} C${cx},${qy} ${cx},${py} ${px},${py}`;
  }, "");
  const area = `${path} L${x(data.length - 1)},${H - pad.b} L${x(0)},${H - pad.b} Z`;
  const ticks = [0, 1, 2, 3, 4].map((k) => min + ((max - min) * k) / 4);
  const [hover, setHover] = React.useState<number | null>(null);
  const gid = React.useId();

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Seguidores: de ${fmt(data[0].total)} para ${fmt(data[data.length - 1].total)} em ${data.length} dias`}
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
          const rel = ((e.clientX - r.left) / r.width) * W;
          const i = Math.round(((rel - pad.l) / (W - pad.l - pad.r)) * (data.length - 1));
          setHover(Math.max(0, Math.min(data.length - 1, i)));
        }}>
        <defs>
          <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="rgb(var(--chart-1))" stopOpacity=".18" />
            <stop offset="1" stopColor="rgb(var(--chart-1))" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="rgb(var(--border))" strokeDasharray="4 4" />
            <text x={pad.l - 10} y={y(t) + 4} textAnchor="end" fontSize="12" fill="rgb(var(--muted-foreground))" fontFamily="var(--font-mono)">{fmt(t, { compact: true })}</text>
          </g>
        ))}
        {data.map((d, i) => i % 5 === 0 && (
          <text key={d.data} x={x(i)} y={H - 6} textAnchor="middle" fontSize="12" fill="rgb(var(--muted-foreground))">{d.data}</text>
        ))}
        <path d={area} fill={`url(#${gid})`} className="animate-fade-up" />
        <path d={path} fill="none" stroke="rgb(var(--chart-1))" strokeWidth="2.5" strokeLinecap="round" pathLength={1} strokeDasharray="1" className="draw-line" />
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={H - pad.b} stroke="rgb(var(--n-400))" />
            <circle cx={x(hover)} cy={y(data[hover].total)} r="5" fill="rgb(var(--card))" stroke="rgb(var(--chart-1))" strokeWidth="2.5" />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div className="pointer-events-none absolute top-2 rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-e2"
          style={{ left: `clamp(0px, calc(${(x(hover) / W) * 100}% - 60px), calc(100% - 130px))` }}>
          <p className="text-muted-foreground">{data[hover].data}</p>
          <p className="font-mono font-semibold">{fmt(data[hover].total)} seguidores</p>
        </div>
      )}
    </div>
  );
}
