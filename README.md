# Ola Tours — Front

> **Dossiê N.º 01 / 26 · PT-AO**
> Vamos explorar.

Site institucional e de marca da **Ola Tours Corporativo** — operadora angolana de
viagens corporativas, mobilidade executiva e facilitação de negócios em Angola
e na África subsariana. Est. 2014, Luanda · Angola.

---

## Sobre o projecto

Esta é a aplicação _front-end_ que serve a presença pública da Ola Tours. Foi
concebida como uma única página (SPA) com a estética de um _dossier_ de viagem
— papel impresso, carimbos, tipografia editorial e numeração de processo —
servindo, em ordem, a Capa, a Agenda, a proposta de valor, uma _marquee_ de
atributos da marca, os Serviços, os Produtos, Testemunhos e o Contacto,
seguidos de um rodapé institucional.

A aplicação é estática: não tem _backend_, nem _router_, nem testes
automatizados, nem camada de internacionalização. Cada secção é um componente
React composto sequencialmente em `src/App.tsx`.

---

## Stack

| Camada       | Tecnologia                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| Framework    | React 19                                                                                                    |
| Linguagem    | TypeScript 6 (project references)                                                                           |
| _Build tool_ | Vite 8                                                                                                      |
| Estilização  | Tailwind CSS 4 (`@tailwindcss/vite`)                                                                        |
| Animação     | Motion 12 (`motion/react`)                                                                                  |
| Lint         | ESLint 10 (flat config) + `typescript-eslint` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` |
| Formatação   | Prettier 3                                                                                                  |

Sem _router_, sem _state manager_, sem CSS-in-JS, sem ícones externos.

---

## Demo

A versão publicada está em **<https://olatours.co.ao>**.

---

## Estrutura de pastas

```
.
├── index.html                 · entrada HTML, lang="pt-AO", fontes Google
├── public/
│   └── images/                · assets estáticos (logo, ícone)
├── src/
│   ├── App.tsx                · composição das secções + rodapé
│   ├── App.css                · estilos residuais (efetivamente não usado)
│   ├── main.tsx               · bootstrap React 19 (createRoot + StrictMode)
│   ├── index.css              · Tailwind v4 + @theme tokens + utilitários editoriais
│   ├── styles/
│   │   └── tokens.ts          · espelho JS dos tokens de design (cores, fontes, motion)
│   └── components/
│       ├── AfricaMap.tsx      · mapa decorativo do continente
│       ├── Agenda.tsx         · agenda / próximas viagens
│       ├── Badge.tsx          · selo / etiqueta numerada
│       ├── Button.tsx         · botão com variantes editorial / stamp
│       ├── Contact.tsx        · bloco de contacto (id="contacto")
│       ├── Cover.tsx          · capa (id="capa")
│       ├── DossierHeader.tsx  · cabeçalho com navegação fixa
│       ├── Logo.tsx           · wordmark / símbolo
│       ├── Marquee.tsx        · faixa animada de palavras
│       ├── Products.tsx       · produtos / pacotes
│       ├── Seal.tsx           · carimbo rotativo decorativo
│       ├── Services.tsx       · serviços
│       ├── Testimonials.tsx   · testemunhos
│       └── WhyUs.tsx          · porquê nós
├── .github/workflows/ci.yml   · pipeline de qualidade + build
├── .vercel/project.json       · link do projecto Vercel (projectName: "olatours")
├── vite.config.ts             · plugins: @vitejs/plugin-react, @tailwindcss/vite
├── tsconfig.json              · referências de projecto (app + node)
├── eslint.config.js           · ESLint flat config
├── .prettierrc                · tabs, aspas simples, semi (canónico)
├── .prettierrc.json           · configuração em conflito — ver "Notas"
└── .editorconfig              · tabs, LF, UTF-8
```

---

## Sistema de design

A identidade visual vive em dois sítios que se mantêm em sincronia:

- **`src/index.css`** — bloco `@theme {}` do Tailwind v4 com a paleta completa
  (`paper`, `paper-card`, `paper-warm`, `ink`, `ink-soft`, `ink-mute`,
  `terracotta`/`flag`, `ochre`, `moss`, `navy`, `sky`, `line`, `line-soft`),
  tipografia (`Barlow`, `Barlow Condensed`, `Fraunces`, `JetBrains Mono`),
  _tracking_, sombras duras de carimbo e utilitários editoriais
  (`.paper-grain`, `.marquee-track`, `.rule`, `.rule-strong`, `.hairline`,
  `.ticker`, `.ticket-edge`, `.perforation`, `.dossier-tick`,
  `.shadow-stamp`/`.shadow-terracotta`/`.shadow-ochre`/`.shadow-navy`,
  `.stamp-rotate`/`.stamp-press`, `.pulse-ring`/`.pulse-dot`, `.reveal-up`).
- **`src/styles/tokens.ts`** — espelho em TypeScript dos mesmos valores, usado
  para configurar variantes e transições de `motion/react` (durações, _easings_
  e _staggers_).

Ao adicionar um elemento visual novo, **estender primeiro o `@theme` em
`src/index.css`** e, se necessário, replicar no `tokens.ts`. Evitar estilos
locais no componente.

> **Atenção:** não existe `tailwind.config.js` — a configuração é feita
> exclusivamente no bloco `@theme {}` de `src/index.css`. Não criar o ficheiro.

---

## Componentes principais

| Componente      | Função                                                              |
| --------------- | ------------------------------------------------------------------- |
| `DossierHeader` | Cabeçalho fixo com navegação e identificação de "dossiê".           |
| `Cover`         | Capa com proposta de valor, mapa de fundo e selos decorativos.      |
| `Agenda`        | Próximas viagens / marcos operativos.                               |
| `WhyUs`         | Proposta de valor — atributos da marca.                             |
| `Marquee`       | Faixa horizontal animada (props: `items`, `tone`, `separator`).     |
| `Services`      | Serviços (Negócios, Investimento, Transporte & Frota).              |
| `Products`      | Produtos (Mobilidade, Missões, Eventos).                            |
| `Testimonials`  | Testemunhos de clientes.                                            |
| `Contact`       | Bloco de contacto (`id="contacto"`) — email, telefone, morada.      |
| `Seal`          | Carimbo rotativo decorativo (efeito _press_ ao entrar no viewport). |
| `Badge`         | Etiqueta numerada tipo "Nº 01".                                     |
| `AfricaMap`     | SVG decorativo do continente africano.                              |
| `Logo`          | _Wordmark_ com variantes de tamanho e cor.                          |
| `Button`        | Botão com variantes (editorial, _stamp_).                           |

---

## Desenvolvimento local

### Pré-requisitos

- **Node.js 22** (versão fixada no CI).
- **npm** (o _lockfile_ é `package-lock.json`).

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Servidor de desenvolvimento com HMR
npm run dev

# 3. Verificação de tipos e *bundle* de produção
npm run type-check
npm run build

# 4. Servir o build localmente
npm run preview
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

O projecto é deliberadamente estrito em TypeScript (`verbatimModuleSyntax`,
`erasableSyntaxOnly`, `noUnusedLocals`, `noUnusedParameters`,
`noFallthroughCasesInSwitch` — ver `tsconfig.app.json`). Algumas convenções a
respeitar:

- Cada secção é um **componente em `src/components/`**, ficheiro único em
  PascalCase, exportação nomeada (`export function Cover()`). A única excepção
  é `App`, que mantém `export default`.
- Parâmetros intencionalmente não usados prefixam-se com `_`. Se o linter
  reclamar, recorrer ao padrão `void _x;` (ver `Button.tsx`).
- É permitido escrever `import App from './App.tsx'` (`allowImportingTsExtensions`).
  Manter a convenção.
- **Sem comentários no código fonte** — seguir o estilo existente.
- Não criar `tailwind.config.js`. Estender o `@theme {}` em `src/index.css`.
- O projecto **não tem framework de testes**. Não adicionar Vitest nem afins sem
  pedido explícito.

### CI

O workflow em `.github/workflows/ci.yml` corre, por ordem, em Node 22:

1. `npm ci`
2. `npm run lint`
3. `npm run type-check`
4. `npm run format:check`
5. `npm run build`

Disparado em `push` e `pull_request` para `main` e `master`. Antes de abrir
PR, replicar localmente nesta ordem.

---

## Deploy

O _deploy_ é gerido pela **Vercel**. O projecto está vinculado em
`.vercel/project.json` (`projectName: "olatours"`). Cada _push_ à `main`
dispara um deploy de produção.

---

## Contacto

- **Email:** `info@olatours.co.ao`
- **Telefone:** `+244 940 818 664`
- **Web:** `www.olatours.co.ao`
- **Localização:** Luanda · Angola

---

## Notas

- Existem dois ficheiros de configuração do Prettier (`.prettierrc` e
  `.prettierrc.json`) com `semi` em conflito. Por ordem de prioridade do
  Prettier, `.prettierrc` ganha, pelo que o código actual usa ponto-e-vírgula.
  Resolver eliminando o ficheiro perdedor antes de qualquer alteração de
  estilo em massa.
- `.vercel/project.json` é _commitado_ apesar do guia habitual da Vercel.
  Manter como está, salvo decisão da equipa.

---

© 2026 Ola Tours · Alvará Turismo N.º 0089 / 2023 · Todos os direitos reservados.
