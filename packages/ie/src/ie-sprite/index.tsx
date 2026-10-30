import type { IeSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { ModSprite } from "@tennantite/mods-core";
import { ieSpriteMeta } from "@tennantite/textures";
import { cn } from "@tennantite/ui";

export interface IeSpriteProps {
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
   * 精灵名（生成的 `ieSpriteMeta` key）
   */
  name: IeSpriteName;
  /**
   * 不透明度（0..1）
   */
  opacity?: number;
  /**
   * 源裁剪区域（源 px）；用于 256² 画布里只取左上角 GUI 区的整屏贴图
   */
  src?: { height: number; width: number; x: number; y: number };
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
 * IE 精灵适配器：`.mcmeta` 的九宫格/平铺/裁剪缩放由 `ModSprite` 处理。
 */
export function IeSprite({
  className,
  height,
  left,
  name,
  opacity,
  src,
  style,
  tint,
  top,
  width,
}: IeSpriteProps) {
  return (
    <ModSprite
      className={cn("mc-ie-sprite", className)}
      dataAttributes={{ "data-ie-sprite": name }}
      height={height}
      left={left}
      opacity={opacity}
      sprite={ieSpriteMeta[name]}
      src={src}
      style={style}
      tint={tint}
      top={top}
      width={width}
    />
  );
}
