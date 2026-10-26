# Graph Report - OopsWrongLayout  (2026-10-26)

## Corpus Check
- 9 files · ~5,228 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 57 nodes · 53 edges · 11 communities (7 shown, 4 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4376d86f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- CI Workflow
- Layout Fix Interface
- Project Guide and Tests
- CI Build Steps
- Keyboard Conversion Engine
- Theme Controls
- Layout Fix Page
- Kana Mapping Data
- Romaji Kana Page
- Project instructions

## God Nodes (most connected - your core abstractions)
1. `README` - 6 edges
2. `steps` - 4 edges
3. `doConvert()` - 4 edges
4. `build` - 3 edges
5. `swapLayouts()` - 3 edges
6. `autoDetect()` - 3 edges
7. `Layout Fix` - 3 edges
8. `push` - 2 edges
9. `pull_request` - 2 edges
10. `jobs` - 2 edges

## Surprising Connections (you probably didn't know these)
- `README` --references--> `Google Fonts SIL Open Font License notices`  [EXTRACTED]
  README.md → NOTICE.md
- `Google Fonts SIL Open Font License notices` --references--> `Dependency-free static browser tools`  [EXTRACTED]
  NOTICE.md → README.md
- `Layout Fix page` --implements--> `Layout Fix`  [EXTRACTED]
  index.html → README.md
- `Romaji to Kana page` --implements--> `Romaji to kana conversion`  [EXTRACTED]
  romaji.html → README.md

## Import Cycles
- None detected.

## Communities (11 total, 4 thin omitted)

### Community 0 - "CI Workflow"
Cohesion: 0.25
Nodes (7): jobs, name, branches, branches, True, pull_request, push

### Community 1 - "Layout Fix Interface"
Cohesion: 0.39
Nodes (5): autoDetect(), doConvert(), els, setMeta(), swapLayouts()

### Community 2 - "Project Guide and Tests"
Cohesion: 0.33
Nodes (5): Google Fonts SIL Open Font License notices, Romaji-to-kana tests, README, Keyboard layout round-trip tests, Dependency-free static browser tools

### Community 3 - "CI Build Steps"
Cohesion: 0.33
Nodes (6): runs-on, steps, build, name, run, uses

### Community 5 - "Theme Controls"
Cohesion: 0.40
Nodes (4): applyTheme(), media, themeEls, updateActiveButton()

### Community 6 - "Layout Fix Page"
Cohesion: 0.40
Nodes (5): Layout Fix page, Auto-detect conversion direction, Keyboard layout tables, Layout Fix, Physical-key remapping

### Community 8 - "Romaji Kana Page"
Cohesion: 0.67
Nodes (3): Hepburn conversion rules, Romaji to kana conversion, Romaji to Kana page

## Knowledge Gaps
- **7 isolated node(s):** `Romaji-to-kana tests`, `Keyboard layout round-trip tests`, `Auto-detect conversion direction`, `Keyboard layout tables`, `Layout Fix page` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 33 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `build` connect `CI Build Steps` to `CI Workflow`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `Romaji-to-kana tests`, `Keyboard layout round-trip tests`, `Auto-detect conversion direction` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `jobs` connect `CI Workflow` to `CI Build Steps`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._