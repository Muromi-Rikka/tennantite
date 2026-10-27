/* eslint-disable react/no-array-index-key -- 固定槽位以位置为身份，列表不会重排 */
import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";
import { padSlots } from "../types";

export interface ChestScreenProps {
  className?: string;
  hotbarItems?: ScreenSlot[];
  items?: ScreenSlot[];
  onSlotClick?: (area: "hotbar" | "main" | "secondary", index: number) => void;
  rows?: 3 | 6;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 箱子界面（规格 §6）：3 行由 `generic_54` 上下两段合成 176×167，
 * 6 行使用整图 176×222；槽框已烘焙在背景中。
 */
export function ChestScreen({
  className,
  hotbarItems = [],
  items = [],
  onSlotClick,
  rows = 3,
  selectedIndex,
  title,
}: ChestScreenProps) {
  const slots = padSlots(items, rows * 9);
  const height = rows === 6 ? 222 : 167;
  const mainY = rows === 6 ? 139 : 84;
  const hotbarY = rows === 6 ? 197 : 142;

  return (
    <ScreenPanel className={className} height={height} title={title} width={176}>
      {rows === 6
        ? (
            <GuiSprite
              className="absolute inset-0"
              height={222}
              name="container/generic_54.png"
              src={{ height: 222, width: 176, x: 0, y: 0 }}
              width={176}
            />
          )
        : (
            <>
              <GuiSprite
                className="absolute"
                height={71}
                name="container/generic_54.png"
                src={{ height: 71, width: 176, x: 0, y: 0 }}
                style={{ left: 0, top: 0 }}
                width={176}
              />
              <GuiSprite
                className="absolute"
                height={96}
                name="container/generic_54.png"
                src={{ height: 96, width: 176, x: 0, y: 126 }}
                style={{ left: 0, top: gui(71) }}
                width={176}
              />
            </>
          )}
      {slots.map((item, index) => {
        const row = Math.floor(index / 9);
        const column = index % 9;
        return (
          <ScreenItemSlot
            item={item}
            key={index}
            label={`chest-${index}`}
            left={7 + column * 18}
            onActivate={
              onSlotClick
                ? () => {
                    onSlotClick("secondary", index);
                  }
                : undefined
            }
            top={17 + row * 18}
          />
        );
      })}
      <PlayerInventory
        bare
        hotbarItems={hotbarItems}
        hotbarY={hotbarY}
        mainItems={slots.slice(0, 0)}
        onSlotClick={onSlotClick}
        selectedIndex={selectedIndex}
        y={mainY}
      />
    </ScreenPanel>
  );
}
