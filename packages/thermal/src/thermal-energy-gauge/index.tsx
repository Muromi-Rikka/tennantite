import { ModProgress } from "@tennantite/mods-core";

import { THERMAL_ENERGY_GAUGE, THERMAL_ITEM_GAUGE } from "../thermal-metrics";
import { ThermalSprite } from "../thermal-sprite/index";

export interface ThermalEnergyGaugeProps {
  /**
   * 目标高（GUI px，默认 42）
   */
  height?: number;
  /**
   * 可访问名称（暴露 progressbar 语义）
   */
  label: string;
  left: number;
  /**
   * 容量（默认 1）
   */
  max?: number;
  /**
   * 填充染色（multiply；默认上游储能原色）
   */
  tint?: string;
  top: number;
  /**
   * 当前值（默认 0）
   */
  value?: number;
  /**
   * 目标宽（GUI px，默认 16）
   */
  width?: number;
}

interface ThermalGaugeBaseProps {
  fillCrop: { height: number; width: number; x: number; y: number };
  height: number;
  label: string;
  left: number;
  max: number;
  tint?: string;
  top: number;
  trackCrop: { height: number; width: number; x: number; y: number };
  value: number;
  width: number;
}

function ThermalGaugeBase({
  fillCrop,
  height,
  label,
  left,
  max = 1,
  tint,
  top,
  trackCrop,
  value = 0,
  width,
}: ThermalGaugeBaseProps) {
  return (
    <ModProgress
      ariaValue="percent"
      direction="up"
      fill={(
        <ThermalSprite
          crop={{ ...fillCrop, height: height - 2 }}
          height={height - 2}
          left={0}
          name="elements/storage_energy"
          tint={tint}
          top={1}
          width={width}
        />
      )}
      height={height}
      label={label}
      left={left}
      max={max}
      top={top}
      track={(
        <ThermalSprite
          crop={trackCrop}
          height={height}
          name="elements/storage_energy"
          width={width}
        />
      )}
      value={value}
      width={width}
    />
  );
}

/**
 * Thermal 竖向能量表：storage_energy 图集背景 + 内缩裁剪的填充
 * （照 CoFH ElementEnergyStorage：上下各内缩 1，自下而上填充）。
 * 图集每格 16×42 自身左右各留 1 px 透明边（可见条 14 px），
 * 所以填充格必须与底图同起点同宽，横向不能再缩。
 */
export function ThermalEnergyGauge({
  height = THERMAL_ENERGY_GAUGE.machine.height,
  label,
  left,
  max = 1,
  tint,
  top,
  value = 0,
  width = THERMAL_ENERGY_GAUGE.machine.width,
}: ThermalEnergyGaugeProps) {
  return (
    <ThermalGaugeBase
      fillCrop={THERMAL_ENERGY_GAUGE.fillCrop}
      height={height}
      label={label}
      left={left}
      max={max}
      tint={tint}
      top={top}
      trackCrop={THERMAL_ENERGY_GAUGE.trackCrop}
      value={value}
      width={width}
    />
  );
}

/**
 * Thermal 物品缓存条：与能量表同构，使用 `THERMAL_ITEM_GAUGE` 的 16×34 图集。
 */
export function ThermalItemGauge({
  height = THERMAL_ITEM_GAUGE.height,
  label,
  left,
  max = 1,
  tint,
  top,
  value = 0,
  width = THERMAL_ITEM_GAUGE.width,
}: ThermalEnergyGaugeProps) {
  return (
    <ThermalGaugeBase
      fillCrop={THERMAL_ITEM_GAUGE.fillCrop}
      height={height}
      label={label}
      left={left}
      max={max}
      tint={tint}
      top={top}
      trackCrop={THERMAL_ITEM_GAUGE.trackCrop}
      value={value}
      width={width}
    />
  );
}
