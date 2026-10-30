import type { EioSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { ModSprite } from "@tennantite/mods-core";
import { eioSpriteMeta } from "@tennantite/textures";
import { cn } from "@tennantite/ui";

export interface EioSpriteCrop {
  height: number;
  width: number;
  /**
   * 源图裁剪左上角 x（源 px）
   */
  x: number;
  y: number;
}

export interface EioSpriteProps {
  className?: string;
  /**
   * 源图裁剪区域；省略时为整图
   */
  crop?: EioSpriteCrop;
  /**
   * 目标高度（GUI px，默认裁剪 / 源高）
   */
  height?: number;
  /**
   * 绝对定位左/上（GUI px，提供时自动 absolute）
   */
  left?: number;
  /**
   * 精灵名（生成的 `eioSpriteMeta` key）
   */
  name: EioSpriteName;
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
 * Ender IO 精灵适配器：几何与裁剪交给 `ModSprite`，保留 EIO class 与 data 钩子。
 */
export function EioSprite({
  className,
  crop,
  height,
  left,
  name,
  opacity,
  style,
  top,
  width,
}: EioSpriteProps) {
  return (
    <ModSprite
      className={cn("mc-eio-sprite", className)}
      dataAttributes={{ "data-eio-sprite": name }}
      height={height}
      left={left}
      opacity={opacity}
      sprite={eioSpriteMeta[name]}
      src={crop}
      style={style}
      top={top}
      width={width}
    />
  );
}
