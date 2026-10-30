import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalRefineryScreen } from "./index";

/**
 * ThermalRefineryScreen 预览用例：树脂 → 树脂油；双流体输入由 GUI 罐位表达，
 * demo 只展示一个罐。
 */
export function ThermalRefineryScreenDemo() {
  return (
    <ThermalRefineryScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 200, capacity: 4000, tint: "#8a7a2e" }}
      fluids={[
        { amount: 1600, capacity: 4000, tint: "#c8a014" },
        { amount: 1600, capacity: 4000, tint: "#c8a014" },
      ]}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
      speed={0.6}
    />
  );
}
