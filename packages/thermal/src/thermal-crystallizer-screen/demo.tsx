import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalCrystallizerScreen } from "./index";

/**
 * ThermalCrystallizerScreen 预览用例：钻石粉 + 2000mB 水 → 钻石（结晶机）。
 */
export function ThermalCrystallizerScreenDemo() {
  return (
    <ThermalCrystallizerScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2000, capacity: 4000, tint: "#3c64c8" }}
      input={{ count: 1, icon: "diamond", tooltip: "钻石粉" }}
      inputs={[null]}
      onSlotClick={() => {}}
      output={{ count: 1, icon: "diamond", tooltip: "钻石" }}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.7}
      speed={0.6}
    />
  );
}
