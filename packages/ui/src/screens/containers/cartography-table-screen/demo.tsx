import { CartographyTableScreen } from "./index";

/**
 * CartographyTableScreen 预览用例（规格 §6.2）：地图 + 纸 → 缩小地图
*/
export function CartographyTableScreenDemo() {
  return (
    <CartographyTableScreen
      additional={{ count: 1, icon: "paper", tooltip: "纸" }}
      input={{ count: 1, icon: "filled-map", tooltip: "地图" }}
      output={{ count: 1, icon: "filled-map", tooltip: "地图（已缩小）" }}
      overlay="scaled"
      title="制图台"
    />
  );
}
