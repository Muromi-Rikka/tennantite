import type { ProgressDirection } from "@tennantite/mods-core";
import { ModProgress } from "@tennantite/mods-core";
import type { IfCropKey, IfDyeColor, IfProgressKind } from "../if-metrics";

import { IF_CROPS, IF_DYE_DIFFUSE, IF_PROGRESS_SIZES } from "../if-metrics";
import { IfSprite } from "../if-sprite/index";

export interface IfProgressProps {
  className?: string;
  /**
   * 染色（`white` 不叠 multiply 层）
   */
  color?: IfDyeColor;
  kind: IfProgressKind;
  label?: string;
  left: number;
  max: number;
  top: number;
  value: number;
}

interface IfProgressGeometry {
  direction: ProgressDirection;
  fill: { crop: IfCropKey; height: number; width: number };
  track: { crop: IfCropKey; height: number; width: number };
}

/**
 * 三种进度条的源图裁剪与裁剪方向；外框尺寸见 `IF_PROGRESS_SIZES`。
 */
const GEOMETRY: Record<IfProgressKind, IfProgressGeometry> = {
  "arrow-down": {
    direction: "down",
    fill: { crop: "arrowDownFill", height: 23, width: 15 },
    track: { crop: "arrowDownBg", height: 23, width: 15 },
  },
  "arrow-right": {
    direction: "right",
    fill: { crop: "arrowFill", height: 16, width: 22 },
    track: { crop: "arrowBg", height: 15, width: 22 },
  },
  "vertical": {
    direction: "up",
    fill: { crop: "barFill", height: 50, width: 5 },
    track: { crop: "barBorder", height: 56, width: 11 },
  },
};

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
  const size = IF_PROGRESS_SIZES[kind];
  const geometry = GEOMETRY[kind];

  return (
    <ModProgress
      ariaValue="percent"
      className={className}
      dataAttributes={{ "data-if-progress": kind }}
      direction={geometry.direction}
      fill={(
        <div className="absolute inset-0" data-if-progress-fill="">
          <IfSprite
            crop={geometry.fill.crop}
            height={geometry.fill.height}
            left={0}
            name={IF_CROPS[geometry.fill.crop].sprite}
            top={0}
            width={geometry.fill.width}
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
      )}
      height={size.height}
      inset={size.inset}
      label={label}
      left={left}
      max={max}
      top={top}
      track={(
        <IfSprite
          crop={geometry.track.crop}
          height={geometry.track.height}
          left={0}
          name={IF_CROPS[geometry.track.crop].sprite}
          top={0}
          width={geometry.track.width}
        />
      )}
      value={value}
      width={size.width}
    />
  );
}
