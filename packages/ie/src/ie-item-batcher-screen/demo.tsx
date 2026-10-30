import { IeItemBatcherScreen } from "./index";

/**
 * IeItemBatcherScreen 预览用例：过滤 3 项、缓冲 2 项、ALL 模式。
 */
export function IeItemBatcherScreenDemo() {
  return (
    <IeItemBatcherScreen
      buffers={Array.from({ length: 9 }, (_, i) => i < 2 ? { count: 32, icon: "iron-ingot", tooltip: "缓冲物品" } : null)}
      colors={[true, false, true, false, false, false, false, false, false]}
      filters={Array.from({ length: 9 }, (_, i) => i < 3 ? { icon: "iron-ore", tooltip: "过滤物品" } : null)}
      onColorClick={() => {}}
      onModeToggle={() => {}}
      onSlotClick={() => {}}
      outputAll
    />
  );
}
