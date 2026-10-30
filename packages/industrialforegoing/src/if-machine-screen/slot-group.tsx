import type { ScreenSlot } from "@tennantite/ui";
import type { IfSlotGroup } from "../if-machine-layout";

import { IfSlot } from "../if-slot/index";

export interface IfSlotGroupGridProps {
  group: IfSlotGroup;
  items?: Record<string, ScreenSlot>;
  onActivate?: (label: string) => void;
}

/**
 * 槽组网格：按 `offsets`（缺省为 cols × rows 的 18px 步距）平铺槽位，
 * 单格组直接用组名作标签。
 */
export function IfSlotGroupGrid({ group, items, onActivate }: IfSlotGroupGridProps) {
  const cells = group.offsets
    ?? Array.from({ length: group.cols * group.rows }, (_, index) => [
      (index % group.cols) * 18,
      Math.floor(index / group.cols) * 18,
    ] as const);
  const isSingle = !group.offsets && group.cols * group.rows === 1;

  return (
    <>
      {cells.map(([dx, dy], index) => {
        const label = isSingle ? group.name : `${group.name}-${index}`;
        return (
          // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 位置固定槽位网格，index 即稳定身份
          <IfSlot
            color={group.color}
            item={items?.[label]}
            key={label}
            label={label}
            left={group.x + dx}
            onActivate={onActivate ? () => { onActivate(label); } : undefined}
            top={group.y + dy}
          />
        );
      })}
    </>
  );
}
