import { IeModWorkbenchScreen } from "./index";

/**
 * IeModWorkbenchScreen 预览用例：装有升级工具与图纸输出的第 2 页。
 */
export function IeModWorkbenchScreenDemo() {
  return (
    <IeModWorkbenchScreen
      currentPage={1}
      inputs={Array.from({ length: 6 }, (_, i) => i < 3 ? { count: 4, icon: "iron-ingot", tooltip: "升级插件" } : null)}
      onPageChange={() => {}}
      onSlotClick={() => {}}
      outputs={Array.from({ length: 9 }, (_, i) => i < 4 ? { count: 6, icon: "iron-ingot", tooltip: "图纸产物" } : null)}
      shader={{ icon: "iron-ingot", tooltip: "着色器" }}
      tool={{ icon: "iron-ingot", tooltip: "电钻" }}
    />
  );
}
