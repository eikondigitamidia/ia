"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PanelLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { conta } from "@/lib/data";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Select } from "@/components/ui/input";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { NAV, DEV_NAV, CRUMBS, type NavItem } from "./nav";

const KEY = "eikon:sidebar-recolhida";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    try { setCollapsed(localStorage.getItem(KEY) === "1"); } catch {}
  }, []);
  React.useEffect(() => setMobileOpen(false), [pathname]);

  const toggle = () => {
    setCollapsed((c) => {
      try { localStorage.setItem(KEY, c ? "0" : "1"); } catch {}
      return !c;
    });
  };

  const crumbs = CRUMBS[pathname] ?? [{ label: "Eikon Chat" }];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar desktop */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border transition-[width] duration-slow ease-out md:flex",
          collapsed ? "w-[72px]" : "w-[248px]"
        )}
        style={{ background: "var(--sidebar-bg)" }}
      >
        <SidebarContent collapsed={collapsed} pathname={pathname} onToggle={toggle} />
      </aside>

      {/* Sidebar mobile (gaveta) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button aria-label="Fechar menu" className="absolute inset-0 bg-n-900/40 backdrop-blur-[2px] dark:bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-[280px] animate-fade-up flex-col border-r border-border shadow-e3" style={{ background: "var(--sidebar-bg)", backgroundColor: "rgb(var(--panel))" }}>
            <SidebarContent pathname={pathname} onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-8 dark:bg-background/90">
          <button aria-label="Abrir menu" onClick={() => setMobileOpen(true)} className="grid size-9 place-items-center rounded-lg border border-border bg-card text-subtle md:hidden">
            <Menu className="size-4" />
          </button>
          <Breadcrumb items={crumbs} />
          <div className="ml-auto flex items-center gap-2.5">
            <span className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[13px] text-subtle sm:flex dark:border-[#22325A] dark:bg-[#111C35] dark:text-info-fg">
              <span aria-hidden className="relative size-1.5 rounded-full bg-success dark:bg-[#3B78FF]"><span className="absolute inset-0 animate-ping2 rounded-full bg-inherit" /></span>
              {conta.instagram}
            </span>
            <ThemeToggle />
          </div>
        </header>
        <main id="conteudo" className="flex-1">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({ collapsed, pathname, onToggle, onClose }: { collapsed?: boolean; pathname: string; onToggle?: () => void; onClose?: () => void }) {
  return (
    <>
      <div className={cn("flex h-16 shrink-0 items-center border-b border-border", collapsed ? "justify-center px-2" : "justify-between px-4")}>
        {!collapsed && <Link href="/" aria-label="Eikon Chat — Painel"><Logo /></Link>}
        {onToggle && (
          <button onClick={onToggle} aria-label={collapsed ? "Expandir menu" : "Recolher menu"} aria-expanded={!collapsed}
            className="grid size-8 place-items-center rounded-lg border border-border bg-card text-subtle transition-colors hover:text-foreground dark:bg-n-100">
            <PanelLeft className="size-4" />
          </button>
        )}
        {onClose && (
          <button onClick={onClose} aria-label="Fechar menu" className="grid size-8 place-items-center rounded-lg border border-border bg-card text-subtle"><X className="size-4" /></button>
        )}
      </div>

      <nav aria-label="Menu principal" className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
        {NAV.map((g, gi) => (
          <div key={gi} className="flex flex-col gap-0.5">
            {g.title && (collapsed
              ? <span aria-hidden className="mx-3 my-3 h-px bg-border" />
              : <span className="px-2.5 pb-1.5 pt-4 text-[11px] font-bold uppercase tracking-[.08em] text-muted-foreground dark:font-medium dark:tracking-[.05em]">{g.title}</span>)}
            {g.items.map((it) => <NavLink key={it.href} item={it} active={isActive(pathname, it.href)} collapsed={collapsed} />)}
          </div>
        ))}
        <span aria-hidden className="mx-2 my-3 h-px bg-border" />
        <NavLink item={DEV_NAV} active={isActive(pathname, DEV_NAV.href)} collapsed={collapsed} />
      </nav>

      {!collapsed && (
        <div className="flex flex-col gap-3 border-t border-border p-4">
          <label className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
            Idioma
            <Select aria-label="Idioma" defaultValue="pt-BR" className="h-8 w-auto text-[13px]">
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </Select>
          </label>
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg bg-foreground text-xs font-bold text-background dark:bg-white dark:text-primary">IF</span>
            <span className="flex min-w-0 flex-col">
              <strong className="truncate text-[13px] font-semibold">{conta.workspace}</strong>
              <span className="text-xs text-muted-foreground">{conta.hospedagem}</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

function NavLink({ item, active, collapsed }: { item: NavItem; active: boolean; collapsed?: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm transition-colors duration-fast ease-out",
        collapsed && "justify-center px-0",
        active
          ? "bg-accent font-bold text-accent-foreground shadow-[inset_2px_0_0_rgb(var(--primary))] dark:font-semibold dark:shadow-[inset_0_0_0_1px_rgb(var(--accent-ring))]"
          : "font-medium text-subtle hover:bg-muted hover:text-foreground dark:hover:bg-[#131927]"
      )}
    >
      <Icon aria-hidden strokeWidth={1.75} className={cn("size-[18px] shrink-0", active && "dark:text-link")} />
      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
      {!collapsed && item.badge && (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 font-mono text-[11px] font-medium text-primary-foreground">{item.badge}</span>
      )}
      {collapsed && <span className="sr-only">{item.label}</span>}
    </Link>
  );
}
