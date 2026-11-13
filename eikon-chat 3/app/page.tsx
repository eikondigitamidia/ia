import Link from "next/link";
import { conta, painelKpis, dms7dias, palavrasChave, atividadeRecente, type TipoAtividade } from "@/lib/data";
import { KpiCard } from "@/components/app/kpi-card";
import { BarChart } from "@/components/app/bar-chart";
import { Card, CardContent, CardHeader, CardTitle, SpotlightCard } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { KeywordBars } from "./keyword-bars";
import { fmt, cn } from "@/lib/utils";

const ponto: Record<TipoAtividade, string> = {
  enviada: "bg-primary dark:bg-link", clique: "bg-chart-2 dark:bg-success", falhou: "bg-danger", campanha: "bg-success dark:bg-warning",
};

export default function PainelPage() {
  const total = dms7dias.reduce((a, d) => a + d.v, 0);
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-8 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h1 className="heading text-display">Olá, {conta.usuario}!</h1>
          <p className="text-sm text-muted-foreground">
            {conta.contasConectadas} conta conectada · {fmt(conta.contatos)} contatos ·{" "}
            <Link href="/logs" className="font-semibold text-link hover:underline">Ver atividade</Link>
          </p>
        </div>
        <span className="font-mono text-xs text-muted-foreground">Atualizado às 14:32</span>
      </div>

      <section aria-label="Indicadores" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {painelKpis.map((k, i) => (
          <KpiCard key={k.id} rotulo={k.rotulo} valor={k.valor} sufixo={k.sufixo} decimais={k.decimais} delta={k.delta} tom={k.tom} delay={i * 40} />
        ))}
      </section>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <SpotlightCard>
          <div className="flex flex-wrap items-baseline justify-between gap-3 px-5 pt-5">
            <h2 className="text-[15px] font-bold tracking-[-.01em] dark:font-semibold">DMs — Últimos 7 dias</h2>
            <span className="text-[13px] text-spotlight-muted"><strong className="font-semibold text-spotlight-foreground">{fmt(total)}</strong> enviadas · média {fmt(total / 7)}/dia</span>
          </div>
          <div className="p-5"><BarChart data={dms7dias} onSpotlight /></div>
        </SpotlightCard>

        <Card>
          <CardHeader><CardTitle>Principais palavras-chave</CardTitle></CardHeader>
          <CardContent><KeywordBars data={palavrasChave} /></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Atividade recente</CardTitle></CardHeader>
          <CardContent className="pt-3">
            <ul className="flex flex-col">
              {atividadeRecente.map((a, i) => (
                <li key={i} className="flex items-center gap-3 border-b border-border py-2.5 last:border-0">
                  <Avatar name={a.quem} size={30} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] leading-[18px] text-subtle"><strong className="font-semibold text-foreground">{a.quem}</strong> {a.texto}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                      <span aria-hidden className={cn("size-1.5 rounded-full", ponto[a.tipo])} />{a.quando}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
