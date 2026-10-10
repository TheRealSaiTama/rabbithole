# Rabbit Hole

A conversation game for two people sitting together. Choose a subject, get a random prompt, and take one minute each to talk. The second turn starts when you are ready. Includes 32 prompts across 16 subjects. The prompt collection is curated and can grow; it does not generate unlimited topics.

## Setup

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No credentials or environment configuration are needed. Google Fonts are optional; the site uses local fallback fonts if they cannot load.

## Checks and production

```sh
npm run format
npm run lint
npm test
npm run build
```

The site is buildless. The build command verifies JavaScript syntax. Deploy `dist/` to any static host. The local server is for development.

## Layout and style

`dist/` contains the deployed HTML, CSS, browser logic, and topic collection. `tests/` contains deterministic tests using Node's built in test runner. `server.mjs` serves the local preview. ESLint checks JavaScript and Prettier formats files with two space indentation. Files and functions use descriptive names; JavaScript variables and functions use camelCase. No code comments.
