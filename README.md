# RoR2-Items

![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/github/license/Glagan/RoR2-Items)

Risk of Rain 2 Items and Equipments with a search functionality.

Live preview: [https://ror2.nikurasu.org/](https://ror2.nikurasu.org/)

---

## Getting started

Prerequisites: Node.js 20+ (or any version supported by the current Vite release).

```bash
git clone https://github.com/Glagan/RoR2-Items.git
cd RoR2-Items
bun install
bun run dev
```

The dev server prints a local URL you can open in the browser. Hot-module replacement is enabled by default.

## Useful scripts

| Command         | Description                                      |
| --------------- | ------------------------------------------------ |
| `bun run dev`   | Start the Vite dev server.                       |
| `bun run build` | Create a production build under `dist/`.         |
| `bun run serve` | Preview the production build locally.            |
| `bun run test`  | Execute the Vitest suite (composables, helpers). |

## Sentry

To enable monitoring locally, use [`.env.example`](.env.example) as a template
for `.env.local`, set `VITE_SENTRY_DSN` to the project's public DSN, and restart
Vite. Without a DSN the SDK does not initialize.

For production, pass `VITE_SENTRY_DSN` to Docker with `--build-arg`. The build
sets the Sentry release to `ror2-items@<source hash>` by default, without needing
`.git`. To use a specific release (such as a Git commit SHA), pass
`--build-arg VITE_SENTRY_RELEASE=<id>`. These settings are embedded at build time;
setting them on the running Nginx container has no effect. The Vite mode sets
the Sentry environment. Traces are sampled at 100% locally and 10% in production. Session Replay captures only sessions with errors, masking text and
blocking media. Use `Sentry.logger` for intentional application logs.

Production stack traces need [Vite source map uploads](https://docs.sentry.io/platforms/javascript/guides/vue/sourcemaps/uploading/vite/).
Uploads are not configured yet. Keep the upload token in your build secret store,
never in a `VITE_` variable.
