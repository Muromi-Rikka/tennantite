/* eslint-disable react/no-array-index-key -- 固定槽位/列表以位置为身份 */
import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { ScreenItemSlot } from "../screen-slot";
import { padSlots } from "../types";

export interface ShulkerBoxScreenProps {
  className?: string;
  hotbarItems?: ScreenSlot[];
  items?: ScreenSlot[];
  onSlotClick?: (area: "hotbar" | "main" | "secondary", index: number) => void;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 潜影盒界面（规格 §6）：`container/shulker_box.png` 176×166。
 */
export function ShulkerBoxScreen({
  className,
  hotbarItems = [],
  items = [],
  onSlotClick,
  selectedIndex,
  title,
}: ShulkerBoxScreenProps) {
  const slots = padSlots(items, 27);
  return (
    <ScreenPanel
      background="container/shulker_box.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      {slots.map((item, index) => (
        <ScreenItemSlot
          item={item}
          key={index}
          label={`shulker-${index}`}
          left={7 + (index % 9) * 18}
          onActivate={
            onSlotClick
              ? () => {
                  onSlotClick("secondary", index);
                }
              : undefined
          }
          top={17 + Math.floor(index / 9) * 18}
        />
      ))}
      <PlayerInventory
        bare
        hotbarItems={hotbarItems}
        onSlotClick={onSlotClick}
        selectedIndex={selectedIndex}
      />
    </ScreenPanel>
  );
}
