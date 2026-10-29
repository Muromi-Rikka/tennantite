import { IE_DEMO_GRAPHITE, IE_DEMO_IRON_INGOT, IE_DEMO_SLAG, ieDemoTwelve } from "../ie-demo-data";
import { IeArcFurnaceScreen } from "./index";

/**
 * IeArcFurnaceScreen 预览用例：12 输入 + 1 添加剂 + 3 输出 + 3 电极。
 */
export function IeArcFurnaceScreenDemo() {
  const ore = { count: 24, icon: "iron-ore" as const, tooltip: "铁矿石" };
  return (
    <IeArcFurnaceScreen
      additives={[{ icon: "iron-ingot", tooltip: "石灰" }]}
      electrodes={[IE_DEMO_GRAPHITE, IE_DEMO_GRAPHITE, IE_DEMO_GRAPHITE]}
      energy={{ max: 100000, value: 62000 }}
      inputs={ieDemoTwelve(ore)}
      onDistribute={() => {}}
      onSlotClick={() => {}}
      outputs={[IE_DEMO_IRON_INGOT, IE_DEMO_IRON_INGOT, IE_DEMO_IRON_INGOT]}
      progresses={[0.9, 0.5, 0.2]}
      slagOutput={IE_DEMO_SLAG}
    />
  );
}
