# PrepApp — Interview Prep Tracker

A PWA (Progressive Web App) for daily interview preparation — DSA, System Design, and Go.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS v3**
- **Zustand** — state management with localStorage persistence
- **vite-plugin-pwa** — service worker, offline support, installable on Android/iOS

## Features

- **5-min Quiz** — daily MCQs across DSA, System Design, Go with streak tracking
- **Today** — daily session checklist with progress bar and week calendar
- **Session Timer** — circular ring timer with pause detection (alert after 5 min pause)
- **Roadmap** — full Neetcode 150 DSA problems with LC + YouTube links, SD & Go topics
- **Reminders** — customisable notification times per day, pause/resume prep schedule
- **PWA** — installable on Android home screen, works offline, push notifications

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173/PrepApp/`

## Build & Deploy

```bash
npm run build
```

Builds to `dist/`. GitHub Actions auto-deploys on push to `main`.

Live at: **https://mkundanjha.github.io/PrepApp**

## Project Structure

```
src/
├── components/
│   ├── Quiz.jsx          # Quiz engine with shuffle, scoring, history
│   ├── Today.jsx         # Daily checklist, week grid, progress
│   ├── Session.jsx       # Circular timer, pause detection, session log
│   ├── Roadmap.jsx       # DSA topics with LC + NeetCode links
│   ├── Reminders.jsx     # Notification settings, pause schedule
│   ├── Collapsible.jsx   # Reusable collapsible panel
│   └── Toggle.jsx        # Reusable toggle switch
├── data/
│   ├── topics.js         # DSA problems, SD topics, Go topics
│   └── questions.js      # 24 MCQ questions (DSA + SD + Go)
├── store/
│   └── useStore.js       # Zustand store with localStorage persistence
├── App.jsx               # Root component + bottom navigation
├── main.jsx              # Entry point
└── index.css             # Tailwind + custom component classes
```

## Adding to Android Home Screen

1. Open Chrome on Android
2. Go to `https://mkundanjha.github.io/PrepApp`
3. Tap ⋮ menu → **Add to Home screen**
4. Tap **Add**

The app will appear as a native-looking icon on your home screen.
