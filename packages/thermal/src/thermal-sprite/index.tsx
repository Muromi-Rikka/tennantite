import type { ThermalSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { thermalSpriteMeta } from "@tennantite/textures";
import { ModSprite } from "@tennantite/mods-core";
import { cn } from "@tennantite/ui";

export interface ThermalSpriteCrop {
  height: number;
  width: number;
  /**
   * 源图裁剪左上角 x（源 px）
   */
  x: number;
  y: number;
}

export interface ThermalSpriteProps {
  className?: string;
  /**
   * 源图裁剪区域（CoFH 容器背景为 256×256 画布、部件为多态图集，
   * 按上游 ElementBase 的 drawTexturedModalRect 区域取用）
   */
  crop?: ThermalSpriteCrop;
  /**
   * 目标高度（GUI px，默认源高/裁剪高）
   */
  height?: number;
  /**
   * 绝对定位左/上（GUI px，提供时自动 absolute）
   */
  left?: number;
  /**
   * 精灵名（生成的 `thermalSpriteMeta` key）
   */
  name: ThermalSpriteName;
  /**
   * 不透明度（0..1）
   */
  opacity?: number;
  style?: CSSProperties;
  /**
   * 染色（multiply 混合）
   */
  tint?: string;
  /**
   * 目标顶部（GUI px）
   */
  top?: number;
  /**
   * 目标宽度（GUI px，默认源宽/裁剪宽）
   */
  width?: number;
}

/**
 * Thermal 精灵适配器：几何与裁剪交给 `ModSprite`，保留 Thermal class 与 data 钩子。
 */
export function ThermalSprite({
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
}: ThermalSpriteProps) {
  return (
    <ModSprite
      className={cn("mc-thermal-sprite", className)}
      dataAttributes={{ "data-thermal-sprite": name }}
      height={height}
      left={left}
      opacity={opacity}
      sprite={thermalSpriteMeta[name]}
      src={crop}
      style={style}
      tint={tint}
      top={top}
      width={width}
    />
  );
}
