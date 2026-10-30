import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalPotionDiffuserScreen } from "./index";

/**
 * ThermalPotionDiffuserScreen 预览用例：药水扩散器（potion_diffuser）。
 */
export function ThermalPotionDiffuserScreenDemo() {
  return (
    <ThermalPotionDiffuserScreen
      fluid={{ amount: 2700, capacity: 4000, tint: "#7a3ce0" }}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      speed={0.5}
    />
  );
}
