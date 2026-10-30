import { TradingScreen } from "./index";

/**
 * TradingScreen 预览用例（规格 §6.2）
*/
export function TradingScreenDemo() {
  return (
    <TradingScreen
      hotbarItems={[{ count: 64, icon: "dirt-block" }]}
      title="农民 - 新手"
      trades={[
        {
          inputA: { count: 20, icon: "wheat", tooltip: "小麦 ×20" },
          output: { icon: "emerald", tooltip: "绿宝石" },
        },
        {
          inputA: { count: 1, icon: "emerald", tooltip: "绿宝石" },
          output: { count: 6, icon: "bread", tooltip: "面包 ×6" },
        },
      ]}
    />
  );
}
