import { SmokerScreen } from "./index";

interface SmokerScreenDemoProps {
  burnProgress?: number;
  cookProgress?: number;
}

/**
 * SmokerScreen 预览用例（规格 §6.2）：土豆 → 烤土豆
*/
export function SmokerScreenDemo({ burnProgress = 0.3, cookProgress = 0.7 }: SmokerScreenDemoProps = {}) {
  return (
    <SmokerScreen
      burnProgress={burnProgress}
      cookProgress={cookProgress}
      fuel={{ count: 3, icon: "charcoal", tooltip: "木炭" }}
      input={{ count: 1, icon: "potato", tooltip: "土豆" }}
      output={{ count: 1, icon: "baked-potato", tooltip: "烤土豆" }}
      title="烟熏炉"
    />
  );
}
