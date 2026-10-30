import { InductionFurnaceScreen } from "./index";

/**
 * InductionFurnaceScreen 预览用例：铁矿石 ×2 → 铁锭 ×2（原版图标近似），热量 46。
*/
export function InductionFurnaceScreenDemo() {
  return (
    <InductionFurnaceScreen
      discharge={{ icon: "lapis-lazuli", tooltip: "RE 电池" }}
      energy={{ max: 10000, value: 7200 }}
      heat={46}
      inputA={{ icon: "iron-ore", tooltip: "铁矿石" }}
      inputB={{ icon: "iron-ore", tooltip: "铁矿石" }}
      outputA={{ count: 1, icon: "iron-ingot", tooltip: "铁锭" }}
      outputB={{ count: 1, icon: "iron-ingot", tooltip: "铁锭" }}
      progress={0.3}
      title="感应炉"
    />
  );
}
