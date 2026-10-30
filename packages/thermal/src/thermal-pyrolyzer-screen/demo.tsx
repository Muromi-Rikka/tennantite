import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalPyrolyzerScreen } from "./index";

/**
 * ThermalPyrolyzerScreen 预览用例：煤炭 → 焦炭 + 250mB 杂酚油（热解炉）。
 */
export function ThermalPyrolyzerScreenDemo() {
  return (
    <ThermalPyrolyzerScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 250, capacity: 4000, tint: "#6e5530" }}
      input={{ count: 1, icon: "coal", tooltip: "煤炭" }}
      onSlotClick={() => {}}
      output={{ count: 1, icon: "charcoal", tooltip: "焦炭" }}
      outputs={[null, null]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
      speed={0.7}
    />
  );
}
