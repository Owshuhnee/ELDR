# Pull Request Guidelines – ELDR

## When to Open a PR

Open a Pull Request when:
- A feature branch is complete and ready to be merged into `dev`
- A bug fix is done and tested
- At the end of a sprint, when `dev` is ready to merge into `main`

**Never push directly to `main` or `dev`.** All changes go through a PR.

---

## PR Title Format

```
[Type] Short description of what this PR does
```

**Examples:**
```
[Feature] Add product card component with verified badge
[Fix] Fix search bar visibility on mobile screens
[Sprint] Merge dev into main – Sprint 1 complete
```

---

## PR Description Template

When creating a PR, fill out the following. (You can copy this into the GitHub PR description box.)

```markdown
## What does this PR do?
<!-- Briefly describe what you built or fixed -->

## Related Tasks
<!-- Link to the JIRA task or user story if applicable -->

## Changes Made
- 
- 
- 

## How to Test
<!-- Steps for your reviewer to test the changes -->
1. 
2. 
3. 

## Screenshots (if UI change)
<!-- Paste a screenshot or screen recording here -->

## Checklist
- [ ] Code runs without errors
- [ ] I tested this on mobile and desktop (or noted if not applicable)
- [ ] No console errors or warnings
- [ ] Branch is up to date with dev
```

---

## Reviewing a PR

When your teammate opens a PR and assigns you as reviewer:

### Step 1 – Pull and Test Locally
```bash
git fetch origin
git checkout feature/their-branch-name
# Test the changes manually
```

### Step 2 – Review the Code on GitHub
Go to the **Files changed** tab and look for:
- Does the code do what the PR description says?
- Are there any obvious bugs or logic errors?
- Is the code readable — can you follow what it's doing?
- Are there any accessibility concerns (for a UI change)?
- Does it follow our naming conventions and commit style?

### Step 3 – Leave Feedback

You have three options in GitHub:

| Action | When to Use |
|---|---|
| ✅ **Approve** | Looks good, ready to merge |
| 💬 **Comment** | You have a question or suggestion but it's not blocking |
| ❌ **Request Changes** | There's a bug, broken code, or something must be fixed before merging |

**When leaving comments:**
- Be specific — point to the exact line and explain the issue
- Be constructive — suggest a fix, not just "this is wrong"
- Separate blocking issues from suggestions (e.g. "Blocking: this will crash if the array is empty" vs "Suggestion: could simplify this with a ternary")

### Step 4 – Approve and Merge

Once approved:
1. The **author** (not the reviewer) merges the PR
2. Use **"Squash and merge"** for feature branches into `dev` — this keeps the history clean
3. Use **"Merge commit"** for `dev` into `main` at sprint end — this preserves the full sprint history
4. Delete the feature branch after merging (GitHub will prompt you)

---

## PR Rules Summary

| Rule | Details |
|---|---|
| Minimum 1 approval required | The other team member must approve before merging |
| No self-merging | You cannot approve your own PR |
| Branch must be up to date | Rebase or merge from `dev` before requesting review |
| No broken builds | Code must run before opening a PR |
| Feature branch → `dev` only | Never open a PR from a feature branch directly into `main` |

---

## Quick Example: Full PR Flow

```
Ross creates feature/product-listing-page
  → finishes work, pushes to GitHub
  → opens PR: feature/product-listing-page → dev
  → fills out PR description template
  → assigns Jove as reviewer

Jove reviews the PR on GitHub
  → tests locally
  → leaves one comment: "Can we add an alt text to the product image?"
  → requests changes

Ross addresses the feedback
  → pushes the fix to the same branch (PR updates automatically)
  → replies to Jove's comment: "Fixed in latest commit"

Jove re-reviews and approves

Ross merges the PR using Squash and merge
  → deletes the feature branch
```