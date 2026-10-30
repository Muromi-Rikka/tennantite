import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalNullifierScreen } from "./index";

/**
 * ThermalNullifierScreen 预览用例：销毁器（nullifier）。
 */
export function ThermalNullifierScreenDemo() {
  return (
    <ThermalNullifierScreen
      input={{ count: 5, icon: "dirt-block", tooltip: "销毁器输入" }}
      inputs={[
        { count: 10, icon: "charcoal", tooltip: "销毁器槽位 2" },
        { count: 13, icon: "gunpowder", tooltip: "销毁器槽位 3" },
        { count: 11, icon: "wheat", tooltip: "销毁器槽位 4" },
        { count: 9, icon: "iron-ore", tooltip: "销毁器槽位 5" },
        null,
        { count: 15, icon: "oak-planks", tooltip: "销毁器槽位 7" },
        null,
        null,
      ]}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
