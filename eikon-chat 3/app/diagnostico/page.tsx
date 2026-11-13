"use client";
import * as React from "react";
import { Inbox, RefreshCw } from "lucide-react";
import { diagnostico as d } from "@/lib/data";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { CountUp } from "@/components/app/count-up";
import { cn } from "@/lib/utils";

function Lista({ itens, vazio }: { itens: { a: string; b: string; c: string }[]; vazio: string }) {
  if (itens.length === 0) return <EmptyState compact icon={Inbox} title={vazio} />;
  return (
    <ul className="flex flex-col divide-y divide-border">
      {itens.map((x, i) => (
        <li key={i} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
          <span><strong className="font-semibold">{x.a}</strong> <span className="text-subtle">· {x.b}</span></span>
          <span className="font-mono text-xs text-muted-foreground">{x.c}</span>
        </li>
      ))}
    </ul>
  );
}

export default function DiagnosticoPage() {
  const [atualizando, setAtualizando] = React.useState(false);
  const [rev, setRev] = React.useState(0);
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-8 sm:px-8">
      <PageHeader
        title="Diagnóstico de produção"
        description="Saúde, filas, falhas de webhook, eventos de cobrança e alertas do worker."
        actions={<Button variant="secondary" loading={atualizando} onClick={() => { setAtualizando(true); setTimeout(() => { setAtualizando(false); setRev((r) => r + 1); }, 800); }}>{!atualizando && <RefreshCw aria-hidden />}Atualizar</Button>}
      />

      <section aria-label="Worker e filas" className="grid grid-cols-2 gap-3 lg:grid-cols-5" key={rev}>
        <Card className="col-span-2 flex flex-col gap-2 p-5 lg:col-span-1">
          <span className="label-mono">Saúde do worker</span>
          <span className="flex items-center gap-2 text-h2 font-bold text-success-fg dark:font-semibold">
            <span aria-hidden className="relative size-2.5 rounded-full bg-success"><span className="absolute inset-0 animate-ping2 rounded-full bg-success" /></span>{d.worker.status}
          </span>
          <span className="text-caption text-muted-foreground">Último sinal {d.worker.ultimoSinal}</span>
        </Card>
        {d.filas.map((f) => (
          <Card key={f.rotulo} className="flex flex-col gap-2 p-5">
            <span className="label-mono">{f.rotulo}</span>
            <span className={cn("kpi-num font-mono text-kpi", f.rotulo === "Fila falhou" && f.valor > 0 && "text-danger-fg")}><CountUp value={f.valor} /></span>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader><CardTitle>Alertas recentes do worker</CardTitle></CardHeader>
        <CardContent><Lista itens={d.alertas.map((a) => ({ a: a.titulo, b: "", c: a.quando }))} vazio="Nenhum alerta do worker registrado." /></CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Falhas e envios ignorados de DMs das campanhas</CardTitle><Badge tone="danger">{d.falhasDm.length}</Badge></CardHeader>
          <CardContent><Lista itens={d.falhasDm.map((x) => ({ a: x.para, b: x.motivo, c: x.quando }))} vazio="Nenhuma falha ou envio ignorado de DM." /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Falhas de webhook</CardTitle></CardHeader>
          <CardContent><Lista itens={d.falhasWebhook.map((x) => ({ a: x.evento, b: "", c: x.quando }))} vazio="Nenhum evento de webhook com falha." /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Falhas na renovação de token</CardTitle></CardHeader>
          <CardContent><Lista itens={d.falhasToken.map((x) => ({ a: x.conta, b: "", c: x.quando }))} vazio="Nenhuma falha na renovação de token." /></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Linha do tempo de eventos operacionais</CardTitle></CardHeader>
        <CardContent>
          <ol className="relative flex flex-col">
            {d.timeline.map((e, i) => (
              <li key={i} className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 border-b border-border py-3 text-sm last:border-0 sm:grid-cols-[100px_minmax(0,1fr)_auto]">
                <span className="font-mono text-xs font-medium text-muted-foreground">{e.origem}</span>
                <span>{e.evento}</span>
                <span className="col-start-2 font-mono text-xs text-muted-foreground sm:col-start-auto">{e.quando}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
