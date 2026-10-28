import { Ae2ChestScreen } from "./index";

/**
 * Ae2ChestScreen 预览用例：单个存储元件槽。
 */
export function Ae2ChestScreenDemo() {
  return (
    <Ae2ChestScreen
      mainItems={[
        { count: 64, icon: "stone-block", tooltip: "石头" },
        { count: 32, icon: "iron-ingot", tooltip: "铁锭" },
      ]}
      storage={{ icon: "diamond", tooltip: "存储元件" }}
    />
  );
}
