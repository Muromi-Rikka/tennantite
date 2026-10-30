import type { FdSpriteCrop } from "./fd-sprite/index";

import { FdSprite } from "./fd-sprite/index";

export interface FdIconRowProps {
  /**
   * 图标枚数
   */
  count: number;
  /**
   * 单枚图标裁剪（fd_icons 源图）
   */
  icon: FdSpriteCrop;
  /**
   * 行左上角 x（GUI px）
   */
  left: number;
  /**
   * 列步进（GUI px）
   */
  step: number;
  /**
   * 行左上角 y（GUI px）
   */
  top: number;
}

/**
 * HUD 图标行：按原版饱食栏顺序自右向左铺开 `count` 枚同款图标
 * （下标 0 对应最右列）；`count = 1` 即单枚定位。
 */
export function FdIconRow({
  count,
  icon,
  left,
  step,
  top,
}: FdIconRowProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => {
        const column = count - 1 - index;
        return (
          <FdSprite
            crop={icon}
            height={icon.height}
            key={column}
            left={left + column * step}
            name="fd_icons"
            top={top}
            width={icon.width}
          />
        );
      })}
    </>
  );
}
