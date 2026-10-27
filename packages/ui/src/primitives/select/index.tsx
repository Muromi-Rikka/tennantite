import type { SelectRootProps } from "@base-ui/react/select";
import type { ComponentProps } from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { cn, gui } from "../../lib/utils";

export type SelectProps<Value> = SelectRootProps<Value> & {
  className?: string;
};

/**
 * MC 下拉选择（规格 §4 #7）：石纹触发器 + 窗口面板下拉列表。
*/
export function Select<Value>({ className, ...properties }: SelectProps<Value>) {
  return <BaseSelect.Root {...properties} />;
}

export function SelectIcon({
  children,
  className,
  ...properties
}: ComponentProps<typeof BaseSelect.Icon>) {
  return (
    <BaseSelect.Icon className={cn("flex items-center", className)} {...properties}>
      {children ?? (
        <svg
          aria-hidden="true"
          className="pixelated"
          fill="#FFFFFF"
          shapeRendering="crispEdges"
          style={{ height: gui(4), width: gui(7) }}
          viewBox="0 0 7 4"
        >
          <path d="M0 0h7L3 4z" />
        </svg>
      )}
    </BaseSelect.Icon>
  );
}

export function SelectItem({
  children,
  className,
  ...properties
}: ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      className={cn(
        "flex h-20 cursor-pointer items-center justify-between px-4 select-none",
        "font-mc mc-text text-mc-text-main",
        "data-highlighted:bg-white/15",
        "outline-none",
        className,
      )}
      {...properties}
    >
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="text-mc-gold">◄</BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}

export function SelectList({
  className,
  ...properties
}: ComponentProps<typeof BaseSelect.List>) {
  return <BaseSelect.List className={cn("flex flex-col", className)} {...properties} />;
}

export function SelectPopup({
  children,
  className,
  ...properties
}: ComponentProps<typeof BaseSelect.Popup>) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner className="z-50 outline-none" sideOffset={4}>
        <BaseSelect.Popup
          className={cn(
            "mc-tex-panel mc-scroll max-h-160 overflow-y-auto p-1 outline-none",
            className,
          )}
          {...properties}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export function SelectTrigger({
  children,
  className,
  ...properties
}: ComponentProps<typeof BaseSelect.Trigger>) {
  return (
    <BaseSelect.Trigger
      className={cn(
        "mc-tex-btn flex h-20 w-full cursor-pointer items-center justify-between px-4",
        "font-mc mc-text text-mc-text-main select-none mc-text-shadow",
        "data-disabled:cursor-not-allowed data-disabled:text-mc-text-dim",
        className,
      )}
      {...properties}
    >
      {children}
    </BaseSelect.Trigger>
  );
}

export function SelectValue({
  className,
  ...properties
}: ComponentProps<typeof BaseSelect.Value>) {
  return <BaseSelect.Value className={cn("truncate", className)} {...properties} />;
}
