"use client";
import * as React from "react";
import { conta, visaoKpis, seguidores, publicacoes } from "@/lib/data";
import { PageHeader } from "@/components/app/page-header";
import { KpiCard } from "@/components/app/kpi-card";
import { LineChart } from "@/components/app/line-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, Td, Th, Tr } from "@/components/ui/table";
import { fmt } from "@/lib/utils";

export default function VisaoGeralPage() {
  const [periodo, setPeriodo] = React.useState("50");
  const [carregando, setCarregando] = React.useState(false);
  const [tabela, setTabela] = React.useState(false);
  const ganho = seguidores[seguidores.length - 1].total - seguidores[0].total;

  const trocar = (v: string) => {
    setPeriodo(v);
    setCarregando(true);
    setTimeout(() => setCarregando(false), 900); // simula fetch — troque pela sua chamada
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-8 sm:px-8">
      <PageHeader
        title="Visão geral"
        description={<>Recentes — 50 publicações de {conta.instagram}<br />{fmt(conta.seguidores)} seguidores</>}
        actions={
          <label className="flex flex-col gap-1">
            <span className="label-mono">Período</span>
            <Select value={periodo} onChange={(e) => trocar(e.target.value)} className="w-44">
              <option value="50">Últimas 50</option>
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
            </Select>
          </label>
        }
      />

      <section aria-label="Métricas do Instagram" aria-busy={carregando} className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {carregando
          ? visaoKpis.map((k) => (
              <div key={k.rotulo} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
                <Skeleton className="h-3 w-20" /><Skeleton className="h-7 w-16" />
              </div>
            ))
          : visaoKpis.map((k, i) => <KpiCard key={k.rotulo + periodo} rotulo={k.rotulo} valor={k.valor} compact delay={i * 40} />)}
      </section>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Seguidores ao longo do tempo</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{fmt(conta.seguidores)} agora · <span className="font-semibold text-success-fg">+{fmt(ganho)}</span> em {seguidores.length - 1} dias</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setTabela(!tabela)} aria-pressed={tabela}>
            {tabela ? "Mostrar gráfico" : "Mostrar tabela"}
          </Button>
        </CardHeader>
        <CardContent>
          {carregando ? (
            <Skeleton className="h-[260px] w-full" />
          ) : tabela ? (
            <Table className="min-w-0">
              <thead><tr><Th>Data</Th><Th className="text-right">Seguidores</Th></tr></thead>
              <tbody>{seguidores.slice(-10).reverse().map((s) => <Tr key={s.data}><Td>{s.data}</Td><Td className="text-right font-mono">{fmt(s.total)}</Td></Tr>)}</tbody>
            </Table>
          ) : (
            <LineChart key={periodo} data={seguidores} />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Publicações</CardTitle></CardHeader>
        <CardContent>
          {carregando ? (
            <div className="flex flex-col gap-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-9 w-full" />)}</div>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Publicação</Th><Th className="text-right">Visualizações</Th><Th className="text-right">Alcance</Th>
                  <Th className="text-right">Curtidas</Th><Th className="text-right">Comentários</Th><Th className="text-right">Salvamentos</Th><Th className="text-right">Compartilhamentos</Th>
                </tr>
              </thead>
              <tbody>
                {publicacoes.map((p) => (
                  <Tr key={p.legenda}>
                    <Td className="max-w-[320px]">
                      <span className="flex items-center gap-2">
                        <Badge tone="outline" dot={false} className="h-5 px-2 text-[10.5px]">{p.tipo}</Badge>
                        <span className="truncate">{p.legenda}</span>
                      </span>
                    </Td>
                    <Td className="text-right">{fmt(p.views, { compact: true })}</Td>
                    <Td className="text-right">{fmt(p.alcance, { compact: true })}</Td>
                    <Td className="text-right">{p.curtidas}</Td>
                    <Td className="text-right">{p.comentarios}</Td>
                    <Td className="text-right">{p.salvos}</Td>
                    <Td className="text-right">{p.compart}</Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
