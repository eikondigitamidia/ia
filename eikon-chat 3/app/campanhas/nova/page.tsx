"use client";
import * as React from "react";
import { Plus, Check, Search } from "lucide-react";
import { conta, postsGrade } from "@/lib/data";
import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea, FieldHint } from "@/components/ui/input";
import { RadioCards } from "@/components/ui/radio-card";
import { SwitchRow } from "@/components/ui/switch";
import { Segmented } from "@/components/ui/tabs";
import { IPhone, IgDmHeader, IgDmBubble, IgComposer, IgComment } from "@/components/app/iphone";
import { cn } from "@/lib/utils";

type Gatilho = "especifico" | "qualquer" | "proximo";
type Palavras = "especificas" | "qualquer";
type Aba = "publicacao" | "comentarios" | "dm";

const cores = ["from-[#1B2A52] to-[#0A0D14]", "from-[#2A2145] to-[#0A0D14]", "from-[#132C3A] to-[#0A0D14]", "from-[#33270F] to-[#0A0D14]", "from-[#12301F] to-[#0A0D14]", "from-[#232A38] to-[#0A0D14]"];

export default function NovaCampanhaPage() {
  const [nome, setNome] = React.useState("");
  const [gatilho, setGatilho] = React.useState<Gatilho>("especifico");
  const [post, setPost] = React.useState(1);
  const [mostrar, setMostrar] = React.useState(8);
  const [buscaPost, setBuscaPost] = React.useState("");
  const [tipoPalavra, setTipoPalavra] = React.useState<Palavras>("especificas");
  const [palavras, setPalavras] = React.useState("FLASH, AGENDA");
  const [parcial, setParcial] = React.useState(false);
  const [viaDm, setViaDm] = React.useState(true);
  const [responderComent, setResponderComent] = React.useState(true);
  const [abertura, setAbertura] = React.useState(true);
  const [seguir, setSeguir] = React.useState(false);
  const [msgAbertura, setMsgAbertura] = React.useState("Oi, {username}! Vi teu comentário 🖤 Quer o link da agenda?");
  const [msgLink, setMsgLink] = React.useState("Aqui está, {username}: escolha o melhor horário pra tua sessão 👇\n{link}");
  const [link, setLink] = React.useState("https://inkfina.studio/agenda");
  const [agradecer, setAgradecer] = React.useState(false);
  const [aba, setAba] = React.useState<Aba>("dm");
  const [salvando, setSalvando] = React.useState(false);

  const termos = palavras.split(",").map((s) => s.trim()).filter(Boolean);
  const primeira = tipoPalavra === "especificas" ? termos[0] ?? "palavra" : "quero";
  const render = (s: string) => s.replaceAll("{username}", "@marina.ink").replaceAll("{link}", "").trim();
  const posts = postsGrade.filter((p) => p.toLowerCase().includes(buscaPost.toLowerCase()));
  const invalido = tipoPalavra === "especificas" && termos.length === 0;

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-8 sm:px-8">
      <PageHeader
        title="Nova campanha"
        description={nome || "Nova campanha"}
        actions={<Button loading={salvando} disabled={invalido} onClick={() => { setSalvando(true); setTimeout(() => setSalvando(false), 1200); }}>Ativar</Button>}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <form className="flex max-w-[560px] flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="nome">Nome da campanha <span className="font-normal text-muted-foreground">(opcional)</span></Label>
            <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="ex.: Flash Day dezembro" />
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-[15px] font-bold dark:font-semibold">Quando alguém comentar em</legend>
            <RadioCards<Gatilho>
              name="gatilho" value={gatilho} onChange={setGatilho}
              options={[
                { value: "especifico", label: "uma publicação ou reel específico" },
                { value: "qualquer", label: "qualquer publicação ou reel" },
                { value: "proximo", label: "próxima publicação ou reel" },
              ]}
            >
              {(v) => v === "especifico" && (
                <div className="rounded-xl border border-border bg-card p-3">
                  <div className="mb-3 flex items-center gap-2">
                    <label className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-input bg-card px-3 text-sm focus-within:border-primary dark:bg-n-100">
                      <Search className="size-4 text-muted-foreground" aria-hidden />
                      <input value={buscaPost} onChange={(e) => setBuscaPost(e.target.value)} placeholder="Buscar publicações pela legenda…" aria-label="Buscar publicações" className="min-w-0 flex-1 bg-transparent outline-none" />
                    </label>
                    <span className="font-mono text-xs text-muted-foreground">230</span>
                  </div>
                  <div role="radiogroup" aria-label="Escolha a publicação" className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {posts.slice(0, mostrar).map((p, i) => {
                      const on = post === i;
                      return (
                        <button key={p} type="button" role="radio" aria-checked={on} onClick={() => setPost(i)}
                          className={cn("relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br p-2 text-left text-[10.5px] font-semibold leading-tight text-white ring-offset-2 ring-offset-card transition", cores[i % cores.length], on ? "ring-2 ring-primary dark:ring-link" : "opacity-90 hover:opacity-100")}>
                          <span className="line-clamp-3">{p}</span>
                          {on && <span className="absolute bottom-1.5 right-1.5 grid size-5 place-items-center rounded-full bg-primary"><Check className="size-3" /></span>}
                        </button>
                      );
                    })}
                  </div>
                  {mostrar < posts.length && (
                    <Button type="button" variant="secondary" size="sm" className="mt-3 w-full" onClick={() => setMostrar(postsGrade.length)}>Mostrar {posts.length - mostrar} mais</Button>
                  )}
                </div>
              )}
            </RadioCards>
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-[15px] font-bold dark:font-semibold">E este comentário tem</legend>
            <RadioCards<Palavras>
              name="palavras" value={tipoPalavra} onChange={setTipoPalavra}
              options={[{ value: "especificas", label: "uma ou mais palavras específicas" }, { value: "qualquer", label: "qualquer palavra" }]}
            >
              {(v) => v === "especificas" && (
                <div className="flex flex-col gap-2">
                  <Input aria-label="Palavras-chave" aria-invalid={invalido} value={palavras} onChange={(e) => setPalavras(e.target.value)} placeholder="Digite uma ou mais palavras" />
                  <FieldHint error={invalido}>{invalido ? "Digite pelo menos uma palavra." : "Use vírgulas para separar as palavras"}</FieldHint>
                  {termos.length > 0 && <div className="flex flex-wrap gap-1.5">{termos.map((t) => <span key={t} className="rounded-md bg-accent px-2 py-0.5 font-mono text-xs text-accent-foreground dark:bg-info-bg dark:text-info-fg">{t.toUpperCase()}</span>)}</div>}
                  <SwitchRow label="Corresponder parte da palavra" checked={parcial} onCheckedChange={setParcial} />
                </div>
              )}
            </RadioCards>
            <SwitchRow label="também responder quando alguém enviar uma DM estas palavras" checked={viaDm} onCheckedChange={setViaDm} />
            <SwitchRow label="responder aos comentários na publicação" checked={responderComent} onCheckedChange={setResponderComent} />
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-[15px] font-bold dark:font-semibold">A pessoa vai receber</legend>
            <SwitchRow label="uma DM de abertura" checked={abertura} onCheckedChange={setAbertura} />
            {abertura && <Textarea aria-label="Mensagem de abertura" value={msgAbertura} onChange={(e) => setMsgAbertura(e.target.value)} />}
            <SwitchRow label="primeiro, a exigência de seguir" checked={seguir} onCheckedChange={setSeguir} />
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-[15px] font-bold dark:font-semibold">E então, a pessoa vai receber</legend>
            <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
              <Label htmlFor="msg-link" className="font-medium">uma DM com um link</Label>
              <Textarea id="msg-link" value={msgLink} onChange={(e) => setMsgLink(e.target.value)} placeholder="Escreva uma mensagem" />
              <div className="flex gap-2">
                <Input aria-label="Link de destino" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://" className="font-mono text-[13px]" />
                <Button type="button" variant="secondary"><Plus aria-hidden />Link</Button>
              </div>
              <FieldHint><code className="font-mono">{"{link}"}</code> insere o link rastreado; <code className="font-mono">{"{username}"}</code> personaliza.</FieldHint>
            </div>
            <SwitchRow label="uma mensagem de agradecimento em seguida" checked={agradecer} onCheckedChange={setAgradecer} />
          </fieldset>
        </form>

        {/* Prévia */}
        <aside aria-label="Prévia" className="flex flex-col items-center gap-4 lg:sticky lg:top-24 lg:self-start">
          <span className="label-mono self-start">Prévia</span>
          <IPhone>
            {aba === "dm" && (
              <>
                <IgDmHeader conta={conta.instagram.slice(1)} />
                <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-3 py-4">
                  <span className="self-end rounded-[18px] bg-[#3797F0] px-3 py-1.5 text-[12.5px]">{primeira.toUpperCase()}</span>
                  {abertura && <IgDmBubble>{render(msgAbertura) || "Escreva uma mensagem"}</IgDmBubble>}
                  {seguir && <IgDmBubble>Pra receber o link, segue o perfil e me responde aqui 🖤</IgDmBubble>}
                  <IgDmBubble link={link ? "Abrir link" : undefined}>{render(msgLink) || "Escreva uma mensagem"}</IgDmBubble>
                  {agradecer && <IgDmBubble>Valeu! Qualquer dúvida é só chamar.</IgDmBubble>}
                </div>
                <IgComposer />
              </>
            )}
            {aba === "comentarios" && (
              <div className="mt-24 flex flex-1 flex-col rounded-t-2xl bg-[#121212] px-4 pt-2">
                <span aria-hidden className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/30" />
                <p className="mb-4 text-center text-[13px] font-semibold">Comentários</p>
                <IgComment user="marina.ink" text={primeira.toLowerCase()} />
                {responderComent && <div className="ml-10 mt-3"><IgComment user={conta.instagram.slice(1)} text="Te mandei no direct 🖤" /></div>}
                <div className="mt-auto flex justify-between px-1 pb-2 text-base" aria-hidden><span>❤️</span><span>🙌</span><span>🔥</span><span>👏</span><span>😢</span><span>😍</span><span>😮</span><span>😂</span></div>
                <span className="mb-4 rounded-full bg-[#262626] px-3 py-2 text-[11.5px] text-white/50">Adicionar um comentário para {conta.instagram.slice(1)}…</span>
              </div>
            )}
            {aba === "publicacao" && (
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-2 px-3 py-2 text-[12.5px] font-semibold"><span className="size-6 rounded-full bg-[#2A2F3A]" aria-hidden />{conta.instagram.slice(1)}</div>
                <div className={cn("grid aspect-square place-items-center bg-gradient-to-br p-6 text-center text-sm font-bold", cores[post % cores.length])}>
                  {gatilho === "especifico" ? postsGrade[post] : gatilho === "qualquer" ? "Qualquer publicação" : "Próxima publicação"}
                </div>
                <p className="px-3 py-2 text-[12px] leading-[17px]"><strong>{conta.instagram.slice(1)}</strong> Comente <strong>{primeira.toUpperCase()}</strong> que eu te mando o link no direct 👇</p>
              </div>
            )}
          </IPhone>
          <Segmented<Aba> label="Visualizar prévia" value={aba} onChange={setAba}
            options={[{ value: "publicacao", label: "Publicação" }, { value: "comentarios", label: "Comentários" }, { value: "dm", label: "DM" }]} />
        </aside>
      </div>
    </div>
  );
}
