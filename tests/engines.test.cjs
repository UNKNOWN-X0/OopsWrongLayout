// Engine checks for both tools. Run: node --test tests/*.test.cjs
// The engines are plain browser scripts (no modules), so each test file loads
// them into one shared sandbox exactly as the pages do with <script> tags.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const sandbox = {};
vm.createContext(sandbox);
for (const file of ["layouts.js", "kana-data.js", "kana.js"]) {
  // const/function declarations stay in the script scope; expose what we need.
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, { filename: file });
}
const { LAYOUTS, SLOTS, convertText, scriptScore, romajiToKana } = vm.runInContext(
  "({ LAYOUTS, SLOTS, convertText, scriptScore, romajiToKana })",
  sandbox,
);
const keys = Object.keys(LAYOUTS);

test("every layout covers all 47 physical keys, unshifted and shifted", () => {
  assert.equal(SLOTS.length, 47);
  for (const key of keys) {
    assert.equal(LAYOUTS[key].unshifted.length, 47, `${key} unshifted`);
    assert.equal(LAYOUTS[key].shifted.length, 47, `${key} shifted`);
  }
});

test("no layout maps two keys to the same character (that breaks round trips)", () => {
  for (const key of keys) {
    const all = [...LAYOUTS[key].unshifted, ...LAYOUTS[key].shifted];
    const seen = new Map();
    for (const [i, ch] of all.entries()) {
      // Letter case collapsing onto one key (Hebrew) is a documented exception.
      if (seen.has(ch) && !(key === "hebrew")) {
        assert.fail(`${key}: "${ch}" appears at positions ${seen.get(ch)} and ${i}`);
      }
      seen.set(ch, i);
    }
  }
});

test("each layout's own characters survive a round trip through every other layout", () => {
  for (const from of keys) {
    const text = [...LAYOUTS[from].unshifted, ...LAYOUTS[from].shifted].join("");
    for (const to of keys) {
      if (from === to || from === "hebrew" || to === "hebrew") continue; // Hebrew: see README limits
      const there = convertText(text, from, to).text;
      const back = convertText(there, to, from).text;
      assert.equal(back, text, `${from} → ${to} → ${from}`);
    }
  }
});

test("known words convert as documented in the README", () => {
  assert.equal(convertText("l;ylfu", "us", "thai").text, "สวัสดี");
  assert.equal(convertText("ghbdtn", "us", "russian").text, "привет");
  assert.equal(convertText("สวัสดี", "thai", "us").text, "l;ylfu");
});

test("digits convert by key position; spaces, newlines and off-keyboard symbols pass through", () => {
  const { text, misses } = convertText("l;ylfu 123 ✓\n", "us", "thai");
  assert.equal(text, "สวัสดี ๅ/- ✓\n");
  assert.equal(misses, 0);
});

test("auto-detect scoring recognises the script of non-Latin layouts", () => {
  assert.equal(scriptScore("สวัสดี", "thai"), 6);
  assert.equal(scriptScore("привет", "russian"), 6);
  assert.equal(scriptScore("hello", "thai"), 0);
});

test("romaji → kana follows the Hepburn rules the page documents", () => {
  const cases = [
    ["konnichiwa", "hiragana", "こんにちは"],
    ["konbanwa", "hiragana", "こんばんは"],
    ["kitte", "hiragana", "きって"],
    ["gen'in", "hiragana", "げんいん"],
    ["kyuu", "hiragana", "きゅう"],
    ["kyuuto", "katakana", "キュート"],
    ["shinbun", "hiragana", "しんぶん"],
    ["arigatou", "hiragana", "ありがとう"],
  ];
  for (const [romaji, type, kana] of cases) {
    assert.equal(romajiToKana(romaji, type), kana, `${romaji} (${type})`);
  }
});

test("letters that form no syllable are left as Latin", () => {
  assert.equal(romajiToKana("qx", "hiragana"), "qx");
});
