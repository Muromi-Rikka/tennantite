import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalPulverizerScreen } from "./index";

/**
 * ThermalPulverizerScreen 预览用例：粉碎机（pulverizer）。
 */
export function ThermalPulverizerScreenDemo() {
  return (
    <ThermalPulverizerScreen
      energy={{ amount: 240000, capacity: 400000 }}
      input={{ count: 11, icon: "gunpowder", tooltip: "粉碎机输入" }}
      inputs={[
        { count: 9, icon: "iron-ore", tooltip: "粉碎机槽位 2" },
      ]}
      onSlotClick={() => {}}
      output={{ count: 6, icon: "stone-block", tooltip: "粉碎机产物" }}
      outputs={[
        { count: 7, icon: "gold-ingot", tooltip: "粉碎机产物 2" },
        { count: 16, icon: "iron-ingot", tooltip: "粉碎机产物 3" },
        { count: 14, icon: "lapis-lazuli", tooltip: "粉碎机产物 4" },
      ]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
      speed={0.75}
    />
  );
}
