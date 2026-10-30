import { IeAutoWorkbenchScreen } from "./index";

/**
 * IeAutoWorkbenchScreen 预览用例：工程师蓝图（铁机械零件），材料齐备，能量 50%。
 */
export function IeAutoWorkbenchScreenDemo() {
  return (
    <IeAutoWorkbenchScreen
      blueprint={{ icon: "wheat", tooltip: "工程师蓝图（铁机械零件）" }}
      energy={{ max: 32000, value: 16000 }}
      onRecipeSelect={() => {}}
      onSlotClick={() => {}}
      recipes={[
        { icon: "iron-ingot", selected: true, tooltip: "铁机械零件" },
      ]}
      storage={[
        { count: 2, icon: "iron-ingot", tooltip: "铁板" },
        { count: 1, icon: "copper-ingot", tooltip: "铜锭" },
        ...Array.from({ length: 14 }, () => null),
      ]}
    />
  );
}
