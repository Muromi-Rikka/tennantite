import type { ScreenSlot } from "@tennantite/ui";

import { cn } from "@tennantite/ui";

import { MekanismSlot } from "../mekanism-slot/index";

export interface MekanismPlayerInventoryProps {
  className?: string;
  hotbarItems?: ScreenSlot[];
  hotbarY: number;
  mainItems?: ScreenSlot[];
  onSlotClick?: (area: "hotbar" | "main", index: number) => void;
  x: number;
  y: number;
}

/**
 * Mekanism 玩家背包：3×9 主背包 + 1×9 快捷栏，使用 Mekanism 槽框。
 */
export function MekanismPlayerInventory({
  className,
  hotbarItems,
  hotbarY,
  mainItems,
  onSlotClick,
  x,
  y,
}: MekanismPlayerInventoryProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      {Array.from({ length: 27 }, (_, index) => {
        const column = index % 9;
        const row = Math.floor(index / 9);
        return (
          <MekanismSlot
            item={mainItems?.[index] ?? null}
            key={`main-${index}`}
            label={`main-${index}`}
            left={x + column * 18}
            onActivate={onSlotClick ? () => onSlotClick("main", index) : undefined}
            top={y + row * 18}
            type="normal"
          />
        );
      })}
      {Array.from({ length: 9 }, (_, index) => (
        <MekanismSlot
          item={hotbarItems?.[index] ?? null}
          key={`hotbar-${index}`}
          label={`hotbar-${index}`}
          left={x + index * 18}
          onActivate={onSlotClick ? () => onSlotClick("hotbar", index) : undefined}
          top={hotbarY}
          type="normal"
        />
      ))}
    </div>
  );
}
