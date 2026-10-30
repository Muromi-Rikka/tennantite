import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalChargeBenchScreen } from "./index";

/**
 * ThermalChargeBenchScreen 预览用例：充能台（charge_bench）。
 */
export function ThermalChargeBenchScreenDemo() {
  return (
    <ThermalChargeBenchScreen
      energy={{ amount: 240000, capacity: 400000 }}
      input={{ count: 5, icon: "iron-chestplate", tooltip: "充能台输入" }}
      inputs={[
        { count: 7, icon: "sword", tooltip: "充能台槽位 2" },
        { count: 7, icon: "sword", tooltip: "充能台槽位 3" },
        null,
        { count: 7, icon: "iron-chestplate", tooltip: "充能台槽位 5" },
        null,
        null,
        null,
        null,
        { count: 13, icon: "diamond", tooltip: "充能台槽位 10" },
        null,
      ]}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
