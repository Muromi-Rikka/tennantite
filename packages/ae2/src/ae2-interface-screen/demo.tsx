import { Ae2InterfaceScreen } from "./index";

/**
 * Ae2InterfaceScreen 预览用例：满样板扩展（4 行图样槽）。
 */
export function Ae2InterfaceScreenDemo() {
  return (
    <Ae2InterfaceScreen
      config={[{ icon: "iron-ingot", tooltip: "配置：铁锭" }]}
      hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
      mainItems={Array.from({ length: 20 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
      patterns={Array.from({ length: 3 }, (_, index) => ({ icon: "diamond", tooltip: `图样 ${index + 1}` }))}
      storage={[{ icon: "iron-ingot", tooltip: "存储：铁锭 ×64" }]}
      upgrades={[{ icon: "emerald", tooltip: "样板扩展卡" }, { icon: "emerald", tooltip: "样板扩展卡" }]}
    />
  );
}
