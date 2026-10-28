import type { MekanismSpriteName } from "@verdigris/textures";

import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismSecurityLightProps {
  className?: string;
  left: number;
  mode?: "disabled" | "enabled" | "not_applicable";
  top: number;
}

/**
 * 安全灯（18×18）。
 */
export function MekanismSecurityLight({
  className,
  left,
  mode = "enabled",
  top,
}: MekanismSecurityLightProps) {
  return (
    <MekanismSprite
      className={className}
      height={18}
      left={left}
      name={`light/security/${mode}` as MekanismSpriteName}
      top={top}
      width={18}
    />
  );
}
