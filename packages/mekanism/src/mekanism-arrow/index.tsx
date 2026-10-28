import type { MekanismSpriteName } from "@verdigris/textures";

import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismArrowProps {
  className?: string;
  dir: "down" | "right" | "up";
  left: number;
  top: number;
}

/**
 * 方向箭头（up 8×10 / down 8×9 / right 22×15）。
 */
export function MekanismArrow({ className, dir, left, top }: MekanismArrowProps) {
  return (
    <MekanismSprite
      className={className}
      left={left}
      name={`arrow/${dir}` as MekanismSpriteName}
      top={top}
    />
  );
}
