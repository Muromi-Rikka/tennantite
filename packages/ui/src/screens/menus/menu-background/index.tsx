import type { ComponentProps } from "react";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn } from "../../../lib/utils";

export interface MenuBackgroundProps extends ComponentProps<"div"> {
  /**
  * 菜单背景（16×16 平铺）或游戏内背景
  */
  variant?: "inworld" | "menu";
}

/**
 * 原版菜单背景（规格 §6.3）：16×16 `menu_background` / `inworld_menu_background` 平铺。
 */
export function MenuBackground({
  children,
  className,
  variant = "menu",
  ...properties
}: MenuBackgroundProps) {
  return (
    <div className={cn("relative", className)} {...properties}>
      <GuiSprite
        className="absolute inset-0"
        height={16}
        name={variant === "inworld"
          ? "inworld_menu_background.png"
          : "menu_background.png"}
        style={{ height: "100%", width: "100%" }}
        tile
        width={16}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
