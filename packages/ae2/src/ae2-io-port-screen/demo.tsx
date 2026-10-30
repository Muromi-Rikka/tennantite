import { Ae2IoPortScreen } from "./index";

/**
 * Ae2IoPortScreen 预览用例：左入右出，附加速卡。
 */
export function Ae2IoPortScreenDemo() {
  return (
    <Ae2IoPortScreen
      hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
      inputCells={[
        { icon: "emerald", tooltip: "1k 存储元件" },
        { icon: "emerald", tooltip: "4k 存储元件" },
      ]}
      mainItems={Array.from({ length: 15 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
      onOperationModeClick={() => {}}
      outputCells={[{ icon: "diamond", tooltip: "已清空元件" }]}
      upgrades={[{ icon: "emerald", tooltip: "加速卡" }]}
    />
  );
}
