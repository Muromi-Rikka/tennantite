import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalSawmillScreen } from "./index";

/**
 * ThermalSawmillScreen 预览用例：橡木原木 → 6 橡木木板 + 锯末（sawmill）。
 */
export function ThermalSawmillScreenDemo() {
  return (
    <ThermalSawmillScreen
      energy={{ amount: 240000, capacity: 400000 }}
      input={{ count: 1, icon: "oak-log", tooltip: "橡木原木" }}
      onSlotClick={() => {}}
      output={{ count: 6, icon: "oak-planks", tooltip: "橡木木板 ×6" }}
      outputs={[{ count: 1, icon: "charcoal", tooltip: "锯末" }]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.4}
      speed={0.6}
    />
  );
}
