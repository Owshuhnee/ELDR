# Git Branching Strategy – ELDR

## Branch Structure

```
main
└── dev
    ├── feature/feature-name      ← new features
    ├── fix/bug-description       ← bug fixes
    └── tasks/task-description    ← non-code tasks (config, docs)
```

### `main` — Production-Ready Code
- Always stable and deployable
- **No one pushes directly to `main`**
- Only updated via a Pull Request from `dev`
- Protected branch — requires PR approval before merging

### `dev` — Active Development Branch
- The shared working branch for the team
- All feature branches are merged into `dev` via Pull Request
- Should always be in a working state (no broken builds)
- Merged into `main` at the end of each sprint after review

---

## Branch Naming Conventions

| Type | Pattern | Example |
|---|---|---|
| New feature | `feature/short-description` | `feature/product-card-ui` |
| Bug fix | `fix/short-description` | `fix/search-bar-visibility` |
| Chore/config | `chore/short-description` | `chore/setup-eslint` |
| Hotfix to main | `hotfix/short-description` | `hotfix/login-crash` |

**Rules:**
- Use lowercase and hyphens only — no spaces or underscores
- Keep names short but descriptive
- Base all new branches off `dev` (not `main`)

---

## Workflow: Step-by-Step

### Starting a New Feature

```bash
# 1. Switch to dev and pull the latest changes
git checkout dev
git pull origin dev

# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Do your work, then stage and commit
git add .
git commit -m "feat: add product card component"

# 4. Push your branch to GitHub
git push origin feature/your-feature-name

# 5. Open a Pull Request into dev on GitHub
```

### Keeping Your Branch Up to Date

If `dev` has moved ahead while you're working on your branch:

```bash
git checkout dev
git pull origin dev
git checkout feature/your-feature-name
git merge dev
# Resolve any conflicts, then continue
```

---

## Commit Message Format

Follow this pattern for every commit:

```
type: short description (max 72 characters)
```

| Type | When to Use |
|---|---|
| `feat` | New feature or functionality |
| `fix` | Bug fix |
| `style` | UI/CSS changes with no logic change |
| `refactor` | Code restructure, no behaviour change |
| `test` | Adding or updating tests |
| `docs` | Documentation only |
| `chore` | Config files, dependencies, tooling |

**Examples:**
```
feat: add verified badge to product card
fix: search bar not visible on mobile
style: increase button size for accessibility
docs: update README with setup instructions
chore: add .env.example file
```

---

## Sprint Merge Strategy

At the **end of each sprint**:

1. All feature branches are merged into `dev` via approved PRs
2. `dev` is tested to confirm nothing is broken
3. A PR from `dev` → `main` is opened
4. Both team members review the sprint PR
5. After approval, `dev` is merged into `main`
6. Tag the release: `git tag -a v0.1.0 -m "Sprint 1 complete"`

---

## Conflict Resolution

If you hit a merge conflict:
1. Don't panic — read the conflict markers carefully
2. Communicate with your teammate before overwriting their work
3. Resolve together if the conflict involves shared files
4. After resolving: `git add .` then `git commit` to complete the merge