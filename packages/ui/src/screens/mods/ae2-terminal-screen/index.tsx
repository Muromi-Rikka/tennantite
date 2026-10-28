import type { ReactNode } from "react";
import { ae2SpriteMeta } from "@verdigris/textures";

import type { PlayerInventoryProps } from "../../../containers/player-inventory/index";
import type { ScreenSlot } from "../../containers/types";
import type { Ae2TerminalAction } from "../ae2-types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { cn, gui } from "../../../lib/utils";
import { padSlots } from "../../containers/types";
import {
  AE2_ICONS,
  AE2_TERMINAL,
  AE2_TERMINAL_SLICES,
  ae2TerminalHeight,
  ae2TerminalPlayerHotbarTop,
  ae2TerminalPlayerMainTop,
  ae2TerminalPlayerTitleTop,
} from "../ae2-layout";
import { Ae2PanelBackground } from "../ae2-panel";
import {
  ModScrollbar,
  ModSearchField,
  ModSlotGrid,
  ModSprite,
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
 * ME 终端界面（AE2 视觉复刻）：195×(17+18·rows+97) 面板。
 *
 * 面板、9 列物品网格、滚动条轨道与玩家背包全部来自 AE2 `terminal.png` 切片；
 * 组件只在贴图坐标上叠加搜索框、交互热区与工具栏。
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
        paddingLeft: gui(showToolbar ? 19 : 0),
        paddingTop: gui(6),
      }}
    >
      {showToolbar
        ? (
            <ModToolbar
              items={[
                {
                  icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.sortName} />,
                  label: "按名称排序",
                  onClick: () => onToolbarAction?.("sort-name"),
                },
                {
                  icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.settings} />,
                  label: "终端设置",
                  onClick: () => onToolbarAction?.("settings"),
                },
                {
                  icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.sortDirection} />,
                  label: "排序方向",
                  onClick: () => onToolbarAction?.("sort-direction"),
                },
                {
                  icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.view} />,
                  label: "查看模式",
                  onClick: () => onToolbarAction?.("view-mode"),
                },
                {
                  icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.style} />,
                  label: "终端样式",
                  onClick: () => onToolbarAction?.("style"),
                },
              ]}
              left={0}
              top={14}
            />
          )
        : null}
      <ScreenPanel
        backgroundClassName="bg-transparent"
        height={height}
        width={AE2_TERMINAL.panelWidth}
      >
        <Ae2PanelBackground
          name={AE2_TERMINAL.sprite}
          rows={rows}
          slices={AE2_TERMINAL_SLICES}
        />
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
          frame={false}
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
          track={false}
        />
        <ModTitle left={8} top={ae2TerminalPlayerTitleTop(height)}>物品栏</ModTitle>
        <PlayerInventory
          bare
          hotbarItems={hotbarItems}
          hotbarY={ae2TerminalPlayerHotbarTop(height)}
          mainItems={mainItems}
          selectedIndex={selectedIndex}
          x={7}
          y={ae2TerminalPlayerMainTop(height)}
        />
        <ModTabButton
          icon={<ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.craftStatus} />}
          label="合成状态"
          left={171}
          onClick={onCraftingStatus}
          top={-5}
        />
      </ScreenPanel>
    </div>
  );
}
