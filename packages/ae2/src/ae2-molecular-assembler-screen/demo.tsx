import { Ae2MolecularAssemblerScreen } from "./index";

/**
 * Ae2MolecularAssemblerScreen 预览用例：4 木板 2×2 → 工作台，装配进度 70%。
 */
export function Ae2MolecularAssemblerScreenDemo() {
  const planks = { count: 1, icon: "oak-planks" as const };
  return (
    <Ae2MolecularAssemblerScreen
      craftGrid={[planks, planks, null, planks, planks, null, null, null, null]}
      hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
      mainItems={Array.from({ length: 15 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
      output={{ count: 1, icon: "crafting-table", tooltip: "工作台" }}
      pattern={{ icon: "gold-ingot", tooltip: "工作台图样" }}
      progress={0.7}
      upgrades={[{ icon: "emerald", tooltip: "加速卡" }, { icon: "emerald", tooltip: "加速卡" }]}
    />
  );
}
