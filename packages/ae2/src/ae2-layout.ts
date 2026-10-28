/**
 * AE2（应用能源 2）屏幕布局常量。
 *
 * 终端家族（ME 终端 / 合成终端）直接使用 AE2 1.12.2 的 GUI 贴图切片
 * （`terminal.png` / `crafting.png`，见 `@verdigris/textures` 的
 * `ae2-sprites.generated`）：面板由 header / firstRow / row / lastRow / bottom
 * 五段纵向拼接，槽框、滚动条轨道、合成区与背包都由贴图烘焙，组件只叠加交互热区。
 * 切片矩形与叠加坐标均为源 PNG px（1 源 px = 1 GUI px），取自贴图实测。
 *
 * 其余 AE2 屏幕（压印器 / ME 驱动器 / ME 箱子）仍按 1.21 屏幕 JSON 的手绘复刻，
 * 坐标来自 `assets/ae2/screens/*.json`。
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

/**
 * 终端贴图五段切片（源 PNG px，宽 195）
*/
export const AE2_TERMINAL_SLICES = {
  bottom: { height: 97, y: 71 },
  firstRow: { height: 18, y: 17 },
  header: { height: 17, y: 0 },
  lastRow: { height: 18, y: 53 },
  row: { height: 18, y: 35 },
} as const;

/**
 * 合成终端切片：header/rows 与终端相同，底部为 170 高的合成区 + 背包
*/
export const AE2_CRAFTING_SLICES = {
  ...AE2_TERMINAL_SLICES,
  bottom: { height: 170, y: 71 },
} as const;

export const AE2_TERMINAL = {
  bottomHeight: AE2_TERMINAL_SLICES.bottom.height,
  columns: 9,
  gridLeft: 7,
  gridTop: 17,
  headerHeight: AE2_TERMINAL_SLICES.header.height,
  panelWidth: 195,
  rowHeight: 18,
  scrollbar: { left: 175, top: 18 },
  search: { height: 12, left: 80, top: 4, width: 89 },
  slotSize: 18,
  sprite: "terminal" as const,
} as const;

/**
 * 终端家族玩家背包（贴图烘焙位置，面板底边起算）
*/
export const AE2_TERMINAL_PLAYER = {
  frameLeft: 7,
  hotbarTopFromBottom: 25,
  mainTopFromBottom: 83,
  titleTopFromBottom: 95,
} as const;

export function ae2TerminalHeight(rows: number): number {
  const clampedRows = Math.max(2, Math.floor(rows));
  return AE2_TERMINAL.headerHeight + clampedRows * AE2_TERMINAL.rowHeight + AE2_TERMINAL.bottomHeight;
}

export function ae2TerminalPlayerHotbarTop(height: number): number {
  return height - AE2_TERMINAL_PLAYER.hotbarTopFromBottom;
}

export function ae2TerminalPlayerMainTop(height: number): number {
  return height - AE2_TERMINAL_PLAYER.mainTopFromBottom;
}

export function ae2TerminalPlayerTitleTop(height: number): number {
  return height - AE2_TERMINAL_PLAYER.titleTopFromBottom;
}

/**
 * 合成终端：`crafting.png` 底部切片高 170，合成区（3×3、箭头、26×26 结果槽）
 * 已烘焙；下列坐标只用于交互热区与文字。
 */
export const AE2_CRAFTING_TERMINAL = {
  bottomHeight: 170,
  clear: { left: 92, size: 8, topFromBottom: 155 },
  columns: 9,
  craftGrid: { columns: 3, left: 36, rows: 3, topFromBottom: 155 },
  craftResult: { left: 126, size: 26, topFromBottom: 141 },
  craftTitleLeft: 8,
  craftTitleTopFromBottom: 167,
  panelWidth: 195,
  rowHeight: 18,
  scrollbar: { left: 175, top: 18 },
  search: { height: 12, left: 80, top: 4, width: 89 },
  slotSize: 18,
  sprite: "crafting" as const,
} as const;

export function ae2CraftingTerminalHeight(rows: number): number {
  const clampedRows = Math.max(2, Math.floor(rows));
  return AE2_TERMINAL.headerHeight
    + clampedRows * AE2_CRAFTING_TERMINAL.rowHeight
    + AE2_CRAFTING_TERMINAL.bottomHeight;
}

/**
 * AE2 `states.png` 的 16×16 图标裁剪（源 PNG px）
*/
export const AE2_ICONS = {
  craftStatus: { height: 16, width: 16, x: 32, y: 16 },
  settings: { height: 16, width: 16, x: 32, y: 16 },
  sortDirection: { height: 16, width: 16, x: 0, y: 48 },
  sortName: { height: 16, width: 16, x: 0, y: 64 },
  style: { height: 16, width: 16, x: 0, y: 208 },
  view: { height: 16, width: 16, x: 48, y: 32 },
} as const;

/**
 * 右上角优先级标签（`Ae2DriveScreen` / `Ae2ChestScreen`）：20×20 标签底、
 * 鼠标悬停/键盘聚焦时替换为 22×22 高亮底，16×16 图标按 (2, 1) 偏移绘制。
 *
 * 全部裁剪自现代 AE2 `states.png`（`statesModern` 贴图）——1.12.2 版贴图没有
 * 这组标签纹理。坐标即 AE2 `Icon.TAB_BUTTON_BACKGROUND` /
 * `TAB_BUTTON_BACKGROUND_FOCUS` / `PRIORITY`，偏移同 `TabButton`（BOX 样式）。
 */
export const AE2_PRIORITY_TAB = {
  background: { height: 20, width: 20, x: 160, y: 192 },
  backgroundFocus: { height: 22, width: 22, x: 160, y: 224 },
  icon: { height: 16, width: 16, x: 144, y: 64 },
  iconLeft: 2,
  iconTop: 1,
} as const;

/**
 * 压印器：直接使用 AE2 `inscriber.png`（1.12 `GuiInscriber` 版式）。
 *
 * 面板 177×176 + 右侧 35 宽升级槽条（3 个升级槽），槽框、连接箭头、进度轨道与
 * 玩家背包全部由贴图烘焙；进度填充取自贴图内 (135,177) 的 6×18 渐变条。
 * 下列槽位为贴图实测的槽框左上角，玩家背包沿用 `GuiInscriber` 的 ySize-96+3 标题位。
 */
export const AE2_INSCRIBER = {
  height: 176,
  inventory: { hotbarTop: 151, mainTop: 93, titleTop: 83 },
  panel: { height: 176, width: 177, x: 0, y: 0 },
  progress: {
    fill: { height: 18, width: 6, x: 135, y: 177 },
    height: 18,
    left: 135,
    top: 39,
    width: 6,
  },
  slots: {
    bottom: { left: 44, size: 18, top: 61 },
    input: { left: 62, size: 18, top: 38 },
    output: { left: 108, size: 26, top: 35 },
    top: { left: 44, size: 18, top: 15 },
  },
  sprite: "inscriber" as const,
  upgrades: {
    height: 68,
    left: 177,
    slotLeft: 186,
    slots: 3,
    slotSize: 18,
    slotTop: 7,
    top: 0,
    width: 35,
  },
  width: 212,
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
