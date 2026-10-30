import { IeRefineryScreen } from "./index";

/**
 * IeRefineryScreen 预览用例：8mB 植物油 + 8mB 乙醇 → 16mB 生物柴油（罐体数值按 1000× 放大只为可见）。
 */
export function IeRefineryScreenDemo() {
  return (
    <IeRefineryScreen
      bucketOutput={{ count: 1, icon: "potion", tooltip: "生物柴油桶" }}
      catalyst={{ count: 1, icon: "gunpowder", tooltip: "硝酸盐粉" }}
      energy={{ max: 32000, value: 8000 }}
      fluidContainer={{ icon: "potion", tooltip: "空桶" }}
      onSlotClick={() => {}}
      tanks={[
        { max: 12000, tint: "#c8a014", value: 8000 },
        { max: 12000, tint: "#d8d8d8", value: 8000 },
        { max: 12000, tint: "#8a7a2e", value: 16000 },
      ]}
    />
  );
}
