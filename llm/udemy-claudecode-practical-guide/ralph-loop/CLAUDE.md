# Instructions for AI Agents

We're building the app described in @SPEC.MD - a note-taking web app with rich text editing, authentication, and public sharing.

## Agents & Skills

Use your subagents and skills when working on related tasks.

## Code Quality

This is **production code**. Every pattern you establish will be copied.

### TypeScript

- **Never use `any`** - always proper types
- **No type casting** - avoid `as` assertions
- Use `query<T>()` patterns for type safety

### Bun

- Prefer native Bun APIs before Node APIs or third-party libraries

### Validation

- Use **Zod** for all input validation

### React/Next.js

- **Server components by default** - data fetching in RSC
- **Server actions for mutations** - use 'use server', not API routes
- Mark client components with 'use client' only when needed
- NO API routes except for better-auth

### Database

- Always scope queries by user_id for authorization
- Update timestamps on every modification

### Security

- Server actions must check authentication
- Verify ownership before access/modification

## Testing

### After Every Task

1. Run `bun run build` (checks types)
2. Run `bun run lint`
3. Run `bun test` (unit tests)
4. **Use Playwright MCP** to verify UI changes in browser

### Playwright MCP (Critical)

For any UI work, you MUST use the Playwright MCP to:

- Start dev server if needed
- Navigate to the page
- Test actual user interactions
- Verify the feature works visually

Do NOT assume UI code works - verify it in the browser.

## Commands

```bash
bun dev              # Dev server (localhost:3000)
bun run build        # Build + type check
bun run lint         # Linting
bun test             # Unit tests
bun test:e2e         # E2E tests
```

## Project Structure

```
app/                    # Next.js App Router
  api/auth/[...all]/   # better-auth only
  authenticate/        # Login/signup
  dashboard/           # Notes list (RSC)
  notes/[id]/          # Editor (RSC + client)
  p/[slug]/            # Public notes (RSC)
components/            # React components
lib/                   # Server utilities
  db.ts               # Database
  notes.ts            # Repository
  auth.ts             # Auth config
  actions/notes.ts    # Server actions
```

## Documentation

Use Context7 MCP / DocsExplorer for third-party library docs. Don't rely on training data.

## Philosophy

Leave the codebase better than you found it. Choose clarity over cleverness.
