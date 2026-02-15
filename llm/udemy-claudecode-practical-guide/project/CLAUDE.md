# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **Runtime**: Bun (package manager)
- **Language**: TypeScript 5 with strict mode enabled
- **UI**: React 19.2.3
- **Styling**: Tailwind CSS v4 (using @tailwindcss/postcss)
- **Authentication**: better-auth 1.4.18
- **Rich Text Editor**: TipTap 3.19.0

## Development Commands

```bash
# Start development server
bun dev

# Build for production
bun run build

# Run production server
bun start

# Run linting
bun run lint
```

## Project Structure

This is a Next.js App Router project using the `app/` directory pattern:

- `app/layout.tsx` - Root layout with Geist Sans and Geist Mono fonts
- `app/page.tsx` - Home page
- `app/globals.css` - Global styles with Tailwind CSS v4 and CSS variables for theming
- `public/` - Static assets (SVG files)

## Configuration

- **TypeScript**: Path aliases configured with `@/*` mapping to `./*`
- **ESLint**: Using `eslint-config-next` with TypeScript and Core Web Vitals rules
- **Tailwind CSS**: v4 with PostCSS plugin, using `@theme inline` for CSS variable-based theming
- **Next.js**: Default configuration (extend `next.config.ts` as needed)

## Key Implementation Details

### Styling
- Uses Tailwind CSS v4 inline theme configuration in `globals.css`
- CSS custom properties for theming (`--background`, `--foreground`)
- Dark mode support via `prefers-color-scheme` media query
- Geist font family (Sans and Mono) from `next/font/google`

### Dependencies
- **better-auth**: Authentication library (not yet configured - requires setup)
- **TipTap**: Rich text editor components (not yet integrated - requires setup)

## Important Notes

- The project uses Bun as the package manager - use `bun` commands instead of `npm`/`yarn`/`pnpm`
- TypeScript strict mode is enabled
- Path alias `@/` maps to project root for cleaner imports
