const slider = document.getElementById("slider");
const val = document.getElementById("val");

// Show the number and update the gradient fill (CSS reads --pct)
function show(n) {
  val.textContent = n;
  const pct = ((n - slider.min) / (slider.max - slider.min)) * 100;
  document.documentElement.style.setProperty("--pct", pct + "%");
}

// When the popup opens, load the saved value (or 5 if nothing is saved yet)
chrome.storage.sync.get({ perRow: 5 }, (data) => {
  slider.value = data.perRow;
  show(data.perRow);
});

// When the slider moves, save the new value
slider.addEventListener("input", () => {
  show(slider.value);
  chrome.storage.sync.set({ perRow: Number(slider.value) });
});

// Optional personal knob: if custom-knob.png exists in the extension folder, use it.
// That file is in .gitignore, so it never gets committed.
const custom = new Image();
custom.onload = () =>
  document.documentElement.style.setProperty("--knob", 'url("custom-knob.png")');
custom.src = "custom-knob.png";
