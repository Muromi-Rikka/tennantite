/**
 * @tennantite/tokens — TS 常量（与 css/tokens.css 同源，CSS 为唯一事实来源）
 *
 * 颜色取值对齐 Minecraft Java 26.3 GUI 采样值。
 */

export const mcColors = {
  accentGreen: "#7EC850",
  aqua: "#55FFFF",
  button: "#6F6F6F",
  buttonDark: "#565656",
  buttonDisabled: "#2C2C2C",
  buttonHover: "#757575",
  buttonLight: "#AAAAAA",
  gold: "#FFAA00",
  gray: "#AAAAAA",
  green: "#55FF55",
  heart: "#FF1313",
  highlight: "#FFFFFF",
  hotbar: "rgb(39 37 5 / 73%)",
  panel: "#C6C6C6",
  panelOverlay: "rgb(0 0 0 / 75%)",
  purple: "#FF55FF",
  red: "#FF5555",
  scroller: "#C0C0C0",
  scrollerDark: "#808080",
  selection: "#D5E8D0",
  selectionDark: "#5F6D5C",
  selectionMid: "#A1B29D",
  slot: "#8B8B8B",
  stone: "#8B8B8B",
  stoneDark: "#555555",
  stoneDarker: "#373737",
  textDim: "#A0A0A0",
  textDisabled: "#A0A0A0",
  textMain: "#FFFFFF",
  tooltipBg: "rgb(16 0 16 / 94%)",
  tooltipBorderBottom: "rgb(40 0 127 / 31%)",
  tooltipBorderTop: "rgb(80 0 255 / 31%)",
  tooltipText: "#FFFFFF",
  xp: "#80FF20",
  yellow: "#FFFF55",
} as const;

export const mcFonts = {
  mc: "\"Minecraft\", \"Microsoft YaHei\", \"PingFang SC\", sans-serif",
} as const;

export type McColorToken = keyof typeof mcColors;
