/* eslint-disable react/no-array-index-key -- 固定槽位/列表以位置为身份 */
import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { ScreenItemSlot } from "../screen-slot";
import { padSlots } from "../types";

export interface HopperScreenProps {
  className?: string;
  hotbarItems?: ScreenSlot[];
  items?: ScreenSlot[];
  onSlotClick?: (area: "hotbar" | "main" | "secondary", index: number) => void;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 漏斗界面（规格 §6）：`container/hopper.png` 176×133，5 槽 + 2 行背包。
 */
export function HopperScreen({
  className,
  hotbarItems = [],
  items = [],
  onSlotClick,
  selectedIndex,
  title,
}: HopperScreenProps) {
  const slots = padSlots(items, 5);
  return (
    <ScreenPanel
      background="container/hopper.png"
      className={className}
      height={133}
      title={title}
      width={176}
    >
      {slots.map((item, index) => (
        <ScreenItemSlot
          item={item}
          key={index}
          label={`hopper-${index}`}
          left={43 + index * 18}
          onActivate={
            onSlotClick
              ? () => {
                  onSlotClick("secondary", index);
                }
              : undefined
          }
          top={19}
        />
      ))}
      <PlayerInventory
        bare
        hotbarItems={hotbarItems}
        hotbarY={108}
        mainRows={2}
        onSlotClick={onSlotClick}
        selectedIndex={selectedIndex}
        y={50}
      />
    </ScreenPanel>
  );
}
