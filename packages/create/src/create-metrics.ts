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
  packageFilter: { atlas: "filters-2", height: 79, width: 218, x: 0, y: 0 },
  schedule: { atlas: "schedule", height: 226, width: 256, x: 0, y: 0 },
  scheduleEditor: { atlas: "schedule-2", height: 89, width: 256, x: 0, y: 0 },
  scheduleEditorAdditionalSlot: { atlas: "schedule-2", height: 18, width: 32, x: 55, y: 47 },
  scheduleEditorInactiveSlot: { atlas: "schedule-2", height: 18, width: 18, x: 0, y: 91 },
  schematicannonBottom: { atlas: "schematics-2", height: 99, width: 213, x: 0, y: 119 },
  schematicannonChecklistProgress: { atlas: "schematics-2", height: 14, width: 16, x: 191, y: 240 },
  schematicannonFuel: { atlas: "schematics-2", height: 16, width: 47, x: 28, y: 222 },
  schematicannonFuelCreative: { atlas: "schematics-2", height: 16, width: 47, x: 28, y: 239 },
  schematicannonHighlight: { atlas: "schematics-2", height: 26, width: 26, x: 1, y: 229 },
  schematicannonProgress: { atlas: "schematics-2", height: 16, width: 114, x: 76, y: 239 },
  schematicannonTop: { atlas: "schematics-2", height: 42, width: 213, x: 0, y: 77 },
  schematicTable: { atlas: "schematics", height: 85, width: 214, x: 10, y: 139 },
  schematicTableProgress: { atlas: "schematics", height: 16, width: 84, x: 10, y: 224 },
  schematicTitle: { atlas: "schematics-2", height: 15, width: 205, x: 0, y: 0 },
  station: { atlas: "schedule-2", height: 127, width: 200, x: 0, y: 111 },
  stationAssembling: { atlas: "assemble", height: 178, width: 200, x: 0, y: 0 },
  stationTextboxBottom: { atlas: "assemble", height: 4, width: 150, x: 1, y: 200 },
  stationTextboxMiddle: { atlas: "assemble", height: 1, width: 150, x: 1, y: 198 },
  stationTextboxSpeech: { atlas: "assemble", height: 6, width: 8, x: 152, y: 179 },
  stationTextboxTop: { atlas: "assemble", height: 18, width: 150, x: 1, y: 179 },
  stockKeeperBody: { atlas: "stock-keeper", height: 20, width: 256, x: 0, y: 48 },
  stockKeeperCategoryHidden: { atlas: "stock-keeper", height: 8, width: 8, x: 143, y: 176 },
  stockKeeperCategoryShown: { atlas: "stock-keeper", height: 8, width: 8, x: 151, y: 176 },
  stockKeeperFooter: { atlas: "stock-keeper", height: 80, width: 256, x: 0, y: 80 },
  stockKeeperHeader: { atlas: "stock-keeper", height: 36, width: 256, x: 0, y: 0 },
  stockKeeperLocked: { atlas: "stock-keeper", height: 16, width: 15, x: 16, y: 176 },
  stockKeeperScrollBot: { atlas: "stock-keeper", height: 5, width: 5, x: 219, y: 207 },
  stockKeeperScrollMid: { atlas: "stock-keeper", height: 9, width: 5, x: 219, y: 197 },
  stockKeeperScrollTop: { atlas: "stock-keeper", height: 4, width: 5, x: 219, y: 192 },
  stockKeeperSearch: { atlas: "stock-keeper", height: 18, width: 142, x: 57, y: 17 },
  stockKeeperSendHover: { atlas: "stock-keeper", height: 20, width: 80, x: 55, y: 200 },
  stockKeeperSlot: { atlas: "stock-keeper", height: 18, width: 18, x: 32, y: 200 },
  stockKeeperUnlocked: { atlas: "stock-keeper", height: 16, width: 15, x: 32, y: 176 },
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
  disable: { x: 128, y: 160 },
  dontReplace: { x: 0, y: 32 },
  ignoreData: { x: 224, y: 0 },
  openFolder: { x: 32, y: 16 },
  pause: { x: 16, y: 80 },
  placementSettings: { x: 48, y: 80 },
  play: { x: 0, y: 80 },
  priorityLow: { x: 80, y: 0 },
  priorityVeryHigh: { x: 112, y: 0 },
  priorityVeryLow: { x: 64, y: 0 },
  refresh: { x: 48, y: 16 },
  replaceAny: { x: 32, y: 32 },
  replaceEmpty: { x: 48, y: 32 },
  replaceSolid: { x: 16, y: 32 },
  respectData: { x: 208, y: 0 },
  skipBlockEntities: { x: 32, y: 48 },
  skipMissing: { x: 16, y: 48 },
  stop: { x: 32, y: 80 },
  toolbox: { x: 176, y: 48 },
  trash: { x: 16, y: 0 },
  viewSchedule: { x: 192, y: 48 },
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

/**
 * 蓝图炮界面（`SchematicannonScreen` + `SchematicannonMenu`，
 * SCHEMATICANNON_TOP 213×42 + BOTTOM 213×99 + 2 + 玩家背包 108）。
 * 窗口 213×251；槽位照菜单坐标 −1（蓝图 15,65 / 蓝图产物 171,65 / 清单书
 * 134,19 / 清单产物 174,19 / 火药 15,19）；打印进度 (44,64) 114×16、清单打印
 * 进度 (154,20) 16×14（左→右生长）；燃料条 (36,19) 47×16；状态文字中线 x=103。
 * 指示条 18×6（上游 widgets atlas 未同步，按取样色 CSS 绘制）。
 */
export const CREATE_SCHEMATICANNON = {
  buttons: {
    confirm: { left: 180, top: 111 },
    pause: { left: 93, top: 85 },
    play: { left: 75, top: 85 },
    reset: { left: 111, top: 85 },
    settings: { left: 8, top: 111 },
    settingsReplace: { left: 33, step: 18, top: 111 },
    skipBlockEntities: { left: 135, top: 111 },
    skipMissing: { left: 111, top: 111 },
  },
  checklistProgress: { left: 154, top: 20 },
  fuel: { left: 36, top: 19 },
  height: 251,
  highlight: { left: 10, top: 60 },
  indicators: { pause: { left: 93, top: 79 }, play: { left: 75, top: 79 }, reset: { left: 111, top: 79 } },
  player: { hotbarY: 218, x: 36, y: 160 },
  progress: { left: 44, top: 64 },
  slots: {
    blueprintOutput: { left: 170, top: 64 },
    gunpowder: { left: 14, top: 18 },
    listOutput: { left: 173, top: 18 },
    listPrinter: { left: 133, top: 18 },
    schematic: { left: 14, top: 64 },
  },
  status: { centerX: 103, top: 53 },
  title: { top: 2 },
  width: 213,
} as const;

/**
 * 指示条状态色（widgets.png INDICATOR_* 18×6 中线取样，
 * 上游 widgets atlas 未同步，本包以 CSS 渐变绘制）。
 */
export const CREATE_INDICATOR_COLORS = {
  green: "linear-gradient(90deg, #55be00, #89ee1b, #5cc403)",
  off: "#2b2b2b",
  red: "linear-gradient(90deg, #9c1800, #e64313, #a71e00)",
  white: "linear-gradient(90deg, #c0c0c0, #ffffff, #c8c8c8)",
  yellow: "linear-gradient(90deg, #d0a734, #fff247, #dbb334)",
} as const;

export type CreateIndicatorState = keyof typeof CREATE_INDICATOR_COLORS;

/**
 * 包裹过滤器界面（`PackageFilterScreen` + `PackageFilterMenu`，
 * PACKAGE_FILTER 218×79）。
 * 窗口 218×191（79 + 4 + 108）；上游无幽灵槽与模式按钮，只有地址输入框
 * (44,28) 129×9（白字）；重置/确认按钮在背板右下 (156/185,55)；玩家背包按
 * 菜单偏移 40,101 −1。上游 (16,23) 另渲染手持包裹 3D 物品（无贴图，省略）。
 */
export const CREATE_PACKAGE_FILTER = {
  address: { left: 44, top: 28, width: 129 },
  buttons: { confirm: { left: 185, top: 55 }, reset: { left: 156, top: 55 } },
  height: 191,
  player: { hotbarY: 158, x: 39, y: 100 },
  title: { top: 4 },
  width: 218,
} as const;

/**
 * 列车时刻表元素贴图（schedule.png atlas 内区域，`AllGuiTextures`）。
 */
export const CREATE_SCHEDULE_SPRITES = {
  cardDuplicate: { height: 12, width: 12, x: 65, y: 243 },
  cardMoveDown: { height: 12, width: 12, x: 65, y: 230 },
  cardMoveUp: { height: 12, width: 12, x: 51, y: 230 },
  cardNew: { height: 16, width: 16, x: 79, y: 239 },
  cardRemove: { height: 12, width: 12, x: 51, y: 243 },
  conditionAppend: { height: 10, width: 10, x: 150, y: 245 },
  conditionItem: { height: 16, width: 18, x: 125, y: 239 },
  conditionLeft: { height: 16, width: 6, x: 116, y: 239 },
  conditionLeftClean: { height: 16, width: 2, x: 147, y: 239 },
  conditionNew: { height: 16, width: 19, x: 96, y: 239 },
  conditionRight: { height: 16, width: 2, x: 144, y: 239 },
  pointer: { height: 16, width: 21, x: 185, y: 239 },
  pointerOffscreen: { height: 16, width: 13, x: 171, y: 239 },
  scrollLeft: { height: 8, width: 4, x: 161, y: 247 },
  scrollRight: { height: 8, width: 4, x: 166, y: 247 },
  stripAction: { height: 16, width: 11, x: 209, y: 239 },
  stripDotted: { height: 16, width: 11, x: 23, y: 239 },
  stripEnd: { height: 16, width: 11, x: 34, y: 239 },
  stripTravel: { height: 16, width: 11, x: 12, y: 239 },
  stripWait: { height: 16, width: 11, x: 1, y: 239 },
} as const;

/**
 * 列车时刻表卡片底色（schedule.png 1×1 拉伸条取样：
 * SCHEDULE_CARD_DARK/MEDIUM/LIGHT 与 STRIP_DARK/LIGHT）。
 */
export const CREATE_SCHEDULE_CARD_COLORS = {
  cardDark: "#393939",
  cardLight: "#6f6f6f",
  cardMedium: "#575757",
  stripDark: "#bd905a",
  stripLight: "#ffb55a",
} as const;

/**
 * 列车时刻表界面（`ScheduleScreen` + `ScheduleMenu`，SCHEDULE 256×226）。
 * 确认 (214,196)、循环 (21,196)、进度重置 (45,196)、跳过 (63,196)；
 * 竖向路线条 x=33 (16..189)；卡片原点 (25,25)、宽 195、题头 22；视口裁剪
 * (16,16)–(236,189)；指针渲染在窗口 x=0。编辑浮层：schedule_2 编辑板绘制在
 * (−2,40)，玩家背包贴图 (38,122)（上游越出窗口 4px，本实现保持原样），
 * 目标槽 (53+20i,87)、滚动选择 (56,65,143,16)、确认 (224,87)、删除 (11,87)。
 */
export const CREATE_TRAIN_SCHEDULE = {
  buttons: { confirm: { left: 214, top: 196 }, cyclic: { left: 21, top: 196 }, reset: { left: 45, top: 196 }, skip: { left: 63, top: 196 } },
  card: { header: 22, left: 25, top: 25, width: 195 },
  editor: {
    confirm: { left: 224, top: 87 },
    delete: { left: 11, top: 87 },
    panel: { left: -2, top: 40 },
    player: { left: 38, top: 122 },
    select: { label: { left: 59, top: 69 }, left: 56, top: 65, width: 143 },
    slots: { left: 53, step: 20, top: 87 },
    title: { top: 44 },
  },
  height: 226,
  pointerLeft: 0,
  scissor: { height: 173, left: 16, top: 16, width: 220 },
  strip: { left: 33, top: 16 },
  title: { top: 4 },
  width: 256,
} as const;

/**
 * 列车站台元素贴图（schedule_2 / assemble atlas 内区域）。
 */
export const CREATE_STATION_SPRITES = {
  assembleTrain: { height: 16, width: 24, x: 64, y: 239 },
  disassembleTrain: { height: 16, width: 24, x: 39, y: 239 },
  editName: { height: 13, width: 13, x: 0, y: 239 },
  editTrainName: { height: 13, width: 13, x: 89, y: 239 },
  newTrain: { height: 16, width: 24, x: 14, y: 239 },
} as const;

/**
 * 列车站台界面（`StationScreen` / `AssemblyScreen` + `AbstractStationScreen`）。
 * 空闲模式 STATION 200×127：站名 (23,4) 宽 180、车厢名 (23,47) 宽 125（上游
 * 居中放置，此处整行居中绘制 + 行尾铅笔图标）、确认 (167,103)、新建列车
 * (84,65) / 拆解 (94,65) 24×16、丢下时刻表 (73,65) 18×18、车厢门物品 (14,103)、
 * 空闲文字中线 x=97 (47)；列车停靠时文字框 TOP (21,42) 150×18 + 中段拉伸 26 +
 * BOTTOM (21,86)，对话泡 y=38（x 在 25..159 间跟随列车，展示态取下限 25）。
 * 组装模式 STATION_ASSEMBLING 200×178：图标选择 (4,17,162,14)、关闭 (167,154)、
 * 开始组装 (94,154) / 退出 (73,154)、状态文字中线 x=97 (47)、说明文字 (28,62)
 * 宽 134。
 */
export const CREATE_TRAIN_STATION = {
  assembling: {
    buttons: { close: { left: 167, top: 154 }, quit: { left: 73, top: 154 }, toggle: { left: 94, top: 154 } },
    howTo: { left: 28, top: 62, width: 134 },
    iconType: { left: 4, top: 17, width: 162 },
    status: { centerX: 97, top: 47 },
  },
  idle: {
    buttons: {
      confirm: { left: 167, top: 103 },
      disassemble: { left: 94, top: 65 },
      dropSchedule: { left: 73, top: 65 },
      newTrain: { left: 84, top: 65 },
    },
    door: { left: 14, top: 103 },
    idleText: { centerX: 97, top: 47 },
    name: { left: 23, top: 4, width: 180 },
    textbox: { bottom: { top: 86 }, left: 21, middle: { height: 26, top: 60 }, speechX: 25, top: 42 },
    trainName: { left: 23, top: 47, width: 125 },
  },
} as const;

/**
 * 库存管理员（物流站）请求界面（`StockKeeperRequestScreen` +
 * `StockKeeperRequestMenu`，HEADER 256×36 + BODY 256×20×N + FOOTER 256×80）。
 * 窗口宽 226，高 = 36 + bodyRows×20 + 80（上游随屏幕高度自适应，本实现由
 * bodyRows 注入）；背板整体左移 15px 绘制；物品网格 9×N 列、20px 栅格、
 * 起点 (24,33)；搜索框贴图 (42,17)、输入 (71,22) 宽 100；锁定 (186,18)；
 * 滚动条 x=204 (y=15 起，高 窗口高−92)；下单行 y=高度−72；发送按钮热区
 * (143,高度−39) 78×18、悬停贴图 (145,高度−41)、文字中线 x=184；地址输入
 * (27,高度−36) 宽 92。上游左侧渲染库存管理员 3D 实体（无实体渲染，省略）。
 */
export const CREATE_STOCK_KEEPER = {
  address: { bottom: 36, left: 27, width: 92 },
  columns: 9,
  colWidth: 20,
  footerHeight: 80,
  headerHeight: 36,
  items: { left: 24, top: 33 },
  lock: { left: 186, top: 18 },
  orderBottom: 72,
  playerTitle: { left: 113, top: 4 },
  rowHeight: 20,
  scissor: { bottom: 80, left: 21, right: 205, top: 17 },
  scrollbar: { left: 204, top: 15, width: 5 },
  search: { left: 42, top: 17 },
  searchBox: { left: 71, top: 22, width: 100 },
  send: { hit: { bottom: 39, height: 18, left: 143, width: 78 }, hover: { bottom: 41, left: 145 }, text: { bottom: 35, centerX: 184 } },
  width: 226,
} as const;
