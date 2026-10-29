/**
 * Thermal Expansion 布局常量（坐标为面板 GUI px，1 源 px = 1 GUI px）。
 * 来源：CoFH/ThermalExpansion 24a2675 `cofh.thermal.expansion.client.gui.MachineFurnaceScreen`、
 * CoFH/ThermalCore cc7c230 `EnergyCellScreen` / `ItemCellScreen`（注释保留的布局）与
 * CoFH/CoFHCore dcd7bd6 `GuiHelper` / `ElementScaled` / `ElementEnergyStorage` 的常量与贴图实测。
 */

/**
 * 标准容器界面（CoFH 容器贴图 256×256 画布中的窗口区域）
*/
export const THERMAL_GUI = { height: 166, width: 176 } as const;

/**
 * 标准槽位（GuiHelper.SLOT_SIZE，slot.png 18×18）
*/
export const THERMAL_SLOT_SIZE = 18;

/**
 * 大槽位（slot_large.png 26×26）
*/
export const THERMAL_LARGE_SLOT = 26;

/**
 * 进度箭头（GuiHelper.PROGRESS=24，progress_arrow_right.png 64×16 图集：左 24 背景、其右 24 填充）
*/
export const THERMAL_PROGRESS_ARROW = {
  fillCrop: { height: 16, width: 24, x: 24, y: 0 },
  height: 16,
  trackCrop: { height: 16, width: 24, x: 0, y: 0 },
  width: 24,
} as const;

/**
 * 处理速度火焰（scale_flame.png 32×16 图集：左 16 背景、右 16 填充，自下而上）
*/
export const THERMAL_SPEED_FLAME = {
  fillCrop: { height: 16, width: 16, x: 16, y: 0 },
  height: 16,
  trackCrop: { height: 16, width: 16, x: 0, y: 0 },
  width: 16,
} as const;

/**
 * 能量表（storage_energy.png 32×64 图集：左 16 背景、右 16 填充；
 * ElementEnergyStorage 自下而上填充，上下各内缩 1）。
 * 机器基座在 (8,8)（MachineScreen），储能方块在 (80,22)（EnergyCellScreen）。
 */
export const THERMAL_ENERGY_GAUGE = {
  cell: { height: 42, left: 80, top: 22, width: 16 },
  fillCrop: { height: 40, width: 16, x: 16, y: 1 },
  machine: { height: 42, left: 8, top: 8, width: 16 },
  trackCrop: { height: 42, width: 16, x: 0, y: 0 },
} as const;

/**
 * 物品缓存条（GuiHelper.createDefaultItemStorage 默认 16×34，
 * storage_energy.png 图集同构：左 16 背景、右 16 填充，上下各内缩 1）。
 */
export const THERMAL_ITEM_GAUGE = {
  fillCrop: { height: 32, width: 16, x: 16, y: 1 },
  height: 34,
  left: 80,
  top: 36,
  trackCrop: { height: 34, width: 16, x: 0, y: 0 },
  width: 16,
} as const;

/**
 * 储能/缓存方块界面共用：进出料图标、数值文本与 ± 按钮行（EnergyCellScreen 坐标）
*/
export const THERMAL_CELL_CONTROLS = {
  /**
  * 数值文本行 y
  */
  amountTextTop: 42,
  /**
  * ± 按钮（button_increment/decrement.png 42×14 图集：0 正常、14 悬停、28 禁用）
  */
  button: { height: 14, width: 14 },
  buttons: {
    inputDecrement: { left: 19, top: 56 },
    inputIncrement: { left: 35, top: 56 },
    outputDecrement: { left: 127, top: 56 },
    outputIncrement: { left: 143, top: 56 },
  },
  /**
  * info_input / info_output 图标（20×20）
  */
  icons: {
    input: { left: 24, size: 20, top: 16 },
    output: { left: 132, size: 20, top: 16 },
  },
  /**
  * 数值文本中心 x（getCenteredOffset(input, 34) / 142）
  */
  textCenters: { input: 34, output: 142 },
} as const;

/**
 * 上游 renderLabels 文本色（EnergyCellScreen 0x404040）
*/
export const THERMAL_TEXT_COLOR = "#404040";

/**
 * 强化面板（AugmentPanel）：右侧滑出 102×92，
 * 绿色槽区边框 (18,20) 60×60（backgroundColor 0x089e4c × 0.6），
 * 槽位 3×3 起始 (24,24)、间距 18（ElementAugmentSlots）。
 */
export const THERMAL_AUGMENT_PANEL = {
  border: { height: 60, left: 18, top: 20, width: 60 },
  borderColor: "#055f2e",
  height: 92,
  icon: { left: 18, size: 16, top: 3 },
  slots: { count: 9, gap: 18, origin: { left: 24, top: 24 }, size: 18 },
  title: "强化",
  titleLeft: 18,
  titleTop: 6,
  width: 102,
} as const;

/**
 * 机器右侧强化页签按钮（icon_augment 16×16，贴在窗口右缘）
*/
export const THERMAL_AUGMENT_TAB = {
  height: 16,
  left: 176,
  top: 4,
  width: 16,
} as const;
