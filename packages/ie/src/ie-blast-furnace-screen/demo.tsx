import { IeBlastFurnaceScreen } from "./index";

/**
 * IeBlastFurnaceScreen 预览用例：铁锭 → 钢锭 + 矿渣，42%，燃烧 78%。
 */
export function IeBlastFurnaceScreenDemo() {
  return (
    <IeBlastFurnaceScreen
      burn={0.78}
      fuel={{ count: 1, icon: "charcoal", tooltip: "焦煤" }}
      input={{ count: 1, icon: "iron-ingot", tooltip: "铁锭" }}
      onSlotClick={() => {}}
      outputs={[
        { count: 1, icon: "iron-ingot", tooltip: "钢锭" },
        { count: 1, icon: "stone-block", tooltip: "矿渣" },
      ]}
      process={0.42}
    />
  );
}
