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

  // ---------- Dark themes ----------
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
  sage: {
    label: "Sage",
    swatch: ["#a9c4bd", "#5f8178"],
    popup: {
      "--accent-1": "#a9c4bd", "--accent-2": "#84a59d",
      "--frame": "#101614", "--card": "#1d2724", "--track": "#31433e",
      "--text": "#e8f0ed", "--muted": "#93aaa4",
    },
    yt: {
      base: "#151c1a", raised: "#1d2724", menu: "#223029",
      chip: "#263430", chipHover: "#31433e",
      text: "#e8f0ed", text2: "#a3b8b2", accent: "#84a59d",
      overlay1: "rgba(255,255,255,0.1)", overlay2: "rgba(255,255,255,0.2)",
    },
  },

  // ---------- Light themes (after the divider in the swatch row) ----------
  // These recolour YouTube's DARK mode into a light palette, so you don't need to
  // change YouTube's own appearance setting.
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
  cream: {
    label: "Cream", light: true,
    swatch: ["#fbf5ee", "#e9d6c0"],
    popup: {
      "--accent-1": "#f28482", "--accent-2": "#d9545f",
      "--frame": "#ecdcc9", "--card": "#f7ede2", "--track": "#e3cfb8",
      "--text": "#3a2e25", "--muted": "#7d6b5c",
    },
    yt: {
      base: "#f7ede2", raised: "#f1e2d2", menu: "#fbf6f0",
      chip: "#ecdcc9", chipHover: "#e3cfb8",
      text: "#3a2e25", text2: "#7d6b5c", accent: "#d9545f",
      overlay1: "rgba(80,50,20,0.08)", overlay2: "rgba(80,50,20,0.16)",
    },
  },
  blush: {
    label: "Blush", light: true,
    swatch: ["#f8d6d0", "#eeaa9f"],
    popup: {
      "--accent-1": "#84a59d", "--accent-2": "#5f8178",
      "--frame": "#f3c2ba", "--card": "#f9ddd8", "--track": "#eeb1a8",
      "--text": "#3d1f1c", "--muted": "#85524c",
    },
    yt: {
      base: "#f9ddd8", raised: "#f5cac3", menu: "#fdf1ef",
      chip: "#f3c2ba", chipHover: "#eeb1a8",
      text: "#3d1f1c", text2: "#85524c", accent: "#4f7169",
      overlay1: "rgba(90,30,20,0.08)", overlay2: "rgba(90,30,20,0.16)",
    },
  },
  mustard: {
    label: "Mustard", light: true,
    swatch: ["#f9d48f", "#eba63a"],
    popup: {
      "--accent-1": "#f28482", "--accent-2": "#d9545f",
      "--frame": "#f6d391", "--card": "#fbe6bf", "--track": "#f2c574",
      "--text": "#3b2a0c", "--muted": "#7d6530",
    },
    yt: {
      base: "#fbe6bf", raised: "#f8dba6", menu: "#fdf3e0",
      chip: "#f6d391", chipHover: "#f2c574",
      text: "#3b2a0c", text2: "#7d6530", accent: "#b8484f",
      overlay1: "rgba(90,60,0,0.08)", overlay2: "rgba(90,60,0,0.16)",
    },
  },
  coral: {
    label: "Coral", light: true,
    swatch: ["#f6a3a1", "#e8615e"],
    popup: {
      "--accent-1": "#f6bd60", "--accent-2": "#e09a2a",
      "--frame": "#f7b4b3", "--card": "#fbd6d5", "--track": "#f4a2a1",
      "--text": "#3d1414", "--muted": "#874645",
    },
    yt: {
      base: "#fbd6d5", raised: "#f9c3c2", menu: "#fdeceb",
      chip: "#f7b4b3", chipHover: "#f4a2a1",
      text: "#3d1414", text2: "#874645", accent: "#b63a38",
      overlay1: "rgba(100,20,20,0.08)", overlay2: "rgba(100,20,20,0.16)",
    },
  },
};
