function apply(n) {
  let style = document.getElementById("yt-columns");
  if (!style) {
    style = document.createElement("style");
    style.id = "yt-columns";
    document.documentElement.appendChild(style);
  }
  style.textContent = `
    ytd-rich-grid-renderer {
      --ytd-rich-grid-items-per-row: ${n} !important;
    }
  `;
}

// 1. On page load: read the saved value and apply it
chrome.storage.sync.get({ perRow: 5 }, (data) => apply(data.perRow));

// 2. Whenever the value changes (e.g. you move the slider), re-apply live
chrome.storage.onChanged.addListener((changes) => {
  if (changes.perRow) apply(changes.perRow.newValue);
});
