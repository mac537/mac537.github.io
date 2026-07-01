Fortnite Sprites - AI Agent Workspace Rules

This document serves as the system context and mandatory architectural guidelines for any AI (Copilot, Cursor, Windsurf, etc.) working on this repository. Read it completely before suggesting or generating any code.

🚀 1. Reference Technology Stack

Frontend Framework: Vue 3 (Composition API, <script setup lang="ts">, Vite or CDN).

Language: TypeScript (Strict typing, explicit interfaces).

Component Library: PrimeVue v5 / Custom Fortnite styles.

Styles: Tailwind CSS v4 (Natively installed via @import "tailwindcss" directives).

Additional Libraries: html2canvas for graphic export of albums without a backend.

Persistence: localStorage (Persistence of the user's local inventory).

Package Manager: pnpm or CDN in the case of single-file prototypes.

⚙️ 2. No-Database Architecture (Client-Side Only)

This project is designed to run 100% on the client side, eliminating the need for servers, external third-party APIs, or session databases.

2.1 Local Persistence:

The player's inventory ("Owned" / ownedIds) and their mastered ("Mastered" / masteredIds) must sync automatically with localStorage using Vue's reactive watch observers.

2.2 URL Sharing Protocol (Query Params):

To avoid databases, collections are transmitted using compressed query parameters in the URL:

owned: A dot-separated list of sprite IDs that the user owns (e.g., ?owned=1.5.12).

mastered: A dot-separated list of sprite IDs that the user has mastered (e.g., ?mastered=2.8.21).

Loading Rule: When mounting the app (onMounted), check if these URL parameters exist. If present, render the view in "Shared/Read-Only" mode or load them temporarily for trade comparison matchmaking.

2.3 Trading Matchmaker Algorithm:

To calculate trades without a server, the AI must cross-compare the lists:

Give (You Can Give): Sprites in your ownedIds that are in your friend's wish list.

<!-- Receive (Friend Can Give): Sprites in your friend's owned list that are in your wishlistIds. -->

📸 3. Graphic Export Engine (HTML2Canvas)

To share progress visually on Discord, the application implements an off-screen (or extreme fixed position) rendering area called #capture-area.

Static Render: This area must be styled as a premium retro postcard card using fixed flexbox/grids (e.g., fixed width of 800px) to ensure consistent captures across all devices.

Rendering Delay: Whenever html2canvas is called, wrap it in a setTimeout of at least 300ms to ensure that Vue's reactive DOM has finished updating the colors and SVGs of the sprites before taking the "snapshot".

🎨 4. Gamer Aesthetics Guidelines (Fortnite Vibes)

When generating views and visual components, the design must evoke the UI of Epic Games' title:

Color Palette:

Main interface background: #08090c (Ultra dark space gray).

Cards and panels: #12131a or #181c25 with subtle neon borders.

UI Primary Color: Highly saturated neon Violet, Indigo, or Pink.

Rarity Glows:

Rare: Cyan Blue (#3b82f6 or text-blue-400).

Epic: Neon Purple (#a855f7 or text-purple-400).

Legendary: Fire Orange (#f97316 or text-orange-400).

Mythic: Bright Gold (#eab308 or text-yellow-400).

Slants:

Use subtle slants on primary buttons to mimic Fortnite's typography style (transform: skewX(-6deg)).

Typography:

Use stylized, uppercase, sans-serif fonts for titles, preferably Rajdhani or Orbitron.

🧑‍💻 5. TypeScript Typing for Sprites

Each Sprite is represented by a clean data structure with associated Sprite Dust prices to calculate trade values:

export interface Sprite {
  id: number;
  name: string;
  type: 'Water' | 'Earth' | 'Fire' | 'Fishy' | 'Duck' | 'Ghost' | 'Demon' | 'King' | 'Aura' | 'Striker' | 'Dream' | 'Punk' | 'Boss' | 'Grim' | 'Zero Point' | 'The Burnt Peanut';
  rarity: 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Special';
  variant: 'Normal' | 'Gold' | 'Gummy' | 'Galaxy' | 'Gem' | 'Holofoil';
  description: string;
  price: number; // Value in Sprite Dust (Rare: 100/4000, Epic: 3000/6000, Leg: 5000/10000, Mythic: 7500, Special: 10000)
}


🚫 6. Forbidden AI Actions

DO NOT attempt to connect to Supabase, Firebase, or external APIs. All state must remain local or URL-based.

DO NOT use native Javascript alert() or confirm() dialogs. Utilize the application's internal Toast notification logic.

DO NOT use complex icon libraries. All iconography must be resolved using the utility classes of primeicons (e.g., pi pi-sparkles).

DO NOT modify the ID structure of the static sprite dataset to avoid corrupting collection links that have already been shared.

-------------------------------------------------------
## 🧠 Overview

This project is a frontend web application built with:

* Vue 3 (Composition API)
* TypeScript
* Vite
* Vue Router
* ESLint + Prettier (code quality)

Agents (AI or human contributors) must follow the conventions and architecture described in this document.

---

## 📁 Project Structure

```
src/
  components/       # Reusable UI components
  pages/                   # Route-level pages
  router/                  # Vue Router config
  composables/             # Reusable composition functions
  assets/                  # Static assets
```

---

## ⚙️ Development Commands

* `pnpm dev` → Start dev server
* `pnpm build` → Type check + build
* `pnpm preview` → Preview build

---

## 🧩 Coding Guidelines

### General

* Use **TypeScript strictly** (avoid `any`)
* Use **Composition API**
* Keep components **small and reusable**
* Extract logic into **composables** when possible

### Naming Conventions

* Components → `PascalCase.vue`
* Composables → `useSomething.ts`
* Variables/functions → `camelCase`
* Constants → `UPPER_CASE`

---

## 🧱 Architecture Rules

### Components

* Presentational components should:

  * Receive data via props
  * Emit events instead of handling business logic

### Business Logic

* Must live in:

  * `composables/` (shared logic)

---

## 🌍 Routing

* Defined in `router/`
* Use lazy loading for pages
* Apply route guards when needed (auth, roles)

---

## 🎨 UI & Styling

* Use PrimeVue components whenever possible
* Tailwind is available for utility styling
* Keep styles scoped

---

## 🧹 Code Quality

* ESLint + Prettier enforced
* Pre-commit hooks via Husky:

  * Lint
  * Format

Agents MUST ensure:

* No lint errors
* Consistent formatting

## 🚀 Build & Deployment

* Built using Vite
* Environment-based builds supported

---

## ⚠️ Do NOT

Agents must avoid:

* ❌ Direct DOM manipulation
* ❌ Business logic inside components
* ❌ Using `any` without justification
* ❌ Skipping lint

---

## ✅ Do

Agents SHOULD:

* ✔️ Write clean, modular code
* ✔️ Reuse composables
* ✔️ Follow project structure strictly
* ✔️ Use TypeScript properly

---

## 🤖 Agent Behavior Rules

When generating code:

1. Respect folder structure
2. Prefer existing patterns over new ones
3. Reuse existing composables
4. Keep code minimal and readable
5. Ask for clarification if context is missing

---