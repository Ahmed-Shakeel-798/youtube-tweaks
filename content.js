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
  "18,18,18": "base",      // #121212  search box
  "34,34,34": "raised",    // #222222  search button
  "48,48,48": "chipHover", // #303030  search box border, outlines
  // see-through whites used for hover states, dividers and borders
  "255,255,255,0.1": "overlay1",
  "255,255,255,0.2": "overlay2",
};

// Normalise any colour spelling to one lookup key:
// "#0f0f0f" / "#0F0F0F" / "rgb(15, 15, 15)" -> "15,15,15"
// "#ffffff1a" / "rgba(255,255,255,.1)"        -> "255,255,255,0.1"
function rgbKey(value) {
  value = value.trim().toLowerCase();
  let r, g, b, a = 1;
  let m = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/);
  if (m) {
    let hex = m[1];
    if (hex.length === 3) hex = [...hex].map((c) => c + c).join("");
    [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
    if (hex.length === 8) a = parseInt(hex.slice(6), 16) / 255;
  } else {
    m = value.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)\s*(?:[,/]\s*([\d.]+%?))?\s*\)$/);
    if (!m) return null; // var(...), gradients, etc.: not a plain colour
    [r, g, b] = [m[1], m[2], m[3]].map(Number);
    if (m[4]) a = m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
  }
  a = Number(a.toFixed(2));
  return a === 1 ? `${r},${g},${b}` : `${r},${g},${b},${a}`;
}

// Turn a YouTube colour key into the theme's colour (or null if we don't know it).
// 1. exact match: "15,15,15" -> theme.base
// 2. see-through version of a known colour, e.g. the frosted top bar "15,15,15,0.8":
//    use the theme colour at the SAME transparency
function themedValue(key, t) {
  if (!key) return null;
  if (YT_DARK_DEFAULTS[key]) return t[YT_DARK_DEFAULTS[key]];
  const [r, g, b, a] = key.split(",");
  const name = a !== undefined && YT_DARK_DEFAULTS[`${r},${g},${b}`];
  if (!name || !t[name].startsWith("#")) return null;
  const hex = t[name].slice(1);
  const [tr, tg, tb] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${tr}, ${tg}, ${tb}, ${a})`;
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
        const value = themedValue(rgbKey(rule.style.getPropertyValue(prop)), t);
        if (value) decls.push(`${prop}: ${value} !important;`);
      }
      if (decls.length) blocks.push(`${rule.selectorText} { ${decls.join(" ")} }`);
    }
  }
  // Light themes: hide Ambient mode's glow on the watch page. It's a blurred, darkened
  // copy of the video drawn behind the player; fine on a dark page, a black smear on a light one.
  if ((THEMES[currentTheme] || THEMES.default).light) {
    blocks.push(`#cinematics, #cinematics-container { display: none !important; }`);
  }

  // Light themes: the YouTube logo's lettering is plain white in dark mode,
  // which would vanish on a light background, so paint it with the text colour
  if ((THEMES[currentTheme] || THEMES.default).light) {
    blocks.push(`#logo-icon [fill="#fff"], #logo-icon [fill="#FFF"], #logo-icon [fill="#ffffff"], #logo-icon [fill="#FFFFFF"] { fill: ${t.text} !important; }`);
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

// YouTube can also add CSS rules into an EXISTING stylesheet from code (sheet.insertRule),
// which the observer above can't see. So every 2s we count the rules (cheap: top level
// only) and rescan if the number changed.
let lastRuleCount = 0;
setInterval(() => {
  if (!(THEMES[currentTheme] || THEMES.default).yt) return; // Default theme: nothing to do
  let count = document.styleSheets.length;
  for (const sheet of document.styleSheets) {
    try { count += sheet.cssRules.length; } catch {}
  }
  if (count !== lastRuleCount) {
    lastRuleCount = count;
    scheduleRemap();
  }
}, 2000);

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
