// custom-select.js — replaces a native <select> with a styled listbox while the
// <select> stays in the DOM (hidden) as the single source of truth: pages keep
// reading select.value and listening for "change". Call select._sync() after
// setting select.value from code.

function enhanceSelect(select, { preview } = {}) {
  const wrap = select.closest(".select");
  const label = document.querySelector(`label[for="${select.id}"]`);
  const uid = select.id;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "select-btn";
  button.id = `${uid}Btn`;
  button.setAttribute("aria-haspopup", "listbox");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", `${uid}List`);
  button.innerHTML =
    '<span class="select-value"></span><span class="select-preview" aria-hidden="true"></span>' +
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

  const list = document.createElement("ul");
  list.className = "listbox";
  list.id = `${uid}List`;
  list.setAttribute("role", "listbox");
  list.tabIndex = -1;
  list.hidden = true;

  if (label) {
    label.id ||= `${uid}Label`;
    label.htmlFor = button.id;
    button.setAttribute("aria-labelledby", `${label.id} ${button.id}`);
    list.setAttribute("aria-labelledby", label.id);
  }

  const options = [...select.options].map((opt, i) => {
    const li = document.createElement("li");
    li.id = `${uid}-opt-${i}`;
    li.setAttribute("role", "option");
    li.dataset.value = opt.value;
    li.innerHTML =
      '<span class="opt-label"></span><span class="opt-preview" aria-hidden="true"></span>' +
      '<svg class="icon check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
    li.querySelector(".opt-label").textContent = opt.textContent;
    li.querySelector(".opt-preview").textContent = preview ? preview(opt.value) : "";
    list.append(li);
    return li;
  });

  select.hidden = true;
  select.tabIndex = -1;
  select.setAttribute("aria-hidden", "true");
  wrap.querySelector(":scope > .icon")?.remove();
  wrap.append(button, list);

  let active = 0;

  function sync() {
    const i = Math.max(0, select.selectedIndex);
    button.querySelector(".select-value").textContent = select.options[i]?.textContent ?? "";
    button.querySelector(".select-preview").textContent = preview ? preview(select.value) : "";
    options.forEach((li, j) => li.setAttribute("aria-selected", String(j === i)));
  }

  function setActive(i) {
    active = (i + options.length) % options.length;
    options.forEach((li, j) => li.classList.toggle("active", j === active));
    list.setAttribute("aria-activedescendant", options[active].id);
    options[active].scrollIntoView({ block: "nearest" });
  }

  function open() {
    if (!list.hidden) return;
    // Open upward when there is not enough room below.
    const below = innerHeight - button.getBoundingClientRect().bottom;
    wrap.classList.toggle("drop-up", below < 300 && button.getBoundingClientRect().top > below);
    list.hidden = false;
    button.setAttribute("aria-expanded", "true");
    setActive(Math.max(0, select.selectedIndex));
    list.focus();
  }

  function close(returnFocus = true) {
    if (list.hidden) return;
    list.hidden = true;
    button.setAttribute("aria-expanded", "false");
    if (returnFocus) button.focus();
  }

  function choose(i) {
    const changed = select.selectedIndex !== i;
    select.selectedIndex = i;
    sync();
    close();
    if (changed) select.dispatchEvent(new Event("change", { bubbles: true }));
  }

  let typed = "";
  let typedTimer = 0;
  function typeahead(ch) {
    typed += ch.toLowerCase();
    clearTimeout(typedTimer);
    typedTimer = setTimeout(() => (typed = ""), 600);
    const start = typed.length === 1 ? active + 1 : active;
    for (let k = 0; k < options.length; k++) {
      const j = (start + k) % options.length;
      if (select.options[j].textContent.toLowerCase().startsWith(typed)) return setActive(j);
    }
  }

  button.addEventListener("click", () => (list.hidden ? open() : close()));
  button.addEventListener("keydown", (e) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      open();
      if (e.key === "ArrowUp") setActive(active - 1);
    }
  });
  list.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") setActive(active + 1);
    else if (e.key === "ArrowUp") setActive(active - 1);
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(options.length - 1);
    else if (e.key === "Enter" || e.key === " ") choose(active);
    else if (e.key === "Escape") close();
    else if (e.key === "Tab") return close(false);
    else if (e.key.length === 1 && /\S/.test(e.key)) typeahead(e.key);
    else return;
    e.preventDefault();
  });
  list.addEventListener("pointermove", (e) => {
    const li = e.target.closest('[role="option"]');
    if (li) setActive(options.indexOf(li));
  });
  list.addEventListener("click", (e) => {
    const li = e.target.closest('[role="option"]');
    if (li) choose(options.indexOf(li));
  });
  document.addEventListener("pointerdown", (e) => {
    if (!list.hidden && !wrap.contains(e.target)) close(false);
  });
  select.addEventListener("change", sync);

  select._sync = sync;
  sync();
  return { sync, button };
}
