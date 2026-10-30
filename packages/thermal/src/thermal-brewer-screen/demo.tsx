import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalBrewerScreen } from "./index";

/**
 * ThermalBrewerScreen 预览用例：酿造机以流体 + 配料工作，不产出物品。
 */
export function ThermalBrewerScreenDemo() {
  return (
    <ThermalBrewerScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 3000, capacity: 4000, tint: "#3c64c8" }}
      fluids={[
        { amount: 1600, capacity: 4000, tint: "#7a3ce0" },
      ]}
      input={{ count: 1, icon: "nether-wart", tooltip: "地狱疣" }}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.6}
      speed={0.5}
    />
  );
}
