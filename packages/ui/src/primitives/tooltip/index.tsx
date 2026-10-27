import type { ComponentProps } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

import { GuiSprite } from "../../containers/gui-sprite/index";
import { cn } from "../../lib/utils";

export type TooltipPopupProps = ComponentProps<typeof BaseTooltip.Popup>;

export type TooltipProps = ComponentProps<typeof BaseTooltip.Root>;

/**
 * MC 物品悬浮提示（规格 §4 #11）：原版 tooltip/background + frame 九宫格。
 */
export function Tooltip(properties: TooltipProps) {
  return <BaseTooltip.Root {...properties} />;
}

export function TooltipPopup({
  children,
  className,
  ...properties
}: TooltipPopupProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner className="z-50 outline-none" sideOffset={4}>
        <BaseTooltip.Popup
          className={cn(
            "relative p-4",
            "font-mc mc-text text-mc-text-main mc-text-shadow",
            className,
          )}
          {...properties}
        >
          <GuiSprite
            className="absolute inset-0"
            name="sprites/tooltip/background.png"
            slice={9}
            style={{ height: "100%", width: "100%" }}
          />
          <GuiSprite
            className="absolute inset-0"
            name="sprites/tooltip/frame.png"
            slice={10}
            style={{ height: "100%", width: "100%" }}
          />
          <span className="relative">{children}</span>
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}

export function TooltipTrigger({
  className,
  ...properties
}: ComponentProps<typeof BaseTooltip.Trigger>) {
  return (
    <BaseTooltip.Trigger className={cn("cursor-pointer", className)} {...properties} />
  );
}
