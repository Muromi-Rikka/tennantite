import type { EioSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { eioSpriteMeta } from "@tennantite/textures";
import { cn, gui } from "@tennantite/ui";

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
 * Ender IO 精灵渲染器：默认整图拉伸，传入 `crop` 时按源图区域取用
 * （26.3 GUI 贴图无 `.mcmeta` scaling，均为整图 / 图集直取）。
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
  const meta = eioSpriteMeta[name];
  const targetWidth = width ?? crop?.width ?? meta.width;
  const targetHeight = height ?? crop?.height ?? meta.height;

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

  if (crop) {
    const scaleX = targetWidth / crop.width;
    const scaleY = targetHeight / crop.height;
    spriteStyle.backgroundPosition = `${gui(-crop.x * scaleX)} ${gui(-crop.y * scaleY)}`;
    spriteStyle.backgroundSize = `${gui(meta.width * scaleX)} ${gui(meta.height * scaleY)}`;
  }
  else {
    spriteStyle.backgroundSize = "100% 100%";
  }

  return (
    <div
      aria-hidden="true"
      className={cn("mc-eio-sprite", className)}
      data-eio-sprite={name}
      style={spriteStyle}
    />
  );
}
