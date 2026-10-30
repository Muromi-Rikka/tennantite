import { IeAutoWorkbenchScreen } from "./index";

/**
 * IeAutoWorkbenchScreen 预览用例：图纸配方 3 选 1，材料齐备，能量 50%。
 */
export function IeAutoWorkbenchScreenDemo() {
  return (
    <IeAutoWorkbenchScreen
      blueprint={{ icon: "iron-ingot", tooltip: "金属棒图纸" }}
      energy={{ max: 32000, value: 16000 }}
      onRecipeSelect={() => {}}
      onSlotClick={() => {}}
      recipes={[
        { icon: "iron-ingot", selected: true, tooltip: "铁棒" },
        { icon: "iron-ingot", selected: false, tooltip: "钢棒" },
        { icon: "iron-ingot", selected: false, tooltip: "铝棒" },
      ]}
      storage={Array.from({ length: 16 }, (_, i) => i < 10 ? { count: 16, icon: "iron-ingot", tooltip: "铁锭" } : null)}
    />
  );
}
