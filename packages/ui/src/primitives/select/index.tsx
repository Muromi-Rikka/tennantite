import type { SelectRootProps } from "@base-ui/react/select";
import type { ComponentProps } from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { cn } from "../../lib/utils";

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
  children = "▼",
  className,
  ...properties
}: ComponentProps<typeof BaseSelect.Icon>) {
  return (
    <BaseSelect.Icon
      className={cn("font-readable text-mc text-mc-text-main", className)}
      {...properties}
    >
      {children}
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
        "flex cursor-pointer items-center justify-between px-12 py-4",
        "font-readable text-mc text-mc-text-main select-none",
        "data-highlighted:bg-mc-stone-dark/60 data-highlighted:text-white",
        "data-selected:text-mc-gold",
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
            "mc-tex-panel mc-scroll max-h-320 overflow-y-auto p-4 outline-none",
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
        "mc-tex-btn flex h-32 w-full cursor-pointer items-center justify-between px-12",
        "font-readable text-mc text-mc-text-main select-none mc-text-shadow",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white",
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
