import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalNullifierScreen } from "./index";

/**
 * ThermalNullifierScreen 预览用例：销毁器（nullifier），无配方。
 */
export function ThermalNullifierScreenDemo() {
  return (
    <ThermalNullifierScreen
      input={undefined}
      inputs={[]}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
