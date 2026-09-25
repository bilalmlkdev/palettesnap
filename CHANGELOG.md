# Changelog

All notable changes to PaletteSnap are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Full open source community kit: CONTRIBUTING.md, CODE_OF_CONDUCT.md,
  SECURITY.md, issue templates, and a pull request template
- GitHub Actions CI running lint, type-check, and build on every push and PR
- `.env.example` and `supabase/schema.sql` so contributors can run the project
  locally from scratch

### Fixed

- Type errors that broke `npm run type-check` (ref callback, icon props, JSX
  namespace, missing `vite/client` types)
- Em dashes replaced with plain hyphens in comments and page metadata
- My Creations listed every user-published palette from the shared database in
  all browsers. It now tracks palettes published from the current device via
  `localStorage`, matching the documented behavior, and the sidebar entry only
  appears once this browser has published something

## [1.0.0] - 2026-08-02

Core platform release.

### Added

- Supabase (Postgres) backend for palettes and likes with global sync
- New, Popular, Random, and Tagged feeds with multi-tag search and sidebar
  tag swatches
- Anonymous likes and collections tied to a device id in `localStorage`
- Instant palette publishing: pick 4 colors, tag, publish. No account required
- Palette detail view with Hex and RGB values, click to copy, and related
  palettes by shared tags
- One-click export to SVG, PNG, and JPEG
- Infinite scroll and URL-synced state for shareable filters
- Responsive layout with slide-out filter drawer and collapsible search
- Offline fallback and optimistic like feedback

## [0.1.0] - 2026-03-07

Initial development builds.

### Added

- Project structure and UI shell
- Static palette data in JSON with color and tag helpers
- First pass at layout, components, and palette logic

[Unreleased]: https://github.com/bilalmlkdev/palettesnap/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/bilalmlkdev/palettesnap/releases/tag/v1.0.0
[0.1.0]: https://github.com/bilalmlkdev/palettesnap/commits/main
