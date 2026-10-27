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
          inputA: { count: 3, icon: "emerald", tooltip: "绿宝石 ×3" },
          inputB: { count: 1, icon: "apple" },
          outOfStock: true,
          output: { icon: "sword", tooltip: "铁剑" },
        },
      ]}
    />
  );
}
