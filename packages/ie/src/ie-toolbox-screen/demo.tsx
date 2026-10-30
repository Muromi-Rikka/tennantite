import { IeToolboxScreen } from "./index";

/**
 * IeToolboxScreen 预览用例：装好工具/护甲/食物的工具箱。
 */
export function IeToolboxScreenDemo() {
  return (
    <IeToolboxScreen
      armor={[{ icon: "iron-ingot", tooltip: "护目镜" }, { icon: "iron-ingot", tooltip: "胸甲" }, null]}
      food={Array.from({ length: 6 }, (_, i) => i < 3 ? { count: 8, icon: "charcoal", tooltip: "面包" } : null)}
      misc={Array.from({ length: 7 }, (_, i) => i < 2 ? { count: 16, icon: "charcoal", tooltip: "火把" } : null)}
      onSlotClick={() => {}}
      shaders={[{ icon: "iron-ingot", tooltip: "着色器" }, null, null, null]}
      tools={[{ icon: "iron-ingot", tooltip: "工程师锤" }, { icon: "iron-ingot", tooltip: "断线钳" }, null]}
    />
  );
}
