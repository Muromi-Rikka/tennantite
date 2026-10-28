import type { MekanismSpriteName } from "@verdigris/textures";

import type {
  MekanismGaugeKind,
  MekanismGaugeType,
  MekanismProgressType,
  MekanismSlotOverlay,
  MekanismSlotType,
  MekanismTabKind,
  MekanismTransmission,
} from "../mekanism-types";

export interface MekanismMachineBar {
  height?: number;
  horizontal?: boolean;
  kind: "dynamic" | "rate";
  left: number;
  role: string;
  tint?: { from: string; to: string };
  top: number;
  width?: number;
}

export interface MekanismMachineButton {
  height: number;
  kind: "dump" | "gas-mode" | "image" | "toggle";
  label: string;
  left: number;
  role?: string;
  sprite?: MekanismSpriteName;
  spriteActive?: MekanismSpriteName;
  top: number;
  width: number;
}

export interface MekanismMachineGauge {
  gauge: MekanismGaugeType;
  height?: number;
  kind: MekanismGaugeKind;
  left: number;
  role: string;
  top: number;
  width?: number;
}

export interface MekanismMachineLayout {
  arrows?: { dir: "down" | "right" | "up"; left: number; top: number }[];
  bars?: MekanismMachineBar[];
  buttons?: MekanismMachineButton[];
  fields?: { height?: number; left: number; role: string; top: number; width: number }[];
  gauges?: MekanismMachineGauge[];
  height?: number;
  holders?: { height: number; left: number; side: "left" | "right"; top: number }[];
  innerDefaults?: Record<string, string>;
  inners?: { height: number; left: number; padding?: number; role: string; top: number; width: number }[];
  inventoryLabel?: null | { end?: number; x: number; y: number };
  player: { hotbarY: number; x: number; y: number };
  power?: { height: number; left: number; top: number } | { horizontal: true; left: number; top: number; width: number };
  progress?: MekanismMachineProgress[];
  slotGroups?: MekanismMachineSlotGroup[];
  slots: Record<string, MekanismMachineSlot>;
  tabs: MekanismTabKind[];
  textDefaults?: Record<string, string>;
  texts?: { left: number; role: string; top: number; variant?: "subheading" | "title"; width?: number }[];
  titleEnd?: number;
  titleX?: number;
  titleY?: number;
  transmissions?: MekanismTransmission[];
  warningSide?: "left" | "right";
  width?: number;
}

export interface MekanismMachineProgress {
  left: number;
  role: string;
  top: number;
  type: MekanismProgressType;
  when?: string;
}

export interface MekanismMachineSlot {
  height?: number;
  left: number;
  overlay?: MekanismSlotOverlay;
  top: number;
  type: MekanismSlotType;
  width?: number;
}

export interface MekanismMachineSlotGroup {
  columns: number;
  left: number;
  prefix: string;
  rows: number;
  step?: number;
  top: number;
  type: MekanismSlotType;
}

const DEFAULT_PLAYER = { hotbarY: 142, x: 8, y: 84 };
const DEFAULT_LABEL = { x: 8, y: 72 };
const DEFAULT_TABS: MekanismTabKind[] = ["config", "transporter", "upgrade", "security", "redstone", "energy"];
const CHEMICAL_BAR = { from: "#c9071f", to: "#e03030" };

/**
 * 26 台单方块机器的容器坐标（槽位为槽框左上角 = 容器 slot - 1）。
*/
export const MEKANISM_MACHINES = {
  "antiprotonic-nucleosynthesizer": {
    bars: [{ kind: "dynamic", left: 5, role: "dynamic", top: 88, width: 183 }],
    gauges: [
      { gauge: "small-med", height: 48, kind: "chemical", left: 5, role: "chemical", top: 18, width: 18 },
      { gauge: "small-med", height: 48, kind: "energy", left: 172, role: "energy", top: 18, width: 18 },
    ],
    height: 193,
    innerDefaults: { screen: "—" },
    inners: [{ height: 68, left: 45, role: "screen", top: 18, width: 104 }],
    inventoryLabel: { x: 18, y: 100 },
    player: { hotbarY: 169, x: 18, y: 111 },
    slots: {
      energy: { left: 172, top: 68, type: "power" },
      gas: { left: 5, top: 68, type: "input" },
      input: { left: 25, top: 39, type: "input" },
      output: { left: 151, top: 39, type: "output" },
    },
    tabs: DEFAULT_TABS,
    transmissions: ["energy", "item", "chemical"],
    width: 196,
  },
  "chemical-crystallizer": {
    gauges: [{ gauge: "standard", kind: "chemical", left: 7, role: "chemical", top: 4 }],
    innerDefaults: { screen: "—" },
    inners: [{ height: 42, left: 31, role: "screen", top: 13, width: 115 }],
    inventoryLabel: null,
    player: DEFAULT_PLAYER,
    power: { height: 52, left: 157, top: 23 },
    progress: [{ left: 53, role: "progress", top: 61, type: "LARGE_RIGHT" }],
    slots: {
      energy: { left: 151, top: 4, type: "power" },
      input: { left: 7, top: 64, type: "input" },
      output: { left: 128, top: 56, type: "output" },
    },
    tabs: DEFAULT_TABS,
    titleEnd: 151,
    titleX: 25,
    titleY: 4,
    transmissions: ["energy", "item", "chemical"],
  },
  "chemical-dissolution-chamber": {
    gauges: [
      { gauge: "standard", kind: "chemical", left: 7, role: "chemical-left", top: 4 },
      { gauge: "standard", kind: "chemical", left: 131, role: "chemical-right", top: 13 },
    ],
    inventoryLabel: null,
    player: DEFAULT_PLAYER,
    power: { horizontal: true, left: 115, top: 75, width: 52 },
    progress: [{ left: 64, role: "progress", top: 40, type: "LARGE_RIGHT" }],
    slots: {
      energy: { left: 151, top: 13, type: "power" },
      gas: { left: 7, top: 64, type: "input" },
      input: { left: 27, top: 35, type: "input" },
      output: { left: 151, top: 54, type: "output" },
    },
    tabs: DEFAULT_TABS,
    titleX: 25,
    titleY: 4,
    transmissions: ["energy", "item", "chemical"],
  },
  "chemical-infuser": {
    gauges: [
      { gauge: "standard", kind: "chemical", left: 25, role: "chemical-left", top: 13 },
      { gauge: "standard", kind: "chemical", left: 79, role: "chemical-center", top: 4 },
      { gauge: "standard", kind: "chemical", left: 133, role: "chemical-right", top: 13 },
    ],
    inventoryLabel: { end: 79, x: 8, y: 74 },
    player: DEFAULT_PLAYER,
    power: { horizontal: true, left: 115, top: 75, width: 52 },
    progress: [
      { left: 47, role: "progress-right", top: 39, type: "SMALL_RIGHT" },
      { left: 101, role: "progress-left", top: 39, type: "SMALL_LEFT" },
    ],
    slots: {
      energy: { left: 153, top: 13, type: "power" },
      left: { left: 5, top: 55, type: "input" },
      output: { left: 79, top: 64, type: "output" },
      right: { left: 153, top: 55, type: "input" },
    },
    tabs: DEFAULT_TABS,
    titleEnd: 79,
    titleX: 1,
    titleY: 5,
    transmissions: ["energy", "item", "chemical"],
  },
  "chemical-injection-chamber": {
    bars: [{ height: 12, kind: "rate", left: 68, role: "chemical", tint: CHEMICAL_BAR, top: 36, width: 6 }],
    inventoryLabel: DEFAULT_LABEL,
    player: DEFAULT_PLAYER,
    power: { height: 52, left: 164, top: 16 },
    progress: [{ left: 86, role: "progress", top: 38, type: "BAR" }],
    slots: {
      energy: { left: 39, top: 34, type: "power" },
      input: { left: 63, top: 16, type: "input" },
      output: { left: 115, top: 34, type: "output" },
      secondary: { left: 63, top: 52, type: "extra" },
    },
    tabs: DEFAULT_TABS,
    transmissions: ["energy", "item", "chemical"],
  },
  "chemical-oxidizer": {
    gauges: [{ gauge: "standard", kind: "chemical", left: 131, role: "chemical", top: 13 }],
    inventoryLabel: { end: 115, x: 8, y: 72 },
    player: DEFAULT_PLAYER,
    power: { horizontal: true, left: 115, top: 75, width: 52 },
    progress: [{ left: 64, role: "progress", top: 40, type: "LARGE_RIGHT" }],
    slots: {
      energy: { left: 151, top: 13, type: "power" },
      input: { left: 25, top: 35, type: "input" },
      output: { left: 151, top: 54, type: "output" },
    },
    tabs: DEFAULT_TABS,
    titleY: 5,
    transmissions: ["energy", "item", "chemical"],
  },
  "chemical-washer": {
    arrows: [{ dir: "down", left: 184, top: 91 }],
    gauges: [
      { gauge: "standard", kind: "fluid", left: 7, role: "fluid", top: 13 },
      { gauge: "standard", kind: "chemical", left: 28, role: "chemical-left", top: 13 },
      { gauge: "standard", kind: "chemical", left: 131, role: "chemical-right", top: 13 },
    ],
    holders: [{ height: 57, left: 176, side: "right", top: 66 }],
    inventoryLabel: null,
    player: DEFAULT_PLAYER,
    power: { horizontal: true, left: 115, top: 75, width: 52 },
    progress: [{ left: 64, role: "progress", top: 39, type: "LARGE_RIGHT" }],
    slots: {
      energy: { left: 151, top: 13, type: "power" },
      fluid: { left: 179, top: 70, type: "input" },
      fluidOut: { left: 179, top: 101, type: "output" },
      slurryOut: { left: 151, top: 55, type: "output" },
    },
    tabs: DEFAULT_TABS,
    titleY: 4,
    transmissions: ["energy", "item", "chemical", "fluid"],
  },
  "combiner": {
    arrows: [{ dir: "up", left: 68, top: 38 }],
    inventoryLabel: DEFAULT_LABEL,
    player: DEFAULT_PLAYER,
    power: { height: 15, left: 164, top: 15 },
    progress: [{ left: 86, role: "progress", top: 38, type: "BAR" }],
    slots: {
      energy: { left: 39, top: 34, type: "power" },
      extra: { left: 63, top: 52, type: "extra" },
      main: { left: 63, top: 16, type: "input" },
      output: { left: 115, top: 34, type: "output" },
    },
    tabs: DEFAULT_TABS,
  },
  "crusher": {
    arrows: [{ dir: "up", left: 68, top: 38 }],
    inventoryLabel: DEFAULT_LABEL,
    player: DEFAULT_PLAYER,
    power: { height: 52, left: 164, top: 16 },
    progress: [{ left: 86, role: "progress", top: 38, type: "BAR" }],
    slots: {
      energy: { left: 63, top: 52, type: "power" },
      input: { left: 63, top: 16, type: "input" },
      output: { left: 115, top: 34, type: "output" },
    },
    tabs: DEFAULT_TABS,
  },
  "electrolytic-separator": {
    buttons: [
      { height: 10, kind: "gas-mode", label: "左侧气体模式", left: 7, top: 72, width: 10 },
      { height: 10, kind: "gas-mode", label: "右侧气体模式", left: 159, top: 72, width: 10 },
    ],
    gauges: [
      { gauge: "standard", kind: "fluid", left: 5, role: "fluid", top: 10 },
      { gauge: "small", kind: "chemical", left: 58, role: "chemical-left", top: 18 },
      { gauge: "small", kind: "chemical", left: 100, role: "chemical-right", top: 18 },
    ],
    inventoryLabel: null,
    player: DEFAULT_PLAYER,
    power: { height: 15, left: 164, top: 15 },
    progress: [{ left: 80, role: "progress", top: 30, type: "BI" }],
    slots: {
      energy: { left: 142, top: 34, type: "power" },
      fluid: { left: 25, top: 34, type: "input" },
      leftOut: { left: 58, top: 51, type: "output" },
      rightOut: { left: 100, top: 51, type: "output" },
    },
    tabs: DEFAULT_TABS,
    titleX: 23,
    titleY: 4,
    transmissions: ["energy", "item", "chemical", "fluid"],
  },
  "energized-smelter": {
    arrows: [{ dir: "up", left: 68, top: 38 }],
    inventoryLabel: DEFAULT_LABEL,
    player: DEFAULT_PLAYER,
    power: { height: 52, left: 164, top: 16 },
    progress: [{ left: 86, role: "progress", top: 38, type: "BAR" }],
    slots: {
      energy: { left: 63, top: 52, type: "power" },
      input: { left: 63, top: 16, type: "input" },
      output: { left: 115, top: 34, type: "output" },
    },
    tabs: DEFAULT_TABS,
  },
  "enrichment-chamber": {
    arrows: [{ dir: "up", left: 68, top: 38 }],
    inventoryLabel: DEFAULT_LABEL,
    player: DEFAULT_PLAYER,
    power: { height: 52, left: 164, top: 16 },
    progress: [{ left: 86, role: "progress", top: 38, type: "BAR" }],
    slots: {
      energy: { left: 63, top: 52, type: "power" },
      input: { left: 63, top: 16, type: "input" },
      output: { left: 115, top: 34, type: "output" },
    },
    tabs: DEFAULT_TABS,
  },
  "formulaic-assemblicator": {
    buttons: [
      { height: 14, kind: "image", label: "编码公式", left: 7, sprite: "button/encode_formula", top: 45, width: 14 },
      { height: 16, kind: "image", label: "库存控制", left: 26, sprite: "button/stock_control", top: 75, width: 16 },
      { height: 16, kind: "toggle", label: "清空/填充", left: 44, role: "fill", sprite: "button/empty", spriteActive: "button/fill", top: 75, width: 16 },
      { height: 16, kind: "image", label: "合成单个", left: 71, sprite: "button/craft_single", top: 75, width: 16 },
      { height: 16, kind: "image", label: "合成可用", left: 89, sprite: "button/craft_available", top: 75, width: 16 },
      { height: 16, kind: "toggle", label: "自动模式", left: 107, role: "auto", sprite: "button/auto_toggle", top: 75, width: 16 },
    ],
    height: 230,
    inventoryLabel: { x: 8, y: 136 },
    player: { hotbarY: 206, x: 8, y: 148 },
    power: { height: 15, left: 159, top: 15 },
    progress: [{ left: 86, role: "progress", top: 43, type: "TALL_RIGHT" }],
    slotGroups: [
      { columns: 3, left: 25, prefix: "input", rows: 3, step: 18, top: 16, type: "input" },
      { columns: 3, left: 115, prefix: "output", rows: 3, step: 18, top: 16, type: "output" },
    ],
    slots: {
      "energy": { left: 151, top: 75, type: "power" },
      "formula": { left: 5, top: 25, type: "extra" },
      "large-output": { height: 54, left: 115, top: 16, type: "output", width: 36 },
      "recipe-check": { left: 87, overlay: "check", top: 21, type: "normal" },
    },
    tabs: DEFAULT_TABS,
  },
  "isotopic-centrifuge": {
    gauges: [
      { gauge: "standard", kind: "chemical", left: 25, role: "chemical-left", top: 13 },
      { gauge: "standard", kind: "chemical", left: 133, role: "chemical-right", top: 13 },
    ],
    inventoryLabel: { end: 115, x: 8, y: 74 },
    player: DEFAULT_PLAYER,
    power: { horizontal: true, left: 115, top: 75, width: 52 },
    progress: [{ left: 64, role: "progress", top: 39, type: "LARGE_RIGHT" }],
    slots: {
      energy: { left: 154, top: 13, type: "power" },
      input: { left: 4, top: 55, type: "input" },
      output: { left: 154, top: 55, type: "output" },
    },
    tabs: DEFAULT_TABS,
    titleY: 4,
    transmissions: ["energy", "item", "chemical"],
  },
  "metallurgic-infuser": {
    bars: [{ height: 52, kind: "rate", left: 7, role: "chemical", tint: CHEMICAL_BAR, top: 15, width: 4 }],
    buttons: [{ height: 10, kind: "dump", label: "倾倒化学物质", left: 16, top: 59, width: 21 }],
    inventoryLabel: DEFAULT_LABEL,
    player: DEFAULT_PLAYER,
    power: { height: 15, left: 164, top: 15 },
    progress: [{ left: 72, role: "progress", top: 47, type: "RIGHT" }],
    slots: {
      energy: { left: 142, top: 34, type: "power" },
      infusion: { left: 16, top: 34, type: "extra" },
      input: { left: 50, top: 42, type: "input" },
      output: { left: 108, top: 42, type: "output" },
    },
    tabs: DEFAULT_TABS,
    transmissions: ["energy", "item", "chemical"],
  },
  "nutritional-liquifier": {
    arrows: [{ dir: "down", left: 159, top: 44 }],
    gauges: [{ gauge: "standard", kind: "fluid", left: 133, role: "fluid", top: 13 }],
    inventoryLabel: { end: 115, x: 8, y: 72 },
    player: DEFAULT_PLAYER,
    power: { horizontal: true, left: 115, top: 75, width: 52 },
    progress: [{ left: 54, role: "progress", top: 40, type: "LARGE_RIGHT" }],
    slots: {
      energy: { left: 154, top: 4, type: "power" },
      fluidFill: { left: 154, top: 24, type: "input" },
      fluidOut: { left: 154, top: 55, type: "output" },
      input: { left: 25, top: 35, type: "input" },
      output: { left: 109, top: 35, type: "output" },
    },
    tabs: DEFAULT_TABS,
    transmissions: ["energy", "item", "fluid", "chemical"],
  },
  "osmium-compressor": {
    arrows: [{ dir: "up", left: 68, top: 38 }],
    inventoryLabel: DEFAULT_LABEL,
    player: DEFAULT_PLAYER,
    power: { height: 52, left: 164, top: 16 },
    progress: [{ left: 86, role: "progress", top: 38, type: "BAR" }],
    slots: {
      energy: { left: 63, top: 52, type: "power" },
      input: { left: 63, top: 16, type: "input" },
      output: { left: 115, top: 34, type: "output" },
    },
    tabs: DEFAULT_TABS,
  },
  "painting-machine": {
    gauges: [{ gauge: "standard", kind: "chemical", left: 25, role: "chemical", top: 13 }],
    inventoryLabel: DEFAULT_LABEL,
    player: DEFAULT_PLAYER,
    power: { height: 15, left: 164, top: 15 },
    progress: [{ left: 64, role: "progress", top: 39, type: "LARGE_RIGHT" }],
    slots: {
      energy: { left: 143, top: 34, type: "power" },
      input: { left: 44, top: 34, type: "input" },
      output: { left: 115, top: 34, type: "output" },
      pigment: { left: 5, top: 55, type: "input" },
    },
    tabs: DEFAULT_TABS,
    transmissions: ["energy", "item", "chemical"],
  },
  "pigment-extractor": {
    gauges: [{ gauge: "standard", kind: "chemical", left: 131, role: "chemical", top: 13 }],
    inventoryLabel: { end: 115, x: 8, y: 72 },
    player: DEFAULT_PLAYER,
    power: { horizontal: true, left: 115, top: 75, width: 52 },
    progress: [{ left: 64, role: "progress", top: 40, type: "LARGE_RIGHT" }],
    slots: {
      energy: { left: 151, top: 13, type: "power" },
      input: { left: 25, top: 35, type: "input" },
      output: { left: 151, top: 54, type: "output" },
    },
    tabs: DEFAULT_TABS,
    transmissions: ["energy", "item", "chemical"],
  },
  "pigment-mixer": {
    gauges: [
      { gauge: "standard", kind: "chemical", left: 25, role: "chemical-left", top: 13 },
      { gauge: "standard", kind: "chemical", left: 79, role: "chemical-center", top: 4 },
      { gauge: "standard", kind: "chemical", left: 133, role: "chemical-right", top: 13 },
    ],
    inventoryLabel: { end: 79, x: 8, y: 74 },
    player: DEFAULT_PLAYER,
    power: { horizontal: true, left: 115, top: 75, width: 52 },
    progress: [
      { left: 47, role: "progress-right", top: 39, type: "SMALL_RIGHT" },
      { left: 101, role: "progress-left", top: 39, type: "SMALL_LEFT" },
    ],
    slots: {
      energy: { left: 153, top: 13, type: "power" },
      left: { left: 5, top: 55, type: "input" },
      output: { left: 79, top: 64, type: "output" },
      right: { left: 153, top: 55, type: "input" },
    },
    tabs: DEFAULT_TABS,
    titleEnd: 79,
    titleX: 1,
    titleY: 5,
    transmissions: ["energy", "item", "chemical"],
  },
  "precision-sawmill": {
    arrows: [{ dir: "up", left: 60, top: 38 }],
    inventoryLabel: DEFAULT_LABEL,
    player: DEFAULT_PLAYER,
    power: { height: 15, left: 164, top: 15 },
    progress: [{ left: 78, role: "progress", top: 38, type: "BAR" }],
    slots: {
      energy: { left: 55, top: 52, type: "power" },
      input: { left: 55, top: 16, type: "input" },
      output: { left: 115, top: 34, type: "output" },
      secondary: { left: 131, top: 34, type: "output" },
    },
    tabs: DEFAULT_TABS,
  },
  "pressurized-reaction-chamber": {
    gauges: [
      { gauge: "standard", kind: "fluid", left: 5, role: "fluid", top: 15 },
      { gauge: "standard", kind: "chemical", left: 28, role: "chemical", top: 15 },
      { gauge: "small", kind: "chemical", left: 140, role: "chemical-out", top: 45 },
    ],
    height: 171,
    inventoryLabel: { x: 8, y: 77 },
    player: { hotbarY: 147, x: 8, y: 89 },
    power: { height: 52, left: 163, top: 21 },
    progress: [{ left: 77, role: "progress", top: 43, type: "RIGHT" }],
    slots: {
      energy: { left: 140, top: 21, type: "power" },
      input: { left: 53, top: 39, type: "input" },
      output: { left: 115, top: 39, type: "output" },
    },
    tabs: DEFAULT_TABS,
    transmissions: ["energy", "item", "chemical", "fluid"],
  },
  "purification-chamber": {
    bars: [{ height: 12, kind: "rate", left: 68, role: "chemical", tint: CHEMICAL_BAR, top: 36, width: 6 }],
    inventoryLabel: DEFAULT_LABEL,
    player: DEFAULT_PLAYER,
    power: { height: 52, left: 164, top: 16 },
    progress: [{ left: 86, role: "progress", top: 38, type: "BAR" }],
    slots: {
      energy: { left: 39, top: 34, type: "power" },
      input: { left: 63, top: 16, type: "input" },
      output: { left: 115, top: 34, type: "output" },
      secondary: { left: 63, top: 52, type: "extra" },
    },
    tabs: DEFAULT_TABS,
    transmissions: ["energy", "item", "chemical"],
  },
  "resistive-heater": {
    fields: [{ left: 50, role: "energy-usage", top: 51, width: 76 }],
    innerDefaults: { screen: "0 FE/t" },
    inners: [{ height: 42, left: 48, role: "screen", top: 23, width: 80 }],
    inventoryLabel: { x: 8, y: 74 },
    player: DEFAULT_PLAYER,
    power: { height: 15, left: 164, top: 15 },
    slots: {
      energy: { left: 14, top: 34, type: "power" },
    },
    tabs: ["upgrade", "security", "redstone", "energy", "heat"],
    transmissions: ["energy", "item"],
    warningSide: "right",
  },
  "rotary-condensentrator": {
    arrows: [{ dir: "down", left: 9, top: 44 }, { dir: "down", left: 159, top: 44 }],
    buttons: [
      { height: 18, kind: "toggle", label: "切换冷凝/去冷凝", left: 4, role: "mode", sprite: "button/toggle", spriteActive: "button/toggle_flipped", top: 4, width: 16 },
    ],
    gauges: [
      { gauge: "standard", kind: "fluid", left: 133, role: "fluid", top: 13 },
      { gauge: "standard", kind: "chemical", left: 25, role: "chemical", top: 13 },
    ],
    inventoryLabel: null,
    player: DEFAULT_PLAYER,
    power: { horizontal: true, left: 115, top: 75, width: 52 },
    progress: [
      { left: 64, role: "progress-right", top: 39, type: "LARGE_RIGHT", when: "condensentrating" },
      { left: 64, role: "progress-left", top: 39, type: "LARGE_LEFT", when: "decondensentrating" },
    ],
    slots: {
      energy: { left: 154, top: 4, type: "power" },
      fluidIn: { left: 154, top: 24, type: "input" },
      fluidOut: { left: 154, top: 55, type: "output" },
      gasIn: { left: 4, top: 24, type: "input" },
      gasOut: { left: 4, top: 55, type: "output" },
    },
    tabs: DEFAULT_TABS,
    textDefaults: { mode: "冷凝中" },
    texts: [{ left: 4, role: "mode", top: 74, width: 111 }],
    titleY: 4,
    transmissions: ["energy", "item", "chemical", "fluid"],
  },
  "solar-neutron-activator": {
    gauges: [
      { gauge: "standard", kind: "chemical", left: 25, role: "chemical-left", top: 13 },
      { gauge: "standard", kind: "chemical", left: 133, role: "chemical-right", top: 13 },
    ],
    inventoryLabel: { x: 8, y: 74 },
    player: DEFAULT_PLAYER,
    progress: [{ left: 64, role: "progress", top: 39, type: "LARGE_RIGHT" }],
    slots: {
      input: { left: 4, top: 55, type: "input" },
      output: { left: 154, top: 55, type: "output" },
    },
    tabs: ["config", "transporter", "upgrade", "security", "redstone"],
    titleY: 4,
    transmissions: ["energy", "item", "chemical"],
  },
} satisfies Record<string, MekanismMachineLayout>;

export type MekanismMachineKey = keyof typeof MEKANISM_MACHINES;

export const MEKANISM_MACHINE_TITLES: Record<MekanismMachineKey, string> = {
  "antiprotonic-nucleosynthesizer": "反质子核合成器",
  "chemical-crystallizer": "化学结晶器",
  "chemical-dissolution-chamber": "化学溶解仓",
  "chemical-infuser": "化学灌注机",
  "chemical-injection-chamber": "化学注入仓",
  "chemical-oxidizer": "化学氧化机",
  "chemical-washer": "化学清洗机",
  "combiner": "组合机",
  "crusher": "粉碎机",
  "electrolytic-separator": "电解分离器",
  "energized-smelter": "通电冶炼炉",
  "enrichment-chamber": "富集仓",
  "formulaic-assemblicator": "公式装配机",
  "isotopic-centrifuge": "同位素离心机",
  "metallurgic-infuser": "冶金灌注机",
  "nutritional-liquifier": "营养液化器",
  "osmium-compressor": "锇压缩机",
  "painting-machine": "染色机",
  "pigment-extractor": "颜料提取器",
  "pigment-mixer": "颜料混合器",
  "precision-sawmill": "精密锯木机",
  "pressurized-reaction-chamber": "加压反应室",
  "purification-chamber": "提纯仓",
  "resistive-heater": "电阻加热器",
  "rotary-condensentrator": "旋转冷凝器",
  "solar-neutron-activator": "太阳能中子激活器",
};
