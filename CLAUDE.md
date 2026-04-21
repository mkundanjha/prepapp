# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server at http://localhost:5173/PrepApp/
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

No test runner is configured.

## Architecture

Single-page PWA with a tab-based layout. No routing — `App.jsx` manages the active tab via local `useState`, rendering one of five full-screen components.

**State (`src/store/useStore.js`)** — single Zustand store with `localStorage` persistence (key: `prepapp-storage`). All cross-component state lives here: quiz history, session log, reminders, today's checklist, schedule dates, and pause state. Components read and mutate store slices directly.

**Data (`src/data/`)** — static JS modules:
- `topics.js` — Neetcode 150 DSA problems (with LC + YouTube links), SD topics, Go topics
- `questions.js` — 24 MCQ questions for the quiz (DSA + SD + Go categories)

**Components (`src/components/`)** — each tab is one self-contained component:
- `Quiz.jsx` — shuffles questions, tracks score, persists history via `addQuizResult`
- `Today.jsx` — daily checklist (3 items), week grid, progress bar
- `Session.jsx` — circular ring timer, pause detection (alert after 5 min idle), logs sessions via `addSessionLog`
- `Roadmap.jsx` — renders topics from `topics.js` using `Collapsible` panels
- `Reminders.jsx` — edits reminder entries in store, manages pause schedule

**Styling** — Tailwind CSS v3. Custom design tokens are in `tailwind.config.js`:
- Colors: `accent` (#5B54E8 purple), `ink` (dark text), `surface` (backgrounds)
- Fonts: `font-mono` (JetBrains Mono), `font-sans` (Inter)

Reusable component classes (`.card`, `.badge`, `.btn-primary`, `.btn-ghost`, `.pill-lc`, `.pill-yt`, `.coll-header`, `.toggle`, `.day-pill`, `.check-btn`, etc.) are defined as `@layer components` in `src/index.css` — prefer these over inline Tailwind when the pattern already exists.

**PWA** — `vite.config.js` configures `vite-plugin-pwa` with `autoUpdate` service worker. Base URL is `/PrepApp/` for GitHub Pages deployment. CI auto-deploys `main` → `https://mkundanjha.github.io/PrepApp`.

The app is mobile-first and designed for portrait phone use. iOS/Android safe-area insets are applied inline on the header and bottom nav. The content area uses `.scrollable` (hides scrollbar, enables touch scroll) with bottom padding to clear the fixed nav.
