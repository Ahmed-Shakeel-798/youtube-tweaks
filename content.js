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
// YouTube's dark mode puts a "dark" attribute on <html> and colours everything
// through --yt-spec-* variables. Overriding those recolours the whole site.
function applyTheme(name) {
  const t = (THEMES[name] || THEMES.default).yt;
  if (!t) {
    styleTag("yt-tweaks-theme").textContent = ""; // Default: back to YouTube's own colours
    return;
  }
  styleTag("yt-tweaks-theme").textContent = `
    html[dark], [dark] {
      --yt-spec-base-background: ${t.base} !important;
      --yt-spec-general-background-a: ${t.base} !important;
      --yt-spec-general-background-b: ${t.base} !important;
      --yt-spec-general-background-c: ${t.raised} !important;
      --yt-spec-raised-background: ${t.raised} !important;
      --yt-spec-menu-background: ${t.menu} !important;
      --yt-spec-brand-background-solid: ${t.base} !important;
      --yt-spec-brand-background-primary: ${t.base} !important;
      --yt-spec-brand-background-secondary: ${t.raised} !important;
      --yt-spec-badge-chip-background: ${t.chip} !important;
      --yt-spec-button-chip-background-hover: ${t.chipHover} !important;
      --yt-spec-additive-background: ${t.chip} !important;
      --yt-spec-10-percent-layer: ${t.chipHover} !important;
      --yt-spec-text-primary: ${t.text} !important;
      --yt-spec-text-secondary: ${t.text2} !important;
      --yt-spec-call-to-action: ${t.accent} !important;
      --yt-spec-themed-blue: ${t.accent} !important;
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
