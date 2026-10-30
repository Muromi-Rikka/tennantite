import type { ThermalSpriteName } from "@tennantite/textures";

import { THERMAL_FLUID_STORAGE, THERMAL_PROGRESS_ARROW, THERMAL_SCALE_ELEMENT } from "./thermal-metrics";

/**
 * Thermal 机器布局数据表：上游 Screen 类 `addElement(...)` 的坐标与贴图
 * 直接落表，组件只按数据渲染（照 mekanism-machine-layout 的 satisfies Record 模式）。
 * 坐标为窗口 GUI px。18×18 槽取上游 `createInputSlot/createOutputSlot(x,y)` 的
 * (x-1,y-1)（slot.png 框 baked 于容器贴图），26×26 大槽取 `createLarge*Slot(x,y)` 的
 * (x-5,y-5)，进度/速度/流体表等元素按上游 posX/posY 直取。
 * 坐标自 CoFH/ThermalExpansion@24a2675（机器）与 CoFH/ThermalCore@cc7c230（设备/储仓）。
 */

export interface ThermalMachineFluidLayout {
  /**
   * 储罐边框精灵（storage_fluid_*.png，atlas 原点直取元素尺寸，
   * GuiHelper.create*FluidStorage 的 18×62/18×42/18×34）
   */
  frame: ThermalSpriteName;
  height: number;
  left: number;
  /**
   * 液位刻度 overlay（overlay_fluid_*.png，atlas 原点直取，叠于边框上）
   */
  overlay: ThermalSpriteName;
  top: number;
  width: number;
}

export type ThermalMachineKey = keyof typeof THERMAL_MACHINES;

export interface ThermalMachineLayout {
  /**
   * 容器背景（thermal 容器贴图，取 256×256 画布左上窗口区域）
   */
  background: ThermalSpriteName;
  /**
   * 左侧能量表（MachineScreen 的 createDefaultEnergyStorage(8,8)）
   */
  energy: null | { height: number; left: number; top: number; width: number };
  /**
   * 流体储罐（ElementFluidStorage：边框 + 内缩 1 px 的液体填充 + 液位刻度，
   * 填充自下而上，渲染照 IeFluidTank 的 clip-path 模式）
   */
  fluid?: ThermalMachineFluidLayout;
  /**
   * 额外流体储罐（多罐机器，如精炼机的 2 个产物罐；状态经 `fluids` 注入）
   */
  fluids?: ThermalMachineFluidLayout[];
  /**
   * 窗口高度（默认 166；组装机为 190）
   */
  height?: number;
  /**
   * 输入槽（createInputSlot(x,y)，槽框已烘焙；无输入槽的设备为 null）
   */
  input: null | ThermalMachineSlotLayout;
  /**
   * 额外输入槽（多输入/槽阵机器，状态经 `inputs` 注入）
   */
  inputs?: ThermalMachineSlotLayout[];
  output: null | ThermalMachineSlotLayout;
  /**
   * 额外输出槽（多产物机器，状态经 `outputs` 注入）
   */
  outputs?: ThermalMachineSlotLayout[];
  /**
   * 进度箭头（createDefaultProgress(x,y)，左→右）
   */
  progress: null | ThermalMachineProgressLayout;
  /**
   * 进度箭头贴图替换（默认 elements/progress_arrow_right，各 64×16 图集同构）
   */
  progressSprite?: ThermalSpriteName;
  /**
   * 第二产物槽（26×26 或 18×18）
   */
  secondaryOutput?: ThermalMachineSlotLayout;
  /**
   * 处理速度火焰（createDefaultSpeed(x,y)，自下而上）
   */
  speed: null | ThermalMachineProgressLayout;
  /**
   * 速度元素贴图替换（默认 elements/scale_flame，scale_*.png 各 32×16 图集同构）
   */
  speedSprite?: ThermalSpriteName;
  title: string;
}

export interface ThermalMachineProgressLayout {
  fillCrop: { height: number; width: number; x: number; y: number };
  height: number;
  left: number;
  top: number;
  trackCrop: { height: number; width: number; x: number; y: number };
  width: number;
}

export interface ThermalMachineSlotLayout {
  label: string;
  left: number;
  size: number;
  top: number;
}

const ENERGY = Object.freeze({ height: 42, left: 8, top: 8, width: 16 });

function progress(
  left: number,
  top: number,
): ThermalMachineProgressLayout {
  return { left, top, ...THERMAL_PROGRESS_ARROW };
}

function scale(left: number, top: number): ThermalMachineProgressLayout {
  return { left, top, ...THERMAL_SCALE_ELEMENT };
}

function slot(label: string, left: number, top: number, size = 18): ThermalMachineSlotLayout {
  return { label, left, size, top };
}

function tank(
  size: "large" | "medium" | "small",
  left: number,
  top: number,
): ThermalMachineFluidLayout {
  const geometry = THERMAL_FLUID_STORAGE[size];
  return {
    frame: `elements/storage_fluid_${size}`,
    height: geometry.height,
    left,
    overlay: `elements/overlay_fluid_${size}`,
    top,
    width: geometry.width,
  };
}

export const THERMAL_MACHINES = {
  // MachineBottlerScreen：createInputSlot(62,26)、createLargeOutputSlot(125,35)、
  // createMediumInputFluidStorage(34,22)、PROG_ARROW_FLUID_RIGHT(88,35)、SCALE_BUBBLE(62,44)
  bottler: {
    background: "container/bottler",
    energy: ENERGY,
    fluid: tank("medium", 34, 22),
    input: slot("machine-input", 61, 25),
    output: slot("machine-output", 120, 30, 26),
    progress: progress(87, 35),
    progressSprite: "elements/progress_arrow_fluid_right",
    speed: scale(61, 44),
    title: "灌装机",
  },

  // MachineBrewerScreen：createInputSlot(62,26)、createMediumInputFluidStorage(34,22)、
  // createMediumOutputFluidStorage(125,22)、PROG_DROP_RIGHT(88,35)、SCALE_ALCHEMY(62,44)
  brewer: {
    background: "container/brewer",
    energy: ENERGY,
    fluid: tank("medium", 34, 22),
    fluids: [tank("medium", 125, 22)],
    input: slot("machine-input", 61, 25),
    output: null,
    progress: progress(87, 35),
    progressSprite: "elements/progress_fluid_right",
    speed: scale(61, 44),
    title: "酿造机",
  },

  // MachineCentrifugeScreen：createInputSlot(44,26)、createOutputSlot ×4、
  // createMediumOutputFluidStorage(151,22)、PROG_ARROW_FLUID_RIGHT(72,35)、SCALE_SPIN(44,44)
  centrifuge: {
    background: "container/centrifuge",
    energy: ENERGY,
    fluid: tank("medium", 151, 22),
    input: slot("machine-input", 43, 25),
    output: slot("machine-output", 106, 25),
    outputs: [
      slot("machine-output-2", 124, 25),
      slot("machine-output-3", 106, 43),
      slot("machine-output-4", 124, 43),
    ],
    progress: progress(72, 35),
    progressSprite: "elements/progress_arrow_fluid_right",
    speed: scale(43, 44),
    title: "离心机",
  },

  // ChargeBenchScreen：createDefaultEnergyStorage(8,8)、SlotCoFH 3×3(62+18j,17+18i)、
  // SlotCoFH(8,53)(152,53)
  charge_bench: {
    background: "container/charge_bench",
    energy: ENERGY,
    input: slot("machine-input", 7, 52),
    inputs: [
      slot("charge-slot-1", 60, 16),
      slot("charge-slot-2", 78, 16),
      slot("charge-slot-3", 96, 16),
      slot("charge-slot-4", 60, 34),
      slot("charge-slot-5", 78, 34),
      slot("charge-slot-6", 96, 34),
      slot("charge-slot-7", 60, 52),
      slot("charge-slot-8", 78, 52),
      slot("charge-slot-9", 96, 52),
    ],
    output: slot("machine-output", 151, 52),
    progress: null,
    speed: null,
    title: "充能台",
  },

  // MachineChillerScreen：createInputSlot(62,26)、createLargeOutputSlot(125,35)、
  // createMediumInputFluidStorage(34,22)、PROG_ARROW_FLUID_RIGHT(88,35)、SCALE_SNOWFLAKE(62,44)
  chiller: {
    background: "container/chiller",
    energy: ENERGY,
    fluid: tank("medium", 34, 22),
    input: slot("machine-input", 61, 25),
    output: slot("machine-output", 120, 30, 26),
    progress: progress(87, 35),
    progressSprite: "elements/progress_arrow_fluid_right",
    speed: scale(61, 44),
    title: "冷冻机",
  },

  // DeviceCollectorScreen：SlotRemoveOnly 5×3(44+18j,17+18i)，无输入/能量
  collector: {
    background: "container/collector",
    energy: null,
    input: null,
    output: slot("machine-output", 43, 16),
    outputs: [
      slot("machine-output-2", 61, 16),
      slot("machine-output-3", 79, 16),
      slot("machine-output-4", 97, 16),
      slot("machine-output-5", 115, 16),
      slot("machine-output-6", 43, 34),
      slot("machine-output-7", 61, 34),
      slot("machine-output-8", 79, 34),
      slot("machine-output-9", 97, 34),
      slot("machine-output-10", 115, 34),
      slot("machine-output-11", 43, 52),
      slot("machine-output-12", 61, 52),
      slot("machine-output-13", 79, 52),
      slot("machine-output-14", 97, 52),
      slot("machine-output-15", 115, 52),
    ],
    progress: null,
    speed: null,
    title: "收集器",
  },

  // DeviceComposterScreen：仅 PROG_ARROW_RIGHT(87,35)，无槽位与能量表
  composter: {
    background: "container/composter",
    energy: null,
    input: null,
    output: null,
    progress: progress(87, 35),
    speed: null,
    title: "堆肥机",
  },

  // MachineCrafterScreen（imageHeight 190）：createInputSlot ×9(8+i·18,77)、
  // createLargeOutputSlot(143,21)、createMediumInputFluidStorage(29,22)、
  // PROG_ARROW_FLUID_RIGHT(110,22)、SetRecipe 按钮(142,52) 18×18
  crafter: {
    background: "container/crafter",
    energy: ENERGY,
    fluid: tank("medium", 29, 22),
    height: 190,
    input: slot("machine-input", 7, 76),
    inputs: [
      slot("machine-input-2", 25, 76),
      slot("machine-input-3", 43, 76),
      slot("machine-input-4", 61, 76),
      slot("machine-input-5", 79, 76),
      slot("machine-input-6", 97, 76),
      slot("machine-input-7", 115, 76),
      slot("machine-input-8", 133, 76),
      slot("machine-input-9", 151, 76),
    ],
    output: slot("machine-output", 138, 16, 26),
    progress: progress(110, 22),
    progressSprite: "elements/progress_arrow_fluid_right",
    speed: null,
    title: "组装机",
  },

  // MachineCrucibleScreen：createInputSlot(53,26)、createMediumOutputFluidStorage(125,22)、
  // PROG_DROP_RIGHT(84,35)、SCALE_FLAME(53,44)
  crucible: {
    background: "container/crucible",
    energy: ENERGY,
    fluid: tank("medium", 125, 22),
    input: slot("machine-input", 52, 25),
    output: null,
    progress: progress(84, 35),
    progressSprite: "elements/progress_fluid_right",
    speed: scale(52, 44),
    title: "熔解炉",
  },

  // MachineCrystallizerScreen：createInputSlot(62,26)(80,26)、createLargeOutputSlot(143,35)、
  // createMediumInputFluidStorage(34,22)、PROG_ARROW_FLUID_RIGHT(105,35)、SCALE_ALCHEMY(70,45)
  crystallizer: {
    background: "container/crystallizer",
    energy: ENERGY,
    fluid: tank("medium", 34, 22),
    input: slot("machine-input", 61, 25),
    inputs: [slot("machine-input-2", 79, 25)],
    output: slot("machine-output", 138, 30, 26),
    progress: progress(104, 35),
    progressSprite: "elements/progress_arrow_fluid_right",
    speed: scale(69, 44),
    title: "结晶机",
  },

  // DeviceFisherScreen：SlotCoFH 鱼饵(26,35)、SlotRemoveOnly 5×3(62+18j,17+18i)
  fisher: {
    background: "container/fisher",
    energy: null,
    input: slot("fisher-bait", 25, 34),
    output: slot("machine-output", 61, 16),
    outputs: [
      slot("machine-output-2", 79, 16),
      slot("machine-output-3", 97, 16),
      slot("machine-output-4", 115, 16),
      slot("machine-output-5", 133, 16),
      slot("machine-output-6", 61, 34),
      slot("machine-output-7", 79, 34),
      slot("machine-output-8", 97, 34),
      slot("machine-output-9", 115, 34),
      slot("machine-output-10", 133, 34),
      slot("machine-output-11", 61, 52),
      slot("machine-output-12", 79, 52),
      slot("machine-output-13", 97, 52),
      slot("machine-output-14", 115, 52),
      slot("machine-output-15", 133, 52),
    ],
    progress: null,
    speed: null,
    title: "捕鱼装置",
  },

  // DeviceHiveExtractorScreen：createMediumFluidStorage(116,22)
  hive_extractor: {
    background: "container/hive_extractor",
    energy: null,
    fluid: tank("medium", 116, 22),
    input: null,
    output: null,
    progress: null,
    speed: null,
    title: "蜂巢采集器",
  },

  // MachineInsolatorScreen：createInputSlot(62,17)(62,53)、createOutputSlot ×4(116/134,26/44)、
  // createMediumInputFluidStorage(34,22)、PROG_ARROW_FLUID_RIGHT(85,35)、SCALE_SUN(62,35)
  insolator: {
    background: "container/insolator",
    energy: ENERGY,
    fluid: tank("medium", 34, 22),
    input: slot("machine-input", 61, 16),
    inputs: [slot("machine-input-2", 61, 52)],
    output: slot("machine-output", 115, 25),
    outputs: [
      slot("machine-output-2", 133, 25),
      slot("machine-output-3", 115, 43),
      slot("machine-output-4", 133, 43),
    ],
    progress: progress(84, 35),
    progressSprite: "elements/progress_arrow_fluid_right",
    speed: scale(61, 35),
    title: "光合增幅机",
  },

  // DeviceNullifierScreen：SlotCoFH ×9(44+18j,17+18i)、清空按钮(131,33) 20×20（wrapper 注入）
  nullifier: {
    background: "container/nullifier",
    energy: null,
    input: slot("machine-input", 43, 16),
    inputs: [
      slot("machine-input-2", 61, 16),
      slot("machine-input-3", 79, 16),
      slot("machine-input-4", 43, 34),
      slot("machine-input-5", 61, 34),
      slot("machine-input-6", 79, 34),
      slot("machine-input-7", 43, 52),
      slot("machine-input-8", 61, 52),
      slot("machine-input-9", 79, 52),
    ],
    output: null,
    progress: null,
    speed: null,
    title: "销毁器",
  },

  // DevicePotionDiffuserScreen：createMediumFluidStorage(116,22)、SCALE_ALCHEMY(80,35) 时长
  potion_diffuser: {
    background: "container/potion_diffuser",
    energy: null,
    fluid: tank("medium", 116, 22),
    input: null,
    output: null,
    progress: null,
    speed: scale(80, 35),
    speedSprite: "elements/scale_alchemy",
    title: "药水扩散器",
  },

  // MachinePressScreen：createInputSlot(53,17)(53,53)、createLargeOutputSlot(116,35)、
  // createMediumOutputFluidStorage(151,22)、PROG_ARROW_FLUID_RIGHT(79,35)、SCALE_COMPACT(53,35)
  press: {
    background: "container/press",
    energy: ENERGY,
    fluid: tank("medium", 151, 22),
    input: slot("machine-input", 52, 16),
    inputs: [slot("machine-input-2", 52, 52)],
    output: slot("machine-output", 111, 30, 26),
    progress: progress(78, 35),
    progressSprite: "elements/progress_arrow_fluid_right",
    speed: scale(52, 35),
    title: "压缩机",
  },

  // MachinePulverizerScreen：createInputSlot(44,17)(44,53)、createOutputSlot ×4(107/125,26/44)、
  // PROG_ARROW_RIGHT(72,35)、SCALE_CRUSH(44,35)
  pulverizer: {
    background: "container/pulverizer",
    energy: ENERGY,
    input: slot("machine-input", 43, 16),
    inputs: [slot("machine-input-2", 43, 52)],
    output: slot("machine-output", 106, 25),
    outputs: [
      slot("machine-output-2", 124, 25),
      slot("machine-output-3", 106, 43),
      slot("machine-output-4", 124, 43),
    ],
    progress: progress(72, 35),
    speed: scale(44, 35),
    title: "粉碎机",
  },

  // MachinePyrolyzerScreen：createInputSlot(44,26)、createOutputSlot ×4、
  // createMediumOutputFluidStorage(151,22)、PROG_ARROW_FLUID_RIGHT(72,35)、SCALE_FLAME(44,44)
  pyrolyzer: {
    background: "container/pyrolyzer",
    energy: ENERGY,
    fluid: tank("medium", 151, 22),
    input: slot("machine-input", 43, 25),
    output: slot("machine-output", 106, 25),
    outputs: [
      slot("machine-output-2", 124, 25),
      slot("machine-output-3", 106, 43),
      slot("machine-output-4", 124, 43),
    ],
    progress: progress(71, 35),
    progressSprite: "elements/progress_arrow_fluid_right",
    speed: scale(43, 44),
    title: "热解炉",
  },

  // ── 设备族（ThermalCore cc7c230，Device*/TinkerBench/ChargeBench Screen 类）──

  redstone_furnace: {
    background: "container/furnace",
    energy: { height: 42, left: 8, top: 8, width: 16 },
    input: { label: "machine-input", left: 53, size: 18, top: 26 },
    output: { label: "machine-output", left: 111, size: 26, top: 30 },
    progress: progress(79, 35),
    speed: scale(53, 44),
    title: "红石炉",
  },

  // MachineRefineryScreen：createLargeOutputSlot(107,35)、createSmallInputFluidStorage(34,17)、
  // createMediumOutputFluidStorage(133,22)(151,22)、PROG_DROP_RIGHT(64,35)、SCALE_FLAME(35,53)
  refinery: {
    background: "container/refinery",
    energy: ENERGY,
    fluid: tank("small", 34, 17),
    fluids: [tank("medium", 133, 22), tank("medium", 151, 22)],
    input: null,
    output: slot("machine-output", 102, 30, 26),
    progress: progress(64, 35),
    progressSprite: "elements/progress_fluid_right",
    speed: scale(34, 52),
    title: "精炼机",
  },

  // DeviceRockGenScreen：PROG_ARROW_FLUID_RIGHT(84,35)、createSlot(44,46)（下方方块槽）、
  // ElementBlock 岩浆(33,24)/相邻(55,24)（wrapper 注入）
  rock_gen: {
    background: "container/rock_gen",
    energy: null,
    input: slot("rock-gen-below", 43, 45),
    output: null,
    progress: progress(84, 35),
    progressSprite: "elements/progress_arrow_fluid_right",
    speed: null,
    title: "岩石生成器",
  },

  // MachineSawmillScreen：createInputSlot(44,26)、createOutputSlot ×4、PROG_ARROW_RIGHT(72,35)、
  // SCALE_SAW(44,44)
  sawmill: {
    background: "container/sawmill",
    energy: ENERGY,
    input: slot("machine-input", 43, 25),
    output: slot("machine-output", 106, 25),
    outputs: [
      slot("machine-output-2", 124, 25),
      slot("machine-output-3", 106, 43),
      slot("machine-output-4", 124, 43),
    ],
    progress: progress(72, 35),
    speed: scale(44, 44),
    title: "锯木机",
  },

  // MachineSmelterScreen：createInputSlot(35/53/71,17)(53,53)、createOutputSlot ×4(125/143,26/44)、
  // PROG_ARROW_RIGHT(94,35)、SCALE_FLAME(53,35)
  smelter: {
    background: "container/smelter",
    energy: ENERGY,
    input: slot("machine-input", 34, 16),
    inputs: [slot("machine-input-2", 52, 16), slot("machine-input-3", 70, 16), slot("machine-input-4", 52, 52)],
    output: slot("machine-output", 124, 25),
    outputs: [
      slot("machine-output-2", 142, 25),
      slot("machine-output-3", 124, 43),
      slot("machine-output-4", 142, 43),
    ],
    progress: progress(94, 35),
    speed: scale(52, 35),
    title: "感应冶炼炉",
  },

  // DeviceSoilInfuserScreen：createDefaultEnergyStorage(8,8)、SCALE_FLAME_GREEN(44,34) 16×16
  soil_infuser: {
    background: "container/soil_infuser",
    energy: ENERGY,
    input: null,
    output: null,
    progress: null,
    speed: scale(44, 34),
    speedSprite: "elements/scale_flame_green",
    title: "土壤培肥机",
  },

  // TinkerBenchScreen：createDefaultEnergyStorage(8,8)、createMediumFluidStorage(151,8)、
  // tinkerSlot(44,26)、SlotCoFH(8,53)(152,53)、ElementAugmentSlots(80,17) 3×3、
  // 模式按钮(42,51) 20×20（wrapper 注入，tinker_bench_mode_augment/replenish 40×20 图集）
  tinker_bench: {
    background: "container/tinker_bench",
    energy: ENERGY,
    fluid: tank("medium", 151, 8),
    input: slot("tinker-slot", 43, 25),
    inputs: [
      slot("tinker-item-1", 7, 52),
      slot("tinker-item-2", 151, 52),
      slot("tinker-augment-1", 79, 16),
      slot("tinker-augment-2", 97, 16),
      slot("tinker-augment-3", 115, 16),
      slot("tinker-augment-4", 79, 34),
      slot("tinker-augment-5", 97, 34),
      slot("tinker-augment-6", 115, 34),
      slot("tinker-augment-7", 79, 52),
      slot("tinker-augment-8", 97, 52),
      slot("tinker-augment-9", 115, 52),
    ],
    output: null,
    progress: null,
    speed: null,
    title: "强化工作台",
  },

  // DeviceTreeExtractorScreen：createMediumFluidStorage(116,22)、SCALE_FLAME_GREEN(80,35) 时长
  tree_extractor: {
    background: "container/tree_extractor",
    energy: null,
    fluid: tank("medium", 116, 22),
    input: null,
    output: null,
    progress: null,
    speed: scale(80, 35),
    speedSprite: "elements/scale_flame_green",
    title: "树液采集器",
  },

  // DeviceWaterGenScreen：createMediumFluidStorage(116,22)
  water_gen: {
    background: "container/water_gen",
    energy: null,
    fluid: tank("medium", 116, 22),
    input: null,
    output: null,
    progress: null,
    speed: null,
    title: "集水器",
  },

  // DeviceXpCondenserScreen：createMediumFluidStorage(80,22)
  xp_condenser: {
    background: "container/xp_condenser",
    energy: null,
    fluid: tank("medium", 80, 22),
    input: null,
    output: null,
    progress: null,
    speed: null,
    title: "经验冷凝器",
  },
} satisfies Record<string, ThermalMachineLayout>;
