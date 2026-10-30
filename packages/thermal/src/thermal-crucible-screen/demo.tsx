import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalCrucibleScreen } from "./index";

/**
 * ThermalCrucibleScreen 预览用例：熔解炉（crucible）。
 */
export function ThermalCrucibleScreenDemo() {
  return (
    <ThermalCrucibleScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2700, capacity: 4000, tint: "#c86414" }}
      input={{ count: 7, icon: "iron-ore", tooltip: "熔解炉输入" }}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
      speed={0.7}
    />
  );
}
