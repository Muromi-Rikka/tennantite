import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalFisherScreen } from "./index";

/**
 * ThermalFisherScreen 预览用例：捕鱼装置（fisher）。
 */
export function ThermalFisherScreenDemo() {
  return (
    <ThermalFisherScreen
      input={{ count: 10, icon: "wheat", tooltip: "捕鱼装置输入" }}
      onSlotClick={() => {}}
      output={{ count: 12, icon: "gunpowder", tooltip: "捕鱼装置产物" }}
      outputs={[
        { count: 8, icon: "dirt-block", tooltip: "捕鱼装置产物 2" },
        { count: 17, icon: "iron-ingot", tooltip: "捕鱼装置产物 3" },
        { count: 13, icon: "diamond", tooltip: "捕鱼装置产物 4" },
        { count: 18, icon: "emerald", tooltip: "捕鱼装置产物 5" },
        { count: 12, icon: "wheat", tooltip: "捕鱼装置产物 6" },
        { count: 14, icon: "gunpowder", tooltip: "捕鱼装置产物 7" },
        { count: 15, icon: "lapis-lazuli", tooltip: "捕鱼装置产物 8" },
        { count: 9, icon: "stone-block", tooltip: "捕鱼装置产物 9" },
        { count: 12, icon: "charcoal", tooltip: "捕鱼装置产物 10" },
        null,
        null,
        null,
        null,
        null,
      ]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}
