import { IronFurnaceScreen } from "./index";

/**
 * IronFurnaceScreen 预览用例：铁矿石 + 煤炭 → 铁锭（原版图标近似）
*/
export function IronFurnaceScreenDemo() {
  return (
    <IronFurnaceScreen
      fuel={{ icon: "charcoal", tooltip: "木炭" }}
      input={{ icon: "iron-ore", tooltip: "铁矿石" }}
      output={{ count: 1, icon: "iron-ingot", tooltip: "铁锭" }}
      progress={0.7}
      title="铁炉"
    />
  );
}
