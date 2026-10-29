import { gui } from "@tennantite/ui";

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
 * Titanium 能量条：18×56 外框 @ (10,20)，12×50 红色填充自下而上。
 */
export function IfEnergyBar({
  className,
  left = IF_ENERGY.left,
  max,
  top = IF_ENERGY.top,
  value,
}: IfEnergyBarProps) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div
      aria-label="能量"
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
      className={className}
      data-if-energy=""
      role="progressbar"
      style={{
        height: gui(56),
        left: gui(left),
        position: "absolute",
        top: gui(top),
        width: gui(18),
      }}
    >
      <IfSprite
        crop="energyFrame"
        height={56}
        left={0}
        name="titanium_background"
        top={0}
        width={18}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          backgroundColor: "#B3312C",
          clipPath: `inset(${100 - percent}% 0 0 0)`,
          height: gui(50),
          left: gui(3),
          top: gui(3),
          width: gui(12),
        }}
      />
    </div>
  );
}
