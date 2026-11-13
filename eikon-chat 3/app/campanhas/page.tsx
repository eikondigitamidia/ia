"use client";
import * as React from "react";
import Link from "next/link";
import { Megaphone, Plus, Upload } from "lucide-react";
import { campanhas as dados } from "@/lib/data";
import { PageHeader } from "@/components/app/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, Td, Th, Tr } from "@/components/ui/table";
import { fmt } from "@/lib/utils";

export default function CampanhasPage() {
  const [lista, setLista] = React.useState(dados);
  const vazio = lista.length === 0;
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-8 sm:px-8">
      <PageHeader
        title="Campanhas"
        description={`${lista.length} campanhas`}
        actions={<>
          <Button variant="secondary"><Upload aria-hidden />Importar</Button>
          <Link href="/campanhas/nova" className={buttonVariants()}><Plus aria-hidden />Nova campanha</Link>
        </>}
      />

      {vazio ? (
        <EmptyState
          icon={Megaphone}
          title="Nenhuma campanha ainda"
          description="Crie sua primeira campanha comentário→DM para transformar uma publicação ou reel em um fluxo de conversa mensurável."
          action={<Link href="/campanhas/nova" className={buttonVariants()}>Criar campanha</Link>}
        />
      ) : (
        <Card className="p-5">
          <Table>
            <thead>
              <tr><Th>Campanha</Th><Th>Gatilho</Th><Th>Palavras-chave</Th><Th className="text-right">DMs</Th><Th className="text-right">Cliques</Th><Th className="text-right">CTR</Th><Th>Status</Th><Th className="text-right">Ativa</Th></tr>
            </thead>
            <tbody>
              {lista.map((c) => (
                <Tr key={c.id}>
                  <Td><span className="font-semibold">{c.nome}</span><span className="block font-mono text-[11px] text-muted-foreground">criada {c.criada}</span></Td>
                  <Td className="text-subtle">{c.gatilho}</Td>
                  <Td><span className="flex flex-wrap gap-1">{c.palavras.map((p) => <span key={p} className="rounded-md bg-accent px-1.5 py-0.5 font-mono text-[11px] text-accent-foreground dark:bg-info-bg dark:text-info-fg">{p}</span>)}</span></Td>
                  <Td className="text-right">{fmt(c.enviadas)}</Td>
                  <Td className="text-right">{fmt(c.cliques)}</Td>
                  <Td className="text-right">{c.ctr ? `${fmt(c.ctr, { decimals: 1 })}%` : "—"}</Td>
                  <Td>{c.status === "ativa" ? <Badge tone="success" pulse>Ativa</Badge> : <Badge tone="neutral">Pausada</Badge>}</Td>
                  <Td className="text-right">
                    <Switch label={`Ativar ${c.nome}`} checked={c.status === "ativa"}
                      onCheckedChange={(v) => setLista((l) => l.map((x) => (x.id === c.id ? { ...x, status: v ? "ativa" : "pausada" } : x)))} />
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}
      {!vazio && (
        <button className="self-start text-xs text-muted-foreground underline-offset-4 hover:underline" onClick={() => setLista([])}>Ver estado vazio (demo)</button>
      )}
    </div>
  );
}
