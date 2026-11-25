// Shared by content.js (themes YouTube) and popup.js (themes the popup).
// Each theme has:
//   swatch - colours for the round button in the popup
//   popup  - values for the popup's own CSS variables
//   yt     - colours to put on YouTube (null = leave YouTube alone)
//   light  - true for the light themes: dark text on a tinted light page
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
      overlay1: "rgba(255,255,255,0.1)", overlay2: "rgba(255,255,255,0.2)",
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
      overlay1: "rgba(255,255,255,0.1)", overlay2: "rgba(255,255,255,0.2)",
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
      overlay1: "rgba(255,255,255,0.1)", overlay2: "rgba(255,255,255,0.2)",
    },
  },

  // ---------- Light themes (after the divider in the swatch row) ----------
  // These recolour YouTube's DARK mode into a light palette, so you don't need to
  // change YouTube's own appearance setting.
  tealLight: {
    label: "Teal Light", light: true,
    swatch: ["#a8e6dc", "#4fc4b4"],
    popup: {
      "--accent-1": "#14b8a6", "--accent-2": "#0f766e",
      "--frame": "#b8e3dc", "--card": "#d4f1ec", "--track": "#a6d9d1",
      "--text": "#0b2e2a", "--muted": "#3f6b65",
    },
    yt: {
      base: "#d4f1ec", raised: "#c3e9e3", menu: "#e8f8f5",
      chip: "#b8e3dc", chipHover: "#a6d9d1",
      text: "#0b2e2a", text2: "#3f6b65", accent: "#0f766e",
      overlay1: "rgba(10,60,55,0.08)", overlay2: "rgba(10,60,55,0.16)",
    },
  },
  lavenderLight: {
    label: "Lavender Light", light: true,
    swatch: ["#d9c8fb", "#a98bf2"],
    popup: {
      "--accent-1": "#a78bfa", "--accent-2": "#6d28d9",
      "--frame": "#d3c3f5", "--card": "#e6dcfb", "--track": "#c5b2f0",
      "--text": "#22173a", "--muted": "#5d4f80",
    },
    yt: {
      base: "#e6dcfb", raised: "#dccff8", menu: "#f1ebfe",
      chip: "#d3c3f5", chipHover: "#c5b2f0",
      text: "#22173a", text2: "#5d4f80", accent: "#6d28d9",
      overlay1: "rgba(50,20,100,0.08)", overlay2: "rgba(50,20,100,0.16)",
    },
  },
  midnightLight: {
    label: "Sky Light", light: true,
    swatch: ["#bcd8fa", "#6aa6ee"],
    popup: {
      "--accent-1": "#60a5fa", "--accent-2": "#1d4ed8",
      "--frame": "#bdd5f5", "--card": "#d6e7fb", "--track": "#aecbf1",
      "--text": "#0c1d36", "--muted": "#47608a",
    },
    yt: {
      base: "#d6e7fb", raised: "#c8ddf8", menu: "#ebf3fe",
      chip: "#bdd5f5", chipHover: "#aecbf1",
      text: "#0c1d36", text2: "#47608a", accent: "#1d4ed8",
      overlay1: "rgba(10,40,90,0.08)", overlay2: "rgba(10,40,90,0.16)",
    },
  },
};
