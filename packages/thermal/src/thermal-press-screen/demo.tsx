import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalPressScreen } from "./index";

/**
 * ThermalPressScreen 预览用例：压缩机（press）。
 */
export function ThermalPressScreenDemo() {
  return (
    <ThermalPressScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2700, capacity: 4000, tint: "#c8a014" }}
      input={{ count: 14, icon: "iron-ingot", tooltip: "压缩机输入" }}
      inputs={[
        { count: 10, icon: "charcoal", tooltip: "压缩机槽位 2" },
      ]}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.6}
      speed={0.75}
    />
  );
}
