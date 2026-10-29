import type { ThermalSpriteName } from "@tennantite/textures";

/**
 * Thermal 机器布局数据表：上游 Screen 类 `addElement(...)` 的坐标与贴图
 * 直接落表，组件只按数据渲染（照 mekanism-machine-layout 的 satisfies Record 模式）。
 * 坐标为窗口 GUI px（MachineFurnaceScreen，ThermalExpansion 24a2675）。
 */

export type ThermalMachineKey = "redstone_furnace";

export interface ThermalMachineLayout {
  /**
   * 容器背景（thermal 容器贴图，取 256×256 画布左上 176×166）
   */
  background: ThermalSpriteName;
  /**
   * 左侧能量表（MachineScreen 的 createDefaultEnergyStorage(8,8)）
   */
  energy: null | { height: number; left: number; top: number; width: number };
  /**
   * 输入槽（createInputSlot(53,26)，槽框已烘焙）
   */
  input: ThermalMachineSlotLayout;
  output: ThermalMachineSlotLayout;
  /**
   * 进度箭头（createDefaultProgress(79,35, PROG_ARROW_RIGHT)，左→右）
   */
  progress: null | ThermalMachineProgressLayout;
  /**
   * 处理速度火焰（createDefaultSpeed(53,44, SCALE_FLAME)，自下而上）
   */
  speed: null | ThermalMachineProgressLayout;
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

export const THERMAL_MACHINES = {
  redstone_furnace: {
    background: "container/furnace",
    energy: { height: 42, left: 8, top: 8, width: 16 },
    input: { label: "machine-input", left: 53, size: 18, top: 26 },
    output: { label: "machine-output", left: 111, size: 26, top: 30 },
    progress: {
      fillCrop: { height: 16, width: 24, x: 24, y: 0 },
      height: 16,
      left: 79,
      top: 35,
      trackCrop: { height: 16, width: 24, x: 0, y: 0 },
      width: 24,
    },
    speed: {
      fillCrop: { height: 16, width: 16, x: 16, y: 0 },
      height: 16,
      left: 53,
      top: 44,
      trackCrop: { height: 16, width: 16, x: 0, y: 0 },
      width: 16,
    },
    title: "红石炉",
  },
} satisfies Record<ThermalMachineKey, ThermalMachineLayout>;
