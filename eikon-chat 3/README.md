# Eikon Chat — Front-end (Direção A + Direção C)

Projeto **Next.js 15 + TypeScript + Tailwind 3**, no padrão **shadcn/ui**, com a nova identidade do Eikon Chat:

| Tema | Direção | Fontes | Base |
|---|---|---|---|
| **Claro** | A · Precisão | Plus Jakarta Sans + JetBrains Mono | `#F7F9FD`, marinho `#0B1B3F`, azul `#1F4FE0` |
| **Escuro** | C · Preto e branco | Geist + Geist Mono | `#0A0D14`, texto `#E8ECF4`, azul `#2F5FE8`, peças brancas |

O botão de lua/sol no topo alterna entre os dois temas. A escolha fica salva e, na primeira visita, o app segue o sistema do usuário.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

As fontes vêm de pacotes npm (`geist`, `@fontsource-variable/*`), então o build não depende do Google Fonts.

## Telas (rotas)

| Rota | Tela |
|---|---|
| `/` | Painel: 6 KPIs com contagem animada, gráfico de 7 dias, palavras-chave, atividade |
| `/visao-geral` | Métricas do Instagram, gráfico de seguidores (com tabela), publicações, *skeleton* ao trocar o período |
| `/caixa-de-entrada` | Lista + conversa, envio com Enter. No celular, lista e conversa viram duas telas |
| `/campanhas` | Lista com toggle de ativação e estado vazio |
| `/campanhas/nova` | Formulário completo com prévia no iPhone (abas Publicação / Comentários / DM, atualiza ao digitar) |
| `/logs` | Chips de filtro com contagem, tabela e estado vazio |
| `/configuracoes` | Acordeões: idioma, Zernio, conexão com o Instagram, equipe, uso |
| `/api-mcp` | Criação de chave somente leitura, endpoints com botão de copiar |
| `/diagnostico` | Worker, 4 filas, alertas, falhas, linha do tempo |
| `/design-system` | Página-resumo para o time: tokens dos dois temas, tipografia e todos os componentes com estados |

Menu lateral: recolhe para só ícones (fica salvo) e vira gaveta no celular.

## Estrutura

```
app/
  globals.css            ← TODOS os tokens (claro e escuro) — comece por aqui
  layout.tsx             ← fontes + tema + AppShell
  <rota>/page.tsx        ← cada tela
components/
  ui/                    ← biblioteca: button, input/select/textarea, switch, radio-card,
                           chip, badge, card, accordion, table, tabs, avatar, skeleton,
                           empty-state, breadcrumb
  app/                   ← app-shell (sidebar + topo), nav.ts (menu e trilhas), logo,
                           kpi-card, count-up, bar-chart, line-chart, chat, iphone, theme-toggle
lib/
  data.ts                ← dados de exemplo (cada bloco indica o endpoint a ligar)
  utils.ts               ← cn(), fmt() (pt-BR), initials()
tailwind.config.ts       ← mapeia os tokens para classes (bg-primary, text-muted-foreground…)
```

## Como reconstruir o Eikon Chat atual com isto

1. **Tokens primeiro.** Copie `app/globals.css`, `tailwind.config.ts` e `lib/utils.ts` para o projeto atual. Se ele já usa shadcn, os nomes (`background`, `foreground`, `primary`, `muted`, `accent`, `border`, `input`, `ring`, `card`) são os mesmos. A diferença é que os valores estão em RGB (`r g b`), não em HSL, e o config já usa `rgb(var(--x) / <alpha-value>)`.
2. **Fontes.** Instale `geist`, `@fontsource-variable/plus-jakarta-sans` e `@fontsource-variable/jetbrains-mono`. Copie os imports do `app/layout.tsx`.
3. **Tema.** Instale `next-themes` e copie `app/providers.tsx`.
4. **Componentes.** Copie `components/ui` e `components/app`. Eles só dependem de `lucide-react`, `class-variance-authority`, `clsx` e `tailwind-merge`.
5. **Telas.** Para cada rota, troque os imports de `@/lib/data` pelas suas chamadas reais (Server Actions, `fetch` ou React Query). A marcação e as classes ficam iguais.
6. Se quiser, remova o item **Design system** do menu em `components/app/nav.ts` (`DEV_NAV`).

> Dica: abra o projeto atual no Claude Code e peça: *"aplique o design system de `eikon-chat-ui/` neste projeto, tela por tela, mantendo a lógica e as chamadas de API existentes"*.

## Regras do sistema (resumo)

- **Cor:** um azul de ação por tema. Ciano (A) e azul-claro `#8FB0FF` (C) só em gráficos, links e foco. Nenhum gradiente em texto. O único gradiente da marca é a "linha de agulha" (`.needle`).
- **Escuro (C):** superfícies quase pretas e peças **brancas** que saltam da tela: o logo, os avatares, o cartão de destaque (`SpotlightCard`, usado no gráfico do Painel) e a área de leitura da conversa.
- **Tipografia:** títulos com a classe `heading` (peso 800 no claro, 600 no escuro). Números com `kpi-num` (tabulares). Horários e código em `font-mono`.
- **Escala:** `text-display` 44 · `text-h1` 32 · `text-h2` 22 · `text-h3` 16 · `text-h4` 14 · `text-body` 14/22 · `text-caption` 12 · `text-kpi` 30.
- **Forma:** grade de 4px, raio base 10px (cards 14px), sombras `shadow-e1/e2/e3` e `shadow-brand` só no botão primário.
- **Motion:** `cubic-bezier(.22,1,.36,1)` em 150 / 200 / 300 ms. Números contam por 1.300 ms ao abrir a tela (`<CountUp>`). Tudo respeita `prefers-reduced-motion`.
- **Contraste AA verificado** nos dois temas: texto ≥ 4,5:1 (o menor é o texto de rótulo no escuro, 5,4:1).
- **Acessibilidade:** botões reais, `aria-*` em toggles, rádios, abas e acordeões, foco visível, trilha com `aria-current`.
