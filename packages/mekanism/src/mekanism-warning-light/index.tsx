import type { MekanismSpriteName } from "@tennantite/textures";

import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismWarningLightProps {
  className?: string;
  enabled?: boolean;
  left: number;
  top: number;
}

/**
 * 大警告灯（18×18）。
 */
export function MekanismWarningLight({
  className,
  enabled = false,
  left,
  top,
}: MekanismWarningLightProps) {
  return (
    <MekanismSprite
      className={className}
      height={18}
      left={left}
      name={`light/big/${enabled ? "enabled" : "disabled"}` as MekanismSpriteName}
      top={top}
      width={18}
    />
  );
}
