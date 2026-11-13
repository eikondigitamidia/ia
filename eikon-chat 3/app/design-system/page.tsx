"use client";
import * as React from "react";
import { Megaphone, Plus } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { LogoMark, Logo } from "@/components/app/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select, Label, FieldHint } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioCards } from "@/components/ui/radio-card";
import { Chip } from "@/components/ui/chip";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Avatar } from "@/components/ui/avatar";
import { Bubble, ConversationItem } from "@/components/app/chat";
import { KpiCard } from "@/components/app/kpi-card";
import { cn } from "@/lib/utils";

const GRUPOS: { titulo: string; tokens: string[] }[] = [
  { titulo: "Base", tokens: ["background", "panel", "card", "foreground", "subtle-foreground", "muted-foreground", "border", "input"] },
  { titulo: "Marca", tokens: ["primary", "primary-hover", "accent", "accent-foreground", "link", "ring", "spotlight", "avatar"] },
  { titulo: "Semânticas", tokens: ["success", "success-bg", "warning", "warning-bg", "danger", "danger-bg", "info", "info-bg"] },
  { titulo: "Gráficos", tokens: ["chart-1", "chart-2", "chart-3", "chart-5", "chart-peak"] },
  { titulo: "Neutros (10 tons)", tokens: ["n-50", "n-100", "n-200", "n-300", "n-400", "n-500", "n-600", "n-700", "n-800", "n-900"] },
];

function Swatches({ escopo }: { escopo: "light" | "force-dark" }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hex, setHex] = React.useState<Record<string, string>>({});
  React.useEffect(() => {
    if (!ref.current) return;
    const cs = getComputedStyle(ref.current);
    const out: Record<string, string> = {};
    GRUPOS.flatMap((g) => g.tokens).forEach((t) => {
      const v = cs.getPropertyValue(`--${t}`).trim().split(/\s+/).map(Number);
      out[t] = "#" + v.map((n) => n.toString(16).padStart(2, "0")).join("").toUpperCase();
    });
    setHex(out);
  }, []);
  return (
    <div ref={ref} className={cn(escopo, "rounded-xl border p-5")} style={{ background: "rgb(var(--background))", color: "rgb(var(--foreground))", borderColor: "rgb(var(--border))" }}>
      <p className="mb-4 text-sm font-semibold">{escopo === "light" ? "Claro — Direção A · Precisão" : "Escuro — Direção C · Preto e branco"}</p>
      <div className="flex flex-col gap-5">
        {GRUPOS.map((g) => (
          <div key={g.titulo}>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[.08em] opacity-70">{g.titulo}</p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
              {g.tokens.map((t) => (
                <div key={t} className="flex flex-col gap-1">
                  <span className="h-10 rounded-md" style={{ background: `rgb(var(--${t}))`, boxShadow: "inset 0 0 0 1px rgb(127 127 127 / .2)" }} />
                  <span className="truncate font-mono text-[10.5px]">--{t}</span>
                  <span className="font-mono text-[10px] opacity-70">{hex[t]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TIPO = [
  { nome: "Display", cls: "heading text-display", spec: "44/46 · título 800 (A) / 600 (C) · −4%" },
  { nome: "H1", cls: "heading text-h1", spec: "32/35 · −3,5%" },
  { nome: "H2", cls: "heading text-h2", spec: "22/27 · −2%" },
  { nome: "H3", cls: "text-h3 font-bold dark:font-semibold", spec: "16/22 · 700 / 600" },
  { nome: "H4", cls: "text-h4 font-semibold", spec: "14/20 · 600" },
  { nome: "Corpo", cls: "text-body", spec: "14/22 · 400" },
  { nome: "Legenda", cls: "text-caption text-muted-foreground", spec: "12/18 · 400" },
  { nome: "KPI", cls: "kpi-num text-kpi", spec: "30/30 · 700 / 600 · tabular" },
  { nome: "Mono", cls: "font-mono text-[13px]", spec: "13 · JetBrains Mono (A) / Geist Mono (C)" },
];

export default function DesignSystemPage() {
  const [sw, setSw] = React.useState(true);
  const [radio, setRadio] = React.useState<"a" | "b">("a");
  const [chip, setChip] = React.useState("Todos");
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-8 sm:px-8">
      <PageHeader title="Design system" description="Tokens, tipografia e componentes do Eikon Chat. Tema claro = Direção A; tema escuro = Direção C. Alterne o tema no topo para ver cada componente nos dois." />

      <Card>
        <CardHeader><CardTitle>Logotipo</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="light grid h-32 place-items-center rounded-xl border" style={{ background: "rgb(var(--card))", color: "rgb(var(--foreground))", borderColor: "rgb(var(--border))" }}><Logo /></div>
          <div className="force-dark dark grid h-32 place-items-center rounded-xl" style={{ background: "rgb(var(--background))", color: "rgb(var(--foreground))" }}><Logo /></div>
          <div className="flex h-32 items-center justify-center gap-4 rounded-xl border border-dashed border-input">
            <LogoMark size={48} /><LogoMark size={32} /><LogoMark size={16} />
            <span className="text-caption text-muted-foreground">área de proteção = ½ do símbolo</span>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        <Swatches escopo="light" />
        <Swatches escopo="force-dark" />
      </section>

      <Card>
        <CardHeader><CardTitle>Tipografia</CardTitle></CardHeader>
        <CardContent className="flex flex-col divide-y divide-border">
          {TIPO.map((t) => (
            <div key={t.nome} className="grid items-baseline gap-2 py-3 sm:grid-cols-[100px_minmax(0,1fr)_260px]">
              <span className="label-mono">{t.nome}</span>
              <span className={t.cls}>{t.nome === "KPI" ? "2.418" : t.nome === "Mono" ? "17:46 · /api/v1/campaigns" : "Comentário vira DM"}</span>
              <span className="font-mono text-xs text-muted-foreground">{t.spec}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Espaço, raio e elevação</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm">
            <div className="flex items-end gap-2">{[4, 8, 12, 16, 24, 32, 48].map((s) => <span key={s} className="flex flex-col items-center gap-1"><span className="block bg-primary/80" style={{ width: s, height: s }} /><span className="font-mono text-[10px] text-muted-foreground">{s}</span></span>)}</div>
            <p className="text-caption text-muted-foreground">Grade de 4px. Página: 32px de margem, máx. 1200px. Gutter 12–16px.</p>
            <div className="flex gap-3">{["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-full"].map((r) => <span key={r} className={cn("size-10 border border-input bg-muted", r)} title={r} />)}</div>
            <p className="text-caption text-muted-foreground">Raio base 10px (lg) · 14px cards (xl) · pílulas 999px.</p>
            <div className="flex gap-3">{["shadow-e1", "shadow-e2", "shadow-e3", "shadow-brand"].map((s) => <span key={s} className={cn("grid h-12 flex-1 place-items-center rounded-lg bg-card font-mono text-[10px]", s)}>{s.replace("shadow-", "")}</span>)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Gradiente e motion</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm text-subtle">
            <div className="needle" />
            <p>Único gradiente da marca: a “linha de agulha”. Nada de gradiente em texto.</p>
            <div className="hatch h-16 rounded-lg border border-border" />
            <p>Hachura de 1px a 135° em estados vazios.</p>
            <p className="font-mono text-xs">ease-out cubic-bezier(.22,1,.36,1) · 150 / 200 / 300 ms · contagem 1.300 ms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Avatares e status</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-2"><Avatar name="@marina.ink" /><Avatar name="@lucas.blackwork" /><Avatar name="@bia.fineline" size={32} /></div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="success" pulse>Conectada</Badge><Badge tone="success">Saudável</Badge><Badge tone="danger">Falhou</Badge>
              <Badge tone="warning">Limite de envio</Badge><Badge tone="info">Pendente</Badge><Badge tone="neutral">Duplicada</Badge><Badge tone="outline" dot={false}>Proprietário</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Botões — padrão, hover, foco, desabilitado, carregando</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-3">
          {(["primary", "secondary", "destructive", "ghost", "inverse"] as const).map((v) => (
            <div key={v} className="flex flex-wrap items-center gap-3">
              <span className="w-24 font-mono text-xs text-muted-foreground">{v}</span>
              <Button variant={v}><Plus aria-hidden />Nova campanha</Button>
              <Button variant={v} disabled>Desabilitado</Button>
              <Button variant={v} loading>Salvando</Button>
              <Button variant={v} size="sm">Pequeno</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Formulário</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2"><Label htmlFor="ds1">Nome da campanha</Label><Input id="ds1" placeholder="ex.: Flash Day dezembro" /></div>
            <div className="flex flex-col gap-2"><Label htmlFor="ds2">Com erro</Label><Input id="ds2" aria-invalid defaultValue="" placeholder="Digite uma ou mais palavras" /><FieldHint error>Digite pelo menos uma palavra.</FieldHint></div>
            <div className="flex flex-col gap-2"><Label htmlFor="ds3">Desabilitado</Label><Input id="ds3" disabled value="Somente leitura" readOnly /></div>
            <Select aria-label="Exemplo de select" defaultValue="30"><option value="30">30 dias</option><option value="90">90 dias</option></Select>
            <div className="flex items-center gap-3"><Switch label="Exemplo" checked={sw} onCheckedChange={setSw} /><Switch label="Desabilitado" checked={false} onCheckedChange={() => {}} disabled /><span className="text-sm text-subtle">Toggle</span></div>
            <RadioCards name="ds" value={radio} onChange={setRadio} options={[{ value: "a", label: "uma publicação ou reel específico" }, { value: "b", label: "qualquer publicação ou reel" }]} />
            <div className="flex flex-wrap gap-2">{["Todos", "Enviada", "Falhou", "Duplicada"].map((c) => <Chip key={c} active={chip === c} count={c === "Todos" ? 8 : 2} onClick={() => setChip(c)}>{c}</Chip>)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Dados, conversa e estados</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3"><KpiCard rotulo="DMs enviadas" valor={2418} delta="↑ 18%" tom="up" /><KpiCard rotulo="CTR" valor={45.2} decimais={1} sufixo="%" delta="↑ 1,6 p.p." tom="up" /></div>
            <ConversationItem handle="@jana.machine.tattoo" hora="17:46" ultima="Você: Boa, estúdio próprio…" naoLidas={2} ativo />
            <div className="flex flex-col gap-2 rounded-xl bg-background p-4 dark:bg-spotlight"><Bubble de="lead" texto="Campinas" hora="17:46" /><Bubble de="eu" texto="Boa! E qual é o teu estilo principal?" hora="17:46" /></div>
            <div className="flex flex-col gap-2"><Skeleton className="h-4 w-1/2" /><Skeleton className="h-8 w-full" /></div>
            <EmptyState compact icon={Megaphone} title="Nenhuma campanha ainda" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
