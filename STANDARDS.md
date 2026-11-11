# Project standards

The rules every change to Oops/Wrong Layout has to meet, and how to check them. Each fact lives in one file:

| File | Owns |
|---|---|
| [PRODUCT.md](PRODUCT.md) | What the product is, who it serves, and what it must never claim |
| [DESIGN.md](DESIGN.md) | The visual system: tokens, type, components, motion, named rules |
| **STANDARDS.md** (this file) | Engineering and quality rules, and the definition of done |
| [ROADMAP.md](ROADMAP.md) | Where the project is heading and in what order |
| [README.md](README.md) | What a visitor or contributor needs first |
| [NOTICE.md](NOTICE.md) | Third-party licences (fonts, logo glyphs) |

When two files disagree, the owner above wins and the other is fixed.

## Product invariants

These hold for every feature, old or new.

- **Mechanical, never guessed.** Layout Fix maps physical key positions; Romaji → Kana applies explicit Hepburn rules. No dictionary, language model or "correction" is implied in copy or behaviour. Words like *translate* or *fix spelling* are out.
- **The user's text is theirs.** Nothing typed or pasted leaves the browser: no network calls with user text, no analytics, no storage of input. Only the two display settings (`mode`, `paper`) are stored, in `localStorage`.
- **Static and dependency-free.** Plain HTML, CSS and JavaScript served as files. No build step, framework, package install or runtime dependency. The only external requests are Google Fonts stylesheets (see [ROADMAP.md](ROADMAP.md) for self-hosting).
- **Both tools stay standalone pages.** `index.html` and `romaji.html` each work when opened directly from disk.
- **Unknown input passes through.** A character with no mapping is left as it is and counted, never dropped or replaced with a guess.

## Code

- **Module boundaries.** Engines (`layouts.js`, `kana-data.js`, `kana.js`) are pure: no DOM, no storage, no timers. UI files (`script.js`, `typewriter.js`, `custom-select.js`, `theme.js`, the inline script in `romaji.html`) call the engines and own all interaction. Shared UI goes in a shared file, not copied into both pages.
- **Script order matters** because there are no modules: data, engine, `theme.js`, `custom-select.js` (index only), `typewriter.js`, then the page script. A new file gets a `<script>` tag in that order on every page that uses it.
- **The hidden `<select>` is the source of truth** for the layout pickers. Code reads `select.value` and listens for `change`; after setting a value from code, call `select._sync()`.
- **Storage is optional.** Every `localStorage` read and write is wrapped in `try`/`catch`, and the page works with storage blocked. Keys in use: `mode` (`light` | `dark`, absent = System) and `paper` (absent = Parchment). The legacy `theme` key is migrated and removed; never write it again.
- **Style.** Two-space indent, double quotes, semicolons, `const`/`let`, no frameworks or polyfills. Comments explain *why*, not *what*. Remove dead code and duplicate CSS rules in the same change that creates them.

## Layout data

- Every layout has exactly 47 `unshifted` and 47 `shifted` characters, aligned to `SLOTS` (US key geometry).
- No character appears twice within one layout (Hebrew letter case is the documented exception). A duplicate silently breaks round trips.
- Where a key's true character is unknown, use a distinct placeholder and document it in the README's known limitations rather than guessing.
- A new layout ships with: its `LAYOUTS` entry, a `label`, a known-word case in `tests/engines.test.cjs`, a `scriptScore` range if it uses a non-Latin script, and a README line under supported layouts.

## Kana data

- Every `KANA_TABLE` entry carries `hira`, `kata` and the `vowel` it ends on (the long-vowel rule needs it).
- Spelling exceptions that no phonetic rule can derive (こんにちは, こんばんは) are whole-word overrides in `kana.js`, listed in the page notes and README.

## Interface

[DESIGN.md](DESIGN.md) is the authority for how things look. These are the rules that keep it true:

- **Tokens only.** Colours come from the 11 role variables (`--bg`, `--surface`, `--key`, `--ink`, `--muted`, `--line`, `--line-strong`, `--accent`, `--accent-ink`, `--warn`, `--shadow`). The only hard-coded colours allowed are the swatch values in `theme.js` and `icons/favicon.svg`, which must match `style.css`.
- **Papers come in pairs.** A new paper defines all 11 roles for light *and* dark, gets a paper/document name, and is added to `PAPERS` in `theme.js`, the pre-paint script on both pages, DESIGN.md and PRODUCT.md.
- **Contrast.** In every paper × mode: body text and labels at least 4.5:1, key and kana legends on used and most-used keys at least 4.5:1, and the accent against `--surface` at least 3:1.
- **One accent.** The accent marks only live state: used keys, the caret, focus, the primary action (Copy), selection and the current choice. It is never decoration.
- **No native form chrome.** Pickers are `custom-select.js` listboxes, choices are styled radios; every control keeps its native semantics underneath.
- **Icons** are inline SVG with one stroke width (1.75), never emoji or Unicode stand-ins.
- **Touch targets** are at least 44 px tall at phone widths.
- **Motion** uses the shared ease-out curve, starts from visible content, and is fully disabled under `prefers-reduced-motion` with nothing left hidden (delays zeroed, one-shot classes skipped). Typing animation stays under about 0.7 s however long the text is.
- **Layouts that ship:** 390 px phone, 820 px tablet and 1280–1440 px desktop, with no horizontal scrolling at any of them.

## Accessibility

- Every control has an accessible name; labels stay attached to the control they describe.
- Everything works by keyboard: Tab order follows the page, pickers support arrows, Home/End, Enter, Escape and type-ahead, and Escape returns focus to the control that opened a popup.
- Focus is always visible (2 px accent ring).
- Status changes that matter (copied, no match, direction swapped) are announced through the polite live region.
- Non-Latin output is marked with `lang` where the language is known (`lang="ja"` on kana output).

## Copy

- Use the product's terms: **Typed as / Should have been**, **Layout Fix**, **Romaji → Kana**, **key map**, **kana chart**, **Display settings**, **Mode**, **Paper**.
- Controls name their action ("Copy", "Swap layouts", "Auto-detect direction"). Messages name the problem and the way forward.
- Make no claims the engines cannot back (see Product invariants).

## Definition of done

A change is finished when all of these hold:

1. **Engine tests pass:** `node --test tests/*.test.cjs` (also run by the workspace's **Test: all projects** task).
2. **Pages load cleanly** in the workspace browser smoke test (**Browser: smoke test web apps**): no console errors on either page.
3. **Checked in Chromium and WebKit** at 390, 820 and 1440 px for anything visual or interactive. WebKit matters because the main user browses in Safari.
4. **Design check:** `impeccable detect --json index.html romaji.html style.css` reports nothing, or each remaining finding is a documented exception.
5. **Docs match the code:** README, PRODUCT.md, DESIGN.md and this file are updated in the same change when behaviour, design tokens or rules change.
6. **Project graph refreshed** with the workspace's `scripts/refresh-graph.sh --changed`.
7. **Commit message** is imperative, says what changed and why, and keeps unrelated work out.
