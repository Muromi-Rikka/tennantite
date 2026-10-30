import type { CreateSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { createSpriteMeta } from "@tennantite/textures";
import { ModSprite } from "@tennantite/mods-core";
import { cn } from "@tennantite/ui";

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
 * Create 精灵适配器：整图绘制交给 `ModSprite`，保留 Create class 与 data 钩子。
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
  return (
    <ModSprite
      className={cn("mc-create-sprite", className)}
      dataAttributes={{ "data-create-sprite": name }}
      height={height}
      left={left}
      sprite={createSpriteMeta[name]}
      style={style}
      tint={tint}
      top={top}
      width={width}
    />
  );
}
