import type { ReactNode } from "react";
import { ae2SpriteMeta } from "@verdigris/textures";

import type { PlayerInventoryProps } from "@verdigris/ui";
import type { ScreenSlot } from "@verdigris/ui";
import type { Ae2TerminalAction } from "../ae2-types";
import { PlayerInventory } from "@verdigris/ui";
import { ScreenPanel } from "@verdigris/ui";
import { cn, gui } from "@verdigris/ui";
import { ScreenItemSlot } from "@verdigris/ui";
import { padSlots } from "@verdigris/ui";
import {
  AE2_CRAFTING_SLICES,
  AE2_CRAFTING_TERMINAL,
  AE2_ICONS,
  AE2_TERMINAL,
  ae2CraftingTerminalHeight,
  ae2TerminalPlayerHotbarTop,
  ae2TerminalPlayerMainTop,
  ae2TerminalPlayerTitleTop,
} from "../ae2-layout";
import { Ae2PanelBackground } from "../ae2-panel";
import {
  ModIconButton,
  ModScrollbar,
  ModSearchField,
  ModSlotGrid,
  ModSprite,
  ModTabButton,
  ModTitle,
  ModToolbar,
} from "@verdigris/mods-core";

export interface Ae2CraftingTerminalScreenProps {
  className?: string;
  /**
  * 合成区标题（默认“合成终端”）
  */
  craftingTitle?: ReactNode;
  /**
  * 3×3 合成格物品（行优先，最多 9）
  */
  craftItems?: ScreenSlot[];
  /**
  * 合成结果槽物品
  */
  craftResult?: ScreenSlot;
  entriesLabel?: ReactNode;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  items?: ScreenSlot[];
  mainItems?: PlayerInventoryProps["mainItems"];
  /**
  * 清空合成格按钮回调
  */
  onClearCraftingGrid?: () => void;
  onCraftingStatus?: () => void;
  /**
  * 合成结果槽回调
  */
  onCraftResultClick?: (item: ScreenSlot) => void;
  /**
  * 合成格点击回调（索引 0–8，行优先）
  */
  onCraftSlotClick?: (index: number, item: ScreenSlot) => void;
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
 * 合成终端界面（AE2 视觉复刻）：195×(17+18·rows+170) 面板。
 *
 * 3×3 合成格、连接箭头、26×26 结果槽与玩家背包全部来自 AE2 `crafting.png`
 * 切片；组件叠加搜索框、合成格/结果槽热区、清空按钮与左侧工具栏。
 */
export function Ae2CraftingTerminalScreen({
  className,
  craftingTitle = "合成终端",
  craftItems,
  craftResult,
  entriesLabel,
  hotbarItems,
  items,
  mainItems,
  onClearCraftingGrid,
  onCraftingStatus,
  onCraftResultClick,
  onCraftSlotClick,
  onSearchChange,
  onSlotClick,
  onToolbarAction,
  rows: rowsProp = 6,
  searchDefaultValue,
  searchPlaceholder = "搜索…",
  selectedIndex,
  showToolbar = true,
  title = "终端",
}: Ae2CraftingTerminalScreenProps) {
  const rows = Math.max(2, Math.floor(rowsProp));
  const height = ae2CraftingTerminalHeight(rows);
  const slots = padSlots(items ?? [], rows * AE2_CRAFTING_TERMINAL.columns);
  const craft = padSlots(
    craftItems ?? [],
    AE2_CRAFTING_TERMINAL.craftGrid.rows * AE2_CRAFTING_TERMINAL.craftGrid.columns,
  );

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
        width={AE2_CRAFTING_TERMINAL.panelWidth}
      >
        <Ae2PanelBackground
          name={AE2_CRAFTING_TERMINAL.sprite}
          rows={rows}
          slices={AE2_CRAFTING_SLICES}
        />
        <ModTitle left={8} top={6}>{title}</ModTitle>
        <ModSearchField
          defaultValue={searchDefaultValue}
          left={AE2_CRAFTING_TERMINAL.search.left}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          top={AE2_CRAFTING_TERMINAL.search.top}
          width={AE2_CRAFTING_TERMINAL.search.width}
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
          cellSize={AE2_CRAFTING_TERMINAL.slotSize}
          columns={AE2_CRAFTING_TERMINAL.columns}
          frame={false}
          items={slots}
          labelPrefix="terminal"
          left={AE2_TERMINAL.gridLeft}
          onSlotClick={onSlotClick}
          rows={rows}
          top={AE2_TERMINAL.gridTop}
        />
        <ModScrollbar
          height={rows * AE2_CRAFTING_TERMINAL.rowHeight - 2}
          left={AE2_CRAFTING_TERMINAL.scrollbar.left}
          top={AE2_CRAFTING_TERMINAL.scrollbar.top}
          track={false}
        />
        <ModTitle
          left={AE2_CRAFTING_TERMINAL.craftTitleLeft}
          top={height - AE2_CRAFTING_TERMINAL.craftTitleTopFromBottom}
        >
          {craftingTitle}
        </ModTitle>
        <ModSlotGrid
          cellSize={AE2_CRAFTING_TERMINAL.slotSize}
          columns={AE2_CRAFTING_TERMINAL.craftGrid.columns}
          frame={false}
          items={craft}
          labelPrefix="craft"
          left={AE2_CRAFTING_TERMINAL.craftGrid.left}
          onSlotClick={onCraftSlotClick}
          rows={AE2_CRAFTING_TERMINAL.craftGrid.rows}
          top={height - AE2_CRAFTING_TERMINAL.craftGrid.topFromBottom}
        />
        <ModIconButton
          buttonClassName="mc-tex-ae2-clear-button"
          height={AE2_CRAFTING_TERMINAL.clear.size}
          iconClassName="mc-tex-ae2-icon-clear"
          iconSize={6}
          label="清空合成格"
          left={AE2_CRAFTING_TERMINAL.clear.left}
          onClick={onClearCraftingGrid}
          top={height - AE2_CRAFTING_TERMINAL.clear.topFromBottom}
          width={AE2_CRAFTING_TERMINAL.clear.size}
        />
        <ScreenItemSlot
          frame={false}
          item={craftResult ?? null}
          label="craft-result"
          left={AE2_CRAFTING_TERMINAL.craftResult.left}
          onActivate={onCraftResultClick ? () => onCraftResultClick(craftResult) : undefined}
          size={AE2_CRAFTING_TERMINAL.craftResult.size}
          top={height - AE2_CRAFTING_TERMINAL.craftResult.topFromBottom}
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
