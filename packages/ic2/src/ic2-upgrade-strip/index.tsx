import type { ScreenSlot } from "@tennantite/ui";
import { padSlots, ScreenItemSlot } from "@tennantite/ui";

import { IC2_MACHINE } from "../ic2-layout";

export interface Ic2UpgradeStripProps {
  /**
  * 逐槽点击回调（索引即槽位号）
  */
  onSlotClick?: (index: number, item: ScreenSlot) => void;
  /**
  * 升级槽原点与步进（默认 IC2_MACHINE.slots.upgrades）
  */
  position?: { left: number; top: number };
  /**
  * 升级槽（最多 4，不足补 null）
  */
  upgrades?: ScreenSlot[];
}

/**
 * IC2 右侧升级槽条（4 个 18×18 槽位纵向排列），槽框与 `machine-upgrade-*` 语义固定。
 */
export function Ic2UpgradeStrip({ onSlotClick, position, upgrades = [] }: Ic2UpgradeStripProps) {
  const { count, left, step, top } = IC2_MACHINE.slots.upgrades;
  const originLeft = position?.left ?? left;
  const originTop = position?.top ?? top;
  return padSlots(upgrades, count).map((slot, index) => (
    // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 位置固定槽位网格，index 即稳定身份
    <ScreenItemSlot
      frame
      frameClassName="mc-tex-ic2-slot"
      item={slot}
      // eslint-disable-next-line react/no-array-index-key -- 固定位置的升级槽，索引即槽位号
      key={`machine-upgrade-${index}`}
      label={`machine-upgrade-${index}`}
      left={originLeft}
      onActivate={onSlotClick ? () => onSlotClick(index, slot) : undefined}
      top={originTop + index * step}
    />
  ));
}
