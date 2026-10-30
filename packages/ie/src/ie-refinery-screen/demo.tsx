import { IeRefineryScreen } from "./index";

/**
 * IeRefineryScreen 预览用例：原油精炼 60%，能量 8000 / 32000。
 */
export function IeRefineryScreenDemo() {
  return (
    <IeRefineryScreen
      bucketOutput={{ icon: "potion", tooltip: "柴油桶" }}
      catalyst={{ icon: "charcoal", tooltip: "精炼催化剂" }}
      energy={{ max: 32000, value: 8000 }}
      fluidContainer={{ icon: "potion", tooltip: "空桶" }}
      onSlotClick={() => {}}
      tanks={[
        { max: 12000, tint: "#3d3a33", value: 6000 },
        { max: 12000, tint: "#5b4a2c", value: 9000 },
        { max: 12000, tint: "#8a7a2e", value: 2400 },
      ]}
    />
  );
}
