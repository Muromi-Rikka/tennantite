import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalRockGenScreen } from "./index";

/**
 * ThermalRockGenScreen 预览用例：岩石生成器（rock_gen），无物品配方。
 */
export function ThermalRockGenScreenDemo() {
  return (
    <ThermalRockGenScreen
      input={undefined}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
    />
  );
}
