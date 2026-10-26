import { AnvilScreen } from "./index";

/**
 * AnvilScreen 预览用例（规格 §6.2）
*/
export function AnvilScreenDemo() {
  return (
    <AnvilScreen
      defaultValue="铁剑"
      item={{ icon: "sword", tooltip: "铁剑" }}
      levelCost={3}
      material={{ count: 4, icon: "stone-block", tooltip: "铁锭" }}
      result={{ icon: "sword", tooltip: "铁剑 · 锋利 I" }}
      title="修理"
    />
  );
}
