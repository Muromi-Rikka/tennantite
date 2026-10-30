import { Ae2MolecularAssemblerScreen } from "./index";

/**
 * Ae2MolecularAssemblerScreen 预览用例：合成图样装配中，进度 70%。
 */
export function Ae2MolecularAssemblerScreenDemo() {
  return (
    <Ae2MolecularAssemblerScreen
      craftGrid={[{ icon: "iron-ingot", tooltip: "铁板" }, { icon: "gold-ingot", tooltip: "金板" }]}
      hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
      mainItems={Array.from({ length: 15 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
      output={{ icon: "diamond", tooltip: "逻辑处理器" }}
      pattern={{ icon: "gold-ingot", tooltip: "合成图样" }}
      progress={0.7}
      upgrades={[{ icon: "emerald", tooltip: "加速卡" }, { icon: "emerald", tooltip: "加速卡" }]}
    />
  );
}
