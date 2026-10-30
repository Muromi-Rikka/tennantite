import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalCentrifugeScreen } from "./index";

/**
 * ThermalCentrifugeScreen 预览用例：蜜脾 → 100mB 蜂蜜（离心机 centrifuge）。
 */
export function ThermalCentrifugeScreenDemo() {
  return (
    <ThermalCentrifugeScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 100, capacity: 4000, tint: "#f5c542" }}
      input={{ count: 1, icon: "honeycomb", tooltip: "蜜脾" }}
      onSlotClick={() => {}}
      output={undefined}
      outputs={[null, null, null]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.55}
      speed={0.7}
    />
  );
}
