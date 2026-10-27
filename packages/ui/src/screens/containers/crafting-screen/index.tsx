import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";
import { padSlots } from "../types";

/**
 * 3×3 合成格左上角（GUI px，步进 18）
 */
const CRAFT_POSITIONS = [
  [29, 16],
  [47, 16],
  [65, 16],
  [29, 34],
  [47, 34],
  [65, 34],
  [29, 52],
  [47, 52],
  [65, 52],
] as const;

export interface CraftingScreenProps {
  className?: string;
  /**
  * 3×3 合成格（规格 §6）
  */
  craftItems?: ScreenSlot[];
  /**
  * 合成产物（26×26 结果槽）
  */
  craftResult?: ScreenSlot;
  /**
  * 底部玩家快捷栏
  */
  hotbarItems?: ScreenSlot[];
  onSlotClick?: (area: "craft" | "craft-result" | "hotbar" | "main", index: number) => void;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 工作台界面（规格 §6）：176×166 面板 + 3×3 合成格 + 26×26 结果槽与箭头。
 */
export function CraftingScreen({
  className,
  craftItems = [],
  craftResult = null,
  hotbarItems = [],
  onSlotClick,
  selectedIndex,
  title = "合成",
}: CraftingScreenProps) {
  const craft = padSlots(craftItems, 9);

  return (
    <ScreenPanel className={className} height={166} title={title} width={176}>
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
      <div
        aria-hidden="true"
        className="mc-tex-craft-arrow absolute"
        style={{ height: gui(15), left: gui(90), top: gui(35), width: gui(23) }}
      />
      <ScreenItemSlot
        item={craftResult}
        label="craft-result-0"
        left={119}
        onActivate={
          onSlotClick
            ? () => {
                onSlotClick("craft-result", 0);
              }
            : undefined
        }
        size={26}
        top={30}
      />
      <PlayerInventory
        hotbarItems={hotbarItems}
        onSlotClick={onSlotClick}
        selectedIndex={selectedIndex}
      />
    </ScreenPanel>
  );
}
