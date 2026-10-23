<div align="center">

# Layout Fix

Two small, dependency-free browser tools for a keyboard gone wrong.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![No build step](https://img.shields.io/badge/build%20step-none-brightgreen)
![Pure JS](https://img.shields.io/badge/dependencies-zero-blue)

**[https://unknown-x0.github.io/OopsWrongLayout/](https://unknown-x0.github.io/OopsWrongLayout/)**

</div>

---

## What's in here

| Tool              | File          | What it does                                             |
| ----------------- | ------------- | -------------------------------------------------------- |
| **Layout Fix**    | `index.html`  | Undoes text typed in the wrong keyboard layout           |
| **Romaji → Kana** | `romaji.html` | Converts typed Japanese romaji into hiragana or katakana |

Both are static pages — open them directly in a browser, or serve the folder with anything. No npm install, no bundler, no framework.

---

## Layout Fix

Typed a whole sentence in the wrong keyboard layout and only noticed at the end? Paste the garbled result, tell it which two layouts were involved, and it reconstructs what you meant to type.

**How it works:** every layout table maps _physical key positions_ to characters. Converting a piece of text just means: for each character, find the physical key that produced it in the layout you were typing in, then read off what that same key produces in the layout you meant to use. It's the same trick tools like Punto Switcher use — no dictionaries, no guessing, purely mechanical and reversible.

```
"l;ylfu"  typed as US-QWERTY, meant as Thai   →  "สวัสดี"
"ghbdtn"  typed as US-QWERTY, meant as Russian →  "привет"
```

### Supported layouts

English (US QWERTY) · Thai (Kedmanee) · German (QWERTZ) · Russian (ЙЦУКЕН) · Ukrainian (ЙЦУКЕН) · French (AZERTY) · Spanish (QWERTY ES) · Hebrew

### Using it

1. Paste the garbled text into the left box.
2. Set **Typed as** and **Should have been** to the two layouts involved.
3. Click **Convert** — or **Auto-detect direction** if you're not sure which way round they go.
4. **Copy result**.

### Adding a layout

Every layout in `layouts.js` is two 47-character arrays — `unshifted` and `shifted` — lined up against the shared `SLOTS` physical-key order. Drop a new entry into the `LAYOUTS` object with your layout's characters in the same 47 positions and it shows up in both dropdowns automatically. No other code changes needed.

---

## Romaji → Kana

Type Japanese the way you would on any English keyboard; get proper kana back.

```
konnichiwa  →  こんにちは
kitte       →  きって      (doubled consonant → small っ)
gen'in      →  げんいん    (apostrophe forces an explicit ん)
kyuuto      →  キュート    (katakana contracts repeated vowels into ー)
```

Handles the standard Hepburn conventions: doubled consonants → small tsu, ん before a consonant or at word-end, `nn` / `n'` for an explicit ん before a vowel, and — in katakana only — repeated vowels contract into the long-vowel mark.

**Why no Mandarin pinyin?** Kana conversion works because romaji → kana is a direct, one-to-one mapping. Pinyin isn't: a single syllable maps to several unrelated Chinese characters (`ma` → 妈 / 麻 / 马 / 骂, depending on tone and meaning), so a real converter needs a dictionary and a candidate picker — a genuinely different kind of tool, not an extension of this one.

---

## Project structure

```
index.html      Layout Fix page
romaji.html     Romaji → Kana page
style.css       shared styling + light/dark/system theme (both pages)
theme.js        theme toggle logic (both pages)
layouts.js      keyboard layout tables + conversion engine
script.js       Layout Fix UI wiring
kana-data.js    Hepburn romaji → kana lookup table
kana.js         romaji → kana conversion engine
LICENSE         MIT
NOTICE.md       third-party font licensing
```

---

## Testing

Both engines are covered by a self-checking test suite (not included in the deployed site — run these yourself with Node):

- **Layout Fix:** 117 tests — full-charset round-trips for every layout, known-word spot checks, randomized round-trips, and a structural scan for duplicate table entries (the one class of bug that silently breaks a round-trip).
- **Romaji → Kana:** 342 tests — every table entry verified in isolation, ~30 hand-checked real words, 20 katakana loanwords exercising the long-vowel rule, and mechanical sokuon/ん-rule coverage across all consonants.

If you change a mapping table, re-run the equivalent checks before opening a PR.

---

## Known limitations

- **Rare shifted symbols** (Thai tone-mark positions, German/French AltGr characters, Spanish accent/dead-keys) were built from reference material rather than verified on physical hardware and may be slightly off. A few obscure Thai shift-row slots use placeholder Thai punctuation (๛ ๏ ๚ ๎) where the true value wasn't reliably known — this keeps every key round-trip-safe instead of risking silent data loss on a guess.
- **Hebrew has no letter case.** Converting mixed-case Latin text through Hebrew and back loses capitalization (`Hello` and `hello` land on the same key) — this matches a real Hebrew keyboard, not a bug. The same applies to a few US shift-symbols (`:` `"` `<` `>`) whose physical keys are reassigned to Hebrew letters.
- **A couple of very common Japanese words** (こんにちは, こんばんは) are spelled with は rather than phonetic わ; these are handled as explicit whole-word exceptions since no phonetic rule can derive them.

Spot something off? Open an issue or PR.

---

## License

MIT — see [LICENSE](LICENSE). Third-party font licensing is in [NOTICE.md](NOTICE.md).

## Module map

Already separated by responsibility; keep these boundaries:

- `layouts.js`: keyboard layout data.
- `script.js`: layout conversion and main-page interactions.
- `kana-data.js`, `kana.js`: kana data and conversion.
- `theme.js`: theme controls.
- `index.html`, `romaji.html`: separate page layouts.
- `style.css`: shared appearance.
