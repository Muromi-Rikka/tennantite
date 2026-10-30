import { ModTank } from "@tennantite/mods-core";
import type { IfDyeColor } from "../if-metrics";

import { IfSprite } from "../if-sprite/index";

export interface IfFluidTankProps {
  className?: string;
  /**
   * 槽位遮罩 / 面按钮用色（储罐本身用 `tint`）
   */
  color: IfDyeColor;
  label?: string;
  left: number;
  max: number;
  name: string;
  size: "normal" | "small";
  /**
   * 流体颜色（纯色近似上游 still 贴图）
   */
  tint: string;
  top: number;
  value: number;
}

/**
 * 储罐几何：18 宽，填充区四边内缩 3（`normal` 内高 50，`small` 内高 13）。
 */
const TANK = {
  inset: 3,
  normal: { height: 56 },
  small: { height: 19 },
  width: 18,
} as const;

/**
 * Titanium 储罐：18×56 / 18×19 外框，内部 12×(50|13) 纯色自下而上。
 * 上游绘制的是流体 still 贴图；按 IE 先例用纯色近似，布局不受影响。
 */
export function IfFluidTank({
  className,
  color,
  label,
  left,
  max,
  name,
  size,
  tint,
  top,
  value,
}: IfFluidTankProps) {
  const height = TANK[size].height;

  return (
    <ModTank
      ariaValue="percent"
      className={className}
      dataAttributes={{
        "data-if-tank": name,
        "data-if-tank-color": color,
      }}
      direction="up"
      frame={(
        <IfSprite
          crop={size === "normal" ? "tankNormal" : "tankSmall"}
          height={height}
          left={0}
          name="titanium_background"
          top={0}
          width={TANK.width}
        />
      )}
      height={height}
      inset={TANK.inset}
      label={label ?? name}
      left={left}
      max={max}
      tint={tint}
      top={top}
      value={value}
      width={TANK.width}
    />
  );
}
