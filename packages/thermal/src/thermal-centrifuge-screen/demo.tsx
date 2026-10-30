import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalCentrifugeScreen } from "./index";

/**
 * ThermalCentrifugeScreen 预览用例：离心机（centrifuge）。
 */
export function ThermalCentrifugeScreenDemo() {
  return (
    <ThermalCentrifugeScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2700, capacity: 4000, tint: "#7a3ce0" }}
      input={{ count: 5, icon: "blaze-powder", tooltip: "离心机输入" }}
      onSlotClick={() => {}}
      output={{ count: 11, icon: "gunpowder", tooltip: "离心机产物" }}
      outputs={[
        { count: 12, icon: "diamond", tooltip: "离心机产物 2" },
        { count: 14, icon: "lapis-lazuli", tooltip: "离心机产物 3" },
        { count: 7, icon: "gold-ingot", tooltip: "离心机产物 4" },
      ]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.55}
      speed={0.7}
    />
  );
}
