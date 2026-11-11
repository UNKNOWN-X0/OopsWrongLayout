# Graph Report - OopsWrongLayout  (2026-11-11)

## Corpus Check
- 15 files · ~21,434 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 144 nodes · 157 edges · 16 communities (11 shown, 5 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d5e9652c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- CI Workflow
- script.js
- Project Guide and Tests
- Design System: Oops/Wrong Layout
- Keyboard Conversion Engine
- theme.js
- Layout Fix Page
- Kana Mapping Data
- Romaji Kana Page
- Project instructions
- Components
- Product
- typewriter.js
- Layout Fix and Romaji → Kana
- enhanceSelect

## God Nodes (most connected - your core abstractions)
1. `Components` - 13 edges
2. `Design System: Oops/Wrong Layout` - 9 edges
3. `Product` - 9 edges
4. `enhanceSelect()` - 7 edges
5. `doConvert()` - 7 edges
6. `README` - 6 edges
7. `replay()` - 5 edges
8. `onLayoutChange()` - 5 edges
9. `Colors` - 5 edges
10. `renderKeyboard()` - 4 edges

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

## Communities (16 total, 5 thin omitted)

### Community 0 - "CI Workflow"
Cohesion: 0.14
Nodes (13): runs-on, steps, jobs, build, name, branches, branches, name (+5 more)

### Community 1 - "script.js"
Cohesion: 0.17
Nodes (18): autoDetect(), calm, caps, doConvert(), els, KB_ROWS, legend(), onLayoutChange() (+10 more)

### Community 2 - "Project Guide and Tests"
Cohesion: 0.33
Nodes (5): Google Fonts SIL Open Font License notices, Romaji-to-kana tests, README, Keyboard layout round-trip tests, Dependency-free static browser tools

### Community 3 - "Design System: Oops/Wrong Layout"
Cohesion: 0.10
Nodes (19): Colors, Design System: Oops/Wrong Layout, Do:, Do's and Don'ts, Don't:, Elevation & Depth, Hierarchy, Layout (+11 more)

### Community 5 - "theme.js"
Cohesion: 0.14
Nodes (14): btn, buildPanel(), darkQuery, memory, MODE_ICONS, MODES, motionOff(), panel (+6 more)

### Community 6 - "Layout Fix Page"
Cohesion: 0.40
Nodes (5): Layout Fix page, Auto-detect conversion direction, Keyboard layout tables, Layout Fix, Physical-key remapping

### Community 8 - "Romaji Kana Page"
Cohesion: 0.67
Nodes (3): Hepburn conversion rules, Romaji to kana conversion, Romaji to Kana page

### Community 11 - "Components"
Cohesion: 0.15
Nodes (13): Buttons, Code Table (signature), Components, Copied Slip, Display Settings, Footer Credit, Inputs / Fields, Motion (+5 more)

### Community 12 - "Product"
Cohesion: 0.20
Nodes (9): Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product, Product Principles, Product Purpose (+1 more)

### Community 13 - "typewriter.js"
Cohesion: 0.36
Nodes (6): createTypewriter(), set(), show(), stop(), reducedMotion, splitGraphemes()

### Community 15 - "enhanceSelect"
Cohesion: 0.39
Nodes (7): enhanceSelect(), choose(), close(), open(), setActive(), sync(), typeahead()

## Knowledge Gaps
- **7 isolated node(s):** `Romaji-to-kana tests`, `Keyboard layout round-trip tests`, `Auto-detect conversion direction`, `Keyboard layout tables`, `Layout Fix page` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 85 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design System: Oops/Wrong Layout` connect `Design System: Oops/Wrong Layout` to `Components`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `Romaji-to-kana tests`, `Keyboard layout round-trip tests`, `Auto-detect conversion direction` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `CI Workflow` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Why does `Components` connect `Components` to `Design System: Oops/Wrong Layout`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `Design System: Oops/Wrong Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `theme.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1437908496732026 - nodes in this community are weakly interconnected._