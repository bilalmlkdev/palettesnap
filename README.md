<div align="center">
  <a href="https://palettesnap.vercel.app/">
    <img src="https://raw.githubusercontent.com/bilalmlkdev/palettesnap/main/public/favicon.svg" alt="PaletteSnap Logo" width="100%" height="120">
  </a>

  # PaletteSnap
  A fast, no-login color palette discovery tool - browse, search, like, <br> and publish four-color palettes with zero signup friction.

  [![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-black?style=for-the-badge)](https://palettesnap.vercel.app)
  [![CI](https://github.com/bilalmlkdev/palettesnap/actions/workflows/ci.yml/badge.svg)](https://github.com/bilalmlkdev/palettesnap/actions/workflows/ci.yml)
  [![GitHub Stars](https://img.shields.io/github/stars/bilalmlkdev/palettesnap?style=for-the-badge&logo=github&color=yellow)](https://github.com/bilalmlkdev/palettesnap.git)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)
</div>

<p align="center">
  <i>Created by <a href="https://bilalmlkdev.vercel.app" target="_blank">Bilal Malik</a></i><br>
  <i>Follow on Github <a href="https://github.com/bilalmlkdev" target="_blank">bilalmlkdev</a></i>
</p>

[![palettesnap Dashboard](https://raw.githubusercontent.com/bilalmlkdev/palettesnap/main/src/assets/preview.png)](https://palettesnap.vercel.app/)

## About PaletteSnap
Welcome to **PaletteSnap** - a modern, open-source color palette tool built to make discovering, saving, and publishing four-color palettes effortless in your browser. Unlike sign-up-gated palette tools, PaletteSnap requires **no account at all**. Likes and collections are tied to your browser through an anonymous device identity, and anyone can publish a palette that instantly goes live for every visitor to discover - no approval queue, no friction.

## Why PaletteSnap?
- **Frictionless Browsing:** Switch instantly between **New, Popular, Random, Tagged, and Custom Feeds** with smart sidebar tag swatches and a multi-tag search bar.
- **Zero-Barrier Publishing:** Pick 4 colors, tag them, and **publish instantly** for the world to see - no accounts, emails, or passwords required.
- **Anonymous Identity:** Your likes and personal collections are tracked seamlessly via `localStorage`.
- **Global Persistence:** Backed by **Supabase (Postgres)** so published palettes and like counts sync globally in real time.
- **Rich Palette Details:** Get instant **Hex & RGB values**, click-to-copy functionality, and discover **Related Palettes** by shared tags.
- **One-Click Export:** Download any color scheme instantly as **SVG, PNG, or JPEG**.
- **Fully Responsive:** Optimized for mobile with a slide-out filter drawer, collapsible search, and adaptive header actions.

## Key Features
### Discovery & Browsing
- **Feeds & Search:** Browse via **New, Popular, or Random** feeds, or combine filters using **Multi-Tag Search** and **Sidebar Swatches**.
- **Infinite Scrolling:** Seamlessly load more palettes as you scroll.
- **Contextual Discovery:** View **Related Palettes** that share tags with your current selection.

### Creation & Export
- **Instant Publishing:** Pick 4 colors, tag them, and publish instantly-**no account needed**.
- **Local History:** Track everything you've published on the device via **My Creations**.
- **One-Click Export:** Download color schemes as **SVG, PNG, or JPEG**, or copy hex values instantly with **Click-to-Clipboard**.

### Performance & State
- **Live & Optimistic Likes:** Global, real-time like counts via Supabase with instant UI feedback.
- **URL-Synced State:** Every filter, search term, and view is instantly shareable via the URL.
- **Resilient & Responsive:** Features an **Offline Fallback**, smooth **Token-Based Loading**, and a fully mobile-optimized layout.

# How to Use PaletteSnap
1. **Discover Palettes:** Visit the live site and instantly explore beautiful four-color palettes. Filter using the multi-tag search bar or the popular color tags in the sidebar.
2. **Interact & Save:** Hit the heart icon to save palettes you like. Your choices are automatically remembered on your device - no profile creation required.
3. **Copy & Export:** Click on any individual color block to copy its Hex or RGB code instantly. You can also export full palettes as high-quality SVGs, PNGs, or JPEGs for your design workflows.
4. **Publish Your Own:** Open the palette creation tool, choose 4 colors, assign descriptive tags, and hit publish to share it with the world instantly.

# Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 7, Tailwind CSS 4 |
| State | Zustand, React Router 7 |
| Motion | Framer Motion |
| Backend | Supabase (Postgres) with anonymous device identity |
| Deploy | Vercel |

# Local Development
Full contributor setup lives in [CONTRIBUTING.md](CONTRIBUTING.md). Short version:

```bash
git clone https://github.com/bilalmlkdev/palettesnap.git
cd palettesnap
npm install
cp .env.example .env
```

Create a free Supabase project, run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor, then put your URL and anon key in `.env`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-key
```

```bash
npm run dev        # http://localhost:5173
npm run lint       # ESLint
npm run type-check # tsc --noEmit
npm run build      # production build
```

CI runs all three checks on every push and pull request.

# Contributing
Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make to **PaletteSnap** are greatly appreciated!

- [CONTRIBUTING.md](CONTRIBUTING.md) - setup, style guide, commit format, and the PR process
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - how we expect everyone to behave
- [SECURITY.md](SECURITY.md) - how to report vulnerabilities privately
- [CHANGELOG.md](CHANGELOG.md) - what changed between releases

### Ways to Contribute
* **Report Bugs:** Use the [bug report template](https://github.com/bilalmlkdev/palettesnap/issues/new?template=bug_report.yml) if you encounter layout bugs, performance issues, or incorrect asset generation.
* **Suggest Features:** Have an idea for a new export format, secondary filter tool, or UI improvement? Open a [feature request](https://github.com/bilalmlkdev/palettesnap/issues/new?template=feature_request.yml).
* **Submit Pull Requests:** If you want to dive into the codebase and fix a bug or add a feature yourself, we welcome your code contributions. Start with issues labeled `good first issue`.

### Contribution Process
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes using Conventional Commits (`git commit -m 'feat: add AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request against the main branch.

CI must be green (lint, type-check, build) before a PR can merge.

# License (MIT)
This project is licensed under the **MIT License**.

```text
MIT License
Copyright (c) 2026 Bilal Malik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
