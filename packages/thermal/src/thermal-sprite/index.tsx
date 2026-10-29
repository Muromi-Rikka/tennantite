import type { ThermalSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { thermalSpriteMeta } from "@tennantite/textures";
import { cn, gui } from "@tennantite/ui";

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
 * Thermal 精灵渲染器：默认整图拉伸，传入 `crop` 时按源图区域取用
 * （1.20.x 贴图无 `.mcmeta` gui.scaling，均为整图/图集直取）。
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
  const meta = thermalSpriteMeta[name];
  const sourceWidth = crop?.width ?? meta.width;
  const sourceHeight = crop?.height ?? meta.height;
  const targetWidth = width ?? sourceWidth;
  const targetHeight = height ?? sourceHeight;

  const spriteStyle: CSSProperties = {
    height: gui(targetHeight),
    opacity,
    width: gui(targetWidth),
    ...(crop
      ? {
          backgroundImage: `var(${meta.cssVar})`,
          backgroundPosition: `${gui(-crop.x)} ${gui(-crop.y)}`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${gui(meta.width)} ${gui(meta.height)}`,
        }
      : {
          backgroundImage: `var(${meta.cssVar})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }),
    boxSizing: "border-box",
    imageRendering: "pixelated",
    pointerEvents: "none",
    ...(!(left === undefined && top === undefined) && { position: "absolute" }),
    ...(left !== undefined && { left: gui(left) }),
    ...(top !== undefined && { top: gui(top) }),
    ...style,
  };

  if (tint) {
    spriteStyle.backgroundBlendMode = "multiply";
    spriteStyle.backgroundColor = tint;
  }

  return (
    <div
      aria-hidden="true"
      className={cn("mc-thermal-sprite", className)}
      data-thermal-sprite={name}
      style={spriteStyle}
    />
  );
}
