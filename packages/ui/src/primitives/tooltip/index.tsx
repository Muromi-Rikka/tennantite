import type { ComponentProps } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cn } from "../../lib/utils";

export type TooltipPopupProps = ComponentProps<typeof BaseTooltip.Popup>;

export type TooltipProps = ComponentProps<typeof BaseTooltip.Root>;

/**
 * MC 物品悬浮提示（规格 §4 #11）：黑底紫边 + 米黄文本。
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
      <BaseTooltip.Positioner className="z-50 outline-none" sideOffset={8}>
        <BaseTooltip.Popup
          className={cn(
            "border border-mc-tooltip-border bg-mc-tooltip-bg px-8 py-4",
            "font-readable text-mc text-mc-tooltip-text mc-text-shadow",
            "outline-1 outline-offset-1 outline-black/60",
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
