// typewriter.js — the result pane shared by both tools: text is "typed out"
// grapheme by grapheme (with a callback per stroke so the page can strike the
// matching key), plus the Copy button and its "Copied" slip.

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const graphemeSegmenter =
  typeof Intl !== "undefined" && Intl.Segmenter
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

function splitGraphemes(text) {
  return graphemeSegmenter
    ? Array.from(graphemeSegmenter.segment(text), (s) => s.segment)
    : Array.from(text);
}

// outEl: the read-only result box; it holds a text span, a caret and a placeholder.
function createTypewriter(outEl, { placeholder = "", onStroke } = {}) {
  const textSpan = document.createElement("span");
  const caret = document.createElement("span");
  caret.className = "caret";
  caret.setAttribute("aria-hidden", "true");
  const ph = document.createElement("span");
  ph.className = "placeholder";
  ph.textContent = placeholder;
  outEl.replaceChildren(textSpan, caret, ph);

  let value = "";
  let frame = 0;

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    outEl.classList.remove("typing");
  }

  function show(text) {
    textSpan.textContent = text;
    ph.hidden = text.length > 0;
  }

  // animate: type the text out; otherwise show it at once.
  // onStroke(cpStart, cpEnd) gets the code-point range of each typed grapheme,
  // so a caller whose output maps 1:1 onto its input can find the source key.
  function set(text, { animate = false } = {}) {
    stop();
    value = text;
    if (!animate || reducedMotion.matches || !text) {
      show(text);
      return;
    }
    const parts = splitGraphemes(text);
    // About 20 ms a character, but never longer than ~0.7 s in total.
    const perFrame = Math.max(1, Math.ceil(parts.length / 42));
    let i = 0;
    let cp = 0;
    let shown = "";
    show("");
    ph.hidden = true;
    outEl.classList.add("typing");
    const tick = () => {
      for (let k = 0; k < perFrame && i < parts.length; k++, i++) {
        const g = parts[i];
        const len = Array.from(g).length;
        shown += g;
        onStroke?.(cp, cp + len);
        cp += len;
      }
      textSpan.textContent = shown;
      outEl.scrollTop = outEl.scrollHeight;
      if (i < parts.length) frame = requestAnimationFrame(tick);
      else stop();
    };
    frame = requestAnimationFrame(tick);
  }

  return { set, get value() { return value; } };
}

// Copy with a "Copied" slip that slides out of the button.
function wireCopy(button, getText, statusEl) {
  const slip = button.parentElement.querySelector(".slip");
  button.addEventListener("click", async () => {
    const text = getText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      button.classList.remove("done");
      void button.offsetWidth;
      button.classList.add("done");
      clearTimeout(button._done);
      button._done = setTimeout(() => button.classList.remove("done"), 1400);
      if (slip) {
        slip.classList.remove("out");
        void slip.offsetWidth; // restart the animation on repeat clicks
        slip.classList.add("out");
      }
      if (statusEl) statusEl.textContent = "Copied to clipboard.";
    } catch {
      if (statusEl)
        statusEl.textContent =
          "Couldn't copy automatically. Select the result and copy it by hand.";
    }
  });
}
