import { THERMAL_DEMO_PLAYER_HOTBAR, THERMAL_DEMO_PLAYER_MAIN } from "../thermal-demo-data";
import { ThermalMachineScreen } from "./index";

interface ThermalMachineScreenDemoProps {
  energy?: { amount: number; capacity: number };
  progress?: number;
  speed?: number;
}

/**
 * ThermalMachineScreen 预览用例：以 pulverizer 布局表驱动，铁矿石 → 2 铁粉，
 * 进度箭头 / 火焰 / 能量表与玩家背包。
 */
export function ThermalMachineScreenDemo({
  energy = { amount: 240000, capacity: 400000 },
  progress = 0.5,
  speed = 0.75,
}: ThermalMachineScreenDemoProps = {}) {
  return (
    <ThermalMachineScreen
      energy={energy}
      input={{ count: 1, icon: "iron-ore", tooltip: "铁矿石" }}
      inputs={[null]}
      machine="pulverizer"
      output={{ count: 2, icon: "iron-ingot", tooltip: "铁粉 ×2" }}
      outputs={[null, null, null]}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={progress}
      speed={speed}
    />
  );
}
