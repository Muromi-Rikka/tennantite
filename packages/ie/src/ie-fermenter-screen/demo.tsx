import { IeFermenterScreen } from "./index";

/**
 * IeFermenterScreen 预览用例：甘蔗发酵 55%，罐 3200 / 8000，能量 12000 / 32000。
 */
export function IeFermenterScreenDemo() {
  return (
    <IeFermenterScreen
      bucketOutput={{ icon: "potion", tooltip: "工业酒精桶" }}
      energy={{ max: 32000, value: 12000 }}
      fluidContainer={{ icon: "potion", tooltip: "空桶" }}
      inputs={Array.from({ length: 8 }, (_, i) => i < 3 ? { count: 16, icon: "charcoal", tooltip: "甘蔗" } : null)}
      onSlotClick={() => {}}
      output={{ count: 4, icon: "iron-ore", tooltip: "生物质" }}
      tank={{ max: 8000, tint: "#7a8f3a", value: 3200 }}
    />
  );
}
