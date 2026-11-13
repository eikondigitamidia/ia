import { cn } from "@/lib/utils";

/** Símbolo: quadrado com três traços (um "E" e linhas de mensagem).
 *  Claro (A): gradiente azul → marinho com traços brancos.
 *  Escuro (C): quadrado branco com traços azuis. */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, background: "var(--logo-tile)", borderRadius: size * 0.28 }}
      className={cn("inline-flex shrink-0 items-center justify-center shadow-brand", className)}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 14 14">
        <rect x="2" y="2" width="10" height="2.2" rx="1" style={{ fill: "var(--logo-bar-1)" }} />
        <rect x="2" y="5.9" width="7" height="2.2" rx="1" style={{ fill: "var(--logo-bar-2)" }} />
        <rect x="2" y="9.8" width="10" height="2.2" rx="1" style={{ fill: "var(--logo-bar-3)" }} />
      </svg>
    </span>
  );
}

export function Logo({ collapsed, className }: { collapsed?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      {!collapsed && (
        <span className="whitespace-nowrap text-[17px] font-extrabold tracking-[-.03em] dark:text-[15px] dark:font-semibold dark:tracking-[-.01em]">
          Eikon<span className="font-medium text-primary dark:text-foreground"> Chat</span>
        </span>
      )}
    </span>
  );
}
