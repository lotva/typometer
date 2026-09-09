# Contributing

Requires **Node.js 26.8.2** and **pnpm 12.4.0** or newer.

[![Vue-TSC](https://github.com/lotva/typometer/actions/workflows/check-types.yaml/badge.svg)](https://github.com/lotva/typometer/actions/workflows/check-types.yaml) [![Lighthouse](https://github.com/lotva/typometer/actions/workflows/run-lighthouse.yaml/badge.svg)](https://github.com/lotva/typometer/actions/workflows/run-lighthouse.yaml) [![Oxlint · ESLint](https://github.com/lotva/typometer/actions/workflows/check-scripts.yaml/badge.svg)](https://github.com/lotva/typometer/actions/workflows/check-scripts.yaml) [![Stylelint](https://github.com/lotva/typometer/actions/workflows/check-styles.yaml/badge.svg)](https://github.com/lotva/typometer/actions/workflows/check-styles.yaml) [![Prettier](https://github.com/lotva/typometer/actions/workflows/check-formatting.yaml/badge.svg)](https://github.com/lotva/typometer/actions/workflows/check-formatting.yaml)

## Development

Start the dev server:

```bash
pnpm install
pnpm dev
```

Build and preview a static production bundle:

```bash
pnpm generate
pnpm preview
```

Update dependencies:

```bash
pnpx npm-check-updates
pnpm install
```

Restore project skills from `skills-lock.json`:

```bash
pnpx skills i
```

## Tech stack

| Category  | Technologies                            |
| --------- | --------------------------------------- |
| Framework | TypeScript, Vue 3, Nuxt 4, Pinia        |
| UI        | PostCSS, Ark UI                         |
| Linting   | Prettier, Stylelint, Oxlint, Commitlint |
| Tooling   | Rolldown, Lefthook, pnpm                |

## Project structure

**Architecture: FEOD.**

The codebase is organized into `core`, `pages`, `views`, `modules`, and `common` directories.

Each directory is divided into `config`, `lib`, `model`, and `ui` segments.

[FEOD documentation](https://feod.dev/)
