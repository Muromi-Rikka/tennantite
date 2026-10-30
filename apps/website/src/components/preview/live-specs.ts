import type { Ae2InscriberScreenDemo } from "@tennantite/ae2/demos";
import type { CreateMillstoneScreenDemo } from "@tennantite/create/demos";
import type { EioSagMillScreenDemo } from "@tennantite/enderio/demos";
import type { FdCookingPotScreenDemo } from "@tennantite/farmersdelight/demos";
import type { ElectricFurnaceScreenDemo } from "@tennantite/ic2/demos";
import type { IeAssemblerScreenDemo, IeMetalPressScreenDemo } from "@tennantite/ie/demos";
import type { IfMachineScreenDemo } from "@tennantite/industrialforegoing/demos";
import type { MekanismMachineScreenDemo } from "@tennantite/mekanism/demos";
import type { ThermalMachineScreenDemo, ThermalRedstoneFurnaceScreenDemo } from "@tennantite/thermal/demos";
import type {
  BlastFurnaceScreenDemo,
  BrewingStandScreenDemo,
  FurnaceScreenDemo,
  SmokerScreenDemo,
} from "@tennantite/ui/demos";

/**
 * 一格 = 50ms，与 Minecraft 游戏刻 20 tick/s 一致。
 * 驱动 hook（live-demo.tsx）与下面各周期的 tick 换算共用这一个常量。
 */
export const TICK_MS = 50;

const TICKS_PER_SECOND = 1000 / TICK_MS;

const THERMAL_CAPACITY = 400000;

export interface LiveSpec {
  /**
   * 把 tick 数换算成 demo 的覆盖 props；纯函数，可安全地在渲染期调用。
   */
  props: (tick: number) => object;
}

/**
 * `{ max, value }` 形状的能量（IC2 / Mekanism / IE / EnderIO / IF）。
 */
function energy(max: number, tick: number, seconds: number, from: number, to: number): { max: number; value: number } {
  return { max, value: Math.round(max * lerp(from, to, wave(tick, seconds))) };
}

function lerp(from: number, to: number, ratio: number): number {
  return from + (to - from) * ratio;
}

/**
 * 0→1 线性锯齿：每 `seconds` 秒归零一次（进度箭头）。
 */
function saw(tick: number, seconds: number): number {
  const period = Math.max(1, Math.round(seconds * TICKS_PER_SECOND));
  return (tick % period) / period;
}

/**
 * `{ amount, capacity }` 形状的能量（Thermal 机器 400k RF 储能的消耗波动）。
 */
function thermalEnergy(tick: number): { amount: number; capacity: number } {
  return { amount: Math.round(THERMAL_CAPACITY * lerp(0.45, 0.85, wave(tick, 30))), capacity: THERMAL_CAPACITY };
}

/**
 * 0→1→0 三角波：每 `seconds` 秒往返一次（火焰、能量）。
 */
function wave(tick: number, seconds: number): number {
  const phase = saw(tick, seconds);
  return phase < 0.5 ? phase * 2 : 2 - phase * 2;
}

/**
 * 官网预览的动效配置：键为 demo 名（与 `demo.tsx` 的 `${name}Demo` 注册表一致）。
 * 未列入的 demo 保持静态。
 */
export const LIVE_SPECS: Record<string, LiveSpec> = {
  Ae2InscriberScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof Ae2InscriberScreenDemo>[0]> => ({
      progress: saw(tick, 6),
    }),
  },
  BlastFurnaceScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof BlastFurnaceScreenDemo>[0]> => ({
      burnProgress: lerp(0.55, 1, wave(tick, 4)),
      cookProgress: saw(tick, 5),
    }),
  },
  BrewingStandScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof BrewingStandScreenDemo>[0]> => ({
      brewProgress: saw(tick, 20),
      fuelProgress: lerp(0.25, 1, wave(tick, 30)),
    }),
  },
  CreateMillstoneScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof CreateMillstoneScreenDemo>[0]> => ({
      progress: saw(tick, 6),
    }),
  },
  EioSagMillScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof EioSagMillScreenDemo>[0]> => ({
      energy: energy(100000, tick, 24, 0.5, 0.9),
      progress: saw(tick, 6),
    }),
  },
  ElectricFurnaceScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof ElectricFurnaceScreenDemo>[0]> => ({
      energy: energy(2000, tick, 20, 0.55, 1),
      progress: saw(tick, 8),
    }),
  },
  FdCookingPotScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof FdCookingPotScreenDemo>[0]> => ({
      progress: saw(tick, 10),
    }),
  },
  FurnaceScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof FurnaceScreenDemo>[0]> => ({
      burnProgress: lerp(0.55, 1, wave(tick, 4)),
      cookProgress: saw(tick, 10),
    }),
  },
  IeAssemblerScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof IeAssemblerScreenDemo>[0]> => ({
      energy: energy(32000, tick, 26, 0.45, 0.9),
    }),
  },
  IeMetalPressScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof IeMetalPressScreenDemo>[0]> => ({
      progress: saw(tick, 6),
    }),
  },
  IfMachineScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof IfMachineScreenDemo>[0]> => ({
      energy: energy(1000, tick, 20, 0.5, 0.9),
      progress: { bar: saw(tick, 6) },
    }),
  },
  MekanismMachineScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof MekanismMachineScreenDemo>[0]> => ({
      energy: energy(10000, tick, 24, 0.5, 0.95),
      progress: { progress: saw(tick, 6) },
    }),
  },
  SmokerScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof SmokerScreenDemo>[0]> => ({
      burnProgress: lerp(0.55, 1, wave(tick, 4)),
      cookProgress: saw(tick, 2.5),
    }),
  },
  ThermalMachineScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof ThermalMachineScreenDemo>[0]> => ({
      energy: thermalEnergy(tick),
      progress: saw(tick, 8),
      speed: lerp(0.5, 1, wave(tick, 4)),
    }),
  },
  ThermalRedstoneFurnaceScreenDemo: {
    props: (tick): NonNullable<Parameters<typeof ThermalRedstoneFurnaceScreenDemo>[0]> => ({
      energy: thermalEnergy(tick),
      progress: saw(tick, 8),
      speed: lerp(0.5, 1, wave(tick, 4)),
    }),
  },
};
