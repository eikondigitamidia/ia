"use client";
import * as React from "react";
import { Copy, Check, KeyRound } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, FieldHint } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ApiMcpPage() {
  const [nome, setNome] = React.useState("");
  const [dias, setDias] = React.useState("30");
  const [chaves, setChaves] = React.useState([{ nome: "Claude — leitura", criada: "02/11/2026", expira: "02/12/2026" }]);
  const [copiado, setCopiado] = React.useState<string | null>(null);
  const copiar = (t: string) => { navigator.clipboard?.writeText(t); setCopiado(t); setTimeout(() => setCopiado(null), 1500); };

  return (
    <div className="mx-auto flex w-full max-w-[900px] flex-col gap-6 px-4 py-8 sm:px-8">
      <PageHeader title="API e MCP" description="Chaves somente leitura, restritas ao espaço de trabalho. Nenhuma chave pode modificar campanhas nem enviar mensagens. Somente administradores e proprietários podem gerenciar chaves." />

      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nome-chave">Nome da chave</Label>
            <Input id="nome-chave" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="ex.: Painel do Looker Studio" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Label htmlFor="validade">Validade da chave</Label>
            <Select id="validade" value={dias} onChange={(e) => setDias(e.target.value)} className="w-32">
              <option value="7">7 dias</option><option value="30">30 dias</option><option value="90">90 dias</option><option value="365">1 ano</option>
            </Select>
          </div>
          <FieldHint>Vale apenas para novas chaves. As datas de expiração existentes não mudam.</FieldHint>
          <Button className="self-start" disabled={!nome.trim()} onClick={() => { setChaves([{ nome, criada: "12/11/2026", expira: "—" }, ...chaves]); setNome(""); }}>
            <KeyRound aria-hidden />Criar chave por {dias === "365" ? "1 ano" : `${dias} dias`}
          </Button>
        </CardContent>
      </Card>

      {chaves.length > 0 && (
        <Card>
          <CardContent className="flex flex-col divide-y divide-border py-2">
            {chaves.map((k, i) => (
              <div key={i} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div><p className="text-sm font-semibold">{k.nome}</p><p className="font-mono text-xs text-muted-foreground">criada {k.criada} · expira {k.expira}</p></div>
                <Badge tone="info">Somente leitura</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-[15px] font-bold dark:font-semibold">Conexão</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-[#0B1B3F] text-[#E8ECF4] dark:bg-n-100">
          {[["MCP", "/api/mcp"], ["REST", "/api/v1/campaigns"]].map(([k, v]) => (
            <div key={k} className="flex items-center gap-3 border-b border-white/10 px-4 py-3 font-mono text-[13px] last:border-0">
              <span className="w-12 text-[#8FB0FF]">{k}</span>
              <code className="flex-1">{v}</code>
              <button onClick={() => copiar(v)} aria-label={`Copiar ${v}`} className="grid size-7 place-items-center rounded-md text-white/70 hover:bg-white/10 hover:text-white">
                {copiado === v ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </button>
            </div>
          ))}
          <pre className="m-0 overflow-x-auto border-t border-white/10 px-4 py-3 font-mono text-[12.5px] leading-6 text-white/80">{`curl https://chat.inkfina.studio/api/v1/campaigns \\
  -H "Authorization: Bearer ek_live_••••••••"`}</pre>
        </div>
        <p className="text-sm leading-6 text-subtle">HTTP com streaming e cabeçalho Authorization: Bearer. Este servidor não oferece OAuth; use um cliente que aceite cabeçalhos personalizados.</p>
        <p className="text-sm leading-6 text-subtle">As listas de campanhas são limitadas a 100. Use <code className="rounded bg-muted px-1 font-mono text-[12.5px]">get_campaign</code> para ver as configurações completas e os links de destino; os cliques são requisições brutas, não destinatários únicos.</p>
      </section>
    </div>
  );
}
