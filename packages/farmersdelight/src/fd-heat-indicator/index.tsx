import { cn, gui } from "@tennantite/ui";

import { FD_HEAT_ICON } from "../fd-metrics";
import { FdSprite } from "../fd-sprite";

export interface FdHeatIndicatorProps {
  className?: string;
  /**
   * 是否受热（决定是否绘制火焰贴图）
   */
  heated?: boolean;
  /**
   * 无障碍标签（默认取上游功能文案）
   */
  label?: string;
  /**
   * 绝对定位左（GUI px，默认 47）
   */
  left?: number;
  /**
   * 绝对定位上（GUI px，默认 55）
   */
  top?: number;
}

/**
 * 厨锅受热指示：上游 `HEAT_ICON = (47, 55, 17, 15)`，仅在受热时绘制火焰，
 * 但热区与提示文案始终存在（用于悬浮提示）。
 */
export function FdHeatIndicator({
  className,
  heated = false,
  label,
  left,
  top,
}: FdHeatIndicatorProps) {
  const text = label ?? (heated ? "已受热" : "下方需要热源");
  return (
    <div
      aria-label={text}
      className={cn("absolute", className)}
      role="img"
      style={{
        height: gui(FD_HEAT_ICON.height),
        left: gui(left ?? FD_HEAT_ICON.left),
        top: gui(top ?? FD_HEAT_ICON.top),
        width: gui(FD_HEAT_ICON.width),
      }}
      title={text}
    >
      {heated
        ? (
            <FdSprite
              crop={FD_HEAT_ICON.crop}
              height={FD_HEAT_ICON.height}
              name="cooking_pot"
              width={FD_HEAT_ICON.width}
            />
          )
        : null}
    </div>
  );
}
