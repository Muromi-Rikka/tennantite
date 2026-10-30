import { IeAlloySmelterScreen } from "./index";

/**
 * IeAlloySmelterScreen 预览用例：铁+镍熔合成镍铁合金，进度 58%。
 */
export function IeAlloySmelterScreenDemo() {
  return (
    <IeAlloySmelterScreen
      burn={0.5}
      fuel={{ count: 8, icon: "charcoal", tooltip: "煤炭" }}
      inputs={[{ count: 4, icon: "iron-ingot", tooltip: "铁锭" }, { count: 4, icon: "iron-ingot", tooltip: "镍锭" }]}
      onSlotClick={() => {}}
      output={{ count: 6, icon: "iron-ingot", tooltip: "镍铁合金锭" }}
      process={0.58}
    />
  );
}
