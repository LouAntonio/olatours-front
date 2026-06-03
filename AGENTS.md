# Ola Tours — front

Single-page marketing site (pt-AO) for Ola Tours. React 19 + TypeScript + Vite, Tailwind v4, motion. No backend, no router, no tests, no i18n — every section is a component composed in `src/App.tsx`.

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

- `index.html` → mounts `src/main.tsx` → renders `src/App.tsx`.
- `src/App.tsx` — composes section components in order: `DossierHeader`, `Cover`, `Agenda`, `WhyUs`, `Marquee`, `Services`, `Products`, `Testimonials`, `Contact`, plus a `Footer`.
- `src/components/` — one PascalCase file per section (`Cover.tsx`, `Marquee.tsx`, `Button.tsx`, `Logo.tsx`, `Seal.tsx`, `AfricaMap.tsx`, etc.).
- `src/styles/tokens.ts` — JS-side mirror of design tokens (colors, fonts, motion durations/eases, stagger). Use this for `motion/react` configs.
- `src/index.css` — Tailwind v4 entry + `@theme {}` design tokens + global utility classes. **There is no `tailwind.config.js` — do not create one.**
- `public/images/` — static assets (`olatours.png`, `icon.png`).
- `.vercel/project.json` — Vercel project link; project name is `olatours`. Leave committed; do not rename.

## Design system

Brand colors (use as Tailwind classes, e.g. `bg-paper`, `text-terracotta`): `paper`, `paper-card`, `paper-warm`, `ink`, `ink-soft`, `ink-mute`, `terracotta`/`flag`, `ochre`, `moss`, `navy`, `sky`, `line`, `line-soft`. Full hex values in `src/index.css` (`@theme` block) and `src/styles/tokens.ts`.

Fonts (loaded via Google Fonts in `index.html`): Barlow (sans default), Barlow Condensed (`font-display`), Fraunces (`font-serif`), JetBrains Mono (`font-mono`). Utility classes: `mono-caps`, `eyebrow`, `label-caps`, `drop-cap`.

Custom effects defined in `src/index.css`: `paper-grain`, `marquee-track`/`marquee-track-slow`, `rule`, `rule-strong`, `hairline`, `ticker`, `ticket-edge`, `perforation`, `dossier-tick`, `shadow-stamp`/`shadow-terracotta`/`shadow-ochre`/`shadow-navy`, `stamp-rotate`/`stamp-press`, `pulse-ring`/`pulse-dot`, `reveal-up`.

When adding a new visual element, prefer extending the `@theme` block + utility classes here over component-local styles. Avoid `src/App.css` (it is effectively unused).

## TypeScript gotchas

- `verbatimModuleSyntax: true` — every type-only import must be `import type { ... }`.
- `erasableSyntaxOnly: true` — no enums, no parameter properties, no namespaces with values. Use union string literals and `as const` objects instead.
- `noUnusedLocals` / `noUnusedParameters` are on. Prefix intentionally-unused params with `_` and add a `void _x;` reference if the linter still complains (see `Button.tsx` pattern).
- `allowImportingTsExtensions: true` — you may write `import App from './App.tsx'`. Existing code does this; follow the convention.
- Build is `tsc -b` (project references). Never invoke plain `tsc`.

## Animation

Use the `motion` package (motion.dev), imported as `import { motion } from 'motion/react'`. Do not import from `framer-motion` (old API). Reuse the easing/duration constants from `src/styles/tokens.ts` (`m.ease.out`, `m.duration.base`, `stagger.base`, etc.) instead of hardcoding numbers.

## Styling conventions

- Tabs for indentation, width 4 (`.editorconfig` + Prettier).
- Single quotes, trailing commas, LF endings, print width 100.
- No comments in source — match existing style. Do not add `//` or `/* */` blocks unless explicitly requested.
- Components are mostly named exports (`export function Cover()`), not default exports — except `App`, which is the only default-exported top-level component.

## Known issues

- Prettier finds two config files: `.prettierrc` and `.prettierrc.json` with conflicting `semi` settings. Per Prettier's priority order, `.prettierrc` wins, so current code uses semicolons. Resolve by deleting the losing file before changing style.
- `.vercel/project.json` is committed against the usual Vercel guidance. Leave as-is unless the team decides to scrub it.
- No documented branch / PR / release convention. Follow the repo's existing commit history style if you need a model.

## Skills

A repo-local `frontend-design` skill lives at `.agents/skills/frontend-design/SKILL.md`. Load it via the `skill` tool when building new UI sections so the dossier/editorial aesthetic is preserved.
