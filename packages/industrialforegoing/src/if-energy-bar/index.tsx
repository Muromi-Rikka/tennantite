import { ModProgress } from "@tennantite/mods-core";

import { IF_ENERGY } from "../if-metrics";
import { IfSprite } from "../if-sprite/index";

export interface IfEnergyBarProps {
  className?: string;
  left?: number;
  max: number;
  top?: number;
  value: number;
}

/**
 * 能量条几何：18×56 外框，12×50 填充区内缩 3。
 */
const ENERGY_BAR = { height: 56, inset: 3, width: 18 } as const;

/**
 * Titanium 能量条：18×56 外框 @ (10,20)，12×50 红色填充自下而上。
 */
export function IfEnergyBar({
  className,
  left = IF_ENERGY.left,
  max,
  top = IF_ENERGY.top,
  value,
}: IfEnergyBarProps) {
  return (
    <ModProgress
      ariaValue="percent"
      className={className}
      dataAttributes={{ "data-if-energy": "" }}
      direction="up"
      fill={<div className="absolute inset-0" style={{ backgroundColor: "#B3312C" }} />}
      height={ENERGY_BAR.height}
      inset={ENERGY_BAR.inset}
      label="能量"
      left={left}
      max={max}
      top={top}
      track={(
        <IfSprite
          crop="energyFrame"
          height={ENERGY_BAR.height}
          left={0}
          name="titanium_background"
          top={0}
          width={ENERGY_BAR.width}
        />
      )}
      value={value}
      width={ENERGY_BAR.width}
    />
  );
}
