import { cn, gui } from "@verdigris/ui";

/**
 * mod 贴图注册表条目：CSS data URI 变量 + 源 PNG 尺寸
*/
export interface ModSpriteMeta {
  cssVar: string;
  height: number;
  width: number;
}

export interface ModSpriteProps {
  className?: string;
  /**
  * 目标高（GUI px，默认裁剪高）
  */
  height?: number;
  /**
  * 绝对定位左/上（GUI px，提供时自动 `absolute`）
  */
  left?: number;
  /**
  * 贴图注册表条目（`ae2SpriteMeta.*` / `ic2SpriteMeta.*`）
  */
  sprite: ModSpriteMeta;
  /**
  * 源 PNG 裁剪区域（1 源 px = 1 GUI px）
  */
  src: ModSpriteRect;
  top?: number;
  /**
  * 目标宽（GUI px，默认裁剪宽）
  */
  width?: number;
}

/**
 * 贴图裁剪区域（源 PNG px）
*/
export interface ModSpriteRect {
  height: number;
  width: number;
  x: number;
  y: number;
}

/**
 * mod 贴图裁剪渲染件：按 1 GUI px = 1 源 px 从任意 mod 贴图注册表
 * （`cssVar/width/height`）取矩形绘制，随 `--mc-gui` 缩放；`left`/`top` 给出时为绝对定位。
 */
export function ModSprite({
  className,
  height,
  left,
  sprite,
  src,
  top,
  width,
}: ModSpriteProps) {
  const isPositioned = left !== undefined || top !== undefined;
  return (
    <div
      aria-hidden="true"
      className={cn(isPositioned && "absolute", "pointer-events-none", className)}
      data-mod-sprite={sprite.cssVar}
      style={{
        backgroundImage: `var(${sprite.cssVar})`,
        backgroundPosition: `${gui(-src.x)} ${gui(-src.y)}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${gui(sprite.width)} ${gui(sprite.height)}`,
        flexShrink: 0,
        height: gui(height ?? src.height),
        imageRendering: "pixelated",
        left: left === undefined ? undefined : gui(left),
        top: top === undefined ? undefined : gui(top),
        width: gui(width ?? src.width),
      }}
    />
  );
}
