import { THERMAL_DEMO_PLAYER_HOTBAR, THERMAL_DEMO_PLAYER_MAIN, THERMAL_DEMO_SMOOTH_STONE } from "../thermal-demo-data";
import { ThermalCacheScreen } from "./index";

/**
 * ThermalCacheScreen 预览用例：640 / 20000 容量，存入 4 / 取出 16。
 */
export function ThermalCacheScreenDemo() {
  return (
    <ThermalCacheScreen
      amount={640}
      capacity={20000}
      inputRate={4}
      item={THERMAL_DEMO_SMOOTH_STONE}
      maxInput={32}
      maxOutput={64}
      onInputChange={() => {}}
      onOutputChange={() => {}}
      outputRate={16}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
