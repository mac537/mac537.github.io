Sprite Tracker - AI Agent Workspace Rules

This document defines the current architecture and coding constraints for this repository.
Keep this file aligned with the real codebase.

## 1) Real Technology Stack (Current)

- Framework: Vue 3 with Composition API and `<script setup lang="ts">`
- Build tool: Vite 8
- Language: TypeScript (strict; avoid `any` unless clearly justified)
- UI: PrimeVue 5 RC + PrimeIcons
- Styling: Tailwind CSS v4 + `tailwindcss-primeui`
- Theme/config: `@primeuix/themes` with custom preset in `src/main.ts`
- Auto components: `unplugin-vue-components` + `@primevue/auto-import-resolver`
- Image export: `@zumer/snapdom` (not html2canvas)
- Persistence: `localStorage` + URL query params
- Package manager: pnpm

## 2) Architecture Scope

This app is fully client-side.

- No backend
- No database
- No Supabase/Firebase/API integrations for state
- All collection state must remain local or URL-shared

## 3) Current Project Structure

```text
src/
  assets/
  components/
  composables/
  constants/
  data/
  types/
  utils/
  App.vue
  main.ts
  style.css
```

Notes:

- There is currently no `src/router/` and no `src/pages/`.
- Prefer following existing patterns before introducing new folders.

## 4) State and Business Logic

Business logic should live in composables.

- `src/composables/useSprites.ts`
  - Module-level singleton state (`sprites`, `ownedIds`, `masteredIds`, `wishlistIds`)
  - Loads sprite data from `src/data/sprites.json`
  - Resolves local sprite images from `src/assets/sprites/*.png`
  - Computes sprite prices by rarity/type/variant
  - Persists local state with keys:
    - `fortnite-sprites-owned`
    - `fortnite-sprites-mastered`
- `src/composables/useFilters.ts`
  - Holds active filters and computed `filteredSprites`
- `src/composables/useSharing.ts`
  - Generates share URLs
  - Discord export text/table
  - Trading match comparison
  - Capture/export workflow via `snapdom`

Components should stay as presentational as possible:

- Receive data via props
- Emit events for actions
- Keep heavy logic in composables

## 5) URL Sharing Protocol

The app shares collection/filter state using query params.

Primary collection params:

- `owned`: dot-separated sprite ids (example: `?owned=1.5.12`)
- `mastered`: dot-separated sprite ids (example: `&mastered=2.8.21`)

Filter params used by the current app:

- `search`
- `rarity` (dot-separated)
- `variant` (dot-separated)
- `ownedStatus`

Load priority:

1. If `owned` and/or `mastered` exist in URL, load from URL.
2. Otherwise, load from `localStorage`.

## 6) Capture/Export Rules

The export source is `#capture-area` in `src/components/CaptureArea.vue`.

- Keep it deterministic and off-screen for stable snapshots.
- Before export, ensure assets are ready (`waitForCaptureImages` in `useSharing`).
- Export is performed with `snapdom(...).download(...)`.

If changing export behavior, preserve:

- predictable layout
- consistent output dimensions
- non-blocking UX (`isExporting` + toast feedback)

## 7) Sprite Types and Contracts

Source of truth: `src/types/sprite.ts`.

Do not break:

- `SpriteType`, `SpriteRarity`, `SpriteVariant` unions
- `Sprite` interface fields
- existing id values in `src/data/sprites.json`

Changing sprite IDs breaks shared URLs and trade comparisons.

## 8) UI and Interaction Constraints

- Use PrimeVue components when appropriate.
- Use PrimeIcons classes for icons (`pi pi-*`).
- Do not use `alert()` or `confirm()`; use toast/dialog patterns already in the app.
- Avoid direct DOM manipulation, except controlled capture/export use cases.
- Keep styles consistent with existing Fortnite-like rarity glows and card patterns.

## 9) Development Commands

- `pnpm dev`: start local dev server
- `pnpm build`: type-check and production build
- `pnpm preview`: preview production build

## 10) Contribution Rules for Agents

When generating or editing code:

1. Respect existing folder structure and naming.
2. Reuse existing composables before creating new abstractions.
3. Keep code minimal, typed, and readable.
4. Do not introduce backend/state services.
5. Run `pnpm build` after relevant changes when feasible.
6. Update this file if architecture rules change.