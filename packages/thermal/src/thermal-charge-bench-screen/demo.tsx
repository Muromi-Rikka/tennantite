import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalChargeBenchScreen } from "./index";

/**
 * ThermalChargeBenchScreen 预览用例：充能台只充电，不消耗配方。
 */
export function ThermalChargeBenchScreenDemo() {
  return (
    <ThermalChargeBenchScreen
      energy={{ amount: 240000, capacity: 400000 }}
      input={{ count: 1, icon: "lapis-lazuli", tooltip: "能量电池" }}
      inputs={[null, null, null, null, null, null, null, null, null, null, null]}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
