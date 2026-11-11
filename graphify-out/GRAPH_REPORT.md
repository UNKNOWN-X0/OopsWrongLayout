# Graph Report - OopsWrongLayout  (2026-11-12)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 177 nodes · 196 edges · 17 communities (14 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bd518ba7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- GitHub Pages Build Workflow
- Layout Fix Page Logic
- Project Docs and Agent Notes
- Design System Overview
- Layout Engine and Project Rules
- Display Settings (Mode and Paper)
- Layout Fix Concepts
- Kana Lookup Table
- Romaji to Kana Concepts
- Engine Tests
- Design Components and Motion
- Product Definition
- Typed-Out Result and Copy
- Design Direction Contract
- Layout Picker (Custom Select)
- Product Roadmap

## God Nodes (most connected - your core abstractions)
1. `Components` - 13 edges
2. `Product` - 9 edges
3. `Design System: Oops/Wrong Layout` - 9 edges
4. `Project standards` - 9 edges
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

### Community 0 - "GitHub Pages Build Workflow"
Cohesion: 0.14
Nodes (13): runs-on, steps, jobs, build, name, branches, branches, name (+5 more)

### Community 1 - "Layout Fix Page Logic"
Cohesion: 0.17
Nodes (18): autoDetect(), calm, caps, doConvert(), els, KB_ROWS, legend(), onLayoutChange() (+10 more)

### Community 2 - "Project Docs and Agent Notes"
Cohesion: 0.19
Nodes (8): Local workflow, Project data, Project instructions, Google Fonts SIL Open Font License notices, Romaji-to-kana tests, README, Keyboard layout round-trip tests, Dependency-free static browser tools

### Community 3 - "Design System Overview"
Cohesion: 0.11
Nodes (19): Colors, Design System: Oops/Wrong Layout, Do:, Do's and Don'ts, Don't:, Elevation & Depth, Hierarchy, Layout (+11 more)

### Community 4 - "Layout Engine and Project Rules"
Cohesion: 0.13
Nodes (12): LAYOUTS, scriptScore(), SLOTS, Accessibility, Code, Copy, Definition of done, Interface (+4 more)

### Community 5 - "Display Settings (Mode and Paper)"
Cohesion: 0.14
Nodes (14): btn, buildPanel(), darkQuery, memory, MODE_ICONS, MODES, motionOff(), panel (+6 more)

### Community 6 - "Layout Fix Concepts"
Cohesion: 0.40
Nodes (5): Layout Fix page, Auto-detect conversion direction, Keyboard layout tables, Layout Fix, Physical-key remapping

### Community 8 - "Romaji to Kana Concepts"
Cohesion: 0.67
Nodes (3): Hepburn conversion rules, Romaji to kana conversion, Romaji to Kana page

### Community 10 - "Engine Tests"
Cohesion: 0.13
Nodes (9): assert, fs, keys, { LAYOUTS, SLOTS, convertText, scriptScore, romajiToKana }, path, root, sandbox, test (+1 more)

### Community 11 - "Design Components and Motion"
Cohesion: 0.15
Nodes (13): Buttons, Code Table (signature), Components, Copied Slip, Display Settings, Footer Credit, Inputs / Fields, Motion (+5 more)

### Community 12 - "Product Definition"
Cohesion: 0.22
Nodes (9): Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product, Product Principles, Product Purpose (+1 more)

### Community 13 - "Typed-Out Result and Copy"
Cohesion: 0.36
Nodes (6): createTypewriter(), set(), show(), stop(), reducedMotion, splitGraphemes()

### Community 15 - "Layout Picker (Custom Select)"
Cohesion: 0.39
Nodes (7): enhanceSelect(), choose(), close(), open(), setActive(), sync(), typeahead()

### Community 16 - "Product Roadmap"
Cohesion: 0.29
Nodes (6): Direction, Later: reach more people, Next: make the tools better at their job, Not planned, Now: foundations, Roadmap

## Knowledge Gaps
- **7 isolated node(s):** `Romaji-to-kana tests`, `Keyboard layout round-trip tests`, `Auto-detect conversion direction`, `Keyboard layout tables`, `Layout Fix page` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 108 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design System: Oops/Wrong Layout` connect `Design System Overview` to `Project Docs and Agent Notes`, `Design Components and Motion`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **What connects `Romaji-to-kana tests`, `Keyboard layout round-trip tests`, `Auto-detect conversion direction` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `GitHub Pages Build Workflow` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Why does `Project standards` connect `Layout Engine and Project Rules` to `Project Docs and Agent Notes`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Should `Design System Overview` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `Components` connect `Design Components and Motion` to `Design System Overview`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Should `Layout Engine and Project Rules` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._