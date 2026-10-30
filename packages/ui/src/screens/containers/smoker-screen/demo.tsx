import { SmokerScreen } from "./index";

/**
 * SmokerScreen 预览用例（规格 §6.2）：土豆 → 烤土豆
*/
export function SmokerScreenDemo() {
  return (
    <SmokerScreen
      burnProgress={0.3}
      cookProgress={0.7}
      fuel={{ count: 3, icon: "charcoal", tooltip: "木炭" }}
      input={{ count: 1, icon: "potato", tooltip: "土豆" }}
      output={{ count: 1, icon: "baked-potato", tooltip: "烤土豆" }}
      title="烟熏炉"
    />
  );
}
