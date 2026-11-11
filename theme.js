// theme.js — the Display settings panel shared by both pages.
// Two independent choices, each stored in localStorage:
//   mode:  'light' | 'dark' | absent = System (follow the OS)
//   paper: one of PAPERS (the colouring); absent = Parchment
// The page reads them as <html data-paper="…" data-scheme="light|dark">.
const PAPERS = {
  parchment: { label: "Parchment", note: "Warm sheet, ink blue", light: ["#f1e7d0", "#2f4f9a"], dark: ["#1b1611", "#93abee"] },
  carbon: { label: "Carbon Copy", note: "Cool white, indigo carbon", light: ["#eceef3", "#3d3bd6"], dark: ["#111318", "#a3a1ff"] },
  ledger: { label: "Ledger Green", note: "Ruled green, jade ink", light: ["#e8eeea", "#0b7258"], dark: ["#0e1915", "#55c7a4"] },
  blueprint: { label: "Blueprint", note: "Drafting blue, pencil yellow", light: ["#e5edf6", "#1d5fd1"], dark: ["#0f2a52", "#f4c95d"] },
  kraft: { label: "Kraft", note: "Brown wrap, stamp teal", light: ["#e2cdaa", "#165e68"], dark: ["#1c140c", "#62bcc6"] },
};
const MODES = { system: "System", light: "Light", dark: "Dark" };
const MODE_ICONS = {
  system: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  light: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  dark: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>',
};

const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
const motionOff = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function store(key, value) {
  try {
    if (value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* storage blocked: the choice still applies for this visit */
  }
}
function load(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

// One-time migration from the single "theme" key used before.
(function migrate() {
  const old = load("theme");
  if (old == null) return;
  const paper = { parchment: "parchment", carbon: "carbon", ledger: "ledger", night: "carbon" }[old];
  const mode = { night: "dark", dark: "dark", light: "light" }[old];
  if (paper && !load("paper") && paper !== "parchment") store("paper", paper);
  if (mode && !load("mode")) store("mode", mode);
  store("theme", null);
})();

// Without storage the choices live here for this visit.
const memory = {};
const state = {
  get paper() {
    const p = load("paper") ?? memory.paper;
    return p in PAPERS ? p : "parchment";
  },
  get mode() {
    const m = load("mode") ?? memory.mode;
    return m === "light" || m === "dark" ? m : "system";
  },
};

function render() {
  const root = document.documentElement;
  const dark = state.mode === "dark" || (state.mode === "system" && darkQuery.matches);
  root.setAttribute("data-paper", state.paper);
  root.setAttribute("data-scheme", dark ? "dark" : "light");
  // Phone browser chrome takes the paper colour too.
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", getComputedStyle(root).getPropertyValue("--bg").trim());
  syncControls();
}

// Repaint with a circular wipe from the control that was used.
function repaint(origin) {
  if (!document.startViewTransition || motionOff() || !origin) return render();
  const r = origin.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const root = document.documentElement;
  root.classList.add("theme-vt");
  const t = document.startViewTransition(render);
  t.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 560, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {});
  t.finished.finally(() => root.classList.remove("theme-vt"));
}

const btn = document.getElementById("settingsBtn");
const panel = document.getElementById("settingsPanel");

function buildPanel() {
  const modeRadios = Object.entries(MODES)
    .map(
      ([v, label]) =>
        `<label><input type="radio" name="mode" value="${v}"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${MODE_ICONS[v]}</svg>${label}</label>`,
    )
    .join("");
  const paperRadios = Object.entries(PAPERS)
    .map(
      ([v, p]) => `<label class="paper">
        <input type="radio" name="paper" value="${v}">
        <span class="paper-swatch" aria-hidden="true" style="--l-bg:${p.light[0]};--l-ac:${p.light[1]};--d-bg:${p.dark[0]};--d-ac:${p.dark[1]}"><i></i><i></i></span>
        <span class="paper-text"><span class="paper-name">${p.label}</span><span class="paper-note">${p.note}</span></span>
        <svg class="icon check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>
      </label>`,
    )
    .join("");
  panel.innerHTML = `
    <div class="set-group">
      <span class="label" id="modeLabel">Mode</span>
      <div class="segmented mode-switch" role="radiogroup" aria-labelledby="modeLabel">${modeRadios}</div>
    </div>
    <div class="set-group">
      <span class="label" id="paperLabel">Paper</span>
      <div class="papers" role="radiogroup" aria-labelledby="paperLabel">${paperRadios}</div>
    </div>`;
  panel.addEventListener("change", (e) => {
    const input = e.target;
    const value = input.value;
    if (input.name === "mode") {
      memory.mode = value;
      store("mode", value === "system" ? null : value);
    }
    if (input.name === "paper") {
      memory.paper = value;
      store("paper", value === "parchment" ? null : value);
    }
    repaint(input.closest("label"));
  });
}

function syncControls() {
  if (!panel || !btn) return;
  for (const input of panel.querySelectorAll("input")) {
    input.checked = input.value === state[input.name];
  }
  const p = PAPERS[state.paper];
  btn.querySelector(".theme-name").textContent = p.label;
  btn.querySelector(".mode-icon").innerHTML = MODE_ICONS[state.mode];
  btn.setAttribute("aria-label", `Display settings: ${p.label}, ${MODES[state.mode]} mode`);
}

function openPanel() {
  panel.hidden = false;
  btn.setAttribute("aria-expanded", "true");
  (panel.querySelector('input[name="mode"]:checked') || panel.querySelector("input")).focus();
}
function closePanel(returnFocus) {
  if (panel.hidden) return;
  panel.hidden = true;
  btn.setAttribute("aria-expanded", "false");
  if (returnFocus) btn.focus();
}

if (btn && panel) {
  buildPanel();
  btn.addEventListener("click", () => (panel.hidden ? openPanel() : closePanel(false)));
  panel.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanel(true);
  });
  document.addEventListener("pointerdown", (e) => {
    if (!panel.hidden && !e.target.closest(".settings")) closePanel(false);
  });
  document.addEventListener("focusin", (e) => {
    if (!panel.hidden && !e.target.closest(".settings")) closePanel(false);
  });
}

// The OS switched light/dark while in System mode, or another tab changed a setting.
darkQuery.addEventListener("change", render);
window.addEventListener("storage", (e) => {
  if (e.key === "paper" || e.key === "mode") render();
});

render();
