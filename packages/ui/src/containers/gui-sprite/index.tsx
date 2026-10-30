import type { GuiSpriteMeta, GuiSpriteName } from "@tennantite/textures";
import type { ComponentProps, CSSProperties } from "react";
import { guiSpriteMeta } from "@tennantite/textures";

import { cn, gui } from "../../lib/utils";

export interface GuiSpriteProps extends Omit<ComponentProps<"div">, "children"> {
  /**
   * 无裁剪时的适配方式
   */
  fit?: "contain" | "cover" | "fill";
  /**
   * 目标高度（GUI px，默认源裁剪高度或整图高度）
   */
  height?: number;
  /**
   * 官方 GUI 精灵路径，例如 `container/inventory.png`
   */
  name: GuiSpriteName;
  /**
   * 九宫格切片（源 PNG px）；使用 border-image 绘制
   */
  slice?: number | { bottom: number; left: number; right: number; top: number };
  /**
   * 源 PNG 裁剪区域（GUI px）
   */
  src?: GuiSpriteRect;
  /**
   * 平铺模式；`src` 存在时按裁剪区域平铺
   */
  tile?: boolean;
  /**
   * 目标宽度（GUI px，默认源裁剪宽度或整图宽度）
   */
  width?: number;
}

export interface GuiSpriteRect {
  height: number;
  width: number;
  x: number;
  y: number;
}

/**
 * 原版 GUI 精灵渲染器（规格 §6）：像素级引用内置 PNG。
 *
 * - 无 `src`：整图绘制；`width/height` 默认元数据尺寸。
 * - 有 `src`：按裁剪区域绘制，可缩放到 `width/height`。
 * - `slice`：四边使用源图像素，边框用 `border-image` 拉伸。
 *
 * RSC 兼容，无 hooks。
 */
export function GuiSprite({
  className,
  fit = "fill",
  height,
  name,
  slice,
  src,
  style,
  tile = false,
  width,
  ...properties
}: GuiSpriteProps) {
  const meta = guiSpriteMeta[name];

  return (
    <div
      aria-hidden="true"
      className={cn(meta.className, "mc-gui-sprite", className)}
      data-gui-sprite={name}
      style={guiSpriteStyle(meta, { fit, height, slice, src, style, tile, width })}
      {...properties}
    />
  );
}

/**
 * 计算精灵完整样式：无 `slice` 时按平铺、缩放或适配模式绘制背景，有 `slice` 时用 `border-image` 九宫格。
 */
function guiSpriteStyle(
  meta: GuiSpriteMeta,
  {
    fit,
    height,
    slice,
    src,
    style,
    tile,
    width,
  }: Pick<GuiSpriteProps, "fit" | "height" | "slice" | "src" | "style" | "tile" | "width">,
): CSSProperties {
  const targetWidth = width ?? src?.width ?? meta.width;
  const targetHeight = height ?? src?.height ?? meta.height;
  const spriteStyle: CSSProperties = {
    backgroundImage: `var(${meta.cssVar})`,
    backgroundRepeat: tile ? "repeat" : "no-repeat",
    boxSizing: "border-box",
    height: gui(targetHeight),
    imageRendering: "pixelated",
    width: gui(targetWidth),
    ...style,
  };

  if (slice === undefined) {
    if (tile) {
      spriteStyle.backgroundSize = src
        ? `${gui(src.width)} ${gui(src.height)}`
        : `${gui(meta.width)} ${gui(meta.height)}`;
      spriteStyle.backgroundPosition = src ? `${gui(-src.x)} ${gui(-src.y)}` : "0 0";
    }
    else if (src) {
      const scaleX = targetWidth / src.width;
      const scaleY = targetHeight / src.height;
      spriteStyle.backgroundSize = `${gui(meta.width * scaleX)} ${gui(meta.height * scaleY)}`;
      spriteStyle.backgroundPosition
        = `${gui(-src.x * scaleX)} ${gui(-src.y * scaleY)}`;
    }
    else if (fit === "contain") {
      spriteStyle.backgroundSize = "contain";
    }
    else if (fit === "cover") {
      spriteStyle.backgroundSize = "cover";
    }
    else {
      spriteStyle.backgroundSize = "100% 100%";
    }
  }
  else {
    const edges
      = typeof slice === "number"
        ? { bottom: slice, left: slice, right: slice, top: slice }
        : slice;
    spriteStyle.backgroundImage = "none";
    spriteStyle.borderImageSource = `var(${meta.cssVar})`;
    spriteStyle.borderImageSlice = `${edges.top} ${edges.right} ${edges.bottom} ${edges.left} fill`;
    spriteStyle.borderImageWidth = `${gui(edges.top)} ${gui(edges.right)} ${gui(edges.bottom)} ${gui(edges.left)}`;
    spriteStyle.borderImageRepeat = "stretch";
    spriteStyle.borderStyle = "solid";
    spriteStyle.borderWidth = `${gui(edges.top)} ${gui(edges.right)} ${gui(edges.bottom)} ${gui(edges.left)}`;
  }

  return spriteStyle;
}
