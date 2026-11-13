"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type Props = { checked: boolean; onCheckedChange: (v: boolean) => void; disabled?: boolean; label: string; className?: string };

/** Toggle acessível (role="switch"). */
export function Switch({ checked, onCheckedChange, disabled, label, className }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-base ease-out disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "border-primary bg-primary" : "border-input bg-n-200 dark:bg-n-300",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none block size-[18px] rounded-full bg-white shadow-e1 transition-transform duration-base ease-out",
          checked ? "translate-x-[22px]" : "translate-x-[2px]"
        )}
      />
    </button>
  );
}

/** Linha de configuração com texto + toggle (padrão do formulário de campanha). */
export function SwitchRow({ label, description, checked, onCheckedChange }: { label: string; description?: string; checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm text-foreground">{label}</p>
        {description && <p className="mt-0.5 text-caption text-muted-foreground">{description}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} label={label} />
    </div>
  );
}
