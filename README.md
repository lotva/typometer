# Воспроизводимый стартер для Накст-приложений

Добавляет типизированные Layers и быстрый линтинг при коммите и CI, отключает автоимпорты, настраивает тесты в браузере и рантайме.

## Команды для разработки

Запустить дев-сервер:

```bash
pnpm install
pnpm dev
```

Собрать и развернуть локально билд:

```bash
pnpm build
pnpm preview
```

Обновить зависимости:

```bash
npx npm-check-updates
pnpm install
```

Запустить тесты:

```bash
pnpm run test:runtime

pnpm exec playwright install chromium chromium-headless-shell
pnpm run test:browser
pnpm run test:e2e
```

## Стек

| Категория | Технологии                                      |
| --------- | ----------------------------------------------- |
| Фреймворк | Nuxt 4, Vue 3, TypeScript                       |
| Линтеры   | Prettier, Stylelint, ESLint, Oxlint, Commitlint |
| Тулинг    | PNPM, Rolldown, Lefthook                        |

## Файловая структура

**Архитектурная методология — FEOD.** Код поделён на слои, каждый слой — на директории `modules`, `pages`, `views` и `common`. Прочитайте, чтобы работать с самой удобной организацией кода во фронтенде: [документация FEOD](https://habr.com/ru/companies/sportmaster_lab/articles/972410/), [документация Nuxt Layers](https://nuxt.com/docs/4.x/getting-started/layers).
