import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalCrafterScreen } from "./index";

/**
 * ThermalCrafterScreen 预览用例：4 木板 → 工作台（组装机 crafter）。
 */
export function ThermalCrafterScreenDemo() {
  return (
    <ThermalCrafterScreen
      energy={{ amount: 240000, capacity: 400000 }}
      fluid={{ amount: 2700, capacity: 4000, tint: "#3c64c8" }}
      input={{ count: 1, icon: "oak-planks", tooltip: "橡木木板" }}
      inputs={[
        { count: 1, icon: "oak-planks", tooltip: "橡木木板" },
        { count: 1, icon: "oak-planks", tooltip: "橡木木板" },
        { count: 1, icon: "oak-planks", tooltip: "橡木木板" },
        null,
        null,
        null,
        null,
        null,
      ]}
      onSlotClick={() => {}}
      output={{ count: 1, icon: "crafting-table", tooltip: "工作台" }}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.3}
    />
  );
}
