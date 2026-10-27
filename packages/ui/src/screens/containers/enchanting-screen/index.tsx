import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";

export interface EnchantingScreenProps {
  availableLevel?: number;
  className?: string;
  item?: ScreenSlot;
  lapis?: ScreenSlot;
  onEnchantSelect?: (option: EnchantOption) => void;
  options?: EnchantOption[];
  title?: ReactNode;
}

export interface EnchantOption {
  label?: string;
  lapisCost: number;
  level: 1 | 2 | 3;
  xpCost: number;
}

const ROMAN = ["", "I", "II", "III"];

/**
 * 附魔台界面（规格 §6）：`container/enchanting_table.png` 176×166。
 */
export function EnchantingScreen({
  availableLevel = 0,
  className,
  item,
  lapis,
  onEnchantSelect,
  options = [],
  title,
}: EnchantingScreenProps) {
  return (
    <ScreenPanel
      background="container/enchanting_table.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      <ScreenItemSlot item={item} label="enchant-item" left={14} top={46} />
      <ScreenItemSlot
        ghost="sprites/container/slot/lapis_lazuli.png"
        item={lapis}
        label="enchant-lapis"
        left={34}
        top={46}
      />
      {options.map((option, index) => {
        const isAffordable
          = availableLevel >= option.xpCost
            && (lapis?.count ?? 0) >= option.lapisCost;
        return (
          <button
            aria-label={`附魔选项 ${ROMAN[option.level]}（消耗 ${option.xpCost} 级与 ${option.lapisCost} 青金石）`}
            className="absolute cursor-pointer border-0 bg-transparent p-0 text-left"
            disabled={!isAffordable}
            key={option.level}
            onClick={() => {
              onEnchantSelect?.(option);
            }}
            style={{ height: gui(19), left: gui(60), top: gui(14 + 18 * index), width: gui(108) }}
            type="button"
          >
            <GuiSprite
              className="absolute inset-0"
              height={19}
              name={isAffordable
                ? "sprites/container/enchanting_table/enchantment_slot.png"
                : "sprites/container/enchanting_table/enchantment_slot_disabled.png"}
              width={108}
            />
            <GuiSprite
              className="absolute"
              height={16}
              name={`sprites/container/enchanting_table/level_${option.level}.png` as never}
              style={{ left: gui(1), top: gui(1) }}
              width={16}
            />
            <span
              className="relative ml-20 font-mc mc-text text-mc-text-main mc-text-shadow"
            >
              {ROMAN[option.level]}
              {" · "}
              {option.lapisCost}
              {" 青金石 · "}
              {option.xpCost}
              {" 级"}
            </span>
          </button>
        );
      })}
      <PlayerInventory bare />
    </ScreenPanel>
  );
}
