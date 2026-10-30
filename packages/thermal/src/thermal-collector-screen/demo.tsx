import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalCollectorScreen } from "./index";

/**
 * ThermalCollectorScreen 预览用例：收集器（collector）。
 */
export function ThermalCollectorScreenDemo() {
  return (
    <ThermalCollectorScreen
      onSlotClick={() => {}}
      output={{ count: 6, icon: "stone-block", tooltip: "收集器产物" }}
      outputs={[
        { count: 9, icon: "iron-ore", tooltip: "收集器产物 2" },
        { count: 10, icon: "charcoal", tooltip: "收集器产物 3" },
        { count: 12, icon: "diamond", tooltip: "收集器产物 4" },
        { count: 14, icon: "lapis-lazuli", tooltip: "收集器产物 5" },
        { count: 7, icon: "gold-ingot", tooltip: "收集器产物 6" },
        { count: 7, icon: "grass-block", tooltip: "收集器产物 7" },
        { count: 11, icon: "wheat", tooltip: "收集器产物 8" },
        { count: 15, icon: "oak-planks", tooltip: "收集器产物 9" },
        { count: 17, icon: "iron-ingot", tooltip: "收集器产物 10" },
        { count: 14, icon: "gunpowder", tooltip: "收集器产物 11" },
        { count: 8, icon: "dirt-block", tooltip: "收集器产物 12" },
        { count: 8, icon: "blaze-powder", tooltip: "收集器产物 13" },
        { count: 8, icon: "nether-wart", tooltip: "收集器产物 14" },
        { count: 18, icon: "emerald", tooltip: "收集器产物 15" },
      ]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
