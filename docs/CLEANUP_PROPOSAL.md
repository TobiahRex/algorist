# File Tree Cleanup Proposal

## Goal: Make Entry Point Obvious

**Current Problem**: Main content buried in `library_2025/CORE/`, surrounded by 560MB of legacy clutter.

**Solution**: Promote CORE to root level, archive/delete everything else.

---

## Proposed New Structure

```
algorist/
├── 📚 patterns/                    # ✅ Main entry point (29 patterns)
│   ├── README.md                   # Start here!
│   ├── 01-sliding-window.md
│   ├── 02-two-pointers.md
│   └── ... (27 more)
│
├── 🏭 applications/                # ✅ Production implementations
│   ├── README.md
│   ├── scheduling/
│   ├── constraint-satisfaction/
│   ├── partitions/
│   └── optimization/
│
├── 📖 algorithm-books/             # ✅ Keep (reference materials)
│   └── (submodule)
│
├── 📦 archive/                     # Archive legacy content
│   ├── library_2022/               # Old organized materials
│   ├── library_2025_legacy/        # Old graph_algos, dp, etc.
│   └── algorist-toolbox/           # Jupyter notebooks
│
├── 📝 docs/                        # Documentation
│   ├── REORGANIZATION_COMPLETE.md
│   ├── REORGANIZATION_PLAN.md
│   ├── MERGE_STRATEGY.md
│   ├── PATTERN_TEMPLATE.md
│   └── PHASE2_CATEGORIZATION.md
│
├── README.md                       # Updated main readme
├── CLAUDE.md                       # Updated for new structure
└── package.json, .gitignore, etc. # Config files
```

**Result**: Only 4-5 top-level directories instead of 14!

---

## Actions to Execute

### 1. Promote CORE to Root ✨

```bash
# Move CORE contents up to root
mv library_2025/CORE/patterns ./
mv library_2025/CORE/applications ./
```

### 2. Archive Legacy Content 📦

```bash
mkdir -p archive

# Move deprecated content to archive
mv library_2022 archive/
mv algorist-toolbox archive/
mv library_2025 archive/library_2025_legacy  # Old subdirs (graph_algos, dp, etc.)
mv behavior_patterns archive/  # Already migrated to applications/
```

### 3. Delete Obsolete Content 🗑️

```bash
# Delete confirmed obsolete directories
rm -rf morphio-react/          # 121MB - obsolete React app
rm -rf morphio/                # 268KB - obsolete
rm -rf flashcards/             # 8KB - obsolete
rm -rf _answerTemplate/        # 12KB - obsolete
rm -rf scheduler/              # 28KB - unclear purpose
rm -rf async/                  # 16KB - unclear purpose
rm -rf data-structures/        # 16KB - unclear purpose
rm -rf mindset/                # 4KB - unclear purpose
rm -rf design_patterns/        # 4KB - unclear purpose
```

**Space Reclaimed**: ~122MB deleted, ~6MB archived

### 4. Organize Documentation 📝

```bash
mkdir -p docs
mv REORGANIZATION_*.md docs/
mv MERGE_STRATEGY.md docs/
mv PATTERN_TEMPLATE.md docs/
mv PHASE2_CATEGORIZATION.md docs/
```

### 5. Update README.md 📄

Create new root README.md that clearly points to `patterns/` as the entry point.

---

## Before vs After

### Before (14 directories, confusing):
```
algorist/
├── _answerTemplate/
├── algorithm-books/
├── algorist-toolbox/
├── async/
├── behavior_patterns/
├── data-structures/
├── design_patterns/
├── flashcards/
├── library_2022/
├── library_2025/          # Main work buried here!
│   └── CORE/
│       ├── patterns/      # 2 levels deep!
│       └── applications/
├── mindset/
├── morphio/
├── morphio-react/
└── scheduler/
```

### After (5 directories, clear):
```
algorist/
├── 📚 patterns/           # ← OBVIOUS ENTRY POINT
├── 🏭 applications/       # ← Production code
├── 📖 algorithm-books/    # Reference materials
├── 📦 archive/            # Legacy content (if needed)
├── 📝 docs/               # Planning/reorganization docs
└── README.md              # "Start at patterns/"
```

---

## Entry Point Flow

**New user experience**:
1. Clone repo
2. See `patterns/` directory at root
3. Read `README.md` → points to `patterns/README.md`
4. Start learning immediately

**Current user experience**:
1. Clone repo
2. See 14 directories, confusion
3. "Which one do I use? library_2022? library_2025? toolbox?"
4. Have to read CLAUDE.md to find `library_2025/CORE/`
5. Navigate 2 levels deep

---

## Safety Notes

- **algorithm-books/**: Keep (430MB of reference materials)
- **archive/**: Contents still accessible if needed
- **Git history**: All deleted content still in git history (can recover)
- **Commit before deletion**: Safety checkpoint

---

## Execution Order

1. ✅ **Commit current state** (safety checkpoint)
2. ✅ **Create archive/** directory
3. ✅ **Move legacy content** to archive/
4. ✅ **Promote patterns/ and applications/** to root
5. ✅ **Delete obsolete** directories
6. ✅ **Organize docs/** directory
7. ✅ **Update README.md** and CLAUDE.md
8. ✅ **Commit final state**

---

## Risk Assessment

**Low Risk**:
- Deleting morphio, morphio-react, flashcards (confirmed obsolete)
- Moving to archive (still accessible)
- Promoting CORE to root (just moving)

**Questions to Confirm**:
- `algorithm-books/`: Keep or archive? (430MB - seems like useful references)
- `scheduler/`, `async/`, `data-structures/`, `mindset/`, `design_patterns/`: Delete or archive?

---

## Recommendation

**Execute full cleanup**: Promote CORE, archive legacy, delete obsolete.

**Result**:
- Clear entry point (`patterns/`)
- 560MB → ~438MB (reclaim 122MB)
- 14 root directories → 5 root directories
- No confusion for new users

**Time**: ~5 minutes to execute
