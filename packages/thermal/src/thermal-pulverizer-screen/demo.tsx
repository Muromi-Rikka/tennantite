import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalPulverizerScreen } from "./index";

/**
 * ThermalPulverizerScreen 预览用例：铁矿石 → 2 铁粉（粉碎机 pulverizer）。
 */
export function ThermalPulverizerScreenDemo() {
  return (
    <ThermalPulverizerScreen
      energy={{ amount: 240000, capacity: 400000 }}
      input={{ count: 1, icon: "iron-ore", tooltip: "铁矿石" }}
      inputs={[null]}
      onSlotClick={() => {}}
      output={{ count: 2, icon: "iron-ingot", tooltip: "铁粉 ×2" }}
      outputs={[null, null, null]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
      speed={0.75}
    />
  );
}
