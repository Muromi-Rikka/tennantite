import { IeFluidProducerScreen } from "./index";

/**
 * IeFluidProducerScreen 预览用例：网格满料，罐 40%，能量 55%。
 */
export function IeFluidProducerScreenDemo() {
  return (
    <IeFluidProducerScreen
      cell={{ icon: "potion", tooltip: "流体单元" }}
      energy={{ max: 32000, value: 17600 }}
      grid={Array.from({ length: 9 }, (_, i) => i < 6 ? { count: 16, icon: "iron-ore", tooltip: "含液矿石" } : null)}
      input={{ icon: "potion", tooltip: "空桶" }}
      onSlotClick={() => {}}
      output={{ icon: "potion", tooltip: "流体桶" }}
      tank={{ max: 8000, tint: "#3a5cc8", value: 3200 }}
    />
  );
}
