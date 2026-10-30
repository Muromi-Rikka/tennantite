import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalSmelterScreen } from "./index";

/**
 * ThermalSmelterScreen 预览用例：铁矿石 → 1 铁锭（感应冶炼炉 smelter）。
 */
export function ThermalSmelterScreenDemo() {
  return (
    <ThermalSmelterScreen
      energy={{ amount: 240000, capacity: 400000 }}
      input={{ count: 1, icon: "iron-ore", tooltip: "铁矿石" }}
      inputs={[null, null, null]}
      onSlotClick={() => {}}
      output={{ count: 1, icon: "iron-ingot", tooltip: "铁锭" }}
      outputs={[null, null, null]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.65}
      speed={0.8}
    />
  );
}
