import { Ae2CondenserScreen } from "./index";

/**
 * Ae2CondenserScreen 预览用例：垃圾槽投入余烬，储能过半。
 */
export function Ae2CondenserScreenDemo() {
  return (
    <Ae2CondenserScreen
      mainItems={Array.from({ length: 12 }, (_, index) => ({ icon: index % 2 ? "iron-ingot" : "gold-ingot" }))}
      modeLabel="能量细胞"
      output={{ icon: "diamond", tooltip: "物质球" }}
      progress={0.55}
      storageCell={{ icon: "emerald", tooltip: "1k 存储元件" }}
      trash={{ count: 1, icon: "dirt-block", tooltip: "销毁物品" }}
    />
  );
}
