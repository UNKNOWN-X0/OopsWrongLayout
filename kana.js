// kana.js
// Converts romaji (Latin-letter Japanese input) into hiragana or katakana,
// following standard Hepburn typing conventions:
//   - doubled consonant -> small tsu (kitte -> きって)
//   - "n" before a consonant, or at the end of the word -> ん
//   - "nn" -> ん + continue (konnichiwa -> こんにちは)
//   - "n'" -> ん explicitly (gen'in -> げんいん)
//   - repeated vowel: hiragana spells it out (kyuu -> きゅう),
//     katakana contracts it to a long-vowel mark (kyuu -> キュー)

function romajiToKana(input, kanaType) {
  const key = kanaType === "katakana" ? "kata" : "hira";

  // A few extremely common words are spelled with は/へ (historical particle
  // spelling) but typed and pronounced "wa"/"e". These can't be derived from
  // phonetics alone, so they're handled as whole-word overrides.
  const WORD_EXCEPTIONS = {
    konnichiwa: { hira: "こんにちは", kata: "コンニチハ" },
    konbanwa: { hira: "こんばんは", kata: "コンバンハ" },
  };
  const lowerWhole = input.toLowerCase();
  if (WORD_EXCEPTIONS[lowerWhole]) {
    return WORD_EXCEPTIONS[lowerWhole][key];
  }

  let out = "";
  let lastVowel = null;
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    if (!/[a-zA-Z']/.test(ch)) {
      out += ch;
      lastVowel = null;
      i++;
      continue;
    }

    const lower = input.slice(i).toLowerCase();

    // sokuon: doubled consonant (not n) -> small tsu, consume one letter
    const c0 = lower[0],
      c1 = lower[1];
    if (c1 && c0 === c1 && c0 !== "n" && SOKUON_CONSONANTS.has(c0)) {
      out += kanaType === "katakana" ? "ッ" : "っ";
      lastVowel = null;
      i += 1;
      continue;
    }

    // n handling
    if (c0 === "n") {
      if (lower[1] === "'") {
        out += kanaType === "katakana" ? "ン" : "ん";
        lastVowel = null;
        i += 2;
        continue;
      }
      if (lower[1] === "n") {
        out += kanaType === "katakana" ? "ン" : "ん";
        lastVowel = null;
        i += 1;
        continue;
      }
      const nextIsVowelOrY = lower[1] && /[aiueoy]/.test(lower[1]);
      if (!nextIsVowelOrY) {
        out += kanaType === "katakana" ? "ン" : "ん";
        lastVowel = null;
        i += 1;
        continue;
      }
      // else fall through to normal table lookup (na, ni, nya, ...)
    }

    // greedy longest-match against the mora table (3, then 2, then 1 chars)
    let matched = false;
    for (const len of [3, 2, 1]) {
      if (lower.length < len) continue; // don't let a short trailing slice masquerade as a longer match
      const chunk = lower.slice(0, len);
      const entry = KANA_TABLE[chunk];
      if (!entry) continue;

      // bare-vowel repeat in katakana -> long-vowel mark instead of the vowel kana
      if (
        kanaType === "katakana" &&
        len === 1 &&
        /[aiueo]/.test(chunk) &&
        chunk === lastVowel
      ) {
        out += "ー";
      } else {
        out += entry[key];
      }
      lastVowel = entry.vowel;
      i += len;
      matched = true;
      break;
    }

    if (!matched) {
      out += ch; // unrecognized letter, e.g. stray consonant with no vowel
      lastVowel = null;
      i++;
    }
  }

  return out;
}
