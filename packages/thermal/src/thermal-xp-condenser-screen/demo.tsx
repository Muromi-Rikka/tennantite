import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalXpCondenserScreen } from "./index";

/**
 * ThermalXpCondenserScreen 预览用例：经验冷凝器（xp_condenser）。
 */
export function ThermalXpCondenserScreenDemo() {
  return (
    <ThermalXpCondenserScreen
      fluid={{ amount: 2700, capacity: 4000, tint: "#7ac83c" }}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
