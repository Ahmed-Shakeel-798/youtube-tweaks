// Shared by content.js (themes YouTube) and popup.js (themes the popup).
// Each theme has:
//   swatch - colours for the round button in the popup
//   popup  - values for the popup's own CSS variables
//   yt     - colours to put on YouTube (null = leave YouTube alone)
//   light  - true for the light themes (2nd swatch row): dark text on a light page
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

  // ---------- Light themes (second row of swatches) ----------
  // These recolour YouTube's DARK mode into a light palette, so you don't need to
  // change YouTube's own appearance setting.
  coralLight: {
    label: "Coral Light", light: true,
    swatch: ["#ffd6cc", "#ffadc4"],
    popup: {
      "--accent-1": "#ff7a59", "--accent-2": "#e8336d",
      "--frame": "#fbe9e4", "--card": "#fff8f6", "--track": "#f3d6ce",
      "--text": "#2e1a17", "--muted": "#9a7a74",
    },
    yt: {
      base: "#fff6f3", raised: "#ffece6", menu: "#ffffff",
      chip: "#fde2da", chipHover: "#f9d0c4",
      text: "#2e1a17", text2: "#7a5a54", accent: "#d6336c",
      overlay1: "rgba(80,20,10,0.07)", overlay2: "rgba(80,20,10,0.14)",
    },
  },
  tealLight: {
    label: "Teal Light", light: true,
    swatch: ["#c9f2ec", "#8fe0d4"],
    popup: {
      "--accent-1": "#2dd4bf", "--accent-2": "#0d9488",
      "--frame": "#dff3f0", "--card": "#f4fcfb", "--track": "#c4e6e1",
      "--text": "#0f2a28", "--muted": "#5f807c",
    },
    yt: {
      base: "#f1fbf9", raised: "#e2f5f2", menu: "#ffffff",
      chip: "#d5efeb", chipHover: "#c4e6e1",
      text: "#0f2a28", text2: "#4f6f6b", accent: "#0d9488",
      overlay1: "rgba(10,60,55,0.07)", overlay2: "rgba(10,60,55,0.14)",
    },
  },
  lavenderLight: {
    label: "Lavender Light", light: true,
    swatch: ["#ece3ff", "#cdb8fb"],
    popup: {
      "--accent-1": "#c4a8fb", "--accent-2": "#8b5cf6",
      "--frame": "#ebe4fa", "--card": "#faf7ff", "--track": "#ddd2f7",
      "--text": "#241b35", "--muted": "#7d7196",
    },
    yt: {
      base: "#f8f5ff", raised: "#efe9fd", menu: "#ffffff",
      chip: "#e9e1fb", chipHover: "#ddd2f7",
      text: "#241b35", text2: "#6b5f85", accent: "#7c3aed",
      overlay1: "rgba(50,20,100,0.07)", overlay2: "rgba(50,20,100,0.14)",
    },
  },
  midnightLight: {
    label: "Sky Light", light: true,
    swatch: ["#d6e9ff", "#9cc8fb"],
    popup: {
      "--accent-1": "#7cc4ff", "--accent-2": "#2563eb",
      "--frame": "#e1edfb", "--card": "#f6faff", "--track": "#c7ddf8",
      "--text": "#0f1f38", "--muted": "#6a7f9e",
    },
    yt: {
      base: "#f3f8ff", raised: "#e6f0fd", menu: "#ffffff",
      chip: "#d9e9fc", chipHover: "#c7ddf8",
      text: "#0f1f38", text2: "#556a8a", accent: "#2563eb",
      overlay1: "rgba(10,40,90,0.07)", overlay2: "rgba(10,40,90,0.14)",
    },
  },
};
