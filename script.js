// script.js
const els = {
  input: document.getElementById("input"),
  output: document.getElementById("output"),
  fromSelect: document.getElementById("fromLayout"),
  toSelect: document.getElementById("toLayout"),
  swapBtn: document.getElementById("swapBtn"),
  convertBtn: document.getElementById("convertBtn"),
  autoBtn: document.getElementById("autoBtn"),
  copyBtn: document.getElementById("copyBtn"),
  meta: document.getElementById("meta"),
};

function populateSelects() {
  const keys = Object.keys(LAYOUTS);
  for (const key of keys) {
    const opt1 = document.createElement("option");
    opt1.value = key;
    opt1.textContent = LAYOUTS[key].label;
    els.fromSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = key;
    opt2.textContent = LAYOUTS[key].label;
    els.toSelect.appendChild(opt2);
  }
  els.fromSelect.value = "thai";
  els.toSelect.value = "us";
}

function doConvert() {
  const text = els.input.value;
  const fromKey = els.fromSelect.value;
  const toKey = els.toSelect.value;

  if (fromKey === toKey) {
    els.output.value = text;
    setMeta("Source and target layouts are the same — nothing to convert.");
    return;
  }

  const { text: result, misses } = convertText(text, fromKey, toKey);
  els.output.value = result;

  if (!text) {
    setMeta("");
  } else if (misses > 0) {
    setMeta(
      `Converted. ${misses} character${misses === 1 ? "" : "s"} had no mapping and were left as-is.`,
    );
  } else {
    setMeta("Converted.");
  }
}

function setMeta(msg) {
  els.meta.textContent = msg;
}

function swapLayouts() {
  const f = els.fromSelect.value;
  const t = els.toSelect.value;
  els.fromSelect.value = t;
  els.toSelect.value = f;
  // also swap text so a swap+convert round-trips naturally
  const inText = els.input.value;
  els.input.value = els.output.value || inText;
  doConvert();
}

function autoDetect() {
  const text = els.input.value;
  if (!text.trim()) return;

  const fromKey = els.fromSelect.value;
  const toKey = els.toSelect.value;

  const scoreAsFrom = scriptScore(
    text,
    fromKey === "thai" || fromKey === "russian" ? fromKey : toKey,
  );
  // Simplest reliable heuristic: if the typed text already looks like it belongs
  // to the "to" layout's script more than the "from" layout's script, the user
  // probably has from/to backwards — swap them.
  const looksLikeFrom = scriptScore(text, fromKey);
  const looksLikeTo = scriptScore(text, toKey);

  if (looksLikeTo > looksLikeFrom) {
    swapLayouts();
  } else {
    doConvert();
  }
}

function copyOutput() {
  if (!els.output.value) return;
  navigator.clipboard.writeText(els.output.value).then(() => {
    const original = els.copyBtn.textContent;
    els.copyBtn.textContent = "Copied";
    setTimeout(() => {
      els.copyBtn.textContent = original;
    }, 1200);
  });
}

populateSelects();
els.convertBtn.addEventListener("click", doConvert);
els.autoBtn.addEventListener("click", autoDetect);
els.swapBtn.addEventListener("click", swapLayouts);
els.copyBtn.addEventListener("click", copyOutput);
els.input.addEventListener("input", doConvert);
els.fromSelect.addEventListener("change", doConvert);
els.toSelect.addEventListener("change", doConvert);
