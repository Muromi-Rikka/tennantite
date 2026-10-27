import type { ComponentProps } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "../../lib/utils";

export interface TabsPanelProps extends ComponentProps<typeof BaseTabs.Panel> {
  /**
  * panel 自带窗口面板纹理 / plain 无纹理无内边距（嵌在已有面板内时用）
  */
  variant?: "panel" | "plain";
}

export type TabsProps = ComponentProps<typeof BaseTabs.Root>;

/**
 * MC 标签页（规格 §4 #8）：用于配方书 / 设置分页。原版标签页 24 GUI px 高。
*/
export function Tabs({ className, ...properties }: TabsProps) {
  return <BaseTabs.Root className={cn("flex flex-col gap-0", className)} {...properties} />;
}

export function TabsList({
  className,
  ...properties
}: ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      className={cn(
        "mc-scroll flex max-w-full items-end gap-0 overflow-x-auto outline-none",
        className,
      )}
      {...properties}
    />
  );
}

export function TabsPanel({
  className,
  variant = "plain",
  ...properties
}: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      className={cn(
        "text-mc-text-main",
        variant === "panel" ? "mc-tex-panel p-6" : "p-0",
        className,
      )}
      {...properties}
    />
  );
}

export function TabsTab({
  className,
  ...properties
}: ComponentProps<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      className={cn(
        "mc-tex-tab h-24 w-130 cursor-pointer px-4",
        "font-mc mc-text text-mc-text-main select-none mc-text-shadow",
        className,
      )}
      {...properties}
    />
  );
}
