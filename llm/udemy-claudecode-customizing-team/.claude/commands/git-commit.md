Generate a git commit message for the staged changes.

Context: $ARGUMENTS

Rules:
- Use Conventional Commits format: type(scope): subject
- Types: feat, fix, docs, style, refactor, test, chore
- Keep subject under 50 characters, imperative mood
- Add body explaining what and why if needed
- Do NOT include any AI attribution or footer text
- Output should look professionally human-written

After generating, run: git commit -m "message"
