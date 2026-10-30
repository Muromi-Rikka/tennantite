import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalRefineryScreen } from "./index";

/**
 * ThermalRefineryScreen 预览用例：精炼机（refinery）。
 */
export function ThermalRefineryScreenDemo() {
  return (
    <ThermalRefineryScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 3300, capacity: 4000, tint: "#3c64c8" }}
      fluids={[
        { amount: 1600, capacity: 4000, tint: "#c8a014" },
        { amount: 1600, capacity: 4000, tint: "#c8a014" },
      ]}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
      speed={0.6}
    />
  );
}
