import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalCrystallizerScreen } from "./index";

/**
 * ThermalCrystallizerScreen 预览用例：结晶机（crystallizer）。
 */
export function ThermalCrystallizerScreenDemo() {
  return (
    <ThermalCrystallizerScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2700, capacity: 4000, tint: "#3c64c8" }}
      input={{ count: 10, icon: "diamond", tooltip: "结晶机输入" }}
      inputs={[
        { count: 14, icon: "lapis-lazuli", tooltip: "结晶机槽位 2" },
      ]}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.7}
      speed={0.6}
    />
  );
}
