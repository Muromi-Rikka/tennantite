import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalSoilInfuserScreen } from "./index";

/**
 * ThermalSoilInfuserScreen 预览用例：土壤培肥机（soil_infuser）。
 */
export function ThermalSoilInfuserScreenDemo() {
  return (
    <ThermalSoilInfuserScreen
      energy={{ amount: 240000, capacity: 400000 }}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      speed={0.45}
    />
  );
}
