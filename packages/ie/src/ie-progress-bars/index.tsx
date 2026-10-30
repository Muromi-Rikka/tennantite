import type { ModDataAttributes } from "@tennantite/mods-core";
import { progressClipPath } from "@tennantite/mods-core";
import { ieSpriteMeta } from "@tennantite/textures";
import { gui } from "@tennantite/ui";

import type { IeMachineLayout } from "../ie-machine-layout";

export interface IeProgressBarsProps {
  /**
   * 逐条填充色（省略时绘制布局表指定的进度贴图）
   */
  colors?: string[];
  /**
   * 每条进度条的 DOM 钩子（如 `data-ie-mixer-progress`），取值即序号
   */
  dataAttribute?: `data-${string}`;
  /**
   * 绘制高（GUI px，默认取布局表）
   */
  height?: number;
  /**
   * 布局表 `progressBars` 条目（弧光炉/搅拌机）
   */
  layout: IeMachineLayout["progressBars"];
  /**
   * 每条进度 0..1（按槽序）
   */
  values: number[];
  /**
   * 源贴图宽（GUI px，默认取贴图宽）
   */
  width?: number;
}

const DEFAULT_SPRITE = "sprites/arc_furnace/progress";

/**
 * IE 竖向进度条组：布局表 `progressBars` 逐槽自下而上裁剪，
 * 底锚填充贴图 `sprite`（弧光炉 / 搅拌机共用）。
 */
export function IeProgressBars({
  colors,
  dataAttribute,
  height,
  layout,
  values,
  width,
}: IeProgressBarsProps) {
  if (!layout) {
    return null;
  }
  const sprite = ieSpriteMeta[layout.sprite ?? DEFAULT_SPRITE];
  const barHeight = height ?? layout.height;
  const barWidth = width ?? sprite.width;
  return (
    <>
      {values.map((value, index) => {
        const x = layout.left + (index % layout.perRow) * (layout.stepX ?? 18);
        const y = layout.top + Math.floor(index / layout.perRow) * (layout.stepY ?? 18);
        const color = colors?.[index];
        const data: ModDataAttributes = dataAttribute === undefined
          ? {}
          : { [dataAttribute]: index };
        return (
          <div
            aria-hidden="true"
            className="absolute overflow-hidden"
            key={`${layout.label}-${x}-${y}`}
            style={{
              clipPath: progressClipPath("up", value),
              height: gui(barHeight),
              left: gui(x),
              top: gui(y),
              width: gui(layout.drawWidth ?? 2),
            }}
            {...data}
          >
            <div
              style={color === undefined
                ? {
                    backgroundImage: `var(${sprite.cssVar})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: `${gui(barWidth)} ${gui(barHeight)}`,
                    height: "100%",
                    imageRendering: "pixelated",
                    width: "100%",
                  }
                : {
                    backgroundColor: color,
                    height: "100%",
                    width: "100%",
                  }}
            />
          </div>
        );
      })}
    </>
  );
}
