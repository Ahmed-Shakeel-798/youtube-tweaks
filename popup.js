const slider = document.getElementById("slider");
const val = document.getElementById("val");

// When the popup opens, load the saved value (or 5 if nothing is saved yet)
chrome.storage.sync.get({ perRow: 5 }, (data) => {
  slider.value = data.perRow;
  val.textContent = data.perRow;
});

// When the slider moves, save the new value
slider.addEventListener("input", () => {
  val.textContent = slider.value;
  chrome.storage.sync.set({ perRow: Number(slider.value) });
});
