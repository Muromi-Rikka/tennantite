/**
 * AE2（应用能源 2）屏幕布局常量。
 *
 * 终端家族（ME 终端 / 合成终端）直接使用 AE2 1.12.2 的 GUI 贴图切片
 * （`terminal.png` / `crafting.png`，见 `@tennantite/textures` 的
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

/**
 * 样式编码终端（`GuiPatternTerm`，1.12 rv6 `pattern.png` / `pattern2.png`）：
 * 与终端同构的五段切片，header 18 px（`GuiMEMonitorable.drawBG` 的 x_width=197，
 * 面板艺术宽 195，与 `AE2_TERMINAL` 一致）；bottom 切片取 src y=72（跳过上游
 * 底片前 2 px 与行区的重叠），使总高恰为上游 `ySize = 196 + 18·rows`。
 * 编码区槽位坐标按 `ContainerPatternTerm` + `repositionSlot`（非玩家槽 +3）：
 * 3×3 合成格 (18, ySize−157) 起、输出列 x=110、图样槽 x=147。
 */
export const AE2_PATTERN_SLICES = {
  bottom: { height: 178, y: 72 },
  firstRow: { height: 18, y: 18 },
  header: { height: 18, y: 0 },
  lastRow: { height: 18, y: 18 },
  row: { height: 18, y: 18 },
} as const;

export const AE2_PATTERN_TERMINAL = {
  columns: 9,
  craftGrid: { left: 18, rowTopFromBottom: 157, size: 18 },
  craftResult: { left: 110, size: 18, topFromBottom: 139 },
  encodeButton: { left: 147, size: 16, topFromBottom: 142 },
  encodeShift: { left: 100, size: 8, topFromBottom: 138 },
  encodeShiftX3: { left: 128, size: 8, topFromBottom: 158 },
  gridLeft: 7,
  gridTop: 18,
  headerHeight: 18,
  modeTab: { left: 173, size: 20, topFromBottom: 177 },
  outputs: { left: 110, rowTopsFromBottom: [157, 139, 121], size: 18 },
  panelWidth: 195,
  patternIn: { left: 147, size: 18, topFromBottom: 162 },
  patternOut: { left: 147, size: 18, topFromBottom: 119 },
  rowHeight: 18,
  scrollbar: { left: 175, top: 18 },
  search: { height: 12, left: 80, top: 4, width: 89 },
  slotSize: 18,
  sprite: "pattern" as const,
  spriteProcessing: "pattern2" as const,
  substitution: { left: 84, size: 8, topFromBottom: 163 },
  utilityClear: { left: 74, size: 8, topFromBottom: 163 },
} as const;

export function ae2PatternTerminalHeight(rows: number): number {
  const clampedRows = Math.max(2, Math.floor(rows));
  return AE2_PATTERN_TERMINAL.headerHeight
    + clampedRows * AE2_PATTERN_TERMINAL.rowHeight
    + AE2_PATTERN_SLICES.bottom.height;
}

/**
 * 合成状态 CPU 选择表（`GuiCraftingStatus` 的 `cpu_selector.png`）：
 * 94×164 列表面板（header 18 + 6 行 67×23 行块 + 右侧 12 宽滚动条轨道），
 * 行块底图取 src (100,0,67,23)（面板外的高亮条，按选中/悬停着色）。
 * 坐标取自 `GuiCraftingStatus.java` 的 CPU_TABLE_* 常量。
 */
export const AE2_CPU_SELECTOR = {
  height: 164,
  row: { height: 23, left: 9, top: 19, width: 67 },
  rowHighlight: { height: 23, width: 67, x: 100, y: 0 },
  rows: 6,
  scrollbar: { height: 137, left: 78, top: 19, width: 12 },
  width: 94,
} as const;

/**
 * 合成 CPU / 合成状态监控（`GuiCraftingCPU`，`craftingcpu.png` 238×184）：
 * 3 列 × 6 行任务区块（67×23/格）、右侧滚动条、右下取消按钮；
 * 区块内物品图标占右侧 16×16，状态文字右对齐到图标左缘（贴图格子
 * 内容区左 48 × 高 22，即 `textTop`/`textWidth`），换行由调用方文案
 * 决定；底部条带内叠加一条合成进度（计划约定：进度条用 ModProgress，
 * `craftingcpu.png` 本身没有烘焙进度轨）。
 */
export const AE2_CRAFTING_CPU = {
  cancel: { height: 20, left: 163, top: 159, width: 50 },
  height: 184,
  progress: { height: 12, left: 8, top: 165, width: 140 },
  scrollbar: { height: 137, left: 218, top: 19 },
  sections: {
    columns: 3,
    firstIconLeft: 57,
    firstIconTop: 22,
    iconSize: 16,
    left: 9,
    rowHeight: 23,
    rows: 6,
    sectionWidth: 67,
    textTop: 19,
    textWidth: 48,
    top: 22,
  },
  title: { left: 8, top: 7 },
  width: 238,
} as const;

/**
 * 分子装配室（`GuiMAC`，`mac.png`）：211×197 面板 + 右侧 35 宽升级槽条
 * （5 槽，src (177,0,35,104)）。3×3 装配格 (29,30)、图样槽 (126,16)、
 * 输出槽 (126,48)；竖直进度条 (148,48) 6×18，填充 src (148,201)
 * （`GuiMAC` 构造 (139,36,148,201) 后在 drawBG 把位置改为 (148,48)）。
 */
export const AE2_MAC = {
  craftGrid: { left: 29, size: 18, top: 30 },
  height: 197,
  output: { left: 126, size: 18, top: 48 },
  panel: { height: 197, width: 211, x: 0, y: 0 },
  pattern: { left: 126, size: 18, top: 16 },
  player: { hotbarTop: 172, mainTop: 114, titleTop: 104 },
  progress: {
    direction: "up" as const,
    fill: { height: 18, width: 6, x: 148, y: 201 },
    height: 18,
    left: 148,
    top: 48,
    width: 6,
  },
  sprite: "mac" as const,
  upgrades: { count: 5, left: 187, size: 18, slotTop: 8, stripHeight: 104 },
  width: 211,
} as const;

/**
 * 量子链接仓（`GuiQNB`，`qbgui.png` 176×166）：奇点槽 (80,37)、
 * 量子卡槽 (80,55)（两个槽位在贴图中烘焙，可选渲染）。
 */
export const AE2_QNB = {
  card: { left: 80, size: 18, top: 55 },
  height: 166,
  player: { hotbarTop: 141, mainTop: 83, titleTop: 73 },
  singularity: { left: 80, size: 18, top: 37 },
  sprite: "qbgui" as const,
  width: 176,
} as const;

/**
 * 空间 IO 端口（`GuiSpatialIOPort`，`spatialio.png` 176×197）：
 * 输入/输出元件槽 (52,48)/(113,48)，五行状态文字（13,21/31/73/83/93）。
 */
export const AE2_SPATIAL_IO_PORT = {
  efficiency: { left: 13, top: 83 },
  height: 197,
  input: { left: 52, size: 18, top: 48 },
  maxPower: { left: 13, top: 31 },
  output: { left: 113, size: 18, top: 48 },
  player: { hotbarTop: 172, mainTop: 114, titleTop: 103 },
  regionSize: { left: 13, top: 93 },
  requiredPower: { left: 13, top: 73 },
  sprite: "spatialio" as const,
  storedPower: { left: 13, top: 21 },
  width: 176,
} as const;

/**
 * IO 端口（`GuiIOPort`，`io_port.png`）：211×166 面板 + 右侧 35 宽升级槽条
 * （3 槽）。左 2×3 输入元件 (19,17)、右 2×3 输出元件 (122,17)、
 * 面板内操作模式按钮 (80,17)；红石/满度按钮悬在面板左侧外（guiLeft−18）。
 */
export const AE2_IO_PORT = {
  height: 166,
  inputCells: { columns: 2, left: 19, rows: 3, size: 18, top: 17 },
  operationMode: { left: 80, size: 18, top: 17 },
  outputCells: { columns: 2, left: 122, rows: 3, size: 18, top: 17 },
  player: { hotbarTop: 141, mainTop: 83, titleTop: 73 },
  sprite: "ioPort" as const,
  toolbar: { left: -18, tops: [8, 28] },
  upgrades: { count: 3, left: 187, size: 18, slotTop: 8, stripHeight: 68 },
  width: 211,
} as const;

/**
 * 接口（`GuiInterface`，`interface.png` 211×256）：配置槽 9 格 (8,35)、
 * 存储槽 9 格 (8,53)、图样槽 4 行 ×9 (8,97)（后两行随样板扩展升级显示），
 * 右侧 35 宽升级槽条（4 槽）、右上优先级标签 (154,0)。
 * 行标题按 `GuiInterface.drawFG`：Config (8,24)、StoredItems (8,73)、Patterns (8,86)。
 */
export const AE2_INTERFACE = {
  config: { columns: 9, left: 8, size: 18, top: 35 },
  height: 256,
  labels: { config: { left: 8, top: 24 }, patterns: { left: 8, top: 86 }, storage: { left: 8, top: 73 } },
  patterns: { columns: 9, left: 8, rows: 4, size: 18, top: 97 },
  player: { hotbarTop: 231, mainTop: 173, titleTop: 163 },
  priority: { left: 154, top: 0 },
  sprite: "interface" as const,
  storage: { columns: 9, left: 8, size: 18, top: 53 },
  upgrades: { count: 4, left: 187, size: 18, slotTop: 8, stripHeight: 86 },
  width: 211,
} as const;

/**
 * 物质冷凝器（`GuiCondenser`，`condenser.png` 176×197）：
 * 垃圾槽 (51,52)、输出槽 (105,52)、存储元件槽 (101,26)、
 * 竖直储能进度条 (120,25) 6×18（填充 src (178,25)）、输出模式按钮 (128,52)。
 */
export const AE2_CONDENSER = {
  height: 197,
  modeButton: { left: 128, size: 18, top: 52 },
  output: { left: 105, size: 18, top: 52 },
  player: { hotbarTop: 172, mainTop: 114, titleTop: 104 },
  progress: {
    direction: "up" as const,
    fill: { height: 18, width: 6, x: 178, y: 25 },
    height: 18,
    left: 120,
    top: 25,
    width: 6,
  },
  sprite: "condenser" as const,
  storageCell: { left: 101, size: 18, top: 26 },
  trash: { left: 51, size: 18, top: 52 },
  width: 176,
} as const;

/**
 * 磨石（`GuiGrinder`，`grinder.png` 176×176）：矿石槽 3 格 (12,17)、
 * 中央杵槽 (80,40)（不可交互）、产物槽 3 格 (112,63)。
 */
export const AE2_GRINDSTONE = {
  height: 176,
  ores: { columns: 3, left: 12, size: 18, top: 17 },
  outputs: { columns: 3, left: 112, size: 18, top: 63 },
  pestle: { left: 80, size: 18, top: 40 },
  player: { hotbarTop: 151, mainTop: 93, titleTop: 83 },
  sprite: "grinder" as const,
  width: 176,
} as const;

/**
 * ME 天空石箱（`GuiSkyChest`，`skychest.png` 176×195）：36 格存储
 * （8,24 起 9 列 ×4 行）。
 */
export const AE2_SKY_CHEST = {
  height: 195,
  player: { hotbarTop: 170, mainTop: 112, titleTop: 101 },
  sprite: "skychest" as const,
  storage: { columns: 9, left: 8, rows: 4, size: 18, top: 24 },
  title: { left: 8, top: 8 },
  width: 176,
} as const;

/**
 * 优先级弹窗（`GuiPriority`，`priority.png` 176×107）：
 * 数值输入框 (62,57) 宽 59，加/减按钮两行（y=32 / y=69，四档宽度
 * 22/28/32/38，x=20/48/82/120），右上返回原界面标签 (154,0)。
 * 上游 `drawBG` 按 176×166 绘制，贴图艺术只有 107 高，面板取实测高度。
 */
export const AE2_PRIORITY_DIALOG = {
  field: { height: 12, left: 62, top: 57, width: 59 },
  height: 107,
  minusRow: { top: 69 },
  plusRow: { top: 32 },
  returnTab: { left: 154, size: 20, top: 0 },
  steps: [
    { left: 20, width: 22 },
    { left: 48, width: 28 },
    { left: 82, width: 32 },
    { left: 120, width: 38 },
  ],
  title: { left: 8, top: 6 },
  width: 176,
} as const;
