import { FurnaceScreen } from "./index";

interface FurnaceScreenDemoProps {
  burnProgress?: number;
  cookProgress?: number;
}

/**
 * FurnaceScreen 预览用例（规格 §6.2）：铁矿石 → 铁锭
*/
export function FurnaceScreenDemo({ burnProgress = 0.8, cookProgress = 0.45 }: FurnaceScreenDemoProps = {}) {
  return (
    <FurnaceScreen
      burnProgress={burnProgress}
      cookProgress={cookProgress}
      fuel={{ count: 3, icon: "charcoal", tooltip: "木炭" }}
      input={{ icon: "iron-ore", tooltip: "铁矿石" }}
      output={{ count: 1, icon: "iron-ingot", tooltip: "铁锭" }}
      title="熔炉"
    />
  );
}
