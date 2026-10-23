# Graph Report - OopsWrongLayout  (2026-10-24)

## Corpus Check
- Corpus is ~5,140 words - fits in a single context window. You may not need a graph.

## Summary
- 54 nodes · 50 edges · 10 communities (7 shown, 3 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: unavailable (agent usage metadata was not exposed)

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

## God Nodes (most connected - your core abstractions)
1. `README` - 5 edges
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
- `Layout Fix page` --implements--> `Layout Fix`  [EXTRACTED]
  index.html → README.md
- `Romaji to Kana page` --implements--> `Romaji to kana conversion`  [EXTRACTED]
  romaji.html → README.md
- `Google Fonts SIL Open Font License notices` --references--> `Dependency-free static browser tools`  [EXTRACTED]
  NOTICE.md → README.md

## Import Cycles
- None detected.

## Communities (10 total, 3 thin omitted)

### Community 0 - "CI Workflow"
Cohesion: 0.25
Nodes (7): jobs, name, branches, branches, True, pull_request, push

### Community 1 - "Layout Fix Interface"
Cohesion: 0.39
Nodes (5): autoDetect(), doConvert(), els, setMeta(), swapLayouts()

### Community 2 - "Project Guide and Tests"
Cohesion: 0.29
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
- **8 isolated node(s):** `Keyboard layout tables`, `Auto-detect conversion direction`, `Hepburn conversion rules`, `Keyboard layout round-trip tests`, `Romaji-to-kana tests` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 32 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `build` connect `CI Build Steps` to `CI Workflow`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `Keyboard layout tables`, `Auto-detect conversion direction`, `Hepburn conversion rules` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `jobs` connect `CI Workflow` to `CI Build Steps`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._