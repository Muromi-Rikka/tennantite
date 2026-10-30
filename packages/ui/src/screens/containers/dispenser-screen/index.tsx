/* eslint-disable react/no-array-index-key -- 固定槽位/列表以位置为身份 */
import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { ScreenItemSlot } from "../screen-slot";
import { padSlots } from "../types";

export interface DispenserScreenProps {
  className?: string;
  hotbarItems?: ScreenSlot[];
  items?: ScreenSlot[];
  onSlotClick?: (area: "hotbar" | "main" | "secondary", index: number) => void;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 发射器 / 投掷器界面（规格 §6）：`container/dispenser.png` 176×166。
 */
const EMPTY_HOTBAR_ITEMS: ScreenSlot[] = [];
const EMPTY_ITEMS: ScreenSlot[] = [];
export function DispenserScreen({
  className,
  hotbarItems = EMPTY_HOTBAR_ITEMS,
  items = EMPTY_ITEMS,
  onSlotClick,
  selectedIndex,
  title,
}: DispenserScreenProps) {
  const slots = padSlots(items, 9);
  return (
    <ScreenPanel
      background="container/dispenser.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      {slots.map((item, index) => (
        // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 位置固定槽位网格，index 即稳定身份
        <ScreenItemSlot
          item={item}
          key={index}
          label={`dispenser-${index}`}
          left={61 + (index % 3) * 18}
          onActivate={
            onSlotClick
              ? () => {
                  onSlotClick("secondary", index);
                }
              : undefined
          }
          top={16 + Math.floor(index / 3) * 18}
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
