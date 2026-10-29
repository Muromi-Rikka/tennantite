import type { IndustrialForegoingSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { industrialForegoingSpriteMeta } from "@tennantite/textures";
import { cn, gui } from "@tennantite/ui";
import type { IfCrop, IfCropKey } from "../if-metrics";

import { IF_CROPS } from "../if-metrics";

export interface IfSpriteProps {
  className?: string;
  /**
   * 裁剪项（`IF_CROPS` key 或显式裁剪）
   */
  crop?: IfCrop | IfCropKey;
  /**
   * 目标高度（GUI px，默认裁剪 / 源高）
   */
  height?: number;
  /**
   * 绝对定位左 / 上（GUI px，提供时自动 absolute）
   */
  left?: number;
  /**
   * 精灵名（生成的 `industrialForegoingSpriteMeta` key）
   */
  name: IndustrialForegoingSpriteName;
  /**
   * 不透明度（0..1）
   */
  opacity?: number;
  style?: CSSProperties;
  /**
   * 染色（与原图叠加 multiply）
   */
  tint?: string;
  /**
   * 目标顶部（GUI px）
   */
  top?: number;
  /**
   * 目标宽度（GUI px，默认裁剪 / 源宽）
   */
  width?: number;
}

/**
 * Industrial Foregoing 精灵：按 `IF_CROPS` 从上游图集取区域。
 */
export function IfSprite({
  className,
  crop,
  height,
  left,
  name,
  opacity,
  style,
  tint,
  top,
  width,
}: IfSpriteProps) {
  const meta = industrialForegoingSpriteMeta[name];
  const resolved = resolveCrop(crop);
  const targetWidth = width ?? resolved?.width ?? meta.width;
  const targetHeight = height ?? resolved?.height ?? meta.height;

  const spriteStyle: CSSProperties = {
    backgroundImage: `var(${meta.cssVar})`,
    backgroundRepeat: "no-repeat",
    boxSizing: "border-box",
    height: gui(targetHeight),
    imageRendering: "pixelated",
    opacity,
    pointerEvents: "none",
    width: gui(targetWidth),
    ...(!(left === undefined && top === undefined) && { position: "absolute" }),
    ...(left !== undefined && { left: gui(left) }),
    ...(top !== undefined && { top: gui(top) }),
    ...style,
  };

  if (resolved) {
    const scaleX = targetWidth / resolved.width;
    const scaleY = targetHeight / resolved.height;
    spriteStyle.backgroundPosition = `${gui(-resolved.x * scaleX)} ${gui(-resolved.y * scaleY)}`;
    spriteStyle.backgroundSize = `${gui(meta.width * scaleX)} ${gui(meta.height * scaleY)}`;
  }
  else {
    spriteStyle.backgroundSize = "100% 100%";
  }

  return (
    <div
      aria-hidden="true"
      className={cn("mc-if-sprite", className)}
      data-if-sprite={name}
      style={spriteStyle}
    >
      {tint
        ? (
            <div
              className="pointer-events-none absolute inset-0"
              style={{ backgroundColor: tint, mixBlendMode: "multiply" }}
            />
          )
        : null}
    </div>
  );
}

function resolveCrop(crop: IfCrop | IfCropKey | undefined): IfCrop | undefined {
  if (crop === undefined) {
    return undefined;
  }
  return typeof crop === "string" ? IF_CROPS[crop] : crop;
}
