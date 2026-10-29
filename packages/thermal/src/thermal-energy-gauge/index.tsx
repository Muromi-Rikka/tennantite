import { progressClipPath } from "@tennantite/mods-core";
import { gui } from "@tennantite/ui";
import { THERMAL_ENERGY_GAUGE } from "../thermal-metrics";
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
  const ratio = Math.min(1, Math.max(0, max === 0 ? 0 : value / max));
  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={Math.round(ratio * 100)}
      className="absolute"
      role="progressbar"
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
      title={label}
    >
      <ThermalSprite
        crop={THERMAL_ENERGY_GAUGE.trackCrop}
        height={height}
        name="elements/storage_energy"
        width={width}
      />
      <ThermalSprite
        crop={{ ...THERMAL_ENERGY_GAUGE.fillCrop, height: height - 2 }}
        height={height - 2}
        left={0}
        name="elements/storage_energy"
        style={{ clipPath: progressClipPath("up", ratio) }}
        tint={tint}
        top={1}
        width={width}
      />
    </div>
  );
}
