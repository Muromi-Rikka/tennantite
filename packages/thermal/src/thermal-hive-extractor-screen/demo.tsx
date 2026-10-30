import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalHiveExtractorScreen } from "./index";

/**
 * ThermalHiveExtractorScreen 预览用例：蜂巢采集器（hive_extractor）。
 */
export function ThermalHiveExtractorScreenDemo() {
  return (
    <ThermalHiveExtractorScreen
      fluid={{ amount: 2700, capacity: 4000, tint: "#c8a014" }}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
