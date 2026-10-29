import type { ScreenSlot } from "@tennantite/ui";
import { cn, gui, ScreenItemSlot } from "@tennantite/ui";
import { Fragment } from "react";
import { JeiIconButton } from "../jei-icon-button/index";
import { JEI_BOOKMARK, JEI_INGREDIENT_CELL } from "../jei-metrics";
import { JeiSprite } from "../jei-sprite/index";

export interface JeiBookmarkPanelProps {
  /**
   * 当前页书签（最多 rows 个）
   */
  bookmarks?: ScreenSlot[];
  className?: string;
  /**
   * 打开查阅历史按钮
   */
  onOpenHistory?: () => void;
  /**
   * 翻页回调（参数为目标页码）
   */
  onPageChange?: (page: number) => void;
  onRemoveBookmark?: (index: number, bookmark: ScreenSlot) => void;
  /**
   * 切换书签面板按钮
   */
  onToggleBookmarks?: () => void;
  page: number;
  pageCount: number;
  rows?: number;
}

/**
 * JEI 书签面板（`BookmarkOverlay` 视觉复刻）：左侧窄栏
 * `bookmark_list_background_v2` + `bookmark_list_slot_background_v2` 纵向书签槽，
 * 底部翻页箭头与书签/历史 20×20 按钮（数据注入、无书签逻辑）。
 */
export function JeiBookmarkPanel({
  bookmarks,
  className,
  onOpenHistory,
  onPageChange,
  onRemoveBookmark,
  onToggleBookmarks,
  page,
  pageCount,
  rows = 4,
}: JeiBookmarkPanelProps) {
  const panelWidth = JEI_INGREDIENT_CELL + JEI_BOOKMARK.panelPadding * 2;
  const buttonsRowWidth = JEI_BOOKMARK.buttonSize * 2 + JEI_BOOKMARK.buttonGap;
  const width = Math.max(panelWidth, buttonsRowWidth);
  const panelLeft = width - panelWidth;
  const panelHeight = rows * JEI_INGREDIENT_CELL + JEI_BOOKMARK.panelPadding * 2;
  const cells = bookmarks ?? [];
  const arrow = JEI_BOOKMARK.pageArrow;
  const arrowsRow = panelHeight + arrow.gap;
  const buttonsRow = arrowsRow + arrow.height + arrow.gap;
  const arrowsTotalWidth = arrow.width * 2 + arrow.gap;
  const hasPrevious = page > 0;
  const hasNext = page < pageCount - 1;

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ height: gui(buttonsRow + JEI_BOOKMARK.buttonSize), width: gui(width) }}
    >
      <JeiSprite
        height={panelHeight}
        left={panelLeft}
        name="bookmark_list_background_v2"
        top={0}
        width={panelWidth}
      />
      {cells.map((bookmark, index) => {
        const x = panelLeft + JEI_BOOKMARK.panelPadding;
        const y = JEI_BOOKMARK.panelPadding + index * JEI_INGREDIENT_CELL;
        return (
          <Fragment key={`${x}-${y}`}>
            <JeiSprite
              height={JEI_INGREDIENT_CELL}
              left={x}
              name="bookmark_list_slot_background_v2"
              top={y}
              width={JEI_INGREDIENT_CELL}
            />
            <ScreenItemSlot
              frame={false}
              item={bookmark}
              label={`jei-bookmark-${index}`}
              left={x}
              onActivate={onRemoveBookmark ? () => onRemoveBookmark(index, bookmark) : undefined}
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
      <JeiIconButton
        height={JEI_BOOKMARK.buttonSize}
        icon="icons/bookmark_button_enabled"
        label="书签"
        left={0}
        onClick={onToggleBookmarks}
        top={buttonsRow}
        width={JEI_BOOKMARK.buttonSize}
      />
      <JeiIconButton
        height={JEI_BOOKMARK.buttonSize}
        icon="icons/history_button_enabled"
        label="查阅历史"
        left={JEI_BOOKMARK.buttonSize + JEI_BOOKMARK.buttonGap}
        onClick={onOpenHistory}
        top={buttonsRow}
        width={JEI_BOOKMARK.buttonSize}
      />
    </div>
  );
}
