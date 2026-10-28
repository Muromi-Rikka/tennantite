import type { ReactNode } from "react";

import type { PlayerInventoryProps } from "../../../containers/player-inventory/index";
import type { ScreenSlot } from "../../containers/types";
import type { Ae2TerminalAction } from "../ae2-types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { cn, gui } from "../../../lib/utils";
import { padSlots } from "../../containers/types";
import {
  AE2_PLAYER,
  AE2_TERMINAL,
  ae2PlayerHotbarTop,
  ae2PlayerMainTop,
  ae2PlayerTitleTop,
  ae2TerminalHeight,
} from "../ae2-layout";
import {
  ModScrollbar,
  ModSearchField,
  ModSlotGrid,
  ModTabButton,
  ModTitle,
  ModToolbar,
} from "../mod-parts";

export interface Ae2TerminalScreenProps {
  className?: string;
  entriesLabel?: ReactNode;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  items?: ScreenSlot[];
  mainItems?: PlayerInventoryProps["mainItems"];
  onCraftingStatus?: () => void;
  onSearchChange?: (value: string) => void;
  onSlotClick?: (index: number, item: ScreenSlot) => void;
  onToolbarAction?: (action: Ae2TerminalAction) => void;
  /**
  * 终端行数（默认 6；内部最小 2）
  */
  rows?: number;
  searchDefaultValue?: string;
  searchPlaceholder?: string;
  selectedIndex?: number;
  /**
  * 是否显示左侧工具栏（默认 true）
  */
  showToolbar?: boolean;
  title?: ReactNode;
}

/**
 * ME 终端界面（AE2 1.21 视觉复刻）：195×224（默认 6 行）面板，
 * 9 列物品网格、搜索框、滚动条、玩家背包与左侧工具栏。
 */
export function Ae2TerminalScreen({
  className,
  entriesLabel,
  hotbarItems,
  items,
  mainItems,
  onCraftingStatus,
  onSearchChange,
  onSlotClick,
  onToolbarAction,
  rows: rowsProp = 6,
  searchDefaultValue,
  searchPlaceholder = "搜索…",
  selectedIndex,
  showToolbar = true,
  title = "ME 终端",
}: Ae2TerminalScreenProps) {
  const rows = Math.max(2, Math.floor(rowsProp));
  const height = ae2TerminalHeight(rows);
  const slots = padSlots(items ?? [], rows * AE2_TERMINAL.columns);

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{
        paddingLeft: gui(showToolbar ? 21 : 0),
        paddingTop: gui(6),
      }}
    >
      {showToolbar
        ? (
            <ModToolbar
              items={[
                {
                  iconClassName: "mc-tex-ae2-icon-sort-name",
                  label: "按名称排序",
                  onClick: () => onToolbarAction?.("sort-name"),
                },
                {
                  iconClassName: "mc-tex-ae2-icon-sort-direction",
                  label: "排序方向",
                  onClick: () => onToolbarAction?.("sort-direction"),
                },
                {
                  iconClassName: "mc-tex-ae2-icon-view",
                  label: "查看模式",
                  onClick: () => onToolbarAction?.("view-mode"),
                },
                {
                  iconClassName: "mc-tex-ae2-icon-cog",
                  label: "终端设置",
                  onClick: () => onToolbarAction?.("settings"),
                },
                {
                  iconClassName: "mc-tex-ae2-icon-style",
                  label: "终端样式",
                  onClick: () => onToolbarAction?.("style"),
                },
              ]}
              left={0}
              top={6}
            />
          )
        : null}
      <ScreenPanel
        backgroundClassName={AE2_TERMINAL.backgroundClassName}
        height={height}
        width={AE2_TERMINAL.panelWidth}
      >
        <ModTitle left={8} top={6}>{title}</ModTitle>
        <ModSearchField
          defaultValue={searchDefaultValue}
          left={AE2_TERMINAL.search.left}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          top={AE2_TERMINAL.search.top}
          width={AE2_TERMINAL.search.width}
        />
        {entriesLabel === undefined
          ? null
          : (
              <span
                aria-hidden="true"
                className="absolute font-mc text-mc-ae2-text"
                style={{
                  fontSize: "calc(var(--mc-gui) * 5.4)",
                  lineHeight: "calc(var(--mc-gui) * 9)",
                  right: gui(26),
                  top: gui(8),
                }}
              >
                {entriesLabel}
              </span>
            )}
        <ModSlotGrid
          cellSize={AE2_TERMINAL.slotSize}
          columns={AE2_TERMINAL.columns}
          frameClassName={AE2_TERMINAL.slotFrameClassName}
          items={slots}
          labelPrefix="terminal"
          left={AE2_TERMINAL.gridLeft}
          onSlotClick={onSlotClick}
          rows={rows}
          top={AE2_TERMINAL.gridTop}
        />
        <ModScrollbar
          height={rows * AE2_TERMINAL.rowHeight - 2}
          left={AE2_TERMINAL.scrollbar.left}
          top={AE2_TERMINAL.scrollbar.top}
        />
        <ModTitle left={8} top={ae2PlayerTitleTop(height)}>物品栏</ModTitle>
        <PlayerInventory
          frameClassName={AE2_PLAYER.frameClassName}
          hotbarItems={hotbarItems}
          hotbarY={ae2PlayerHotbarTop(height)}
          mainItems={mainItems}
          selectedIndex={selectedIndex}
          x={AE2_PLAYER.frameLeft}
          y={ae2PlayerMainTop(height)}
        />
        <ModTabButton
          iconClassName="mc-tex-ae2-icon-craft"
          label="合成状态"
          left={171}
          onClick={onCraftingStatus}
          top={-5}
        />
      </ScreenPanel>
    </div>
  );
}
