import type { ScreenSlot } from "@tennantite/ui";
import { cn, gui, padSlots, ScreenItemSlot } from "@tennantite/ui";
import { Fragment } from "react";

import { JeiIconButton } from "../jei-icon-button/index";
import { JEI_INGREDIENT_CELL, JEI_ITEM_LIST } from "../jei-metrics";
import { JeiSprite } from "../jei-sprite/index";
import { JeiSearchField } from "./search-field";

export interface JeiItemListPanelProps {
  className?: string;
  /**
   * 列数（默认 1，JEI 默认单列侧栏）
   */
  columns?: number;
  /**
   * 当前页物品（最多 rows×columns 个，多余截断）
   */
  items?: ScreenSlot[];
  labelPrefix?: string;
  /**
   * 翻页回调（参数为目标页码）
   */
  onPageChange?: (page: number) => void;
  onQueryChange?: (value: string) => void;
  onSlotClick?: (index: number, item: ScreenSlot) => void;
  page: number;
  pageCount: number;
  query?: string;
  /**
   * 行数（默认 4）
   */
  rows?: number;
  /**
   * 搜索框可访问名称
   */
  searchLabel?: string;
  /**
   * 面板总宽（GUI px，默认 80 —— 搜索框宽度，网格靠右对齐）
   */
  width?: number;
}

/**
 * JEI 物品列表面板（`IngredientListOverlay` 视觉复刻）：
 * `ingredient_list_background_v2` 九宫格面板 + `ingredient_list_slot_background_v2`
 * 槽位网格，搜索框在上方，底部居中翻页箭头（数据注入、无物品逻辑）。
 */
export function JeiItemListPanel({
  className,
  columns = 1,
  items,
  labelPrefix = "jei-item",
  onPageChange,
  onQueryChange,
  onSlotClick,
  page,
  pageCount,
  query,
  rows = 4,
  searchLabel,
  width = JEI_ITEM_LIST.search.width,
}: JeiItemListPanelProps) {
  const panelWidth = columns * JEI_INGREDIENT_CELL + JEI_ITEM_LIST.panelPadding * 2;
  const panelLeft = width - panelWidth;
  const panelTop = JEI_ITEM_LIST.search.height + JEI_ITEM_LIST.searchGap;
  const panelHeight = rows * JEI_INGREDIENT_CELL + JEI_ITEM_LIST.panelPadding * 2;
  const cells = padSlots(items ?? [], rows * columns).slice(0, rows * columns);
  const arrow = JEI_ITEM_LIST.pageArrow;
  const arrowsRow = panelTop + panelHeight + arrow.gap;
  const arrowsTotalWidth = arrow.width * 2 + arrow.gap;
  const hasPrevious = page > 0;
  const hasNext = page < pageCount - 1;

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ height: gui(arrowsRow + arrow.height), width: gui(width) }}
    >
      <JeiSearchField
        defaultValue={query}
        label={searchLabel}
        left={0}
        onChange={onQueryChange}
        top={0}
        width={width}
      />
      <JeiSprite
        height={panelHeight}
        left={panelLeft}
        name="ingredient_list_background_v2"
        top={panelTop}
        width={panelWidth}
      />
      {cells.map((item, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const x = panelLeft + JEI_ITEM_LIST.panelPadding + column * JEI_INGREDIENT_CELL;
        const y = panelTop + JEI_ITEM_LIST.panelPadding + row * JEI_INGREDIENT_CELL;
        return (
          <Fragment key={`${x}-${y}`}>
            <JeiSprite
              height={JEI_INGREDIENT_CELL}
              left={x}
              name="ingredient_list_slot_background_v2"
              top={y}
              width={JEI_INGREDIENT_CELL}
            />
            <ScreenItemSlot
              frame={false}
              item={item}
              label={`${labelPrefix}-${index}`}
              left={x}
              onActivate={onSlotClick ? () => onSlotClick(index, item) : undefined}
              size={JEI_INGREDIENT_CELL}
              top={y}
            />
          </Fragment>
        );
      })}
      <JeiIconButton
        disabled={!hasPrevious}
        height={arrow.height}
        icon="icons/arrow_previous_v2"
        label="上一页"
        left={panelLeft + (panelWidth - arrowsTotalWidth) / 2}
        onClick={hasPrevious ? () => onPageChange?.(page - 1) : undefined}
        top={arrowsRow}
        width={arrow.width}
      />
      <JeiIconButton
        disabled={!hasNext}
        height={arrow.height}
        icon="icons/arrow_next_v2"
        label="下一页"
        left={panelLeft + (panelWidth + arrowsTotalWidth) / 2 - arrow.width}
        onClick={hasNext ? () => onPageChange?.(page + 1) : undefined}
        top={arrowsRow}
        width={arrow.width}
      />
    </div>
  );
}
