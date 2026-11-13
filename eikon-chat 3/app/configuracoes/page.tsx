"use client";
import * as React from "react";
import { conta } from "@/lib/data";
import { PageHeader } from "@/components/app/page-header";
import { AccordionItem } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, FieldHint } from "@/components/ui/input";
import { RadioCards } from "@/components/ui/radio-card";

function Linha({ titulo, desc, children }: { titulo: string; desc?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-4 first:pt-0 last:border-0">
      <div><p className="text-sm font-semibold">{titulo}</p>{desc && <p className="mt-1 text-caption text-muted-foreground">{desc}</p>}</div>
      {children}
    </div>
  );
}

export default function ConfiguracoesPage() {
  const [idioma, setIdioma] = React.useState<"pt-BR" | "en" | "es">("pt-BR");
  const [chave, setChave] = React.useState("");
  const [convite, setConvite] = React.useState("");
  const [conectada, setConectada] = React.useState(true);

  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col gap-6 px-4 py-8 sm:px-8">
      <PageHeader title="Configurações" />
      <div className="flex flex-col gap-3">
        <AccordionItem title="Idioma da interface">
          <RadioCards name="idioma" value={idioma} onChange={setIdioma}
            options={[{ value: "pt-BR", label: "Português (Brasil)" }, { value: "en", label: "English" }, { value: "es", label: "Español" }]} />
        </AccordionItem>

        <AccordionItem title="Configuração mais fácil do Instagram">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-background/60 p-5 dark:bg-panel">
            <p className="text-sm font-semibold">Provedor de conexão opcional</p>
            <p className="text-sm leading-6 text-subtle">Conecte o Instagram sem criar seu próprio app de desenvolvedor da Meta. O Zernio é um serviço pago de terceiros. Suas campanhas e a hospedagem continuam no Eikon Chat.</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="#" className="font-medium text-link underline underline-offset-4">Obter uma chave de API do Zernio</a>
              <a href="#" className="font-medium text-link underline underline-offset-4">Ver preços</a>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="zernio">Chave de API do Zernio</Label>
              <Input id="zernio" type="password" autoComplete="off" value={chave} onChange={(e) => setChave(e.target.value)} placeholder="zr_live_…" className="font-mono" />
              <FieldHint>Use uma chave sem restrições, de leitura e escrita, com acesso à caixa de entrada. O Eikon Chat registra um webhook para este espaço de trabalho. A chave é criptografada e nunca mais será exibida.</FieldHint>
            </div>
            <Button className="self-start" disabled={!chave}>Salvar chave de API</Button>
          </div>
        </AccordionItem>

        <AccordionItem title="Conexão com o Instagram" defaultOpen>
          <Linha titulo="Status" desc="Os webhooks de comentários e as respostas privadas dependem desta conexão.">
            {conectada ? <Badge tone="success" pulse>Conectada</Badge> : <Badge tone="danger">Desconectada</Badge>}
          </Linha>
          <Linha titulo="Contas" desc="1 perfil do Instagram conectado"><span className="text-sm text-subtle">{conectada ? "1 conectada" : "0 conectadas"}</span></Linha>
          {conectada && (
            <div className="my-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-4">
              <div>
                <p className="text-sm font-semibold">{conta.instagram}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">Token expira em 11/01/2027 · Webhook pronto</p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => setConectada(false)}>Desconectar</Button>
            </div>
          )}
          <div className="border-t border-border pt-4"><Button onClick={() => setConectada(true)}>Conectar usando seu próprio app da Meta</Button></div>
        </AccordionItem>

        <AccordionItem title="Equipe">
          <Linha titulo={conta.email} desc={conta.email}><Badge tone="outline" dot={false}>Proprietário</Badge></Linha>
          <form className="mt-2 flex flex-wrap gap-2 border-t border-border pt-4" onSubmit={(e) => { e.preventDefault(); setConvite(""); }}>
            <Input type="email" aria-label="E-mail do convidado" placeholder="colega@estudio.com" value={convite} onChange={(e) => setConvite(e.target.value)} className="min-w-[200px] flex-1" />
            <Select aria-label="Papel" defaultValue="membro" className="w-36"><option value="membro">Membro</option><option value="admin">Admin</option></Select>
            <Button type="submit" disabled={!convite}>Convidar</Button>
          </form>
        </AccordionItem>

        <AccordionItem title="Uso">
          <Linha titulo="DMs enviadas este mês" desc="Auto-hospedado — sem limites de plano."><span className="kpi-num text-h2">2.418</span></Linha>
        </AccordionItem>
      </div>
    </div>
  );
}
