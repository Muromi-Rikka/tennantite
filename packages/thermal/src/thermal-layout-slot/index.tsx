import type { ScreenSlot } from "@tennantite/ui";
import { ScreenItemSlot } from "@tennantite/ui";

export interface ThermalLayoutSlotProps {
  item?: ScreenSlot;
  label: string;
  left: number;
  onSlotClick?: (role: string, item: ScreenSlot) => void;
  size?: number;
  top: number;
}

/**
 * Thermal 布局槽位：按角色标签注入物品并转发点击。
 */
export function ThermalLayoutSlot({
  item,
  label,
  left,
  onSlotClick,
  size,
  top,
}: ThermalLayoutSlotProps) {
  return (
    <ScreenItemSlot
      item={item}
      label={label}
      left={left}
      onActivate={onSlotClick && item ? () => onSlotClick(label, item) : undefined}
      size={size}
      top={top}
    />
  );
}
