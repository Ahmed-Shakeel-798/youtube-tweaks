// themes.js is loaded before this file (see popup.html), so THEMES is available here.
const root = document.documentElement;
const slider = document.getElementById("slider");
const val = document.getElementById("val");
const swatches = document.getElementById("swatches");

// ---------- Videos per row ----------

// Show the number and update the gradient fill (CSS reads --pct)
function show(n) {
  val.textContent = n;
  const pct = ((n - slider.min) / (slider.max - slider.min)) * 100;
  root.style.setProperty("--pct", pct + "%");
}

slider.addEventListener("input", () => {
  show(slider.value);
  chrome.storage.sync.set({ perRow: Number(slider.value) });
});

// ---------- Theme ----------

let hasCustomKnob = false;
let knobSvg = null; // the text of icons/knob.svg, loaded once

// Recolour the popup: copy the theme's values onto our CSS variables
async function applyPopupTheme(name) {
  const theme = THEMES[name] || THEMES.default;
  for (const [prop, value] of Object.entries(theme.popup)) {
    root.style.setProperty(prop, value);
  }
  for (const btn of swatches.children) {
    btn.classList.toggle("active", btn.dataset.theme === name);
  }

  // Recolour the knob face too, unless you're using your own custom-knob.png
  if (hasCustomKnob) return;
  knobSvg ??= await (await fetch("icons/knob.svg")).text();
  const svg = knobSvg
    .replace("#ff7a59", theme.popup["--accent-1"])
    .replace("#e8336d", theme.popup["--accent-2"]);
  root.style.setProperty("--knob", `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
}

// Build one round button per theme
for (const [name, theme] of Object.entries(THEMES)) {
  const btn = document.createElement("button");
  btn.className = "swatch";
  btn.title = theme.label;
  btn.dataset.theme = name;
  btn.style.background = `linear-gradient(135deg, ${theme.swatch[0]}, ${theme.swatch[1]})`;
  btn.addEventListener("click", () => {
    applyPopupTheme(name);
    chrome.storage.sync.set({ theme: name }); // content.js picks this up via onChanged
  });
  swatches.appendChild(btn);
}

// ---------- Load saved settings ----------

chrome.storage.sync.get({ perRow: 5, theme: "default" }, (data) => {
  slider.value = data.perRow;
  show(data.perRow);
  applyPopupTheme(data.theme);
});

// Optional personal knob: if custom-knob.png exists in the extension folder, use it.
// That file is in .gitignore, so it never gets committed.
const custom = new Image();
custom.onload = () => {
  hasCustomKnob = true;
  root.style.setProperty("--knob", 'url("custom-knob.png")');
};
custom.src = "custom-knob.png";
