import type { ComponentProps } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "../../lib/utils";

export type TabsProps = ComponentProps<typeof BaseTabs.Root>;

/**
 * MC 标签页（规格 §4 #8）：用于配方书 / 设置分页。
*/
export function Tabs({ className, ...properties }: TabsProps) {
  return <BaseTabs.Root className={cn("flex flex-col gap-16", className)} {...properties} />;
}

export function TabsList({
  className,
  ...properties
}: ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      className={cn("flex items-end gap-4 outline-none", className)}
      {...properties}
    />
  );
}

export function TabsPanel({
  className,
  ...properties
}: ComponentProps<typeof BaseTabs.Panel>) {
  return (
    <BaseTabs.Panel
      className={cn("mc-tex-panel p-16 text-mc-text-main", className)}
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
        "cursor-pointer border-2 border-black bg-mc-stone-dark/60 px-16 py-6",
        "font-readable text-mc text-mc-text-main select-none mc-text-shadow",
        "hover:bg-mc-stone-dark",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white",
        "data-selected:border-b-mc-gold data-selected:bg-mc-stone data-selected:text-white",
        className,
      )}
      {...properties}
    />
  );
}
