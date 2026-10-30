import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { ScreenItemSlot } from "../screen-slot";

export interface NautilusScreenProps {
  armor?: ScreenSlot;
  className?: string;
  hotbarItems?: ScreenSlot[];
  onSlotClick?: (area: "armor" | "hotbar" | "main", index: number) => void;
  saddle?: ScreenSlot;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 鹦鹉螺界面（规格 §6）：`container/nautilus.png` 176×166。
 */
const EMPTY_HOTBAR_ITEMS: ScreenSlot[] = [];
export function NautilusScreen({
  armor,
  className,
  hotbarItems = EMPTY_HOTBAR_ITEMS,
  onSlotClick,
  saddle,
  selectedIndex,
  title,
}: NautilusScreenProps) {
  return (
    <ScreenPanel
      background="container/nautilus.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      <ScreenItemSlot
        ghost="sprites/container/slot/saddle.png"
        item={saddle}
        label="nautilus-saddle"
        left={7}
        onActivate={onSlotClick ? () => onSlotClick("armor", 0) : undefined}
        top={17}
      />
      <ScreenItemSlot
        ghost="sprites/container/slot/nautilus_armor_inventory.png"
        item={armor}
        label="nautilus-armor"
        left={7}
        onActivate={onSlotClick ? () => onSlotClick("armor", 1) : undefined}
        top={35}
      />
      <PlayerInventory
        bare
        hotbarItems={hotbarItems}
        onSlotClick={onSlotClick}
        selectedIndex={selectedIndex}
      />
    </ScreenPanel>
  );
}
