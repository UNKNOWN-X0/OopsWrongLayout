---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["romaji.html"]
---

# Layout Fix and Romaji → Kana

Scope: both tool pages (`index.html`, `romaji.html`). Mode: Operate.
Audience and job: someone with text typed on the wrong keyboard layout (or romaji to turn into kana) pastes or types, checks the result, copies it.
Constraints: vanilla HTML/CSS/JS, no build step; conversion engines (`layouts.js`, `kana.js`, `kana-data.js`) unchanged; every layout and the theme choice preserved.

## Direction contract

THESIS: Conversion is a fixed code table, typed out. The page refuses the stock two-textarea converter: the mechanism (same physical key → other layout's character) is shown live on a keyboard code table, and the result is struck in like a typewriter.

OWN-WORLD: Flat parchment ground (#f1e7d0), sepia-black ink (#2a2118), ink-blue (#2f4f9a) reserved for live keys, the caret and the one primary action; no red. Martian Mono for labels, counts and typed text; Public Sans for UI; Noto Sans Thai/JP for scripts. 1px ink rules, 6–10px radii, no texture, no gradients. Settings (user change, round two): Mode (System/Light/Dark) and Paper (Parchment default, Carbon Copy, Ledger Green, Blueprint, Kraft), every paper in light and dark; native selects replaced by styled listboxes; keycap logo mark doubles as the site icon.

STORY: The visitor sees immediately which keys their text used and what each became, trusts it is mechanical, copies the result.

FIRST VIEWPORT: Header: wordmark "Oops/Wrong Layout", tool tabs, Display settings at right. Row: Typed as ⇄ Should have been, then Auto-detect beside them. Two equal panes in one ruled frame, A · Typed / B · Fixed with counts, Copy bottom-right of B. Dense status row (Mapped / Unmapped / Keys struck). Full-width keyboard code table: each cap source legend top-left, target bottom-right; keys used tinted, most-used filled ink-blue. Romaji page: same shell, kana output, and a gojūon kana chart (consonant columns × vowel rows) in place of the keyboard, lit by the kana in the result. Builder adaptation of the planned mora strip: kana.js exposes no mora segmentation, and the chart keeps the code-table form without changing the engine.

FORM: Telegraph code book × typewriter, user-steered (pinned palette and theme menu), position 1 after steer; seed:79901881c4c4b6a1

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
