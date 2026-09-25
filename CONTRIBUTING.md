# Contributing to PaletteSnap

Thanks for taking the time to contribute.

The following is a set of guidelines for contributing to PaletteSnap. By participating in this project you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Table of contents

- [Ways to contribute](#ways-to-contribute)
- [Local development setup](#local-development-setup)
- [Project structure](#project-structure)
- [Available scripts](#available-scripts)
- [Style guide](#style-guide)
- [Commit convention](#commit-convention)
- [Pull request process](#pull-request-process)
- [Reporting bugs](#reporting-bugs)
- [Suggesting features](#suggesting-features)
- [License](#license)

## Ways to contribute

- Report bugs and layout issues
- Suggest or build new features
- Improve documentation
- Fix issues labeled `good first issue`
- Review open pull requests

## Local development setup

### Prerequisites

- Node.js 20.19+ or 22+ (Vite 7 requirement)
- npm 10+
- Git
- A free [Supabase](https://supabase.com) project (the app talks to Postgres for palettes and likes)

### Steps

1. Fork the repository and clone your fork:

```bash
git clone https://github.com/<your-username>/palettesnap.git
cd palettesnap
```

2. Install dependencies:

```bash
npm install
```

3. Create your environment file:

```bash
cp .env.example .env
```

4. Create a Supabase project, open the SQL editor, and run [`supabase/schema.sql`](supabase/schema.sql). Then fill `.env` with the values from **Project Settings > API**:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-key
```

The app throws a clear error on startup if these two values are missing.

5. Start the dev server:

```bash
npm run dev
```

The app now runs at `http://localhost:5173`.

## Project structure

```text
src/
  components/    UI pieces grouped by layout, center views, modals, ui
  data/          Seed palettes, tags, and filter definitions
  hooks/         Custom React hooks (URL sync, mobile detection)
  lib/           Supabase client setup
  store/         Zustand global state (palettes, likes, views)
  types/         Shared TypeScript types
  utils/         Color helpers, device id, id generator
supabase/
  schema.sql     Reference database schema for self-hosting
```

State lives in Zustand, persistence for likes and creations is tied to an anonymous device id in `localStorage`, and global data is stored in Supabase.

## Available scripts

| Command             | What it does                       |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start the Vite dev server          |
| `npm run build`     | Production build to `dist/`        |
| `npm run preview`   | Preview the production build       |
| `npm run lint`      | Run ESLint over the project        |
| `npm run type-check`| Run TypeScript with no emit        |

All four checks must pass before a pull request is merged.

## Style guide

- Follow the formatting and naming already used in the file you are editing
- ESLint config lives in `eslint.config.js`. Warnings are allowed, errors are not
- Prefer TypeScript over JavaScript for new files
- Keep components focused. Shared UI belongs in `src/components/ui`
- No em dashes in code comments or copy. Use a simple hyphen
- UI changes should stay responsive (mobile breakpoint included)

## Commit convention

This repo uses [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat: add palette collection view
fix: prevent duplicate like requests
docs: explain Supabase setup
refactor: extract tag filtering into a hook
chore: update dependencies
```

Breaking changes get a `!` marker: `feat!: drop legacy palette ids`.

## Pull request process

1. Create a branch from `main`:

```bash
git checkout -b feature/my-change
```

2. Make your change and add tests only if the repo gains a test setup later
3. Verify locally before pushing:

```bash
npm run lint
npm run type-check
npm run build
```

4. Push your branch and open a PR against `main`
5. Fill in the PR template and attach screenshots or a short clip for UI changes
6. Keep PRs focused. One change per PR is easier to review and merge

CI runs lint, type-check, and build on every pull request. Your PR cannot merge until the checks are green.

## Reporting bugs

Use the **Bug report** issue template and include:

- What you expected vs what happened
- Steps to reproduce
- Browser and OS
- Screenshots or console errors

Search existing issues first to avoid duplicates.

## Suggesting features

Use the **Feature request** issue template. Describe the problem first, then the solution you have in mind. Feature requests with a clear use case are the fastest to get accepted.

## License

By contributing you agree that your contributions are licensed under the [MIT License](LICENSE), the same license that covers the project.

If you have questions, open an issue and mention `@bilalmlkdev`.
