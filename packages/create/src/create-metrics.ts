/**
 * Create 布局常量（坐标为面板 GUI px，1 源 px = 1 GUI px）。
 * 来源：Create `4148fd8d`（mc1.21.1/dev）的 `AllGuiTextures` / `AllIcons` /
 * 各 Screen、Menu 类常量与 atlas 实测。
 */

/**
 * atlas 内区域（源 PNG px）。Create GUI 贴图是 256×256 索引色整图。
*/
export const CREATE_ATLAS = {
  filter: { atlas: "filters", height: 99, width: 214, x: 0, y: 0 },
  schematicTable: { atlas: "schematics", height: 85, width: 214, x: 10, y: 139 },
  schematicTableProgress: { atlas: "schematics", height: 16, width: 84, x: 10, y: 224 },
  toolbox: { atlas: "toolbox", height: 171, width: 188, x: 0, y: 0 },
  valueSettingsBar: { atlas: "value-settings", height: 8, width: 249, x: 7, y: 0 },
  valueSettingsMilestone: { atlas: "value-settings", height: 8, width: 7, x: 0, y: 0 },
  valueSettingsWideMilestone: { atlas: "value-settings", height: 8, width: 13, x: 75, y: 14 },
} as const;

/**
 * `AllIcons` 16×16 图标在 icons atlas 上的坐标（newRow/next 序列推算）。
*/
export const CREATE_ICONS = {
  add: { x: 0, y: 0 },
  blacklist: { x: 128, y: 0 },
  confirm: { x: 0, y: 16 },
  ignoreData: { x: 224, y: 0 },
  openFolder: { x: 32, y: 16 },
  refresh: { x: 48, y: 16 },
  respectData: { x: 208, y: 0 },
  toolbox: { x: 176, y: 48 },
  whitelist: { x: 144, y: 0 },
  whitelistAnd: { x: 176, y: 0 },
  whitelistNot: { x: 192, y: 0 },
  whitelistOr: { x: 160, y: 0 },
} as const;

/**
 * Create IconButton：18×18 底座 + 16×16 图标。
*/
export const CREATE_ICON_BUTTON = { icon: 16, size: 18 } as const;

/**
 * 筛选器界面（`FilterScreen` + `FilterMenu`，FILTER 214×99）。
 * 上游 2×9 幽灵槽网格 (23,25)、四枚两态按钮 (18/36/60/78, 75)；
 * AND/OR 为 `AttributeFilterScreen` 的白名单连接词，扩列到 (100/118, 75)。
 * 玩家背包居中 (19,121)。
 */
export const CREATE_FILTER = {
  buttons: {
    allow: { left: 36, top: 75 },
    and: { left: 100, top: 75 },
    deny: { left: 18, top: 75 },
    ignoreData: { left: 78, top: 75 },
    or: { left: 118, top: 75 },
    respectData: { left: 60, top: 75 },
  },
  grid: { columns: 9, left: 23, rows: 2, top: 25 },
  height: 211,
  player: { hotbarY: 178, x: 37, y: 120 },
  width: 214,
} as const;

/**
 * 工具箱界面（`ToolboxScreen` + `ToolboxMenu`，TOOLBOX 188×171）。
 * 窗口 218×255（BG 绘制在 +30），8 个隔层代表槽的菜单坐标照抄上游
 * xOffsets/yOffsets；玩家背包在 leftPos（窗口 x=0）、y=147。
 */
export const CREATE_TOOLBOX = {
  background: { left: 30, top: 0 },
  buttons: {
    confirm: { left: 185, top: 147 },
    dispose: { left: 111, top: 69 },
  },
  /**
  * 顶部 8 色染料配色条（上游为 RadialToolboxMenu 转盘，此处按行摆放）
  */
  colorBar: { left: 45, size: 8, step: 12, top: 14 },
  compartments: [
    { left: 79, top: 37 },
    { left: 112, top: 31 },
    { left: 145, top: 37 },
    { left: 151, top: 70 },
    { left: 145, top: 103 },
    { left: 112, top: 109 },
    { left: 79, top: 103 },
    { left: 73, top: 70 },
  ],
  height: 255,
  player: { hotbarY: 222, x: 7, y: 164 },
  title: { left: 45, top: 4 },
  width: 218,
} as const;

/**
 * 8 色染料条颜色（原版染料色）。
*/
export const CREATE_TOOLBOX_COLORS = [
  "#f9fffe",
  "#f9801d",
  "#c74ebd",
  "#3ab3da",
  "#fed83d",
  "#80c71f",
  "#f38baa",
  "#3e4447",
] as const;

/**
 * 蓝图桌界面（`SchematicTableScreen` + `SchematicTableMenu`，SCHEMATIC_TABLE 214×85）。
 * 窗口 214×197（85 + 4 + 108）；输入槽 (21,59)、输出槽 (166,59)、
 * 进度条 (70,59) 84×16（左→右生长）；确认按钮 (44,56)。
 */
export const CREATE_SCHEMATIC_TABLE = {
  background: { left: 0, top: 0 },
  buttons: {
    confirm: { left: 44, top: 56 },
    openFolder: { left: 20, top: 21 },
    refresh: { left: 206, top: 21 },
  },
  height: 197,
  player: { hotbarY: 164, x: 37, y: 106 },
  progress: { left: 70, top: 59 },
  slots: {
    input: { left: 21, top: 59 },
    output: { left: 166, top: 59 },
  },
  title: { top: 4 },
  width: 214,
} as const;

/**
 * 数值配置浮层（`ValueSettingsScreen` + `ValueSettingsBoard`）。
 * 轨道 `VALUE_SETTINGS_BAR` 249×8、里程碑 7×8、宽里程碑 13×8；
 * 上游为无底座浮层（UIRenderHelper 深色半透明底）。
 */
export const CREATE_VALUE_SETTINGS = {
  bar: { height: 8, width: 249 },
  milestone: { height: 8, width: 7, x: 0, y: 0 },
  /**
  * 每 N 格一个里程碑（board.milestoneInterval 上游默认 8）
  */
  milestoneInterval: 8,
  wideMilestone: { height: 8, width: 13, x: 75, y: 14 },
} as const;
