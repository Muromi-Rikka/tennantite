import { IeBlastFurnaceScreen } from "./index";

/**
 * IeBlastFurnaceScreen 预览用例：铁矿冶炼 42%，燃烧 78%。
 */
export function IeBlastFurnaceScreenDemo() {
  return (
    <IeBlastFurnaceScreen
      burn={0.78}
      fuel={{ count: 6, icon: "charcoal", tooltip: "煤炭饼" }}
      input={{ count: 9, icon: "iron-ore", tooltip: "铁矿石" }}
      onSlotClick={() => {}}
      outputs={[{ count: 4, icon: "iron-ingot", tooltip: "钢锭" }, { count: 2, icon: "iron-ore", tooltip: "矿渣" }]}
      process={0.42}
    />
  );
}
