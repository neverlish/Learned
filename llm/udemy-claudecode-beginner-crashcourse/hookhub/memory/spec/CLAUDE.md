# HookHub MVP Specification

## Project Overview

**HookHub** is a showcase platform for discovering and browsing open-source Claude hooks (MCP servers). The MCP (Model Context Protocol) ecosystem enables community-built servers that connect Claude to GitHub, databases, filesystems, and 200+ other tools.

**Goal**: Create a clean, minimal showcase site for Claude hooks
**Scope**: MVP - Display only, no user submissions, no authentication, no search/filtering
**Target Audience**: Developers looking to discover useful Claude hooks

## Data Model

### Hook Schema
```typescript
interface Hook {
  id: string;              // Unique identifier (e.g., "github-mcp-server")
  name: string;            // Display name (e.g., "GitHub MCP Server")
  category: string;        // Category (e.g., "Development Tools", "Database", "API")
  description: string;     // Short description (1-2 sentences)
  repoUrl: string;         // Link to GitHub repository
  stars?: number;          // Optional: GitHub star count (future)
  author?: string;         // Optional: Repository owner/author (future)
  tags?: string[];         // Optional: Additional tags (future)
}
```

### Category Color Mapping
| Category | Color |
|----------|-------|
| Development Tools | Blue |
| Database | Green |
| API | Purple |
| Automation | Orange |
| Documentation | Gray |
| Context Management | Pink |

## UI/UX Specifications

### Main Page Layout
- **Header**: Logo/brand name "HookHub" + tagline "Discover Claude Hooks"
- **Hero Section**: Brief description of what Claude hooks are
- **Grid Display**: Responsive grid of hook cards
- **Footer**: Simple footer with credits

### Hook Card Design
Each hook card displays:
1. **Hook Name** - Bold, prominent
2. **Category Badge** - Small, color-coded by category
3. **Description** - 2-3 lines max
4. **Repository Link** - External link icon + "View Repository" button

### Responsive Grid
- **Desktop**: 3 columns (`lg:grid-cols-3`)
- **Tablet**: 2 columns (`md:grid-cols-2`)
- **Mobile**: 1 column (`grid-cols-1`)

### Styling Approach
- Follow existing dark mode patterns in `globals.css`
- Use Tailwind CSS v4 utility classes
- Card hover effects: subtle elevation/scale
- Consistent spacing: `gap-6` between grid items
- Card padding: `p-6`

## File Structure
```
app/
├── layout.tsx           # Root layout with metadata
├── page.tsx             # Home page with hooks grid
├── globals.css          # Tailwind imports, dark mode styles
└── hooks/
    ├── types.ts         # TypeScript interfaces
    └── data.ts          # Hook data array
components/
└── hook-card.tsx        # Reusable hook card component
memory/
└── spec.md              # This specification file
```

## MVP Scope - Included

- Display hooks in responsive grid
- Hook cards with name, category, description, repo link
- Dark mode support (already in place)
- Responsive design (mobile/tablet/desktop)
- 15 sample hooks to populate the grid
- Clean, minimal design
- External links with proper attributes

## Out of Scope (Future Iterations)

- Search functionality
- Filtering by category
- Sorting options
- User submissions
- Authentication
- Hook submission form
- Star count display
- Detailed hook pages
- Comments/ratings

## Sample Hooks Data

Initial hook candidates:
1. GitHub MCP Server - Official GitHub integration
2. Claude Code MCP - One-shot mode automation
3. Claude MCP Community - Documentation hub
4. Claude Server - Context management
5. PostgreSQL MCP Server - Database queries
6. Filesystem MCP Server - File operations
7. Slack MCP Server - Team communication
8. Google Maps MCP Server - Location services
9. Puppeteer MCP Server - Browser automation
10. Brave Search MCP Server - Web search
11. SQLite MCP Server - Database management
12. Memory MCP Server - Persistent context
13. GitHub Issues MCP Server - Issue tracking
14. Fetch MCP Server - HTTP requests
15. AWS MCP Server - Cloud services

## Technical Stack

- **Next.js 16** with App Router
- **React 19** with TypeScript 5
- **Tailwind CSS v4** with PostCSS
- **Geist fonts** (Sans and Mono)

## Development Commands

```bash
npm run dev    # Start development server (http://localhost:3000)
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run ESLint
```

## Verification Checklist

- [ ] All hooks display in grid layout
- [ ] Cards show name, category, description, repo link
- [ ] Responsive layout (1/2/3 columns)
- [ ] External links open in new tabs
- [ ] Dark mode displays properly
- [ ] No console errors
- [ ] TypeScript compiles without errors
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy
- [ ] Keyboard navigation works
- [ ] Sufficient color contrast

## Future Enhancements

1. Add category filtering
2. Implement search functionality
3. Add hook submission form
4. Include GitHub API integration for live star counts
5. Create individual hook detail pages
6. Add user authentication and submissions
7. Implement rating/comment system
