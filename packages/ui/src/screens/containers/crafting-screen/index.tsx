import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { RecipeBookButton } from "../screen-parts";
import { ScreenItemSlot } from "../screen-slot";
import { padSlots } from "../types";

const CRAFT_POSITIONS = [
  [29, 16],
  [47, 16],
  [65, 16],
  [29, 34],
  [47, 34],
  [65, 34],
  [29, 52],
  [47, 52],
  [65, 52],
] as const;

export interface CraftingScreenProps {
  className?: string;
  craftItems?: ScreenSlot[];
  craftResult?: ScreenSlot;
  hotbarItems?: ScreenSlot[];
  onRecipeBook?: () => void;
  onSlotClick?: (area: "craft" | "craft-result" | "hotbar" | "main", index: number) => void;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 工作台界面（规格 §6）：`container/crafting_table.png` 176×166。
 */
export function CraftingScreen({
  className,
  craftItems = [],
  craftResult = null,
  hotbarItems = [],
  onRecipeBook,
  onSlotClick,
  selectedIndex,
  title,
}: CraftingScreenProps) {
  const craft = padSlots(craftItems, 9);
  return (
    <ScreenPanel
      background="container/crafting_table.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      {CRAFT_POSITIONS.map(([left, top], index) => (
        <ScreenItemSlot
          item={craft[index]}
          key={`${left}-${top}`}
          label={`craft-${index}`}
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
      ))}
      <ScreenItemSlot
        item={craftResult}
        label="craft-result-0"
        left={119}
        onActivate={
          onSlotClick
            ? () => {
                onSlotClick("craft-result", 0);
              }
            : undefined
        }
        size={26}
        top={30}
      />
      <RecipeBookButton left={5} onClick={onRecipeBook} top={34} />
      <PlayerInventory
        bare
        hotbarItems={hotbarItems}
        onSlotClick={onSlotClick}
        selectedIndex={selectedIndex}
      />
    </ScreenPanel>
  );
}
