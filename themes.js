// Shared by content.js (themes YouTube) and popup.js (themes the popup).
// Each theme has:
//   swatch - colours for the round button in the popup
//   popup  - values for the popup's own CSS variables
//   yt     - values for YouTube's dark-mode CSS variables (null = leave YouTube alone)
const THEMES = {
  default: {
    label: "Default",
    swatch: ["#ff7a59", "#e8336d"],
    popup: {
      "--accent-1": "#ff7a59", "--accent-2": "#e8336d",
      "--frame": "#1b1b1f", "--card": "#26262c", "--track": "#3a3a42",
      "--text": "#f1f1f4", "--muted": "#8b8b96",
    },
    yt: null,
  },
  teal: {
    label: "Teal",
    swatch: ["#5eead4", "#0f9e8e"],
    popup: {
      "--accent-1": "#5eead4", "--accent-2": "#14b8a6",
      "--frame": "#0a1617", "--card": "#132728", "--track": "#24474a",
      "--text": "#e3f4f2", "--muted": "#86aaa6",
    },
    yt: {
      base: "#0c1a1b", raised: "#132728", menu: "#172f31",
      chip: "#1d3a3c", chipHover: "#24474a",
      text: "#e3f4f2", text2: "#94b8b4", accent: "#4fd1c5",
    },
  },
  lavender: {
    label: "Lavender",
    swatch: ["#d8b4fe", "#8b5cf6"],
    popup: {
      "--accent-1": "#d8b4fe", "--accent-2": "#a78bfa",
      "--frame": "#120f1a", "--card": "#201b2e", "--track": "#382f50",
      "--text": "#efeaff", "--muted": "#a49bbd",
    },
    yt: {
      base: "#16131f", raised: "#201b2e", menu: "#262036",
      chip: "#2d2640", chipHover: "#382f50",
      text: "#efeaff", text2: "#b0a6c9", accent: "#c4b5fd",
    },
  },
  midnight: {
    label: "Midnight Blue",
    swatch: ["#93c5fd", "#2563eb"],
    popup: {
      "--accent-1": "#93c5fd", "--accent-2": "#38bdf8",
      "--frame": "#081020", "--card": "#121d33", "--track": "#233659",
      "--text": "#e6eefc", "--muted": "#8c9dbd",
    },
    yt: {
      base: "#0b1322", raised: "#121d33", menu: "#16233d",
      chip: "#1b2a48", chipHover: "#233659",
      text: "#e6eefc", text2: "#9aaccb", accent: "#7cc4ff",
    },
  },
};
