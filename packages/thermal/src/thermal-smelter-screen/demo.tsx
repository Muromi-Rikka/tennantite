import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalSmelterScreen } from "./index";

/**
 * ThermalSmelterScreen 预览用例：感应冶炼炉（smelter）。
 */
export function ThermalSmelterScreenDemo() {
  return (
    <ThermalSmelterScreen
      energy={{ amount: 240000, capacity: 400000 }}
      input={{ count: 9, icon: "iron-ore", tooltip: "感应冶炼炉输入" }}
      inputs={[
        { count: 11, icon: "iron-ore", tooltip: "感应冶炼炉槽位 2" },
        { count: 11, icon: "iron-ore", tooltip: "感应冶炼炉槽位 3" },
        { count: 12, icon: "charcoal", tooltip: "感应冶炼炉槽位 4" },
      ]}
      onSlotClick={() => {}}
      output={{ count: 16, icon: "iron-ingot", tooltip: "感应冶炼炉产物" }}
      outputs={[
        { count: 9, icon: "gold-ingot", tooltip: "感应冶炼炉产物 2" },
        { count: 14, icon: "diamond", tooltip: "感应冶炼炉产物 3" },
        { count: 9, icon: "netherite-ingot", tooltip: "感应冶炼炉产物 4" },
      ]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.65}
      speed={0.8}
    />
  );
}
