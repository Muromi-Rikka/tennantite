import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalInsolatorScreen } from "./index";

/**
 * ThermalInsolatorScreen 预览用例：小麦种子 → 2 小麦（光合增幅机 insolator）。
 */
export function ThermalInsolatorScreenDemo() {
  return (
    <ThermalInsolatorScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2700, capacity: 4000, tint: "#3c64c8" }}
      input={{ count: 1, icon: "wheat-seeds", tooltip: "小麦种子" }}
      inputs={[null]}
      onSlotClick={() => {}}
      output={{ count: 2, icon: "wheat", tooltip: "小麦 ×2" }}
      outputs={[null, null]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
      speed={0.8}
    />
  );
}
