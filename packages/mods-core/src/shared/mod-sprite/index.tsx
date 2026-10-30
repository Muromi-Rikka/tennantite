import type { CSSProperties } from "react";

import { cn, gui } from "@tennantite/ui";

/**
 * 额外 DOM 钩子（如 `{ "data-eio-sprite": name }`），展开到根节点
*/
export type ModDataAttributes = Record<`data-${string}`, number | string | undefined>;

/**
 * mod 贴图注册表条目：CSS data URI 变量 + 源 PNG 尺寸
*/
export interface ModSpriteMeta {
  cssVar: string;
  height: number;
  scaling?: ModSpriteScaling | null;
  width: number;
}

export interface ModSpriteProps {
  className?: string;
  /**
  * 额外 DOM 钩子（如 `{ "data-eio-sprite": name }`），展开到根节点
  */
  dataAttributes?: ModDataAttributes;
  /**
  * 目标高（GUI px，默认裁剪高）
  */
  height?: number;
  /**
  * 绝对定位左/上（GUI px，提供时自动 `absolute`）
  */
  left?: number;
  opacity?: number;
  /**
  * 贴图注册表条目（`ae2SpriteMeta.*` / `ic2SpriteMeta.*`）
  */
  sprite: ModSpriteMeta;
  /**
  * 源 PNG 裁剪区域（1 源 px = 1 GUI px）；省略时整图
  */
  src?: ModSpriteRect;
  style?: CSSProperties;
  /**
  * 染色（multiply）；九宫格用 mask 叠层
  */
  tint?: string;
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

export type ModSpriteScaling
  = | {
    border: number | { bottom: number; left: number; right: number; top: number };
    height: number;
    type: "nine_slice";
    width: number;
  }
  | {
    height: number;
    type: "tile";
    width: number;
  };

/**
 * 绘制模式判定：源裁剪缩放、九宫格、竖向动画条、平铺或整图拉伸，以及目标尺寸。
 */
interface ModSpriteLayout {
  animated: boolean;
  isPositioned: boolean;
  nineSliceBorder: null | { bottom: number; left: number; right: number; top: number };
  targetHeight: number;
  targetWidth: number;
  tiled: Extract<ModSpriteScaling, { type: "tile" }> | null;
  usableNineSlice: boolean;
}

/**
 * mod 贴图裁剪渲染件：从任意 mod 贴图注册表（`cssVar/width/height`）取矩形绘制，
 * 支持缩放裁剪、九宫格、平铺、动画条与 multiply 染色；随 `--mc-gui` 缩放。
 */
export function ModSprite({
  className,
  dataAttributes,
  sprite,
  tint,
  ...properties
}: ModSpriteProps) {
  const layout = modSpriteLayout(sprite, properties);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none", layout.isPositioned && "absolute", className)}
      data-mod-sprite={sprite.cssVar}
      {...dataAttributes}
      style={modSpriteStyle(sprite, layout, { ...properties, tint })}
    >
      {tint && layout.usableNineSlice
        ? (
            <div
              aria-hidden="true"
              style={{
                backgroundColor: tint,
                height: "100%",
                inset: 0,
                maskImage: `var(${sprite.cssVar})`,
                maskRepeat: "no-repeat",
                maskSize: "100% 100%",
                mixBlendMode: "multiply",
                position: "absolute",
                width: "100%",
              }}
            />
          )
        : null}
    </div>
  );
}

function anisotropic(value: number | { bottom: number; left: number; right: number; top: number }) {
  return typeof value === "number"
    ? { bottom: value, left: value, right: value, top: value }
    : value;
}

/**
 * 按贴图注册表与裁剪 / 尺寸入参判定绘制模式。
 */
function modSpriteLayout(
  sprite: ModSpriteMeta,
  { height, left, src, top, width }: Pick<ModSpriteProps, "height" | "left" | "src" | "top" | "width">,
): ModSpriteLayout {
  const isPositioned = left !== undefined || top !== undefined;
  const targetWidth = width ?? src?.width ?? sprite.width;
  const targetHeight = height ?? src?.height ?? sprite.height;
  const nineSlice = !src && sprite.scaling?.type === "nine_slice" ? sprite.scaling : null;
  const nineSliceBorder = nineSlice ? anisotropic(nineSlice.border) : null;
  const isUsableNineSlice = Boolean(
    nineSliceBorder
    && targetWidth >= nineSliceBorder.left + nineSliceBorder.right
    && targetHeight >= nineSliceBorder.top + nineSliceBorder.bottom,
  );
  const isAnimated = !src
    && !isUsableNineSlice
    && sprite.width === 16
    && sprite.height > 64
    && sprite.height % 16 === 0;
  const tiled = !src && !isUsableNineSlice && !isAnimated && sprite.scaling?.type === "tile"
    ? sprite.scaling
    : null;

  return { animated: isAnimated, isPositioned, nineSliceBorder, targetHeight, targetWidth, tiled, usableNineSlice: isUsableNineSlice };
}

/**
 * 合成根节点完整样式：基础定位 / 尺寸叠加按模式的背景绘制，再叠加 multiply 染色。
 */
function modSpriteStyle(
  sprite: ModSpriteMeta,
  { animated, isPositioned, nineSliceBorder, targetHeight, targetWidth, tiled, usableNineSlice }: ModSpriteLayout,
  { left, opacity, src, style, tint, top }: Pick<ModSpriteProps, "left" | "opacity" | "src" | "style" | "tint" | "top">,
): CSSProperties {
  const baseStyle: CSSProperties = {
    backgroundImage: `var(${sprite.cssVar})`,
    backgroundRepeat: "no-repeat",
    boxSizing: "border-box",
    flexShrink: 0,
    height: gui(targetHeight),
    imageRendering: "pixelated",
    left: left === undefined ? undefined : gui(left),
    opacity,
    pointerEvents: "none",
    top: top === undefined ? undefined : gui(top),
    width: gui(targetWidth),
    ...style,
  };

  let spriteStyle: CSSProperties;
  if (src) {
    const scaleX = targetWidth / src.width;
    const scaleY = targetHeight / src.height;
    spriteStyle = {
      backgroundPosition: `${gui(-src.x * scaleX)} ${gui(-src.y * scaleY)}`,
      backgroundSize: `${gui(sprite.width * scaleX)} ${gui(sprite.height * scaleY)}`,
    };
  }
  else if (usableNineSlice && nineSliceBorder) {
    const slice = `${nineSliceBorder.top} ${nineSliceBorder.right} ${nineSliceBorder.bottom} ${nineSliceBorder.left} fill`;
    const borderWidth = `${gui(nineSliceBorder.top)} ${gui(nineSliceBorder.right)} ${gui(nineSliceBorder.bottom)} ${gui(nineSliceBorder.left)}`;
    spriteStyle = {
      backgroundImage: "none",
      borderColor: "transparent",
      borderImageOutset: 0,
      borderImageRepeat: "stretch",
      borderImageSlice: slice,
      borderImageSource: `var(${sprite.cssVar})`,
      borderImageWidth: borderWidth,
      borderStyle: "solid",
      borderWidth,
    };
  }
  else if (animated) {
    spriteStyle = {
      backgroundPosition: "0 0",
      backgroundSize: `${gui(targetWidth)} ${gui(targetWidth * sprite.height / sprite.width)}`,
      overflow: "hidden",
    };
  }
  else if (tiled) {
    spriteStyle = {
      backgroundSize: `${gui(tiled.width)} ${gui(tiled.height)}`,
    };
  }
  else {
    spriteStyle = {
      backgroundSize: "100% 100%",
    };
  }

  if (tint && !usableNineSlice) {
    spriteStyle = {
      ...spriteStyle,
      backgroundBlendMode: "multiply",
      backgroundColor: tint,
    };
  }

  return {
    ...baseStyle,
    ...spriteStyle,
    ...(isPositioned && { position: "absolute" }),
  };
}
