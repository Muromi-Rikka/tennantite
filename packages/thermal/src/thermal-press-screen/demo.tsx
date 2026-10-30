import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalPressScreen } from "./index";

/**
 * ThermalPressScreen 预览用例：铁锭 → 铁板（压缩机 press）。
 */
export function ThermalPressScreenDemo() {
  return (
    <ThermalPressScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2700, capacity: 4000, tint: "#c8a014" }}
      input={{ count: 1, icon: "iron-ingot", tooltip: "铁锭" }}
      inputs={[null]}
      onSlotClick={() => {}}
      output={{ count: 1, icon: "iron-ingot", tooltip: "铁板" }}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.6}
      speed={0.75}
    />
  );
}
