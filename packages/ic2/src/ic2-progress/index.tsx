import type { ModSpriteRect } from "@tennantite/mods-core";
import { ModSprite, progressClipPath } from "@tennantite/mods-core";
import { ic2SpriteMeta } from "@tennantite/textures";
import { gui } from "@tennantite/ui";

import type { Ic2ProgressStyle } from "../ic2-types";

interface ProgressGeometry {
  background: ModSpriteRect;
  fill: ModSpriteRect;
  offset: { x: number; y: number };
}

/**
 * 进度贴图源矩形（`common.png`）。背景偏移为相对填充原点的负偏移，
 * 与 IC2 `Gauge.drawBackground` 一致。
 */
const PROGRESS: Record<Ic2ProgressStyle, ProgressGeometry> = {
  arrow: {
    background: { height: 16, width: 32, x: 160, y: 0 },
    fill: { height: 15, width: 22, x: 165, y: 16 },
    offset: { x: -5, y: 0 },
  },
  crush: {
    background: { height: 16, width: 32, x: 160, y: 32 },
    fill: { height: 11, width: 21, x: 165, y: 52 },
    offset: { x: -5, y: -3 },
  },
  drop: {
    background: { height: 16, width: 32, x: 160, y: 96 },
    fill: { height: 15, width: 22, x: 165, y: 112 },
    offset: { x: -5, y: 0 },
  },
  triangle: {
    background: { height: 16, width: 32, x: 160, y: 64 },
    fill: { height: 15, width: 22, x: 165, y: 80 },
    offset: { x: -5, y: 0 },
  },
};

export interface Ic2ProgressProps {
  /**
  * 无障碍标签（提供时暴露 progressbar 语义）
  */
  label?: string;
  left: number;
  /**
  * 处理进度 0..1
  */
  progress: number;
  /**
  * 进度贴图：粉碎 / 熔炼箭头 / 滴落 / 三角
  */
  style: Ic2ProgressStyle;
  top: number;
}

/**
 * IC2 机器进度（原版贴图）：背景 + 白色填充自左向右裁剪。
 */
export function Ic2Progress({ label, left, progress, style, top }: Ic2ProgressProps) {
  const geometry = PROGRESS[style];
  const ratio = Math.min(1, Math.max(0, progress));
  return (
    <div
      aria-label={label}
      aria-valuemax={1}
      aria-valuemin={0}
      aria-valuenow={ratio}
      className="absolute"
      data-ic2-progress={style}
      role={label ? "progressbar" : undefined}
      style={{
        height: gui(geometry.fill.height),
        left: gui(left),
        top: gui(top),
        width: gui(geometry.fill.width),
      }}
    >
      <ModSprite
        left={geometry.offset.x}
        sprite={ic2SpriteMeta.common}
        src={geometry.background}
        top={geometry.offset.y}
      />
      {ratio > 0
        ? (
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ clipPath: progressClipPath("right", ratio) }}
            >
              <ModSprite sprite={ic2SpriteMeta.common} src={geometry.fill} />
            </div>
          )
        : null}
    </div>
  );
}
