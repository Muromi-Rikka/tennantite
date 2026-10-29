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
  * 竖向进度条组（弧光炉，底锚填充）
  */
  progressBars?: IeLayoutSlotRow & { height: number };
  slots: Array<IeLayoutSlot | IeLayoutSlotRow>;
  /**
  * 液体罐（FluidInfoArea：填充区 + 居中 overlay）
  */
  tank?: {
    fill: { height: number; left: number; top: number; width: number };
    overlayName: IeSpriteName;
  };
  title: string;
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

/**
 * 四台机器的布局表
*/
export const IE_MACHINES = {
  arcFurnace: ARC_FURNACE,
  capacitorHv: CAPACITOR_HV,
  cokeOven: COKE_OVEN,
  metalPress: METAL_PRESS,
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
