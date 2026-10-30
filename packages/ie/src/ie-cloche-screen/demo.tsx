import { IeClocheScreen } from "./index";

/**
 * IeClocheScreen 预览用例：小麦生长 45%，水罐 6000 / 10000，肥料充足。
 */
export function IeClocheScreenDemo() {
  return (
    <IeClocheScreen
      energy={{ max: 32000, value: 24000 }}
      fertilizer={{ amount: 8000, max: 10000 }}
      fertilizerSlot={{ count: 10, icon: "iron-ore", tooltip: "骨粉" }}
      onSlotClick={() => {}}
      outputs={[
        { count: 8, icon: "charcoal", tooltip: "小麦" },
        { count: 3, icon: "charcoal", tooltip: "种子" },
        null,
        null,
      ]}
      process={0.45}
      seed={{ count: 2, icon: "charcoal", tooltip: "小麦种子" }}
      soil={{ icon: "iron-ore", tooltip: "耕地" }}
      tank={{ max: 10000, tint: "#3a5cc8", value: 6000 }}
    />
  );
}
