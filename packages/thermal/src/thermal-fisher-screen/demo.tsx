import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalFisherScreen } from "./index";

/**
 * ThermalFisherScreen 预览用例：捕鱼装置按水域产出，无固定配方。
 */
export function ThermalFisherScreenDemo() {
  return (
    <ThermalFisherScreen
      input={undefined}
      onSlotClick={() => {}}
      output={undefined}
      outputs={[]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
