# 📚 MOTOMINDER - GIT CHEAT SHEET

## Quick Reference per Comandi Git Essenziali

---

## 🚀 Setup Iniziale

### Prima Volta
```bash
# Configure Git (una volta sola)
git config --global user.name "Alessandro"
git config --global user.email "tua-email@example.com"

# Configure editor (opzionale)
git config --global core.editor "code --wait"  # VS Code
```

### Clone & Setup
```bash
# Clone repository
git clone https://github.com/TUO_USERNAME/MotoMinder.git
cd MotoMinder

# Check status
git status

# View remote
git remote -v
```

---

## 📝 Daily Workflow

### Check What Changed
```bash
# See changes
git status

# See detailed diff
git diff

# See diff of specific file
git diff src/screens/auth/LoginScreen.tsx
```

### Stage & Commit
```bash
# Stage all changes
git add .

# Stage specific file
git add src/services/api/vehicleAPI.ts

# Stage all files in folder
git add src/screens/auth/

# Unstage file
git restore --staged filename.ts

# Commit with message
git commit -m "feat: Add login screen"

# Commit all tracked files (skip staging)
git commit -am "fix: Fix navigation bug"
```

### Push & Pull
```bash
# Push to remote
git push

# Push specific branch
git push origin feature/auth

# Pull latest changes
git pull

# Pull with rebase (cleaner history)
git pull --rebase
```

---

## 🌿 Branch Management

### Create & Switch Branches
```bash
# Create new branch
git branch feature/add-moto

# Switch to branch
git checkout feature/add-moto

# Create AND switch (shortcut)
git checkout -b feature/add-moto

# Create from specific branch
git checkout -b feature/notifications develop
```

### View Branches
```bash
# List local branches
git branch

# List all branches (including remote)
git branch -a

# See current branch
git branch --show-current
```

### Merge Branches
```bash
# Switch to target branch
git checkout develop

# Merge feature branch
git merge feature/add-moto

# Delete merged branch
git branch -d feature/add-moto

# Force delete unmerged branch
git branch -D feature/bad-idea
```

---

## 🔍 History & Logs

### View History
```bash
# Pretty log (recommended)
git log --oneline --graph --decorate --all

# Last 5 commits
git log --oneline -5

# Commits by author
git log --author="Alessandro"

# Commits with specific message
git log --grep="fix"

# Changes in specific file
git log --oneline -- src/services/api/vehicleAPI.ts
```

### Show Commit Details
```bash
# Show specific commit
git show COMMIT_HASH

# Show last commit
git show HEAD

# Show commit stats
git show --stat COMMIT_HASH
```

---

## ⏪ Undo Things

### Undo Changes (Not Committed)
```bash
# Discard changes in file
git restore filename.ts

# Discard all changes
git restore .

# Discard changes in folder
git restore src/screens/
```

### Undo Commits
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) ⚠️ DANGER
git reset --hard HEAD~1

# Undo multiple commits
git reset --soft HEAD~3

# Undo to specific commit
git reset --hard COMMIT_HASH
```

### Fix Last Commit
```bash
# Forgot to add file? Add it and amend:
git add forgotten-file.ts
git commit --amend --no-edit

# Fix commit message
git commit --amend -m "feat: Correct message"
```

---

## 🏷️ Tags (Releases)

### Create Tags
```bash
# Annotated tag (recommended)
git tag -a v1.0.0 -m "MVP Release"

# Lightweight tag
git tag v1.0.0

# Tag specific commit
git tag -a v0.9.0 COMMIT_HASH -m "Beta release"
```

### View & Push Tags
```bash
# List tags
git tag

# Show tag details
git show v1.0.0

# Push tag to remote
git push origin v1.0.0

# Push all tags
git push origin --tags
```

### Delete Tags
```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
```

---

## 🔄 Rebase

### Rebase Feature Branch
```bash
# Update feature branch with latest develop
git checkout feature/auth
git rebase develop

# If conflicts, fix them then:
git add .
git rebase --continue

# Abort rebase
git rebase --abort
```

### Interactive Rebase (Clean History)
```bash
# Rebase last 3 commits
git rebase -i HEAD~3

# In editor:
# pick = keep commit
# squash = merge with previous
# reword = change message
# drop = delete commit
```

---

## 💾 Stash (Temporary Save)

### Save Work in Progress
```bash
# Stash changes
git stash

# Stash with message
git stash save "WIP: Debugging auth flow"

# Stash including untracked files
git stash -u
```

### Retrieve Stashed Work
```bash
# List stashes
git stash list

# Apply last stash (keep in list)
git stash apply

# Apply and remove from list
git stash pop

# Apply specific stash
git stash apply stash@{1}

# Delete stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

---

## 🔀 Cherry Pick

### Apply Specific Commit to Another Branch
```bash
# Get commit hash from log
git log --oneline

# Switch to target branch
git checkout develop

# Apply specific commit
git cherry-pick COMMIT_HASH

# Cherry pick multiple commits
git cherry-pick HASH1 HASH2 HASH3
```

---

## 🔍 Search & Find

### Find in Code
```bash
# Search in tracked files
git grep "fetchVehicleData"

# Search with line numbers
git grep -n "TODO"

# Search in specific commit
git grep "bug" COMMIT_HASH
```

### Find Who Changed What
```bash
# Blame (who wrote each line)
git blame src/services/api/vehicleAPI.ts

# Blame specific lines
git blame -L 10,20 filename.ts
```

---

## 🤝 Collaboration

### Fetch & Merge
```bash
# Fetch latest from remote (doesn't merge)
git fetch origin

# Fetch all remotes
git fetch --all

# See what would be merged
git log HEAD..origin/develop

# Merge fetched changes
git merge origin/develop
```

### Pull Requests (via GitHub CLI)
```bash
# Create PR
gh pr create --title "Add authentication" --body "Implements Firebase auth"

# List PRs
gh pr list

# View PR
gh pr view 123

# Merge PR
gh pr merge 123
```

---

## 🛠️ Maintenance

### Clean Up
```bash
# Remove untracked files (dry run first!)
git clean -n

# Actually remove
git clean -f

# Remove ignored files too
git clean -fX

# Remove everything untracked
git clean -fdx
```

### Optimize Repository
```bash
# Garbage collection
git gc

# Aggressive optimization
git gc --aggressive --prune=now

# Verify integrity
git fsck
```

---

## 🚨 Emergency Commands

### "OH NO I PUSHED SENSITIVE DATA!" 🔥
```bash
# 1. IMMEDIATELY ROTATE ALL KEYS/PASSWORDS!
# 2. Then remove from history:

# Remove file from all history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (careful!)
git push origin --force --all
git push origin --force --tags

# 3. Tell all collaborators to re-clone
```

### "I Want to Go Back in Time"
```bash
# See where HEAD was
git reflog

# Go back to previous state
git reset --hard HEAD@{1}

# Create new branch from reflog
git checkout -b recovery HEAD@{3}
```

### "Merge Conflicts Help!"
```bash
# See conflicts
git status

# Use their version
git checkout --theirs filename.ts

# Use our version  
git checkout --ours filename.ts

# Abort merge
git merge --abort

# After fixing conflicts:
git add .
git commit -m "fix: Resolve merge conflicts"
```

---

## 📋 Git Aliases (Time Savers)

Add to `~/.gitconfig`:
```bash
[alias]
    # Status
    st = status
    
    # Pretty log
    lg = log --oneline --graph --decorate --all
    
    # Last commit
    last = log -1 HEAD
    
    # Undo last commit
    undo = reset --soft HEAD~1
    
    # Amend last commit
    amend = commit --amend --no-edit
    
    # List branches
    br = branch
    
    # Checkout
    co = checkout
    
    # Create and checkout branch
    cob = checkout -b
    
    # Commit all
    ca = commit -am
    
    # Push current branch
    pushup = push -u origin HEAD
    
    # Pull with rebase
    up = pull --rebase
    
    # Show changes
    df = diff
    
    # Stash shortcuts
    ss = stash save
    sp = stash pop
```

Usage:
```bash
git st          # instead of git status
git lg          # pretty log
git cob feat/x  # create and checkout branch
git pushup      # push current branch
```

---

## 🎯 MotoMinder Specific Workflows

### Starting New Feature
```bash
# 1. Make sure you're on develop
git checkout develop
git pull

# 2. Create feature branch
git checkout -b feature/notifications

# 3. Work on feature...
# ... make changes ...

# 4. Commit regularly
git add .
git commit -m "feat(notifications): Add push notification setup"

# 5. Push to remote
git push -u origin feature/notifications

# 6. When done, create PR via GitHub
gh pr create
```

### Daily Dev Routine
```bash
# Morning: Get latest changes
git checkout develop
git pull
git checkout feature/my-feature
git rebase develop  # Update feature with latest

# During day: Commit often
git add .
git commit -m "wip: Working on X"

# End of day: Push
git push
```

### Before Pushing
```bash
# 1. Check what you're pushing
git status
git log origin/develop..HEAD

# 2. Run lint
npm run lint

# 3. Run tests
npm test

# 4. If all good, push
git push
```

### Preparing for Release
```bash
# 1. Merge all features to develop
git checkout develop
git merge feature/auth
git merge feature/add-moto
# ... etc

# 2. Test thoroughly

# 3. Merge develop to main
git checkout main
git merge develop

# 4. Tag release
git tag -a v1.0.0 -m "MVP Release 🚀"

# 5. Push everything
git push origin main develop --tags

# 6. Build and deploy
eas build --platform all
```

---

## 🆘 When You're Stuck

### Git is Confusing
```bash
# See what will happen (without doing it)
git log --oneline --graph --decorate --all

# Check what branch you're on
git branch --show-current

# See remote URL
git remote -v
```

### "It Says 'Your Branch is Behind'"
```bash
# Pull latest changes
git pull

# Or with rebase for cleaner history
git pull --rebase
```

### "It Says 'Your Branch is Ahead'"
```bash
# Push your commits
git push
```

### "It Says 'Diverged'"
```bash
# You and remote have different commits
# Option 1: Merge
git pull

# Option 2: Rebase (cleaner)
git pull --rebase

# Option 3: Reset to match remote (⚠️ LOSES LOCAL COMMITS)
git reset --hard origin/develop
```

---

## 💡 Pro Tips

1. **Commit Messages Matter**
   ```bash
   # Good ✅
   git commit -m "feat(auth): Add Google Sign-In with error handling"
   
   # Bad ❌
   git commit -m "stuff"
   git commit -m "fix"
   git commit -m "asdf"
   ```

2. **Use .gitignore**
   ```bash
   # Check what's ignored
   git status --ignored
   
   # Test if file is ignored
   git check-ignore -v filename.ts
   ```

3. **Branch Names**
   ```bash
   # Good ✅
   feature/add-moto-screen
   fix/notification-bug
   refactor/auth-service
   
   # Bad ❌
   my-branch
   test
   asdf-123
   ```

4. **Commit Often**
   ```bash
   # Every 30-60 minutes:
   git add .
   git commit -m "wip: Progress on X"
   
   # Can always squash later with rebase -i
   ```

5. **Check Before You Push**
   ```bash
   # Always check what you're about to push:
   git log origin/develop..HEAD --oneline
   git diff origin/develop..HEAD
   ```

---

## 📚 Learn More

- **Git Book**: https://git-scm.com/book/en/v2
- **Atlassian Git Tutorials**: https://www.atlassian.com/git/tutorials
- **GitHub Docs**: https://docs.github.com/en/get-started

---

**Print this and keep it handy! 📄✨**

Remember: **Google is your friend** for specific errors, but this covers 95% of daily Git usage! 🚀
