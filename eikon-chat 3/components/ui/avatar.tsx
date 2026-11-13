import { cn, initials } from "@/lib/utils";

/** Avatar de iniciais: azul no claro (A), branco com iniciais azuis no escuro (C). */
export function Avatar({ name, size = 40, className }: { name: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: Math.round(size * 0.33) }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-avatar font-bold text-avatar-foreground",
        "dark:shadow-[0_0_0_1px_rgb(255_255_255/.2),0_6px_14px_-6px_rgb(47_95_232/.6)]",
        className
      )}
    >
      {initials(name)}
    </span>
  );
}
