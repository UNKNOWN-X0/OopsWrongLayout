// script.js — Layout Fix page wiring: layout pickers, live conversion, the
// keyboard key map and the typed-out result. Conversion itself lives in layouts.js.
const els = {
  input: document.getElementById("input"),
  output: document.getElementById("output"),
  fromSelect: document.getElementById("fromLayout"),
  toSelect: document.getElementById("toLayout"),
  swapBtn: document.getElementById("swapBtn"),
  autoBtn: document.getElementById("autoBtn"),
  copyBtn: document.getElementById("copyBtn"),
  inCount: document.getElementById("inCount"),
  outCount: document.getElementById("outCount"),
  status: document.getElementById("status"),
  announce: document.getElementById("announce"),
  keyboard: document.getElementById("keyboard"),
  panes: document.querySelector(".panes"),
  mapPair: document.getElementById("mapPair"),
};

// Physical rows of the shared SLOTS order (see layouts.js).
// Physical rows of the shared SLOTS order (see layouts.js): [start, split, end].
// The split is where a phone-width screen breaks the board into two halves.
const KB_ROWS = [
  [0, 7, 13],
  [13, 19, 26],
  [26, 31, 37],
  [37, 42, 47],
];

let caps = []; // slot index -> cap element
let sourceSlots = []; // code-point index of the input -> slot index (or -1)

const writer = createTypewriter(els.output, {
  placeholder: "The fixed text appears here as you type.",
  onStroke: (start, end) => {
    for (let i = start; i < end; i++) strike(sourceSlots[i]);
  },
});

function populateSelects() {
  for (const [key, layout] of Object.entries(LAYOUTS)) {
    els.fromSelect.add(new Option(layout.label, key));
    els.toSelect.add(new Option(layout.label, key));
  }
  els.fromSelect.value = "thai";
  els.toSelect.value = "us";
}

// A combining mark (Thai vowel and tone marks) is shown on a dotted circle.
const legend = (ch) => (ch && /\p{M}/u.test(ch) ? "◌" + ch : ch || "");

function renderKeyboard() {
  const from = LAYOUTS[els.fromSelect.value];
  const to = LAYOUTS[els.toSelect.value];
  caps = [];
  els.keyboard.replaceChildren(
    ...KB_ROWS.map(([a, split, b], r) => {
      const row = document.createElement("div");
      row.className = "kb-row";
      const halves = [document.createElement("div"), document.createElement("div")];
      halves[0].className = "seg l";
      halves[1].className = "seg r";
      row.append(...halves);
      for (let i = a; i < b; i++) {
        const cap = document.createElement("span");
        cap.className = "cap";
        cap.style.setProperty("--i", i - a + r); // stagger for the legend roll
        cap.innerHTML = '<span class="from"></span><span class="to"></span><span class="n"></span>';
        cap.querySelector(".from").textContent = legend(from.unshifted[i]);
        cap.querySelector(".to").textContent = legend(to.unshifted[i]);
        caps[i] = cap;
        halves[i < split ? 0 : 1].append(cap);
      }
      return row;
    }),
  );
  els.mapPair.textContent = `${shortName(from)} → ${shortName(to)}`;
  // The example matches the layout picked under "Typed as".
  els.input.placeholder = `Paste or type the garbled text, e.g. ${from.unshifted.slice(26, 31).join("")}`;
}

const shortName = (layout) => layout.label.replace(/\s*\(.*\)/, "");

// Restart a one-shot CSS animation class on an element.
const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
function replay(el, cls, ms) {
  if (calm.matches) return; // reduced motion: no one-shot effects at all
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
  clearTimeout(el[`_${cls}`]);
  el[`_${cls}`] = setTimeout(() => el.classList.remove(cls), ms);
}

function strike(slot) {
  const cap = caps[slot];
  if (!cap) return;
  cap.classList.remove("strike");
  void cap.offsetWidth; // restart the animation
  cap.classList.add("strike");
}

function updateKeyHeat(counts) {
  const max = Math.max(0, ...counts);
  caps.forEach((cap, i) => {
    const n = counts[i] || 0;
    // Used keys start at a light tint; the most-used key is solid.
    // "Most used" only when some key really is used more than another.
    const heat = n === 0 ? 0 : n === max && max > 1 ? 1 : 0.12 + 0.28 * (n / max);
    cap.style.setProperty("--heat", heat);
    cap.classList.toggle("used", n > 0);
    cap.classList.toggle("hot", heat === 1);
    cap.querySelector(".n").textContent = n > 1 ? n : "";
  });
}

const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

function setStatus(parts) {
  els.status.replaceChildren(
    ...parts.map(([cls, html]) => {
      const span = document.createElement("span");
      span.className = cls;
      span.innerHTML = html;
      return span;
    }),
  );
}

// animate: type the result out (paste, swap, layout change); typing a single
// character updates instantly and strikes just that key.
function doConvert({ animate = false } = {}) {
  const text = els.input.value;
  const fromKey = els.fromSelect.value;
  const toKey = els.toSelect.value;
  const from = LAYOUTS[fromKey];

  els.inCount.textContent = plural(Array.from(text).length, "char");

  const counts = new Array(SLOTS.length).fill(0);
  sourceSlots = Array.from(text, (ch) => {
    const hit = from.reverse.get(ch);
    if (hit) counts[hit.slotIndex]++;
    return hit ? hit.slotIndex : -1;
  });

  let result = text;
  let misses = 0;
  if (fromKey !== toKey) ({ text: result, misses } = convertText(text, fromKey, toKey));

  writer.set(result, { animate });
  if (animate && text) replay(els.status, "tick", 500);
  els.outCount.textContent = plural(Array.from(result).length, "char");
  els.copyBtn.disabled = !result;
  updateKeyHeat(counts);

  if (!text) {
    setStatus([["message", "Paste or type the garbled text in box A."]]);
  } else if (fromKey === toKey) {
    setStatus([["message", "Both layouts are the same, so there is nothing to convert."]]);
  } else {
    const mapped = sourceSlots.filter((s) => s >= 0).length - misses;
    const struck = counts.filter((n) => n > 0).length;
    setStatus([
      ["lead", `Mapped <b>${mapped}</b>`],
      [misses ? "warn" : "", `No match <b>${misses}</b>`],
      ["", `Keys struck <b>${struck}</b>`],
      ["rule", "Same physical key → same character"],
    ]);
    if (misses)
      els.announce.textContent = `${plural(misses, "character")} had no mapping and ${misses === 1 ? "was" : "were"} left as-is.`;
  }
}

function onLayoutChange() {
  renderKeyboard();
  replay(els.keyboard, "roll", 900);
  doConvert({ animate: true });
}

function swapLayouts() {
  const f = els.fromSelect.value;
  els.fromSelect.value = els.toSelect.value;
  els.toSelect.value = f;
  els.fromSelect._sync?.();
  els.toSelect._sync?.();
  replay(els.panes, "swapping", 600);
  // Also swap the text, so swap then convert round-trips naturally.
  if (writer.value) els.input.value = writer.value;
  onLayoutChange();
}

function autoDetect() {
  const text = els.input.value;
  if (!text.trim()) return;
  // If the text already looks more like the "to" layout's script than the
  // "from" layout's, the layouts are probably backwards: swap them.
  const looksLikeFrom = scriptScore(text, els.fromSelect.value);
  const looksLikeTo = scriptScore(text, els.toSelect.value);
  if (looksLikeTo > looksLikeFrom) {
    swapLayouts();
    for (const s of [els.fromSelect, els.toSelect]) replay(s.closest(".select"), "flash", 900);
    els.announce.textContent = "Layouts swapped: the text looked like it was typed the other way round.";
  } else {
    doConvert({ animate: true });
    els.announce.textContent = "Direction kept: the layouts already look right.";
  }
}

populateSelects();
// Each layout previews its home-row keys (a s d f g) in the picker.
const homeRow = (key) => LAYOUTS[key].unshifted.slice(26, 31).join("");
enhanceSelect(els.fromSelect, { preview: homeRow });
enhanceSelect(els.toSelect, { preview: homeRow });
renderKeyboard();
doConvert();

els.input.addEventListener("input", (e) => {
  const single = e.inputType === "insertText" && e.data && Array.from(e.data).length === 1;
  doConvert({ animate: !single && e.inputType !== "deleteContentBackward" && e.inputType !== "deleteContentForward" });
  if (single) {
    const pos = Array.from(els.input.value.slice(0, els.input.selectionStart)).length - 1;
    strike(sourceSlots[pos]);
  }
});
els.fromSelect.addEventListener("change", onLayoutChange);
els.toSelect.addEventListener("change", onLayoutChange);
els.swapBtn.addEventListener("click", swapLayouts);
els.autoBtn.addEventListener("click", autoDetect);
wireCopy(els.copyBtn, () => writer.value, els.announce);
