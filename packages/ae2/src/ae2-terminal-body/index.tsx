import type { PlayerInventoryProps, ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import {
  ModScrollbar,
  ModSearchField,
  ModSlotGrid,
  ModSprite,
  ModTabButton,
  ModTitle,
} from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { PlayerInventory, ScreenPanel } from "@tennantite/ui";

import type { Ae2PanelBackgroundProps, Ae2PanelSlices } from "../ae2-panel";
import {
  AE2_ICONS,
  ae2TerminalPlayerHotbarTop,
  ae2TerminalPlayerMainTop,
  ae2TerminalPlayerTitleTop,
} from "../ae2-layout";
import { Ae2PanelBackground } from "../ae2-panel";
import { Ae2Text } from "../ae2-text/index";

export interface Ae2TerminalBodyProps {
  /**
   * 网格与玩家背包之间插入的屏专属内容（合成格/样板区）
   */
  children?: ReactNode;
  entriesLabel?: ReactNode;
  grid: { columns: number; labelPrefix: string; left: number; rows: number; slotSize: number; top: number };
  height: number;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  mainItems?: PlayerInventoryProps["mainItems"];
  onCraftingStatus?: () => void;
  onSearchChange?: (value: string) => void;
  onSlotClick?: (index: number, item: ScreenSlot) => void;
  panel: { slices: Ae2PanelSlices; sprite: Ae2PanelBackgroundProps["name"]; width: number };
  playerTitleTop?: number;
  scrollbar: { left: number; rowHeight: number; top: number };
  search: { left: number; top: number; width: number };
  searchDefaultValue?: string;
  searchPlaceholder?: string;
  selectedIndex?: number;
  showStatusTab?: boolean;
  slots: ScreenSlot[];
  statusTabLeft?: number;
  statusTabTop?: number;
  title: ReactNode;
}

/**
 * AE2 终端家族主体：面板背景 + 标题/搜索/物品网格/滚动条 + 屏专属内容 + 背包。
 */
export function Ae2TerminalBody({
  children,
  entriesLabel,
  grid,
  height,
  hotbarItems,
  mainItems,
  onCraftingStatus,
  onSearchChange,
  onSlotClick,
  panel,
  playerTitleTop = ae2TerminalPlayerTitleTop(height),
  scrollbar,
  search,
  searchDefaultValue,
  searchPlaceholder = "搜索…",
  selectedIndex,
  showStatusTab = true,
  slots,
  statusTabLeft = 171,
  statusTabTop = -5,
  title,
}: Ae2TerminalBodyProps) {
  return (
    <ScreenPanel
      backgroundClassName="bg-transparent"
      height={height}
      width={panel.width}
    >
      <Ae2PanelBackground
        name={panel.sprite}
        rows={grid.rows}
        slices={panel.slices}
      />
      <ModTitle left={8} top={6}>{title}</ModTitle>
      <ModSearchField
        defaultValue={searchDefaultValue}
        left={search.left}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        top={search.top}
        width={search.width}
      />
      {entriesLabel === undefined
        ? null
        : <Ae2Text right={26} top={8}>{entriesLabel}</Ae2Text>}
      <ModSlotGrid
        cellSize={grid.slotSize}
        columns={grid.columns}
        frame={false}
        items={slots}
        labelPrefix={grid.labelPrefix}
        left={grid.left}
        onSlotClick={onSlotClick}
        rows={grid.rows}
        top={grid.top}
      />
      <ModScrollbar
        height={grid.rows * scrollbar.rowHeight - 2}
        left={scrollbar.left}
        top={scrollbar.top}
        track={false}
      />
      {children}
      <ModTitle left={8} top={playerTitleTop}>物品栏</ModTitle>
      <PlayerInventory
        bare
        hotbarItems={hotbarItems}
        hotbarY={ae2TerminalPlayerHotbarTop(height)}
        mainItems={mainItems}
        selectedIndex={selectedIndex}
        x={7}
        y={ae2TerminalPlayerMainTop(height)}
      />
      {showStatusTab
        ? (
            <ModTabButton
              icon={<ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.craftStatus} />}
              label="合成状态"
              left={statusTabLeft}
              onClick={onCraftingStatus}
              top={statusTabTop}
            />
          )
        : null}
    </ScreenPanel>
  );
}
