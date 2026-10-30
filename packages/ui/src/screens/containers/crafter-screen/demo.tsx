import { CrafterScreen } from "./index";

/**
 * CrafterScreen 预览用例（规格 §6.2）：4 木板 2×2 → 工作台
*/
export function CrafterScreenDemo() {
  return (
    <CrafterScreen
      items={[
        { count: 1, icon: "oak-planks" },
        { count: 1, icon: "oak-planks" },
        null,
        { count: 1, icon: "oak-planks" },
        { count: 1, icon: "oak-planks" },
        null,
        null,
        null,
        null,
      ]}
      output={{ count: 1, icon: "crafting-table", tooltip: "工作台" }}
      powered
      title="合成器"
    />
  );
}
