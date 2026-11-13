"use client";
import * as React from "react";
import { ArrowLeft, Search, Send } from "lucide-react";
import { conversas as inicial, type Mensagem } from "@/lib/data";
import { ConversationItem, Bubble } from "@/components/app/chat";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CaixaDeEntradaPage() {
  const [lista, setLista] = React.useState(inicial);
  const [ativa, setAtiva] = React.useState<string | null>(inicial[0].id);
  const [mobileDetalhe, setMobileDetalhe] = React.useState(false);
  const [busca, setBusca] = React.useState("");
  const [texto, setTexto] = React.useState("");
  const fimRef = React.useRef<HTMLDivElement>(null);

  const conversa = lista.find((c) => c.id === ativa) ?? null;
  const filtradas = lista.filter((c) => c.handle.toLowerCase().includes(busca.toLowerCase()));

  React.useEffect(() => { fimRef.current?.scrollIntoView({ block: "end" }); }, [ativa, conversa?.mensagens.length]);

  const abrir = (id: string) => {
    setAtiva(id); setMobileDetalhe(true);
    setLista((l) => l.map((c) => (c.id === id ? { ...c, naoLidas: 0 } : c)));
  };

  const enviar = () => {
    const t = texto.trim();
    if (!t || !conversa) return;
    const hora = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const msg: Mensagem = { de: "eu", texto: t, hora };
    setLista((l) => l.map((c) => (c.id === conversa.id ? { ...c, mensagens: [...c.mensagens, msg], ultima: `Você: ${t}`, hora } : c)));
    setTexto("");
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-6 sm:px-8 sm:py-8">
      <h1 className={cn("heading text-h1", mobileDetalhe && "hidden md:block")}>Caixa de entrada</h1>

      <div className="grid h-[calc(100vh-200px)] min-h-[520px] overflow-hidden rounded-2xl border border-border bg-card shadow-e2 md:grid-cols-[340px_minmax(0,1fr)]">
        {/* Lista */}
        <section aria-label="Conversas" className={cn("flex min-h-0 flex-col border-r border-border bg-card dark:bg-panel", mobileDetalhe && "hidden md:flex")}>
          <div className="flex flex-col gap-3 p-4 pb-3">
            <h2 className="heading text-h2 text-primary dark:text-foreground">Conversas</h2>
            <label className="flex h-9 items-center gap-2 rounded-lg border border-input bg-card px-3 text-sm text-muted-foreground focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/15 dark:bg-n-100">
              <Search className="size-4" aria-hidden />
              <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar @" aria-label="Buscar conversa" className="min-w-0 flex-1 bg-transparent text-foreground outline-none" />
            </label>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-2 pb-3">
            {filtradas.map((c) => <ConversationItem key={c.id} {...c} ativo={c.id === ativa} onClick={() => abrir(c.id)} />)}
            {filtradas.length === 0 && <p className="p-6 text-center text-sm text-muted-foreground">Nenhuma conversa encontrada.</p>}
          </div>
        </section>

        {/* Conversa */}
        <section aria-label={conversa ? `Conversa com ${conversa.handle}` : "Conversa"} className={cn("flex min-h-0 flex-col", !mobileDetalhe && "hidden md:flex")}>
          {conversa ? (
            <>
              <div className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
                <button className="grid size-8 place-items-center rounded-lg text-subtle md:hidden" aria-label="Voltar para a lista" onClick={() => setMobileDetalhe(false)}><ArrowLeft className="size-4" /></button>
                <Avatar name={conversa.handle} size={36} />
                <strong className="text-[15px] font-bold dark:font-semibold">{conversa.handle}</strong>
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-background/60 px-4 py-6 sm:px-8 dark:bg-spotlight">
                <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[.06em] text-muted-foreground dark:text-spotlight-muted">
                  <span className="h-px flex-1 bg-border dark:bg-spotlight-border" />Hoje<span className="h-px flex-1 bg-border dark:bg-spotlight-border" />
                </div>
                {conversa.mensagens.map((m, i) => <Bubble key={i} {...m} />)}
                <div ref={fimRef} />
              </div>
              <form className="border-t border-border p-3 sm:p-4" onSubmit={(e) => { e.preventDefault(); enviar(); }}>
                <label htmlFor="resposta" className="sr-only">Mensagem</label>
                <div className="flex items-end gap-2 rounded-2xl border border-input bg-card p-2 focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/15 dark:bg-n-100">
                  <textarea
                    id="resposta" rows={2} value={texto} onChange={(e) => setTexto(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviar(); } }}
                    placeholder="Escreva uma resposta… (Enter para enviar, Shift+Enter para nova linha)"
                    className="min-w-0 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm leading-[22px] outline-none"
                  />
                  <Button type="submit" disabled={!texto.trim()}><Send aria-hidden />Enviar</Button>
                </div>
              </form>
            </>
          ) : (
            <p className="m-auto text-sm text-muted-foreground">Selecione uma conversa.</p>
          )}
        </section>
      </div>
    </div>
  );
}
