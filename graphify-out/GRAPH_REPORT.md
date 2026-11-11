# Graph Report - OopsWrongLayout  (2026-11-12)

## Corpus Check
- 18 files · ~24,351 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 177 nodes · 196 edges · 17 communities (14 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bd518ba7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- CI Workflow
- script.js
- README
- Design System: Oops/Wrong Layout
- Project standards
- theme.js
- Layout Fix Page
- Kana Mapping Data
- Romaji Kana Page
- engines.test.cjs
- Components
- Product
- typewriter.js
- Layout Fix and Romaji → Kana
- enhanceSelect
- Roadmap

## God Nodes (most connected - your core abstractions)
1. `Components` - 13 edges
2. `Product` - 9 edges
3. `Project standards` - 9 edges
4. `Design System: Oops/Wrong Layout` - 9 edges
5. `doConvert()` - 7 edges
6. `enhanceSelect()` - 7 edges
7. `README` - 7 edges
8. `Roadmap` - 6 edges
9. `onLayoutChange()` - 5 edges
10. `replay()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Layout data` --references--> `scriptScore()`  [INFERRED]
  STANDARDS.md → layouts.js
- `Google Fonts SIL Open Font License notices` --references--> `Dependency-free static browser tools`  [EXTRACTED]
  NOTICE.md → README.md
- `README` --references--> `Google Fonts SIL Open Font License notices`  [EXTRACTED]
  README.md → NOTICE.md
- `Layout Fix page` --implements--> `Layout Fix`  [EXTRACTED]
  index.html → README.md
- `Romaji to Kana page` --implements--> `Romaji to kana conversion`  [EXTRACTED]
  romaji.html → README.md

## Import Cycles
- None detected.

## Communities (17 total, 3 thin omitted)

### Community 0 - "CI Workflow"
Cohesion: 0.14
Nodes (13): runs-on, steps, jobs, build, name, branches, branches, name (+5 more)

### Community 1 - "script.js"
Cohesion: 0.17
Nodes (18): autoDetect(), calm, caps, doConvert(), els, KB_ROWS, legend(), onLayoutChange() (+10 more)

### Community 2 - "README"
Cohesion: 0.19
Nodes (8): Local workflow, Project data, Project instructions, Google Fonts SIL Open Font License notices, Romaji-to-kana tests, README, Keyboard layout round-trip tests, Dependency-free static browser tools

### Community 3 - "Design System: Oops/Wrong Layout"
Cohesion: 0.11
Nodes (19): Colors, Design System: Oops/Wrong Layout, Do:, Do's and Don'ts, Don't:, Elevation & Depth, Hierarchy, Layout (+11 more)

### Community 4 - "Project standards"
Cohesion: 0.13
Nodes (12): LAYOUTS, scriptScore(), SLOTS, Accessibility, Code, Copy, Definition of done, Interface (+4 more)

### Community 5 - "theme.js"
Cohesion: 0.14
Nodes (14): btn, buildPanel(), darkQuery, memory, MODE_ICONS, MODES, motionOff(), panel (+6 more)

### Community 6 - "Layout Fix Page"
Cohesion: 0.40
Nodes (5): Layout Fix page, Auto-detect conversion direction, Keyboard layout tables, Layout Fix, Physical-key remapping

### Community 8 - "Romaji Kana Page"
Cohesion: 0.67
Nodes (3): Hepburn conversion rules, Romaji to kana conversion, Romaji to Kana page

### Community 10 - "engines.test.cjs"
Cohesion: 0.13
Nodes (9): assert, fs, keys, { LAYOUTS, SLOTS, convertText, scriptScore, romajiToKana }, path, root, sandbox, test (+1 more)

### Community 11 - "Components"
Cohesion: 0.15
Nodes (13): Buttons, Code Table (signature), Components, Copied Slip, Display Settings, Footer Credit, Inputs / Fields, Motion (+5 more)

### Community 12 - "Product"
Cohesion: 0.22
Nodes (9): Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product, Product Principles, Product Purpose (+1 more)

### Community 13 - "typewriter.js"
Cohesion: 0.36
Nodes (6): createTypewriter(), set(), show(), stop(), reducedMotion, splitGraphemes()

### Community 15 - "enhanceSelect"
Cohesion: 0.39
Nodes (7): enhanceSelect(), choose(), close(), open(), setActive(), sync(), typeahead()

### Community 16 - "Roadmap"
Cohesion: 0.29
Nodes (6): Direction, Later: reach more people, Next: make the tools better at their job, Not planned, Now: foundations, Roadmap

## Knowledge Gaps
- **7 isolated node(s):** `Romaji-to-kana tests`, `Keyboard layout round-trip tests`, `Auto-detect conversion direction`, `Keyboard layout tables`, `Layout Fix page` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 108 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design System: Oops/Wrong Layout` connect `Design System: Oops/Wrong Layout` to `README`, `Components`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **What connects `Romaji-to-kana tests`, `Keyboard layout round-trip tests`, `Auto-detect conversion direction` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `CI Workflow` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Why does `Project standards` connect `Project standards` to `README`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Should `Design System: Oops/Wrong Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `Components` connect `Components` to `Design System: Oops/Wrong Layout`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `Project standards` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._