# Ola Tours — Front

> **Site institucional · PT-AO**
> Vamos explorar.

Site multi-página da **Ola Tours** — operadora angolana de viagens corporativas, mobilidade executiva e facilitação de negócios em Angola e na África subsariana. Est. 2014, Luanda · Angola.

---

## Sobre o projecto

Aplicação _front-end_ que serve a presença pública da Ola Tours. Concebida com uma estética corporativa institucional — tipografia condensada, grelhas editoriais, blocos de cor fortes e animações de _scroll_ — distribuída em 7 páginas:

| Rota          | Página        | Descrição                                                   |
| ------------- | ------------- | ----------------------------------------------------------- |
| `/`           | Home          | Capa, história, serviços, produtos, porquê nós, testemunhos |
| `/sobre`      | Sobre         | História, marcos, estatísticas, valores                     |
| `/agenda`     | Agenda        | Lista de eventos (mock API)                                 |
| `/agenda/:id` | EventoDetalhe | Detalhe do evento com galeria                               |
| `/servicos`   | Serviços      | Turismo de Negócios, Investimento, Frota                    |
| `/produtos`   | Produtos      | Mobilidade Corporativa, Missões, Eventos                    |
| `/contacto`   | Contacto      | Formulário, contactos, mapa Google                          |

A aplicação é estática: não tem _backend_ real — os dados de eventos são mockados em `src/data/events.ts` com delays simulados. Sem testes automatizados, sem i18n.

---

## Stack

| Camada       | Tecnologia                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| Framework    | React 19                                                                                                    |
| Linguagem    | TypeScript 6 (project references)                                                                           |
| _Build tool_ | Vite 8                                                                                                      |
| Estilização  | Tailwind CSS 4 (`@tailwindcss/vite`)                                                                        |
| Animação     | Motion 12 (`motion/react`)                                                                                  |
| Roteamento   | react-router-dom 7                                                                                          |
| Lint         | ESLint 10 (flat config) + `typescript-eslint` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` |
| Formatação   | Prettier 3                                                                                                  |

Sem _state manager_, sem CSS-in-JS, sem ícones externos.

---

## Demo

A versão publicada está em **<https://olatours.co.ao>**.

---

## Estrutura de pastas

```
.
├── index.html                 · entrada HTML, lang="pt-AO", fontes Google
├── public/
│   └── images/                · assets estáticos (olatours.png, icon.png)
├── src/
│   ├── App.tsx                · rotas + layout (header, footer)
│   ├── App.css                · .app-shell (flex column, min-h-screen)
│   ├── main.tsx               · bootstrap React 19 (BrowserRouter + StrictMode)
│   ├── index.css              · Tailwind v4 + @theme tokens + utilitários
│   ├── styles/
│   │   └── tokens.ts          · espelho JS dos tokens de design
│   ├── pages/
│   │   ├── Home.tsx           · página inicial (Cover + serviços + produtos + WhyUs + Testimonials)
│   │   ├── Sobre.tsx          · sobre a empresa
│   │   ├── Agenda.tsx         · listagem de eventos
│   │   ├── EventoDetalhe.tsx  · detalhe de evento individual
│   │   ├── Servicos.tsx       · wrapper do componente Services
│   │   ├── Produtos.tsx       · wrapper do componente Products
│   │   └── Contacto.tsx       · formulário + contactos + mapa
│   ├── components/
│   │   ├── AfricaMap.tsx      · SVG decorativo do continente africano
│   │   ├── Badge.tsx          · etiqueta com variantes de cor
│   │   ├── Button.tsx         · botão polimórfico (button / a)
│   │   ├── Cover.tsx          · hero com slideshow + overlay
│   │   ├── Footer.tsx         · rodapé institucional completo
│   │   ├── Logo.tsx           · wordmark com variantes de tamanho
│   │   ├── Marquee.tsx        · faixa animada de palavras
│   │   ├── Products.tsx       · grelha de 3 produtos
│   │   ├── Services.tsx       · grelha de 3 serviços
│   │   ├── SiteHeader.tsx     · header fixo com navegação
│   │   ├── Testimonials.tsx   · testemunhos de clientes
│   │   └── WhyUs.tsx          · 3 pilares de valor
│   ├── data/
│   │   └── events.ts          · mock API de eventos (fetchEventos, fetchEventoById)
│   └── hooks/
│       ├── useDocumentTitle.ts · actualiza document.title por página
│       └── useScrollToTop.ts   · scroll ao topo na mudança de rota
├── .github/workflows/ci.yml   · pipeline de qualidade + build
├── .vercel/project.json       · link do projecto Vercel (projectName: "olatours")
├── vite.config.ts             · plugins: @vitejs/plugin-react, @tailwindcss/vite
├── tsconfig.json              · referências de projecto (app + node)
├── eslint.config.js           · ESLint flat config
├── .prettierrc                · tabs, aspas simples, semi
└── .editorconfig              · tabs, LF, UTF-8
```

---

## Sistema de design

A identidade visual vive em dois sítios que se mantêm em sincronia:

- **`src/index.css`** — bloco `@theme {}` do Tailwind v4 com a paleta (`sky`, `flag`/`terracotta`, `navy`, `ink`, `white`, `gray-light`, `gray-border`), tipografia (Barlow, Barlow Condensed), _tracking_, sombras de cartão, e utilitários editoriais (`.corporate-grid`, `.card-elevated`, `.stat-glow`, `.marquee-track`, `.hero-zoom`, `.reveal-up`, `.count-in`, `.corner-pulse`, `.accent-bar`, `.section-rule`, etc.).
- **`src/styles/tokens.ts`** — espelho em TypeScript dos mesmos valores, usado para configurar variantes e transições de `motion/react` (durações, _easings_ e _staggers_).

Ao adicionar um elemento visual novo, **estender primeiro o `@theme` em `src/index.css`** e, se necessário, replicar no `tokens.ts`. Evitar estilos locais no componente.

> **Atenção:** não existe `tailwind.config.js` — a configuração é feita exclusivamente no bloco `@theme {}` de `src/index.css`. Não criar o ficheiro.

---

## Páginas principais

| Página (Rota)          | Componentes utilizados                                                    |
| ---------------------- | ------------------------------------------------------------------------- |
| Home (`/`)             | `Cover`, secção história, `Services`, `Products`, `WhyUs`, `Testimonials` |
| Sobre (`/sobre`)       | Hero, história, marcos, estatísticas, valores                             |
| Agenda (`/agenda`)     | Hero, grelha de eventos (fetch), CTA                                      |
| Evento (`/agenda/:id`) | Hero dinâmico, descrição, ficha técnica, galeria                          |
| Serviços (`/servicos`) | `Services` (wrapper)                                                      |
| Produtos (`/produtos`) | `Products` (wrapper)                                                      |
| Contacto (`/contacto`) | Hero, cards de contacto, formulário, mapa Google                          |

---

## Desenvolvimento local

### Pré-requisitos

- **Node.js 22** (versão fixada no CI).
- **npm** (o _lockfile_ é `package-lock.json`).

### Passos

```bash
npm install
npm run dev        # servidor de desenvolvimento com HMR
npm run type-check # verificação de tipos
npm run build      # type-check + bundle de produção
npm run preview    # servir dist/ localmente
```

---

## Scripts npm

| Script                 | Descrição                                       |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Vite dev server com HMR.                        |
| `npm run build`        | `tsc -b && vite build` — type-check + _bundle_. |
| `npm run preview`      | Serve `dist/` localmente.                       |
| `npm run type-check`   | `tsc -b --noEmit`.                              |
| `npm run lint`         | ESLint sobre o projecto.                        |
| `npm run lint:check`   | Igual a `lint` (alias explícito para CI).       |
| `npm run lint:fix`     | ESLint com `--fix`.                             |
| `npm run format`       | Prettier `--write` em todo o projecto.          |
| `npm run format:check` | Prettier `--check` (usado no CI).               |

---

## Qualidade de código

O projecto é deliberadamente estrito em TypeScript (`verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUnusedLocals`, `noUnusedParameters` — ver `tsconfig.app.json`). Algumas convenções a respeitar:

- Páginas em `src/pages/`, componentes reutilizáveis em `src/components/`, ficheiro único em PascalCase, exportação nomeada (`export function Cover()`). A única excepção é `App`, que mantém `export default`.
- Parâmetros intencionalmente não usados prefixam-se com `_`. Se o linter reclamar, recorrer ao padrão `void _x;` (ver `Button.tsx`).
- É permitido escrever `import App from './App.tsx'` (`allowImportingTsExtensions`). Manter a convenção.
- Usar `useDocumentTitle('Nome')` para definir o título da página.
- Dados mockados residem em `src/data/` com funções `async` que simulam latência de rede.
- **Sem comentários no código fonte** — seguir o estilo existente.
- Não criar `tailwind.config.js`. Estender o `@theme {}` em `src/index.css`.
- O projecto **não tem framework de testes**. Não adicionar Vitest nem afins sem pedido explícito.

### CI

O workflow em `.github/workflows/ci.yml` corre, por ordem, em Node 22:

1. `npm ci`
2. `npm run lint`
3. `npm run type-check`
4. `npm run format:check`
5. `npm run build`

Disparado em `push` e `pull_request` para `main` e `master`. Antes de abrir PR, replicar localmente nesta ordem.

---

## Deploy

O _deploy_ é gerido pela **Vercel** com rewrites SPA (`vercel.json` redirecciona todas as rotas para `/index.html`). O projecto está vinculado em `.vercel/project.json` (`projectName: "olatours"`). Cada _push_ à `main` dispara um deploy de produção.

---

## Contacto

- **Email:** `info@olatours.co.ao`
- **Telefone:** `+244 940 818 664`
- **Web:** `www.olatours.co.ao`
- **Localização:** Luanda · Angola

---

## Notas

- `.vercel/project.json` é _commitado_ apesar do guia habitual da Vercel. Manter como está, salvo decisão da equipa.

---

© 2026 Ola Tours · Alvará Turismo N.º 0089 / 2023 · Todos os direitos reservados.
