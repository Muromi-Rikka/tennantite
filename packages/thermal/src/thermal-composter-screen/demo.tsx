import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalComposterScreen } from "./index";

/**
 * ThermalComposterScreen 预览用例：堆肥机（composter）。
 */
export function ThermalComposterScreenDemo() {
  return (
    <ThermalComposterScreen
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
    />
  );
}
