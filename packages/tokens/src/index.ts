/**
 * @verdigris/tokens — TS 常量（与 css/tokens.css 同源，CSS 为唯一事实来源）
 */

export const mcColors = {
  accentGreen: "#7EC850",
  gold: "#E2B84B",
  heart: "#E3313B",
  highlight: "#FFFFFF",
  panel: "#C6C6C6",
  panelOverlay: "rgb(0 0 0 / 60%)",
  stone: "#8B8B8B",
  stoneDark: "#555555",
  stoneDarker: "#373737",
  textDim: "#A0A0A0",
  textMain: "#FFFFFF",
  tooltipBg: "#100010",
  tooltipText: "#FFF8E7",
  xp: "#7EFC20",
} as const;

export const mcFonts = {
  pixel: "\"Press Start 2P\", \"VT323\", monospace",
  readable: "\"VT323\", \"Press Start 2P\", monospace",
} as const;

export type McColorToken = keyof typeof mcColors;
