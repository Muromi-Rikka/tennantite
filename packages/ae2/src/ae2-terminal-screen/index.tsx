import type { PlayerInventoryProps, ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModSprite, ModToolbar } from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { cn, gui, padSlots } from "@tennantite/ui";
import type { Ae2TerminalAction } from "../ae2-types";
import { AE2_ICONS, AE2_TERMINAL, AE2_TERMINAL_SLICES, ae2TerminalHeight } from "../ae2-layout";
import { Ae2TerminalBody } from "../ae2-terminal-body/index";

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
      <Ae2TerminalBody
        entriesLabel={entriesLabel}
        grid={{
          columns: AE2_TERMINAL.columns,
          labelPrefix: "terminal",
          left: AE2_TERMINAL.gridLeft,
          rows,
          slotSize: AE2_TERMINAL.slotSize,
          top: AE2_TERMINAL.gridTop,
        }}
        height={height}
        hotbarItems={hotbarItems}
        mainItems={mainItems}
        onCraftingStatus={onCraftingStatus}
        onSearchChange={onSearchChange}
        onSlotClick={onSlotClick}
        panel={{ slices: AE2_TERMINAL_SLICES, sprite: AE2_TERMINAL.sprite, width: AE2_TERMINAL.panelWidth }}
        scrollbar={{ left: AE2_TERMINAL.scrollbar.left, rowHeight: AE2_TERMINAL.rowHeight, top: AE2_TERMINAL.scrollbar.top }}
        search={AE2_TERMINAL.search}
        searchDefaultValue={searchDefaultValue}
        searchPlaceholder={searchPlaceholder}
        selectedIndex={selectedIndex}
        slots={slots}
        title={title}
      />
    </div>
  );
}
