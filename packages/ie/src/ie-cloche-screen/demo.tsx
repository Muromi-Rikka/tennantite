import { IeClocheScreen } from "./index";

/**
 * IeClocheScreen 预览用例：小麦种子 + 泥土 → 2 小麦 + 25% 种子，生长 45%。
 */
export function IeClocheScreenDemo() {
  return (
    <IeClocheScreen
      energy={{ max: 32000, value: 24000 }}
      fertilizer={{ amount: 8000, max: 10000 }}
      fertilizerSlot={{ count: 1, icon: "bone-meal", tooltip: "骨粉" }}
      onSlotClick={() => {}}
      outputs={[
        { count: 2, icon: "wheat", tooltip: "小麦 ×2" },
        { count: 1, icon: "wheat-seeds", tooltip: "小麦种子（25%）" },
        null,
        null,
      ]}
      process={0.45}
      seed={{ count: 1, icon: "wheat-seeds", tooltip: "小麦种子" }}
      soil={{ count: 1, icon: "dirt-block", tooltip: "泥土" }}
      tank={{ max: 10000, tint: "#3a5cc8", value: 6000 }}
    />
  );
}
