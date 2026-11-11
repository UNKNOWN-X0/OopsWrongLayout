# Project instructions

This file follows the [Project AGENTS standard](../../STANDARDS.md#project-agents-standard)
and supplements the shared rules in [workspace AGENTS.md](../../AGENTS.md). It records
verified project-specific facts. See [ADD-ONS.md](../../ADD-ONS.md)
for the complete workspace add-on inventory and upkeep notes; it is a catalog,
not a separate workflow guide.

## Project data

- **Graphify:** This repository has a persistent index at `graphify-out/graph.json`. Follow the workspace [Graphify graph standard](../../STANDARDS.md#graphify-graph-standard).
- **Archify:** Diagrams for this repository belong in its `.archify/` folder. Follow the workspace [Archify diagram standard](../../STANDARDS.md#archify-diagram-standard); HTML diagrams are snapshots.

## Local workflow

- **Standards:** [STANDARDS.md](STANDARDS.md) holds this project's rules and its definition of done; [DESIGN.md](DESIGN.md) is the visual authority and [PRODUCT.md](PRODUCT.md) the product truth. Read them before changing the interface or the engines.
- **Engine tests:** `node --test tests/*.test.cjs` (registered in `scripts/test-all.sh`, so **Test: all projects** runs it).
- **Browser checks:** the shared smoke test covers both pages. For visual or interactive changes, also check Chromium and WebKit at 390, 820 and 1440 px.
- **Design check:** run `impeccable detect --json index.html romaji.html style.css` once a UI change is finished. No design hook is installed for this project.
- **Engines are pure:** `layouts.js`, `kana-data.js` and `kana.js` must not touch the DOM or storage; the UI files call them.
- **Deployment:** the site is served from `main` by GitHub Pages; pushing `main` publishes it.
