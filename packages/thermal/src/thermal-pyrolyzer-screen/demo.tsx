import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalPyrolyzerScreen } from "./index";

/**
 * ThermalPyrolyzerScreen 预览用例：热解炉（pyrolyzer）。
 */
export function ThermalPyrolyzerScreenDemo() {
  return (
    <ThermalPyrolyzerScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2700, capacity: 4000, tint: "#c86414" }}
      input={{ count: 13, icon: "oak-planks", tooltip: "热解炉输入" }}
      onSlotClick={() => {}}
      output={{ count: 8, icon: "charcoal", tooltip: "热解炉产物" }}
      outputs={[
        { count: 10, icon: "charcoal", tooltip: "热解炉产物 2" },
        { count: 12, icon: "diamond", tooltip: "热解炉产物 3" },
        { count: 8, icon: "stone-block", tooltip: "热解炉产物 4" },
      ]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
      speed={0.7}
    />
  );
}
