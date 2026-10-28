import type { ScreenSlot } from "@tennantite/ui";

import { MekanismSlot } from "../mekanism-slot/index";

export interface MekanismArmorSlotsProps {
  armor?: ScreenSlot[];
  /**
   * 装备槽左上角 x
   */
  left: number;
  offhand?: ScreenSlot;
  offhandY: number;
  onSlotClick?: (index: number, item: ScreenSlot) => void;
  /**
   * 第一格顶部 y
   */
  top: number;
}

/**
 * 4 个装备槽（头盔 / 胸甲 / 护腿 / 靴子）+ 副手槽，18 px 步距。
 */
export function MekanismArmorSlots({
  armor = [],
  left,
  offhand,
  offhandY,
  onSlotClick,
  top,
}: MekanismArmorSlotsProps) {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => {
        const isOffhand = index === 4;
        const item = isOffhand ? offhand : armor[index];
        return (
          <MekanismSlot
            item={item}
            key={isOffhand ? "offhand" : `armor-${index}`}
            label={isOffhand ? "offhand" : `armor-${index}`}
            left={left}
            onActivate={onSlotClick ? () => onSlotClick(index, item) : undefined}
            top={isOffhand ? offhandY : top + index * 18}
            type="normal"
          />
        );
      })}
    </>
  );
}
