import type { MekanismSpriteName } from "@tennantite/textures";
import { cn, gui } from "@tennantite/ui";

import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismListProps {
  className?: string;
  /**
   * 绝对定位左上角（GUI px）
   */
  left: number;
  /**
   * 行点击回调
   */
  onRowClick?: (id: string) => void;
  /**
   * 数据全量注入；渲染层按 visibleRows 截断（照上游渲染层截断模式）
   */
  rows: MekanismListRow[];
  /**
   * 滚动位置 0..1（展示态：决定可见窗口起点与滚动条把手位置，默认 0）
   */
  scroll?: number;
  selectedId?: string;
  top: number;
  /**
   * 行样式：list = GuiInstallableScrollList 行（12 高，list/base 族 +
   * 细滚动条 scroll/list_border + scroll/list_bar）；
   * filter = FilterButton 行（29 高，list/filter/base 族 + GuiScrollBar 式
   * element_holder 槽 + scroll/bar 把手，供数字采矿机过滤列表）。
   */
  variant?: "filter" | "list";
  /**
   * 呈现行数
   */
  visibleRows: number;
  width: number;
}

export interface MekanismListRow {
  /**
   * 行图标（可选；list 行 8×8 于 list/slot 框内居中，filter 行 8×8 于 18×18 槽框内居中）
   */
  icon?: MekanismSpriteName;
  id: string;
  label: string;
}

const LIST_ROW_HEIGHT = 12;
const FILTER_ROW_HEIGHT = 29;
/**
 * filter 行右侧滚动条槽宽（GuiScrollBar：element_holder 14 宽含 1 px 边框）
 */
const FILTER_SCROLL_GUTTER = 14;

/**
 * Mekanism 滚动列表（GuiScrollList 系）：行背景 list/base|hovered|selected、
 * 图标槽 list/slot 族、滚动条。数据注入、无游戏逻辑；滚动条仅在数据超出
 * 可见行数时可交互（上游 needsScrollBars），把手位置由 scroll 展示态驱动。
 */
export function MekanismList({
  className,
  left,
  onRowClick,
  rows,
  scroll = 0,
  selectedId,
  top,
  variant = "list",
  visibleRows,
  width,
}: MekanismListProps) {
  const rowHeight = variant === "filter" ? FILTER_ROW_HEIGHT : LIST_ROW_HEIGHT;
  const overflow = Math.max(0, rows.length - visibleRows);
  const clampedScroll = Math.min(1, Math.max(0, scroll));
  const startIndex = Math.round(clampedScroll * overflow);
  const visible = rows.slice(startIndex, startIndex + visibleRows);
  const rowWidth = width - (variant === "filter" ? FILTER_SCROLL_GUTTER : 8);
  const listHeight = visibleRows * rowHeight + 2;

  const barTravel = variant === "filter"
    ? listHeight - 2 - 15
    : listHeight - 4 - 4;

  return (
    <div
      className={cn("absolute", className)}
      data-mek-list=""
      data-mek-list-variant={variant}
      role="listbox"
      style={{ height: gui(listHeight), left: gui(left), top: gui(top), width: gui(width) }}
    >
      {visible.map((row, index) => {
        const rowIndex = startIndex + index;
        const rowTop = variant === "filter" ? rowIndex * rowHeight : 1 + rowIndex * rowHeight;
        const isSelected = row.id === selectedId;
        const rowBase = variant === "filter"
          ? "list/filter/base"
          : (isSelected
              ? "list/selected"
              : "list/base");
        const rowHover = variant === "filter"
          ? "list/filter/hovered"
          : (isSelected
              ? null
              : "list/hovered");
        const slotBase = isSelected ? "list/slot_selected" : "list/slot";
        return (
          <button
            aria-label={row.label}
            aria-selected={isSelected}
            className="group absolute cursor-pointer border-0 bg-transparent p-0"
            key={row.id}
            onClick={onRowClick ? () => onRowClick(row.id) : undefined}
            role="option"
            style={{ height: gui(rowHeight), left: 0, top: gui(rowTop), width: gui(rowWidth) }}
            type="button"
          >
            <MekanismSprite height={rowHeight} name={rowBase} width={rowWidth} />
            {rowHover
              ? (
                  <MekanismSprite
                    className="opacity-0 group-hover:opacity-100"
                    height={rowHeight}
                    name={rowHover}
                    width={rowWidth}
                  />
                )
              : null}
            {row.icon
              ? (
                  <>
                    {variant === "list"
                      ? (
                          <>
                            <MekanismSprite height={10} left={1} name={slotBase} top={1} width={10} />
                            {isSelected
                              ? null
                              : (
                                  <MekanismSprite
                                    className="opacity-0 group-hover:opacity-100"
                                    height={10}
                                    left={1}
                                    name="list/slot_hovered"
                                    top={1}
                                    width={10}
                                  />
                                )}
                            <MekanismSprite height={8} left={2} name={row.icon} top={2} width={8} />
                          </>
                        )
                      : (
                          <>
                            <MekanismSprite height={18} left={2} name="slot/normal" top={2} width={18} />
                            <MekanismSprite height={8} left={7} name={row.icon} top={7} width={8} />
                          </>
                        )}
                  </>
                )
              : null}
            <span
              className="absolute truncate font-mc mc-text text-white mc-text-shadow"
              style={{
                left: gui(variant === "filter" ? 24 : 13),
                maxWidth: gui(rowWidth - (variant === "filter" ? 28 : 16)),
                top: gui(variant === "filter" ? 3 : 2),
              }}
            >
              {row.label}
            </span>
          </button>
        );
      })}
      {variant === "filter"
        ? (
            <>
              <MekanismSprite
                height={listHeight}
                left={width - FILTER_SCROLL_GUTTER}
                name="element_holder"
                top={0}
                width={FILTER_SCROLL_GUTTER}
              />
              <MekanismSprite
                height={15}
                left={width - FILTER_SCROLL_GUTTER + 1}
                name={overflow > 0 ? "scroll/bar" : "scroll/bar_inactive"}
                top={1 + clampedScroll * barTravel}
                width={12}
              />
            </>
          )
        : (
            <>
              <MekanismSprite height={listHeight - 2} left={width - 7} name="scroll/list_border" top={1} width={6} />
              <MekanismSprite
                height={4}
                left={width - 6}
                name="scroll/list_bar"
                top={2 + clampedScroll * barTravel}
                width={4}
              />
            </>
          )}
    </div>
  );
}
