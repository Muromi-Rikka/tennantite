import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalSawmillScreen } from "./index";

/**
 * ThermalSawmillScreen 预览用例：锯木机（sawmill）。
 */
export function ThermalSawmillScreenDemo() {
  return (
    <ThermalSawmillScreen
      energy={{ amount: 240000, capacity: 400000 }}
      input={{ count: 13, icon: "oak-planks", tooltip: "锯木机输入" }}
      onSlotClick={() => {}}
      output={{ count: 13, icon: "oak-planks", tooltip: "锯木机产物" }}
      outputs={[
        { count: 10, icon: "charcoal", tooltip: "锯木机产物 2" },
        { count: 8, icon: "stone-block", tooltip: "锯木机产物 3" },
        { count: 12, icon: "diamond", tooltip: "锯木机产物 4" },
      ]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.4}
      speed={0.6}
    />
  );
}
