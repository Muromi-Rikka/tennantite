import { Ae2GrindstoneScreen } from "./index";

/**
 * Ae2GrindstoneScreen 预览用例：沙砾 → 燧石、骨头 → 4 骨粉。
 */
export function Ae2GrindstoneScreenDemo() {
  return (
    <Ae2GrindstoneScreen
      hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
      mainItems={Array.from({ length: 18 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
      onTakeOutput={() => {}}
      ores={[
        { count: 1, icon: "gravel", tooltip: "沙砾" },
        { count: 1, icon: "bone", tooltip: "骨头" },
        null,
      ]}
      outputs={[
        { count: 1, icon: "flint", tooltip: "燧石" },
        { count: 4, icon: "bone-meal", tooltip: "骨粉 ×4" },
      ]}
    />
  );
}
