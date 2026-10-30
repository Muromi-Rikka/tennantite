import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalFluidCacheScreen } from "./index";

/**
 * ThermalFluidCacheScreen 预览用例：流体缓存仓 60% 液位。
 */
export function ThermalFluidCacheScreenDemo() {
  return (
    <ThermalFluidCacheScreen
      amount={24000}
      capacity={40000}
      inputRate={40}
      maxInput={160}
      maxOutput={320}
      onInputChange={() => {}}
      onOutputChange={() => {}}
      outputRate={80}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      tint="#3c64c8"
    />
  );
}
