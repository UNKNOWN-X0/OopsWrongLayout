# Roadmap

Where Oops/Wrong Layout is heading. These are directions, not promises: each item says why it matters and what "done" looks like, and every item has to meet [STANDARDS.md](STANDARDS.md) and the product invariants in it. Items are ordered by value for the effort.

## Direction

Keep both tools small, instant and honest about how they work, and make the mechanism visible: the key map and kana chart are the product's identity, so new work should show *why* a character became another, not just the result. Stay static and private: no accounts, no servers, no tracking.

## Now: foundations

**Run the engine tests on every push.** `tests/engines.test.cjs` exists and passes locally; GitHub only runs a Jekyll build today. Add a workflow step that runs `node --test tests/*.test.cjs` so a broken mapping table cannot reach the live site. *Done when* a pull request with a duplicated key fails CI.

**Grow the engine tests back to full coverage.** The README once described 117 layout and 342 kana checks that never made it into the repository. Rebuild them in `tests/`: every kana table entry in isolation, every layout's known words, randomized round trips, and the katakana long-vowel cases. *Done when* every rule in the page notes has a test.

**Self-host the fonts.** Public Sans, Martian Mono and the Noto faces load from Google Fonts, the project's only external request. Shipping the font files (subset to the characters used) makes the pages fully offline and removes a third-party call. *Done when* the network panel shows no request outside the site and NOTICE.md lists the bundled files.

## Next: make the tools better at their job

**Shift layer on the key map.** Today the map shows unshifted legends only, so shifted characters (capitals, Thai tone marks on the shift row) light the right key but show the wrong legend. Show the shifted legend when the text used it, or add a Shift toggle. *Done when* typing `L` lights the key with its shifted target.

**Shareable settings in the URL.** `index.html?from=us&to=thai` opens with that pair chosen, so a link can say "this is how to fix it". Text is never put in the URL (privacy invariant). *Done when* both pickers restore from the query string and update it on change.

**Install and use offline.** The keycap icon set is ready; add a web app manifest and a small service worker so the tools install on phones and work without a connection. *Done when* the site passes the browser's install check and loads in airplane mode.

**Keyboard shortcuts.** ⌘/Ctrl+Enter to copy the result, ⌘/Ctrl+Shift+S to swap layouts, shown in a small hint. *Done when* every shortcut is announced and listed in the page notes.

**Sentence-aware kana exceptions.** `konnichiwa` becomes こんにちは only when it is the whole input; inside a sentence it is spelled phonetically. Applying the whole-word exceptions per word fixes that without changing the Hepburn rules. *Done when* `konnichiwa sensei` gives こんにちは せんせい.

## Later: reach more people

**More layouts.** Greek, Arabic, Persian, Hindi (InScript), Dvorak and Colemak are direct position maps and fit the existing 47-key model. Korean (2-set) is different: it needs syllable composition and should be scoped as its own engine before it is promised.

**Mora strip on the Romaji page.** The direction contract planned a strip showing each romaji chunk above its kana. It needs `kana.js` to expose its segmentation (a list of `[romaji, kana]` pairs) instead of only the final string. *Done when* the strip and the output always agree, including sokuon and ん.

**Interface in Thai and Japanese.** The people most likely to mistype are bilingual; offering the interface in Thai and Japanese (labels, notes, messages) follows from that. *Done when* the language follows the browser with a manual override in Display settings.

**Per-line auto-detect.** Detect direction per line or per word for mixed text where only part was typed in the wrong layout. This is the first feature that guesses, so it must show what it decided and let the user undo it.

## Not planned

- **Pinyin → hanzi** and any dictionary-based conversion: it needs a dictionary and a candidate picker, a different kind of tool (see the Romaji page notes).
- **Accounts, cloud sync or saving history:** they break the privacy invariant for little gain.
- **A framework rewrite or build step:** the zero-dependency, open-from-disk promise is part of the product.
