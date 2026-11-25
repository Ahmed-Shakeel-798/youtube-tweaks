// themes.js is loaded before this file (see manifest), so THEMES is available here.

// Create our <style> tag once (by id), then reuse it.
function styleTag(id) {
  let style = document.getElementById(id);
  if (!style) {
    style = document.createElement("style");
    style.id = id;
    document.documentElement.appendChild(style);
  }
  return style;
}

// ---- Feature 1: videos per row ----
function applyColumns(n) {
  styleTag("yt-tweaks-columns").textContent = `
    ytd-rich-grid-renderer {
      --ytd-rich-grid-items-per-row: ${n} !important;
    }
  `;
}

// ---- Feature 2: colour theme ----
// YouTube colours everything through CSS variables. It's mid-way through renaming them:
// older ones are --yt-spec-<token>, newer ones are --yt-sys-color-baseline--<token>.
// We set BOTH spellings; a variable YouTube doesn't use is simply ignored.
// Each entry: token name -> which colour from the theme (see THEMES[...].yt in themes.js)
const TOKENS = {
  "base-background": "base",
  "raised-background": "raised",
  "menu-background": "menu",
  "general-background-a": "base",
  "general-background-b": "base",
  "general-background-c": "raised",
  "brand-background-solid": "base",
  "brand-background-primary": "base",
  "brand-background-secondary": "raised",
  "badge-chip-background": "chip",
  "button-chip-background-hover": "chipHover",
  "additive-background": "chip",
  "10-percent-layer": "chipHover",
  "text-primary": "text",
  "text-secondary": "text2",
  "call-to-action": "accent",
  "themed-blue": "accent",
};
const PREFIXES = ["--yt-spec-", "--yt-sys-color-baseline--"];

// A few one-off variables that don't follow the pattern above
const EXTRAS = {
  "--yt-deprecated-general-background-a": "base",
  "--yt-deprecated-general-background-b": "base",
  "--yt-deprecated-general-background-c": "raised",
  "--app-drawer-content-container-background-color": "base",
};

function applyTheme(name) {
  const t = (THEMES[name] || THEMES.default).yt;
  if (!t) {
    styleTag("yt-tweaks-theme").textContent = ""; // Default: back to YouTube's own colours
    return;
  }
  const lines = [];
  for (const [token, key] of Object.entries(TOKENS)) {
    for (const prefix of PREFIXES) lines.push(`${prefix}${token}: ${t[key]} !important;`);
  }
  for (const [variable, key] of Object.entries(EXTRAS)) {
    lines.push(`${variable}: ${t[key]} !important;`);
  }
  // YouTube's dark mode puts a "dark" attribute on <html> (and some inner elements)
  styleTag("yt-tweaks-theme").textContent = `
    html[dark], [dark] {
      ${lines.join("\n      ")}
    }
    html[dark] { background: ${t.base} !important; }
  `;
}

// ---- Theme, part 2: catch variables by VALUE, not by name ----
// YouTube also paints with hashed variables like --t3e41d7b17b187f69 whose names change
// whenever YouTube rebuilds its CSS. Their VALUES don't change, though: dark mode's
// background is always #0f0f0f, titles #f1f1f1, etc. So we scan YouTube's stylesheets for
// any variable set to one of these colours and override it with the theme's colour,
// using YouTube's own selector + !important so it wins on exactly the same elements.
const YT_DARK_DEFAULTS = {
  "15,15,15": "base",      // #0f0f0f  page background
  "33,33,33": "raised",    // #212121  cards, raised surfaces
  "40,40,40": "menu",      // #282828  menus, popups
  "39,39,39": "chip",      // #272727  chips
  "241,241,241": "text",   // #f1f1f1  primary text
  "170,170,170": "text2",  // #aaaaaa  secondary text
  "62,166,255": "accent",  // #3ea6ff  links / call to action
};

// "#0f0f0f" / "#fff" / "rgb(15, 15, 15)" -> "15,15,15" (opaque colours only)
function rgbKey(value) {
  value = value.trim().toLowerCase();
  let m = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (m) {
    let hex = m[1];
    if (hex.length === 3) hex = [...hex].map((c) => c + c).join("");
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(",");
  }
  m = value.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)\s*(?:[,/]\s*(1|1\.0+|100%))?\s*\)$/);
  return m ? `${m[1]},${m[2]},${m[3]}` : null;
}

function* allRules(list) {
  for (const rule of list) {
    yield rule;
    if (rule.cssRules) yield* allRules(rule.cssRules); // rules nested in @media etc.
  }
}

let currentTheme = "default";

function remapByValue() {
  const out = styleTag("yt-tweaks-theme-remap");
  const t = (THEMES[currentTheme] || THEMES.default).yt;
  if (!t) { out.textContent = ""; return; }

  const blocks = [];
  for (const sheet of document.styleSheets) {
    if (sheet.ownerNode && sheet.ownerNode.id && sheet.ownerNode.id.startsWith("yt-tweaks")) continue; // skip ours
    let rules;
    try { rules = sheet.cssRules; } catch { continue; } // cross-origin sheet: can't read, skip
    for (const rule of allRules(rules)) {
      if (!rule.style || !rule.selectorText || rule.selectorText.includes("light")) continue;
      const decls = [];
      for (const prop of rule.style) {
        if (!prop.startsWith("--")) continue;
        const key = YT_DARK_DEFAULTS[rgbKey(rule.style.getPropertyValue(prop))];
        if (key) decls.push(`${prop}: ${t[key]} !important;`);
      }
      if (decls.length) blocks.push(`${rule.selectorText} { ${decls.join(" ")} }`);
    }
  }
  out.textContent = blocks.join("\n");
}

// YouTube keeps adding stylesheets as you browse, so rescan when new ones appear
// (debounced: many can arrive at once, one scan afterwards is enough)
let scanTimer;
function scheduleRemap() {
  clearTimeout(scanTimer);
  scanTimer = setTimeout(remapByValue, 150);
}
new MutationObserver((mutations) => {
  for (const m of mutations) for (const node of m.addedNodes) {
    if ((node.tagName === "STYLE" || node.tagName === "LINK") && !(node.id || "").startsWith("yt-tweaks")) {
      scheduleRemap();
      if (node.tagName === "LINK") node.addEventListener("load", scheduleRemap, { once: true });
    }
  }
}).observe(document.documentElement, { childList: true, subtree: true });
document.addEventListener("DOMContentLoaded", scheduleRemap);
window.addEventListener("load", scheduleRemap);

function setTheme(name) {
  currentTheme = name;
  applyTheme(name);
  remapByValue();
}

// On page load: read both saved settings and apply them
chrome.storage.sync.get({ perRow: 5, theme: "default" }, (data) => {
  applyColumns(data.perRow);
  setTheme(data.theme);
});

// Re-apply live whenever the popup changes a setting
chrome.storage.onChanged.addListener((changes) => {
  if (changes.perRow) applyColumns(changes.perRow.newValue);
  if (changes.theme) setTheme(changes.theme.newValue);
});
