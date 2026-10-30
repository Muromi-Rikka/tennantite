import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalCrucibleScreen } from "./index";

/**
 * ThermalCrucibleScreen 预览用例：圆石 → 1000mB 熔岩（熔解炉 crucible）。
 */
export function ThermalCrucibleScreenDemo() {
  return (
    <ThermalCrucibleScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 1000, capacity: 4000, tint: "#e25822" }}
      input={{ count: 1, icon: "stone-block", tooltip: "圆石" }}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
      speed={0.7}
    />
  );
}
