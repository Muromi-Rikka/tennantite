import { gui } from "@tennantite/ui";
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
  const innerHeight = size === "normal" ? 50 : 13;
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div
      aria-label={label ?? name}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
      className={className}
      data-if-tank={name}
      data-if-tank-color={color}
      role="progressbar"
      style={{
        height: gui(size === "normal" ? 56 : 19),
        left: gui(left),
        position: "absolute",
        top: gui(top),
        width: gui(18),
      }}
    >
      <IfSprite
        crop={size === "normal" ? "tankNormal" : "tankSmall"}
        height={size === "normal" ? 56 : 19}
        left={0}
        name="titanium_background"
        top={0}
        width={18}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          backgroundColor: tint,
          clipPath: `inset(${100 - percent}% 0 0 0)`,
          height: gui(innerHeight),
          left: gui(3),
          top: gui(3),
          width: gui(12),
        }}
      />
    </div>
  );
}
