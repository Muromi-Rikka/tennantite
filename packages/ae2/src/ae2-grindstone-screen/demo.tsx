import { Ae2GrindstoneScreen } from "./index";

/**
 * Ae2GrindstoneScreen 预览用例：三种矿石 → 磨粉产物。
 */
export function Ae2GrindstoneScreenDemo() {
  return (
    <Ae2GrindstoneScreen
      hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
      mainItems={Array.from({ length: 18 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
      onTakeOutput={() => {}}
      ores={[
        { icon: "iron-ingot", tooltip: "铁矿石" },
        { icon: "gold-ingot", tooltip: "金矿石" },
        { icon: "charcoal", tooltip: "煤矿石" },
      ]}
      outputs={[
        { icon: "iron-ingot", tooltip: "磨碎的铁" },
        { icon: "gold-ingot", tooltip: "磨碎的金" },
      ]}
    />
  );
}
