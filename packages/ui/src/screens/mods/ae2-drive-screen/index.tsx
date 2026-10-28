import type { ReactNode } from "react";

import type { PlayerInventoryProps } from "../../../containers/player-inventory/index";
import type { ScreenSlot } from "../../containers/types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { cn, gui } from "../../../lib/utils";
import { padSlots } from "../../containers/types";
import {
  AE2_DRIVE,
  AE2_PLAYER,
  ae2PlayerHotbarTop,
  ae2PlayerMainTop,
  ae2PlayerTitleTop,
  ae2SlotFrame,
} from "../ae2-layout";
import { ModSlotGrid, ModTabButton, ModTitle } from "../mod-parts";

export interface Ae2DriveScreenProps {
  className?: string;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  /**
  * 10 个存储元件槽
  */
  items?: ScreenSlot[];
  mainItems?: PlayerInventoryProps["mainItems"];
  onPriority?: () => void;
  onSlotClick?: (index: number, item: ScreenSlot) => void;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * ME 驱动器界面（AE2 1.21 视觉复刻）：176×201 面板，
 * 2×5 存储元件槽、右上优先级标签与玩家背包。
 */
export function Ae2DriveScreen({
  className,
  hotbarItems,
  items,
  mainItems,
  onPriority,
  onSlotClick,
  selectedIndex,
  title = "ME 驱动器",
}: Ae2DriveScreenProps) {
  const height = AE2_DRIVE.height;
  const slots = padSlots(items ?? [], AE2_DRIVE.storage.columns * AE2_DRIVE.storage.rows);
  const storageFrame = ae2SlotFrame(AE2_DRIVE.storage);

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ paddingTop: gui(6) }}
    >
      <ScreenPanel
        backgroundClassName={AE2_DRIVE.backgroundClassName}
        height={height}
        width={AE2_DRIVE.width}
      >
        <ModTitle left={8} top={6}>{title}</ModTitle>
        <ModSlotGrid
          cellSize={AE2_DRIVE.storage.cellSize}
          columns={AE2_DRIVE.storage.columns}
          frameClassName={AE2_DRIVE.slotFrameClassName}
          items={slots}
          labelPrefix="drive"
          left={storageFrame.left}
          onSlotClick={onSlotClick}
          rows={AE2_DRIVE.storage.rows}
          top={storageFrame.top}
        />
        <ModTabButton
          iconClassName="mc-tex-ae2-icon-priority"
          label="优先级"
          left={AE2_DRIVE.priority.left}
          onClick={onPriority}
          top={AE2_DRIVE.priority.top}
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
