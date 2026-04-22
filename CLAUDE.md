# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server at http://localhost:5173/
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

Run `npm run build` before opening a PR to catch bundling or PWA config regressions. No test runner is configured.

## Architecture

Single-page PWA with a tab-based layout. No routing — `App.jsx` manages the active tab via local `useState`, rendering one of six full-screen components.

**State (`src/store/useStore.js`)** — single Zustand store with `localStorage` persistence (key: `prepapp-storage`). All cross-component state lives here: quiz history, quiz level filter, session log, reminders, today's checklist, schedule dates, pause state, and theme mode. Components read and mutate store slices directly. Changing persisted keys or their shapes affects existing user data in `prepapp-storage`.

**Data (`src/data/`)** — static JS modules:
- `topics.js` — Neetcode 150 DSA problems (with LC + YouTube links), SD topics, Go topics
- `questions.js` — MCQ questions for the quiz (DSA + SD + Go categories, with `level` field for junior/mid/senior)

**Components (`src/components/`)** — each tab is one self-contained component:
- `Quiz.jsx` — shuffles questions filtered by `quizLevel`, tracks score, persists history via `addQuizResult`
- `Today.jsx` — daily checklist (3 items), week grid, progress bar
- `Session.jsx` — circular ring timer, pause detection (alert after 5 min idle), logs sessions via `addSessionLog`
- `Roadmap.jsx` — renders topics from `topics.js` using `Collapsible` panels
- `Reminders.jsx` — edits reminder entries in store, manages pause schedule
- `Settings.jsx` — theme selector (light/dark/system); writes `themeMode` to store

Shared primitives: `Collapsible.jsx` (animated expand/collapse panel) and `Toggle.jsx` (on/off switch using `.toggle` CSS class).

**Styling** — Tailwind CSS v3. Design tokens are CSS custom properties on `:root` in `src/index.css`, mapped into Tailwind via `rgb(var(...))` in `tailwind.config.js`:
- Colors: `accent` / `accent-light` / `accent-pale`, `surface` / `surface-2/3/4`, `ink` / `ink-2` / `ink-3`
- Fonts: `font-mono` (JetBrains Mono), `font-sans` (Inter)
- Borders: use `border-[var(--border-soft-color)]` inline (not `border-border`) when you need the full CSS color value without Tailwind's opacity modifier syntax

Dark mode is CSS-variable-based. `App.jsx` sets `document.documentElement.dataset.theme` to `'light'` or `'dark'` (or removes it for system). `src/index.css` defines `:root[data-theme='dark']` overrides. Setting `themeMode` in the store drives this.

Reusable component classes (`.card`, `.card-title`, `.badge`, `.badge-done/current/upcoming/easy/med/hard`, `.btn-primary`, `.btn-ghost`, `.btn-warn`, `.btn-success`, `.pill-lc`, `.pill-yt`, `.coll-header`, `.coll-body`, `.toggle`, `.day-pill`, `.check-btn`, `.quiz-tag-*`, `.quiz-level-*`, `.quiz-option-*`, `.quiz-feedback-*`) are defined as `@layer components` in `src/index.css` — prefer these over inline Tailwind when the pattern already exists.

**Layout** — mobile-first with a responsive breakpoint at `md` (768px):
- Mobile: fixed bottom nav (`<nav>`) with bottom safe-area padding; content area uses `.mobile-nav-pad` for clearance
- Desktop: sidebar nav (`<aside class="hidden md:flex ...">`) replaces the bottom nav; content is capped at `max-w-2xl mx-auto`
- iOS/Android safe-area insets are applied inline on the header and bottom nav

**PWA** — `vite.config.js` configures `vite-plugin-pwa` with `autoUpdate` service worker. Base URL is `/` — custom domain `prepapp.in` serves from root. CI auto-deploys `main` → `https://prepapp.in`.

## Coding conventions

ES modules, React function components, 2-space indentation. Component files and exports in PascalCase, store helpers and variables in camelCase, shared file-scope constants in UPPER_CASE (`TABS`, `CONTENT`). Colocate UI-only logic with the component that owns it.
