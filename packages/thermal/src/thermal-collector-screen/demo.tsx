import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalCollectorScreen } from "./index";

/**
 * ThermalCollectorScreen 预览用例：收集器按环境收集物品，无固定配方。
 */
export function ThermalCollectorScreenDemo() {
  return (
    <ThermalCollectorScreen
      onSlotClick={() => {}}
      output={undefined}
      outputs={[]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
