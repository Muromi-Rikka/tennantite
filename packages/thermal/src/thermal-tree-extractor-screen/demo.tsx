import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalTreeExtractorScreen } from "./index";

/**
 * ThermalTreeExtractorScreen 预览用例：树液采集器（tree_extractor）。
 */
export function ThermalTreeExtractorScreenDemo() {
  return (
    <ThermalTreeExtractorScreen
      fluid={{ amount: 2700, capacity: 4000, tint: "#c8a014" }}
      onSlotClick={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      speed={0.6}
    />
  );
}
