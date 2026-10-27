import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";
import { padSlots } from "../types";

/**
 * 盔甲槽位 y（GUI px，步进 18）
 */
const ARMOR_TOPS = [7, 25, 43, 61];

/**
 * 2×2 合成格左上角（GUI px）
 */
const CRAFT_POSITIONS = [
  [97, 17],
  [115, 17],
  [97, 35],
  [115, 35],
] as const;

export interface InventoryScreenProps {
  /**
  * 盔甲 4 格
  */
  armorItems?: ScreenSlot[];
  className?: string;
  /**
  * 合成 2×2
  */
  craftItems?: ScreenSlot[];
  /**
  * 合成产物
  */
  craftResult?: ScreenSlot;
  /**
  * 快捷栏 9 格
  */
  hotbarItems?: ScreenSlot[];
  /**
  * 主背包 27 格（3×9）
  */
  mainItems?: ScreenSlot[];
  /**
  * 副手槽（原版 (76,61)）
  */
  offhandItem?: ScreenSlot;
  onSlotClick?: (
    area: "armor" | "craft" | "craft-result" | "hotbar" | "main" | "offhand",
    index: number,
  ) => void;
  /**
  * 玩家预览（原版 (26,8) 50×64 的角色模型区）
  */
  playerPreview?: ReactNode;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 物品栏界面（规格 §6）：176×166 面板 + 绝对坐标槽位，数据注入、无游戏逻辑。
 * RSC 兼容（纯展示 + 可选回调）。
 */
export function InventoryScreen({
  armorItems = [],
  className,
  craftItems = [],
  craftResult = null,
  hotbarItems = [],
  mainItems = [],
  offhandItem,
  onSlotClick,
  playerPreview,
  selectedIndex,
  title,
}: InventoryScreenProps) {
  const armor = padSlots(armorItems, 4);
  const craft = padSlots(craftItems, 4);

  return (
    <ScreenPanel className={className} height={166} title={title} width={176}>
      <div
        className="absolute"
        style={{ height: gui(64), left: gui(26), top: gui(8), width: gui(50) }}
      >
        {playerPreview}
      </div>
      {ARMOR_TOPS.map((top, index) => (
        <ScreenItemSlot
          item={armor[index]}
          key={top}
          label={`armor-${index}`}
          left={7}
          onActivate={
            onSlotClick
              ? () => {
                  onSlotClick("armor", index);
                }
              : undefined
          }
          top={top}
        />
      ))}
      <ScreenItemSlot
        item={offhandItem}
        label="offhand-0"
        left={76}
        onActivate={
          onSlotClick
            ? () => {
                onSlotClick("offhand", 0);
              }
            : undefined
        }
        top={61}
      />
      {CRAFT_POSITIONS.map(([left, top], index) => (
        <ScreenItemSlot
          item={craft[index]}
          key={`${left}-${top}`}
          label={`craft-${index}`}
          left={left}
          onActivate={
            onSlotClick
              ? () => {
                  onSlotClick("craft", index);
                }
              : undefined
          }
          top={top}
        />
      ))}
      <ScreenItemSlot
        item={craftResult}
        label="craft-result-0"
        left={153}
        onActivate={
          onSlotClick
            ? () => {
                onSlotClick("craft-result", 0);
              }
            : undefined
        }
        top={27}
      />
      <PlayerInventory
        hotbarItems={hotbarItems}
        mainItems={mainItems}
        onSlotClick={onSlotClick}
        selectedIndex={selectedIndex}
      />
    </ScreenPanel>
  );
}
