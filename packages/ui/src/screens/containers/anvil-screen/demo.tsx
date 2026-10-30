import { AnvilScreen } from "./index";

/**
 * AnvilScreen 预览用例（规格 §6.2）
*/
export function AnvilScreenDemo() {
  return (
    <AnvilScreen
      defaultValue="铁剑"
      item={{ icon: "sword", tooltip: "铁剑" }}
      levelCost={1}
      material={{ count: 1, icon: "iron-ingot", tooltip: "铁锭" }}
      result={{ icon: "sword", tooltip: "铁剑（已修复）" }}
      title="修理"
    />
  );
}
