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

// On page load: read both saved settings and apply them
chrome.storage.sync.get({ perRow: 5, theme: "default" }, (data) => {
  applyColumns(data.perRow);
  applyTheme(data.theme);
});

// Re-apply live whenever the popup changes a setting
chrome.storage.onChanged.addListener((changes) => {
  if (changes.perRow) applyColumns(changes.perRow.newValue);
  if (changes.theme) applyTheme(changes.theme.newValue);
});
