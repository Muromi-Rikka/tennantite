import type { FarmersDelightSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";

import { farmersDelightSpriteMeta } from "@tennantite/textures";
import { ModSprite } from "@tennantite/mods-core";
import { cn } from "@tennantite/ui";

export interface FdSpriteCrop {
  height: number;
  width: number;
  /**
   * 源图裁剪左上角 x（源 px）
   */
  x: number;
  y: number;
}

export interface FdSpriteProps {
  className?: string;
  /**
   * 源图裁剪区域；省略时为整图
   */
  crop?: FdSpriteCrop;
  /**
   * 目标高度（GUI px，默认裁剪 / 源高）
   */
  height?: number;
  /**
   * 绝对定位左/上（GUI px，提供时自动 absolute）
   */
  left?: number;
  /**
   * 精灵名（生成的 `farmersDelightSpriteMeta` key）
   */
  name: FarmersDelightSpriteName;
  /**
   * 不透明度（0..1）
   */
  opacity?: number;
  style?: CSSProperties;
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
 * Farmer's Delight 精灵适配器：几何与裁剪交给 `ModSprite`，保留 FD class 与 data 钩子。
 */
export function FdSprite({
  className,
  crop,
  height,
  left,
  name,
  opacity,
  style,
  top,
  width,
}: FdSpriteProps) {
  return (
    <ModSprite
      className={cn("mc-fd-sprite", className)}
      dataAttributes={{ "data-fd-sprite": name }}
      height={height}
      left={left}
      opacity={opacity}
      sprite={farmersDelightSpriteMeta[name]}
      src={crop}
      style={style}
      top={top}
      width={width}
    />
  );
}
