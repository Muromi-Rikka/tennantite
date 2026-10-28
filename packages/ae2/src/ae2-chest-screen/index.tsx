import type { ReactNode } from "react";

import type { PlayerInventoryProps } from "@verdigris/ui";
import type { ScreenSlot } from "@verdigris/ui";
import { PlayerInventory } from "@verdigris/ui";
import { ScreenPanel } from "@verdigris/ui";
import { cn, gui } from "@verdigris/ui";
import { ScreenItemSlot } from "@verdigris/ui";
import {
  AE2_CHEST,
  AE2_PLAYER,
  ae2PlayerHotbarTop,
  ae2PlayerMainTop,
  ae2PlayerTitleTop,
  ae2SlotFrame,
} from "../ae2-layout";
import { Ae2PriorityTab } from "../ae2-priority-tab/index";
import { ModTitle } from "@verdigris/mods-core";

export interface Ae2ChestScreenProps {
  className?: string;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  mainItems?: PlayerInventoryProps["mainItems"];
  onPriority?: () => void;
  onStorageClick?: () => void;
  selectedIndex?: number;
  storage?: ScreenSlot;
  title?: ReactNode;
}

/**
 * ME 箱子界面（AE2 1.21 视觉复刻）：176×168 面板，
 * 单个存储元件槽、右上优先级标签与玩家背包。
 */
export function Ae2ChestScreen({
  className,
  hotbarItems,
  mainItems,
  onPriority,
  onStorageClick,
  selectedIndex,
  storage,
  title = "ME 箱子",
}: Ae2ChestScreenProps) {
  const height = AE2_CHEST.height;

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ paddingTop: gui(6) }}
    >
      <ScreenPanel
        backgroundClassName={AE2_CHEST.backgroundClassName}
        height={height}
        width={AE2_CHEST.width}
      >
        <ModTitle left={8} top={6}>{title}</ModTitle>
        <ScreenItemSlot
          frame
          frameClassName={AE2_CHEST.slotFrameClassName}
          item={storage}
          label="chest-storage"
          onActivate={onStorageClick}
          size={AE2_CHEST.storage.size}
          {...ae2SlotFrame(AE2_CHEST.storage, AE2_CHEST.storage.size)}
        />
        <Ae2PriorityTab
          left={AE2_CHEST.priority.left}
          onClick={onPriority}
          top={AE2_CHEST.priority.top}
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
      </ScreenPanel>
    </div>
  );
}
