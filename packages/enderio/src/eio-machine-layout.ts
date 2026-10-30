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
  /**
  * 流体表区域（如 `FluidStackWidget`），可多个
  */
  fluids?: { height: number; left: number; top: number; width: number }[];
  grindingBall?: { height: number; left: number; top: number; width: number };
  height: number;
  io?: { left: number; top: number };
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
  redstone?: { left: number; top: number };
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

const PAINTING_MACHINE: EioMachineLayout = {
  background: "screen/painting_machine",
  backgroundHeight: 166,
  energy: { height: 42, left: 16, top: 14, variant: "legacy", width: 9 },
  height: 166,
  io: { left: 154, top: 24 },
  player: { hotbarY: 142, left: 7, top: 84 },
  progresses: [
    { direction: "right", height: 16, left: 88, sprite: "sprites/screen/painting_machine/progress", top: 35, width: 24 },
  ],
  redstone: { left: 154, top: 6 },
  slots: [
    { label: "painting-machine-capacitor", left: 11, top: 59 },
    { label: "painting-machine-paint", left: 37, top: 33 },
    { label: "painting-machine-input", left: 66, top: 33 },
    { label: "painting-machine-output", left: 119, top: 33 },
  ],
  state: { left: 154, top: 70 },
  title: "涂色机",
  width: 176,
};

const SLICE_AND_SPLICE: EioMachineLayout = {
  background: "screen/slice_and_splice",
  backgroundHeight: 208,
  energy: { height: 52, left: 7, top: 27, variant: "capacitor", width: 18 },
  height: 208,
  io: { left: 154, top: 43 },
  labels: { inventoryTop: 115, titleTop: 8 },
  player: { hotbarY: 184, left: 7, top: 126 },
  progresses: [
    { direction: "right", height: 16, left: 98, sprite: "sprites/screen/slice_and_splice/progress", top: 61, width: 24 },
  ],
  redstone: { left: 154, top: 61 },
  slots: [
    { label: "slice-and-splice-capacitor", left: 7, top: 88 },
    { label: "slice-and-splice-axe", left: 47, top: 27 },
    { label: "slice-and-splice-shears", left: 65, top: 27 },
    { label: "slice-and-splice-input-0", left: 37, top: 51 },
    { label: "slice-and-splice-input-1", left: 55, top: 51 },
    { label: "slice-and-splice-input-2", left: 73, top: 51 },
    { label: "slice-and-splice-input-3", left: 37, top: 69 },
    { label: "slice-and-splice-input-4", left: 55, top: 69 },
    { label: "slice-and-splice-input-5", left: 73, top: 69 },
    { label: "slice-and-splice-output", left: 127, top: 60 },
  ],
  state: { left: 153, top: 89 },
  title: "切片拼接机",
  width: 176,
};

const ENCHANTER: EioMachineLayout = {
  background: "screen/enchanter",
  backgroundHeight: 166,
  height: 166,
  player: { hotbarY: 142, left: 7, top: 84 },
  progresses: [],
  slots: [
    { label: "enchanter-book", left: 15, top: 34 },
    { label: "enchanter-catalyst", left: 64, top: 34 },
    { label: "enchanter-lapis", left: 84, top: 34 },
    { label: "enchanter-output", left: 143, top: 34 },
  ],
  title: "附魔台",
  width: 176,
};

// coords from screen/combustion_gen pixel inspection (upstream Screen unavailable at pinned commit)
const COMBUSTION_GENERATOR: EioMachineLayout = {
  background: "screen/combustion_gen",
  backgroundHeight: 166,
  energy: { height: 42, left: 12, top: 14, variant: "legacy", width: 9 },
  fluids: [
    { height: 48, left: 46, top: 20, width: 16 },
    { height: 48, left: 114, top: 20, width: 16 },
  ],
  height: 166,
  player: { hotbarY: 142, left: 7, top: 84 },
  progresses: [],
  slots: [],
  title: "燃烧发电机",
  width: 200,
};

// coords from screen/lava_generator pixel inspection (upstream Screen unavailable at pinned commit)
const LAVA_GENERATOR: EioMachineLayout = {
  background: "screen/lava_generator",
  backgroundHeight: 166,
  energy: { height: 42, left: 12, top: 14, variant: "legacy", width: 9 },
  fluids: [
    { height: 60, left: 54, top: 12, width: 66 },
    { height: 52, left: 134, top: 18, width: 16 },
  ],
  height: 166,
  player: { hotbarY: 142, left: 7, top: 84 },
  progresses: [],
  slots: [],
  title: "岩浆发电机",
  width: 176,
};

const SOUL_ENGINE: EioMachineLayout = {
  background: "screen/soul_engine",
  backgroundHeight: 166,
  energy: { height: 42, left: 16, top: 14, variant: "legacy", width: 9 },
  fluids: [{ height: 47, left: 80, top: 21, width: 16 }],
  height: 166,
  io: { left: 154, top: 24 },
  player: { hotbarY: 142, left: 7, top: 84 },
  progresses: [],
  redstone: { left: 154, top: 6 },
  slots: [{ label: "soul-engine-capacitor", left: 11, top: 59 }],
  state: { left: 154, top: 70 },
  title: "灵魂发动机",
  width: 176,
};

const VAT: EioMachineLayout = {
  background: "screen/vat",
  backgroundHeight: 166,
  fluids: [
    { height: 47, left: 30, top: 12, width: 15 },
    { height: 47, left: 132, top: 12, width: 15 },
  ],
  height: 166,
  io: { left: 154, top: 24 },
  player: { hotbarY: 142, left: 7, top: 84 },
  progresses: [
    {
      crop: { height: 14, width: 14, x: 176, y: 0 },
      direction: "up",
      height: 14,
      left: 82,
      sprite: "screen/vat",
      top: 64,
      width: 14,
    },
  ],
  redstone: { left: 154, top: 6 },
  slots: [
    { label: "vat-reagent-0", left: 55, top: 11 },
    { label: "vat-reagent-1", left: 104, top: 11 },
  ],
  title: "发酵桶",
  width: 176,
};

/**
 * 流体坦克 / 抽液器 / 泼洒器共用布局（上游 FluidTankScreen / DrainScreen /
 * NiardScreen 同版式；各屏按需渲染槽位与能量，泼洒器另用 (112,28) 39×56 流体区）。
 */
const TANK: EioMachineLayout = {
  background: "screen/tank",
  backgroundHeight: 166,
  energy: { height: 42, left: 16, top: 14, variant: "legacy", width: 9 },
  fluids: [{ height: 47, left: 80, top: 21, width: 16 }],
  height: 166,
  io: { left: 154, top: 24 },
  player: { hotbarY: 142, left: 7, top: 84 },
  progresses: [],
  redstone: { left: 154, top: 6 },
  slots: [
    { label: "tank-fill-input", left: 43, top: 20 },
    { label: "tank-fill-output", left: 43, top: 51 },
    { label: "tank-drain-input", left: 115, top: 20 },
    { label: "tank-drain-output", left: 115, top: 51 },
    { label: "tank-capacitor", left: 11, top: 59 },
  ],
  state: { left: 154, top: 70 },
  title: "流体坦克",
  width: 176,
};

const WIRED_CHARGER: EioMachineLayout = {
  background: "screen/wired_charger",
  backgroundHeight: 166,
  energy: { height: 42, left: 37, top: 14, variant: "legacy", width: 9 },
  height: 166,
  io: { left: 175, top: 24 },
  player: { hotbarY: 142, left: 28, top: 84 },
  progresses: [
    {
      crop: { height: 36, width: 12, x: 242, y: 1 },
      direction: "up",
      height: 36,
      left: 103,
      sprite: "screen/wired_charger",
      top: 18,
      width: 12,
    },
  ],
  redstone: { left: 175, top: 6 },
  slots: [
    { label: "wired-charger-capacitor", left: 32, top: 59 },
    { label: "wired-charger-item-to-charge", left: 74, top: 27 },
    { label: "wired-charger-item-charged", left: 125, top: 27 },
    { label: "wired-charger-armor-0", left: 5, top: 11 },
    { label: "wired-charger-armor-1", left: 5, top: 29 },
    { label: "wired-charger-armor-2", left: 5, top: 47 },
    { label: "wired-charger-armor-3", left: 5, top: 65 },
    { label: "wired-charger-offhand", left: 5, top: 83 },
  ],
  state: { left: 175, top: 70 },
  title: "有线充电器",
  width: 197,
};

const WIRELESS_CHARGER: EioMachineLayout = {
  background: "screen/wireless_charger",
  backgroundHeight: 166,
  energy: { height: 42, left: 16, top: 14, variant: "legacy", width: 9 },
  height: 166,
  io: { left: 154, top: 24 },
  player: { hotbarY: 142, left: 7, top: 84 },
  progresses: [],
  redstone: { left: 154, top: 6 },
  slots: [{ label: "wireless-charger-capacitor", left: 11, top: 59 }],
  state: { left: 154, top: 66 },
  title: "无线充电器",
  width: 176,
};

const POWERED_SPAWNER: EioMachineLayout = {
  background: "screen/powered_spawner_spawn",
  backgroundHeight: 187,
  energy: { height: 52, left: 7, top: 6, variant: "capacitor", width: 18 },
  height: 187,
  io: { left: 154, top: 42 },
  labels: { inventoryTop: 94, titleTop: 8 },
  player: { hotbarY: 163, left: 7, top: 105 },
  progresses: [
    { direction: "up", height: 14, left: 82, sprite: "sprites/screen/powered_spawner/spawn_progress", top: 38, width: 14 },
    { direction: "right", height: 16, left: 75, sprite: "sprites/screen/powered_spawner/capture_progress", top: 43, width: 24 },
  ],
  redstone: { left: 154, top: 6 },
  slots: [
    { label: "powered-spawner-capacitor", left: 7, top: 66 },
    { label: "powered-spawner-input", left: 53, top: 41 },
    { label: "powered-spawner-output", left: 104, top: 41 },
  ],
  state: { left: 152, top: 68 },
  title: "刷怪笼",
  width: 176,
};

const XP_OBELISK: EioMachineLayout = {
  background: "screen/xp_obelisk",
  backgroundHeight: 116,
  height: 116,
  player: { hotbarY: 0, left: 0, top: 0 },
  progresses: [],
  redstone: { left: 154, top: 6 },
  slots: [],
  title: "经验方尖碑",
  width: 176,
};

const XP_VACUUM: EioMachineLayout = {
  background: "screen/xp_vacuum",
  backgroundHeight: 166,
  fluids: [{ height: 32, left: 27, top: 22, width: 32 }],
  height: 166,
  labels: { inventoryTop: 60, titleTop: 6 },
  player: { hotbarY: 128, left: 7, top: 70 },
  progresses: [],
  redstone: { left: 154, top: 6 },
  slots: [],
  title: "经验真空机",
  width: 176,
};

const IMPULSE_HOPPER: EioMachineLayout = {
  background: "screen/impulse_hopper",
  backgroundHeight: 166,
  energy: { height: 47, left: 15, top: 9, variant: "legacy", width: 9 },
  height: 166,
  io: { left: 154, top: 24 },
  player: { hotbarY: 142, left: 7, top: 84 },
  progresses: [],
  redstone: { left: 154, top: 6 },
  slots: [
    { label: "impulse-hopper-capacitor", left: 10, top: 59 },
    { label: "impulse-hopper-input-0", left: 43, top: 8 },
    { label: "impulse-hopper-input-1", left: 61, top: 8 },
    { label: "impulse-hopper-input-2", left: 79, top: 8 },
    { label: "impulse-hopper-input-3", left: 97, top: 8 },
    { label: "impulse-hopper-input-4", left: 115, top: 8 },
    { label: "impulse-hopper-input-5", left: 133, top: 8 },
    { label: "impulse-hopper-ghost-0", left: 43, top: 35 },
    { label: "impulse-hopper-ghost-1", left: 61, top: 35 },
    { label: "impulse-hopper-ghost-2", left: 79, top: 35 },
    { label: "impulse-hopper-ghost-3", left: 97, top: 35 },
    { label: "impulse-hopper-ghost-4", left: 115, top: 35 },
    { label: "impulse-hopper-ghost-5", left: 133, top: 35 },
    { label: "impulse-hopper-output-0", left: 43, top: 62 },
    { label: "impulse-hopper-output-1", left: 61, top: 62 },
    { label: "impulse-hopper-output-2", left: 79, top: 62 },
    { label: "impulse-hopper-output-3", left: 97, top: 62 },
    { label: "impulse-hopper-output-4", left: 115, top: 62 },
    { label: "impulse-hopper-output-5", left: 133, top: 62 },
  ],
  state: { left: 154, top: 70 },
  title: "脉冲漏斗",
  width: 176,
};

const CRAFTER: EioMachineLayout = {
  background: "screen/crafter",
  backgroundHeight: 166,
  energy: { height: 42, left: 10, top: 14, variant: "legacy", width: 9 },
  height: 166,
  io: { left: 198, top: 24 },
  player: { hotbarY: 142, left: 29, top: 84 },
  progresses: [],
  redstone: { left: 198, top: 6 },
  slots: [
    { label: "crafter-capacitor", left: 5, top: 59 },
    { label: "crafter-input-0", left: 112, top: 15 },
    { label: "crafter-input-1", left: 130, top: 15 },
    { label: "crafter-input-2", left: 148, top: 15 },
    { label: "crafter-input-3", left: 112, top: 33 },
    { label: "crafter-input-4", left: 130, top: 33 },
    { label: "crafter-input-5", left: 148, top: 33 },
    { label: "crafter-input-6", left: 112, top: 51 },
    { label: "crafter-input-7", left: 130, top: 51 },
    { label: "crafter-input-8", left: 148, top: 51 },
    { label: "crafter-output", left: 171, top: 33 },
    { label: "crafter-ghost-0", left: 30, top: 15 },
    { label: "crafter-ghost-1", left: 48, top: 15 },
    { label: "crafter-ghost-2", left: 66, top: 15 },
    { label: "crafter-ghost-3", left: 30, top: 33 },
    { label: "crafter-ghost-4", left: 48, top: 33 },
    { label: "crafter-ghost-5", left: 66, top: 33 },
    { label: "crafter-ghost-6", left: 30, top: 51 },
    { label: "crafter-ghost-7", left: 48, top: 51 },
    { label: "crafter-ghost-8", left: 66, top: 51 },
    { label: "crafter-preview", left: 89, top: 33 },
  ],
  state: { left: 198, top: 70 },
  title: "制造机",
  width: 220,
};

const FARM_STATION: EioMachineLayout = {
  background: "screen/farm_station",
  backgroundHeight: 169,
  energy: { height: 45, left: 16, top: 14, variant: "legacy", width: 9 },
  height: 169,
  io: { left: 162, top: 24 },
  player: { hotbarY: 145, left: 7, top: 87 },
  progresses: [],
  redstone: { left: 162, top: 6 },
  slots: [
    { label: "farm-station-capacitor", left: 11, top: 62 },
    { label: "farm-station-tool-0", left: 43, top: 18 },
    { label: "farm-station-tool-1", left: 61, top: 18 },
    { label: "farm-station-tool-2", left: 79, top: 18 },
    { label: "farm-station-area-0", left: 52, top: 43 },
    { label: "farm-station-area-1", left: 70, top: 43 },
    { label: "farm-station-area-2", left: 52, top: 61 },
    { label: "farm-station-area-3", left: 70, top: 61 },
    { label: "farm-station-bonemeal-0", left: 115, top: 18 },
    { label: "farm-station-bonemeal-1", left: 133, top: 18 },
    { label: "farm-station-output-0", left: 106, top: 43 },
    { label: "farm-station-output-1", left: 124, top: 43 },
    { label: "farm-station-output-2", left: 142, top: 43 },
    { label: "farm-station-output-3", left: 106, top: 61 },
    { label: "farm-station-output-4", left: 124, top: 61 },
    { label: "farm-station-output-5", left: 142, top: 61 },
  ],
  state: { left: 162, top: 62 },
  title: "农业站",
  width: 184,
};

const VACUUM_CHEST: EioMachineLayout = {
  background: "screen/vacuum_chest",
  backgroundHeight: 206,
  height: 206,
  labels: { inventoryTop: 112, titleTop: 6 },
  player: { hotbarY: 182, left: 7, top: 124 },
  progresses: [],
  redstone: { left: 152, top: 105 },
  slots: [
    { label: "vacuum-chest-filter", left: 7, top: 85 },
    ...Array.from({ length: 27 }, (_, index) => ({
      label: `vacuum-chest-main-${index}`,
      left: 7 + (index % 9) * 18,
      top: 17 + Math.floor(index / 9) * 18,
    })),
  ],
  state: { left: 116, top: 105 },
  title: "真空箱",
  width: 176,
};

/**
 * 吸引 / 驱离 / 阻慑 / 中继方尖碑共用布局（上游 ObeliskScreen 基类，四者同版式）。
 */
const OBELISK: EioMachineLayout = {
  background: "screen/attractor",
  backgroundHeight: 166,
  energy: { height: 42, left: 16, top: 14, variant: "legacy", width: 9 },
  height: 166,
  player: { hotbarY: 142, left: 7, top: 84 },
  progresses: [],
  redstone: { left: 154, top: 6 },
  slots: [
    { label: "obelisk-capacitor", left: 11, top: 59 },
    { label: "obelisk-filter", left: 80, top: 30 },
  ],
  state: { left: 154, top: 70 },
  title: "方尖碑",
  width: 176,
};

const WEATHER_OBELISK: EioMachineLayout = {
  background: "screen/weather_obelisk",
  backgroundHeight: 166,
  fluids: [{ height: 63, left: 22, top: 11, width: 16 }],
  height: 166,
  player: { hotbarY: 142, left: 7, top: 84 },
  progresses: [
    {
      crop: { height: 32, width: 12, x: 176, y: 0 },
      direction: "up",
      height: 32,
      left: 81,
      sprite: "screen/weather_obelisk",
      top: 28,
      width: 12,
    },
  ],
  slots: [],
  title: "天气方尖碑",
  width: 176,
};

// coords from screen/killer_joe pixel inspection (upstream Screen unavailable at pinned commit)
const KILLER_JOE: EioMachineLayout = {
  background: "screen/killer_joe",
  backgroundHeight: 166,
  fluids: [{ height: 48, left: 16, top: 10, width: 18 }],
  height: 166,
  player: { hotbarY: 142, left: 7, top: 84 },
  progresses: [],
  slots: [{ label: "killer-joe-food", left: 46, top: 24 }],
  title: "杀戮乔",
  width: 176,
};

// coords from screen/buffer_full pixel inspection (upstream Screen unavailable at pinned commit)
const BUFFER: EioMachineLayout = {
  background: "screen/buffer_full",
  backgroundHeight: 166,
  height: 166,
  player: { hotbarY: 142, left: 7, top: 84 },
  progresses: [],
  slots: [
    { label: "buffer-slot-0", left: 198, top: 2 },
    { label: "buffer-slot-1", left: 216, top: 2 },
    { label: "buffer-slot-2", left: 234, top: 2 },
    { label: "buffer-slot-3", left: 198, top: 20 },
    { label: "buffer-slot-4", left: 216, top: 20 },
    { label: "buffer-slot-5", left: 234, top: 20 },
  ],
  title: "缓冲器",
  width: 252,
};

const TRAVEL_ANCHOR: EioMachineLayout = {
  background: "screen/travel_anchor",
  backgroundHeight: 184,
  height: 184,
  player: { hotbarY: 161, left: 7, top: 103 },
  progresses: [],
  slots: [{ label: "travel-anchor-ghost", left: 124, top: 9 }],
  title: "旅行锚点",
  width: 176,
};

/**
 * 机器布局表
 */
export const EIO_MACHINES = {
  alloySmelter: ALLOY_SMELTER,
  buffer: BUFFER,
  capacitorBank: CAPACITOR_BANK,
  combustionGenerator: COMBUSTION_GENERATOR,
  crafter: CRAFTER,
  enchanter: ENCHANTER,
  farmStation: FARM_STATION,
  impulseHopper: IMPULSE_HOPPER,
  killerJoe: KILLER_JOE,
  lavaGenerator: LAVA_GENERATOR,
  obelisk: OBELISK,
  paintingMachine: PAINTING_MACHINE,
  poweredSpawner: POWERED_SPAWNER,
  sagMill: SAG_MILL,
  sliceAndSplice: SLICE_AND_SPLICE,
  soulBinder: SOUL_BINDER,
  soulEngine: SOUL_ENGINE,
  stirlingGenerator: STIRLING_GENERATOR,
  tank: TANK,
  travelAnchor: TRAVEL_ANCHOR,
  vacuumChest: VACUUM_CHEST,
  vat: VAT,
  weatherObelisk: WEATHER_OBELISK,
  wiredCharger: WIRED_CHARGER,
  wirelessCharger: WIRELESS_CHARGER,
  xpObelisk: XP_OBELISK,
  xpVacuum: XP_VACUUM,
} satisfies Record<string, EioMachineLayout>;

export type EioMachineKey = keyof typeof EIO_MACHINES;
