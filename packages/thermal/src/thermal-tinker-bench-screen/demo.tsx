import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalTinkerBenchScreen } from "./index";

/**
 * ThermalTinkerBenchScreen 预览用例：强化工作台（tinker_bench）。
 */
export function ThermalTinkerBenchScreenDemo() {
  return (
    <ThermalTinkerBenchScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2700, capacity: 4000, tint: "#3c64c8" }}
      input={{ count: 12, icon: "diamond", tooltip: "强化工作台输入" }}
      inputs={[
        { count: 12, icon: "charcoal", tooltip: "强化工作台槽位 2" },
        { count: 9, icon: "blaze-powder", tooltip: "强化工作台槽位 3" },
        { count: 16, icon: "lapis-lazuli", tooltip: "强化工作台槽位 4" },
        { count: 15, icon: "gunpowder", tooltip: "强化工作台槽位 5" },
        { count: 14, icon: "diamond", tooltip: "强化工作台槽位 6" },
        { count: 14, icon: "diamond", tooltip: "强化工作台槽位 7" },
        { count: 16, icon: "lapis-lazuli", tooltip: "强化工作台槽位 8" },
        { count: 15, icon: "gunpowder", tooltip: "强化工作台槽位 9" },
        { count: 10, icon: "blaze-powder", tooltip: "强化工作台槽位 10" },
        { count: 15, icon: "diamond", tooltip: "强化工作台槽位 11" },
      ]}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
