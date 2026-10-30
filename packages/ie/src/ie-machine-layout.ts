import type { IeSpriteName } from "@tennantite/textures";

/**
 * 机器界面数据驱动布局表（照 Mekanism 机器屏模式）。
 * 坐标为面板 GUI px。槽位为 18×18 槽框左上角 —— vanilla 把槽框画在
 * menu slot 左上 1px，物品图标画在 menu slot 处，两者相差 1；本表存槽框坐标，
 * 与 `ScreenItemSlot` / `PlayerInventory`（图标在框内居中）直接对齐。
 */

export interface IeLayoutSlot {
  /**
  * 测试与读屏用 label（同屏唯一）
  */
  label: string;
  left: number;
  top: number;
}

export interface IeLayoutSlotRow {
  /**
  * 同组槽位数量（按行优先排列）
  */
  count: number;
  label: string;
  left: number;
  /**
  * 每行槽位数（默认 1，即纵向一列）
  */
  perRow: number;
  /**
  * 列间距（GUI px，默认 18）
  */
  stepX?: number;
  /**
  * 行间距（GUI px，默认 18）
  */
  stepY?: number;
  top: number;
}

export interface IeMachineLayout {
  /**
   * 箭头进度区（高炉/合金炉 drawFlameAndArrow，贴图源区域 177,14,22,16）
   */
  arrow?: { height: number; left: number; top: number; width: number };
  /**
   * 背景贴图；上游无独立 GUI 纹理的屏（压机/电容）省略，由组件按 IE 通用范式重建
   */
  background?: IeSpriteName;
  /**
  * 重建屏的水平传送带进度区
  */
  belt?: { height: number; left: number; top: number; width: number };
  /**
  * 能量条（EnergyInfoArea 7×46）
  */
  energy?: { left: number; top: number };
  /**
   * 温室肥料条（FertilizerInfoArea 7×47，fillGradient 自下而上）
   */
  fertilizer?: {
    gradient: { from: string; to: string };
    height: number;
    left: number;
    top: number;
    width: number;
  };
  /**
  * 火焰进度（焦炉）
  */
  flame?: { left: number; top: number };
  height: number;
  /**
  * 背包标题 y（IEContainerScreen#init：imageHeight - 91）
  */
  inventoryLabelTop: number;
  player: { hotbarY: number; left: number; top: number };
  /**
   * 竖向进度条组（弧光炉/搅拌机，底锚填充）
   */
  progressBars?: {
    /**
     * 绘制宽（GUI px，默认 2）
     */
    drawWidth?: number;
    height: number;
    /**
     * 进度贴图（默认 sprites/arc_furnace/progress）
     */
    sprite?: IeSpriteName;
  } & IeLayoutSlotRow;
  /**
   * 刷新条（区块加载机 RefreshInfoArea，自背景贴图 (176,75,2,16) 区域自下而上填充）
   */
  refresh?: {
    crop: { height: number; width: number; x: number; y: number };
    height: number;
    label: string;
    left: number;
    top: number;
    width: number;
  };
  slots: Array<IeLayoutSlot | IeLayoutSlotRow>;
  /**
   * 精灵进度（温室 sprites/cloche/progress，自左向右裁剪）
   */
  spriteProgress?: {
    direction: "right";
    height: number;
    label: string;
    left: number;
    sprite: IeSpriteName;
    top: number;
    width: number;
  };
  /**
   * 液体罐（FluidInfoArea：填充区 + 居中 overlay）
   */
  tank?: {
    fill: { height: number; left: number; top: number; width: number };
    overlayName: IeSpriteName;
  };
  /**
   * 多液体罐组（精炼厂/装配器/搅拌机 MultitankArea；无 overlay 时只渲染填充色）
   */
  tanks?: Array<{
    fill: { height: number; left: number; top: number; width: number };
    label: string;
    overlayName?: IeSpriteName;
  }>;
  title: string;
  /**
   * 双态切换按钮（搅拌机输出模式 / 分批器批量模式：状态关/开贴图）
   */
  toggle?: {
    height: number;
    left: number;
    spriteOff: IeSpriteName;
    spriteOn: IeSpriteName;
    top: number;
    width: number;
  };
  width: number;
}

function row(count: number, label: string, left: number, perRow: number, top: number): IeLayoutSlotRow {
  return { count, label, left, perRow, top };
}

/**
 * 焦炉 CokeOvenScreen / CokeOvenMenu（menu 坐标 → 槽框 = menu-1）：输入 (30,35)、
 * 输出 (85,35)、流体容器槽 (152,17)、桶输出 (152,53)、火焰 (59,37)、
 * 罐 FluidInfoArea Rect2i(129,20,16,47) + 20×51 tank_overlay 居中偏移 (-2,-2)。
 */
const COKE_OVEN = {
  background: "coke_oven",
  flame: { left: 59, top: 37 },
  height: 166,
  inventoryLabelTop: 75,
  player: { hotbarY: 141, left: 7, top: 83 },
  slots: [
    { label: "coke-oven-input", left: 29, top: 34 },
    { label: "coke-oven-output", left: 84, top: 34 },
    { label: "coke-oven-fluid-container", left: 151, top: 16 },
    { label: "coke-oven-bucket-output", left: 151, top: 52 },
  ],
  tank: {
    fill: { height: 47, left: 129, top: 20, width: 16 },
    overlayName: "sprites/coke_oven/tank_overlay",
  },
  title: "焦炉",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 弧光炉 ArcFurnaceScreen（imageHeight 207）/ ArcFurnaceMenu（menu → 槽框 = menu-1）：
 * 12 输入 (10+i%3*21, 34+i/3*18)、4 添加剂 (114+i%2*18, 34+i/2*18)、
 * 6 输出 (78+i%3*18, 80+i/3*18)、炉渣输出 (132,98)、3 电极 (62/80/98, 10)、
 * 分配按钮 (10,10) 16×16、能量 (157,22)、进度条 x=27+i%3*21，y=34+i/3*18，2×16。
 */
const ARC_FURNACE = {
  background: "arc_furnace",
  energy: { left: 157, top: 22 },
  height: 207,
  inventoryLabelTop: 116,
  player: { hotbarY: 183, left: 7, top: 125 },
  progressBars: { count: 12, height: 16, label: "arc-furnace-progress", left: 27, perRow: 3, stepX: 21, stepY: 18, top: 34 },
  slots: [
    { count: 12, label: "arc-furnace-input", left: 9, perRow: 3, stepX: 21, top: 33 },
    row(4, "arc-furnace-additive", 113, 2, 33),
    row(6, "arc-furnace-output", 77, 3, 79),
    { label: "arc-furnace-slag-output", left: 131, top: 97 },
    row(3, "arc-furnace-electrode", 61, 3, 9),
  ],
  title: "弧光炉",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 金属压机：上游为多方块机器、1.21.1 无 GUI 容器（仅 JEI 配方分类
 * MetalPressRecipeCategory 100×50：输入 (1,13)、模具 (57,1)、输出 (83,13)）。
 * 按 IEContainerScreen 通用范式重建 176×166 机器屏：输入槽 → 传送带 → 输出槽，
 * 模具槽一列置于传送带上方。
 */
const METAL_PRESS = {
  belt: { height: 16, left: 46, top: 44, width: 78 },
  height: 166,
  inventoryLabelTop: 75,
  player: { hotbarY: 141, left: 7, top: 83 },
  slots: [
    { label: "metal-press-input", left: 24, top: 43 },
    { count: 3, label: "metal-press-mold", left: 64, perRow: 3, top: 20 },
    { label: "metal-press-output", left: 128, top: 43 },
  ],
  title: "金属压机",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 高压电容：上游 1.21.1 电容无 GUI 容器（能量以能量条与侧栏 HUD 呈现）。
 * 按 IEContainerScreen 范式重建 176×166：EnergyInfoArea 式竖向能量条（7×46）、
 * 存量/容量文本、IO 模式按钮（sprites/hud/square_in / square_out 18×18）。
 */
const CAPACITOR_HV = {
  energy: { left: 84, top: 35 },
  height: 166,
  inventoryLabelTop: 75,
  player: { hotbarY: 141, left: 7, top: 83 },
  slots: [
    { label: "capacitor-hv-mode-in", left: 24, top: 43 },
    { label: "capacitor-hv-mode-out", left: 42, top: 43 },
  ],
  title: "高压电容",
  width: 176,
} satisfies IeMachineLayout;

/** 分拣器 6 面过滤格（SorterMenu 幽灵槽 / FluidSorterScreen getSlotArea 公式展开；
 * 每面 = 3 上 + 2 中 + bottomCount 下） */
function sorterRows(prefix: string, x0: number, y0: number, bottomCount: number): Array<IeLayoutSlot | IeLayoutSlotRow> {
  const rows: Array<IeLayoutSlot | IeLayoutSlotRow> = [];
  for (let side = 0; side < 6; side++) {
    const left = x0 + (side / 2) * 58;
    const top = y0 + (side % 2) * 76;
    rows.push(
      row(3, `${prefix}-side${side}-top`, left, 3, top),
      { count: 2, label: `${prefix}-side${side}-middle`, left, perRow: 2, stepX: 36, top: top + 18 },
      row(bottomCount, `${prefix}-side${side}-bottom`, left, bottomCount, top + 36),
    );
  }
  return rows;
}

/**
 * 高炉 BlastFurnaceScreen / BlastFurnaceMenu（menu → 槽框 = menu-1）：
 * 输入 (52,17)、燃料 (52,53)、输出 (112,17)/(112,53)、火焰 (56,37)、
 * 箭头进度 (76,35,22,16，贴图源区域 177,14)。
 */
const BLAST_FURNACE = {
  arrow: { height: 16, left: 76, top: 35, width: 22 },
  background: "blast_furnace",
  flame: { left: 56, top: 37 },
  height: 166,
  inventoryLabelTop: 75,
  player: { hotbarY: 141, left: 7, top: 83 },
  slots: [
    { label: "blast-furnace-input", left: 51, top: 16 },
    { label: "blast-furnace-fuel", left: 51, top: 52 },
    { label: "blast-furnace-output", left: 111, top: 16 },
    { label: "blast-furnace-output-2", left: 111, top: 52 },
  ],
  title: "高炉",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 合金炉 AlloySmelterScreen / AlloySmelterMenu：输入 (38,17)/(66,17)、
 * 燃料 (52,53)、输出 (120,35)、火焰 (56,37)、箭头 (84,35,22,16)。
 */
const ALLOY_SMELTER = {
  arrow: { height: 16, left: 84, top: 35, width: 22 },
  background: "alloy_smelter",
  flame: { left: 56, top: 37 },
  height: 166,
  inventoryLabelTop: 75,
  player: { hotbarY: 141, left: 7, top: 83 },
  slots: [
    { label: "alloy-smelter-input", left: 37, top: 16 },
    { label: "alloy-smelter-input-2", left: 65, top: 16 },
    { label: "alloy-smelter-fuel", left: 51, top: 52 },
    { label: "alloy-smelter-output", left: 119, top: 34 },
  ],
  title: "合金炉",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 发酵器 FermenterScreen / FermenterMenu（imageHeight 167）：
 * 8 输入 (8+i%4*18, 19+i/4*18)、输出 (91,53)、流体容器 (134,17)、桶输出 (134,53)、
 * 罐 Rect2i(112,21,16,47) + fermenter/tank_overlay、能量 (158,22)。
 */
const FERMENTER = {
  background: "fermenter",
  energy: { left: 158, top: 22 },
  height: 167,
  inventoryLabelTop: 76,
  player: { hotbarY: 142, left: 7, top: 84 },
  slots: [
    row(8, "fermenter-input", 7, 4, 18),
    { label: "fermenter-output", left: 90, top: 52 },
    { label: "fermenter-fluid-container", left: 133, top: 16 },
    { label: "fermenter-bucket-output", left: 133, top: 52 },
  ],
  tank: {
    fill: { height: 47, left: 112, top: 21, width: 16 },
    overlayName: "sprites/fermenter/tank_overlay",
  },
  title: "发酵器",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 压榨机 SqueezerScreen / SqueezerMenu：8 输入 (8+i%4*18, 35+i/4*18)、
 * 其余同发酵器（squeezer/tank_overlay）。
 */
const SQUEEZER = {
  background: "squeezer",
  energy: { left: 158, top: 22 },
  height: 167,
  inventoryLabelTop: 76,
  player: { hotbarY: 142, left: 7, top: 84 },
  slots: [
    row(8, "squeezer-input", 7, 4, 34),
    { label: "squeezer-output", left: 90, top: 52 },
    { label: "squeezer-fluid-container", left: 133, top: 16 },
    { label: "squeezer-bucket-output", left: 133, top: 52 },
  ],
  tank: {
    fill: { height: 47, left: 112, top: 21, width: 16 },
    overlayName: "sprites/squeezer/tank_overlay",
  },
  title: "压榨机",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 精炼厂 RefineryScreen / RefineryMenu：催化剂 (73,26)、流体容器 (133,15)、
 * 桶输出 (133,54)；三罐 Rect2i(13/40/109,20,16,47) + refinery/tank_overlay、
 * 能量 (157,21)。
 */
const REFINERY = {
  background: "refinery",
  energy: { left: 157, top: 21 },
  height: 167,
  inventoryLabelTop: 76,
  player: { hotbarY: 142, left: 7, top: 84 },
  slots: [
    { label: "refinery-catalyst", left: 72, top: 25 },
    { label: "refinery-fluid-container", left: 132, top: 14 },
    { label: "refinery-bucket-output", left: 132, top: 53 },
  ],
  tanks: [
    { fill: { height: 47, left: 13, top: 20, width: 16 }, label: "精炼厂左输入罐", overlayName: "sprites/refinery/tank_overlay" },
    { fill: { height: 47, left: 40, top: 20, width: 16 }, label: "精炼厂右输入罐", overlayName: "sprites/refinery/tank_overlay" },
    { fill: { height: 47, left: 109, top: 20, width: 16 }, label: "精炼厂输出罐", overlayName: "sprites/refinery/tank_overlay" },
  ],
  title: "精炼厂",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 搅拌机 MixerScreen（imageHeight 167）/ MixerMenu：4 输入 (7+i%2*21, 7+i/2*18)、
 * 每输入竖向进度（贴图 mixer/progress 3×16 绘制 2×16，menu 坐标 24+i%2*21, 7+i/2*18）、
 * 多流体罐 MultitankArea Rect2i(76,11,58,47)、输出模式按钮 (106,61,30,16)、能量 (158,22)。
 */
const MIXER = {
  background: "mixer",
  energy: { left: 158, top: 22 },
  height: 167,
  inventoryLabelTop: 76,
  player: { hotbarY: 143, left: 7, top: 85 },
  progressBars: { count: 4, drawWidth: 2, height: 16, label: "mixer-progress", left: 24, perRow: 2, sprite: "sprites/mixer/progress", stepX: 21, stepY: 18, top: 7 },
  slots: [{ count: 4, label: "mixer-input", left: 6, perRow: 2, stepX: 21, top: 6 }],
  tanks: [{ fill: { height: 47, left: 76, top: 11, width: 58 }, label: "搅拌机多流体罐" }],
  title: "搅拌机",
  toggle: {
    height: 16,
    left: 106,
    spriteOff: "sprites/mixer/output_bottom",
    spriteOn: "sprites/mixer/output_all",
    top: 61,
    width: 30,
  },
  width: 176,
} satisfies IeMachineLayout;

/**
 * 温室 ClocheScreen / ClocheMenu：土壤 (62,54)、种子 (62,34)、肥料 (8,59)、
 * 4 输出 (116+i%2*18, 34+i/2*18)；罐 Rect2i(8,8,16,47) + cloche/tank_overlay、
 * 能量 (158,22)、肥料条 FertilizerInfoArea(30,22,7,47)、进度贴图 (101,36,12,12)。
 */
const CLOCHE = {
  background: "cloche",
  energy: { left: 158, top: 22 },
  fertilizer: {
    gradient: { from: "#95ed00", to: "#8a5a00" },
    height: 47,
    left: 30,
    top: 22,
    width: 7,
  },
  height: 167,
  inventoryLabelTop: 76,
  player: { hotbarY: 142, left: 7, top: 84 },
  slots: [
    { label: "cloche-soil", left: 61, top: 53 },
    { label: "cloche-seed", left: 61, top: 33 },
    { label: "cloche-fertilizer", left: 7, top: 58 },
    row(4, "cloche-output", 115, 2, 33),
  ],
  spriteProgress: {
    direction: "right",
    height: 12,
    label: "cloche-progress",
    left: 101,
    sprite: "sprites/cloche/progress",
    top: 36,
    width: 12,
  },
  tank: {
    fill: { height: 47, left: 8, top: 8, width: 16 },
    overlayName: "sprites/cloche/tank_overlay",
  },
  title: "温室",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 分拣器 SorterScreen（imageHeight 244）/ SorterMenu：6 面 × 9 幽灵过滤槽
 * （menu (4+面/2*58+…, 22+面%2*76+…)）、过滤按钮 (3+面/2*58+位*18, 3+面%2*76) 18×18。
 */
const SORTER = {
  background: "sorter",
  height: 244,
  inventoryLabelTop: 153,
  player: { hotbarY: 220, left: 7, top: 162 },
  slots: [...sorterRows("sorter-filter", 3, 21, 4)],
  title: "分拣器",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 流体分拣器 FluidSorterScreen（imageHeight 244）：48 个流体过滤区
 * （getSlotArea menu (4+面/2*58+…, 22+面%2*76+…) 16×16，非槽位框故不 -1）、
 * NBT 按钮 (21+面/2*58, 3+面%2*76) 18×18。
 */
const FLUID_SORTER = {
  background: "sorter",
  height: 244,
  inventoryLabelTop: 153,
  player: { hotbarY: 220, left: 7, top: 162 },
  slots: [...sorterRows("fluid-sorter-filter", 4, 22, 3)],
  title: "流体分拣器",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 物品分批器 ItemBatcherScreen（imageHeight 199）/ ItemBatcherMenu：
 * 9 幽灵过滤槽 (8+i*18,30)、9 缓冲槽 (8+i*18,59)、批量模式按钮 (7,92,18,18)、
 * 9 红石染色按钮 (12+i*18,77)。
 */
const ITEM_BATCHER = {
  background: "item_batcher",
  height: 199,
  inventoryLabelTop: 108,
  player: { hotbarY: 175, left: 7, top: 117 },
  slots: [
    row(9, "item-batcher-filter", 7, 9, 29),
    row(9, "item-batcher-buffer", 7, 9, 58),
  ],
  title: "物品分批器",
  toggle: {
    height: 18,
    left: 7,
    spriteOff: "sprites/item_batcher/mode_single",
    spriteOn: "sprites/item_batcher/mode_all",
    top: 92,
    width: 18,
  },
  width: 176,
} satisfies IeMachineLayout;

/**
 * 木箱 CrateScreen（imageHeight 168）/ CrateMenu：27 槽 (8+i%9*18, 18+i/9*18)、
 * 可编辑名称框 (8,6,162,12)。
 */
const CRATE = {
  background: "crate",
  height: 168,
  inventoryLabelTop: 77,
  player: { hotbarY: 144, left: 7, top: 86 },
  slots: [row(27, "crate-slot", 7, 9, 17)],
  title: "木箱",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 工具箱 ToolboxScreen（imageHeight 238，背景 blit 于 topPos-17，源区 176×255）/
 * ToolboxMenu：工具槽 (48,24)/(30,42)/(48,42)、护甲/_shader 区 7 槽、
 * 6 食物槽 (35+j*18,77)、7 杂项槽 (26+j*18,112)。
 */
const TOOLBOX = {
  height: 238,
  inventoryLabelTop: 147,
  player: { hotbarY: 214, left: 7, top: 156 },
  slots: [
    { label: "toolbox-tool", left: 47, top: 23 },
    { label: "toolbox-wirecutter", left: 29, top: 41 },
    { label: "toolbox-hammer", left: 47, top: 41 },
    row(3, "toolbox-armor", 74, 3, 23),
    row(4, "toolbox-shader", 74, 4, 41),
    row(6, "toolbox-food", 34, 6, 76),
    row(7, "toolbox-misc", 25, 7, 111),
  ],
  title: "工具箱",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 电路工作台 CircuitTableScreen（234×182）/ CircuitTableMenu：
 * PCB (8,14)、逻辑电路 (8,34)、焊接电路 (8,54)、成品电路槽 (175,24)、输出 (194,56)、
 * 能量 (217,26)；复制区 Rect2i(52,7,48,63)（操作符列表 (58,16,36,56)、
 * 寄存器按钮 18×18、名称框 (172,10,54,12) 由组件渲染）。
 */
const CIRCUIT_TABLE = {
  background: "circuit_table",
  energy: { left: 217, top: 26 },
  height: 182,
  inventoryLabelTop: 91,
  player: { hotbarY: 142, left: 7, top: 84 },
  slots: [
    { label: "circuit-table-pcb", left: 7, top: 13 },
    { label: "circuit-table-logic", left: 7, top: 33 },
    { label: "circuit-table-solder", left: 7, top: 53 },
    { label: "circuit-table-circuit", left: 174, top: 23 },
    { label: "circuit-table-output", left: 193, top: 55 },
  ],
  title: "电路工作台",
  width: 234,
} satisfies IeMachineLayout;

/**
 * 区块加载机 ChunkLoaderScreen（imageHeight 241）/ ChunkLoaderMenu：
 * 纸张槽 (124,94)、能量 (157,96)、刷新条 RefreshInfoArea(141,94,2,16)、
 * 反应式列表 GuiReactiveList(6,52,100,86)。
 */
const CHUNK_LOADER = {
  background: "chunk_loader",
  energy: { left: 157, top: 96 },
  height: 241,
  inventoryLabelTop: 150,
  player: { hotbarY: 217, left: 7, top: 159 },
  refresh: {
    crop: { height: 16, width: 2, x: 176, y: 75 },
    height: 16,
    label: "chunk-loader-refresh",
    left: 141,
    top: 94,
    width: 2,
  },
  slots: [{ label: "chunk-loader-paper", left: 123, top: 93 }],
  title: "区块加载机",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 自动工作台 AutoWorkbenchScreen（imageHeight 184）/ AutoWorkbenchMenu：
 * 4×4 存储槽 (7+i%4*18, 24+i/4*18)、图纸输出槽 (102,69)、能量 (80,36)；
 * 配方选择按钮网格（ GuiButtonItem 18×18，3 列排列）由组件渲染。
 */
const AUTO_WORKBENCH = {
  background: "auto_workbench",
  energy: { left: 80, top: 36 },
  height: 184,
  inventoryLabelTop: 93,
  player: { hotbarY: 160, left: 7, top: 102 },
  slots: [
    row(16, "auto-workbench-storage", 6, 4, 23),
    { label: "auto-workbench-blueprint", left: 101, top: 68 },
  ],
  title: "自动工作台",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 装配器 AssemblerScreen（230×218）/ AssemblerMenu：3 组 ×9 幽灵配方槽
 * (9+i*58+j%3*18, 7+j/3*18)、3 输出 (27+i*58,64)、18 存储槽 (13+i%9*18, 87+i/9*18)、
 * 能量 (187,13)、三罐 Rect2i(204,13)/(182,70)/(204,70) 16×46 + assembler/tank_overlay、
 * 清空按钮 (11+i*59,67,10,10)、递归合成按钮 (162,69,16,16)。
 */
const ASSEMBLER = {
  background: "assembler",
  energy: { left: 187, top: 13 },
  height: 218,
  inventoryLabelTop: 127,
  player: { hotbarY: 194, left: 12, top: 136 },
  slots: [
    row(9, "assembler-pattern-0", 8, 3, 6),
    row(9, "assembler-pattern-1", 66, 3, 6),
    row(9, "assembler-pattern-2", 124, 3, 6),
    { count: 3, label: "assembler-output", left: 26, perRow: 3, stepX: 58, top: 63 },
    row(18, "assembler-storage", 12, 9, 86),
  ],
  tanks: [
    { fill: { height: 46, left: 204, top: 13, width: 16 }, label: "装配器罐 1", overlayName: "sprites/assembler/tank_overlay" },
    { fill: { height: 46, left: 182, top: 70, width: 16 }, label: "装配器罐 2", overlayName: "sprites/assembler/tank_overlay" },
    { fill: { height: 46, left: 204, top: 70, width: 16 }, label: "装配器罐 3", overlayName: "sprites/assembler/tank_overlay" },
  ],
  title: "装配器",
  width: 230,
} satisfies IeMachineLayout;

/**
 * 工程师工作台 ModWorkbenchScreen（imageHeight 168）/ ModWorkbenchContainer：
 * 工具槽 (24,22)、6 升级槽 (74/92, 21+i/2*18)、着色器槽 (130,32)、
 * 图纸输出 3×3 (118+i%3*18, 21+i%9/3*18)、翻页按钮 (118,9)/(154,9) 18×12。
 */
const MOD_WORKBENCH = {
  background: "workbench",
  height: 168,
  inventoryLabelTop: 77,
  player: { hotbarY: 144, left: 7, top: 86 },
  slots: [
    { label: "mod-workbench-tool", left: 23, top: 21 },
    { count: 6, label: "mod-workbench-input", left: 73, perRow: 2, top: 20 },
    { label: "mod-workbench-shader", left: 129, top: 31 },
    row(9, "mod-workbench-output", 117, 3, 20),
  ],
  title: "工程师工作台",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 电钻（1.12.2 时代贴图，pinned 1.21.1 提交无 GUI 容器类，按 IEContainerScreen
 * 范式重建 176×166）。coords from drill.png pixel inspection
 * (upstream <file> unavailable)：钻头槽内区 (80,12)、三个钻头部件内区
 * (60,44)/(80,50)/(100,44)（中件下移 6px），背包砖面板深色行 84/102/120/142。
 */
const DRILL = {
  height: 166,
  inventoryLabelTop: 72,
  player: { hotbarY: 142, left: 7, top: 84 },
  slots: [
    { label: "drill-head", left: 80, top: 12 },
    { label: "drill-core", left: 60, top: 44 },
    { label: "drill-core-1", left: 80, top: 50 },
    { label: "drill-core-2", left: 100, top: 44 },
  ],
  title: "电钻",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 流体泵站（1.12.2 时代贴图 fluid_producer.png，pinned 1.21.1 提交无 GUI
 * 容器类，按 IEContainerScreen 范式重建 176×166）。
 * coords from fluid_producer.png pixel inspection (upstream <file> unavailable)：
 * 3×3 网格内区 (24,17) 步距 19、中部方槽 (91,35)、流体容器槽 (132,18)、
 * 流体输出槽 (132,55)、罐显示区 (110,20,16,47)、能量表 (156,24,9,40)。
 */
const FLUID_PRODUCER = {
  energy: { left: 156, top: 24 },
  height: 166,
  inventoryLabelTop: 72,
  player: { hotbarY: 142, left: 7, top: 84 },
  slots: [
    { count: 9, label: "fluid-producer-grid", left: 24, perRow: 3, stepX: 19, stepY: 19, top: 17 },
    { label: "fluid-producer-cell", left: 91, top: 35 },
    { label: "fluid-producer-input", left: 132, top: 18 },
    { label: "fluid-producer-output", left: 132, top: 55 },
  ],
  tanks: [{ fill: { height: 47, left: 110, top: 20, width: 16 }, label: "流体泵站罐" }],
  title: "流体泵站",
  width: 176,
} satisfies IeMachineLayout;

/**
 * 布局表（24 台机器）
*/
export const IE_MACHINES = {
  alloySmelter: ALLOY_SMELTER,
  arcFurnace: ARC_FURNACE,
  assembler: ASSEMBLER,
  autoWorkbench: AUTO_WORKBENCH,
  blastFurnace: BLAST_FURNACE,
  capacitorHv: CAPACITOR_HV,
  chunkLoader: CHUNK_LOADER,
  circuitTable: CIRCUIT_TABLE,
  cloche: CLOCHE,
  cokeOven: COKE_OVEN,
  crate: CRATE,
  drill: DRILL,
  fermenter: FERMENTER,
  fluidProducer: FLUID_PRODUCER,
  fluidSorter: FLUID_SORTER,
  itemBatcher: ITEM_BATCHER,
  metalPress: METAL_PRESS,
  mixer: MIXER,
  modWorkbench: MOD_WORKBENCH,
  refinery: REFINERY,
  sorter: SORTER,
  squeezer: SQUEEZER,
  toolbox: TOOLBOX,
} satisfies Record<string, IeMachineLayout>;

export type IeMachineKey = keyof typeof IE_MACHINES;

/**
 * 展开槽位组为逐槽坐标列表
*/
export function ieExpandSlots(layout: IeMachineLayout): Array<{ label: string; left: number; top: number }> {
  return layout.slots.flatMap((slot) => {
    if (!("perRow" in slot)) {
      return [slot];
    }
    return Array.from({ length: slot.count }, (_, index) => ({
      label: `${slot.label}-${index}`,
      left: slot.left + (index % slot.perRow) * (slot.stepX ?? 18),
      top: slot.top + Math.floor(index / slot.perRow) * (slot.stepY ?? 18),
    }));
  });
}
