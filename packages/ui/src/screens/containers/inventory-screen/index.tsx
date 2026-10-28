import type { GuiSpriteName } from "@tennantite/textures";
import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { RecipeBookButton } from "../screen-parts";
import { ScreenItemSlot } from "../screen-slot";
import { padSlots } from "../types";

const ARMOR_TOPS = [7, 25, 43, 61];
const ARMOR_GHOSTS: GuiSpriteName[] = [
  "sprites/container/slot/helmet.png",
  "sprites/container/slot/chestplate.png",
  "sprites/container/slot/leggings.png",
  "sprites/container/slot/boots.png",
];
const CRAFT_POSITIONS = [
  [97, 17],
  [115, 17],
  [97, 35],
  [115, 35],
] as const;

export interface InventoryScreenProps {
  armorItems?: ScreenSlot[];
  className?: string;
  craftItems?: ScreenSlot[];
  craftResult?: ScreenSlot;
  hotbarItems?: ScreenSlot[];
  mainItems?: ScreenSlot[];
  offhandItem?: ScreenSlot;
  onRecipeBook?: () => void;
  onSlotClick?: (
    area: "armor" | "craft" | "craft-result" | "hotbar" | "main" | "offhand",
    index: number,
  ) => void;
  playerPreview?: ReactNode;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 物品栏界面（规格 §6）：`container/inventory.png` 176×166，槽框已烘焙在背景中。
 */
export function InventoryScreen({
  armorItems = [],
  className,
  craftItems = [],
  craftResult = null,
  hotbarItems = [],
  mainItems = [],
  offhandItem,
  onRecipeBook,
  onSlotClick,
  playerPreview,
  selectedIndex,
  title,
}: InventoryScreenProps) {
  const armor = padSlots(armorItems, 4);
  const craft = padSlots(craftItems, 4);

  return (
    <ScreenPanel
      background="container/inventory.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      <div
        className="absolute bg-black"
        style={{ height: gui(64), left: gui(26), top: gui(8), width: gui(50) }}
      >
        {playerPreview}
      </div>
      {ARMOR_TOPS.map((top, index) => (
        <ScreenItemSlot
          ghost={ARMOR_GHOSTS[index]}
          item={armor[index]}
          key={top}
          label={`armor-${index}`}
          left={7}
          onActivate={
            onSlotClick
              ? () => {
                  onSlotClick("armor", index);
                }
              : undefined
          }
          top={top}
        />
      ))}
      <ScreenItemSlot
        ghost="sprites/container/slot/shield.png"
        item={offhandItem}
        label="offhand-0"
        left={76}
        onActivate={
          onSlotClick
            ? () => {
                onSlotClick("offhand", 0);
              }
            : undefined
        }
        top={61}
      />
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
        left={153}
        onActivate={
          onSlotClick
            ? () => {
                onSlotClick("craft-result", 0);
              }
            : undefined
        }
        top={27}
      />
      <RecipeBookButton left={104} onClick={onRecipeBook} top={22} />
      <PlayerInventory
        bare
        hotbarItems={hotbarItems}
        mainItems={mainItems}
        onSlotClick={onSlotClick}
        selectedIndex={selectedIndex}
      />
    </ScreenPanel>
  );
}
