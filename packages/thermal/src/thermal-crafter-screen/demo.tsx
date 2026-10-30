import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalCrafterScreen } from "./index";

/**
 * ThermalCrafterScreen 预览用例：组装机（crafter）。
 */
export function ThermalCrafterScreenDemo() {
  return (
    <ThermalCrafterScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2700, capacity: 4000, tint: "#3c64c8" }}
      input={{ count: 13, icon: "oak-planks", tooltip: "组装机输入" }}
      inputs={[
        { count: 15, icon: "oak-planks", tooltip: "组装机槽位 2" },
        { count: 15, icon: "oak-planks", tooltip: "组装机槽位 3" },
        null,
        null,
        null,
        { count: 10, icon: "charcoal", tooltip: "组装机槽位 7" },
        null,
        null,
      ]}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.3}
    />
  );
}
