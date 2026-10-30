import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalBottlerScreen } from "./index";

/**
 * ThermalBottlerScreen 预览用例：玻璃瓶 + 250mB 水 → 水瓶（灌装机 bottler）。
 */
export function ThermalBottlerScreenDemo() {
  return (
    <ThermalBottlerScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 250, capacity: 4000, tint: "#3c64c8" }}
      input={{ count: 1, icon: "glass-bottle", tooltip: "玻璃瓶" }}
      onSlotClick={() => {}}
      output={{ count: 1, icon: "potion", tooltip: "水瓶" }}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.45}
      speed={0.7}
    />
  );
}
