import { THERMAL_DEMO_PLAYER_HOTBAR, THERMAL_DEMO_PLAYER_MAIN } from "../thermal-demo-data";
import { ThermalEnergyCellScreen } from "./index";

/**
 * ThermalEnergyCellScreen 预览用例：3.2M / 5M 能量，速率 80 / 160。
 */
export function ThermalEnergyCellScreenDemo() {
  return (
    <ThermalEnergyCellScreen
      amount={3200000}
      capacity={5000000}
      inputRate={80}
      maxInput={160}
      maxOutput={320}
      onInputChange={() => {}}
      onOutputChange={() => {}}
      outputRate={160}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
