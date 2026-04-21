# Repository Guidelines

## Project Structure & Module Organization
`src/` contains the application code. Keep top-level app wiring in `src/App.jsx` and `src/main.jsx`, tab screens in `src/components/`, shared state in `src/store/useStore.js`, and static content in `src/data/`. Global styles live in `src/index.css`; reuse existing Tailwind component classes there before adding new inline utility combinations. Put deployable static assets in `public/`. Treat `dist/` as generated build output, not source.

## Build, Test, and Development Commands
- `npm install` installs project dependencies.
- `npm run dev` starts the Vite dev server at `http://localhost:5173/PrepApp/`.
- `npm run build` creates the production bundle in `dist/`.
- `npm run preview` serves the built app locally for a final check.

Run `npm run build` before opening a PR to catch bundling or PWA config regressions.

## Coding Style & Naming Conventions
Use ES modules, React function components, and 2-space indentation. Name component files and exported components in PascalCase (`Session.jsx`, `Roadmap.jsx`), store helpers and variables in camelCase (`addQuizResult`, `pauseActive`), and keep constants in uppercase when shared across a file (`TABS`, `CONTENT`). Prefer small, focused components and colocate UI-only logic with the component that owns it. Follow the existing Tailwind-first styling approach and reuse tokens from `tailwind.config.js`.

## Testing Guidelines
No automated test runner is configured yet. For now, validate changes with `npm run build` and manual checks in the main flows: quiz, today checklist, session timer, roadmap, and reminders. When adding tests later, place them beside the module as `*.test.jsx` or `*.test.js` and prefer React-focused integration coverage over brittle implementation-detail tests.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit subjects (`add .nojekyll to bypass Jekyll build`). Keep commits scoped and descriptive. PRs should include:
- a brief summary of the user-visible change
- linked issue or task reference when applicable
- screenshots or screen recordings for UI changes, especially mobile views
- confirmation that `npm run build` passed

## Configuration & Deployment Notes
This app is deployed to GitHub Pages under `/PrepApp/`, so keep the Vite `base` setting aligned with that path. Be careful with persistence changes in `src/store/useStore.js`; updates to stored keys affect existing localStorage data (`prepapp-storage`).
