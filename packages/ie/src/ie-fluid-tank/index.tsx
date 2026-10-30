import type { IeSpriteName } from "@tennantite/textures";
import { progressClipPath } from "@tennantite/mods-core";
import { ieSpriteMeta } from "@tennantite/textures";
import { gui } from "@tennantite/ui";

import { IeSprite } from "../ie-sprite/index";

export interface IeFluidTankProps {
  className?: string;
  /**
   * 填充区高（GUI px；overlay 以此区为中心居中绘制）
   */
  height: number;
  label?: string;
  left: number;
  max: number;
  /**
   * overlay 精灵（如 sprites/coke_oven/tank_overlay 20×51；多流体罐等无
   * overlay 贴图时省略，只渲染填充色）
   */
  overlayName?: IeSpriteName;
  /**
   * 液体染色（数据注入；上游以流体贴图绘制，此处用纯色近似）
   */
  tint: string;
  top: number;
  value: number;
  width: number;
}

/**
 * IE 液体罐（`FluidInfoArea`：填充区自下而上注入液体，overlay 贴图在填充区
 * 外扩 (width-overlayWidth)/2 居中绘制，即 20×51 overlay 对应 16×47 填充区）。
 */
export function IeFluidTank({
  className = "",
  height,
  label,
  left,
  max,
  overlayName,
  tint,
  top,
  value,
  width,
}: IeFluidTankProps) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const overlay = overlayName ? ieSpriteMeta[overlayName] : null;
  const offsetX = overlay ? (width - overlay.width) / 2 : 0;
  const offsetY = overlay ? (height - overlay.height) / 2 : 0;
  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={Math.round(ratio * 100)}
      className={`absolute ${className}`}
      data-ie-fluid-tank={overlayName}
      role={label ? "progressbar" : undefined}
      style={{
        height: gui(height),
        left: gui(left),
        top: gui(top),
        width: gui(width),
      }}
      title={label}
    >
      <div className="absolute overflow-hidden" style={{ height: "100%", width: "100%" }}>
        <div
          style={{
            backgroundColor: tint,
            clipPath: progressClipPath("up", ratio),
            height: "100%",
            width: "100%",
          }}
        />
      </div>
      {overlay
        ? (
            <IeSprite
              className="absolute"
              name={overlayName!}
              style={{
                left: gui(offsetX),
                top: gui(offsetY),
              }}
            />
          )
        : null}
    </div>
  );
}
