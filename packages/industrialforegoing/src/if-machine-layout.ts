import type { IfDyeColor, IfProgressKind } from "./if-metrics";
import { IF_BAR, IF_FACE_BUTTON } from "./if-metrics";

/**
 * Industrial Foregoing 1.21 机器界面数据驱动布局表。
 *
 * 坐标为面板 GUI px；`slots` 的 `(x, y)` 是物品图标左上角 —— 槽框画在
 * `(x - 1, y - 1)`，与上游 `SlotsScreenAddon` 的 `-1` 偏移一致。
 * `tanks` 的 `(x, y)` 是储罐外框左上角。
 */

export type IfButtonKind
  = | "baby-mode"
    | "dye-next"
    | "dye-prev"
    | "enchant-extract"
    | "ferm-production"
    | "ferm-seal"
    | "lock"
    | "mob-crusher"
    | "recipe";

export interface IfButtonSpec {
  height: number;
  id: string;
  kind: IfButtonKind;
  width: number;
  x: number;
  y: number;
}

export type IfFamily = "area" | "generator" | "machine" | "processing" | "working";

export interface IfFilterSlotSpec {
  color: IfDyeColor;
  id: string;
  x: number;
  y: number;
}

export interface IfLabelSpec {
  id: string;
  text: string;
  x: number;
  y: number;
}

export interface IfMachineSpec {
  areaButtons?: boolean;
  augments?: boolean;
  bar?: readonly [number, number];
  barDirection?: "arrow-down" | "arrow-right";
  block: string;
  buttons: IfButtonSpec[];
  energy?: boolean;
  family: IfFamily;
  filterSlots: IfFilterSlotSpec[];
  labels: IfLabelSpec[];
  overlays: IfOverlaySpec[];
  progresses: IfProgressSpec[];
  redstone?: boolean;
  slots: IfSlotGroup[];
  tankPanel?: boolean;
  tanks: IfTankSpec[];
  textFields: IfTextFieldSpec[];
  title: string;
}

export interface IfMycelialInput {
  color: IfDyeColor;
  kind: "slot" | "tank";
}

export interface IfOverlaySpec {
  id: string;
  size: number;
  x: number;
  y: number;
}

export interface IfProgressSpec {
  color: IfDyeColor;
  kind: IfProgressKind;
  name: string;
  x: number;
  y: number;
}

export interface IfSlotGroup {
  color: IfDyeColor;
  cols: number;
  facing?: number;
  name: string;
  /**
   * 覆盖格子偏移（相对 `x` / `y`），用于非矩形槽组
   */
  offsets?: ReadonlyArray<readonly [number, number]>;
  rows: number;
  x: number;
  y: number;
}

export interface IfTankSpec {
  color: IfDyeColor;
  facing?: number;
  name: string;
  size: "normal" | "small";
  x: number;
  y: number;
}

export interface IfTextFieldSpec {
  height: number;
  id: string;
  width: number;
  x: number;
  y: number;
}

function button(
  id: string,
  x: number,
  y: number,
  width: number,
  height: number,
  kind: IfButtonKind,
): IfButtonSpec {
  return { height, id, kind, width, x, y };
}

function filter(id: string, x: number, y: number, color: IfDyeColor): IfFilterSlotSpec {
  return { color, id, x, y };
}

function label(id: string, x: number, y: number, text: string): IfLabelSpec {
  return { id, text, x, y };
}

function overlay(id: string, x: number, y: number, size: number): IfOverlaySpec {
  return { id, size, x, y };
}

function progress(
  name: string,
  x: number,
  y: number,
  kind: IfProgressSpec["kind"],
  color: IfDyeColor,
): IfProgressSpec {
  return { color, kind, name, x, y };
}

function slot(
  name: string,
  x: number,
  y: number,
  cols: number,
  rows: number,
  color: IfDyeColor,
  facing?: number,
  offsets?: ReadonlyArray<readonly [number, number]>,
): IfSlotGroup {
  return { color, cols, facing, name, offsets, rows, x, y };
}

function tank(
  name: string,
  x: number,
  y: number,
  size: "normal" | "small",
  color: IfDyeColor,
  facing?: number,
): IfTankSpec {
  return { color, facing, name, size, x, y };
}

function textField(id: string): IfTextFieldSpec {
  return { height: 12, id, width: 40, x: 80, y: 26 };
}

export const IF_MYCEALIAL_VARIANTS = {
  crimed: {
    block: "mycelial_crimed",
    inputs: [{ color: "cyan", kind: "slot" }],
    title: "菌丝网络菌疣发电机",
  },
  culinary: {
    block: "mycelial_culinary",
    inputs: [{ color: "brown", kind: "slot" }],
    title: "菌丝网络烹饪发电机",
  },
  death: {
    block: "mycelial_death",
    inputs: [{ color: "yellow", kind: "slot" }],
    title: "菌丝网络死灵发电机",
  },
  disenchantment: {
    block: "mycelial_disenchantment",
    inputs: [{ color: "lime", kind: "slot" }, { color: "orange", kind: "slot" }],
    title: "菌丝网络附魔书发电机",
  },
  ender: {
    block: "mycelial_ender",
    inputs: [{ color: "green", kind: "slot" }],
    title: "菌丝网络末影发电机",
  },
  explosive: {
    block: "mycelial_explosive",
    inputs: [{ color: "red", kind: "slot" }],
    title: "菌丝网络爆炸发电机",
  },
  frosty: {
    block: "mycelial_frosty",
    inputs: [{ color: "light_blue", kind: "slot" }],
    title: "菌丝网络霜结发电机",
  },
  furnace: {
    block: "mycelial_furnace",
    inputs: [{ color: "blue", kind: "slot" }],
    title: "菌丝网络熔炉发电机",
  },
  halitosis: {
    block: "mycelial_halitosis",
    inputs: [{ color: "magenta", kind: "slot" }],
    title: "菌丝网络口臭发电机",
  },
  magma: {
    block: "mycelial_magma",
    inputs: [{ color: "orange", kind: "tank" }, { color: "red", kind: "slot" }],
    title: "菌丝网络熔岩发电机",
  },
  meatallurgic: {
    block: "mycelial_meatallurgic",
    inputs: [{ color: "brown", kind: "tank" }, { color: "yellow", kind: "slot" }],
    title: "菌丝网络矿物肉汤发电机",
  },
  netherstar: {
    block: "mycelial_netherstar",
    inputs: [{ color: "gray", kind: "slot" }],
    title: "菌丝网络下界之星发电机",
  },
  pink: {
    block: "mycelial_pink",
    inputs: [{ color: "pink", kind: "slot" }],
    title: "菌丝网络粉色发电机",
  },
  potion: {
    block: "mycelial_potion",
    inputs: [{ color: "purple", kind: "slot" }],
    title: "菌丝网络药水发电机",
  },
  rocket: {
    block: "mycelial_rocket",
    inputs: [{ color: "red", kind: "slot" }],
    title: "菌丝网络烟花火箭发电机",
  },
  slimey: {
    block: "mycelial_slimey",
    inputs: [{ color: "white", kind: "tank" }, { color: "lime", kind: "slot" }],
    title: "菌丝网络史莱姆发电机",
  },
} as const satisfies Record<string, { block: string; inputs: readonly IfMycelialInput[]; title: string }>;

export type IfMycelialGeneratorVariant = keyof typeof IF_MYCEALIAL_VARIANTS;

type IfMachineInput = Omit<
  IfMachineSpec,
  "buttons" | "filterSlots" | "labels" | "overlays" | "progresses" | "slots" | "tanks" | "textFields"
> & {
  buttons?: IfButtonSpec[];
  filterSlots?: IfFilterSlotSpec[];
  labels?: IfLabelSpec[];
  overlays?: IfOverlaySpec[];
  progresses?: IfProgressSpec[];
  slots?: IfSlotGroup[];
  tanks?: IfTankSpec[];
  textFields?: IfTextFieldSpec[];
};

/**
 * 菌丝发电机变体布局（单一来源；画廊与具名屏共用）。
 */
export function mycelialGeneratorSpec(variant: IfMycelialGeneratorVariant): IfMachineSpec {
  const meta = IF_MYCEALIAL_VARIANTS[variant];
  const slots: IfSlotGroup[] = [];
  const tanks: IfTankSpec[] = [];
  for (const [index, input] of meta.inputs.entries()) {
    const x = 44 + index * 21;
    if (input.kind === "tank") {
      tanks.push(tank(`input-${index}`, x, 20, "normal", input.color, index));
    }
    else {
      slots.push(slot(`input-${index}`, x, 22, 1, 1, input.color, index));
    }
  }

  return {
    augments: false,
    bar: undefined,
    block: meta.block,
    buttons: [],
    energy: true,
    family: "generator",
    filterSlots: [],
    labels: [],
    overlays: [],
    progresses: [],
    redstone: false,
    slots,
    tankPanel: false,
    tanks,
    textFields: [],
    title: meta.title,
  };
}

function machine(spec: IfMachineInput): IfMachineSpec {
  return {
    buttons: [],
    filterSlots: [],
    labels: [],
    overlays: [],
    progresses: [],
    slots: [],
    tanks: [],
    textFields: [],
    ...spec,
  };
}

export const IF_MACHINES = {
  animalBabySeparator: machine({
    block: "animal_baby_separator",
    buttons: [button("baby-mode", 42, 20, 18, 18, "baby-mode")],
    family: "area",
    overlays: [overlay("mode-item", 42, 20, 16)],
    title: "幼仔分管机",
  }),
  animalFeeder: machine({
    block: "animal_feeder",
    family: "area",
    slots: [slot("food", 53, 22, 6, 3, "blue", 0)],
    title: "饲育机",
  }),
  animalRancher: machine({
    block: "animal_rancher",
    family: "area",
    slots: [slot("output", 74, 22, 5, 3, "orange", 1)],
    tanks: [tank("fluid_output", 47, 20, "normal", "white", 0)],
    title: "动物资源收获机",
  }),
  biofuelGenerator: machine({
    block: "biofuel_generator",
    family: "generator",
    tanks: [tank("biofuel", 43, 20, "normal", "purple", 0)],
    title: "生物燃油发电机",
  }),
  bioreactor: machine({
    block: "bioreactor",
    buttons: [button("lock", 136, 84, 14, 14, "lock")],
    family: "working",
    progresses: [progress("efficiency", 150, 20, "vertical", "yellow")],
    slots: [slot("input", 69, 22, 3, 3, "blue", 1)],
    tanks: [
      tank("water", 45, 20, "normal", "cyan", 0),
      tank("biofuel", 128, 20, "normal", "purple", 2),
    ],
    title: "生物质炉",
  }),
  blockBreaker: machine({
    block: "block_breaker",
    family: "area",
    slots: [slot("output", 54, 22, 6, 3, "orange", 0)],
    title: "方块破坏器",
  }),
  blockPlacer: machine({
    block: "block_placer",
    family: "area",
    slots: [slot("input", 54, 22, 6, 3, "blue", 0)],
    title: "方块放置器",
  }),
  dissolutionChamber: machine({
    bar: [102, 41],
    block: "dissolution_chamber",
    buttons: [button("lock", 100, 64, 14, 14, "lock")],
    family: "processing",
    slots: [
      slot("input", 34, 19, 1, 1, "light_blue", 0, [
        [0, 0],
        [22, -2],
        [44, 0],
        [-2, 22],
        [46, 22],
        [0, 44],
        [22, 46],
        [44, 44],
      ]),
      slot("output", 129, 22, 1, 3, "orange", 2),
    ],
    tanks: [
      tank("input_fluid", 55, 40, "small", "lime", 1),
      tank("output_fluid", 149, 20, "normal", "magenta", 3),
    ],
    title: "溶解成型机",
  }),
  dyeMixer: machine({
    bar: [96, 40],
    block: "dye_mixer",
    buttons: [
      button("dye-prev", 116, 22, 14, 14, "dye-prev"),
      button("dye-next", 154, 22, 14, 14, "dye-next"),
    ],
    family: "processing",
    overlays: [overlay("dye", 133, 20, 16)],
    progresses: [
      progress("red", 53, 20, "vertical", "red"),
      progress("blue", 66, 20, "vertical", "blue"),
      progress("green", 79, 20, "vertical", "green"),
    ],
    slots: [
      slot("input_red", 33, 21, 1, 1, "red", 0),
      slot("input_green", 33, 40, 1, 1, "green", 1),
      slot("input_blue", 33, 59, 1, 1, "blue", 2),
      slot("output", 134, 58, 1, 1, "orange", 3),
    ],
    title: "颜料调色器",
  }),
  enchantmentApplicator: machine({
    bar: [112, 40],
    block: "enchantment_applicator",
    family: "processing",
    overlays: [overlay("enchant-icon", 158, 4, 14)],
    slots: [
      slot("inputFirst", 60, 40, 1, 1, "blue", 1),
      slot("inputSecond", 85, 40, 1, 1, "magenta", 2),
      slot("output", 145, 40, 1, 1, "orange", 3),
    ],
    tanks: [tank("essence", 34, 20, "normal", "lime", 0)],
    title: "自动化附魔铁砧",
  }),
  enchantmentExtractor: machine({
    bar: [62, 40],
    block: "enchantment_extractor",
    buttons: [button("enchant-extract", 66, 58, 14, 14, "enchant-extract")],
    family: "processing",
    slots: [
      slot("inputEnchantedItem", 40, 22, 1, 1, "blue", 0),
      slot("inputBook", 40, 58, 1, 1, "brown", 1),
      slot("outputNoEnchantedItem", 90, 22, 3, 1, "orange", 2),
      slot("outputEnchantedBook", 90, 58, 3, 1, "magenta", 3),
    ],
    tanks: [tank("essence", 150, 20, "normal", "lime", 4)],
    title: "附魔提取机",
  }),
  enchantmentFactory: machine({
    bar: [100, 54],
    block: "enchantment_factory",
    family: "processing",
    labels: [
      label("level", 60, 24, "附魔等级："),
      label("cost", 60, 38, "花费："),
    ],
    overlays: [overlay("enchant-icon", 158, 4, 14)],
    slots: [
      slot("input", 70, 54, 1, 1, "blue", 1),
      slot("output", 135, 54, 1, 1, "orange", 2),
    ],
    tanks: [tank("essence", 34, 20, "normal", "lime", 0)],
    textFields: [textField("level")],
    title: "自动附魔机",
  }),
  enchantmentSorter: machine({
    bar: [57, 40],
    block: "enchantment_sorter",
    family: "processing",
    slots: [
      slot("input", 35, 40, 1, 1, "blue", 0),
      slot("noEnchanted", 90, 20, 4, 1, "orange", 1),
      slot("enchanted", 90, 60, 4, 1, "magenta", 2),
    ],
    title: "附魔与非附魔物品分拣机",
  }),
  fermentationStation: machine({
    bar: [90, 40],
    block: "fermentation_station",
    buttons: [
      button("ferm-seal", 75, 22, 14, 14, "ferm-seal"),
      button("ferm-production", 110, 22, 14, 14, "ferm-production"),
    ],
    family: "processing",
    tanks: [
      tank("input", 50, 20, "normal", "brown", 0),
      tank("output", 130, 20, "normal", "orange", 1),
      tank("catalyst", 90, 60, "small", "lime", 2),
    ],
    title: "发酵站",
  }),
  fluidCollector: machine({
    block: "fluid_collector",
    family: "area",
    tanks: [tank("output", 43, 20, "normal", "orange", 0)],
    title: "流体收集器",
  }),
  fluidExtractor: machine({
    block: "fluid_extractor",
    family: "area",
    tanks: [tank("latex", 43, 20, "normal", "light_gray", 0)],
    title: "液体提取机",
  }),
  fluidLaserBase: machine({
    block: "fluid_laser_base",
    energy: false,
    family: "machine",
    labels: [label("depth", 70, 87, "深度：")],
    progresses: [progress("work", 74, 42, "arrow-right", "white")],
    slots: [slot("lens", 50, 42, 1, 1, "blue", 0)],
    tanks: [tank("output", 102, 20, "normal", "orange", 1)],
    textFields: [textField("depth")],
    title: "流体镭射钻基座",
  }),
  fluidPlacer: machine({
    block: "fluid_placer",
    family: "area",
    tanks: [tank("input", 43, 20, "normal", "blue", 0)],
    title: "流体放置器",
  }),
  fluidSievingMachine: machine({
    bar: [106, 40],
    block: "fluid_sieving_machine",
    family: "processing",
    slots: [
      slot("sand", 60, 31, 2, 2, "yellow", 1),
      slot("output", 140, 40, 1, 1, "orange", 2),
    ],
    tanks: [tank("input", 35, 20, "normal", "brown", 0)],
    title: "流体筛分机",
  }),
  hydroponicBed: machine({
    block: "hydroponic_bed",
    family: "working",
    progresses: [progress("ether", 63, 20, "vertical", "cyan")],
    slots: [
      slot("output", 79, 22, 5, 3, "orange", 2),
      slot("simulation", 106, 80, 1, 1, "lime", 3),
    ],
    tanks: [
      tank("water", 43, 20, "small", "blue", 0),
      tank("ether", 43, 57, "small", "cyan", 1),
    ],
    title: "水培床",
  }),
  infinityCharger: machine({
    block: "infinity_charger",
    family: "machine",
    slots: [slot("charging", 80, 40, 1, 1, "blue", 0)],
    title: "无限电池",
  }),
  laserDrill: machine({
    block: "laser_drill",
    family: "area",
    labels: [
      label("target", 44, 26, "目标："),
      label("coords", 44, 36, ""),
    ],
    title: "镭射钻",
  }),
  latexProcessingUnit: machine({
    bar: [73, 40],
    block: "latex_processing_unit",
    family: "processing",
    slots: [slot("output", 104, 22, 3, 3, "orange", 2)],
    tanks: [
      tank("latex", 29, 20, "normal", "light_gray", 0),
      tank("water", 48, 20, "normal", "blue", 1),
    ],
    title: "胶乳加工机",
  }),
  marineFisher: machine({
    block: "marine_fisher",
    family: "area",
    slots: [slot("output", 50, 22, 6, 3, "orange", 0)],
    title: "钓鱼机",
  }),
  materialStoneWorkFactory: machine({
    bar: [48, 40],
    block: "material_stonework_factory",
    buttons: [
      button("recipe-0", 54, 64, 18, 18, "recipe"),
      button("recipe-1", 82, 64, 18, 18, "recipe"),
      button("recipe-2", 102, 64, 18, 18, "recipe"),
      button("recipe-3", 122, 64, 18, 18, "recipe"),
      button("recipe-4", 142, 64, 18, 18, "recipe"),
    ],
    family: "processing",
    overlays: [
      overlay("recipe-0", 55, 65, 16),
      overlay("recipe-1", 83, 65, 16),
      overlay("recipe-2", 103, 65, 16),
      overlay("recipe-3", 123, 65, 16),
      overlay("recipe-4", 143, 65, 16),
    ],
    slots: [
      slot("inventoryGenerator", 74, 23, 1, 2, "lime", 2, [[0, 0], [0, 18]]),
      slot("inventoryFirst", 94, 23, 1, 2, "cyan", 3, [[0, 0], [0, 18]]),
      slot("inventorySecond", 114, 23, 1, 2, "yellow", 4, [[0, 0], [0, 18]]),
      slot("inventoryThird", 134, 23, 1, 2, "red", 5, [[0, 0], [0, 18]]),
      slot("inventoryFourth", 154, 23, 1, 2, "green", 6, [[0, 0], [0, 18]]),
    ],
    tanks: [
      tank("water", 30, 23, "small", "blue", 0),
      tank("lava", 30, 55, "small", "orange", 1),
    ],
    title: "造石加工机",
  }),
  mechanicalDirt: machine({
    block: "mechanical_dirt",
    family: "working",
    tanks: [tank("meat", 43, 20, "normal", "brown", 0)],
    title: "机械诅咒之土",
  }),
  mobCrusher: machine({
    block: "mob_crusher",
    buttons: [button("mob-crusher", 100, 84, 14, 14, "mob-crusher")],
    family: "area",
    slots: [slot("output", 64, 22, 6, 3, "orange", 1)],
    tanks: [tank("essence", 43, 20, "normal", "lime", 0)],
    title: "屠宰机",
  }),
  mobDetector: machine({
    block: "mob_detector",
    family: "area",
    title: "生物探测器",
  }),
  mobDuplicator: machine({
    block: "mob_duplicator",
    family: "area",
    slots: [slot("mob_imprisonment_tool", 64, 22, 1, 1, "orange", 1)],
    tanks: [tank("essence", 43, 20, "normal", "lime", 0)],
    title: "自动刷怪机",
  }),
  mycelialGenerator: machine({
    block: "mycelial_furnace",
    family: "generator",
    title: "菌丝网络发电机",
  }),
  mycelialReactor: machine({
    block: "mycelial_reactor",
    family: "generator",
    title: "菌丝网络产能反应堆",
  }),
  oreLaserBase: machine({
    block: "ore_laser_base",
    energy: false,
    family: "machine",
    labels: [label("depth", 70, 87, "深度：")],
    progresses: [progress("work", 12, 22, "vertical", "yellow")],
    slots: [
      slot("lens", 30, 24, 2, 3, "blue", 0),
      slot("output", 74, 24, 5, 3, "orange", 1),
    ],
    textFields: [textField("depth")],
    title: "镭射钻基座",
  }),
  pitifulGenerator: machine({
    block: "pitiful_generator",
    family: "generator",
    slots: [slot("fuel_input", 46, 22, 1, 1, "orange", 0)],
    title: "低端火力发电机",
  }),
  plantFertilizer: machine({
    block: "plant_fertilizer",
    family: "area",
    slots: [slot("fertilizer", 50, 22, 6, 3, "brown", 0)],
    title: "施肥机",
  }),
  plantGatherer: machine({
    block: "plant_gatherer",
    family: "area",
    progresses: [progress("ether", 63, 20, "vertical", "cyan")],
    slots: [slot("output", 78, 22, 5, 3, "orange", 0)],
    tanks: [
      tank("sludge", 43, 20, "small", "magenta", 1),
      tank("ether", 43, 57, "small", "cyan", 2),
    ],
    title: "收割机",
  }),
  plantSower: machine({
    block: "plant_sower",
    buttons: [button("lock", 100, 84, 14, 14, "lock")],
    family: "area",
    filterSlots: Array.from({ length: 9 }, (_, index) => {
      const colors: IfDyeColor[] = ["red", "yellow", "lime", "cyan", "white", "blue", "purple", "magenta", "black"];
      return filter(
        `filter-${index}`,
        45 + (index % 3) * 18,
        21 + Math.floor(index / 3) * 18,
        colors[index] ?? "white",
      );
    }),
    slots: [slot("input", 108, 22, 3, 3, "cyan", 0)],
    title: "播种机",
  }),
  potionBrewer: machine({
    bar: [100, 38],
    barDirection: "arrow-down",
    block: "potion_brewer",
    buttons: [button("lock", 148, 40, 14, 14, "lock")],
    family: "processing",
    filterSlots: [filter("filter-0", 140, 63, "lime")],
    progresses: [progress("blaze", 30, 20, "vertical", "orange")],
    slots: [
      slot("brewingInput", 55, 19, 6, 1, "blue", 3),
      slot("blazeInput", 45, 61, 1, 1, "orange", 2),
      slot("bottleInput", 123, 42, 1, 1, "yellow", 1),
      slot("output", 82, 64, 3, 1, "magenta", 4),
    ],
    tanks: [tank("water", 75, 40, "small", "cyan", 0)],
    title: "自动炼药机",
  }),
  resourcefulFurnace: machine({
    bar: [74, 40],
    block: "resourceful_furnace",
    family: "processing",
    slots: [
      slot("input", 44, 22, 1, 3, "blue", 0),
      slot("output", 110, 22, 1, 3, "orange", 1),
    ],
    tanks: [tank("essence", 132, 20, "normal", "lime", 2)],
    title: "高级熔炉",
  }),
  sewageComposter: machine({
    bar: [57, 40],
    block: "sewage_composter",
    family: "processing",
    slots: [slot("fertilizer", 90, 22, 4, 3, "orange", 1)],
    tanks: [tank("sewage", 30, 20, "normal", "brown", 0)],
    title: "污水堆肥机",
  }),
  sewer: machine({
    block: "sewer",
    family: "area",
    tanks: [
      tank("sewage", 45, 20, "normal", "brown", 0),
      tank("essence", 66, 20, "normal", "lime", 1),
    ],
    title: "排污器",
  }),
  simulatedHydroponicBed: machine({
    block: "simulated_hydroponic_bed",
    family: "working",
    slots: [
      slot("output", 45, 22, 7, 3, "orange", 0),
      slot("simulation", 106, 80, 1, 1, "lime", 1),
      slot("seed", 79, 80, 1, 1, "cyan", 2),
    ],
    title: "模拟水培床",
  }),
  slaughterFactory: machine({
    block: "mob_slaughter_factory",
    family: "area",
    tanks: [
      tank("meat", 43, 20, "normal", "brown", 0),
      tank("pink_slime", 63, 20, "normal", "pink", 1),
    ],
    title: "屠宰场",
  }),
  sludgeRefiner: machine({
    bar: [53, 40],
    block: "sludge_refiner",
    family: "processing",
    slots: [slot("output", 80, 22, 5, 3, "orange", 1)],
    tanks: [tank("sludge", 31, 20, "normal", "magenta", 0)],
    title: "污泥精炼机",
  }),
  sporesRecreator: machine({
    bar: [79, 40],
    block: "spores_recreator",
    family: "processing",
    slots: [
      slot("input", 53, 22, 1, 3, "blue", 1),
      slot("output", 110, 22, 3, 3, "orange", 2),
    ],
    tanks: [tank("water", 31, 20, "normal", "cyan", 0)],
    title: "蘑菇孢子繁殖器",
  }),
  stasisChamber: machine({
    block: "stasis_chamber",
    family: "area",
    title: "生物静滞室",
  }),
  washingFactory: machine({
    bar: [100, 40],
    block: "washing_factory",
    family: "processing",
    slots: [slot("input", 40, 40, 1, 1, "blue", 0)],
    tanks: [
      tank("meat", 70, 20, "normal", "brown", 1),
      tank("output", 135, 20, "normal", "orange", 2),
    ],
    title: "洗矿厂",
  }),
  waterCondensator: machine({
    block: "water_condensator",
    family: "working",
    tanks: [tank("water", 43, 20, "normal", "blue", 0)],
    title: "蓄水器",
  }),
  witherBuilder: machine({
    block: "wither_builder",
    family: "area",
    slots: [
      slot("wither_skulls", 64, 25, 3, 1, "black", 0),
      slot("soulsand", 64, 43, 1, 1, "brown", 1, [[0, 0], [18, 0], [36, 0], [18, 18]]),
    ],
    title: "凋灵生成器",
  }),
} satisfies Record<string, IfMachineSpec>;

export type IfMachineKey = keyof typeof IF_MACHINES;

export const IF_MACHINE_KEYS = Object.keys(IF_MACHINES) as IfMachineKey[];

export interface IfResolvedBar {
  color: IfDyeColor;
  kind: IfProgressKind;
  x: number;
  y: number;
}

export interface IfResolvedFace {
  color: IfDyeColor;
  id: string;
  x: number;
  y: number;
}

/**
 * 把 48 条预设 + 菌丝变体解析成屏幕可直接渲染的完整布局。
 */
export function resolveIfMachineLayout(
  key: IfMachineKey,
  variant?: IfMycelialGeneratorVariant,
): {
  areaButtons: boolean;
  augments: boolean;
  bar: IfResolvedBar | null;
  energy: boolean;
  faces: IfResolvedFace[];
  redstone: boolean;
  spec: IfMachineSpec;
  tankPanel: boolean;
} {
  const spec = key === "mycelialGenerator" && variant
    ? mycelialGeneratorSpec(variant)
    : IF_MACHINES[key];
  const family = spec.family;

  let bar: IfResolvedBar | null = null;
  switch (family) {
    case "area":
    case "working": {
      bar = { color: "white", kind: "vertical", x: IF_BAR.left, y: IF_BAR.top };

      break;
    }
    case "generator": {
      bar = { color: "cyan", kind: "vertical", x: IF_BAR.left, y: IF_BAR.top };

      break;
    }
    case "processing": {
      bar = {
        color: "white",
        kind: spec.barDirection ?? "arrow-right",
        x: spec.bar?.[0] ?? 0,
        y: spec.bar?.[1] ?? 0,
      };

      break;
    }
  // No default
  }

  const faces: IfResolvedFace[] = [];
  for (const group of spec.slots) {
    if (group.facing !== undefined) {
      faces.push({
        color: group.color,
        id: group.name,
        x: IF_FACE_BUTTON.left + IF_FACE_BUTTON.step * group.facing,
        y: IF_FACE_BUTTON.top,
      });
    }
  }
  for (const tankSpec of spec.tanks) {
    if (tankSpec.facing !== undefined) {
      faces.push({
        color: tankSpec.color,
        id: tankSpec.name,
        x: IF_FACE_BUTTON.left + IF_FACE_BUTTON.step * tankSpec.facing,
        y: IF_FACE_BUTTON.top,
      });
    }
  }

  return {
    areaButtons: spec.areaButtons ?? family === "area",
    augments: spec.augments ?? family !== "generator",
    bar,
    energy: spec.energy ?? true,
    faces,
    redstone: spec.redstone ?? family !== "generator",
    spec,
    tankPanel: spec.tankPanel ?? (spec.tanks.length > 0 && family !== "generator"),
  };
}
