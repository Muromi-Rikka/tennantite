import type { ComponentProps } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cn } from "../../lib/utils";

export type TooltipPopupProps = ComponentProps<typeof BaseTooltip.Popup>;

export type TooltipProps = ComponentProps<typeof BaseTooltip.Root>;

/**
 * MC 物品悬浮提示（规格 §4 #11）：94% 深紫底 + 1 GUI px 渐变边框 + 白字投影。
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
            "mc-tex-tooltip px-4 py-4",
            "font-mc mc-text text-mc-text-main mc-text-shadow",
            className,
          )}
          {...properties}
        >
          {children}
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
