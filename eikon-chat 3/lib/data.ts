/**
 * Dados de exemplo (mock) — troque pelas chamadas reais da sua API.
 * Cada bloco indica o endpoint equivalente do Eikon Chat.
 */

export const conta = {
  usuario: "Rafa",
  workspace: "Ink Fina Studio",
  hospedagem: "Auto-hospedado",
  instagram: "@inkfina.studio",
  email: "contato@inkfina.studio",
  contatos: 1284,
  contasConectadas: 1,
  seguidores: 9373,
};

/* ---------- Painel  (GET /api/v1/dashboard) ---------- */
export const painelKpis = [
  { id: "campanhas", rotulo: "Campanhas ativas", valor: 6, delta: "2 novas esta semana", tom: "neutro" as const },
  { id: "enviadas", rotulo: "DMs enviadas", valor: 2418, delta: "↑ 18% vs. semana anterior", tom: "up" as const },
  { id: "ignoradas", rotulo: "Ignoradas", valor: 37, delta: "duplicadas ou sem palavra-chave", tom: "neutro" as const },
  { id: "falhou", rotulo: "Falhou", valor: 12, delta: "↑ 4 · limite de envio", tom: "down" as const },
  { id: "cliques", rotulo: "Cliques", valor: 1093, delta: "↑ 22% vs. semana anterior", tom: "up" as const },
  { id: "ctr", rotulo: "CTR", valor: 45.2, sufixo: "%", decimais: 1, delta: "↑ 1,6 p.p.", tom: "up" as const },
];

export const dms7dias = [
  { dia: "Sex", v: 284 }, { dia: "Sáb", v: 312 }, { dia: "Dom", v: 198 }, { dia: "Seg", v: 401 },
  { dia: "Ter", v: 377 }, { dia: "Qua", v: 452 }, { dia: "Qui", v: 394 },
];

export const palavrasChave = [
  { termo: "ORÇAMENTO", total: 642 }, { termo: "AGENDA", total: 418 }, { termo: "FLASH", total: 301 },
  { termo: "GUEST", total: 187 }, { termo: "PREÇO", total: 154 },
];

export type TipoAtividade = "enviada" | "clique" | "falhou" | "campanha";
export const atividadeRecente: { quem: string; texto: string; quando: string; tipo: TipoAtividade }[] = [
  { quem: "@marina.ink", texto: "recebeu a DM de ORÇAMENTO", quando: "há 2 min", tipo: "enviada" },
  { quem: "@lucas.blackwork", texto: "clicou no link da agenda", quando: "há 6 min", tipo: "clique" },
  { quem: "@bia.fineline", texto: "falhou · limite de envio", quando: "há 14 min", tipo: "falhou" },
  { quem: "Flash Day novembro", texto: "foi ativada", quando: "há 1 h", tipo: "campanha" },
  { quem: "@caio.oldschool", texto: "recebeu a DM de AGENDA", quando: "há 1 h", tipo: "enviada" },
];

/* ---------- Visão geral  (GET /api/v1/instagram/insights) ---------- */
export const visaoKpis = [
  { rotulo: "Visualizações", valor: 67400 }, { rotulo: "Alcance", valor: 52400 }, { rotulo: "Curtidas", valor: 1900 },
  { rotulo: "Comentários", valor: 262 }, { rotulo: "Salvamentos", valor: 132 }, { rotulo: "Compartilhamentos", valor: 182 },
];

const base = 8799;
const incr = [0, 12, 4, 6, 3, 15, 18, 20, 9, 14, 11, 8, 10, 22, 30, 28, 31, 18, 26, 20, 35, 42, 55, 30, 12, 25, 28, 21, 33, 14];
let acc = base;
export const seguidores = incr.map((d, i) => {
  acc += d;
  const dt = new Date(2026, 9, 14 + i);
  return { data: dt.toLocaleDateString("pt-BR", { day: "numeric", month: "short" }).replace(".", ""), total: acc };
});

export const publicacoes = [
  { legenda: "Fechamento de braço em blackwork — 3 sessões 🖤", tipo: "Reel", views: 3700, alcance: 2500, curtidas: 184, comentarios: 41, salvos: 22, compart: 18 },
  { legenda: "Quem é o impostor? PARTE 2 👀 Já curte, comenta FLASH", tipo: "Reel", views: 2600, alcance: 1800, curtidas: 52, comentarios: 38, salvos: 9, compart: 14 },
  { legenda: "Jogo do impostor: qual o estilo de tattoo?", tipo: "Reel", views: 1600, alcance: 1100, curtidas: 34, comentarios: 27, salvos: 6, compart: 11 },
  { legenda: "O que faz uma tatuagem custar R$ 400 e outra R$ 4 mil", tipo: "Carrossel", views: 1400, alcance: 875, curtidas: 21, comentarios: 19, salvos: 31, compart: 12 },
  { legenda: "Nem todo cliente vai agendar na primeira vez", tipo: "Reel", views: 1400, alcance: 918, curtidas: 50, comentarios: 12, salvos: 14, compart: 7 },
  { legenda: "Agenda de dezembro aberta — comente AGENDA", tipo: "Post", views: 1100, alcance: 661, curtidas: 13, comentarios: 64, salvos: 3, compart: 2 },
  { legenda: "Flash Day novembro: 20 desenhos, preço fechado", tipo: "Carrossel", views: 824, alcance: 488, curtidas: 16, comentarios: 22, salvos: 17, compart: 9 },
  { legenda: "Fine line no antebraço — cicatrização de 30 dias", tipo: "Reel", views: 655, alcance: 422, curtidas: 14, comentarios: 6, salvos: 5, compart: 3 },
  { legenda: "Guest em Lisboa em janeiro — comente GUEST", tipo: "Post", views: 572, alcance: 328, curtidas: 10, comentarios: 19, salvos: 4, compart: 6 },
];

/* ---------- Caixa de entrada  (GET /api/v1/inbox) ---------- */
export type Mensagem = { de: "eu" | "lead"; texto: string; hora: string };
export type Conversa = { id: string; handle: string; hora: string; ultima: string; naoLidas: number; mensagens: Mensagem[] };
export const conversas: Conversa[] = [
  {
    id: "1", handle: "@jana.machine.tattoo", hora: "17:46", ultima: "Você: Boa, estúdio próprio em Campinas…", naoLidas: 0,
    mensagens: [
      { de: "lead", texto: "Oi! Vi o reel do Flash Day e quero entender como funciona", hora: "17:41" },
      { de: "eu", texto: "Oi, Jana! Que bom que chegou até aqui. Pra eu entender teu momento: tu atende em estúdio próprio ou no de outra pessoa, e em qual cidade?", hora: "17:42" },
      { de: "lead", texto: "Meu", hora: "17:46" },
      { de: "lead", texto: "Campinas", hora: "17:46" },
      { de: "eu", texto: "Boa, estúdio próprio em Campinas. E qual é o teu estilo principal?", hora: "17:46" },
    ],
  },
  { id: "2", handle: "@ofelipe.fagundes", hora: "20:18", ultima: "Você: Te mandei o link da agenda 👇", naoLidas: 0, mensagens: [{ de: "lead", texto: "AGENDA", hora: "20:16" }, { de: "eu", texto: "Te mandei o link da agenda 👇 eikon.link/a/7Kd2", hora: "20:18" }] },
  { id: "3", handle: "@julianmagossi", hora: "19:28", ultima: "Quanto fica um fechamento de braço?", naoLidas: 2, mensagens: [{ de: "lead", texto: "Quanto fica um fechamento de braço?", hora: "19:28" }] },
  { id: "4", handle: "@dra.anamendess", hora: "18:56", ultima: "Eu que sou fã do teu traço!", naoLidas: 1, mensagens: [{ de: "lead", texto: "Eu que sou fã do teu traço!", hora: "18:56" }] },
  { id: "5", handle: "@odavidbomfim", hora: "17:23", ultima: "De longe pareceu mesmo", naoLidas: 0, mensagens: [{ de: "lead", texto: "De longe pareceu mesmo", hora: "17:23" }] },
  { id: "6", handle: "@andreazevedotattoo", hora: "15:33", ultima: "Você: Fechado, te espero quinta", naoLidas: 0, mensagens: [{ de: "eu", texto: "Fechado, te espero quinta às 14h.", hora: "15:33" }] },
  { id: "7", handle: "@mlacc_tattoo", hora: "15:20", ultima: "Você: muito foda seu trampo, podemos…", naoLidas: 0, mensagens: [{ de: "eu", texto: "Muito foda seu trampo, podemos falar sobre o guest?", hora: "15:20" }] },
  { id: "8", handle: "@leotattoo18", hora: "14:17", ultima: "FLASH", naoLidas: 0, mensagens: [{ de: "lead", texto: "FLASH", hora: "14:17" }] },
];

/* ---------- Campanhas  (GET /api/v1/campaigns) ---------- */
export const campanhas = [
  { id: "c1", nome: "Flash Day novembro", gatilho: "Publicação específica", palavras: ["FLASH"], status: "ativa" as const, enviadas: 812, cliques: 401, ctr: 49.4, criada: "03/11/2026" },
  { id: "c2", nome: "Agenda de dezembro", gatilho: "Qualquer publicação", palavras: ["AGENDA", "HORÁRIO"], status: "ativa" as const, enviadas: 964, cliques: 433, ctr: 44.9, criada: "28/10/2026" },
  { id: "c3", nome: "Orçamento rápido", gatilho: "Qualquer publicação", palavras: ["ORÇAMENTO", "PREÇO", "VALOR"], status: "ativa" as const, enviadas: 642, cliques: 259, ctr: 40.3, criada: "12/10/2026" },
  { id: "c4", nome: "Guest Lisboa", gatilho: "Próxima publicação", palavras: ["GUEST"], status: "pausada" as const, enviadas: 0, cliques: 0, ctr: 0, criada: "11/11/2026" },
];

export const postsGrade = [
  "Fechamento de braço blackwork", "Flash Day novembro", "Agenda de dezembro", "Fine line antebraço", "Quem é o impostor? Parte 2",
  "R$ 400 vs R$ 4 mil", "Guest em Lisboa", "Cicatrização 30 dias", "Estilo old school", "Bastidores do estúdio",
  "Rosa em pontilhismo", "Lettering no costelas",
];

/* ---------- Logs  (GET /api/v1/dm-logs) ---------- */
export type StatusLog = "enviada" | "falhou" | "pendente" | "limite_envio" | "limite_plano" | "duplicada";
export const logs: { id: string; para: string; campanha: string; palavra: string; status: StatusLog; quando: string; detalhe: string }[] = [
  { id: "l1", para: "@marina.ink", campanha: "Orçamento rápido", palavra: "ORÇAMENTO", status: "enviada", quando: "12/11 14:30", detalhe: "Link entregue" },
  { id: "l2", para: "@lucas.blackwork", campanha: "Agenda de dezembro", palavra: "AGENDA", status: "enviada", quando: "12/11 14:26", detalhe: "Clique em 1 min" },
  { id: "l3", para: "@bia.fineline", campanha: "Flash Day novembro", palavra: "FLASH", status: "limite_envio", quando: "12/11 14:18", detalhe: "Meta: 200 DMs/hora atingido" },
  { id: "l4", para: "@caio.oldschool", campanha: "Agenda de dezembro", palavra: "AGENDA", status: "enviada", quando: "12/11 13:41", detalhe: "Link entregue" },
  { id: "l5", para: "@renata.ink", campanha: "Flash Day novembro", palavra: "FLASH", status: "duplicada", quando: "12/11 13:22", detalhe: "Já recebeu esta DM" },
  { id: "l6", para: "@thi.tattoo", campanha: "Orçamento rápido", palavra: "PREÇO", status: "falhou", quando: "12/11 12:58", detalhe: "Usuário restringiu mensagens" },
  { id: "l7", para: "@gui.realismo", campanha: "Agenda de dezembro", palavra: "HORÁRIO", status: "pendente", quando: "12/11 12:57", detalhe: "Aguardando seguir" },
  { id: "l8", para: "@paula.aquarela", campanha: "Orçamento rápido", palavra: "VALOR", status: "enviada", quando: "12/11 12:40", detalhe: "Link entregue" },
];

/* ---------- Diagnóstico  (GET /api/v1/diagnostics) ---------- */
export const diagnostico = {
  worker: { status: "Saudável", ultimoSinal: "há 24s" },
  filas: [
    { rotulo: "Fila aguardando", valor: 3 }, { rotulo: "Fila ativa", valor: 1 },
    { rotulo: "Fila atrasada", valor: 0 }, { rotulo: "Fila falhou", valor: 2 },
  ],
  alertas: [] as { titulo: string; quando: string }[],
  falhasDm: [
    { para: "@thi.tattoo", motivo: "Usuário restringiu mensagens", quando: "12/11 12:58" },
    { para: "@bia.fineline", motivo: "Limite de envio (200/h)", quando: "12/11 14:18" },
  ],
  falhasWebhook: [] as { evento: string; quando: string }[],
  falhasToken: [] as { conta: string; quando: string }[],
  timeline: [
    { origem: "WORKER", evento: "Fila processada: 48 jobs em 2,1s", quando: "12/11/2026, 14:32:08" },
    { origem: "SYSTEM", evento: "Token do Instagram renovado (expira 11/01/2027)", quando: "12/11/2026, 09:00:00" },
    { origem: "SYSTEM", evento: "Webhook signature verification failed", quando: "12/11/2026, 04:55:31" },
    { origem: "SYSTEM", evento: "Webhook signature verification failed", quando: "12/11/2026, 04:53:15" },
  ],
};
