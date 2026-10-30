import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";

import { ModLabel, ModSlotGrid } from "@tennantite/mods-core";
import { PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";

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

/**
 * 6 个食材槽是 3×2 连续网格，起点取布局表首项。
 */
const INGREDIENT_ORIGIN = FD_COOKING_POT_SLOTS[0];
const MEAL_SLOT = FD_COOKING_POT_SLOTS[6];
const CONTAINER_SLOT = FD_COOKING_POT_SLOTS[7];
const OUTPUT_SLOT = FD_COOKING_POT_SLOTS[8];

const EMPTY_INGREDIENTS: ScreenSlot[] = [];

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
  ingredients = EMPTY_INGREDIENTS,
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
      <ModLabel
        color={FD_TEXT_COLOR}
        left={FD_COOKING_POT.title.left}
        top={FD_COOKING_POT.title.top}
      >
        {title}
      </ModLabel>
      <ModLabel
        color={FD_TEXT_COLOR}
        left={FD_COOKING_POT.inventoryLabel.left}
        top={FD_COOKING_POT.inventoryLabel.top}
      >
        {inventoryLabel}
      </ModLabel>

      <ModSlotGrid
        columns={3}
        frame={false}
        items={ingredients}
        label={inputLabel}
        left={INGREDIENT_ORIGIN.left}
        onSlotClick={onSlotClick
          ? (index) => { onSlotClick(inputLabel(index)); }
          : undefined}
        rows={2}
        top={INGREDIENT_ORIGIN.top}
      />
      <ScreenItemSlot
        item={meal}
        label={MEAL_SLOT.label}
        left={MEAL_SLOT.left}
        onActivate={onSlotClick ? () => { onSlotClick(MEAL_SLOT.label); } : undefined}
        top={MEAL_SLOT.top}
      />
      <ScreenItemSlot
        item={container}
        label={CONTAINER_SLOT.label}
        left={CONTAINER_SLOT.left}
        onActivate={onSlotClick ? () => { onSlotClick(CONTAINER_SLOT.label); } : undefined}
        top={CONTAINER_SLOT.top}
      />
      <ScreenItemSlot
        item={output}
        label={OUTPUT_SLOT.label}
        left={OUTPUT_SLOT.left}
        onActivate={onSlotClick ? () => { onSlotClick(OUTPUT_SLOT.label); } : undefined}
        top={OUTPUT_SLOT.top}
      />

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

/**
 * 网格逐格名称；`rows × columns` 恒为 6，兜底分支不可达。
 */
function inputLabel(index: number) {
  return FD_COOKING_POT_SLOTS[index]?.label ?? `cooking-pot-input-${index}`;
}
