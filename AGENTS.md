# Ola Tours — front

Site institucional multi-página (pt-AO) para a Ola Tours — operadora angolana de viagens corporativas, mobilidade executiva e facilitação de negócios. React 19 + TypeScript + Vite, Tailwind v4, motion, react-router-dom. Sem backend — dados mockados em `src/data/`.

## Commands

Node 22 (pinned in CI). All scripts are in `package.json`.

- `npm run dev` — Vite dev server with HMR.
- `npm run build` — `tsc -b && vite build` (type-check then bundle). Use this for production verification.
- `npm run preview` — serve `dist/`.
- `npm run type-check` — `tsc -b --noEmit` (do not run bare `tsc`; project references require `-b`).
- `npm run lint` / `lint:fix` — ESLint flat config (`eslint.config.js`).
- `npm run format` / `format:check` — Prettier.

There is no test script and no test framework. Do not add Vitest unless asked.

CI runs `lint → type-check → format:check → build` on push/PR to `main` and `master` (`.github/workflows/ci.yml`). Match that order locally before pushing.

## Project layout

- `index.html` → mounts `src/main.tsx` → `BrowserRouter` + renders `src/App.tsx`.
- `src/App.tsx` — composes `SiteHeader`, `<Routes>` with 8 routes (Home, Sobre, Agenda, EventoDetalhe, Servicos, Produtos, Contacto, Carreiras), and `Footer`.
- `src/pages/` — one PascalCase file per route (`Home.tsx`, `Sobre.tsx`, `Agenda.tsx`, `EventoDetalhe.tsx`, `Servicos.tsx`, `Produtos.tsx`, `Contacto.tsx`, `Carreiras.tsx`).
- `src/components/` — reusable sections used across pages (`Cover.tsx`, `SiteHeader.tsx`, `Footer.tsx`, `Services.tsx`, `Products.tsx`, `WhyUs.tsx`, `Testimonials.tsx`, `Marquee.tsx`, `Button.tsx`, `Logo.tsx`, `Badge.tsx`, `AfricaMap.tsx`, `Gallery.tsx`, `PartnersSlider.tsx`).
- `src/data/` — mock data layer (`events.ts` with `fetchEventos()`, `fetchEventoById()`).
- `src/hooks/` — `useScrollToTop.ts`, `useDocumentTitle.ts`.
- `src/styles/tokens.ts` — JS-side mirror of design tokens (colors, fonts, motion durations/eases, stagger).
- `src/index.css` — Tailwind v4 entry + `@theme {}` design tokens + global utility classes. **There is no `tailwind.config.js` — do not create one.**
- `public/images/` — static assets (`olatours.png`, `icon.png`).
- `.vercel/project.json` — Vercel project link; project name is `olatours`. Leave committed; do not rename.

## Design system

Brand colors (use as Tailwind classes, e.g. `bg-navy`, `text-flag`): `sky`/`sky-dark`/`sky-50`, `flag`/`terracotta`/`flag-dark`/`flag-50`, `navy`/`navy-dark`/`navy-50`, `ink`/`ink-soft`/`ink-mute`, `white`, `cream`/`cream-50`, `sand`/`sand-50`, `gray-light`/`gray-border`/`gray-border-soft`. Full hex values in `src/index.css` (`@theme` block) and `src/styles/tokens.ts`.

Fonts (loaded via Google Fonts in `index.html`): Barlow (sans default), Barlow Condensed (`font-display`), EB Garamond (`font-editorial`). Utility classes: `font-display`, `font-editorial`, `eyebrow`, `label-caps`.

Custom effects defined in `src/index.css`: `corporate-grid`, `card-elevated`, `stat-glow`, `marquee-track`/`marquee-track-slow`, `marquee-container`, `pulse-ring`/`pulse-dot`, `hero-zoom`, `reveal-up`, `count-in`, `corner-pulse`, `accent-bar`/`accent-bar-flag`, `dash-flag`, `geo-diamond`/`geo-diamond-subtle`, `rule`/`rule-strong`/`section-rule`/`section-rule-strong`/`hairline`, `grain`, `partner-logo`, `lightbox-overlay`, `lightbox-btn`, `gallery-grid`, `gallery-item`.

When adding a new visual element, prefer extending the `@theme` block + utility classes here over component-local styles. `src/App.css` is minimal (`.app-shell` flex layout only).

## TypeScript gotchas

- `verbatimModuleSyntax: true` — every type-only import must be `import type { ... }`.
- `erasableSyntaxOnly: true` — no enums, no parameter properties, no namespaces with values. Use union string literals and `as const` objects instead.
- `noUnusedLocals` / `noUnusedParameters` are on. Prefix intentionally-unused params with `_` and add a `void _x;` reference if the linter still complains (see `Button.tsx` pattern).
- `allowImportingTsExtensions: true` — you may write `import App from './App.tsx'`. Existing code does this; follow the convention.
- Build is `tsc -b` (project references). Never invoke plain `tsc`.

## Animation

Use the `motion` package (motion.dev), imported as `import { motion } from 'motion/react'`. Do not import from `framer-motion` (old API). Reuse the easing/duration constants from `src/styles/tokens.ts` (`m.ease.out`, `m.duration.base`, `stagger.wide`, etc.) instead of hardcoding numbers.

## Styling conventions

- Tabs for indentation, width 4 (`.editorconfig` + Prettier).
- Single quotes, trailing commas, LF endings, print width 100.
- No comments in source — match existing style. Do not add `//` or `/* */` blocks unless explicitly requested.
- Components/pages are mostly named exports (`export function Cover()`), not default exports — except `App`, which is the only default-exported top-level component.
- `Button.tsx` uses a discriminated union pattern (`as: 'button' | 'a'`) for polymorphic rendering.
- Use `useDocumentTitle('Page Name')` in page components to set `<title>`.

## Known issues

- `.vercel/project.json` is committed against the usual Vercel guidance. Leave as-is unless the team decides to scrub it.
- No documented branch / PR / release convention. Follow the repo's existing commit history style if you need a model.

## Skills

A repo-local `frontend-design` skill lives at `.agents/skills/frontend-design/SKILL.md`. Load it via the `skill` tool when building new UI sections so the corporate/institutional aesthetic is preserved.
