import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalTinkerBenchScreen } from "./index";

/**
 * ThermalTinkerBenchScreen 预览用例：铁胸甲安装「处理速度」强化。
 */
export function ThermalTinkerBenchScreenDemo() {
  return (
    <ThermalTinkerBenchScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2700, capacity: 4000, tint: "#3c64c8" }}
      input={{ count: 1, icon: "iron-chestplate", tooltip: "铁胸甲" }}
      inputs={[
        { count: 1, icon: "gunpowder", tooltip: "强化：处理速度" },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ]}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
