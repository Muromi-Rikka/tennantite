import { THERMAL_DEMO_PLAYER_HOTBAR, THERMAL_DEMO_PLAYER_MAIN } from "../thermal-demo-data";
import { ThermalMachineScreen } from "./index";

/**
 * ThermalMachineScreen 预览用例：以 pulverizer 布局表驱动，双输入 / 4 产物 /
 * 进度箭头 / 火焰 / 能量表与玩家背包。
 */
export function ThermalMachineScreenDemo() {
  return (
    <ThermalMachineScreen
      energy={{ amount: 240000, capacity: 400000 }}
      input={{ count: 11, icon: "gunpowder", tooltip: "粉碎机输入" }}
      inputs={[{ count: 9, icon: "iron-ore", tooltip: "粉碎机槽位 2" }]}
      machine="pulverizer"
      output={{ count: 6, icon: "stone-block", tooltip: "粉碎机产物" }}
      outputs={[
        { count: 7, icon: "gold-ingot", tooltip: "粉碎机产物 2" },
        { count: 16, icon: "iron-ingot", tooltip: "粉碎机产物 3" },
        { count: 14, icon: "lapis-lazuli", tooltip: "粉碎机产物 4" },
      ]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
      speed={0.75}
    />
  );
}
