import { LayoutGrid, BarChart3, Inbox, Megaphone, ScrollText, Settings, PlugZap, Stethoscope, Palette, type LucideIcon } from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon; badge?: string };
export type NavGroup = { title?: string; items: NavItem[] };

/** Arquitetura do menu — idêntica ao Eikon Chat atual (2 grupos). */
export const NAV: NavGroup[] = [
  { items: [
    { href: "/", label: "Painel", icon: LayoutGrid },
    { href: "/visao-geral", label: "Visão geral", icon: BarChart3 },
  ] },
  { title: "Operações", items: [
    { href: "/caixa-de-entrada", label: "Caixa de entrada", icon: Inbox, badge: "3" },
    { href: "/campanhas", label: "Campanhas", icon: Megaphone },
    { href: "/logs", label: "Logs de DMs", icon: ScrollText },
  ] },
  { title: "Sistema", items: [
    { href: "/configuracoes", label: "Configurações", icon: Settings },
    { href: "/api-mcp", label: "API e MCP", icon: PlugZap },
    { href: "/diagnostico", label: "Diagnóstico", icon: Stethoscope },
  ] },
];

/** Só para o time de desenvolvimento — remova do menu em produção se quiser. */
export const DEV_NAV: NavItem = { href: "/design-system", label: "Design system", icon: Palette };

/** Trilha (breadcrumb) por rota. */
export const CRUMBS: Record<string, { label: string; href?: string }[]> = {
  "/": [{ label: "Painel" }],
  "/visao-geral": [{ label: "Visão geral" }],
  "/caixa-de-entrada": [{ label: "Operações" }, { label: "Caixa de entrada" }],
  "/campanhas": [{ label: "Operações" }, { label: "Campanhas" }],
  "/campanhas/nova": [{ label: "Operações" }, { label: "Campanhas", href: "/campanhas" }, { label: "Nova campanha" }],
  "/logs": [{ label: "Operações" }, { label: "Logs de DMs" }],
  "/configuracoes": [{ label: "Sistema" }, { label: "Configurações" }],
  "/api-mcp": [{ label: "Sistema" }, { label: "API e MCP" }],
  "/diagnostico": [{ label: "Sistema" }, { label: "Diagnóstico" }],
  "/design-system": [{ label: "Sistema" }, { label: "Design system" }],
};
