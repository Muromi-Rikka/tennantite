import type { MekanismSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { mekanismSpriteMeta } from "@tennantite/textures";

import { cn, gui } from "@tennantite/ui";

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
  /**
   * 目标宽度（GUI px，默认源宽）
   */
  width?: number;
}

/**
 * Mekanism 精灵渲染器：按上游 `.mcmeta` 的 `gui.scaling` 决定九宫格/平铺/拉伸。
 *
 * 九宫格目标小于两倍边框时退化为整图拉伸（例如 200×256 / border 32 的
 * inner_screen 用在 84×46 的内屏上），避免 border-image 负中间区。
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
  const meta = mekanismSpriteMeta[name];
  const targetWidth = width ?? meta.width;
  const targetHeight = height ?? meta.height;
  const scaling = meta.scaling;
  const isNineSlice
    = scaling?.type === "nine_slice"
      && targetWidth >= scaling.border * 2
      && targetHeight >= scaling.border * 2;

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

  if (isNineSlice) {
    spriteStyle.backgroundImage = "none";
    spriteStyle.borderImageSource = `var(${meta.cssVar})`;
    spriteStyle.borderImageSlice = `${scaling.border} fill`;
    spriteStyle.borderImageWidth = gui(scaling.border);
    spriteStyle.borderImageRepeat = "stretch";
    spriteStyle.borderStyle = "solid";
    spriteStyle.borderWidth = gui(scaling.border);
  }
  else {
    const isAnimatedStrip = meta.width === 16 && meta.height > 64 && meta.height % 16 === 0;
    if (isAnimatedStrip) {
      spriteStyle.backgroundPosition = "0 0";
      spriteStyle.backgroundSize = `${gui(targetWidth)} ${gui(targetWidth * meta.height / meta.width)}`;
      spriteStyle.overflow = "hidden";
    }
    else {
      spriteStyle.backgroundSize = scaling?.type === "tile"
        ? `${gui(scaling.width)} ${gui(scaling.height)}`
        : "100% 100%";
    }
    if (tint) {
      spriteStyle.backgroundBlendMode = "multiply";
      spriteStyle.backgroundColor = tint;
    }
  }

  return (
    <div
      aria-hidden="true"
      className={cn("mc-mek-sprite", className)}
      data-mek-sprite={name}
      style={spriteStyle}
    >
      {isNineSlice && tint
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
