# RoR2-Items

![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/github/license/Glagan/RoR2-Items)

A lightweight glossary for Risk of Rain 2 items and equipment, rebuilt with Vue 3 + Vite + Tailwind. Search, filter, and track your favorite drops without leaving the browser.

Live preview: [https://ror2.nikurasu.org/](https://ror2.nikurasu.org/)

---

## Features

- 🔎 Full-text search across names, tags, rarities, and descriptions
- 🎚️ Category filters for All/Common/…/Equipment plus a dedicated **Tracked** tab
- ⭐ One-click tracking with local persistence so your shortlist survives refreshes
- 📱 Responsive layout that works nicely on wide or narrow viewports
- ♿ Keyboard-friendly controls (filter buttons, search, tracked toggle, modals)

## Tech stack

| Layer        | Choice                          |
|--------------|----------------------------------|
| UI           | [Vue 3](https://vuejs.org/) (script setup) |
| Build        | [Vite](https://vitejs.dev/)      |
| Styling      | [Tailwind CSS](https://tailwindcss.com/) |
| Language     | TypeScript                       |
| Testing      | [Vitest](https://vitest.dev/) + jsdom |

## Getting started

Prerequisites: Node.js 18+ (or any version supported by the current Vite release).

```bash
git clone https://github.com/Glagan/RoR2-Items.git
cd RoR2-Items
npm install
npm run dev
```

The dev server prints a local URL you can open in the browser. Hot-module replacement is enabled by default.

## Useful scripts

| Command           | Description                                      |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Start the Vite dev server.                       |
| `npm run build`   | Create a production build under `dist/`.         |
| `npm run serve`   | Preview the production build locally.            |
| `npm run test`    | Execute the Vitest suite (composables, helpers). |

## Tracked items

Each item card has a star button in the header. Click or press <kbd>Enter</kbd>/<kbd>Space</kbd> while focused to toggle tracking without changing your current filters. The **Tracked** tab (right after Equipment) mirrors the regular card and search experience but only shows the items you’ve starred. A badge on the tab displays your tracked count; everything is stored in `localStorage` under `ror2.trackedItemIds`, so the list is restored automatically on your next visit.

## Contributing

Issues and pull requests are welcome—please include screenshots or reproduction steps for UI changes so they’re easier to verify. Run `npm run test` before submitting to keep the tracked-item composable coverage green.

## License

This project retains the upstream license in [`LICENSE`](LICENSE). Review it before redistributing any modified builds.

