# Ralph - Autonomous AI Coding

Ralph is an autonomous coding agent that iteratively works through a feature list, implementing one task at a time until the project is complete.

## How It Works

Ralph uses the same prompt in a loop. Each iteration:

1. Reviews what's been completed (`agent-progress.txt`)
2. Picks the next logical task from the list (`prd.json`)
3. Implements the feature with proper tests
4. **Verifies UI changes via Playwright MCP**
5. Marks the task complete and documents progress
6. Commits the code

**Key insight**: You define what needs to be done. Ralph decides the order and does the work.

## Sandbox Mode

Ralph runs with `claude --dangerously-skip-permissions` and sandbox enabled via `.claude/settings.json`:

```json
{
  "permissions": {
    "dangerouslySkipPermissions": true
  },
  "sandbox": {
    "enabled": true
  }
}
```

This means:

- ✅ Can edit project files without prompts
- ✅ Can run commands and tests
- ✅ Can make git commits
- ✅ Uses Claude's built-in sandbox for isolation

### Local Configuration

MCPs and settings must be configured locally in this project:

- `.mcp.json` - MCP server configurations (Playwright, Context7, etc.)
- `.claude/settings.json` - Sandbox and permission settings
- `.claude/settings.local.json` - Additional permissions and hooks

## Usage

```bash
./ralph.sh 20    # Run for up to 20 iterations
```

Ralph stops when:

- All tasks are marked complete, OR
- It reaches the iteration limit

## Task Selection

Ralph prioritizes:

- **Foundation before features** - Database and auth before UI
- **Risky work first** - Unknown integrations before routine tasks
- **Respect dependencies** - Don't build what can't work yet

## Testing with Playwright MCP

Ralph is instructed to use the Playwright MCP to verify all UI changes. This means:

1. Starting the dev server
2. Navigating to the relevant page
3. Testing actual user interactions
4. Verifying features work visually

This prevents "it compiles so it works" assumptions.

## Files

- **`prd.json`** - Task list with `passes: false/true`
- **`agent-progress.txt`** - Progress log
- **`ralph.sh`** - The loop script
- **`SPEC.MD`** - Technical specification
- **`.mcp.json`** - MCP configurations
- **`.claude/settings.json`** - Sandbox and permissions

## Monitoring Progress

```bash
cat agent-progress.txt           # See what's done
git log --oneline                # Review commits
grep '"passes": false' prd.json | wc -l  # Count remaining
```

## After Running

Review commits:

```bash
git log -p              # See all changes
git diff HEAD~5..HEAD   # Last 5 commits
```

If something went wrong:

```bash
git reset --hard HEAD~3    # Undo last 3 commits
./ralph.sh 10              # Try again
```

## Tips

- **Start small**: Try 5-10 iterations first
- **Check progress regularly**: Review after 10-20 iterations
- **Keep codebase clean**: Ralph amplifies what it sees
- **Review commits**: Ralph is fast but not perfect

## Limitations

- Works best with clear, structured requirements
- Can't design architecture from scratch (you provide SPEC.MD)
- Needs good initial codebase quality
- Benefits from occasional human review

---

**Bottom line**: Define tasks in `prd.json`. Run Ralph. Review commits. Ship.
