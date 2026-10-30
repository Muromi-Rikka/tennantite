import { ModProgress } from "@tennantite/mods-core";
import { cn } from "@tennantite/ui";

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
  className,
  gradient = IE_ENERGY_GRADIENT,
  height = IE_ENERGY_BAR.height,
  label,
  left,
  max,
  top,
  value,
  width = IE_ENERGY_BAR.width,
}: IeEnergyBarProps) {
  return (
    <ModProgress
      ariaValue="percent"
      className={cn("overflow-hidden", className)}
      dataAttributes={{ "data-ie-energy-bar": "" }}
      direction="up"
      fill={(
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, ${gradient.from}, ${gradient.to})`,
            height: "100%",
            width: "100%",
          }}
        />
      )}
      height={height}
      label={label}
      left={left}
      max={max}
      top={top}
      value={value}
      width={width}
    />
  );
}
