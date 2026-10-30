import { IeSqueezerScreen } from "./index";

/**
 * IeSqueezerScreen 预览用例：小麦压榨 30%，罐 4000 / 8000，能量 28000 / 32000。
 */
export function IeSqueezerScreenDemo() {
  return (
    <IeSqueezerScreen
      bucketOutput={{ icon: "potion", tooltip: "植物油桶" }}
      energy={{ max: 32000, value: 28000 }}
      fluidContainer={{ icon: "potion", tooltip: "空桶" }}
      inputs={Array.from({ length: 8 }, (_, i) => i < 5 ? { count: 24, icon: "charcoal", tooltip: "小麦" } : null)}
      onSlotClick={() => {}}
      output={{ count: 6, icon: "iron-ore", tooltip: "压榨残渣" }}
      tank={{ max: 8000, tint: "#c8b23c", value: 4000 }}
    />
  );
}
