import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";

import { gui, PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";

import { FdCookingProgress } from "../fd-cooking-progress/index";
import { FdHeatIndicator } from "../fd-heat-indicator/index";
import {
  FD_COOKING_POT,
  FD_COOKING_POT_SLOTS,
  FD_PLAYER,
  FD_TEXT_COLOR,
} from "../fd-metrics";
import { FdRecipeBookButton } from "../fd-recipe-book-button/index";
import { FdSprite } from "../fd-sprite/index";

export interface FdCookingPotScreenProps {
  className?: string;
  /**
   * 容器槽（上游 INDEX_CONTAINER = 7）
   */
  container?: ScreenSlot;
  /**
   * 是否受热（决定火焰图标）
   */
  heated?: boolean;
  /**
   * 6 个食材槽（INDEX 0..5，行优先）
   */
  ingredients?: ScreenSlot[];
  inventoryLabel?: ReactNode;
  /**
   * 成品展示槽（INDEX_MEAL = 6）
   */
  meal?: ScreenSlot;
  onRecipeBookToggle?: () => void;
  onSlotClick?: (label: string) => void;
  /**
   * 输出槽（INDEX_OUTPUT = 8）
   */
  output?: ScreenSlot;
  /**
   * 进度 0..1（cookTime / cookTimeTotal）
   */
  progress?: number;
  recipeBookOpen?: boolean;
  showRecipeBookButton?: boolean;
  title?: ReactNode;
}

/**
 * Farmer's Delight 厨锅界面（1.21）：176×166 原始面板贴图（槽框与锅体已烘焙）
 * + 9 个物品槽 + 受热指示 + 烹饪进度箭头 + 配方书开关。
 */
export function FdCookingPotScreen({
  className,
  container,
  heated = false,
  ingredients = [],
  inventoryLabel = "物品栏",
  meal,
  onRecipeBookToggle,
  onSlotClick,
  output,
  progress = 0,
  recipeBookOpen = false,
  showRecipeBookButton = true,
  title = "厨锅",
}: FdCookingPotScreenProps) {
  const items: Record<string, ScreenSlot> = {
    "cooking-pot-container": container,
    "cooking-pot-meal": meal,
    "cooking-pot-output": output,
  };
  for (const [index, item] of ingredients.entries()) {
    items[`cooking-pot-input-${index}`] = item;
  }

  return (
    <ScreenPanel
      backgroundClassName="bg-transparent"
      className={className}
      data-fd-machine="cookingPot"
      data-fd-screen=""
      height={FD_COOKING_POT.height}
      width={FD_COOKING_POT.width}
    >
      <FdSprite
        crop={FD_COOKING_POT.panel}
        height={FD_COOKING_POT.height}
        left={0}
        name="cooking_pot"
        top={0}
        width={FD_COOKING_POT.width}
      />
      <span
        className="absolute font-mc mc-text whitespace-pre"
        style={{
          color: FD_TEXT_COLOR,
          left: gui(FD_COOKING_POT.title.left),
          top: gui(FD_COOKING_POT.title.top),
        }}
      >
        {title}
      </span>
      <span
        className="absolute font-mc mc-text whitespace-pre"
        style={{
          color: FD_TEXT_COLOR,
          left: gui(FD_COOKING_POT.inventoryLabel.left),
          top: gui(FD_COOKING_POT.inventoryLabel.top),
        }}
      >
        {inventoryLabel}
      </span>

      {FD_COOKING_POT_SLOTS.map(slot => (
        <ScreenItemSlot
          item={items[slot.label]}
          key={slot.label}
          label={slot.label}
          left={slot.left}
          onActivate={onSlotClick ? () => { onSlotClick(slot.label); } : undefined}
          top={slot.top}
        />
      ))}

      <FdHeatIndicator heated={heated} />
      <FdCookingProgress progress={progress} />
      {showRecipeBookButton
        ? (
            <FdRecipeBookButton
              onToggle={onRecipeBookToggle}
              open={recipeBookOpen}
            />
          )
        : null}
      <PlayerInventory
        bare
        hotbarY={FD_PLAYER.hotbarY}
        x={FD_PLAYER.left}
        y={FD_PLAYER.top}
      />
    </ScreenPanel>
  );
}
