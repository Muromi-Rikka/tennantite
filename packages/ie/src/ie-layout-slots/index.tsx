import type { ScreenSlot } from "@tennantite/ui";

import { ScreenItemSlot } from "@tennantite/ui";

export interface IeLayoutSlotsProps {
  /**
   * 槽位 label → 注入物品（缺项按空槽渲染）
   */
  items: Record<string, null | ScreenSlot | undefined>;
  /**
   * 槽位点击回调，透传槽位 label
   */
  onSlotClick?: (label: string) => void;
  /**
   * `ieExpandSlots` 展开后的逐槽坐标表
   */
  slots: ReadonlyArray<{ label: string; left: number; top: number }>;
}

/**
 * IE 布局表槽位组：按 `ieExpandSlots` 的逐槽坐标渲染 `ScreenItemSlot` 网格。
 */
export function IeLayoutSlots({ items, onSlotClick, slots }: IeLayoutSlotsProps) {
  return (
    <>
      {slots.map(slot => (
        <ScreenItemSlot
          item={items[slot.label]}
          key={slot.label}
          label={slot.label}
          left={slot.left}
          onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
          top={slot.top}
        />
      ))}
    </>
  );
}
