import type { BlockIconName } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { blockFaces } from "@tennantite/textures";

import { cn, gui } from "../../lib/utils";
import { BLOCK_FACE_TRANSFORMS } from "./geometry";

export interface BlockIconProps {
  className?: string;
  /**
  * 方块图标名（`blockFaces` 的键）
  */
  name: BlockIconName;
  /**
  * 像素渲染（默认开启，规格 §0.4）
  */
  pixelated?: boolean;
  /**
  * 边长（GUI px，默认 16 —— 原版物品图标）
  */
  size?: number;
  style?: CSSProperties;
}

/**
 * 绘制顺序：左右两侧先画，顶面最后覆盖共享棱边，避免亚像素缝隙
*/
const FACE_ORDER = ["left", "right", "top"] as const;

/**
 * 等轴方块图标（规格 §5 #6）：按原版物品渲染合成顶 / 左 / 右三可见面，
 * 逐面亮度已在 textures 包烘焙（顶 1.0、左 east 0.6、右 north 0.8）。
 * 纯展示组件，RSC 兼容。
 */
export function BlockIcon({
  className,
  name,
  pixelated = true,
  size = 16,
  style,
}: BlockIconProps) {
  const faces = blockFaces[name];
  return (
    <svg
      aria-hidden="true"
      className={cn("shrink-0", className)}
      data-icon={name}
      style={{ height: gui(size), width: gui(size), ...style }}
      viewBox="0 0 16 16"
    >
      {FACE_ORDER.map(face => (
        <g key={face} transform={BLOCK_FACE_TRANSFORMS[face]}>
          <image
            height={16}
            href={faces[face]}
            style={{ imageRendering: pixelated ? "pixelated" : undefined }}
            width={16}
          />
        </g>
      ))}
    </svg>
  );
}
