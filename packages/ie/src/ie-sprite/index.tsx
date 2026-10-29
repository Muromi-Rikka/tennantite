import type { IeSpriteName, IeSpriteScaling } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { ieSpriteMeta } from "@tennantite/textures";
import { cn, gui } from "@tennantite/ui";

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
 * IE 精灵渲染器：按上游 `.mcmeta` 的 `gui.scaling` 决定九宫格/平铺/拉伸。
 * IE 1.21.1 仅 select_box 一个 nine_slice（border 5，数值形式，已规范化为四边对象）。
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
  const meta = ieSpriteMeta[name];
  const targetWidth = width ?? src?.width ?? meta.width;
  const targetHeight = height ?? src?.height ?? meta.height;
  const scaling: IeSpriteScaling = meta.scaling;
  const border = scaling?.type === "nine_slice" ? scaling.border : null;
  const isNineSlice = border !== null
    && src === undefined
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
    if (src) {
      // 与 vanilla blit 一致：从源图左上角取 src 区域，平移到元素原点，不做缩放
      const scaleX = targetWidth / src.width;
      const scaleY = targetHeight / src.height;
      spriteStyle.backgroundPosition = `${gui(-src.x * scaleX)} ${gui(-src.y * scaleY)}`;
      spriteStyle.backgroundSize = `${gui(meta.width * scaleX)} ${gui(meta.height * scaleY)}`;
    }
    else if (isAnimatedStrip) {
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
      className={cn("mc-ie-sprite", className)}
      data-ie-sprite={name}
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
