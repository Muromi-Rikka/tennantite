import type { CreateSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { createSpriteMeta } from "@tennantite/textures";
import { cn, gui } from "@tennantite/ui";

export interface CreateSpriteProps {
  className?: string;
  height?: number;
  /**
   * 绝对定位左/上（GUI px，提供时自动 absolute）
   */
  left?: number;
  /**
   * 精灵名（生成的 `createSpriteMeta` key）
   */
  name: CreateSpriteName;
  style?: CSSProperties;
  /**
   * 染色（multiply 混合）
   */
  tint?: string;
  top?: number;
  width?: number;
}

/**
 * Create 精灵渲染器：Create GUI 贴图是整图 atlas（无 .mcmeta 缩放声明），
 * 整图绘制、按需传 src 前先用 `CREATE_ATLAS` / ModSprite 裁剪；此组件按
 * meta 整图渲染（1 GUI px = 1 源 px）。
 */
export function CreateSprite({
  className,
  height,
  left,
  name,
  style,
  tint,
  top,
  width,
}: CreateSpriteProps) {
  const meta = createSpriteMeta[name];
  const spriteStyle: CSSProperties = {
    backgroundImage: `var(${meta.cssVar})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${gui(width ?? meta.width)} ${gui(height ?? meta.height)}`,
    height: gui(height ?? meta.height),
    imageRendering: "pixelated",
    pointerEvents: "none",
    width: gui(width ?? meta.width),
    ...(!(left === undefined && top === undefined) && { position: "absolute" }),
    ...(left !== undefined && { left: gui(left) }),
    ...(top !== undefined && { top: gui(top) }),
    ...style,
    ...(tint !== undefined && { backgroundBlendMode: "multiply", backgroundColor: tint }),
  };
  return (
    <div
      aria-hidden="true"
      className={cn("mc-create-sprite", className)}
      data-create-sprite={name}
      style={spriteStyle}
    />
  );
}
