import { ChestScreen } from "./index";

/**
 * ChestScreen 预览用例（规格 §6.2）
*/
export function ChestScreenDemo() {
  return (
    <ChestScreen
      hotbarItems={[
        { count: 64, icon: "stone-block" },
        { icon: "grass-block" },
        { count: 12, icon: "diamond" },
      ]}
      items={[
        { count: 27, icon: "dirt-block", tooltip: "泥土 ×27" },
        { count: 8, icon: "apple" },
        { icon: "sword" },
      ]}
      rows={3}
      selectedIndex={1}
      title="箱子"
    />
  );
}
