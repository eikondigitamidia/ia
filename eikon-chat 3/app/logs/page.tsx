"use client";
import * as React from "react";
import { ScrollText } from "lucide-react";
import { logs, type StatusLog } from "@/lib/data";
import { PageHeader } from "@/components/app/page-header";
import { Chip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, Td, Th, Tr } from "@/components/ui/table";

const FILTROS: { id: "todos" | StatusLog; label: string }[] = [
  { id: "todos", label: "Todos" }, { id: "enviada", label: "Enviada" }, { id: "falhou", label: "Falhou" },
  { id: "pendente", label: "Pendente" }, { id: "limite_envio", label: "Limite de envio atingido" },
  { id: "limite_plano", label: "Limite do plano" }, { id: "duplicada", label: "Duplicada" },
];

const STATUS: Record<StatusLog, { label: string; tone: "success" | "danger" | "info" | "warning" | "neutral" }> = {
  enviada: { label: "Enviada", tone: "success" }, falhou: { label: "Falhou", tone: "danger" }, pendente: { label: "Pendente", tone: "info" },
  limite_envio: { label: "Limite de envio", tone: "warning" }, limite_plano: { label: "Limite do plano", tone: "warning" }, duplicada: { label: "Duplicada", tone: "neutral" },
};

export default function LogsPage() {
  const [filtro, setFiltro] = React.useState<(typeof FILTROS)[number]["id"]>("todos");
  const lista = filtro === "todos" ? logs : logs.filter((l) => l.status === filtro);
  const conta = (id: string) => (id === "todos" ? logs.length : logs.filter((l) => l.status === id).length);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-4 py-8 sm:px-8">
      <PageHeader title="Logs de DMs" />
      <div role="group" aria-label="Filtrar por status" className="flex flex-wrap gap-2">
        {FILTROS.map((f) => <Chip key={f.id} active={filtro === f.id} count={conta(f.id)} onClick={() => setFiltro(f.id)}>{f.label}</Chip>)}
      </div>
      {lista.length === 0 ? (
        <EmptyState icon={ScrollText} title="Nenhum log encontrado" />
      ) : (
        <Card className="p-5">
          <Table>
            <thead><tr><Th>Para</Th><Th>Campanha</Th><Th>Palavra</Th><Th>Status</Th><Th>Detalhe</Th><Th className="text-right">Quando</Th></tr></thead>
            <tbody>
              {lista.map((l) => (
                <Tr key={l.id}>
                  <Td className="font-semibold">{l.para}</Td>
                  <Td className="text-subtle">{l.campanha}</Td>
                  <Td><span className="font-mono text-[12px]">{l.palavra}</span></Td>
                  <Td><Badge tone={STATUS[l.status].tone}>{STATUS[l.status].label}</Badge></Td>
                  <Td className="text-muted-foreground">{l.detalhe}</Td>
                  <Td className="text-right font-mono text-[12px] text-muted-foreground">{l.quando}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}
    </div>
  );
}
