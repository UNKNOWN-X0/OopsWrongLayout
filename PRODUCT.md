# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who have text typed under the wrong keyboard layout and want to recover it, and people who type Japanese with romaji and want kana output.

## Product Purpose

Provide two small browser tools for converting text between keyboard layouts and converting romaji to hiragana or katakana. Success means the user can enter text, get the intended conversion, and copy the result quickly.

## Positioning

Layout Fix remaps physical key positions between keyboard layouts, so conversion is mechanical, reversible where the layouts allow, and does not depend on a dictionary or language guess. Romaji → Kana uses explicit Hepburn mappings and spelling rules.

## Operating Context

Users visit either standalone page in a browser, enter or paste text, choose settings where needed, convert, and copy the result.

## Capabilities and Constraints

- Two static pages: `index.html` (keyboard layout conversion) and `romaji.html` (romaji to kana).
- Vanilla HTML, CSS, and JavaScript; no build step or runtime dependencies.
- Existing conversion engines, supported layouts, and conversion behavior are product functionality to preserve.
- Layout Fix supports English US QWERTY, Thai Kedmanee, German QWERTZ, Russian, Ukrainian, French AZERTY, Spanish, and Hebrew.
- Display settings separate Mode (System, Light, Dark) from Paper, the colouring: Parchment (default), Carbon Copy, Ledger Green, Blueprint, and Kraft, each with a light and a dark version.

## Evidence on Hand

The working conversion engines and UI are in `layouts.js`, `script.js`, `kana-data.js`, and `kana.js`; `tests/engines.test.cjs` checks the engines. The project README documents usage and known mapping limitations. Do not invent claims beyond those sources.

## Product Principles

- Keep conversion immediate and easy to understand.
- Preserve user text and make the result easy to copy.
- Explain the mechanical conversion clearly without implying language-aware correction.
- Keep both tools accessible as lightweight standalone web pages.
