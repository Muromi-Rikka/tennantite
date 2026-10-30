import { IE_DEMO_GRAPHITE, IE_DEMO_SLAG } from "../ie-demo-data";
import { IeArcFurnaceScreen } from "./index";

/**
 * IeArcFurnaceScreen 预览用例：铁矿石 → 2 铁锭 + 矿渣；12 输入 + 1 添加剂 + 3 输出 + 3 电极。
 */
export function IeArcFurnaceScreenDemo() {
  const ore = { count: 1, icon: "iron-ore" as const, tooltip: "铁矿石" };
  return (
    <IeArcFurnaceScreen
      additives={[null]}
      electrodes={[IE_DEMO_GRAPHITE, IE_DEMO_GRAPHITE, IE_DEMO_GRAPHITE]}
      energy={{ max: 100000, value: 62000 }}
      inputs={[ore, ...Array.from({ length: 11 }, () => null)]}
      onDistribute={() => {}}
      onSlotClick={() => {}}
      outputs={[{ count: 2, icon: "iron-ingot", tooltip: "铁锭 ×2" }, null, null]}
      progresses={[0.9, 0, 0]}
      slagOutput={IE_DEMO_SLAG}
    />
  );
}
