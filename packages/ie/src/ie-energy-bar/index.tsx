import { progressClipPath } from "@tennantite/mods-core";
import { gui } from "@tennantite/ui";

import { IE_ENERGY_BAR, IE_ENERGY_GRADIENT } from "../ie-metrics";

export interface IeEnergyBarProps {
  className?: string;
  /**
   * 渐变起点/终点（默认 EnergyInfoArea 的 0xffb51500 → 0xff600b00）
   */
  gradient?: { from: string; to: string };
  /**
   * 高度（GUI px，默认 EnergyInfoArea 的 46）
   */
  height?: number;
  label?: string;
  left: number;
  max: number;
  top: number;
  value: number;
  /**
   * 宽度（GUI px，默认 EnergyInfoArea 的 7）
   */
  width?: number;
}

/**
 * IE 能量条（`EnergyInfoArea`：7×46 区域，fillGradient 自下而上填充，
 * 存量越少越暗）。
 */
export function IeEnergyBar({
  className = "",
  gradient = IE_ENERGY_GRADIENT,
  height = IE_ENERGY_BAR.height,
  label,
  left,
  max,
  top,
  value,
  width = IE_ENERGY_BAR.width,
}: IeEnergyBarProps) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={Math.round(ratio * 100)}
      className={`absolute overflow-hidden ${className}`}
      data-ie-energy-bar=""
      role={label ? "progressbar" : undefined}
      style={{
        height: gui(height),
        left: gui(left),
        top: gui(top),
        width: gui(width),
      }}
      title={label}
    >
      <div
        style={{
          clipPath: progressClipPath("up", ratio),
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, ${gradient.from}, ${gradient.to})`,
            height: "100%",
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}
