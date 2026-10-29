import type { JeiSpriteName, JeiSpriteScaling } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { jeiSpriteMeta } from "@tennantite/textures";
import { cn, gui } from "@tennantite/ui";

export interface JeiSpriteProps {
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
   * 精灵名（生成的 `jeiSpriteMeta` key）
   */
  name: JeiSpriteName;
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
  /**
   * 目标宽度（GUI px，默认源宽）
   */
  width?: number;
}

/**
 * JEI 精灵渲染器：按上游 `.mcmeta` 的 `gui.scaling` 决定九宫格/平铺/拉伸。
 * JEI 26.x 的 nine_slice border 是 `{left,top,right,bottom}` 对象，按四边分别映射。
 */
export function JeiSprite({
  className,
  height,
  left,
  name,
  opacity,
  style,
  tint,
  top,
  width,
}: JeiSpriteProps) {
  const meta = jeiSpriteMeta[name];
  const targetWidth = width ?? meta.width;
  const targetHeight = height ?? meta.height;
  const scaling: JeiSpriteScaling = meta.scaling;
  // JEI 26.3 贴图仅有 nine_slice（对象 border）与无缩放两种，无 tile
  const border = scaling?.type === "nine_slice" ? scaling.border : null;
  const isNineSlice = border !== null
    && targetWidth >= border.left + border.right
    && targetHeight >= border.top + border.bottom;

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

  if (isNineSlice && border) {
    spriteStyle.backgroundImage = "none";
    spriteStyle.borderImageSource = `var(${meta.cssVar})`;
    spriteStyle.borderImageSlice = `${border.top} ${border.right} ${border.bottom} ${border.left} fill`;
    spriteStyle.borderImageWidth = `${gui(border.top)} ${gui(border.right)} ${gui(border.bottom)} ${gui(border.left)}`;
    spriteStyle.borderImageRepeat = "stretch";
    spriteStyle.borderStyle = "solid";
    spriteStyle.borderWidth = `${gui(border.top)} ${gui(border.right)} ${gui(border.bottom)} ${gui(border.left)}`;
  }
  else {
    const isAnimatedStrip = meta.width === 16 && meta.height > 64 && meta.height % 16 === 0;
    if (isAnimatedStrip) {
      spriteStyle.backgroundPosition = "0 0";
      spriteStyle.backgroundSize = `${gui(targetWidth)} ${gui(targetWidth * meta.height / meta.width)}`;
      spriteStyle.overflow = "hidden";
    }
    else {
      spriteStyle.backgroundSize = "100% 100%";
    }
    if (tint) {
      spriteStyle.backgroundBlendMode = "multiply";
      spriteStyle.backgroundColor = tint;
    }
  }

  return (
    <div
      aria-hidden="true"
      className={cn("mc-jei-sprite", className)}
      data-jei-sprite={name}
      style={spriteStyle}
    >
      {isNineSlice && border && tint
        ? (
            <div
              aria-hidden="true"
              style={{
                backgroundColor: tint,
                height: "100%",
                inset: 0,
                maskImage: `var(${meta.cssVar})`,
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
