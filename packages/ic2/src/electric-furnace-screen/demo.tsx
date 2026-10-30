import { ElectricFurnaceScreen } from "./index";

interface ElectricFurnaceScreenDemoProps {
  energy?: { max: number; value: number };
  progress?: number;
}

/**
 * ElectricFurnaceScreen 预览用例：铁矿石 → 铁锭（原版图标近似）
*/
export function ElectricFurnaceScreenDemo({ energy = { max: 2000, value: 1750 }, progress = 0.8 }: ElectricFurnaceScreenDemoProps = {}) {
  return (
    <ElectricFurnaceScreen
      energy={energy}
      input={{ icon: "iron-ore", tooltip: "铁矿石" }}
      output={{ count: 1, icon: "iron-ingot", tooltip: "铁锭" }}
      progress={progress}
      title="电炉"
    />
  );
}
