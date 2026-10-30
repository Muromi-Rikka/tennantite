import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalInsolatorScreen } from "./index";

/**
 * ThermalInsolatorScreen 预览用例：光合增幅机（insolator）。
 */
export function ThermalInsolatorScreenDemo() {
  return (
    <ThermalInsolatorScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2700, capacity: 4000, tint: "#3c64c8" }}
      input={{ count: 7, icon: "grass-block", tooltip: "光合增幅机输入" }}
      inputs={[
        { count: 13, icon: "wheat", tooltip: "光合增幅机槽位 2" },
      ]}
      onSlotClick={() => {}}
      output={{ count: 11, icon: "wheat", tooltip: "光合增幅机产物" }}
      outputs={[
        { count: 9, icon: "dirt-block", tooltip: "光合增幅机产物 2" },
        { count: 13, icon: "wheat", tooltip: "光合增幅机产物 3" },
        { count: 9, icon: "grass-block", tooltip: "光合增幅机产物 4" },
      ]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
      speed={0.8}
    />
  );
}
