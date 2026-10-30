import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalChillerScreen } from "./index";

/**
 * ThermalChillerScreen 预览用例：1000mB 水 → 冰（冷冻机 chiller）。
 */
export function ThermalChillerScreenDemo() {
  return (
    <ThermalChillerScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 1000, capacity: 4000, tint: "#3c64c8" }}
      input={undefined}
      onSlotClick={() => {}}
      output={{ count: 1, icon: "ice", tooltip: "冰" }}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.35}
      speed={0.6}
    />
  );
}
