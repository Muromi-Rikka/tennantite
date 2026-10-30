import { BlastFurnaceScreen } from "./index";

interface BlastFurnaceScreenDemoProps {
  burnProgress?: number;
  cookProgress?: number;
}

/**
 * BlastFurnaceScreen 预览用例（规格 §6.2）：铁矿石 → 铁锭（耗时减半）
*/
export function BlastFurnaceScreenDemo({ burnProgress = 0.5, cookProgress = 0.4 }: BlastFurnaceScreenDemoProps = {}) {
  return (
    <BlastFurnaceScreen
      burnProgress={burnProgress}
      cookProgress={cookProgress}
      fuel={{ count: 3, icon: "charcoal", tooltip: "木炭" }}
      input={{ count: 1, icon: "iron-ore", tooltip: "铁矿石" }}
      output={{ count: 1, icon: "iron-ingot", tooltip: "铁锭" }}
      title="高炉"
    />
  );
}
