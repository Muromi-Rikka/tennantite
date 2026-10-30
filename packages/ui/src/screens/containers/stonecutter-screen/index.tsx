import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";

export interface StonecutterRecipe {
  icon?: ScreenSlot;
  id: string;
}

export interface StonecutterScreenProps {
  className?: string;
  hotbarItems?: ScreenSlot[];
  input?: ScreenSlot;
  onRecipeSelect?: (id: string) => void;
  onSlotClick?: (area: "hotbar" | "input" | "main" | "output", index: number) => void;
  output?: ScreenSlot;
  recipes?: StonecutterRecipe[];
  selectedIndex?: number;
  selectedRecipe?: string;
  title?: ReactNode;
}

/**
 * 切石机界面（规格 §6）：`container/stonecutter.png` 176×166。
 */
const EMPTY_HOTBAR_ITEMS: ScreenSlot[] = [];
const EMPTY_RECIPES: StonecutterRecipe[] = [];
export function StonecutterScreen({
  className,
  hotbarItems = EMPTY_HOTBAR_ITEMS,
  input,
  onRecipeSelect,
  onSlotClick,
  output,
  recipes = EMPTY_RECIPES,
  selectedIndex,
  selectedRecipe,
  title,
}: StonecutterScreenProps) {
  return (
    <ScreenPanel
      background="container/stonecutter.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      <ScreenItemSlot
        item={input}
        label="stonecutter-input"
        left={19}
        onActivate={onSlotClick ? () => onSlotClick("input", 0) : undefined}
        top={32}
      />
      {recipes.slice(0, 12).map((recipe, index) => (
        <button
          aria-label={`切石配方 ${recipe.id}`}
          aria-pressed={selectedRecipe === recipe.id}
          className="absolute cursor-pointer border-0 bg-transparent p-0"
          key={recipe.id}
          onClick={() => {
            onRecipeSelect?.(recipe.id);
          }}
          style={{
            height: gui(18),
            left: gui(52 + (index % 2) * 18),
            top: gui(15 + Math.floor(index / 2) * 18),
            width: gui(16),
          }}
          type="button"
        >
          <GuiSprite
            height={18}
            name={selectedRecipe === recipe.id
              ? "sprites/container/stonecutter/recipe_selected.png"
              : "sprites/container/stonecutter/recipe.png"}
            width={16}
          />
        </button>
      ))}
      <GuiSprite
        className="absolute"
        height={15}
        name="sprites/container/stonecutter/scroller.png"
        style={{ left: gui(119), top: gui(15) }}
        width={12}
      />
      <ScreenItemSlot
        item={output}
        label="stonecutter-output"
        left={138}
        onActivate={onSlotClick ? () => onSlotClick("output", 0) : undefined}
        size={26}
        top={28}
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
