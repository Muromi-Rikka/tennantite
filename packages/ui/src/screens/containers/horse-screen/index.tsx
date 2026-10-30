/* eslint-disable react/no-array-index-key -- 固定槽位/列表以位置为身份 */
import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";
import { padSlots } from "../types";

export interface HorseScreenProps {
  armor?: ScreenSlot;
  /**
  * 是否有箱子（渲染 90×54 槽位覆盖层与 15 格）
  */
  chest?: boolean;
  chestItems?: ScreenSlot[];
  className?: string;
  hotbarItems?: ScreenSlot[];
  onSlotClick?: (
    area: "armor" | "hotbar" | "main" | "secondary",
    index: number,
  ) => void;
  saddle?: ScreenSlot;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 马 / 羊驼界面（规格 §6）：`container/horse.png` 176×166，鞍 + 马铠 + 可选箱子。
 */
const EMPTY_CHEST_ITEMS: ScreenSlot[] = [];
const EMPTY_HOTBAR_ITEMS: ScreenSlot[] = [];
export function HorseScreen({
  armor,
  chest = false,
  chestItems = EMPTY_CHEST_ITEMS,
  className,
  hotbarItems = EMPTY_HOTBAR_ITEMS,
  onSlotClick,
  saddle,
  selectedIndex,
  title,
}: HorseScreenProps) {
  const chestSlots = padSlots(chestItems, 15);
  return (
    <ScreenPanel
      background="container/horse.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      <ScreenItemSlot
        ghost="sprites/container/slot/saddle.png"
        item={saddle}
        label="horse-saddle"
        left={7}
        onActivate={
          onSlotClick
            ? () => {
                onSlotClick("armor", 0);
              }
            : undefined
        }
        top={17}
      />
      <ScreenItemSlot
        ghost="sprites/container/slot/horse_armor.png"
        item={armor}
        label="horse-armor"
        left={7}
        onActivate={
          onSlotClick
            ? () => {
                onSlotClick("armor", 1);
              }
            : undefined
        }
        top={35}
      />
      {chest
        ? (
            <>
              <GuiSprite
                className="absolute"
                height={54}
                name="sprites/container/horse/chest_slots.png"
                style={{ left: gui(79), top: gui(17) }}
                width={90}
              />
              {chestSlots.map((item, index) => (
                // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 位置固定槽位网格，index 即稳定身份
                <ScreenItemSlot
                  item={item}
                  key={index}
                  label={`horse-chest-${index}`}
                  left={80 + (index % 5) * 18}
                  onActivate={
                    onSlotClick
                      ? () => {
                          onSlotClick("secondary", index);
                        }
                      : undefined
                  }
                  top={18 + Math.floor(index / 5) * 18}
                />
              ))}
            </>
          )
        : null}
      <PlayerInventory
        bare
        hotbarItems={hotbarItems}
        onSlotClick={onSlotClick}
        selectedIndex={selectedIndex}
      />
    </ScreenPanel>
  );
}
