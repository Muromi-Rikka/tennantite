import type { EioSpriteName } from "@tennantite/textures";

/**
 * Ender IO 26.3 机器界面数据驱动布局表。
 *
 * 坐标为面板 GUI px。槽位为 18×18 槽框左上角 —— vanilla 把槽框画在
 * menu slot 左上 1px，物品图标画在 menu slot 处，两者相差 1；本表存槽框坐标，
 * 与 `ScreenItemSlot` / `PlayerInventory`（图标在框内居中）直接对齐。
 */

export type EioAlloySmelterMode = "all" | "alloys" | "furnace";
export interface EioLayoutSlot {
  /**
  * 测试与读屏用 label（同屏唯一）
  */
  label: string;
  left: number;
  top: number;
}

export interface EioMachineLayout {
  background: EioSpriteName;
  /**
  * 背景贴图可见高度（电容组 166，其余等于 height）
  */
  backgroundHeight: number;
  energy?: { height: number; left: number; top: number; variant: "capacitor" | "legacy"; width: number };
  experience?: { height: number; left: number; top: number; width: number };
  grindingBall?: { height: number; left: number; top: number; width: number };
  height: number;
  io: { left: number; top: number };
  /**
  * 提供时渲染居中标题 (titleTop) 与背包标签 (8, inventoryTop)
  */
  labels?: { inventoryTop: number; titleTop: number };
  mode?: { left: number; top: number };
  /**
  * 玩家背包槽框起点与快捷栏 y
  */
  player: { hotbarY: number; left: number; top: number };
  progresses: EioProgressLayout[];
  redstone: { left: number; top: number };
  slots: EioLayoutSlot[];
  state?: { left: number; top: number };
  title: string;
  width: number;
}

export interface EioProgressLayout {
  /**
  * 从整屏图集裁剪（源 px）
  */
  crop?: { height: number; width: number; x: number; y: number };
  direction: "down" | "right" | "up";
  height: number;
  left: number;
  sprite: EioSpriteName;
  top: number;
  width: number;
}

export type EioRedstoneControl = "active_with_signal" | "active_without_signal" | "always_active" | "never_active";

/**
 * 上游 `AlloySmelterMode` 枚举顺序（左键点击循环）
 */
export const EIO_ALLOY_MODE_ORDER = ["furnace", "all", "alloys"] as const;

/**
 * 上游 `RedstoneControl` 枚举顺序（左键点击循环）
 */
export const EIO_REDSTONE_ORDER = ["always_active", "active_with_signal", "active_without_signal", "never_active"] as const;

export const EIO_ALLOY_SMELTER_BACKGROUNDS = {
  all: "screen/alloy_smelter_auto",
  alloys: "screen/alloy_smelter_alloy",
  furnace: "screen/alloy_smelter_furnace",
} satisfies Record<EioAlloySmelterMode, EioSpriteName>;

const ALLOY_SMELTER: EioMachineLayout = {
  background: "screen/alloy_smelter_auto",
  backgroundHeight: 208,
  energy: { height: 52, left: 7, top: 27, variant: "capacitor", width: 18 },
  height: 208,
  io: { left: 154, top: 25 },
  labels: { inventoryTop: 115, titleTop: 8 },
  mode: { left: 154, top: 61 },
  player: { hotbarY: 183, left: 7, top: 125 },
  progresses: [
    { direction: "up", height: 14, left: 56, sprite: "sprites/screen/alloy_smelter/lit_progress", top: 56, width: 14 },
    { direction: "up", height: 14, left: 104, sprite: "sprites/screen/alloy_smelter/lit_progress", top: 56, width: 14 },
  ],
  redstone: { left: 154, top: 43 },
  slots: [
    { label: "alloy-smelter-capacitor", left: 7, top: 88 },
    { label: "alloy-smelter-input-0", left: 54, top: 37 },
    { label: "alloy-smelter-input-1", left: 79, top: 27 },
    { label: "alloy-smelter-input-2", left: 103, top: 37 },
    { label: "alloy-smelter-output", left: 79, top: 78 },
  ],
  state: { left: 153, top: 89 },
  title: "合金炉",
  width: 176,
};

const SAG_MILL: EioMachineLayout = {
  background: "screen/sag_mill",
  backgroundHeight: 208,
  energy: { height: 52, left: 7, top: 27, variant: "capacitor", width: 18 },
  grindingBall: { height: 16, left: 142, top: 39, width: 4 },
  height: 208,
  io: { left: 154, top: 43 },
  labels: { inventoryTop: 115, titleTop: 8 },
  player: { hotbarY: 183, left: 7, top: 125 },
  progresses: [
    { direction: "down", height: 24, left: 80, sprite: "sprites/screen/sag_mill/progress", top: 47, width: 16 },
  ],
  redstone: { left: 154, top: 61 },
  slots: [
    { label: "sag-mill-capacitor", left: 7, top: 88 },
    { label: "sag-mill-input", left: 79, top: 27 },
    { label: "sag-mill-output-0", left: 48, top: 74 },
    { label: "sag-mill-output-1", left: 69, top: 74 },
    { label: "sag-mill-output-2", left: 90, top: 74 },
    { label: "sag-mill-output-3", left: 111, top: 74 },
    { label: "sag-mill-grinding-ball", left: 121, top: 38 },
  ],
  state: { left: 153, top: 89 },
  title: "SAG 磨粉机",
  width: 176,
};

const STIRLING_GENERATOR: EioMachineLayout = {
  background: "screen/stirling_generator",
  backgroundHeight: 166,
  energy: { height: 42, left: 16, top: 14, variant: "legacy", width: 9 },
  height: 166,
  io: { left: 154, top: 24 },
  player: { hotbarY: 141, left: 7, top: 83 },
  progresses: [
    {
      crop: { height: 14, width: 14, x: 176, y: 0 },
      direction: "up",
      height: 14,
      left: 80,
      sprite: "screen/stirling_generator",
      top: 52,
      width: 14,
    },
  ],
  redstone: { left: 154, top: 6 },
  slots: [
    { label: "stirling-generator-capacitor", left: 11, top: 59 },
    { label: "stirling-generator-fuel", left: 79, top: 33 },
  ],
  state: { left: 154, top: 64 },
  title: "斯特林发电机",
  width: 176,
};

const SOUL_BINDER: EioMachineLayout = {
  background: "screen/soul_binder",
  backgroundHeight: 166,
  energy: { height: 42, left: 16, top: 14, variant: "legacy", width: 9 },
  experience: { height: 5, left: 56, top: 68, width: 65 },
  height: 166,
  io: { left: 154, top: 24 },
  player: { hotbarY: 141, left: 7, top: 83 },
  progresses: [
    {
      crop: { height: 17, width: 24, x: 176, y: 14 },
      direction: "right",
      height: 17,
      left: 80,
      sprite: "screen/soul_binder",
      top: 34,
      width: 24,
    },
  ],
  redstone: { left: 154, top: 6 },
  slots: [
    { label: "soul-binder-capacitor", left: 11, top: 59 },
    { label: "soul-binder-input-soul", left: 37, top: 33 },
    { label: "soul-binder-input-other", left: 58, top: 33 },
    { label: "soul-binder-output-0", left: 111, top: 33 },
    { label: "soul-binder-output-1", left: 133, top: 33 },
  ],
  state: { left: 154, top: 64 },
  title: "灵魂绑定器",
  width: 176,
};

const CAPACITOR_BANK: EioMachineLayout = {
  background: "screen/capacitor_bank",
  backgroundHeight: 166,
  energy: { height: 68, left: 8, top: 9, variant: "legacy", width: 9 },
  height: 208,
  io: { left: 154, top: 24 },
  player: { hotbarY: 141, left: 7, top: 83 },
  progresses: [],
  redstone: { left: 154, top: 6 },
  slots: [],
  title: "电容组",
  width: 176,
};

/**
 * 五台机器的布局表
 */
export const EIO_MACHINES = {
  alloySmelter: ALLOY_SMELTER,
  capacitorBank: CAPACITOR_BANK,
  sagMill: SAG_MILL,
  soulBinder: SOUL_BINDER,
  stirlingGenerator: STIRLING_GENERATOR,
} satisfies Record<string, EioMachineLayout>;

export type EioMachineKey = keyof typeof EIO_MACHINES;
