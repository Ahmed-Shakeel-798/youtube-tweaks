const style = document.createElement("style");
style.textContent = `
  ytd-rich-grid-renderer {
    --ytd-rich-grid-items-per-row: 5 !important;
  }
`;
document.documentElement.appendChild(style);
