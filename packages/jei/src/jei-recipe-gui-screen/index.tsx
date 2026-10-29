import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModIconButton, ModProgress } from "@tennantite/mods-core";
import { cn, gui, ScreenItemSlot } from "@tennantite/ui";
import { Fragment } from "react";
import { JeiIconButton } from "../jei-icon-button/index";
import {
  JEI_OPTION_BUTTONS,
  JEI_OUTPUT_SLOT_SIZE,
  JEI_RECIPE_ARROW,
  JEI_RECIPE_GUI,
  JEI_SLOT_SIZE,
} from "../jei-metrics";
import { JeiSprite } from "../jei-sprite/index";

export interface JeiRecipeCategory {
  /**
   * 标签上的 16×16 物品图标
   */
  icon?: ScreenSlot;
  label: string;
}

export interface JeiRecipeGuiScreenProps {
  activeCategory: number;
  /**
   * 左侧分类标签（`RecipeGuiTabs`，自上而下）
   */
  categories: JeiRecipeCategory[];
  className?: string;
  /**
   * 熔炼类火焰图标位置（提供时渲染；`lit` 决定 `icons/flame` / `icons/flame_empty`）
   */
  flame?: { left: number; lit?: boolean; top: number };
  height?: number;
  onBookmarkRecipe?: () => void;
  onCategoryChange?: (index: number) => void;
  onPageChange?: (page: number) => void;
  onSlotClick?: (index: number, slot: JeiRecipeGuiSlot) => void;
  onTransferRecipe?: () => void;
  page: number;
  pageCount: number;
  /**
   * 进度 0..1（`recipe_arrow` → `recipe_arrow_filled` 裁剪填充）
   */
  progress?: number;
  /**
   * 进度箭头位置（提供时渲染）
   */
  progressArrow?: { left: number; top: number };
  /**
   * 配方区槽位（绝对坐标，数据注入）
   */
  recipeSlots: JeiRecipeGuiSlot[];
  title?: ReactNode;
  width?: number;
}

export interface JeiRecipeGuiSlot {
  /**
   * 催化剂槽（`recipe_catalyst_slot_background_v2`，配方区下方）
   */
  catalyst?: boolean;
  left: number;
  /**
   * 输出槽（26×26 `output_slot`）
   */
  output?: boolean;
  slot: ScreenSlot;
  top: number;
}

/**
 * JEI 配方查看界面（`RecipesGui` 视觉复刻）：`gui_background_v2` 九宫格背景、
 * 左侧分类标签列、顶部居中标题与前后翻页、右侧 `recipe_options_tab_v2` 选项列；
 * 配方区槽位 / 输出槽 / 火焰 / 进度箭头全部数据注入（无配方逻辑）。
 */
export function JeiRecipeGuiScreen({
  activeCategory,
  categories,
  className,
  flame,
  height = JEI_RECIPE_GUI.height,
  onBookmarkRecipe,
  onCategoryChange,
  onPageChange,
  onSlotClick,
  onTransferRecipe,
  page,
  pageCount,
  progress = 0,
  progressArrow,
  recipeSlots,
  title,
  width = JEI_RECIPE_GUI.width,
}: JeiRecipeGuiScreenProps) {
  const navButton = JEI_RECIPE_GUI.navButton;
  const navButtonTop = JEI_RECIPE_GUI.titleHeight - navButton.height + JEI_RECIPE_GUI.navBarPadding;
  const option = JEI_RECIPE_GUI.optionTab;
  const optionButtons = [
    ...(onTransferRecipe ? [{ ...JEI_OPTION_BUTTONS.transfer, onClick: onTransferRecipe }] : []),
    ...(onBookmarkRecipe ? [{ ...JEI_OPTION_BUTTONS.bookmark, onClick: onBookmarkRecipe }] : []),
  ];
  const optionTabHeight = option.buttonBorder * 2 + option.border * 2 + optionButtons.length * option.button;
  const optionTabLeft = width - option.width + option.overlap;
  const optionTabTop = height - JEI_RECIPE_GUI.borderPadding - optionTabHeight;
  const hasPrevious = page > 0;
  const hasNext = page < pageCount - 1;

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ height: gui(height), width: gui(width) }}
    >
      <JeiSprite
        className="absolute inset-0"
        height={height}
        name="gui_background_v2"
        width={width}
      />
      {title === undefined
        ? null
        : (
            <span
              className="absolute font-mc mc-text text-mc-text-main mc-text-shadow"
              style={{ left: 0, right: 0, textAlign: "center", top: gui(4) }}
            >
              {title}
            </span>
          )}
      <JeiIconButton
        disabled={!hasPrevious}
        height={navButton.height}
        icon="icons/arrow_previous_v2"
        iconHeight={7}
        iconWidth={9}
        label="上一配方"
        left={JEI_RECIPE_GUI.borderPadding}
        onClick={hasPrevious ? () => onPageChange?.(page - 1) : undefined}
        top={navButtonTop}
        width={navButton.width}
      />
      <JeiIconButton
        disabled={!hasNext}
        height={navButton.height}
        icon="icons/arrow_next_v2"
        iconHeight={7}
        iconWidth={9}
        label="下一配方"
        left={width - JEI_RECIPE_GUI.borderPadding - navButton.width}
        onClick={hasNext ? () => onPageChange?.(page + 1) : undefined}
        top={navButtonTop}
        width={navButton.width}
      />
      {categories.map((category, index) => {
        const isSelected = index === activeCategory;
        const tabTop = JEI_RECIPE_GUI.tab.top + index * JEI_RECIPE_GUI.tab.size;
        return (
          <Fragment key={category.label}>
            <JeiSprite
              height={JEI_RECIPE_GUI.tab.size}
              left={JEI_RECIPE_GUI.tab.left}
              name={isSelected ? "tab_selected" : "tab_unselected"}
              top={tabTop}
              width={JEI_RECIPE_GUI.tab.size}
            />
            <ScreenItemSlot
              frame={false}
              item={category.icon}
              label={`jei-category-${index}-${category.label}`}
              left={JEI_RECIPE_GUI.tab.left}
              onActivate={onCategoryChange ? () => onCategoryChange(index) : undefined}
              size={JEI_RECIPE_GUI.tab.size}
              top={tabTop}
            />
          </Fragment>
        );
      })}
      {recipeSlots.map((recipeSlot, index) => {
        const size = recipeSlot.output ? JEI_OUTPUT_SLOT_SIZE : JEI_SLOT_SIZE;
        const name = recipeSlot.output
          ? "output_slot"
          : (recipeSlot.catalyst
              ? "recipe_catalyst_slot_background_v2"
              : "slot");
        return (
          <Fragment key={`${recipeSlot.left}-${recipeSlot.top}`}>
            <JeiSprite
              height={size}
              left={recipeSlot.left}
              name={name}
              top={recipeSlot.top}
              width={size}
            />
            <ScreenItemSlot
              frame={false}
              item={recipeSlot.slot}
              label={`jei-recipe-slot-${index}`}
              left={recipeSlot.left}
              onActivate={onSlotClick ? () => onSlotClick(index, recipeSlot) : undefined}
              size={size}
              top={recipeSlot.top}
            />
          </Fragment>
        );
      })}
      {flame === undefined
        ? null
        : (
            <JeiSprite
              height={14}
              left={flame.left}
              name={flame.lit ? "icons/flame" : "icons/flame_empty"}
              top={flame.top}
              width={14}
            />
          )}
      {progressArrow === undefined
        ? null
        : (
            <>
              <JeiSprite
                height={JEI_RECIPE_ARROW.height}
                left={progressArrow.left}
                name="recipe_arrow"
                top={progressArrow.top}
                width={JEI_RECIPE_ARROW.width}
              />
              <ModProgress
                direction="right"
                fill={<JeiSprite height={JEI_RECIPE_ARROW.height} name="recipe_arrow_filled" width={JEI_RECIPE_ARROW.width} />}
                height={JEI_RECIPE_ARROW.height}
                label="配方进度"
                left={progressArrow.left}
                progress={progress}
                top={progressArrow.top}
                width={JEI_RECIPE_ARROW.width}
              />
            </>
          )}
      {optionButtons.length === 0
        ? null
        : (
            <>
              <JeiSprite
                height={optionTabHeight}
                left={optionTabLeft}
                name="recipe_options_tab_v2"
                top={optionTabTop}
                width={option.width}
              />
              {optionButtons.map((button, index) => (
                <ModIconButton
                  buttonClassName="border-0 bg-transparent"
                  height={option.button}
                  icon={<JeiSprite height={9} name={button.icon} width={9} />}
                  key={button.label}
                  label={button.label}
                  left={optionTabLeft + option.buttonBorder + option.border}
                  onClick={button.onClick}
                  top={optionTabTop + option.buttonBorder + option.border + index * option.button}
                  width={option.button}
                />
              ))}
            </>
          )}
    </div>
  );
}
