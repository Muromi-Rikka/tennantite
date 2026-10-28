/**
 * AE2（应用能源 2）1.21 屏幕布局常量。
 *
 * 所有坐标取自 AE2 `src/main/resources/assets/ae2/screens/*.json` 的槽位
 * 物品坐标；槽框坐标由 `ae2SlotFrame` 换算，面板坐标从外沿 (0,0) 起算。
 */
export const AE2_PLAYER = {
  frameClassName: "mc-tex-ae2-slot",
  frameLeft: 7,
  hotbarBottom: 26,
  itemLeft: 8,
  mainBottom: 84,
  titleBottom: 95,
} as const;

export function ae2PlayerHotbarTop(height: number): number {
  return height - AE2_PLAYER.hotbarBottom - 1;
}

export function ae2PlayerMainTop(height: number): number {
  return height - AE2_PLAYER.mainBottom - 1;
}

export function ae2PlayerTitleTop(height: number): number {
  return height - AE2_PLAYER.titleBottom;
}

export function ae2SlotFrame(
  position: { left: number; top: number },
  size = 18,
): { left: number; top: number } {
  const offset = (size - 16) / 2;
  return { left: position.left - offset, top: position.top - offset };
}

export const AE2_TERMINAL = {
  backgroundClassName: "mc-tex-ae2-panel",
  bottomHeight: 99,
  columns: 9,
  firstRowHeight: 18,
  gridLeft: 7,
  gridTop: 17,
  headerHeight: 17,
  panelWidth: 195,
  rowHeight: 18,
  scrollbar: { left: 175, top: 18 },
  search: { height: 12, left: 80, top: 4, width: 89 },
  slotFrameClassName: "mc-tex-ae2-slot",
  slotSize: 18,
} as const;

export function ae2TerminalHeight(rows: number): number {
  const clampedRows = Math.max(2, Math.floor(rows));
  return AE2_TERMINAL.headerHeight
    + AE2_TERMINAL.firstRowHeight
    + Math.max(0, clampedRows - 2) * AE2_TERMINAL.rowHeight
    + AE2_TERMINAL.firstRowHeight
    + AE2_TERMINAL.bottomHeight;
}

export const AE2_INSCRIBER = {
  backgroundClassName: "mc-tex-ae2-panel",
  height: 178,
  largeSlotFrameClassName: "mc-tex-ae2-slot-large",
  progress: { height: 18, left: 135, top: 39, width: 6 },
  slotFrameClassName: "mc-tex-ae2-slot",
  slots: {
    bottom: { left: 39, top: 55 },
    input: { left: 63, top: 39 },
    output: { left: 113, top: 40 },
    top: { left: 39, top: 23 },
  },
  width: 176,
} as const;

export const AE2_DRIVE = {
  backgroundClassName: "mc-tex-ae2-panel",
  height: 201,
  priority: { left: 152, top: -5 },
  slotFrameClassName: "mc-tex-ae2-slot",
  storage: { cellSize: 18, columns: 2, left: 71, rows: 5, top: 14 },
  width: 176,
} as const;

export const AE2_CHEST = {
  backgroundClassName: "mc-tex-ae2-panel",
  height: 168,
  priority: { left: 152, top: -5 },
  slotFrameClassName: "mc-tex-ae2-slot",
  storage: { left: 80, size: 18, top: 37 },
  width: 176,
} as const;
