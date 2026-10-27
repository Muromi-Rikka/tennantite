import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";
import { padSlots } from "../types";

const GRID_POSITIONS = [
  [25, 16],
  [43, 16],
  [61, 16],
  [25, 34],
  [43, 34],
  [61, 34],
  [25, 52],
  [43, 52],
  [61, 52],
] as const;

export interface CrafterScreenProps {
  className?: string;
  disabledSlots?: number[];
  hotbarItems?: ScreenSlot[];
  items?: ScreenSlot[];
  onSlotClick?: (area: "craft" | "hotbar" | "main" | "output", index: number) => void;
  output?: ScreenSlot;
  powered?: boolean;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 合成器界面（规格 §6）：`container/crafter.png` 176×166，3×3 网格 + 26×26 结果。
 */
export function CrafterScreen({
  className,
  disabledSlots = [],
  hotbarItems = [],
  items = [],
  onSlotClick,
  output,
  powered = false,
  selectedIndex,
  title,
}: CrafterScreenProps) {
  const slots = padSlots(items, 9);
  return (
    <ScreenPanel
      background="container/crafter.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      {GRID_POSITIONS.map(([left, top], index) => (
        <div key={`${left}-${top}`}>
          <ScreenItemSlot
            item={slots[index]}
            label={`crafter-${index}`}
            left={left}
            onActivate={
              onSlotClick
                ? () => {
                    onSlotClick("craft", index);
                  }
                : undefined
            }
            top={top}
          />
          {disabledSlots.includes(index)
            ? (
                <GuiSprite
                  className="absolute"
                  height={18}
                  name="sprites/container/crafter/disabled_slot.png"
                  style={{ left: gui(left), top: gui(top) }}
                  width={18}
                />
              )
            : null}
        </div>
      ))}
      <GuiSprite
        className="absolute"
        height={16}
        name={powered
          ? "sprites/container/crafter/powered_redstone.png"
          : "sprites/container/crafter/unpowered_redstone.png"}
        style={{ left: gui(98), top: gui(91) }}
        width={16}
      />
      <ScreenItemSlot
        item={output}
        label="crafter-output"
        left={129}
        onActivate={onSlotClick ? () => onSlotClick("output", 0) : undefined}
        size={26}
        top={30}
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
