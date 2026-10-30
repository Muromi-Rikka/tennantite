import type { MekanismSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { mekanismSpriteMeta } from "@tennantite/textures";
import { ModSprite } from "@tennantite/mods-core";
import { cn } from "@tennantite/ui";

export interface MekanismSpriteProps {
  className?: string;
  /**
   * 目标高度（GUI px，默认源高）
   */
  height?: number;
  /**
   * 绝对定位左/上（GUI px，提供时自动 absolute）
   */
  left?: number;
  /**
   * 精灵名（生成的 `mekanismSpriteMeta` key）
   */
  name: MekanismSpriteName;
  /**
   * 不透明度（0..1）
   */
  opacity?: number;
  style?: CSSProperties;
  /**
   * 染色；九宫格用 mask 叠层，其余用 multiply 混合
   */
  tint?: string;
  /**
   * 目标顶部（GUI px）
   */
  top?: number;
  width?: number;
}

/**
 * Mekanism 精灵适配器：`.mcmeta` 的九宫格/平铺/动画条由 `ModSprite` 处理。
 */
export function MekanismSprite({
  className,
  height,
  left,
  name,
  opacity,
  style,
  tint,
  top,
  width,
}: MekanismSpriteProps) {
  return (
    <ModSprite
      className={cn("mc-mek-sprite", className)}
      dataAttributes={{ "data-mek-sprite": name }}
      height={height}
      left={left}
      opacity={opacity}
      sprite={mekanismSpriteMeta[name]}
      style={style}
      tint={tint}
      top={top}
      width={width}
    />
  );
}
