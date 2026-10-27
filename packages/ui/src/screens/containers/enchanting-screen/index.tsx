import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { Button } from "../../../primitives/button/index";
import { ScreenItemSlot } from "../screen-slot";

export interface EnchantingScreenProps {
  availableLevel?: number;
  className?: string;
  /**
  * 待附魔物品（左槽 (14,46)）
  */
  item?: ScreenSlot;
  /**
  * 青金石（右槽 (34,46)）
  */
  lapis?: ScreenSlot;
  onEnchantSelect?: (option: EnchantOption) => void;
  options?: EnchantOption[];
  title?: ReactNode;
}

export interface EnchantOption {
  /**
  * 附魔描述（可选，游戏内为隐藏提示）
  */
  label?: string;
  /**
  * 消耗的青金石数量
  */
  lapisCost: number;
  /**
  * 附魔等级（顶部选项 I / II / III）
  */
  level: 1 | 2 | 3;
  /**
  * 消耗的经验等级
  */
  xpCost: number;
}

const ROMAN = ["", "I", "II", "III"];

/**
 * 附魔台界面（规格 §6）：物品 + 青金石 + 3 个 108×19 选项按钮（原版恒为灰色石纹）。
 */
export function EnchantingScreen({
  availableLevel = 0,
  className,
  item,
  lapis,
  onEnchantSelect,
  options = [],
  title = "附魔",
}: EnchantingScreenProps) {
  return (
    <ScreenPanel className={className} height={166} title={title} width={176}>
      <ScreenItemSlot item={item} label="enchant-item" left={14} top={46} />
      <ScreenItemSlot item={lapis} label="enchant-lapis" left={34} top={46} />
      {options.map((option, index) => {
        const isAffordable
          = availableLevel >= option.xpCost
            && (lapis?.count ?? 0) >= option.lapisCost;
        return (
          <Button
            aria-label={`附魔选项 ${ROMAN[option.level]}（消耗 ${option.xpCost} 级与 ${option.lapisCost} 青金石）`}
            className="absolute h-19 w-108"
            disabled={!isAffordable}
            key={option.level}
            onClick={() => {
              onEnchantSelect?.(option);
            }}
            style={{ left: gui(60), top: gui(14 + 18 * index) }}
            variant="default"
          >
            {ROMAN[option.level]}
            {" "}
            ·
            {option.lapisCost}
            {" "}
            青金石 ·
            {option.xpCost}
            {" "}
            级
          </Button>
        );
      })}
      <PlayerInventory />
    </ScreenPanel>
  );
}
