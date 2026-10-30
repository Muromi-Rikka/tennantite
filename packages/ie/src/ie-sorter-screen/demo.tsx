import type { IeSorterSideMask } from "./index";
import { IeSorterScreen } from "./index";

/**
 * IeSorterScreen 预览用例：6 面过滤位掩码与若干过滤物品。
 */
const MASKS: Array<IeSorterSideMask> = [
  { components: true, damage: false, tags: false },
  { components: false, damage: true, tags: false },
  { components: true, damage: true, tags: false },
  { components: false, damage: false, tags: true },
  { components: true, damage: false, tags: true },
  { components: false, damage: true, tags: true },
];

export function IeSorterScreenDemo() {
  return (
    <IeSorterScreen
      filters={Array.from({ length: 54 }, (_, i) => i % 3 === 0 ? { count: 1, icon: "iron-ingot", tooltip: "过滤物品" } : null)}
      masks={MASKS}
      onMaskClick={() => {}}
      onSlotClick={() => {}}
    />
  );
}
