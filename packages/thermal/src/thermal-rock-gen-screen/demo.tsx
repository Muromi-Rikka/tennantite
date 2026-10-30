import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalRockGenScreen } from "./index";

/**
 * ThermalRockGenScreen 预览用例：岩石生成器（rock_gen）。
 */
export function ThermalRockGenScreenDemo() {
  return (
    <ThermalRockGenScreen
      input={{ count: 8, icon: "stone-block", tooltip: "岩石生成器输入" }}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
    />
  );
}
