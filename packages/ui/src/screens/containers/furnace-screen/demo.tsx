import { FurnaceScreen } from "./index";

/**
 * FurnaceScreen 预览用例（规格 §6.2）：铁矿石 → 铁锭
*/
export function FurnaceScreenDemo() {
  return (
    <FurnaceScreen
      burnProgress={0.8}
      cookProgress={0.45}
      fuel={{ count: 3, icon: "grass-block", tooltip: "木炭" }}
      input={{ icon: "stone-block", tooltip: "铁矿石" }}
      output={{ count: 2, icon: "diamond", tooltip: "铁锭" }}
      title="熔炉"
    />
  );
}
