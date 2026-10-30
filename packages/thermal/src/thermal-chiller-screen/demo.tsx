import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalChillerScreen } from "./index";

/**
 * ThermalChillerScreen 预览用例：冷冻机（chiller）。
 */
export function ThermalChillerScreenDemo() {
  return (
    <ThermalChillerScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2700, capacity: 4000, tint: "#3c64c8" }}
      input={{ count: 10, icon: "diamond", tooltip: "冷冻机输入" }}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.35}
      speed={0.6}
    />
  );
}
