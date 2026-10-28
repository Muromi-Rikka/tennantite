import { MaceratorScreen } from "./index";

/**
 * MaceratorScreen 预览用例：铁矿石 → 铁粉（原版图标近似）
*/
export function MaceratorScreenDemo() {
  return (
    <MaceratorScreen
      energy={{ max: 2000, value: 1400 }}
      input={{ icon: "iron-ore", tooltip: "铁矿石" }}
      output={{ count: 2, icon: "iron-ingot", tooltip: "铁粉" }}
      progress={0.45}
      title="磨矿机"
    />
  );
}
