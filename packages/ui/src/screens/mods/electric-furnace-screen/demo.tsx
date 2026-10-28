import { ElectricFurnaceScreen } from "./index";

/**
 * ElectricFurnaceScreen 预览用例：铁矿石 → 铁锭（原版图标近似）
*/
export function ElectricFurnaceScreenDemo() {
  return (
    <ElectricFurnaceScreen
      energy={{ max: 2000, value: 1750 }}
      input={{ icon: "iron-ore", tooltip: "铁矿石" }}
      output={{ count: 3, icon: "iron-ingot", tooltip: "铁锭" }}
      progress={0.8}
      redstoneMode="inverted"
      title="电炉"
    />
  );
}
