import type { IndustrialForegoingSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { industrialForegoingSpriteMeta } from "@tennantite/textures";
import { ModSprite } from "@tennantite/mods-core";
import { cn } from "@tennantite/ui";
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
 * Industrial Foregoing 精灵适配器：按 `IF_CROPS` 解析裁剪后交给 `ModSprite`。
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
  return (
    <ModSprite
      className={cn("mc-if-sprite", className)}
      dataAttributes={{ "data-if-sprite": name }}
      height={height}
      left={left}
      opacity={opacity}
      sprite={industrialForegoingSpriteMeta[name]}
      src={resolveCrop(crop)}
      style={style}
      tint={tint}
      top={top}
      width={width}
    />
  );
}

function resolveCrop(crop: IfCrop | IfCropKey | undefined): IfCrop | undefined {
  if (crop === undefined) {
    return undefined;
  }
  return typeof crop === "string" ? IF_CROPS[crop] : crop;
}
