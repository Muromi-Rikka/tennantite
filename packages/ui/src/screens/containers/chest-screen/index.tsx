import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { Grid } from "../../../containers/grid/index";
import { ItemStack } from "../../../containers/item-stack/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { Slot } from "../../../containers/slot/index";
import { gui } from "../../../lib/utils";
import { padSlots } from "../types";

export interface ChestScreenProps {
  className?: string;
  /**
  * 底部玩家快捷栏
  */
  hotbarItems?: ScreenSlot[];
  /**
  * 容器内容（9 × rows，行优先）
  */
  items?: ScreenSlot[];
  /**
  * `secondary` = 箱子内容，`main` / `hotbar` = 玩家背包
  */
  onSlotClick?: (area: "hotbar" | "main" | "secondary", index: number) => void;
  /**
  * 行数：单箱 3、大箱 6（规格 §6）
  */
  rows?: 3 | 6;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 箱子 / 潜影盒界面（规格 §6）：176×(114+18rows) 面板 + 容器网格 + 玩家背包。
 * 数据注入、无游戏逻辑，RSC 兼容。
 */
export function ChestScreen({
  className,
  hotbarItems = [],
  items = [],
  onSlotClick,
  rows = 3,
  selectedIndex,
  title = "箱子",
}: ChestScreenProps) {
  const slots = padSlots(items, rows * 9);
  const mainY = rows === 6 ? 139 : 83;
  const hotbarY = rows === 6 ? 197 : 141;

  return (
    <ScreenPanel
      className={className}
      height={114 + 18 * rows}
      title={title}
      width={176}
    >
      <Grid
        className="absolute"
        columns={9}
        style={{ left: gui(7), top: gui(17) }}
      >
        {slots.map((item, index) => (
          <Slot
            aria-label={`chest-${index}`}
            className={onSlotClick ? "cursor-pointer" : undefined}
            key={index}
            onClick={
              onSlotClick
                ? () => {
                    onSlotClick("secondary", index);
                  }
                : undefined
            }
          >
            {item ? <ItemStack bare {...item} /> : null}
          </Slot>
        ))}
      </Grid>
      <PlayerInventory
        hotbarItems={hotbarItems}
        hotbarY={hotbarY}
        onSlotClick={onSlotClick}
        selectedIndex={selectedIndex}
        y={mainY}
      />
    </ScreenPanel>
  );
}
