# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (localhost:4321)
npm run build     # production build → dist/
npm run preview   # preview the build locally
```

No test or lint scripts are configured.

## Architecture

Single-page Astro site for "Fleet Book Club". The stack is **Astro + React (islands) + Tailwind CSS**.

### Data layer

All content lives in `src/data/`:

- `BooksData.json` — array of book objects, newest first. Fields: `Name`, `Author`, `Month`, `Year`, `Description`, `Rating` (number; `0` = unrated), `Image` (external URL).
- `nextMeeting.json` — plain string, e.g. `"16th of March"`, rendered in the hero.
- `description.tsx` — exports a single `Description` string shown in the hero paragraph.
- `src/config.ts` — `SITE_TITLE` / `SITE_DESCRIPTION` constants used in `<BaseHead>`.

### Page & component layout

`src/pages/index.astro` is the only page. It composes:

1. **`Hero.tsx`** (`client:load`) — full-height background image with club name, description, and next meeting date pulled directly from `nextMeeting.json`.
2. **`ABookSection.astro`** — Astro wrapper that iterates `BooksData.json` and renders one `BookCard.tsx` (`client:visible`) per entry in a responsive grid (2 cols mobile / 5 cols desktop).

### BookCard interaction

`BookCard.tsx` toggles between:
- A thumbnail card (`Card.tsx` + `SkeletonLoader.tsx`) with a month/year badge.
- A full-screen `modal.tsx` with cover image, author, description, month/year, and a star-rating badge (only rendered when `rating > 1`).

### Adding a new book

Prepend an object to `src/data/BooksData.json`:

```json
{
  "Name": "...",
  "Author": "...",
  "Month": "April",
  "Year": "2026",
  "Description": "...",
  "Rating": 0,
  "Image": "https://..."
}
```

Set `Rating` to `0` until the club has rated the book. Once rated, use a decimal like `5.3` — the star badge appears automatically when `rating > 1`.

### Book cover images

Book covers are external URLs (DuckDuckGo image proxy). There is also a `public/Images/` directory with locally stored cover JPEGs that are referenced for some older books — use whichever is available.
