import { gui } from "@tennantite/ui";
import type { IfDyeColor } from "../if-metrics";

import { IF_DYE_DIFFUSE } from "../if-metrics";
import { IfSprite } from "../if-sprite/index";

export interface IfProgressProps {
  className?: string;
  /**
   * 染色（`white` 不叠 multiply 层）
   */
  color?: IfDyeColor;
  kind: "arrow-down" | "arrow-right" | "vertical";
  label?: string;
  left: number;
  max: number;
  top: number;
  value: number;
}

/**
 * Titanium 进度条：竖条 / 右箭头 / 下箭头，裁剪方向按 `kind`。
 */
export function IfProgress({
  className,
  color = "white",
  kind,
  label = "进度",
  left,
  max,
  top,
  value,
}: IfProgressProps) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const clip
    = kind === "vertical"
      ? `inset(${100 - percent}% 0 0 0)`
      : (kind === "arrow-right"
          ? `inset(0 ${100 - percent}% 0 0)`
          : `inset(0 0 ${100 - percent}% 0)`);

  const fill = kind === "vertical"
    ? { height: 50, left: left + 3, top: top + 3, width: 5 }
    : (kind === "arrow-right"
        ? { height: 16, left, top, width: 22 }
        : { height: 23, left, top, width: 15 });

  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
      className={className}
      data-if-progress={kind}
      role="progressbar"
      style={{
        height: gui(kind === "vertical" ? 56 : (kind === "arrow-right" ? 16 : 23)),
        left: gui(left),
        position: "absolute",
        top: gui(top),
        width: gui(kind === "vertical" ? 11 : (kind === "arrow-right" ? 22 : 15)),
      }}
    >
      <IfSprite
        crop={kind === "vertical" ? "barBorder" : (kind === "arrow-right" ? "arrowBg" : "arrowDownBg")}
        height={kind === "vertical" ? 56 : (kind === "arrow-right" ? 15 : 23)}
        left={0}
        name="titanium_background"
        top={0}
        width={kind === "vertical" ? 11 : (kind === "arrow-right" ? 22 : 15)}
      />
      <div
        className="pointer-events-none absolute"
        data-if-progress-fill=""
        style={{
          clipPath: clip,
          height: gui(fill.height),
          left: gui(fill.left - left),
          top: gui(fill.top - top),
          width: gui(fill.width),
        }}
      >
        <IfSprite
          crop={kind === "vertical" ? "barFill" : (kind === "arrow-right" ? "arrowFill" : "arrowDownFill")}
          height={fill.height}
          left={0}
          name="titanium_background"
          top={0}
          width={fill.width}
        />
        {color === "white"
          ? null
          : (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                data-if-progress-tint=""
                style={{ backgroundColor: IF_DYE_DIFFUSE[color], mixBlendMode: "multiply" }}
              />
            )}
      </div>
    </div>
  );
}
