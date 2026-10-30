import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalWaterGenScreen } from "./index";

/**
 * ThermalWaterGenScreen 预览用例：集水器（water_gen）。
 */
export function ThermalWaterGenScreenDemo() {
  return (
    <ThermalWaterGenScreen
      fluid={{ amount: 2700, capacity: 4000, tint: "#3c64c8" }}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
