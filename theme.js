// theme.js
const THEME_KEY = "theme"; // 'light' | 'dark' | absent = system

const themeEls = {
  light: document.getElementById("themeLight"),
  dark: document.getElementById("themeDark"),
  system: document.getElementById("themeSystem"),
};

const media = window.matchMedia("(prefers-color-scheme: light)");

function currentMode() {
  const saved = localStorage.getItem(THEME_KEY);
  return saved === "light" || saved === "dark" ? saved : "system";
}

function applyTheme(mode) {
  if (mode === "system") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem(THEME_KEY);
  } else {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem(THEME_KEY, mode);
  }
  updateActiveButton(mode);
}

function updateActiveButton(mode) {
  for (const [key, el] of Object.entries(themeEls)) {
    if (!el) continue;
    el.classList.toggle("active", key === mode);
  }
}

themeEls.light?.addEventListener("click", () => applyTheme("light"));
themeEls.dark?.addEventListener("click", () => applyTheme("dark"));
themeEls.system?.addEventListener("click", () => applyTheme("system"));

// If the user is on "system" and the OS theme changes live, no attribute
// update is needed — the CSS media query handles it automatically.
// We still refresh the button state in case another tab changed the setting.
window.addEventListener("storage", (e) => {
  if (e.key === THEME_KEY) updateActiveButton(currentMode());
});

updateActiveButton(currentMode());
