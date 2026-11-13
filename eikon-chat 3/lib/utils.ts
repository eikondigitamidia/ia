import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Ensina o tailwind-merge sobre a escala tipográfica própria (text-h1, text-caption…),
 *  para não confundir tamanho com cor e descartar classes. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "h4", "body", "caption", "kpi"] }],
      shadow: [{ shadow: ["e1", "e2", "e3", "brand"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 2418 → "2.418" · 67400 → "67,4 mil" (compacto) */
export function fmt(n: number, opts?: { compact?: boolean; decimals?: number }) {
  if (opts?.compact && Math.abs(n) >= 1000) {
    return new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 }).format(n);
  }
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: opts?.decimals ?? 0,
    maximumFractionDigits: opts?.decimals ?? 0,
  }).format(n);
}

export function initials(handle: string) {
  const clean = handle.replace(/^@/, "").replace(/[^a-zA-ZÀ-ú]/g, " ").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return clean.slice(0, 2).toUpperCase();
}
