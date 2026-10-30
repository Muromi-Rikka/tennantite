import { IeAlloySmelterScreen } from "./index";

/**
 * IeAlloySmelterScreen 预览用例：铜 + 镍 → 2 康铜锭，进度 58%。
 */
export function IeAlloySmelterScreenDemo() {
  return (
    <IeAlloySmelterScreen
      burn={0.5}
      fuel={{ count: 1, icon: "charcoal", tooltip: "煤炭" }}
      inputs={[{ count: 1, icon: "copper-ingot", tooltip: "铜锭" }, { count: 1, icon: "iron-ingot", tooltip: "镍锭" }]}
      onSlotClick={() => {}}
      output={{ count: 2, icon: "iron-ingot", tooltip: "康铜锭 ×2" }}
      process={0.58}
    />
  );
}
