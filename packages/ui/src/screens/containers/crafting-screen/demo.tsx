import { CraftingScreen } from "./index";

/**
 * CraftingScreen 预览用例（规格 §6.2）：木板 ×4 → 工作台
*/
export function CraftingScreenDemo() {
  return (
    <CraftingScreen
      craftItems={[
        { count: 1, icon: "grass-block" },
        null,
        { count: 1, icon: "grass-block" },
        null,
        { count: 1, icon: "grass-block" },
        null,
        { count: 1, icon: "grass-block" },
        null,
        null,
      ]}
      craftResult={{ count: 1, icon: "creeper-face", tooltip: "合成产物" }}
      hotbarItems={[{ count: 64, icon: "stone-block" }]}
      selectedIndex={0}
      title="合成"
    />
  );
}
