# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Next.js 16** with App Router (app/ directory structure)
- **React 19** with TypeScript 5
- **Tailwind CSS v4** with PostCSS integration
- **Geist fonts** (Sans and Mono) loaded via `next/font/google`

## Project Structure

```
app/
├── layout.tsx       # Root layout with font configuration and dark mode
├── page.tsx         # Home page component
└── globals.css      # Tailwind imports, CSS variables for theming
```

## Key Configuration Details

- **Path alias**: `@/*` maps to project root (configured in tsconfig.json)
- **Dark mode**: CSS variables in `globals.css` with `prefers-color-scheme` media query
- **ESLint**: Uses `eslint-config-next` with TypeScript and Core Web Vitals presets
- **Font variables**: `--font-geist-sans` and `--font-geist-mono` exposed via Tailwind theme
